"use client";

import { useState } from "react";
import { Star, MessageSquarePlus, CheckCircle2, ThumbsUp, Filter, Sparkles } from "lucide-react";
import ReviewModal from "@/components/ReviewModal";

export default function ReviewsPage() {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  const [reviewsList, setReviewsList] = useState([
    {
      id: 1,
      name: "Rebecca T.",
      location: "Anna (Collin County)",
      rating: 5,
      date: "2 weeks ago",
      text: "Dr. Islam is hands down the most thorough physician I've visited in Collin County. She explained my blood work step-by-step and answered all my questions without rushing.",
      verified: true,
    },
    {
      id: 2,
      name: "Marcus D.",
      location: "Sherman (Grayson County)",
      rating: 5,
      date: "1 month ago",
      text: "Started the Semaglutide weight loss program 2 months ago. Down 22 lbs and feeling energetic again! Nurse Peggy and staff make weekly check-ins very easy.",
      verified: true,
    },
    {
      id: 3,
      name: "Jennifer M.",
      location: "Anna (Collin County)",
      rating: 5,
      date: "1 month ago",
      text: "The new Anna clinic location is super convenient and clean. Front desk staff Kelly was very polite and checked me in right on time.",
      verified: true,
    },
    {
      id: 4,
      name: "David K.",
      location: "Sherman (Grayson County)",
      rating: 5,
      date: "2 months ago",
      text: "Got Vitamin B12 shots here after suffering from constant fatigue. Noticeable improvement in energy levels within days! Highly recommend.",
      verified: true,
    },
    {
      id: 5,
      name: "Sandra P.",
      location: "Anna (Collin County)",
      rating: 5,
      date: "3 months ago",
      text: "Dr. Islam treats you like family. Her personal, evidence-based approach is refreshing. So happy to have found an internal medicine doctor I trust.",
      verified: true,
    },
  ]);

  const handleAddNewReview = (newReview: {
    name: string;
    location: string;
    rating: number;
    text: string;
    date: string;
  }) => {
    setReviewsList([
      {
        id: Date.now(),
        ...newReview,
        verified: true,
      },
      ...reviewsList,
    ]);
  };

  const filteredReviews = reviewsList.filter((r) => {
    if (filter === "5-star") return r.rating === 5;
    if (filter === "anna") return r.location.includes("Anna");
    if (filter === "sherman") return r.location.includes("Sherman");
    return true;
  });

  return (
    <div className="space-y-0">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-[#005EB8] to-[#00A9CE] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-3">
            Verified Patient Testimonials
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">What Our Patients Say</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mt-4 leading-relaxed">
            Read real feedback from patients who experience personalized, compassionate internal medicine at Imperial Care.
          </p>

          {/* Star Rating Summary */}
          <div className="mt-8 inline-flex items-center gap-3 bg-white/10 backdrop-blur-xs px-6 py-3 rounded-2xl border border-white/20">
            <span className="text-3xl font-extrabold text-amber-300">4.9</span>
            <div>
              <div className="flex text-amber-300 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-300" />
                ))}
              </div>
              <span className="text-xs text-white/90 font-medium">Based on 120+ Verified Patient Reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER & CTA BAR */}
      <section className="py-8 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-2 text-xs font-bold">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-xl transition-all ${
                filter === "all"
                  ? "bg-[#005EB8] text-white shadow-xs"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              All Reviews ({reviewsList.length})
            </button>
            <button
              onClick={() => setFilter("5-star")}
              className={`px-4 py-2 rounded-xl transition-all ${
                filter === "5-star"
                  ? "bg-[#005EB8] text-white shadow-xs"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              5-Star Ratings
            </button>
            <button
              onClick={() => setFilter("anna")}
              className={`px-4 py-2 rounded-xl transition-all ${
                filter === "anna"
                  ? "bg-[#005EB8] text-white shadow-xs"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              Anna Clinic
            </button>
            <button
              onClick={() => setFilter("sherman")}
              className={`px-4 py-2 rounded-xl transition-all ${
                filter === "sherman"
                  ? "bg-[#005EB8] text-white shadow-xs"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              Sherman Clinic
            </button>
          </div>

          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="bg-[#005EB8] hover:bg-[#004B93] text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md flex items-center gap-2"
          >
            <MessageSquarePlus className="w-4 h-4" /> Share Your Experience
          </button>
        </div>
      </section>

      {/* REVIEWS GRID */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredReviews.map((review) => (
              <div
                key={review.id}
                className="bg-[#F8F9FA] p-6 rounded-3xl border border-gray-200 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400 gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] text-gray-400 font-medium">{review.date}</span>
                  </div>

                  <p className="text-sm text-gray-700 italic leading-relaxed">
                    "{review.text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                  <div>
                    <span className="block font-bold text-gray-900 text-xs">{review.name}</span>
                    <span className="block text-[11px] text-[#005EB8] font-medium">{review.location}</span>
                  </div>
                  {review.verified && (
                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Verified Patient
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center bg-[#F8F9FA] p-8 rounded-3xl border border-gray-200 max-w-xl mx-auto space-y-3">
            <h3 className="font-bold text-gray-900 text-lg">Are you a patient at Imperial Care?</h3>
            <p className="text-xs text-gray-600">
              We value your feedback and strive to provide the best possible adult primary care experience.
            </p>
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="bg-[#005EB8] hover:bg-[#004B93] text-white px-6 py-3 rounded-xl font-bold text-xs shadow-md"
            >
              Write a Review Now
            </button>
          </div>
        </div>
      </section>

      {/* Review Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onReviewSubmitted={handleAddNewReview}
      />
    </div>
  );
}
