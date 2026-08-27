import { useState, useMemo } from "react";
import { X, Calendar, Clock, MapPin, CheckCircle2, User, Phone, Mail, RefreshCw, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import OTPModal from "./OTPModal";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function isValidAnnaDate(dateObj: Date): boolean {
  if (!dateObj || isNaN(dateObj.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const target = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
  if (target < today) return false;

  if (target.getDay() !== 5) return false; // Friday only

  const dayOfMonth = target.getDate();
  const isFirstFriday = dayOfMonth >= 1 && dayOfMonth <= 7;
  const isThirdFriday = dayOfMonth >= 15 && dayOfMonth <= 21;

  return isFirstFriday || isThirdFriday;
}

export function isValidShermanDate(dateObj: Date): boolean {
  if (!dateObj || isNaN(dateObj.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const target = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
  if (target < today) return false;

  const dayOfWeek = target.getDay();
  return dayOfWeek >= 1 && dayOfWeek <= 5; // Mon-Fri
}

export function isAlternatingFriday(dateStr: string): boolean {
  if (!dateStr) return false;
  const parts = dateStr.split("-");
  if (parts.length !== 3) return false;
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  if (isNaN(year) || isNaN(month) || isNaN(day)) return false;

  const dateObj = new Date(year, month, day);
  return isValidAnnaDate(dateObj);
}

export function getFirstUpcomingValidDate(isAnna: boolean): string {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const current = new Date(today);

  for (let i = 0; i < 90; i++) {
    const isValid = isAnna ? isValidAnnaDate(current) : isValidShermanDate(current);
    if (isValid) {
      const year = current.getFullYear();
      const mm = String(current.getMonth() + 1).padStart(2, "0");
      const dd = String(current.getDate()).padStart(2, "0");
      return `${year}-${mm}-${dd}`;
    }
    current.setDate(current.getDate() + 1);
  }
  return "";
}

interface VisualCalendarPickerProps {
  selectedDate: string;
  onSelectDate: (dateStr: string) => void;
  isAnna: boolean;
  disabled?: boolean;
}

function VisualCalendarPicker({ selectedDate, onSelectDate, isAnna, disabled }: VisualCalendarPickerProps) {
  const [viewDate, setViewDate] = useState(() => {
    if (selectedDate) {
      const parts = selectedDate.split("-");
      if (parts.length === 3) {
        return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, 1);
      }
    }
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const handlePrevMonth = () => {
    setViewDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  const firstDay = new Date(year, month, 1);
  const startDayOfWeek = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const daysGrid: ({ day: number; dateObj: Date; dateStr: string } | null)[] = [];
  for (let i = 0; i < startDayOfWeek; i++) {
    daysGrid.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const dateObj = new Date(year, month, d);
    const mm = String(month + 1).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    const dateStr = `${year}-${mm}-${dd}`;
    daysGrid.push({ day: d, dateObj, dateStr });
  }

  const monthTitle = viewDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const formattedSelectedDate = useMemo(() => {
    if (!selectedDate) return null;
    const parts = selectedDate.split("-");
    if (parts.length !== 3) return null;
    const dateObj = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    if (isNaN(dateObj.getTime())) return null;
    return dateObj.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [selectedDate]);

  return (
    <div className="bg-[#F8F9FA] p-3.5 rounded-2xl border border-gray-200 space-y-3">
      {/* Month Navigation */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handlePrevMonth}
          disabled={disabled}
          className="p-1.5 rounded-lg border border-gray-200 hover:bg-white hover:border-gray-300 text-gray-700 transition-colors shadow-2xs"
          aria-label="Previous Month"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="font-bold text-sm text-gray-900">{monthTitle}</span>
        <button
          type="button"
          onClick={handleNextMonth}
          disabled={disabled}
          className="p-1.5 rounded-lg border border-gray-200 hover:bg-white hover:border-gray-300 text-gray-700 transition-colors shadow-2xs"
          aria-label="Next Month"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((dayName, idx) => (
          <span
            key={dayName}
            className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${
              idx === 5 ? "text-[#005EB8]" : "text-gray-400"
            }`}
          >
            {dayName}
          </span>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1">
        {daysGrid.map((item, idx) => {
          if (!item) {
            return <div key={`blank-${idx}`} className="h-8 sm:h-9" />;
          }

          const { day, dateObj, dateStr } = item;
          const isSelected = selectedDate === dateStr;
          const isValid = isAnna ? isValidAnnaDate(dateObj) : isValidShermanDate(dateObj);

          if (isSelected) {
            return (
              <button
                key={dateStr}
                type="button"
                onClick={() => onSelectDate(dateStr)}
                disabled={disabled}
                className="h-8 sm:h-9 rounded-xl bg-[#005EB8] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center shadow-md ring-2 ring-[#005EB8] ring-offset-1 z-10"
              >
                {day}
              </button>
            );
          }

          if (isValid) {
            return (
              <button
                key={dateStr}
                type="button"
                onClick={() => onSelectDate(dateStr)}
                disabled={disabled}
                className="h-8 sm:h-9 rounded-xl bg-sky-100 hover:bg-[#005EB8] text-[#005EB8] hover:text-white font-bold text-xs sm:text-sm flex items-center justify-center border border-[#005EB8]/30 shadow-2xs transition-all active:scale-95 cursor-pointer"
              >
                {day}
              </button>
            );
          }

          return (
            <button
              key={dateStr}
              type="button"
              disabled
              className="h-8 sm:h-9 rounded-xl bg-gray-100/60 text-gray-300 text-xs flex items-center justify-center cursor-not-allowed select-none"
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Selected Date Display */}
      {formattedSelectedDate ? (
        <div className="p-2.5 bg-white border border-[#005EB8]/30 rounded-xl text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 shadow-2xs">
          <span className="text-gray-500 font-medium">Selected Date:</span>
          <strong className="text-sm font-bold text-[#005EB8]">{formattedSelectedDate}</strong>
        </div>
      ) : (
        <p className="text-xs text-amber-700 font-semibold text-center py-1">
          ⚠️ Please click an available date on the calendar.
        </p>
      )}

      {/* Helper Subtext */}
      <p className="text-[11px] text-[#005EB8] font-semibold text-center pt-0.5">
        ℹ️ Anna Clinic: 1st & 3rd Friday of month only
      </p>
    </div>
  );
}

export default function AppointmentModal({ isOpen, onClose }: AppointmentModalProps) {
  const [step, setStep] = useState<"form" | "submitted">("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
  const [confirmationNum, setConfirmationNum] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [formData, setFormData] = useState(() => ({
    location: "Anna (Collin County)",
    service: "Primary Care / Annual Wellness Exam",
    date: getFirstUpcomingValidDate(true),
    timeSlot: "Morning (8:00 AM - 12:00 PM)",
    fullName: "",
    phone: "",
    email: "",
    isNewPatient: "yes",
    notes: "",
  }));

  if (!isOpen) return null;

  const isAnna = formData.location.includes("Anna");

  const handleLocationChange = (newLocation: string) => {
    setError(null);
    const newIsAnna = newLocation.includes("Anna");
    let validDate = formData.date;

    if (newIsAnna) {
      if (!isAlternatingFriday(formData.date)) {
        validDate = getFirstUpcomingValidDate(true);
      }
    } else {
      if (formData.date) {
        const parts = formData.date.split("-");
        if (parts.length === 3) {
          const dateObj = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
          if (!isValidShermanDate(dateObj)) {
            validDate = getFirstUpcomingValidDate(false);
          }
        }
      } else {
        validDate = getFirstUpcomingValidDate(false);
      }
    }

    setFormData({ ...formData, location: newLocation, date: validDate });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (isAnna) {
      if (!formData.date || !isAlternatingFriday(formData.date)) {
        setError("Anna Clinic appointments are available on alternating Fridays (1st & 3rd Friday of each month). Please select a valid Friday date.");
        return;
      }
    } else {
      if (formData.date) {
        const parts = formData.date.split("-");
        if (parts.length === 3) {
          const dateObj = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
          if (!isValidShermanDate(dateObj)) {
            setError("Sherman Clinic is closed on weekends. Please select a weekday (Monday–Friday).");
            return;
          }
        }
      }
    }

    setLoading(true);

    try {
      const res = await fetch("/api/appointment/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "We couldn't send the verification email. Please try again.");
      }

      setIsOTPModalOpen(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "We couldn't send the verification email. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleOTPSuccess = (confirmationNumber: string, message: string) => {
    setConfirmationNum(confirmationNumber);
    setSuccessMsg(message);
    setIsOTPModalOpen(false);
    setStep("submitted");
  };

  const handleResetAndClose = () => {
    setStep("form");
    setError(null);
    setConfirmationNum("");
    setSuccessMsg("");
    setFormData({
      location: "Anna (Collin County)",
      service: "Primary Care / Annual Wellness Exam",
      date: getFirstUpcomingValidDate(true),
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
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
        <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto border border-gray-100 relative">
          {/* Header */}
          <div className="bg-[#005EB8] text-white p-6 rounded-t-2xl relative">
            <button
              onClick={handleResetAndClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close modal"
              disabled={loading}
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
              {/* New Patient Notice */}
              <div className="bg-[#005EB8]/10 border border-[#005EB8]/25 p-3.5 rounded-xl text-xs text-gray-800 space-y-1">
                <span className="font-bold text-[#005EB8] block uppercase tracking-wider text-[11px]">
                  New Patient Requests
                </span>
                <p className="leading-relaxed">
                  For new patient requests and details, please text{" "}
                  <a href="tel:9039570417" className="font-bold text-[#005EB8] underline hover:text-[#004B93]">
                    903-957-0417
                  </a>.
                </p>
              </div>

              {/* Error display */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm flex items-center gap-2 font-sans animate-in shake duration-200">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#005EB8]" /> Select Location *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleLocationChange("Anna (Collin County)")}
                    className={`p-3 text-left rounded-xl border-2 transition-all ${
                      formData.location === "Anna (Collin County)"
                        ? "border-[#005EB8] bg-[#005EB8]/5 text-[#005EB8] font-semibold"
                        : "border-gray-200 hover:border-gray-300 text-gray-700"
                    }`}
                    disabled={loading}
                  >
                    <span className="block text-xs font-bold text-[#00A9CE] uppercase">COLLIN COUNTY LOCATION</span>
                    <span className="font-bold text-sm">Anna Clinic</span>
                    <span className="block text-xs text-gray-500 mt-0.5">450 N Standridge Blvd #104</span>
                    <span className="block text-[11px] text-[#005EB8] font-medium mt-0.5">By appointment only — alternating Fridays</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleLocationChange("Sherman (Grayson County)")}
                    className={`p-3 text-left rounded-xl border-2 transition-all ${
                      formData.location === "Sherman (Grayson County)"
                        ? "border-[#005EB8] bg-[#005EB8]/5 text-[#005EB8] font-semibold"
                        : "border-gray-200 hover:border-gray-300 text-gray-700"
                    }`}
                    disabled={loading}
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
                  disabled={loading}
                >
                  <option value="Primary Care / Annual Wellness Exam">Primary Care & Adult Wellness Exam</option>
                  <option value="Weight Loss Management (Tirzepatide & Semaglutide)">Weight Loss Management (Tirzepatide & Semaglutide)</option>
                  <option value="Vitamin B12 Injection Service">Vitamin B12 Injections</option>
                  <option value="Chronic Disease Management">Chronic Disease Management & Follow-up</option>
                  <option value="New Symptom Evaluation">New Symptom Evaluation / Physical Assessment</option>
                </select>
              </div>

              {/* Date & Time */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                  <div className="md:col-span-7">
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#005EB8]" /> Preferred Date *
                    </label>
                    <VisualCalendarPicker
                      selectedDate={formData.date}
                      onSelectDate={(dateStr) => {
                        setFormData({ ...formData, date: dateStr });
                        if (error) setError(null);
                      }}
                      isAnna={isAnna}
                      disabled={loading}
                    />
                  </div>

                  <div className="md:col-span-5 space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-gray-500" /> Time Window *
                      </label>
                      <select
                        value={formData.timeSlot}
                        onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#005EB8]"
                        disabled={loading}
                      >
                        <option value="Morning (8:00 AM - 12:00 PM)">Morning (8:00 AM - 12:00 PM)</option>
                        <option value="Afternoon (1:00 PM - 5:00 PM)">Afternoon (1:00 PM - 5:00 PM)</option>
                      </select>
                    </div>

                    <div className="p-3.5 bg-[#005EB8]/5 border border-[#005EB8]/20 rounded-xl text-xs space-y-1">
                      <strong className="block font-bold text-[#005EB8]">Clinic Schedule Note</strong>
                      {isAnna ? (
                        <p className="text-gray-600 leading-relaxed">
                          Anna Clinic is open strictly by appointment on the 1st & 3rd Friday of each month.
                        </p>
                      ) : (
                        <p className="text-gray-600 leading-relaxed">
                          Sherman Clinic is open Monday–Thursday 8:00 AM–5:00 PM (Friday telephone appointments).
                        </p>
                      )}
                    </div>
                  </div>
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
                        disabled={loading}
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
                        disabled={loading}
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
                      disabled={loading}
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
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 rounded-xl bg-[#005EB8] hover:bg-[#004B93] disabled:bg-gray-300 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Sending OTP...
                    </>
                  ) : (
                    "Book Appointment"
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Appointment Request Received!</h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed font-sans">
                Thank you, <strong className="text-gray-900">{formData.fullName}</strong>. Your request for{" "}
                <strong className="text-[#005EB8]">{formData.service}</strong> at our{" "}
                <strong className="text-[#005EB8]">{formData.location}</strong> clinic has been logged.
              </p>
              <div className="bg-[#005EB8]/5 border border-[#005EB8]/20 p-4 rounded-xl text-xs text-gray-700 text-left space-y-1.5 max-w-md mx-auto">
                <p><strong>Confirmation Ref:</strong> <span className="font-mono font-bold text-[#005EB8]">{confirmationNum}</span></p>
                <p className="leading-relaxed"><strong>Next Steps:</strong> {successMsg || `Our patient care team will call you at ${formData.phone} within 24 business hours to finalize your exact appointment slot and intake instructions.`}</p>
              </div>
              <div className="pt-4">
                <button
                  onClick={handleResetAndClose}
                  className="bg-[#005EB8] hover:bg-[#004B93] text-white px-8 py-3 rounded-xl font-bold shadow-md transition-colors"
                >
                  Done & Return to Site
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* OTP Verification Modal wrapper overlay */}
      <OTPModal
        isOpen={isOTPModalOpen}
        email={formData.email}
        onClose={() => setIsOTPModalOpen(false)}
        onSuccess={handleOTPSuccess}
      />
    </>
  );
}
