import { FileText, ShieldCheck, AlertTriangle } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="border-b border-gray-200 pb-6 space-y-2">
          <div className="inline-flex items-center gap-2 text-[#005EB8] text-xs font-bold uppercase tracking-wider bg-[#005EB8]/10 px-3 py-1 rounded-full">
            <FileText className="w-4 h-4" /> Legal Agreement
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Terms of Service</h1>
          <p className="text-xs text-gray-500">Website usage agreement and medical disclaimers.</p>
        </div>

        <div className="prose prose-blue max-w-none text-sm text-gray-700 space-y-6 leading-relaxed">
          <p>
            Welcome to the official website of Imperial Care Internal Medicine. By accessing or using this website, you agree to comply with and be bound by the following Terms of Service.
          </p>

          <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200 space-y-2 text-xs text-amber-900">
            <h3 className="font-bold text-amber-900 text-sm flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" /> Medical Advice Disclaimer
            </h3>
            <p>
              The information, graphics, text, and materials contained on this website are for general educational purposes only and do NOT constitute professional medical advice, diagnosis, or treatment. Always seek the advice of Dr. Sumbul Islam, MD or another qualified health provider with any questions regarding a medical condition. Never disregard professional medical advice or delay seeking it because of something you have read on this website.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-gray-900 text-base">1. Intellectual Property</h3>
            <p className="text-xs text-gray-600">
              All website content, including practice logos, text, design elements, forms, and service descriptions are the intellectual property of Imperial Care Internal Medicine. Unauthorized reproduction or redistribution is prohibited.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-gray-900 text-base">2. Limitation of Liability</h3>
            <p className="text-xs text-gray-600">
              Imperial Care Internal Medicine shall not be held liable for any direct, indirect, incidental, or consequential damages resulting from the use of, or inability to use, this website or reliance on any material presented herein.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-gray-900 text-base">3. Governing Law</h3>
            <p className="text-xs text-gray-600">
              These Terms of Service are governed by and construed in accordance with the laws of the State of Texas, without regard to its conflict of law principles.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-gray-900 text-base">4. Contact Information</h3>
            <p className="text-xs text-gray-600">
              For questions regarding these terms, please contact our clinic at (903) 957-0417.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
