"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Printer,
  Clock,
  Calendar,
  ExternalLink,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import AppointmentModal from "@/components/AppointmentModal";

export default function LocationsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hoursData = [
    { day: "Monday", hours: "8:00 AM – 5:00 PM", status: "Open" },
    { day: "Tuesday", hours: "8:00 AM – 5:00 PM", status: "Open" },
    { day: "Wednesday", hours: "8:00 AM – 5:00 PM", status: "Open" },
    { day: "Thursday", hours: "8:00 AM – 5:00 PM", status: "Open" },
    { day: "Friday", hours: "Telephone appointments upon request", status: "Telephone Only" },
    { day: "Saturday", hours: "Closed", status: "Closed" },
    { day: "Sunday", hours: "Closed", status: "Closed" },
  ];

  return (
    <div className="space-y-0">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-[#005EB8] to-[#00A9CE] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-3">
            Collin & Grayson Counties
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Our Locations</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mt-4 leading-relaxed">
            Convenient primary care clinics located in Anna, TX and Sherman, TX.
          </p>
        </div>
      </section>

      {/* LOCATION CARDS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            
            {/* LOCATION CARD 1: COLLIN COUNTY */}
            <div className="bg-[#F8F9FA] rounded-3xl p-8 border-2 border-[#005EB8]/30 shadow-md flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="bg-[#005EB8] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Now Serving Collin County!
                  </span>
                  <span className="text-xs text-green-600 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span> Accepting New Patients!
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Anna Clinic (Collin County)</h2>
                  <p className="text-xs text-gray-500 mt-1 font-medium">Newest Location Facility</p>
                </div>

                <div className="space-y-3 text-sm text-gray-700 bg-white p-5 rounded-2xl border border-gray-200">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#005EB8] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-gray-900 font-semibold">Street Address:</strong>
                      <span>450 N Standridge Blvd, Suite 104, Anna, TX 75409, USA</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#005EB8] shrink-0" />
                    <div>
                      <strong className="text-gray-900 font-semibold">Phone:</strong>{" "}
                      <a href="tel:9039570417" className="hover:text-[#005EB8] font-bold">
                        (903) 957-0417
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Printer className="w-5 h-5 text-gray-400 shrink-0" />
                    <div>
                      <strong className="text-gray-900 font-semibold">Fax:</strong> (903) 355-2938
                    </div>
                  </div>
                </div>

                {/* Embedded Map Box */}
                <div className="w-full h-56 rounded-2xl overflow-hidden border border-gray-300 relative bg-gray-200">
                  <iframe
                    title="Anna TX Location Map"
                    src="https://maps.google.com/maps?q=450+N+Standridge+Blvd+Suite+104+Anna+TX+75409&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0"
                    loading="lazy"
                  ></iframe>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href="https://maps.google.com/?q=450+N+Standridge+Blvd+Suite+104+Anna+TX+75409"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#005EB8] hover:bg-[#004B93] text-white py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
                >
                  <ExternalLink className="w-4 h-4" /> Get Directions (Google Maps)
                </a>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex-1 bg-white border border-gray-300 hover:border-[#005EB8] text-gray-800 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#005EB8]" /> Book Anna Visit
                </button>
              </div>
            </div>

            {/* LOCATION CARD 2: GRAYSON COUNTY */}
            <div className="bg-[#F8F9FA] rounded-3xl p-8 border-2 border-gray-300 shadow-md flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="bg-[#00A9CE] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Our Location in Grayson County
                  </span>
                  <span className="text-xs text-green-600 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span> Accepting Appointments!
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Sherman Clinic (Grayson County)</h2>
                  <p className="text-xs text-gray-500 mt-1 font-medium">Monday–Friday Care</p>
                </div>

                <div className="space-y-3 text-sm text-gray-700 bg-white p-5 rounded-2xl border border-gray-200">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#005EB8] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-gray-900 font-semibold">Street Address:</strong>
                      <span>1700 N Travis St, Sherman, Texas 75092</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#005EB8] shrink-0" />
                    <div>
                      <strong className="text-gray-900 font-semibold">Phone:</strong>{" "}
                      <a href="tel:9039570417" className="hover:text-[#005EB8] font-bold">
                        (903) 957-0417
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Printer className="w-5 h-5 text-gray-400 shrink-0" />
                    <div>
                      <strong className="text-gray-900 font-semibold">Fax:</strong> (903) 355-2938
                    </div>
                  </div>
                </div>

                {/* Embedded Map Box */}
                <div className="w-full h-56 rounded-2xl overflow-hidden border border-gray-300 relative bg-gray-200">
                  <iframe
                    title="Sherman TX Location Map"
                    src="https://maps.google.com/maps?q=1700+N+Travis+St+Sherman+Texas+75092&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0"
                    loading="lazy"
                  ></iframe>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href="https://maps.google.com/?q=1700+N+Travis+St+Sherman+Texas+75092"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#005EB8] hover:bg-[#004B93] text-white py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
                >
                  <ExternalLink className="w-4 h-4" /> Get Directions (Google Maps)
                </a>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex-1 bg-white border border-gray-300 hover:border-[#005EB8] text-gray-800 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#005EB8]" /> Book Sherman Visit
                </button>
              </div>
            </div>

          </div>

          {/* HOURS TABLE */}
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 border border-gray-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-[#005EB8]" /> Operating Hours
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">Applies to both Anna & Sherman clinic schedules</p>
              </div>
              <span className="bg-[#005EB8]/10 text-[#005EB8] text-xs font-bold px-3 py-1 rounded-full">
                Phone: (903) 957-0417
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Day</th>
                    <th className="py-3 px-4">Clinic Hours</th>
                    <th className="py-3 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {hoursData.map((row) => (
                    <tr key={row.day} className="hover:bg-gray-50/80">
                      <td className="py-3.5 px-4 font-bold text-gray-900">{row.day}</td>
                      <td className="py-3.5 px-4 text-gray-700">{row.hours}</td>
                      <td className="py-3.5 px-4 text-right">
                        {row.status === "Open" && (
                          <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full">
                            Open 8 AM - 5 PM
                          </span>
                        )}
                        {row.status === "Telephone Only" && (
                          <span className="bg-sky-100 text-sky-700 text-xs font-bold px-2.5 py-1 rounded-full">
                            Telephone Consults
                          </span>
                        )}
                        {row.status === "Closed" && (
                          <span className="bg-gray-100 text-gray-500 text-xs font-semibold px-2.5 py-1 rounded-full">
                            Closed
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      <AppointmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
