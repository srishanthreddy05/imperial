"use client";

import { useState } from "react";
import { X, Calendar, Clock, MapPin, CheckCircle2, User, Phone, Mail, FileText } from "lucide-react";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AppointmentModal({ isOpen, onClose }: AppointmentModalProps) {
  const [step, setStep] = useState<"form" | "submitted">("form");
  const [formData, setFormData] = useState({
    location: "Anna (Collin County)",
    service: "Primary Care / Annual Wellness Exam",
    date: "",
    timeSlot: "Morning (8:00 AM - 12:00 PM)",
    fullName: "",
    phone: "",
    email: "",
    isNewPatient: "yes",
    notes: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("submitted");
  };

  const handleResetAndClose = () => {
    setStep("form");
    setFormData({
      location: "Anna (Collin County)",
      service: "Primary Care / Annual Wellness Exam",
      date: "",
      timeSlot: "Morning (8:00 AM - 12:00 PM)",
      fullName: "",
      phone: "",
      email: "",
      isNewPatient: "yes",
      notes: "",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto border border-gray-100 relative">
        {/* Header */}
        <div className="bg-[#005EB8] text-white p-6 rounded-t-2xl relative">
          <button
            onClick={handleResetAndClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2 text-[#00A9CE] text-xs font-semibold uppercase tracking-wider mb-1">
            <Calendar className="w-4 h-4" /> Imperial Care Internal Medicine
          </div>
          <h2 className="text-2xl font-bold">Schedule Your Appointment</h2>
          <p className="text-white/80 text-sm mt-1">
            Select your preferred clinic location, service, and contact information.
          </p>
        </div>

        {step === "form" ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#005EB8]" /> Select Location *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, location: "Anna (Collin County)" })}
                  className={`p-3 text-left rounded-xl border-2 transition-all ${
                    formData.location === "Anna (Collin County)"
                      ? "border-[#005EB8] bg-[#005EB8]/5 text-[#005EB8] font-semibold"
                      : "border-gray-200 hover:border-gray-300 text-gray-700"
                  }`}
                >
                  <span className="block text-xs font-bold text-[#00A9CE] uppercase">NEW LOCATION</span>
                  <span className="font-bold text-sm">Anna Clinic</span>
                  <span className="block text-xs text-gray-500 mt-0.5">450 N Standridge Blvd #104</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, location: "Sherman (Grayson County)" })}
                  className={`p-3 text-left rounded-xl border-2 transition-all ${
                    formData.location === "Sherman (Grayson County)"
                      ? "border-[#005EB8] bg-[#005EB8]/5 text-[#005EB8] font-semibold"
                      : "border-gray-200 hover:border-gray-300 text-gray-700"
                  }`}
                >
                  <span className="block text-xs font-bold text-gray-400 uppercase">GRAYSON COUNTY</span>
                  <span className="font-bold text-sm">Sherman Clinic</span>
                  <span className="block text-xs text-gray-500 mt-0.5">1700 N Travis St</span>
                </button>
              </div>
            </div>

            {/* Service Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Select Primary Service *
              </label>
              <select
                required
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#005EB8] focus:border-[#005EB8] transition-colors"
              >
                <option value="Primary Care / Annual Wellness Exam">Primary Care & Adult Wellness Exam</option>
                <option value="Semaglutide Weight Loss Consultation">Semaglutide Weight Loss Program</option>
                <option value="Vitamin B12 Injection Service">Vitamin B12 Injections</option>
                <option value="Chronic Disease Management">Chronic Disease Management & Follow-up</option>
                <option value="New Symptom Evaluation">New Symptom Evaluation / Physical Assessment</option>
              </select>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-gray-500" /> Preferred Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#005EB8]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gray-500" /> Time Window *
                </label>
                <select
                  value={formData.timeSlot}
                  onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#005EB8]"
                >
                  <option value="Morning (8:00 AM - 12:00 PM)">Morning (8:00 AM - 12:00 PM)</option>
                  <option value="Afternoon (1:00 PM - 5:00 PM)">Afternoon (1:00 PM - 5:00 PM)</option>
                </select>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-3 pt-2 border-t border-gray-200">
              <h3 className="text-sm font-bold text-gray-900">Patient Contact Information</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Full Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#005EB8]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="(903) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#005EB8]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Email Address *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="patient@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#005EB8]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Additional Notes or Symptoms (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="Tell us briefly about your visit request..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#005EB8]"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#005EB8] hover:bg-[#004B93] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all"
              >
                Confirm Request
              </button>
            </div>
          </form>
        ) : (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Appointment Request Received!</h3>
            <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-gray-900">{formData.fullName}</strong>. Your request for{" "}
              <strong className="text-[#005EB8]">{formData.service}</strong> at our{" "}
              <strong className="text-[#005EB8]">{formData.location}</strong> clinic has been logged.
            </p>
            <div className="bg-[#005EB8]/5 border border-[#005EB8]/20 p-4 rounded-xl text-xs text-gray-700 text-left space-y-1 max-w-md mx-auto">
              <p><strong>Confirmation Ref:</strong> IMP-2026-{(Math.random() * 8999 + 1000).toFixed(0)}</p>
              <p><strong>Next Steps:</strong> Our patient care team will call you at {formData.phone} within 24 business hours to finalize your exact appointment slot and intake instructions.</p>
            </div>
            <div className="pt-4">
              <button
                onClick={handleResetAndClose}
                className="bg-[#005EB8] hover:bg-[#004B93] text-white px-8 py-3 rounded-xl font-bold shadow-md"
              >
                Done & Return to Site
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
