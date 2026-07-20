"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Stethoscope,
  Award,
  HeartHandshake,
  CheckCircle2,
  Users,
  ShieldCheck,
  MapPin,
  Calendar,
  Sparkles,
  Clock
} from "lucide-react";
import AppointmentModal from "@/components/AppointmentModal";

export default function AboutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const teamMembers = [
    {
      name: "Dr. Sumbul Islam, MD",
      title: "Internal Medicine & Primary Care Physician",
      badge: "Lead Physician",
      image: "/dr-islam.jpg",
      initials: "SI",
      color: "bg-[#005EB8]",
      bio: "Dr. Islam is a dedicated internal medicine physician committed to delivering comprehensive, evidence-based care to adults. With extensive training in diagnostic medicine, chronic disease management, and preventative wellness, she empowers patients to actively participate in their health journey.",
      credentials: ["Board Certified Internal Medicine", "MD Degree", "Adult Wellness & Chronic Disease Specialist"],
    },
    {
      name: "Kelly",
      title: "Front Desk & Patient Relations Specialist",
      badge: "Front Desk",
      initials: "K",
      color: "bg-[#00A9CE]",
      bio: "Kelly greets every patient with warmth and ensures seamless intake, appointment scheduling, and front-desk support at our clinic locations.",
      credentials: ["Patient Scheduling", "Intake Coordination", "Insurance Verification"],
    },
    {
      name: "Peggy, LVN",
      title: "Licensed Vocational Nurse",
      badge: "Clinical Nurse",
      initials: "PL",
      color: "bg-[#FF6B6B]",
      bio: "Peggy brings compassionate clinical support to patient assessments, vital monitoring, B12 injections, and assisting Dr. Islam during wellness exams.",
      credentials: ["Licensed Vocational Nurse (LVN)", "Clinical Administration", "Injection Therapy"],
    },
    {
      name: "LESA",
      title: "Practice Manager & Care Coordinator",
      badge: "Administration",
      initials: "L",
      color: "bg-gray-800",
      bio: "LESA oversees practice administration, office workflow efficiency, patient communication, and ensuring highest standards of HIPAA compliance.",
      credentials: ["Practice Management", "Care Coordination", "Compliance Oversight"],
    },
  ];

  return (
    <div className="space-y-0">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-[#005EB8] to-[#00A9CE] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-3">
            Our Mission & Clinical Team
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">About Imperial Care Internal Medicine</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mt-4 leading-relaxed">
            Delivering thoughtful, personalized, and evidence-based adult medical care in Anna and Sherman, Texas.
          </p>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-[#005EB8] font-bold text-sm uppercase tracking-wider">
                <HeartHandshake className="w-4 h-4 text-[#00A9CE]" /> Our Philosophy & Story
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                Compassionate Care Tailored to Every Patient
              </h2>

              <p className="text-gray-700 leading-relaxed">
                At Imperial Care Internal Medicine, we believe primary care should be a true partnership between patient and physician. Founded under the leadership of Dr. Sumbul Islam, MD, our practice was established to provide adults in Collin and Grayson Counties with accessible, thorough, and empathetic healthcare.
              </p>

              <p className="text-gray-600 leading-relaxed">
                We understand that no two patients are identical. Whether you are managing complex chronic conditions such as diabetes or hypertension, seeking weight loss solutions through our Semaglutide program, or looking to maintain lifelong vitality with regular checkups, we tailor every diagnostic and treatment plan to your unique body and lifestyle.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-[#F8F9FA] rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-900 text-sm">Our Mission</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    To promote health, prevent illness, and empower adult patients with clear medical guidance in a comfortable setting.
                  </p>
                </div>
                <div className="p-4 bg-[#F8F9FA] rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-900 text-sm">Our Promise</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    No rush appointments, minimal wait times, and comprehensive physical evaluations for optimal health outcomes.
                  </p>
                </div>
              </div>
            </div>

            {/* Team Visual with team.png photo */}
            <div className="lg:col-span-6">
              <div className="bg-gradient-to-br from-[#005EB8]/10 to-[#00A9CE]/20 p-8 rounded-3xl border border-gray-200 text-center space-y-6">
                <div className="relative w-full h-[280px] rounded-2xl overflow-hidden shadow-lg border-2 border-white">
                  <Image
                    src="/team.png"
                    alt="Dr. Sumbul Islam, MD & Clinical Staff"
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Dr. Sumbul Islam, MD & Clinical Staff</h3>
                <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                  Dr. Islam and our support staff prioritize patient comfort, warm communication, and precise medical care at both our Anna and Sherman locations.
                </p>
                <div className="flex flex-wrap justify-center gap-2 pt-2">
                  <span className="bg-white text-gray-800 text-xs font-semibold px-3 py-1 rounded-full border border-gray-200">
                    Dr. Sumbul Islam, MD
                  </span>
                  <span className="bg-white text-gray-800 text-xs font-semibold px-3 py-1 rounded-full border border-gray-200">
                    Kelly (Front Desk)
                  </span>
                  <span className="bg-white text-gray-800 text-xs font-semibold px-3 py-1 rounded-full border border-gray-200">
                    Peggy, LVN
                  </span>
                  <span className="bg-white text-gray-800 text-xs font-semibold px-3 py-1 rounded-full border border-gray-200">
                    LESA (Care Admin)
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MEET THE TEAM */}
      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-[#005EB8] uppercase tracking-wider">Clinical Excellence</span>
            <h2 className="text-3xl font-extrabold text-gray-900">Meet Our Team</h2>
            <p className="text-sm text-gray-600">Dedicated professionals committed to your long-term health and wellbeing.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Photo Avatar */}
                  <div className="relative">
                    {member.image ? (
                      <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md border border-gray-100 relative">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover object-center"
                        />
                      </div>
                    ) : (
                      <div
                        className={`w-20 h-20 rounded-2xl ${member.color} text-white flex items-center justify-center text-2xl font-bold shadow-md`}
                      >
                        {member.initials}
                      </div>
                    )}
                    <span className="absolute bottom-0 left-16 bg-[#00A9CE] text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider z-10">
                      {member.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                    <p className="text-xs font-semibold text-[#005EB8] mt-0.5">{member.title}</p>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed">{member.bio}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100 space-y-1.5">
                  {member.credentials.map((cred, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px] text-gray-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00A9CE] shrink-0" />
                      <span>{cred}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">Why Choose Imperial Care?</h2>
            <p className="text-gray-600 text-sm mt-2">What sets our practice apart in Anna and Sherman, Texas.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-[#F8F9FA] rounded-2xl border border-gray-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#005EB8] text-white flex items-center justify-center font-bold mb-3">
                <Stethoscope className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-base">In-Person Thoroughness</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Direct physical examinations allow Dr. Islam to detect subtle health signs that virtual visits often miss.
              </p>
            </div>

            <div className="p-6 bg-[#F8F9FA] rounded-2xl border border-gray-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#00A9CE] text-white flex items-center justify-center font-bold mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-base">Minimal Waiting Times</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Streamlined intake procedures respect your valuable schedule so you spend more time with Dr. Islam.
              </p>
            </div>

            <div className="p-6 bg-[#F8F9FA] rounded-2xl border border-gray-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#FF6B6B] text-white flex items-center justify-center font-bold mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-base">Modern Weight Loss Protocol</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Access to compounded Semaglutide therapy monitored directly by medical staff for safe results.
              </p>
            </div>

            <div className="p-6 bg-[#F8F9FA] rounded-2xl border border-gray-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#005EB8] text-white flex items-center justify-center font-bold mb-3">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-base">Two Convenient Clinics</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Locations in Anna (Collin County) and Sherman (Grayson County) bring primary care closer to home.
              </p>
            </div>

            <div className="p-6 bg-[#F8F9FA] rounded-2xl border border-gray-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#00A9CE] text-white flex items-center justify-center font-bold mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-base">Evidence-Based Treatment</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Treatment decisions rooted in latest clinical guidelines for diabetes, hypertension, and preventive health.
              </p>
            </div>

            <div className="p-6 bg-[#F8F9FA] rounded-2xl border border-gray-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#FF6B6B] text-white flex items-center justify-center font-bold mb-3">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-base">Accepting New Patients</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Same-week appointment availability for new adult patient consultations and routine physicals.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#005EB8] hover:bg-[#004B93] text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-md"
            >
              Schedule Your Appointment with Dr. Islam
            </button>
          </div>
        </div>
      </section>

      <AppointmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
