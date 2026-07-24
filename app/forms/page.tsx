"use client";

import { FileText, Download, Eye, FileCheck, Mail, Sparkles } from "lucide-react";
import { formsList } from "@/lib/forms";

export default function FormsPage() {
  return (
    <div className="space-y-0 min-h-screen bg-gray-50/50">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-[#005EB8] to-[#00A9CE] text-white py-16 lg:py-20 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -left-24 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Patient Resources & Downloads
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-montserrat">
            Patient Forms
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mt-4 leading-relaxed font-sans">
            Download and complete these forms before your visit to streamline your check-in process.
          </p>
        </div>
      </section>

      {/* INTRO INSTRUCTIONS */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F8F9FA] p-6 rounded-2xl border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#005EB8]/10 text-[#005EB8] flex items-center justify-center shrink-0">
                <FileCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-base font-montserrat">Save Time at Check-in</h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-0.5 leading-relaxed font-sans">
                  Completing your paperwork in advance helps Dr. Islam and our staff spend more time focused on your care.
                </p>
              </div>
            </div>
            <div className="text-xs bg-[#005EB8]/5 text-[#005EB8] border border-[#005EB8]/20 px-4 py-2.5 rounded-xl font-bold font-sans">
              Bring completed forms to your appointment or email them to our staff.
            </div>
          </div>
        </div>
      </section>

      {/* FORMS GRID */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {formsList.map((form) => (
              <div
                key={form.title}
                className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-[#005EB8]/10 text-[#005EB8]">
                      {form.badge}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">PDF Format</span>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center shrink-0 border border-red-100 shadow-2xs group-hover:scale-105 transition-transform duration-300">
                      <FileText className="w-7 h-7" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-gray-900 leading-snug font-montserrat">
                        {form.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
                        {form.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
                  <a
                    href={form.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-white border border-gray-200 hover:border-[#005EB8] text-gray-700 hover:text-[#005EB8] py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-300 hover:shadow-xs"
                  >
                    <Eye className="w-4 h-4 text-[#005EB8]" /> View PDF
                  </a>

                  <a
                    href={form.file}
                    download
                    className="flex-1 bg-[#005EB8] hover:bg-[#004B93] text-white py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs hover:shadow-md transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <Download className="w-4 h-4" /> Download
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Submission Instructions Box */}
          <div className="mt-16 bg-white rounded-3xl p-8 border border-gray-200 max-w-3xl mx-auto space-y-4 shadow-2xs">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 font-montserrat">
              <Mail className="w-5 h-5 text-[#005EB8]" /> How to Submit Your Completed Forms
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-gray-700">
              <div className="bg-[#F8F9FA] p-5 rounded-xl border border-gray-100 space-y-1.5">
                <span className="font-bold text-gray-900 block font-montserrat">Option A: In Person</span>
                <p className="leading-relaxed font-sans text-gray-600 text-xs">
                  Print out your completed PDF forms and hand them directly to Kelly at our front desk upon arrival.
                </p>
              </div>

              <div className="bg-[#F8F9FA] p-5 rounded-xl border border-gray-100 space-y-1.5">
                <span className="font-bold text-gray-900 block font-montserrat">Option B: Email or Fax</span>
                <p className="leading-relaxed font-sans text-gray-600 text-xs">
                  Email scanned copies to our patient care desk or fax directly to <strong className="text-gray-800">(903) 355-2938</strong>.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
