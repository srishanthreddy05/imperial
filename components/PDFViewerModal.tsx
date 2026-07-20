"use client";

import { X, Download, Printer, FileText, CheckCircle2 } from "lucide-react";

interface PDFViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  formTitle: string;
  formType: string;
}

export default function PDFViewerModal({
  isOpen,
  onClose,
  formTitle,
  formType,
}: PDFViewerModalProps) {
  if (!isOpen) return null;

  const handleDownload = () => {
    // Create dummy downloadable text file simulating PDF download
    const content = `IMPERIAL CARE INTERNAL MEDICINE\nDr. Sumbul Islam, MD\n\nFORM TITLE: ${formTitle}\nForm Code: ${formType}\nDate: ${new Date().toLocaleDateString()}\n\n----------------------------------------\nPATIENT INTAKE & INSTRUCTIONS:\nPlease fill out all fields completely prior to your visit. Bring this document with you or email to clinic staff.\n\nName: ______________________ Date of Birth: _____________\nPhone: _____________________ Email: ________________________\nAddress: ____________________________________________________\n\nSign: ______________________ Date: _________________________\n----------------------------------------\nImperial Care Internal Medicine - Anna, TX & Sherman, TX\nPhone: (903) 957-0417 | Fax: (903) 355-2938`;
    
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${formTitle.toLowerCase().replace(/[^a-z0-9]/g, "_")}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col border border-gray-100 relative">
        {/* Header */}
        <div className="bg-[#005EB8] text-white p-5 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-[#00A9CE]" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">{formTitle}</h3>
              <p className="text-xs text-white/80">Imperial Care Official Patient Document</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 bg-[#00A9CE] hover:bg-[#008cae] text-white text-xs px-3.5 py-2 rounded-lg font-semibold transition-colors"
            >
              <Download className="w-4 h-4" /> Download PDF
            </button>
            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs px-3.5 py-2 rounded-lg font-semibold transition-colors"
            >
              <Printer className="w-4 h-4" /> Print
            </button>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10"
              aria-label="Close document modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Document Content Preview */}
        <div className="p-6 overflow-y-auto bg-gray-50 flex-1 space-y-6 text-gray-800 text-sm">
          <div className="bg-white p-8 rounded-xl shadow-xs border border-gray-200 max-w-2xl mx-auto space-y-6">
            
            {/* Header branding */}
            <div className="border-b pb-4 text-center">
              <h2 className="text-xl font-bold text-[#005EB8]">IMPERIAL CARE INTERNAL MEDICINE</h2>
              <p className="text-xs text-gray-600">Dr. Sumbul Islam, MD — Internal Medicine</p>
              <p className="text-xs text-gray-500 mt-1">
                450 N Standridge Blvd, Suite 104, Anna, TX 75409 | 1700 N Travis St, Sherman, TX 75092
              </p>
              <p className="text-xs text-gray-500">Phone: (903) 957-0417 | Fax: (903) 355-2938</p>
            </div>

            {/* Document Title */}
            <div className="bg-[#005EB8]/5 p-4 rounded-lg border border-[#005EB8]/10 text-center">
              <h3 className="text-base font-bold text-[#005EB8] uppercase tracking-wide">
                {formTitle}
              </h3>
              <span className="text-xs text-gray-500 font-mono">Ref code: {formType}</span>
            </div>

            {/* Mock Form Fields */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="border-b border-gray-300 pb-1">
                  <span className="text-xs text-gray-500 block">Patient Name</span>
                  <span className="text-sm font-medium text-gray-400">[ Complete upon printing / download ]</span>
                </div>
                <div className="border-b border-gray-300 pb-1">
                  <span className="text-xs text-gray-500 block">Date of Birth</span>
                  <span className="text-sm font-medium text-gray-400">MM / DD / YYYY</span>
                </div>
              </div>

              {formType === "weight-tracker" && (
                <div className="space-y-3 pt-2">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#005EB8]">Weekly Weight & Dosage Tracking Table</h4>
                  <table className="w-full text-xs border border-gray-300 border-collapse text-left">
                    <thead>
                      <tr className="bg-gray-100 border-b">
                        <th className="p-2 border">Week</th>
                        <th className="p-2 border">Injection Date</th>
                        <th className="p-2 border">Dose (mg)</th>
                        <th className="p-2 border">Weight (lbs)</th>
                        <th className="p-2 border">Notes / Symptoms</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((w) => (
                        <tr key={w} className="border-b">
                          <td className="p-2 border font-bold">Week {w}</td>
                          <td className="p-2 border text-gray-400">___/___/2026</td>
                          <td className="p-2 border text-gray-400">{w <= 4 ? "0.25 mg" : "0.50 mg"}</td>
                          <td className="p-2 border text-gray-400">______ lbs</td>
                          <td className="p-2 border text-gray-400">__________________</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {formType === "consent-form" && (
                <div className="space-y-3 text-xs leading-relaxed text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-gray-900 text-sm">Medical Informed Consent Terms</h4>
                  <p>
                    I hereby acknowledge that I have received detailed information regarding the administration of Semaglutide / BPC-157 therapies. I understand the expected benefits (weight management, metabolic improvement) as well as potential side effects (nausea, fatigue, gastrointestinal discomfort).
                  </p>
                  <p>
                    I confirm that I am participating voluntarily under the direct supervision of Dr. Sumbul Islam, MD and clinical team.
                  </p>
                  <div className="pt-4 border-t border-gray-300 grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-gray-500">Patient Signature:</span>
                      <div className="h-8 border-b border-gray-400 mt-2"></div>
                    </div>
                    <div>
                      <span className="block text-gray-500">Date:</span>
                      <div className="h-8 border-b border-gray-400 mt-2"></div>
                    </div>
                  </div>
                </div>
              )}

              {formType === "new-patient" && (
                <div className="space-y-3 pt-2 text-xs">
                  <h4 className="font-bold text-[#005EB8] text-sm">Medical History & Allergies Questionnaire</h4>
                  <div className="space-y-2">
                    <p className="font-semibold text-gray-800">1. Current Medications / Supplements:</p>
                    <div className="h-12 border rounded-md bg-gray-50 p-2 text-gray-400">List all prescription & OTC medications...</div>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-gray-800">2. Known Drug Allergies:</p>
                    <div className="h-10 border rounded-md bg-gray-50 p-2 text-gray-400">Penicillin, Latex, Sulfa, etc...</div>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-gray-800">3. Past Medical Conditions (Check all that apply):</p>
                    <div className="grid grid-cols-2 gap-2 text-gray-700">
                      <label className="flex items-center gap-1.5"><input type="checkbox" disabled /> High Blood Pressure</label>
                      <label className="flex items-center gap-1.5"><input type="checkbox" disabled /> Type 2 Diabetes / Pre-diabetes</label>
                      <label className="flex items-center gap-1.5"><input type="checkbox" disabled /> Thyroid Disorders</label>
                      <label className="flex items-center gap-1.5"><input type="checkbox" disabled /> Heart Disease / Cholesterol</label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="text-center pt-4 border-t text-xs text-gray-400">
              Imperial Care Internal Medicine • Official Intake Documentation • Confidential Medical Record
            </div>

          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-white border-t border-gray-200 flex justify-between items-center rounded-b-2xl">
          <span className="text-xs text-gray-500 hidden sm:inline-block">
            Need help? Call office at (903) 957-0417
          </span>
          <div className="flex gap-3 ml-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-50"
            >
              Close Preview
            </button>
            <button
              onClick={handleDownload}
              className="px-5 py-2 bg-[#005EB8] hover:bg-[#004B93] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" /> Download PDF File
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
