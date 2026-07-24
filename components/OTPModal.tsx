"use client";

import { useState, useEffect, useRef } from "react";
import { X, ShieldCheck, RefreshCw, AlertCircle, CheckCircle } from "lucide-react";

interface OTPModalProps {
  isOpen: boolean;
  email: string;
  onClose: () => void;
  onSuccess: (confirmationNumber: string, message: string) => void;
}

export default function OTPModal({ isOpen, email, onClose, onSuccess }: OTPModalProps) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(60);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startCooldown = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    timerRef.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Start cooldown countdown on mount / open
  useEffect(() => {
    if (isOpen) {
      startCooldown();
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit code.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/appointment/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Verification failed. Please try again.");
      }

      setSuccessMsg("Email verified successfully!");
      // Short delay for user feedback visual transitions
      setTimeout(() => {
        onSuccess(data.confirmationNumber, data.message);
      }, 1000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Verification failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0) return;

    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const res = await fetch("/api/appointment/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, isResend: true }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to resend code.");
      }

      setSuccessMsg("A fresh code has been sent!");
      setOtp("");
      setCooldown(60);
      startCooldown();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to resend code.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100 relative space-y-6 text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Shield Icon Header */}
        <div className="w-16 h-16 bg-[#005EB8]/10 text-[#005EB8] rounded-full flex items-center justify-center mx-auto shadow-sm">
          <ShieldCheck className="w-9 h-9" />
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h3 className="text-2xl font-extrabold text-gray-900 font-montserrat">
            Verify Your Email
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 font-sans px-2">
            We&apos;ve sent a 6-digit verification code to: <br />
            <strong className="text-gray-800 font-semibold">{email}</strong>
          </p>
        </div>

        {/* Error / Success Alerts */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs flex items-center justify-center gap-2 font-sans animate-in shake duration-200">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-xl text-xs flex items-center justify-center gap-2 font-sans animate-in fade-in duration-200">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Verification Form */}
        <form onSubmit={handleVerify} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="otp" className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
              Enter Verification Code
            </label>
            <input
              id="otp"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              required
              disabled={loading || !!successMsg}
              placeholder="••••••"
              value={otp}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, "");
                setOtp(val);
                if (error) setError(null);
              }}
              className="w-full text-center px-4 py-3 rounded-xl border border-gray-300 font-mono text-3xl font-extrabold tracking-[0.25em] focus:ring-2 focus:ring-[#005EB8] focus:border-[#005EB8] placeholder:text-gray-300 outline-none transition-all"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-2 space-y-3">
            <button
              type="submit"
              disabled={loading || otp.length !== 6 || !!successMsg}
              className="w-full bg-[#005EB8] hover:bg-[#004B93] disabled:bg-gray-200 disabled:text-gray-400 text-white py-3.5 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify Code"
              )}
            </button>

            {/* Resend Action */}
            <div className="flex flex-col items-center gap-1.5 pt-1 text-xs">
              <button
                type="button"
                onClick={handleResend}
                disabled={loading || cooldown > 0 || !!successMsg}
                className="text-[#005EB8] font-bold hover:text-[#004B93] hover:underline disabled:text-gray-400 disabled:no-underline disabled:cursor-not-allowed transition-colors"
              >
                Resend Code
              </button>
              
              {cooldown > 0 && (
                <span className="text-gray-400 font-sans">
                  Resend available in: <strong className="text-gray-600 font-semibold">{cooldown} seconds</strong>
                </span>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
