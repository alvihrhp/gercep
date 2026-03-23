import { CheckCircle2 } from "lucide-react";
import { WA_URL } from "@/lib/constants";

const packages = [
  {
    id: "xdeal",
    badge: "Paling Terjangkau",
    badgeClass: "text-brand-turquoise bg-brand-turquoise/10",
    price: "Rp 750.000",
    duration: "1 Jam Live Session",
    features: [
      "1 landing page",
      "3 scroll sections",
      "Mobile-ready",
      "Deploy live hari ini",
      "Tombol CTA ke WhatsApp",
    ],
    ctaLabel: "Pilih XDeal",
    highlighted: false,
  },
  {
    id: "xquick",
    badge: "Cepat & Hemat",
    badgeClass: "text-brand-muted bg-white/5",
    price: "Rp 1.500.000",
    duration: "3 Hari Pengerjaan",
    features: [
      "3–4 halaman website",
      "Mobile-ready",
      "SEO basic",
      "Meta tags lengkap",
      "Pendampingan setup domain",
    ],
    ctaLabel: "Pilih XQuick",
    highlighted: false,
  },
  {
    id: "xpress",
    badge: "🔥 Terlaris",
    badgeClass: "bg-brand-turquoise text-brand-dark font-bold",
    price: "Rp 3.000.000",
    duration: "Selesai 1 Hari",
    features: [
      "4–5 halaman website",
      "Mobile-ready",
      "Copywriting dibantu AI",
      "Setup custom domain",
      "SEO on-page lengkap",
    ],
    ctaLabel: "Pilih Xpress",
    highlighted: true,
  },
  {
    id: "xpriority",
    badge: "Premium",
    badgeClass: "text-brand-muted bg-white/5",
    price: "Rp 5.000.000",
    duration: "1 Jam Live Premium",
    features: [
      "Landing page premium",
      "Mobile-ready",
      "Revisi real-time saat sesi",
      "AI discoverability setup",
      "Priority booking slot",
    ],
    ctaLabel: "Pilih Xpriority",
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section id="paket" className="bg-brand-card py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Headline */}
        <h2 className="text-4xl font-black text-center mb-4 leading-tight">
          Pilih paket{" "}
          <span className="text-brand-turquoise">yang pas buat kamu.</span>
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-2xl p-8 flex flex-col transition-all duration-200 ${
                pkg.highlighted
                  ? "ring-2 ring-brand-turquoise bg-brand-dark shadow-[0_0_40px_rgba(18,209,151,0.2)] relative lg:scale-105"
                  : "bg-brand-dark border border-white/10 hover:border-brand-turquoise/40"
              }`}
            >
              {/* Badge */}
              <span
                className={`text-xs rounded-full px-3 py-1 w-fit mb-4 ${pkg.badgeClass}`}
              >
                {pkg.badge}
              </span>

              {/* Price */}
              <p className="text-4xl font-black text-white mb-1">{pkg.price}</p>

              {/* Duration */}
              <p className="text-brand-muted text-sm mb-6">{pkg.duration}</p>

              {/* Divider */}
              <div className="border-t border-white/10 mb-6" />

              {/* Features */}
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2
                      size={16}
                      className="text-brand-turquoise flex-shrink-0 mt-0.5"
                    />
                    <span className="text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-auto text-center font-semibold py-3 rounded-xl w-full transition-all duration-200 ${
                  pkg.highlighted
                    ? "bg-brand-turquoise text-brand-dark hover:opacity-90"
                    : "border border-brand-turquoise text-brand-turquoise hover:bg-brand-turquoise hover:text-brand-dark"
                }`}
              >
                {pkg.ctaLabel}
              </a>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <p className="text-center text-brand-muted text-sm mt-12">
          ✓ Semua paket sudah termasuk mobile-ready &amp; deploy hari itu juga
        </p>
      </div>
    </section>
  );
}
