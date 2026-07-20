import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Printer,
  MapPin,
  Clock,
  Mail,
  Shield,
  AlertTriangle,
  MessageCircle
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#2D3436] text-gray-300 pt-16 pb-8 border-t-4 border-[#005EB8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-gray-700">
          
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white p-0.5 overflow-hidden shadow-md shrink-0">
                <Image
                  src="/loho.jpeg"
                  alt="Imperial Care Internal Medicine Logo"
                  width={44}
                  height={44}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div>
                <span className="block text-xl font-bold text-white tracking-tight">
                  Imperial Care
                </span>
                <span className="block text-xs font-semibold text-[#00A9CE] tracking-wider uppercase">
                  Internal Medicine
                </span>
              </div>
            </div>
            
            <p className="text-sm text-gray-400 leading-relaxed">
              Personalized, evidence-based care for adult health led by Dr. Sumbul Islam, MD. Dedicated to serving patients across Collin & Grayson Counties with excellence and compassion.
            </p>

            <div className="pt-2 flex items-center space-x-3">
              {/* Facebook */}
              <a
                href="#facebook"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-[#005EB8] text-gray-400 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="#instagram"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-[#00A9CE] text-gray-400 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="#linkedin"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-[#005EB8] text-gray-400 hover:text-white flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="#twitter"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-[#00A9CE] text-gray-400 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Twitter / X"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 tracking-wide border-l-2 border-[#00A9CE] pl-3">
              Quick Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-[#00A9CE] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#00A9CE] transition-colors">
                  About Dr. Islam & Staff
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#00A9CE] transition-colors">
                  Services & Weight Loss
                </Link>
              </li>
              <li>
                <Link href="/whats-new" className="hover:text-[#00A9CE] transition-colors">
                  What's New
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-[#00A9CE] transition-colors">
                  Locations & Hours
                </Link>
              </li>
              <li>
                <Link href="/forms" className="hover:text-[#00A9CE] transition-colors">
                  Patient Forms
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#00A9CE] transition-colors">
                  Clinic Gallery
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-[#00A9CE] transition-colors">
                  Patient Reviews
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#00A9CE] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Locations & Contact */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 tracking-wide border-l-2 border-[#00A9CE] pl-3">
              Contact & Locations
            </h3>
            
            <div className="space-y-4 text-sm">
              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-[#FF6B6B] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-semibold text-white">Phone & Fax</span>
                  <a href="tel:9039570417" className="hover:text-[#00A9CE]">
                    Phone: (903) 957-0417
                  </a>
                  <span className="block text-xs text-gray-400">Fax: (903) 355-2938</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MessageCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-semibold text-white">WhatsApp</span>
                  <a
                    href="https://wa.me/19592824133"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-400 font-semibold"
                  >
                    +1 (959) 282-4133
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-[#00A9CE] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-semibold text-white">Collin County Location</span>
                  <p className="text-xs text-gray-400">
                    450 N Standridge Blvd, Suite 104<br />Anna, TX 75409
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-[#00A9CE] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-semibold text-white">Grayson County Location</span>
                  <p className="text-xs text-gray-400">
                    1700 N Travis St<br />Sherman, TX 75092
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Office Hours & Emergency Notice */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 tracking-wide border-l-2 border-[#00A9CE] pl-3">
              Office Hours
            </h3>
            
            <div className="bg-gray-800/60 p-3.5 rounded-lg border border-gray-700 text-xs space-y-1.5 mb-4">
              <div className="flex justify-between">
                <span>Monday – Thursday:</span>
                <span className="font-semibold text-white">8:00 AM – 5:00 PM</span>
              </div>
              <div className="flex justify-between border-t border-gray-700/50 pt-1">
                <span>Friday:</span>
                <span className="font-medium text-[#00A9CE]">Telephone appointments</span>
              </div>
              <div className="flex justify-between border-t border-gray-700/50 pt-1">
                <span>Saturday – Sunday:</span>
                <span className="text-gray-400">Closed</span>
              </div>
            </div>

            {/* Emergency Notice */}
            <div className="bg-red-950/40 border border-red-800/50 p-3 rounded-lg flex items-start space-x-2 text-xs text-red-200">
              <AlertTriangle className="w-4 h-4 text-[#FF6B6B] shrink-0 mt-0.5" />
              <p>
                <strong className="text-white">Emergency Notice:</strong> For immediate life-threatening medical emergencies, please dial <strong className="underline">911</strong> immediately.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-4">
          <p>© 2026 Imperial Care Internal Medicine. All Rights Reserved.</p>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/sms-terms" className="hover:text-white transition-colors">
              SMS Terms & Conditions
            </Link>
            <Link href="/social-media-guidelines" className="hover:text-white transition-colors">
              Social Media Guidelines
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
