"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X, Check } from "lucide-react";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("imperial_care_cookie_consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("imperial_care_cookie_consent", "accepted");
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("imperial_care_cookie_consent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 animate-in slide-in-from-bottom duration-300">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-5 relative">
        <button
          onClick={handleDecline}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 p-1"
          aria-label="Close Cookie Banner"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#005EB8]/10 text-[#005EB8] flex items-center justify-center shrink-0 mt-0.5">
            <Cookie className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900">Cookie & Privacy Notice</h4>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              We use cookies to analyze website traffic, enhance site navigation, and optimize your overall experience.
              By clicking "Accept", you agree to our cookie policy.
            </p>
            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={handleAccept}
                className="flex items-center gap-1 bg-[#005EB8] hover:bg-[#004B93] text-white text-xs px-3.5 py-1.5 rounded-lg font-semibold transition-colors"
              >
                <Check className="w-3.5 h-3.5" />
                Accept All
              </button>
              <button
                onClick={handleDecline}
                className="text-xs text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-gray-400 px-3 py-1.5 rounded-lg font-medium transition-colors"
              >
                Decline
              </button>
              <Link
                href="/privacy-policy"
                className="text-xs text-[#005EB8] hover:underline ml-auto font-medium"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
