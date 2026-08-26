import { NextResponse } from "next/server";
import { getOTPSession, saveOTPSession, updateOTPSessionResend } from "@/lib/firebase/appointments";
import { generateNumericOTP } from "@/lib/otp/generateOTP";
import { transporter, mailFrom } from "@/lib/email/brevo";
import { getOTPEmailTemplate } from "@/lib/email/templates/otpTemplate";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, isResend, ...appointmentData } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const emailKey = email.toLowerCase().trim();
    const existingSession = await getOTPSession(emailKey);
    const now = Date.now();

    // HANDLE RESEND FLOW
    if (isResend) {
      if (!existingSession) {
        return NextResponse.json(
          { error: "No active verification session found. Please fill out the form again." },
          { status: 400 }
        );
      }

      // Check cooldown (60 seconds)
      const lastSentTime = new Date(existingSession.lastSentAt).getTime();
      const secondsElapsed = Math.floor((now - lastSentTime) / 1000);
      if (secondsElapsed < 60) {
        return NextResponse.json(
          { error: `Please wait ${60 - secondsElapsed} seconds before requesting a new code.` },
          { status: 429 }
        );
      }

      // Check maximum resend attempts (max 3)
      if (existingSession.resendAttempts >= 3) {
        return NextResponse.json(
          { error: "Maximum verification code resends exceeded (max 3). Please restart the booking process." },
          { status: 400 }
        );
      }

      // Generate new OTP & Update session
      const newOtp = generateNumericOTP();
      
      // Attempt to send email BEFORE committing update to Firestore
      try {
        const mailOptions = {
          from: `"Imperial Care Internal Medicine" <${mailFrom}>`,
          to: emailKey,
          subject: "Verify Your Appointment Request",
          html: getOTPEmailTemplate(existingSession.appointmentData.fullName, newOtp),
        };
        await transporter.sendMail(mailOptions);
      } catch (emailErr) {
        console.error("Failed to resend verification email:", emailErr);
        return NextResponse.json(
          { error: "We couldn't send the verification email. Please try again." },
          { status: 500 }
        );
      }

      // If email succeeded, update Firestore session
      await updateOTPSessionResend(emailKey, newOtp, existingSession.resendAttempts);

      return NextResponse.json({
        success: true,
        message: "A new verification code has been sent.",
      });
    }

function isAlternatingFriday(dateStr: string): boolean {
  if (!dateStr) return false;
  const parts = dateStr.split("-");
  if (parts.length !== 3) return false;
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  if (isNaN(year) || isNaN(month) || isNaN(day)) return false;

  const dateObj = new Date(year, month, day);
  if (dateObj.getDay() !== 5) return false;

  const dayOfMonth = dateObj.getDate();
  const isFirstFriday = dayOfMonth >= 1 && dayOfMonth <= 7;
  const isThirdFriday = dayOfMonth >= 15 && dayOfMonth <= 21;

  return isFirstFriday || isThirdFriday;
}

    // HANDLE INITIAL BOOKING REQUEST FLOW
    const { fullName, phone, date, timeSlot, location, service } = appointmentData;
    if (!fullName || !phone || !date || !timeSlot || !location || !service) {
      return NextResponse.json({ error: "Missing required booking details." }, { status: 400 });
    }

    // Validate Anna Clinic dates (alternating Fridays only)
    if (location.toLowerCase().includes("anna")) {
      if (!isAlternatingFriday(date)) {
        return NextResponse.json(
          { error: "Anna Clinic appointments are only available on alternating Fridays (1st & 3rd Friday of each month). Please select a valid Friday." },
          { status: 400 }
        );
      }
    }

    // Generate new OTP
    const otp = generateNumericOTP();

    // Attempt to send email BEFORE saving session
    try {
      const mailOptions = {
        from: `"Imperial Care Internal Medicine" <${mailFrom}>`,
        to: emailKey,
        subject: "Verify Your Appointment Request",
        html: getOTPEmailTemplate(fullName, otp),
      };
      await transporter.sendMail(mailOptions);
    } catch (emailErr) {
      console.error("Failed to send initial verification email:", emailErr);
      return NextResponse.json(
        { error: "We couldn't send the verification email. Please try again." },
        { status: 500 }
      );
    }

    // Save session in Firestore
    await saveOTPSession(emailKey, otp, appointmentData);

    return NextResponse.json({
      success: true,
      message: "Verification code sent to your email.",
    });
  } catch (err: unknown) {
    console.error("Error in send-otp API:", err);
    return NextResponse.json({ error: "An unexpected error occurred. Please try again." }, { status: 500 });
  }
}
