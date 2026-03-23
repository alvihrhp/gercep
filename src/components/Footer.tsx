import { MessageCircle } from "lucide-react";
import { WA_URL } from "@/lib/constants";

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

const TikTokIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.2 8.2 0 0 0 4.79 1.53V6.75a4.85 4.85 0 0 1-1.02-.06z" />
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
                href="https://instagram.com/gercep.id"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-brand-muted hover:text-brand-turquoise transition-colors duration-200"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://tiktok.com/@gercep.id"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-brand-muted hover:text-brand-turquoise transition-colors duration-200"
              >
                <TikTokIcon />
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
              wa.me/gercep
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
