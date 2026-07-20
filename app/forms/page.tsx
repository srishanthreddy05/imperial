"use client";

import { useState } from "react";
import {
  FileText,
  Download,
  Eye,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Mail,
  Printer,
  Sparkles
} from "lucide-react";
import PDFViewerModal from "@/components/PDFViewerModal";

export default function FormsPage() {
  const [activeModalForm, setActiveModalForm] = useState<{
    isOpen: boolean;
    title: string;
    type: string;
  }>({
    isOpen: false,
    title: "",
    type: "",
  });

  const formsList = [
    {
      title: "Semaglutide — Weight Loss Tracker",
      type: "weight-tracker",
      description: "Track your weekly subcutaneous dosage, body weight log, and symptom notes.",
      badge: "Weight Program",
      iconColor: "text-[#00A9CE]",
      bgColor: "bg-[#00A9CE]/10",
    },
    {
      title: "My Progress Tracker",
      type: "weight-tracker",
      description: "General health, blood pressure readings, and daily habit tracker for adult wellness.",
      badge: "Wellness",
      iconColor: "text-[#005EB8]",
      bgColor: "bg-[#005EB8]/10",
    },
    {
      title: "Semaglutide / BPC-157 Consent Form",
      type: "consent-form",
      description: "Medical disclosure and informed consent agreement for peptide weight therapy.",
      badge: "Required Consent",
      iconColor: "text-[#FF6B6B]",
      bgColor: "bg-[#FF6B6B]/10",
    },
    {
      title: "New Patient Questionnaire 2025",
      type: "new-patient",
      description: "Comprehensive medical history, current medication list, and emergency contact form.",
      badge: "New Patients",
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  const handleDownloadDirect = (title: string, type: string) => {
    const content = `IMPERIAL CARE INTERNAL MEDICINE\nDr. Sumbul Islam, MD\n\nFORM TITLE: ${title}\nForm Code: ${type}\nDate: ${new Date().toLocaleDateString()}\n\n----------------------------------------\nPATIENT INTAKE & INSTRUCTIONS:\nPlease fill out all fields completely prior to your visit.\n\nName: ______________________ DOB: _____________\nPhone: _____________________ Email: ________________________\n\nSignature: __________________ Date: _________________________\n----------------------------------------\nImperial Care Internal Medicine - Anna, TX & Sherman, TX`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title.toLowerCase().replace(/[^a-z0-9]/g, "_")}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-0">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-[#005EB8] to-[#00A9CE] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-3">
            Patient Resources & Downloads
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Patient Forms</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mt-4 leading-relaxed">
            Please download, view, and complete the appropriate intake or tracker forms before your scheduled visit.
          </p>
        </div>
      </section>

      {/* INTRO INSTRUCTIONS */}
      <section className="py-8 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#005EB8]/10 text-[#005EB8] flex items-center justify-center shrink-0">
                <FileCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-base">Save Time at Check-in</h3>
                <p className="text-xs text-gray-600 mt-0.5">
                  Completing your paperwork in advance helps Dr. Islam and staff spend more time focused on your care.
                </p>
              </div>
            </div>
            <div className="text-xs bg-[#005EB8]/5 text-[#005EB8] border border-[#005EB8]/20 px-4 py-2 rounded-xl font-semibold">
              Bring completed forms to your appointment or email them to staff.
            </div>
          </div>
        </div>
      </section>

      {/* FORMS GRID */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {formsList.map((form) => (
              <div
                key={form.title}
                className="bg-[#F8F9FA] rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${form.bgColor} ${form.iconColor}`}>
                      {form.badge}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">PDF Format</span>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-2xl ${form.bgColor} ${form.iconColor} flex items-center justify-center shrink-0 font-bold shadow-xs`}>
                      <FileText className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{form.title}</h3>
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">{form.description}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() =>
                      setActiveModalForm({
                        isOpen: true,
                        title: form.title,
                        type: form.type,
                      })
                    }
                    className="flex-1 bg-white border border-gray-300 hover:border-[#005EB8] text-gray-800 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Eye className="w-4 h-4 text-[#005EB8]" /> View Preview
                  </button>

                  <button
                    onClick={() => handleDownloadDirect(form.title, form.type)}
                    className="flex-1 bg-[#005EB8] hover:bg-[#004B93] text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                  >
                    <Download className="w-4 h-4" /> Download PDF
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Submission Instructions Box */}
          <div className="mt-16 bg-[#F8F9FA] rounded-3xl p-8 border border-gray-200 max-w-3xl mx-auto space-y-4">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#005EB8]" /> How to Submit Your Completed Forms
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-700">
              <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-1">
                <span className="font-bold text-gray-900 block">Option A: In Person</span>
                <p>Print out your completed PDF forms and hand them directly to Kelly at front desk upon arrival.</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-1">
                <span className="font-bold text-gray-900 block">Option B: Email or Fax</span>
                <p>Email scanned copies to our patient care desk or fax directly to <strong>(903) 355-2938</strong>.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* PDF Modal Viewer */}
      <PDFViewerModal
        isOpen={activeModalForm.isOpen}
        onClose={() =>
          setActiveModalForm({ ...activeModalForm, isOpen: false })
        }
        formTitle={activeModalForm.title}
        formType={activeModalForm.type}
      />
    </div>
  );
}
