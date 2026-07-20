"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Eye, Sparkles, Building2, Users, HeartPulse } from "lucide-react";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const galleryItems = [
    {
      id: 1,
      title: "Anna Clinic Reception & Waiting Area",
      category: "facility",
      categoryName: "Facility",
      caption: "Clean, comfortable, and modern waiting lounge at our Anna, TX location.",
      gradient: "from-[#005EB8] to-[#00A9CE]",
      icon: Building2,
    },
    {
      id: 2,
      title: "Dr. Sumbul Islam, MD Consultation Room",
      category: "facility",
      categoryName: "Facility",
      caption: "Private exam room equipped with modern diagnostic tools for adult physicals.",
      gradient: "from-sky-500 to-blue-700",
      icon: Building2,
    },
    {
      id: 3,
      title: "Clinical Staff Care Desk",
      category: "staff",
      categoryName: "Staff",
      caption: "Kelly, Peggy LVN, and LESA coordinating patient scheduling and care administration.",
      gradient: "from-[#00A9CE] to-teal-600",
      icon: Users,
    },
    {
      id: 4,
      title: "Semaglutide Weight Loss Consultation Suite",
      category: "patient-care",
      categoryName: "Patient Care",
      caption: "Private wellness coaching environment for monitoring body composition progress.",
      gradient: "from-[#FF6B6B] to-rose-600",
      icon: HeartPulse,
    },
    {
      id: 5,
      title: "Sherman Clinic Entrance & Exam Room",
      category: "facility",
      categoryName: "Facility",
      caption: "Welcoming healthcare facility serving Grayson County patients.",
      gradient: "from-[#005EB8] to-indigo-700",
      icon: Building2,
    },
    {
      id: 6,
      title: "Vitamin B12 Vitality Station",
      category: "patient-care",
      categoryName: "Patient Care",
      caption: "Dedicated clinical area for quick, comfortable Vitamin B12 injections.",
      gradient: "from-emerald-500 to-[#00A9CE]",
      icon: HeartPulse,
    },
  ];

  const filteredItems =
    activeCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const handlePrev = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) =>
        prev === 0 ? filteredItems.length - 1 : (prev as number) - 1
      );
    }
  };

  const handleNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) =>
        prev === filteredItems.length - 1 ? 0 : (prev as number) + 1
      );
    }
  };

  return (
    <div className="space-y-0">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-[#005EB8] to-[#00A9CE] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-3">
            Clinic Photos & Environment
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Our Gallery</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mt-4 leading-relaxed">
            Take a virtual tour of our Anna and Sherman clinic facilities, consultation rooms, and clinical team environments.
          </p>
        </div>
      </section>

      {/* FILTER TABS */}
      <section className="py-8 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center flex-wrap gap-3 text-xs sm:text-sm font-bold">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-5 py-2 rounded-xl transition-all ${
              activeCategory === "all"
                ? "bg-[#005EB8] text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            All Photos ({galleryItems.length})
          </button>
          <button
            onClick={() => setActiveCategory("facility")}
            className={`px-5 py-2 rounded-xl transition-all ${
              activeCategory === "facility"
                ? "bg-[#005EB8] text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            Facilities & Exam Rooms
          </button>
          <button
            onClick={() => setActiveCategory("staff")}
            className={`px-5 py-2 rounded-xl transition-all ${
              activeCategory === "staff"
                ? "bg-[#005EB8] text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            Clinical Staff
          </button>
          <button
            onClick={() => setActiveCategory("patient-care")}
            className={`px-5 py-2 rounded-xl transition-all ${
              activeCategory === "patient-care"
                ? "bg-[#005EB8] text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            Patient Care Environment
          </button>
        </div>
      </section>

      {/* GALLERY GRID */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedImageIndex(index)}
                  className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all card-hover flex flex-col justify-between"
                >
                  {/* Photo Visual Graphic */}
                  <div className={`h-56 bg-gradient-to-tr ${item.gradient} p-6 text-white flex flex-col justify-between relative`}>
                    <span className="self-start bg-black/20 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                      {item.categoryName}
                    </span>
                    
                    <div className="space-y-1">
                      <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center mb-2">
                        <IconComp className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-bold text-lg leading-snug">{item.title}</h3>
                    </div>

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-white text-gray-900 text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1.5 shadow-lg">
                        <Eye className="w-4 h-4 text-[#005EB8]" /> View Fullsize
                      </span>
                    </div>
                  </div>

                  <div className="p-5 bg-white space-y-1">
                    <p className="text-xs text-gray-600 leading-relaxed">{item.caption}</p>
                    <span className="text-[11px] font-bold text-[#005EB8] flex items-center gap-1 pt-1">
                      Click to expand in lightbox <Eye className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {selectedImageIndex !== null && filteredItems[selectedImageIndex] && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <button
            onClick={() => setSelectedImageIndex(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Controls */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
            aria-label="Next photo"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Lightbox Content Container */}
          <div className="max-w-4xl w-full bg-gray-900 text-white rounded-3xl overflow-hidden shadow-2xl border border-gray-800 space-y-0">
            <div className={`h-80 sm:h-96 bg-gradient-to-tr ${filteredItems[selectedImageIndex].gradient} p-8 flex flex-col justify-between relative`}>
              <div className="flex justify-between items-center">
                <span className="bg-black/30 backdrop-blur-xs text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {filteredItems[selectedImageIndex].categoryName} Photo ({selectedImageIndex + 1} of {filteredItems.length})
                </span>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold">{filteredItems[selectedImageIndex].title}</h3>
              </div>
            </div>

            <div className="p-6 bg-gray-900 border-t border-gray-800 space-y-2">
              <p className="text-sm text-gray-300 leading-relaxed">
                {filteredItems[selectedImageIndex].caption}
              </p>
              <div className="text-xs text-[#00A9CE] font-semibold pt-1">
                Imperial Care Internal Medicine — Anna & Sherman, Texas
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
