import { OTPSession } from "@/lib/firebase/appointments";

export interface VerificationResult {
  valid: boolean;
  reason?: "EXPIRED" | "MAX_ATTEMPTS" | "INVALID_CODE";
  attemptsRemaining: number;
}

/**
 * Validates the entered OTP against the active session details.
 * Encapsulates the rules: 10 min expiration, max 5 attempts.
 */
export function verifyOTPSession(session: OTPSession, enteredOtp: string): VerificationResult {
  const maxAttempts = 5;
  const expiresAt = new Date(session.expiresAt).getTime();
  const now = Date.now();

  // 1. Check expiration
  if (now > expiresAt) {
    return {
      valid: false,
      reason: "EXPIRED",
      attemptsRemaining: 0,
    };
  }

  // 2. Check maximum verification attempts exceeded
  if (session.verificationAttempts >= maxAttempts) {
    return {
      valid: false,
      reason: "MAX_ATTEMPTS",
      attemptsRemaining: 0,
    };
  }

  // 3. Compare code
  if (session.otp !== enteredOtp) {
    const attemptsUsed = session.verificationAttempts + 1;
    const remaining = Math.max(0, maxAttempts - attemptsUsed);
    return {
      valid: false,
      reason: "INVALID_CODE",
      attemptsRemaining: remaining,
    };
  }

  return {
    valid: true,
    attemptsRemaining: maxAttempts - session.verificationAttempts,
  };
}
