import { ClipboardList, Video, Globe } from "lucide-react";

const steps = [
  {
    number: "1",
    icon: ClipboardList,
    title: "Isi brief singkat",
    desc: "Ceritain bisnis kamu dalam 2 menit lewat form kami. Nama, deskripsi, dan kontak sudah cukup.",
  },
  {
    number: "2",
    icon: Video,
    title: "Sesi live 1 jam",
    desc: "Kita build bareng via Zoom — kamu lihat langsung prosesnya dan bisa kasih masukan real-time.",
  },
  {
    number: "3",
    icon: Globe,
    title: "Website langsung live",
    desc: "Selesai hari itu juga. Siap dipakai, siap dishare ke pelanggan.",
  },
];

export default function HowItWorks() {
  return (
    <section id="cara-kerja" className="bg-brand-dark py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Headline */}
        <h2 className="text-4xl font-black text-center mb-4 leading-tight">
          Sesimpel ini <span className="text-brand-turquoise">caranya.</span>
        </h2>

        {/* Subtext */}
        <p className="text-brand-muted text-center text-lg max-w-xl mx-auto">
          Tiga langkah dan website kamu langsung live hari itu juga.
        </p>

        {/* Steps */}
        <div className="relative flex flex-col md:flex-row items-start justify-between gap-8 mt-16">
          {/* Connecting line (desktop) */}
          <div className="absolute top-8 left-[16.66%] right-[16.66%] h-px bg-brand-turquoise/30 hidden md:block" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="flex-1 flex flex-col items-center text-center"
              >
                {/* Number Badge */}
                <div className="w-16 h-16 rounded-full bg-brand-turquoise text-brand-dark font-black text-2xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(18,209,151,0.4)] relative z-10">
                  {step.number}
                </div>

                {/* Icon */}
                <Icon className="text-brand-turquoise mb-4" size={30} />

                {/* Title */}
                <h3 className="font-bold text-xl text-white mb-3">
                  {step.title}
                </h3>

                {/* Desc */}
                <p className="text-brand-muted text-sm max-w-xs leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
