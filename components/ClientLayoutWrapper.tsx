"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import AppointmentModal from "@/components/AppointmentModal";
import QuickActions from "@/components/QuickActions";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans relative">
      <Navbar onOpenAppointmentModal={() => setIsAppointmentOpen(true)} />
      <main className="flex-1">{children}</main>
      <Footer />
      <CookieConsent />
      <QuickActions />
      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
      />
    </div>
  );
}
