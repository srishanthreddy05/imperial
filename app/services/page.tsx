"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Stethoscope,
  Scale,
  Syringe,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  Heart,
  Calendar,
  Sparkles
} from "lucide-react";
import AppointmentModal from "@/components/AppointmentModal";

export default function ServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const b12Symptoms = [
    "Extreme tiredness / chronic fatigue",
    "Lack of physical energy & stamina",
    "Pins and needles sensation (paresthesia)",
    "Sore or red tongue (glossitis)",
    "Frequent mouth ulcers",
    "Muscle weakness & difficulty balancing",
    "Disturbed or blurry vision",
    "Depression or feelings of confusion",
    "Memory problems & brain fog",
  ];

  const b12Candidates = [
    "Older adults (age 50+) with reduced absorption",
    "Patients with GI disorders (Celiac, Crohn's, IBS)",
    "Post-surgical or bariatric patients",
    "Vegans and strict vegetarians",
    "Long-term Metformin users (Diabetes management)",
    "Long-term PPI / Acid Reflux medication users",
  ];

  return (
    <div className="space-y-0">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-[#005EB8] to-[#00A9CE] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-3">
            Internal Medicine & Wellness Solutions
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Our Medical Services</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mt-4 leading-relaxed">
            From comprehensive adult primary care to compounded Semaglutide weight loss and Vitamin B12 vitality injections in Anna and Sherman, TX.
          </p>
        </div>
      </section>

      {/* QUICK SERVICE JUMP LINKS */}
      <section className="bg-gray-100 py-4 border-b border-gray-200 sticky top-[73px] z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 flex justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-bold">
          <a href="#primary-care" className="text-[#005EB8] hover:underline flex items-center gap-1">
            <Stethoscope className="w-4 h-4" /> Primary Care
          </a>
          <span className="text-gray-300">|</span>
          <a href="#semaglutide" className="text-[#00A9CE] hover:underline flex items-center gap-1">
            <Scale className="w-4 h-4" /> Semaglutide Weight Loss
          </a>
          <span className="text-gray-300">|</span>
          <a href="#vitamin-b12" className="text-[#FF6B6B] hover:underline flex items-center gap-1">
            <Syringe className="w-4 h-4" /> Vitamin B12 Injections
          </a>
        </div>
      </section>

      {/* SECTION 1: PRIMARY CARE */}
      <section id="primary-care" className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-[#005EB8] font-bold text-xs uppercase tracking-wider bg-[#005EB8]/10 px-3 py-1 rounded-full">
                <Stethoscope className="w-4 h-4" /> Comprehensive Adult Healthcare
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                Primary Care & Wellness Exams
              </h2>

              <p className="text-base text-gray-700 leading-relaxed">
                Dr. Sumbul Islam, MD provides full-spectrum internal medicine for adults of all ages. We focus on early detection, disease prevention, and active management of existing health conditions.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-[#F8F9FA] rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#005EB8]" /> Adult Wellness Exams
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Annual physical assessments, comprehensive blood work, lipid panels, and baseline organ function checks.
                  </p>
                </div>

                <div className="p-4 bg-[#F8F9FA] rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#005EB8]" /> Chronic Disease Care
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Expert management of hypertension, Type 2 diabetes, cholesterol, asthma, thyroid disease, and arthritis.
                  </p>
                </div>

                <div className="p-4 bg-[#F8F9FA] rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#005EB8]" /> Preventative Care
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Immunization reviews, cancer screening recommendations, and cardiovascular risk evaluation.
                  </p>
                </div>

                <div className="p-4 bg-[#F8F9FA] rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#005EB8]" /> New Symptom Evaluation
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Thorough physical examination and diagnostic evaluation for unexplained fatigue, pain, or discomfort.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-[#005EB8] hover:bg-[#004B93] text-white px-6 py-3 rounded-xl text-xs font-bold shadow-md"
                >
                  Schedule Primary Care Exam
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-gradient-to-br from-[#005EB8] to-[#00A9CE] p-8 rounded-3xl text-white shadow-xl space-y-6">
                <h3 className="text-2xl font-bold">Why Primary Care Matters</h3>
                <p className="text-sm text-white/90 leading-relaxed">
                  Regular primary care visits build a medical history baseline that enables Dr. Islam to catch health changes early when they are most treatable.
                </p>
                <div className="space-y-3 text-xs bg-white/10 p-4 rounded-xl backdrop-blur-xs">
                  <div className="flex justify-between border-b border-white/20 pb-2">
                    <span>Routine Physicals:</span>
                    <span className="font-bold">Recommended Yearly</span>
                  </div>
                  <div className="flex justify-between border-b border-white/20 pb-2">
                    <span>Diabetes / A1C Check:</span>
                    <span className="font-bold">Every 3-6 Months</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Blood Pressure Monitoring:</span>
                    <span className="font-bold">Each Visit</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: SEMAGLUTIDE WEIGHT LOSS PROGRAM */}
      <section id="semaglutide" className="py-20 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="bg-[#00A9CE]/20 text-[#00A9CE] border border-[#00A9CE]/30 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
              Compounded Weight Management
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Semaglutide Weight Loss Program
            </h2>
            <p className="text-base text-gray-600">
              A breakthrough, evidence-based solution for rapid, sustained weight management supervised by Dr. Sumbul Islam, MD.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            
            {/* Left Column: Benefits & Overview */}
            <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-[#00A9CE]" /> Key Benefits of Semaglutide
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#00A9CE] shrink-0 mt-0.5" />
                  <span>Promotes targeted body fat burning</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#00A9CE] shrink-0 mt-0.5" />
                  <span>Improves blood sugar regulation</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#00A9CE] shrink-0 mt-0.5" />
                  <span>Helps lower A1C levels</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#00A9CE] shrink-0 mt-0.5" />
                  <span>Reduces Body Mass Index (BMI)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#00A9CE] shrink-0 mt-0.5" />
                  <span>Reduces plaque hemorrhage risks</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#00A9CE] shrink-0 mt-0.5" />
                  <span>Lowers fasting glucose levels</span>
                </div>
              </div>

              <div className="bg-[#00A9CE]/10 p-5 rounded-2xl border border-[#00A9CE]/20 space-y-2">
                <h4 className="font-bold text-[#005EB8] text-sm">Injection Protocol & Dose Increments</h4>
                <p className="text-xs text-gray-700 leading-relaxed">
                  Administered as a once-weekly subcutaneous injection (using a tiny needle similar to insulin). Patients begin on a low starting dose (e.g., 0.25 mg) for the first 4 weeks, with gradual step-up adjustments to minimize side effects and optimize appetite suppression.
                </p>
              </div>

              <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200 space-y-1">
                <h4 className="font-bold text-amber-900 text-sm flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-600" /> Expected Results & Potential Side Effects
                </h4>
                <p className="text-xs text-amber-800 leading-relaxed">
                  <strong>Expected Results:</strong> Average weight loss of <strong>2 to 4 lbs per week</strong> when combined with a balanced diet and regular physical activity.<br />
                  <strong>Side Effects:</strong> Mild nausea, fullness, vomiting, diarrhea, or constipation may occur initially, but are generally controllable with dose titration.
                </p>
              </div>
            </div>

            {/* Right Column: 3-Step Process */}
            <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">How to Get Started</h3>
                
                <div className="space-y-6 relative before:absolute before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-gray-200">
                  
                  {/* Step 1 */}
                  <div className="relative flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#005EB8] text-white font-bold text-xs flex items-center justify-center shrink-0 z-10">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Wellness Consultation</h4>
                      <p className="text-xs text-gray-600 mt-0.5">
                        Consult with our Wellness Coach and review your weight history and health goals.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="relative flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#00A9CE] text-white font-bold text-xs flex items-center justify-center shrink-0 z-10">
                      2
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Medical Review</h4>
                      <p className="text-xs text-gray-600 mt-0.5">
                        Dr. Islam or Nurse Practitioner reviews lab work and confirms candidate eligibility.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="relative flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#FF6B6B] text-white font-bold text-xs flex items-center justify-center shrink-0 z-10">
                      3
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Prescription & Weekly Tracker</h4>
                      <p className="text-xs text-gray-600 mt-0.5">
                        Prescription is ordered, and you receive your weekly progress tracking kit.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-[#00A9CE] hover:bg-[#008cae] text-white py-3.5 rounded-xl font-bold text-xs shadow-md"
                >
                  Schedule Weight Loss Consultation
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 3: VITAMIN B12 INJECTIONS */}
      <section id="vitamin-b12" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="bg-[#FF6B6B]/10 text-[#FF6B6B] border border-[#FF6B6B]/20 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
                Vitality & Energy Boost
              </span>
              
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                Vitamin B12 Injections
              </h2>

              <p className="text-base text-gray-700 leading-relaxed">
                Unlock a new level of vitality! Vitamin B12 is essential for red blood cell formation, neurological nerve protection, and cellular energy production.
              </p>

              <div className="space-y-3">
                <h4 className="font-bold text-gray-900 text-sm">Key Health Benefits:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF6B6B]" /> Red blood cell formation</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF6B6B]" /> Anemia prevention</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF6B6B]" /> Bone density support</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF6B6B]" /> Reduced macular degeneration risk</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF6B6B]" /> Enhanced mood & brain health</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF6B6B]" /> Immediate cellular energy boost</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF6B6B]" /> Cardiovascular heart health</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF6B6B]" /> Healthy hair, skin & nails</div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-[#FF6B6B] hover:bg-red-600 text-white px-7 py-3.5 rounded-xl font-bold text-xs shadow-md"
                >
                  Book Vitamin B12 Injection
                </button>
              </div>
            </div>

            {/* B12 Deficiency Checklist */}
            <div className="lg:col-span-6 bg-[#F8F9FA] p-8 rounded-3xl border border-gray-200 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-[#FF6B6B]" /> 9 Symptoms of B12 Deficiency
                </h3>
                <p className="text-xs text-gray-600 mt-1">
                  If you experience several of these signs, a B12 injection can help restore balance:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {b12Symptoms.map((symp, i) => (
                  <div key={i} className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-gray-200">
                    <span className="w-5 h-5 rounded-full bg-[#FF6B6B]/10 text-[#FF6B6B] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-gray-700 font-medium">{symp}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-gray-200">
                <h4 className="font-bold text-xs text-gray-900 mb-2">Who Needs B12 Therapy?</h4>
                <div className="flex flex-wrap gap-1.5">
                  {b12Candidates.map((cand, i) => (
                    <span key={i} className="bg-white text-gray-700 text-[11px] font-medium px-2.5 py-1 rounded-md border border-gray-200">
                      {cand}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* IN-PERSON CARE EMPHASIS */}
      <section className="py-16 bg-[#005EB8] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="text-3xl font-extrabold">Experience the Difference of Hands-on Care</h2>
          <p className="text-base text-white/90 max-w-2xl mx-auto leading-relaxed">
            Visiting us at our Anna or Sherman office ensures complete medical evaluations, accurate blood pressure readings, and direct face-to-face consultation with Dr. Sumbul Islam.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-[#005EB8] hover:bg-gray-100 font-bold px-8 py-3 rounded-xl text-sm shadow-md"
            >
              Schedule Your Visit Today
            </button>
          </div>
        </div>
      </section>

      <AppointmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
