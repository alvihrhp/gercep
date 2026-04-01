import { MessageCircle } from "lucide-react";
import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  WA_NUMBER,
  WA_URL,
} from "@/lib/constants";

const navLinks = [
  { href: "#cara-kerja", label: "Cara Kerja" },
  { href: "#paket", label: "Paket Harga" },
  { href: "#testimoni", label: "Testimoni" },
  { href: "#faq", label: "FAQ" },
];

const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const FacebookIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
    aria-hidden="true"
  >
    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.46h-1.25c-1.24 0-1.62.77-1.62 1.56V12h2.76l-.44 2.89h-2.32v6.99A10 10 0 0 0 22 12z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-brand-darker pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Left — Brand */}
          <div>
            <div className="flex items-center mb-2">
              <span className="font-black text-2xl text-white tracking-tight">
                GERCEP
              </span>
              <span className="w-2 h-2 rounded-full bg-brand-turquoise inline-block ml-1 mb-3" />
            </div>
            <p className="text-brand-muted mt-2 text-sm">
              Bikin Usaha Tampil Online
            </p>
            <p className="text-sm text-brand-muted mt-4 max-w-xs leading-relaxed">
              Jasa pembuatan website cepat untuk UMKM Indonesia. Live, pakai
              AI, selesai hari ini.
            </p>
          </div>

          {/* Center — Navigation */}
          <div>
            <h3 className="font-semibold text-white mb-4">Navigasi</h3>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-brand-muted hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Hubungi Kami</h3>
            <div className="flex gap-4 mb-4">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-brand-muted hover:text-brand-turquoise transition-colors duration-200"
              >
                <InstagramIcon />
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-brand-muted hover:text-brand-turquoise transition-colors duration-200"
              >
                <FacebookIcon />
              </a>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="text-brand-muted hover:text-brand-turquoise transition-colors duration-200"
              >
                <MessageCircle size={20} />
              </a>
            </div>
            <p className="text-sm text-brand-muted mb-2">
              Atau chat langsung:
            </p>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-turquoise text-sm hover:underline"
            >
              wa.me/{WA_NUMBER}
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 text-brand-muted text-sm">
          <p>© 2026 Gercep. All rights reserved.</p>
          <p>Dibuat dengan ❤️ untuk UMKM Indonesia</p>
        </div>
      </div>
    </footer>
  );
}
