"use client";

import { useState } from "react";
import { X, Star, CheckCircle2, MessageSquare, User, MapPin } from "lucide-react";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReviewSubmitted: (newReview: {
    name: string;
    location: string;
    rating: number;
    text: string;
    date: string;
  }) => void;
}

export default function ReviewModal({ isOpen, onClose, onReviewSubmitted }: ReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("Anna (Collin County)");
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onReviewSubmitted({
      name: name || "Verified Patient",
      location,
      rating,
      text,
      date: "Just now",
    });
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setName("");
    setText("");
    setRating(5);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-gray-100 relative">
        <div className="bg-[#005EB8] text-white p-6 rounded-t-2xl relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2 text-[#00A9CE] text-xs font-semibold uppercase tracking-wider mb-1">
            <MessageSquare className="w-4 h-4" /> Patient Feedback
          </div>
          <h3 className="text-xl font-bold">Share Your Care Experience</h3>
          <p className="text-xs text-white/80 mt-1">
            Your review helps other patients in Anna & Sherman find quality internal medicine care.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-gray-700">
            {/* Star Selection */}
            <div className="text-center py-2 bg-gray-50 rounded-xl border border-gray-200">
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                Overall Rating
              </label>
              <div className="flex justify-center items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 text-[#FF6B6B] hover:scale-110 transition-transform focus:outline-hidden"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= (hoverRating || rating)
                          ? "fill-[#FF6B6B] text-[#FF6B6B]"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-xs font-semibold text-[#005EB8] mt-1 block">
                {rating === 5 && "Excellent Care (5 Stars)"}
                {rating === 4 && "Great Experience (4 Stars)"}
                {rating === 3 && "Average (3 Stars)"}
                {rating <= 2 && "Needs Improvement"}
              </span>
            </div>

            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Your Name / Initials *</label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah M. or Anonymous"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#005EB8]"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Clinic Location Visited *</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#005EB8]"
              >
                <option value="Anna (Collin County)">Anna Clinic (Collin County)</option>
                <option value="Sherman (Grayson County)">Sherman Clinic (Grayson County)</option>
              </select>
            </div>

            {/* Text */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Your Review *</label>
              <textarea
                required
                rows={4}
                placeholder="Share details about your appointment, Dr. Islam, or staff care..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#005EB8]"
              />
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl text-xs font-semibold hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#005EB8] hover:bg-[#004B93] text-white rounded-xl text-xs font-bold shadow-md"
              >
                Submit Review
              </button>
            </div>
          </form>
        ) : (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-gray-900">Thank You for Your Feedback!</h4>
            <p className="text-xs text-gray-600 max-w-sm mx-auto leading-relaxed">
              Your review has been submitted and will appear on our patient feedback wall. We appreciate your trust in Imperial Care Internal Medicine.
            </p>
            <button
              onClick={handleClose}
              className="bg-[#005EB8] hover:bg-[#004B93] text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
