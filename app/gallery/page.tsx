"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

type SectionType = "staff" | "clinic";

interface GalleryImage {
  src: string;
  title: string;
}

const staffImages: GalleryImage[] = [
  { src: "/ICIM Photos/ICIM - Staff/CARLA FOWLER - FNP.jpeg", title: "Carla Fowler, FNP" },
  { src: "/ICIM Photos/ICIM - Staff/Dr. Islam 1.jpeg", title: "Dr. Islam" },
  { src: "/ICIM Photos/ICIM - Staff/Dr. Islam 2.jpeg", title: "Dr. Islam" },
  { src: "/ICIM Photos/ICIM - Staff/Dr. Islam 3.jpeg", title: "Dr. Islam" },
  { src: "/ICIM Photos/ICIM - Staff/FAITH - MA.jpeg", title: "Faith, MA" },
  { src: "/ICIM Photos/ICIM - Staff/Gabi - MA.jpeg", title: "Gabi, MA" },
  { src: "/ICIM Photos/ICIM - Staff/KELLY - FRONT DESK RECEPTIONIST.jpeg", title: "Kelly, Front Desk Receptionist" },
  { src: "/ICIM Photos/ICIM - Staff/LESA - LVN OFFICE MANAGER.jpeg", title: "Lesa, LVN Office Manager" },
  { src: "/ICIM Photos/ICIM - Staff/PEGGY - LVN.jpeg", title: "Peggy, LVN" },
  { src: "/ICIM Photos/ICIM - Staff/TIFFANY - LVN MANAGER.jpeg", title: "Tiffany, LVN Manager" },
];

const clinicImages: GalleryImage[] = [
  { src: "/ICIM Photos/Clinic Photos/WhatsApp Image 2026-06-02 at 1.23.48 PM (1).jpeg", title: "Reception Desk" },
  { src: "/ICIM Photos/Clinic Photos/WhatsApp Image 2026-06-02 at 1.23.48 PM (2).jpeg", title: "Waiting Area" },
  { src: "/ICIM Photos/Clinic Photos/WhatsApp Image 2026-06-02 at 1.23.48 PM (3).jpeg", title: "Exam Room" },
  { src: "/ICIM Photos/Clinic Photos/WhatsApp Image 2026-06-02 at 1.23.48 PM (4).jpeg", title: "Consultation Room" },
  { src: "/ICIM Photos/Clinic Photos/WhatsApp Image 2026-06-02 at 1.23.48 PM (5).jpeg", title: "Treatment Area" },
  { src: "/ICIM Photos/Clinic Photos/WhatsApp Image 2026-06-02 at 1.23.48 PM.jpeg", title: "Conference Room" },
  { src: "/ICIM Photos/Clinic Photos/WhatsApp Image 2026-06-02 at 9.34.24 AM.jpeg", title: "Clinic Exterior" },
];

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState<{
    section: SectionType;
    index: number;
  } | null>(null);

  const currentImages =
    lightbox?.section === "staff" ? staffImages : clinicImages;

  const openLightbox = (section: SectionType, index: number) => {
    setLightbox({ section, index });
  };

  const closeLightbox = () => {
    setLightbox(null);
  };

  const handlePrev = () => {
    if (!lightbox) return;
    setLightbox((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        index: prev.index === 0 ? currentImages.length - 1 : prev.index - 1,
      };
    });
  };

  const handleNext = () => {
    if (!lightbox) return;
    setLightbox((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        index: prev.index === currentImages.length - 1 ? 0 : prev.index + 1,
      };
    });
  };

  const currentImage = lightbox ? currentImages[lightbox.index] : null;

  return (
    <div className="space-y-0">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-[#005EB8] to-[#00A9CE] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-3">
            Clinic Photos & Environment
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Our Gallery
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mt-4 leading-relaxed">
            Take a virtual tour of our Anna and Sherman clinic facilities, and
            meet the dedicated team behind your care.
          </p>
        </div>
      </section>

      {/* SECTION 1: MEET OUR MEDICAL TEAM */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Meet Our Medical Team
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto leading-relaxed">
              Our experienced physicians, nurse practitioners, nurses, and
              administrative staff are committed to providing compassionate,
              high-quality care.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {staffImages.map((item, index) => (
              <div
                key={item.src}
                onClick={() => openLightbox("staff", index)}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: OUR CLINIC */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Our Clinic
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto leading-relaxed">
              Take a virtual tour of Imperial Care Internal Medicine and explore
              our welcoming facilities.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {clinicImages.map((item, index) => (
              <div
                key={item.src}
                onClick={() => openLightbox("clinic", index)}
                className="group cursor-pointer relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white text-gray-900 text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                      View Photo
                    </span>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {lightbox && currentImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

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

          <div className="max-w-5xl w-full flex flex-col items-center">
            <div className="relative w-full h-[80vh]">
              <Image
                src={currentImage.src}
                alt={currentImage.title}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-white text-lg font-bold">
                {currentImage.title}
              </h3>
              <p className="text-white/60 text-sm mt-1">
                {lightbox.index + 1} of {currentImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}