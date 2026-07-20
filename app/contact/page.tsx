"use client";

import { useState } from "react";
import {
  Phone,
  Printer,
  MapPin,
  Clock,
  Mail,
  Send,
  CheckCircle2,
  AlertTriangle,
  MessageSquare
} from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Appointment Request",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "Appointment Request",
      message: "",
    });
  };

  return (
    <div className="space-y-0">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-[#005EB8] to-[#00A9CE] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-3">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Contact Us</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mt-4 leading-relaxed">
            We are here to assist with your internal medicine care, appointment scheduling, and weight loss consultations.
          </p>
        </div>
      </section>

      {/* EMERGENCY NOTICE CALLOUT */}
      <section className="bg-red-50 border-b border-red-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 text-red-900 text-xs sm:text-sm font-semibold max-w-3xl mx-auto">
            <AlertTriangle className="w-5 h-5 text-[#FF6B6B] shrink-0" />
            <p>
              <strong>EMERGENCY NOTICE:</strong> For medical emergencies, please dial <strong className="underline">911</strong> immediately. Please note that we cannot provide emergency medical diagnosis or treatment advice through this contact form.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* LEFT: CONTACT FORM */}
            <div className="lg:col-span-7 bg-[#F8F9FA] p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <MessageSquare className="w-6 h-6 text-[#005EB8]" /> Send Us a Message
                </h2>
                <p className="text-xs text-gray-600 mt-1">
                  Fill out the fields below and our patient coordinator will respond within 1 business day.
                </p>
              </div>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#005EB8] bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="(903) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#005EB8] bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="patient@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#005EB8] bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Subject / Inquiry Type *</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#005EB8] bg-white"
                      >
                        <option value="Appointment Request">Appointment Request</option>
                        <option value="Semaglutide Weight Loss Question">Semaglutide Weight Loss Question</option>
                        <option value="Vitamin B12 Injections">Vitamin B12 Injections</option>
                        <option value="Patient Records & Forms">Patient Records & Forms</option>
                        <option value="General Question / Feedback">General Question / Feedback</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Your Message *</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="How can Dr. Islam and team assist you today?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-4 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#005EB8] bg-white"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-[#005EB8] hover:bg-[#004B93] text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" /> Send Message
                    </button>
                  </div>
                </form>
              ) : (
                <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center space-y-4">
                  <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Message Delivered Successfully!</h3>
                  <p className="text-xs text-gray-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.name}</strong>. Your message regarding <strong>{formData.subject}</strong> has been received by our office team. We will contact you shortly at {formData.phone} or {formData.email}.
                  </p>
                  <button
                    onClick={handleReset}
                    className="bg-[#005EB8] text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-md"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              )}
            </div>

            {/* RIGHT: CONTACT INFO & HOURS BOX */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Contact Info Box */}
              <div className="bg-[#F8F9FA] p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-gray-900">Direct Contact Details</h3>

                <div className="space-y-4 text-sm text-gray-700">
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#FF6B6B] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-gray-900 font-semibold">Main Phone Line:</strong>
                      <a href="tel:9039570417" className="text-[#005EB8] font-bold hover:underline">
                        (903) 957-0417
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Printer className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-gray-900 font-semibold">Clinic Fax:</strong>
                      <span>(903) 355-2938</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-2 border-t border-gray-200">
                    <MapPin className="w-5 h-5 text-[#005EB8] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-gray-900 font-semibold">Anna Clinic (Collin County):</strong>
                      <span className="text-xs">450 N Standridge Blvd, Suite 104, Anna, TX 75409</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-2 border-t border-gray-200">
                    <MapPin className="w-5 h-5 text-[#00A9CE] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-gray-900 font-semibold">Sherman Clinic (Grayson County):</strong>
                      <span className="text-xs">1700 N Travis St, Sherman, TX 75092</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hours Box */}
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-3">
                <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#005EB8]" /> Weekly Office Hours
                </h4>
                <div className="text-xs text-gray-600 space-y-2">
                  <div className="flex justify-between border-b pb-1">
                    <span>Monday – Thursday:</span>
                    <span className="font-bold text-gray-900">8:00 AM – 5:00 PM</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span>Friday:</span>
                    <span className="font-semibold text-[#00A9CE]">Telephone appointments</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday – Sunday:</span>
                    <span className="text-gray-400">Closed</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
