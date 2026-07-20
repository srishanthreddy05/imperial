"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  MapPin,
  Scale,
  Syringe,
  ArrowRight,
  Bell,
  Calendar,
  CheckCircle2,
  Mail
} from "lucide-react";
import AppointmentModal from "@/components/AppointmentModal";

export default function WhatsNewPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <div className="space-y-0">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-[#005EB8] to-[#00A9CE] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-3">
            Latest Announcements & Services
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">What's New at Imperial Care</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mt-4 leading-relaxed">
            Stay up to date with our expanding practice locations, new wellness treatments, and clinical updates for patients in Collin & Grayson Counties.
          </p>
        </div>
      </section>

      {/* ANNOUNCEMENT CARDS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* CARD 1: NEW LOCATION */}
            <div className="bg-[#F8F9FA] rounded-3xl p-8 border-2 border-[#005EB8]/30 shadow-md flex flex-col justify-between relative overflow-hidden card-hover">
              <div className="absolute top-4 right-4 bg-[#005EB8] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                FEATURED
              </div>

              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#005EB8] text-white flex items-center justify-center shadow-md">
                  <MapPin className="w-7 h-7" />
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-bold text-[#005EB8] uppercase tracking-wider">
                    Expansion Announcement
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900">NEW LOCATION!</h3>
                </div>

                <p className="text-sm text-gray-700 leading-relaxed">
                  We are thrilled to announce that Imperial Care Internal Medicine is now accepting patients at our brand-new <strong>Collin County location in Anna, TX!</strong>
                </p>

                <div className="bg-white p-4 rounded-xl border border-gray-200 text-xs space-y-1 text-gray-700">
                  <p className="font-bold text-gray-900">Address:</p>
                  <p>450 N Standridge Blvd, Suite 104<br />Anna, TX 75409, USA</p>
                  <p className="pt-1 text-[#005EB8] font-bold">Call: (903) 957-0417</p>
                </div>

                <p className="text-xs text-gray-600 italic">
                  "Call or come see us to schedule your appointment today!"
                </p>
              </div>

              <div className="pt-6 border-t border-gray-200 mt-6">
                <Link
                  href="/locations"
                  className="w-full bg-[#005EB8] hover:bg-[#004B93] text-white py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
                >
                  View Anna Location Details <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* CARD 2: SEMAGLUTIDE WEIGHT LOSS */}
            <div className="bg-[#F8F9FA] rounded-3xl p-8 border-2 border-[#00A9CE]/40 shadow-md flex flex-col justify-between relative overflow-hidden card-hover">
              <div className="absolute top-4 right-4 bg-[#00A9CE] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                NEW PROGRAM
              </div>

              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#00A9CE] text-white flex items-center justify-center shadow-md">
                  <Scale className="w-7 h-7" />
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-bold text-[#00A9CE] uppercase tracking-wider">
                    Medical Weight Loss
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900">Semaglutide Weight Loss Injection</h3>
                </div>

                <p className="text-sm text-gray-700 leading-relaxed">
                  A revolutionary medical weight loss solution now available! Our compounded subcutaneous Semaglutide protocol helps lower A1C, reduce BMI, and support 2-4 lbs per week weight loss.
                </p>

                <div className="space-y-2 text-xs text-gray-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00A9CE]" /> 1x Weekly self-administered injection
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00A9CE]" /> Gradual dose titration protocol
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00A9CE]" /> Direct physician & nurse supervision
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200 mt-6">
                <Link
                  href="/services#semaglutide"
                  className="w-full bg-[#00A9CE] hover:bg-[#008cae] text-white py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
                >
                  Explore Weight Loss Details <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* CARD 3: VITAMIN B12 */}
            <div className="bg-[#F8F9FA] rounded-3xl p-8 border-2 border-[#FF6B6B]/30 shadow-md flex flex-col justify-between relative overflow-hidden card-hover">
              <div className="absolute top-4 right-4 bg-[#FF6B6B] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                NOW AVAILABLE
              </div>

              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#FF6B6B] text-white flex items-center justify-center shadow-md">
                  <Syringe className="w-7 h-7" />
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-bold text-[#FF6B6B] uppercase tracking-wider">
                    Vitality & Energy
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900">Vitamin B12 Injections</h3>
                </div>

                <p className="text-sm text-gray-700 leading-relaxed">
                  Combat chronic fatigue, pins-and-needles paresthesia, and brain fog! Vitamin B12 shots promote red blood cell formation, bone density, and immediate cellular energy boost.
                </p>

                <div className="space-y-2 text-xs text-gray-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#FF6B6B]" /> Quick, painless in-office administration
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#FF6B6B]" /> Ideal for older adults & Metformin users
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#FF6B6B]" /> No long waiting room delay
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200 mt-6">
                <Link
                  href="/services#vitamin-b12"
                  className="w-full bg-[#FF6B6B] hover:bg-red-600 text-white py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
                >
                  View B12 Benefits <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>

          {/* NEWSLETTER SUBSCRIBE CTA */}
          <div className="mt-16 bg-gradient-to-r from-[#005EB8] to-[#00A9CE] p-8 sm:p-12 rounded-3xl text-white shadow-xl">
            <div className="max-w-2xl mx-auto text-center space-y-4">
              <Bell className="w-10 h-10 text-[#00A9CE] mx-auto bg-white/10 p-2 rounded-2xl" />
              <h2 className="text-2xl sm:text-3xl font-extrabold">Never Miss a Practice Update</h2>
              <p className="text-sm text-white/90">
                Subscribe to receive seasonal health tips, new clinic schedule updates, and wellness offers from Imperial Care Internal Medicine.
              </p>

              {!subscribed ? (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 pt-2 max-w-md mx-auto">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-4 py-3 rounded-xl text-gray-900 bg-white text-sm focus:outline-hidden flex-1"
                  />
                  <button
                    type="submit"
                    className="bg-[#2D3436] hover:bg-gray-900 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md"
                  >
                    Subscribe
                  </button>
                </form>
              ) : (
                <div className="bg-white/20 p-4 rounded-xl text-sm font-semibold text-white">
                  Thank you! You are now subscribed to Imperial Care practice updates.
                </div>
              )}
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#005EB8] text-white hover:bg-[#004B93] px-8 py-3.5 rounded-xl font-bold text-sm shadow-md"
            >
              Contact Us to Learn More
            </button>
          </div>

        </div>
      </section>

      <AppointmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
