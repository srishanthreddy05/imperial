import { db } from "./config";
import { doc, setDoc, getDoc, deleteDoc, collection, addDoc, updateDoc } from "firebase/firestore";

export interface AppointmentData {
  location: string;
  service: string;
  date: string;
  timeSlot: string;
  fullName: string;
  phone: string;
  email: string;
  isNewPatient?: string;
  notes?: string;
}

export interface OTPSession {
  email: string;
  otp: string;
  expiresAt: string; // ISO string
  verificationAttempts: number;
  resendAttempts: number;
  lastSentAt: string; // ISO string
  appointmentData: AppointmentData;
}

export class FirestoreValidationError extends Error {
  code = "invalid-firestore-argument";
  field: string;

  constructor(field: string, message: string) {
    super(message);
    this.name = "FirestoreValidationError";
    this.field = field;
  }
}

function assertNonEmptyString(value: unknown, field: string) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new FirestoreValidationError(field, `${field} is required and must be a non-empty string.`);
  }
}

function assertFiniteNumber(value: unknown, field: string) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new FirestoreValidationError(field, `${field} is required and must be a finite number.`);
  }
}

function getUndefinedPaths(value: unknown, basePath = ""): string[] {
  if (value === undefined) return [basePath || "value"];
  if (!value || typeof value !== "object") return [];

  return Object.entries(value as Record<string, unknown>).flatMap(([key, nestedValue]) =>
    getUndefinedPaths(nestedValue, basePath ? `${basePath}.${key}` : key)
  );
}

function assertNoUndefinedValues(value: unknown, operation: string) {
  const undefinedPaths = getUndefinedPaths(value);
  if (undefinedPaths.length > 0) {
    throw new FirestoreValidationError(
      undefinedPaths[0],
      `${operation} received undefined value at field: ${undefinedPaths[0]}.`
    );
  }
}

function normalizeAppointmentData(appointmentData: AppointmentData): AppointmentData {
  return {
    location: appointmentData.location.trim(),
    service: appointmentData.service.trim(),
    date: appointmentData.date.trim(),
    timeSlot: appointmentData.timeSlot.trim(),
    fullName: appointmentData.fullName.trim(),
    phone: appointmentData.phone.trim(),
    email: appointmentData.email.toLowerCase().trim(),
    isNewPatient: appointmentData.isNewPatient?.trim() || "",
    notes: appointmentData.notes?.trim() || "",
  };
}

function validateAppointmentData(appointmentData: AppointmentData) {
  assertNonEmptyString(appointmentData.email, "email");
  assertNonEmptyString(appointmentData.fullName, "patientName");
  assertNonEmptyString(appointmentData.phone, "phone");
  assertNonEmptyString("Dr. Sumbul Islam, MD", "provider");
  assertNonEmptyString(appointmentData.date, "date");
  assertNonEmptyString(appointmentData.timeSlot, "time");
  assertNonEmptyString(appointmentData.service, "reason");
  assertNonEmptyString(appointmentData.location, "location");
}

/**
 * Saves a verified appointment to the `appointments` collection.
 */
export async function saveAppointment(appointmentData: AppointmentData, confirmationNumber: string) {
  assertNonEmptyString(confirmationNumber, "confirmationNumber");
  validateAppointmentData(appointmentData);

  const normalizedAppointmentData = normalizeAppointmentData(appointmentData);
  const appointmentDoc = {
    patientName: normalizedAppointmentData.fullName,
    email: normalizedAppointmentData.email,
    phone: normalizedAppointmentData.phone,
    provider: "Dr. Sumbul Islam, MD",
    date: normalizedAppointmentData.date,
    time: normalizedAppointmentData.timeSlot,
    reason: normalizedAppointmentData.service,
    notes: normalizedAppointmentData.notes || "",
    appointmentType: normalizedAppointmentData.isNewPatient === "no" ? "Established Patient" : "New Patient",
    confirmationNumber: confirmationNumber,
    emailVerified: true,
    createdAt: new Date().toISOString(),
  };

  assertNoUndefinedValues(appointmentDoc, "saveAppointment/addDoc");
  const appointmentsRef = collection(db, "appointments");
  const docRef = await addDoc(appointmentsRef, appointmentDoc);
  return { id: docRef.id, ...appointmentDoc };
}

/**
 * Saves or updates an OTP session in the `otp_sessions` collection.
 */
export async function saveOTPSession(email: string, otp: string, appointmentData: AppointmentData) {
  assertNonEmptyString(email, "email");
  assertNonEmptyString(otp, "otp");
  validateAppointmentData({ ...appointmentData, email });

  const emailKey = email.toLowerCase().trim();
  const normalizedAppointmentData = normalizeAppointmentData({ ...appointmentData, email: emailKey });
  const sessionDoc: OTPSession = {
    email: emailKey,
    otp: otp,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10 minutes expiry
    verificationAttempts: 0,
    resendAttempts: 0,
    lastSentAt: new Date().toISOString(),
    appointmentData: normalizedAppointmentData,
  };

  assertNoUndefinedValues(sessionDoc, "saveOTPSession/setDoc");
  const sessionRef = doc(db, "otp_sessions", emailKey);
  await setDoc(sessionRef, sessionDoc);
  return sessionDoc;
}

/**
 * Retrieves an active OTP session.
 */
export async function getOTPSession(email: string): Promise<OTPSession | null> {
  assertNonEmptyString(email, "email");
  const sessionRef = doc(db, "otp_sessions", email.toLowerCase().trim());
  const snap = await getDoc(sessionRef);
  if (!snap.exists()) return null;
  return snap.data() as OTPSession;
}

/**
 * Increments the verification attempts counter for a session.
 */
export async function incrementVerificationAttempts(email: string, currentAttempts: number) {
  assertNonEmptyString(email, "email");
  assertFiniteNumber(currentAttempts, "verificationAttempts");
  const sessionRef = doc(db, "otp_sessions", email.toLowerCase().trim());
  const updatePayload = {
    verificationAttempts: currentAttempts + 1,
  };
  assertNoUndefinedValues(updatePayload, "incrementVerificationAttempts/updateDoc");
  await updateDoc(sessionRef, updatePayload);
}

/**
 * Updates the session with a new OTP, increments resend attempts, and resets lastSentAt/expiresAt.
 */
export async function updateOTPSessionResend(email: string, newOtp: string, currentResends: number) {
  assertNonEmptyString(email, "email");
  assertNonEmptyString(newOtp, "otp");
  assertFiniteNumber(currentResends, "resendAttempts");
  const sessionRef = doc(db, "otp_sessions", email.toLowerCase().trim());
  const updatePayload = {
    otp: newOtp,
    resendAttempts: currentResends + 1,
    lastSentAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
  };
  assertNoUndefinedValues(updatePayload, "updateOTPSessionResend/updateDoc");
  await updateDoc(sessionRef, updatePayload);
}

/**
 * Deletes the OTP session.
 */
export async function deleteOTPSession(email: string) {
  assertNonEmptyString(email, "email");
  const sessionRef = doc(db, "otp_sessions", email.toLowerCase().trim());
  await deleteDoc(sessionRef);
}
