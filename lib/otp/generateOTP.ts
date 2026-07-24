/**
 * Generates a random 6-digit numeric OTP.
 */
export function generateNumericOTP(): string {
  const min = 100000;
  const max = 999999;
  return Math.floor(Math.random() * (max - min + 1) + min).toString();
}
