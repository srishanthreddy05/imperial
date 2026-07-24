import { NextResponse } from "next/server";
import {
  FirestoreValidationError,
  getOTPSession,
  saveAppointment,
  deleteOTPSession,
  incrementVerificationAttempts,
} from "@/lib/firebase/appointments";
import { verifyOTPSession } from "@/lib/otp/verifyOTP";
import { transporter, mailFrom } from "@/lib/email/brevo";
import { getAppointmentConfirmationTemplate } from "@/lib/email/templates/appointmentConfirmation";
import { getAppointmentNotificationTemplate } from "@/lib/email/templates/appointmentNotification";

function logVerifyOTPError(error: unknown, context?: Record<string, unknown>) {
  const err = error as { code?: unknown; message?: unknown; stack?: unknown };

  console.error("Verify OTP Error");
  if (context) console.error("Context:", context);
  console.error(error);
  console.error("Code:", err?.code);
  console.error("Message:", err?.message);
  console.error("Stack:", err?.stack);
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "An unexpected error occurred. Please try again.";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, otp } = body;

    if (typeof email !== "string" || email.trim() === "" || typeof otp !== "string" || otp.trim() === "") {
      return NextResponse.json({ error: "Email and verification code are required." }, { status: 400 });
    }

    const emailKey = email.toLowerCase().trim();
    const enteredOtp = otp.trim();
    const session = await getOTPSession(emailKey);

    if (!session) {
      return NextResponse.json(
        { error: "No active verification session found. Please fill out the form again." },
        { status: 404 }
      );
    }

    if (!session.appointmentData) {
      logVerifyOTPError(new Error("Pending appointment data is missing."), { email: emailKey });
      return NextResponse.json(
        { error: "Pending appointment not found. Please fill out the form again." },
        { status: 404 }
      );
    }

    if (typeof session.verificationAttempts !== "number" || !Number.isFinite(session.verificationAttempts)) {
      throw new FirestoreValidationError("verificationAttempts", "Stored OTP session has invalid verificationAttempts.");
    }

    // Run verification validation rules
    const verification = verifyOTPSession(session, enteredOtp);

    if (!verification.valid) {
      if (verification.reason === "EXPIRED") {
        await deleteOTPSession(emailKey);
        return NextResponse.json(
          { error: "Verification code has expired. Please request a new one." },
          { status: 410 }
        );
      }

      if (verification.reason === "MAX_ATTEMPTS") {
        await deleteOTPSession(emailKey);
        return NextResponse.json(
          { error: "Maximum verification attempts exceeded. Please restart the booking process." },
          { status: 429 }
        );
      }

      // Increment verification attempt count in Firestore
      const newAttempts = session.verificationAttempts + 1;
      if (newAttempts >= 5) {
        await deleteOTPSession(emailKey);
        return NextResponse.json(
          { error: "Maximum verification attempts exceeded. Please restart the booking process." },
          { status: 429 }
        );
      } else {
        await incrementVerificationAttempts(emailKey, session.verificationAttempts);
        return NextResponse.json(
          { error: `Invalid verification code. ${verification.attemptsRemaining} attempts remaining.` },
          { status: 400 }
        );
      }
    }

    // GENERATE CONFIRMATION NUMBER (IC-YYYYMMDD-RAND4)
    const now = new Date();
    // Use local time or UTC to match YYYYMMDD formatting
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const dateStr = `${year}${month}${day}`;
    const rand4 = Math.floor(1000 + Math.random() * 9000).toString();
    const confirmationNumber = `IC-${dateStr}-${rand4}`;
    const storedAppointmentEmail = session.appointmentData.email;
    const appointmentData = {
      ...session.appointmentData,
      email:
        typeof storedAppointmentEmail === "string" && storedAppointmentEmail.trim() !== ""
          ? storedAppointmentEmail
          : emailKey,
    };

    // SAVE APPOINTMENT TO FIRESTORE
    let appointmentDoc;
    try {
      appointmentDoc = await saveAppointment(appointmentData, confirmationNumber);
    } catch (dbErr) {
      logVerifyOTPError(dbErr, {
        operation: "saveAppointment",
        email: emailKey,
        confirmationNumber,
        invalidField: dbErr instanceof FirestoreValidationError ? dbErr.field : undefined,
      });
      return NextResponse.json(
        {
          error:
            process.env.NODE_ENV === "development"
              ? getErrorMessage(dbErr)
              : "A database error occurred. We could not save your appointment. Please try again.",
        },
        { status: 500 }
      );
    }

    // CLEANUP SESSION IN FIRESTORE
    try {
      await deleteOTPSession(emailKey);
    } catch (cleanupErr) {
      console.error("Non-blocking warning: Failed to delete OTP session from db:", cleanupErr);
    }

    // SEND EMAILS
    let confirmationEmailFailed = false;

    // 1. Confirmation Email to Patient
    try {
      const patientMailOptions = {
        from: `"Imperial Care Internal Medicine" <${mailFrom}>`,
        to: emailKey,
        subject: "Appointment Confirmed",
        html: getAppointmentConfirmationTemplate(appointmentData, confirmationNumber),
      };
      await transporter.sendMail(patientMailOptions);
    } catch (emailErr) {
      console.error("Failed to send patient confirmation email:", emailErr);
      confirmationEmailFailed = true;
    }

    // 2. Notification Email to Receptionist (srishanthreddyy05@gmail.com)
    try {
      const staffMailOptions = {
        from: `"Imperial Care Scheduler" <${mailFrom}>`,
        to: "srishanthreddyy05@gmail.com",
        subject: "New Appointment Booked",
        html: getAppointmentNotificationTemplate(appointmentData, confirmationNumber),
      };
      await transporter.sendMail(staffMailOptions);
    } catch (staffEmailErr) {
      console.error("Failed to send receptionist notification email:", staffEmailErr);
    }

    // RESPONSE HANDLING BASED ON EMAIL FAILURE SPECIFICATIONS (Step 8)
    if (confirmationEmailFailed) {
      return NextResponse.json({
        success: true,
        confirmationNumber,
        message: "Appointment booked successfully. We'll resend your confirmation shortly.",
        appointment: appointmentDoc,
      });
    }

    return NextResponse.json({
      success: true,
      confirmationNumber,
      message: "Appointment request submitted and confirmed!",
      appointment: appointmentDoc,
    });
  } catch (err: unknown) {
    logVerifyOTPError(err);
    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV === "development"
            ? getErrorMessage(err)
            : "An unexpected error occurred. Please try again.",
      },
      { status: 500 }
    );
  }
}
