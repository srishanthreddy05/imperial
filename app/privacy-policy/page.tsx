import Link from "next/link";
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2 } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="border-b border-gray-200 pb-6 space-y-2">
          <div className="inline-flex items-center gap-2 text-[#005EB8] text-xs font-bold uppercase tracking-wider bg-[#005EB8]/10 px-3 py-1 rounded-full">
            <ShieldCheck className="w-4 h-4" /> Imperial Care Privacy Policy
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Privacy Policy</h1>
          <p className="text-xs text-gray-500">Last Updated: January 2026</p>
        </div>

        {/* Content Body */}
        <div className="prose prose-blue max-w-none text-sm text-gray-700 space-y-6 leading-relaxed">
          <p>
            Imperial Care Internal Medicine (“we,” “our,” or “us”) respects your privacy and is dedicated to protecting personal information collected through our website and clinic services in Anna, TX and Sherman, TX. This Privacy Policy details how we collect, use, safeguard, and disclose your data.
          </p>

          <div className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900 border-l-4 border-[#005EB8] pl-3">
              1. Information We Collect
            </h2>
            <p>We may collect personal and non-personal details when you visit our website, schedule an appointment, or complete contact forms:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
              <li><strong>Contact Information:</strong> Name, phone number, email address, physical address.</li>
              <li><strong>Appointment Data:</strong> Preferred clinic location, date/time preferences, primary visit reason.</li>
              <li><strong>Technical & Usage Data:</strong> IP address, browser type, pages viewed, time spent on site via cookies and Google Analytics 4.</li>
              <li><strong>Note on Protected Health Information (PHI):</strong> Online contact forms are intended for general scheduling inquiries. Specific clinical medical records are protected under HIPAA guidelines.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900 border-l-4 border-[#005EB8] pl-3">
              2. How We Use Your Information
            </h2>
            <p>Your information is processed for the following legitimate healthcare and business purposes:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
              <li>Scheduling and confirming your in-office or phone appointments.</li>
              <li>Responding to patient questions regarding Semaglutide weight loss or B12 injections.</li>
              <li>Improving our website functionality, security, and user experience.</li>
              <li>Sending necessary appointment reminders via SMS or email (with your consent).</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900 border-l-4 border-[#005EB8] pl-3">
              3. Data Protection & Security
            </h2>
            <p>
              We implement industry-standard administrative, physical, and technical safeguards (including HTTPS/SSL encryption) to guard your personal data against unauthorized access, loss, or alteration.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900 border-l-4 border-[#005EB8] pl-3">
              4. Third-Party Disclosure
            </h2>
            <p>
              We do NOT sell, trade, or rent your personal information to third parties. We may disclose data only to trusted service providers who assist us in operating our website or conducting our business, provided those parties agree to keep information confidential.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900 border-l-4 border-[#005EB8] pl-3">
              5. Cookies & Analytics
            </h2>
            <p>
              Our website uses cookies and Google Analytics 4 to understand visitor traffic patterns. You can choose to accept or decline non-essential cookies via our site banner or modify your browser settings.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900 border-l-4 border-[#005EB8] pl-3">
              6. Your Patient Rights
            </h2>
            <p>
              You have the right to request access to the personal information we hold about you, request corrections, or opt-out of marketing communications at any time by contacting our office.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900 border-l-4 border-[#005EB8] pl-3">
              7. Contact Us Regarding Privacy
            </h2>
            <p className="text-xs">
              If you have questions regarding this Privacy Policy, please contact:<br />
              <strong>Imperial Care Internal Medicine</strong><br />
              Phone: (903) 957-0417 | Fax: (903) 355-2938<br />
              Anna Clinic: 450 N Standridge Blvd, Suite 104, Anna, TX 75409<br />
              Sherman Clinic: 1700 N Travis St, Sherman, TX 75092
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
