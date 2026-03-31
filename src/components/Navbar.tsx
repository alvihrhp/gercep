"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#cara-kerja", label: "Cara Kerja" },
    { href: "#paket", label: "Paket" },
    { href: "#testimoni", label: "Testimoni" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-brand-dark/80 border-b border-white/5"
          : ""
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="font-black text-[30px] leading-none text-white tracking-tight">
            GERCEP
          </span>
          <span className="w-2 h-2 rounded-full bg-brand-turquoise inline-block ml-1 mb-3" />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-brand-muted hover:text-white transition-colors duration-200 text-sm font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center">
          <Link
            href="/onboarding"
            className="bg-brand-turquoise text-brand-dark font-semibold px-5 py-2 rounded-lg hover:opacity-90 transition-opacity duration-200 text-sm"
          >
            Mulai Sekarang
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden backdrop-blur-md bg-brand-dark/95 border-b border-white/5 px-6 pb-6">
          <div className="flex flex-col gap-4 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-brand-muted hover:text-white transition-colors duration-200 text-base font-medium py-2 border-b border-white/5"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/onboarding"
              className="bg-brand-turquoise text-brand-dark font-semibold px-5 py-3 rounded-lg hover:opacity-90 transition-opacity duration-200 text-center mt-2"
              onClick={() => setIsOpen(false)}
            >
              Mulai Sekarang
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
