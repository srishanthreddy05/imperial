"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  CircleCheckBig,
} from "lucide-react";
import AppointmentModal from "@/components/AppointmentModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const sectionReveal = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const semaglutideHighlights = [
  "Appetite suppression",
  "Weight reduction",
  "Lower A1C",
  "Better blood sugar control",
  "Lower BMI",
  "Weekly injections",
];

const b12Symptoms = [
  "Extreme tiredness",
  "Low energy",
  "Pins and needles",
  "Muscle weakness",
  "Memory problems",
  "Depression",
];

const b12WhoMayBenefit = [
  "Older adults",
  "Patients with gastrointestinal disorders",
  "People following vegan diets",
  "Patients taking Metformin",
  "Patients taking proton pump inhibitors",
];

const hormoneSymptoms = [
  "Reduced energy",
  "Reduced muscle strength",
  "Weight gain",
  "Mental fog",
  "Mood changes",
  "Reduced libido",
];

const hormoneBenefits = [
  "Improved vitality",
  "Better mood",
  "Improved energy",
  "Healthy aging",
  "Better mental clarity",
  "Improved overall wellness",
];

export default function WhatsNewPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="overflow-x-clip bg-white text-slate-900">
      <main className="mx-auto max-w-[1200px] space-y-20 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <section className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#005EB8]">
            Practice Updates
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            What&apos;s New at Imperial Care
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Stay up to date with our expanding practice locations, new wellness treatments, and seasonal health updates.
          </p>
        </section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={sectionReveal}
        >
          <Card id="new-location" className="overflow-hidden border-slate-200/80 bg-white shadow-[0_24px_80px_-32px_rgba(0,94,184,0.35)]">
            <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.25 }}
                className="relative min-h-[320px] bg-gradient-to-br from-sky-50 via-cyan-50 to-white p-4 sm:p-5 lg:min-h-[420px]"
              >
                <div className="relative h-full overflow-hidden rounded-[1.75rem] border border-white/70 bg-white shadow-lg shadow-slate-900/10">
                  <Image
                    src="/newloc.jpeg"
                    alt="New location announcement flyer for the Anna, Texas office"
                    fill
                    className="object-contain p-3 transition-transform duration-500 hover:scale-[1.04]"
                    sizes="(max-width: 1024px) 100vw, 48vw"
                    priority
                  />
                </div>
              </motion.div>

              <div className="flex flex-col justify-between gap-8 p-6 sm:p-8 lg:p-10">
                <div className="space-y-5">
                  <Badge className="w-fit rounded-full bg-[#005EB8]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#005EB8]">
                    New Location
                  </Badge>

                  <div className="space-y-3">
                    <h3 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                      Now Accepting Patients in Anna, Texas
                    </h3>
                    <div className="space-y-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
                      <p>
                        We are excited to welcome patients to our new Imperial Care Internal Medicine location in Anna, Texas. Our new office allows us to serve more patients across Collin County while continuing to provide the same personalized, evidence-based primary care.
                      </p>
                      <p>
                        The new location was designed to make care more convenient for families and adults who want a trusted local clinic with access to preventive services, chronic disease follow-up, and wellness support.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-start gap-3">
                        <div className="rounded-2xl bg-[#005EB8]/10 p-2 text-[#005EB8]">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">Anna Office</p>
                          <p className="mt-1 text-sm leading-6 text-slate-600">
                            450 N Standridge Blvd
                            <br />
                            Suite 104
                            <br />
                            Anna, TX 75409
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-start gap-3">
                        <div className="rounded-2xl bg-[#00A9CE]/10 p-2 text-[#00A9CE]">
                          <Phone className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">Call Us</p>
                          <a href="tel:9039570417" className="mt-1 block text-sm font-medium text-[#005EB8] transition-colors hover:text-[#004B93]">
                            (903) 957-0417
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    onPress={() => setIsModalOpen(true)}
                    className="w-full rounded-full bg-[#005EB8] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#005EB8]/25 transition-transform hover:scale-[1.02] hover:bg-[#004B93] sm:w-auto"
                  >
                    Schedule Appointment
                    <CircleCheckBig className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.section>

        <motion.section
          id="semaglutide"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionReveal}
        >
          <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
            <div className="order-2 space-y-6 lg:order-1">
              <div className="space-y-3">
                <Badge className="w-fit rounded-full bg-[#00A9CE]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#00A9CE]">
                  Medical Weight Loss
                </Badge>
                <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                  Semaglutide Weight Loss Program
                </h2>
                <div className="space-y-4 max-w-3xl text-base leading-7 text-slate-600">
                  <p>
                    Semaglutide is a physician-guided medical weight loss program originally developed for diabetes management. It is now widely used to support healthy weight loss alongside diet and exercise.
                  </p>
                  <p>
                    The treatment can help support appetite suppression, weight reduction, lower A1C, better blood sugar control, and a lower BMI. It is administered as weekly injections and is carefully monitored by our clinical team.
                  </p>
                  <p>
                    Treatment begins with a gradual dosage increase to improve tolerance. Patients have experienced approximately 2 to 4 pounds of weight loss per week when combined with healthy lifestyle changes.
                  </p>
                </div>
              </div>

              <Card className="border-slate-200 bg-slate-50 p-5 shadow-sm">
                <p className="text-sm leading-7 text-slate-600">
                  Common side effects can include nausea, vomiting, constipation, and diarrhea. Every patient is evaluated before starting treatment to determine whether this program is an appropriate fit for their health goals and medical history.
                </p>
              </Card>

              <div className="grid gap-3 sm:grid-cols-2">
                {semaglutideHighlights.map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="text-sm font-medium text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.25 }}
              className="order-1 lg:order-2"
            >
              <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 shadow-[0_24px_60px_-28px_rgba(0,94,184,0.35)]">
                <div className="relative aspect-[4/5] w-full sm:aspect-[16/10] lg:aspect-[4/5]">
                  <Image
                    src="/wl.jpeg"
                    alt="Semaglutide weight loss flyer"
                    fill
                    className="object-contain p-4 transition-transform duration-500 hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          id="b12-therapy"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionReveal}
        >
          <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
            <motion.div
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.25 }}
              className="order-1"
            >
              <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 shadow-[0_24px_60px_-28px_rgba(0,169,206,0.35)]">
                <div className="relative aspect-[4/5] w-full sm:aspect-[16/10] lg:aspect-[4/5]">
                  <Image
                    src="/b12.jpeg"
                    alt="Vitamin B12 injections flyer"
                    fill
                    className="object-contain p-4 transition-transform duration-500 hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                </div>
              </div>
            </motion.div>

            <div className="order-2 space-y-6">
              <div className="space-y-3">
                <Badge className="w-fit rounded-full bg-[#005EB8]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#005EB8]">
                  Vitamin B12 Therapy
                </Badge>
                <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                  Vitamin B12 Injections
                </h2>
                <div className="space-y-4 max-w-3xl text-base leading-7 text-slate-600">
                  <p>
                    Feeling tired or low on energy? Vitamin B12 injections may help support energy production, metabolism, nervous system health, and overall wellness.
                  </p>
                  <p>
                    B12 may help support healthy red blood cell production, brain function, bone health, heart health, hair, skin, and nails.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
                <Card className="border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900">Symptoms</h3>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                    {b12Symptoms.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1.5 h-2 w-2 rounded-full bg-[#00A9CE]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card className="border-slate-200 bg-slate-50 p-5 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900">Who may benefit?</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Vitamin B12 injections may be helpful for older adults, patients with gastrointestinal disorders, people following vegan diets, patients taking Metformin, and patients taking proton pump inhibitors.
                  </p>
                  <div className="mt-4 space-y-2 text-sm text-slate-700">
                    {b12WhoMayBenefit.map((item) => (
                      <div key={item} className="rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200">
                        {item}
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="hormone-optimization"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionReveal}
        >
          <Card className="overflow-hidden border-slate-200 bg-gradient-to-br from-white via-sky-50 to-cyan-50 shadow-[0_28px_90px_-38px_rgba(0,94,184,0.35)]">
            <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="space-y-4">
                  <Badge className="w-fit rounded-full bg-[#00A9CE]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#00A9CE]">
                    Hormone Optimization
                  </Badge>
                  <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                    Hormone Optimization Therapy
                  </h2>
                  <div className="space-y-4 max-w-3xl text-base leading-7 text-slate-600">
                    <p>
                      Imperial Care now offers hormone optimization therapy for patients who want a thoughtful approach to supporting balance, energy, and healthy aging. This service is designed to help address symptoms that can affect daily comfort and overall quality of life.
                    </p>
                    <p>
                      Bioidentical hormone optimization is evaluated carefully and tailored to the individual. Our team reviews symptoms, goals, and medical history before recommending therapy so that treatment remains personalized and clinically appropriate.
                    </p>
                    <p>
                      Patients often seek this service when they want support for vitality, mood, energy, mental clarity, and overall wellness.
                    </p>
                  </div>
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <Card className="border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-900">Common Symptoms</h3>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {hormoneSymptoms.map((item) => (
                        <div key={item} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700 ring-1 ring-slate-200">
                          {item}
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-900">Potential Benefits</h3>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {hormoneBenefits.map((item) => (
                        <div key={item} className="rounded-2xl bg-[#00A9CE]/5 px-4 py-3 text-sm text-slate-700 ring-1 ring-[#00A9CE]/15">
                          {item}
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                  <p className="max-w-3xl text-sm leading-6 text-slate-500">
                    Disclaimer: Hormone optimization therapy is not appropriate for every patient. A clinical evaluation is required to determine whether treatment is safe and medically indicated.
                  </p>
              </div>

              <div className="relative min-h-[320px] bg-white p-4 sm:p-5 lg:min-h-[520px] lg:p-6">
                <div className="relative h-full overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-lg shadow-slate-900/10">
                  <Image
                    src="/a1.jpeg"
                    alt="Hormone optimization therapy flyer"
                    fill
                    className="object-contain p-4 transition-transform duration-500 hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 44vw"
                  />
                </div>
              </div>
            </div>
          </Card>
        </motion.section>

        <motion.section
          id="winter-wellness"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionReveal}
        >
          <div className="grid items-center gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12">
            <motion.div whileHover={{ scale: 1.015 }} transition={{ duration: 0.25 }}>
              <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 shadow-[0_24px_60px_-28px_rgba(0,94,184,0.28)]">
                <div className="relative aspect-[4/5] w-full sm:aspect-[16/10] lg:aspect-[4/5]">
                  <Image
                    src="/a2.jpeg"
                    alt="Winter wellness tips flyer"
                    fill
                    className="object-contain p-4 transition-transform duration-500 hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                </div>
              </div>
            </motion.div>

            <div className="space-y-6">
              <div className="space-y-3">
                <Badge className="w-fit rounded-full bg-[#005EB8]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#005EB8]">
                  Seasonal Wellness Tips
                </Badge>
                <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                  Winter Wellness Essentials
                </h2>
                <p className="max-w-3xl text-base leading-7 text-slate-600">
                  Winter can make wellness feel more challenging. Lower sunlight exposure may contribute to lower Vitamin D levels, reduced energy, and changes in mood, which is why seasonal support matters.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900">The Problem</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Low sunlight exposure may contribute to lower Vitamin D levels, reduced energy, and changes in mood.
                  </p>
                </Card>
                <Card className="border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900">What You Can Do</h3>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                    <li>Spend time outdoors.</li>
                    <li>Maintain a healthy diet.</li>
                    <li>Stay active.</li>
                    <li>Consult your physician.</li>
                  </ul>
                </Card>
                <Card className="border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900">Recommended Support</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Discuss Vitamin B12 and Vitamin D therapy with your provider if appropriate.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={sectionReveal}
        >
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#00A9CE]">
                Patient Education Resources
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Explore the Flyers and Updates
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600 sm:text-right">
              Review each resource at a glance. The flyers are presented as clean cards so the artwork stays readable and uncluttered.
            </p>
          </div>

          <div className="md:hidden">
            <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
              {[
                { title: "New Location Announcement", image: "/newloc.jpeg" },
                { title: "Semaglutide Weight Loss", image: "/wl.jpeg" },
                { title: "Vitamin B12 Therapy", image: "/b12.jpeg" },
                { title: "Hormone Optimization", image: "/a1.jpeg" },
                { title: "Seasonal Wellness Tips", image: "/a2.jpeg" },
              ].map((item) => (
                <Card key={item.title} className="min-w-[82%] snap-center overflow-hidden border-slate-200 bg-white shadow-md">
                  <div className="relative aspect-[4/5] bg-slate-50">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain p-3 transition-transform duration-500 hover:scale-[1.05]"
                      sizes="82vw"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/85 via-slate-900/35 to-transparent p-4 pt-10 text-white">
                      <p className="text-sm font-semibold">{item.title}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-5">
            {[
              { title: "New Location Announcement", image: "/newloc.jpeg" },
              { title: "Semaglutide Weight Loss", image: "/wl.jpeg" },
              { title: "Vitamin B12 Therapy", image: "/b12.jpeg" },
              { title: "Hormone Optimization", image: "/a1.jpeg" },
              { title: "Seasonal Wellness Tips", image: "/a2.jpeg" },
            ].map((item) => (
              <motion.div key={item.title} whileHover={{ y: -6 }} transition={{ duration: 0.25 }}>
                <Card className="group overflow-hidden border-slate-200 bg-white shadow-md">
                  <div className="relative aspect-[4/5] bg-slate-50">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.06]"
                      sizes="(max-width: 1024px) 50vw, 20vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-slate-900/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                      <p className="text-sm font-semibold leading-5">{item.title}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={sectionReveal}
        >
          <Card className="overflow-hidden border-0 bg-[linear-gradient(135deg,rgba(0,94,184,1)_0%,rgba(0,169,206,1)_100%)] text-white shadow-[0_30px_100px_-40px_rgba(0,94,184,0.6)]">
            <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:p-10">
              <div className="space-y-4">
                <Badge className="w-fit border border-white/20 bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.26em] text-white">
                  Book Appointment
                </Badge>
                <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Ready to Take the Next Step?
                </h2>
                <p className="max-w-2xl text-base leading-7 text-white/88">
                  Whether you&apos;re looking for primary care, medical weight loss, wellness therapies, or preventive health services, our team is here to help.
                </p>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    onPress={() => setIsModalOpen(true)}
                    className="w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#005EB8] shadow-lg shadow-slate-900/15 transition-transform hover:scale-[1.02] hover:bg-white/95 sm:w-auto"
                  >
                    Schedule Appointment
                  </Button>
                  <a
                    href="tel:9039570417"
                    className="inline-flex w-full items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-transform hover:scale-[1.02] hover:bg-white/15 sm:w-auto"
                  >
                    Call (903) 957-0417
                  </a>
                </div>
              </div>

              <Card className="border-white/15 bg-white/12 p-5 text-white shadow-none backdrop-blur-xl">
                <p className="text-sm leading-7 text-white/86">
                  We focus on approachable, personalized care for adults and families who want a clinic that balances medical expertise with practical support.
                </p>
              </Card>
            </div>
          </Card>
        </motion.section>

      </main>

      <AppointmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
