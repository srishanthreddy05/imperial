import { Phone, MessageSquare, CheckCircle2 } from "lucide-react";

export default function SMSTermsPage() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="border-b border-gray-200 pb-6 space-y-2">
          <div className="inline-flex items-center gap-2 text-[#005EB8] text-xs font-bold uppercase tracking-wider bg-[#005EB8]/10 px-3 py-1 rounded-full">
            <MessageSquare className="w-4 h-4" /> Messaging Agreement
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">SMS Terms & Conditions</h1>
          <p className="text-xs text-gray-500">Imperial Care Text Messaging Program Disclosures</p>
        </div>

        <div className="prose prose-blue max-w-none text-sm text-gray-700 space-y-6 leading-relaxed">
          <p>
            By opting into text messaging from Imperial Care Internal Medicine, you agree to receive SMS communications regarding your healthcare appointments, intake documentation, and practice notices.
          </p>

          <div className="space-y-2">
            <h3 className="font-bold text-gray-900 text-base">1. Types of SMS Messages</h3>
            <ul className="list-disc pl-5 text-xs text-gray-600 space-y-1">
              <li>Appointment confirmations and pre-visit check-in reminders.</li>
              <li>Lab result notification alerts and scheduling follow-ups.</li>
              <li>Semaglutide weight loss weekly tracker check-in alerts.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-gray-900 text-base">2. Message Frequency & Fees</h3>
            <p className="text-xs text-gray-600">
              Message frequency varies depending on your scheduled appointments and treatment program. Standard <strong>message and data rates may apply</strong> from your mobile carrier.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-gray-900 text-base">3. How to Opt-Out (Unsubscribe)</h3>
            <p className="text-xs text-gray-600">
              You can cancel text message communications at any time. Simply reply <strong>STOP</strong> to any SMS message received from us. After sending STOP, you will receive a single confirmation text confirming your opt-out.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-gray-900 text-base">4. How to Get Help</h3>
            <p className="text-xs text-gray-600">
              If you need assistance with text messages, reply <strong>HELP</strong> to any SMS or call our clinic directly at <strong>(903) 957-0417</strong>.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-gray-900 text-base">5. Carrier Disclaimers</h3>
            <p className="text-xs text-gray-600">
              Carriers are not liable for delayed or undelivered messages. We do not sell or share mobile numbers with third parties for marketing purposes.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
