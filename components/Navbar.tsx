"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Calendar } from "lucide-react";

interface NavbarProps {
  onOpenAppointmentModal: () => void;
}

export default function Navbar({ onOpenAppointmentModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "What's New", href: "/whats-new" },
    { name: "Locations", href: "/locations" },
    { name: "Forms", href: "/forms" },
    { name: "Gallery", href: "/gallery" },
    { name: "Reviews", href: "/reviews" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full shadow-xs">
      {/* Main Navbar */}
      <nav className="glass-nav px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Only */}
          <Link href="/" className="flex items-center group py-1" aria-label="Imperial Care Internal Medicine Home">
            <div className="relative h-12 sm:h-14 w-auto min-w-[140px] sm:min-w-[170px] group-hover:scale-[1.02] transition-transform">
              <Image
                src="/loho.jpeg"
                alt="Imperial Care Internal Medicine"
                width={200}
                height={60}
                className="h-full w-auto object-contain rounded-lg"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "text-[#005EB8] bg-[#005EB8]/10 font-semibold"
                      : "text-gray-700 hover:text-[#005EB8] hover:bg-gray-100"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAppointmentModal}
              className="hidden sm:inline-flex items-center gap-2 bg-[#005EB8] hover:bg-[#004B93] text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
            >
              <Calendar className="w-4 h-4" />
              Schedule Appointment
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:text-[#005EB8] hover:bg-gray-100 focus:outline-hidden"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-gray-200 animate-in slide-in-from-top duration-200">
            <div className="flex flex-col space-y-1 pb-3">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? "text-[#005EB8] bg-[#005EB8]/10 font-bold"
                        : "text-gray-700 hover:text-[#005EB8] hover:bg-gray-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-2 px-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAppointmentModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-[#005EB8] text-white py-3 rounded-lg font-semibold shadow-sm"
                >
                  <Calendar className="w-4 h-4" />
                  Schedule Appointment
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
