import { MessageSquare, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function SocialMediaGuidelinesPage() {
  const guidelines = [
    {
      num: 1,
      title: "Respectful Engagement",
      text: "We welcome constructive dialogue, questions, and feedback on our social channels. We insist on respectful, civil conversation. Harassment, profanity, hate speech, or offensive language will be removed immediately.",
    },
    {
      num: 2,
      title: "No Individual Medical Advice",
      text: "Social media content posted by Imperial Care Internal Medicine (including posts, comments, videos, and direct messages) is for general educational and informational purposes only. It does NOT constitute formal medical advice or establish a doctor-patient relationship. Always consult Dr. Sumbul Islam, MD in person for diagnostic needs.",
    },
    {
      num: 3,
      title: "Protect Your Privacy & No PHI",
      text: "Never post personal health information (PHI), medical history, or confidential personal data on public social channels. To discuss your care confidentially, call our clinic office directly at (903) 957-0417.",
    },
    {
      num: 4,
      title: "Active Moderation Policy",
      text: "We reserve the right to monitor, review, hide, or delete any comments or posts that violate our policies, contain false information, promote unauthorized medical claims, or post spam.",
    },
    {
      num: 5,
      title: "Intellectual Property Rights",
      text: "All logos, images, branding graphics, and text content published on our social channels are the property of Imperial Care Internal Medicine and may not be reproduced without prior written permission.",
    },
    {
      num: 6,
      title: "No Commercial Solicitations or Spam",
      text: "Unsolicited commercial advertisements, self-promotions, affiliate links, or spam posted on our pages will be removed and repeat accounts blocked.",
    },
    {
      num: 7,
      title: "Full Legal Compliance",
      text: "Our social media engagements strictly comply with federal regulations, Texas medical board guidelines, and HIPAA patient privacy standards.",
    },
  ];

  return (
    <div className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="border-b border-gray-200 pb-6 space-y-2">
          <div className="inline-flex items-center gap-2 text-[#00A9CE] text-xs font-bold uppercase tracking-wider bg-[#00A9CE]/10 px-3 py-1 rounded-full">
            <MessageSquare className="w-4 h-4" /> Community Guidelines
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Social Media Guidelines</h1>
          <p className="text-xs text-gray-500">Official engagement standards for Imperial Care social channels.</p>
        </div>

        {/* 7 Guidelines Grid */}
        <div className="space-y-6">
          {guidelines.map((g) => (
            <div key={g.num} className="bg-[#F8F9FA] p-6 rounded-2xl border border-gray-200 space-y-2">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#005EB8] text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {g.num}
                </span>
                <h3 className="font-bold text-gray-900 text-base">{g.title}</h3>
              </div>
              <p className="text-xs text-gray-600 pl-11 leading-relaxed">{g.text}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
