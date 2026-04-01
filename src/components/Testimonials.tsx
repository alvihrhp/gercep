import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Website kami jadi lebih profesional dan mewakili standar DMC internasional. Prosesnya cepat, jelas, dan hasilnya langsung bisa dipakai untuk klien global.",
    name: "Arya Vasco",
    business: "Asialink Holidays, Indonesia, Vietnam, Thailand",
    initial: "A",
    avatar: "/images/portfolio/vasco.jpg",
  },
  {
    quote:
      "Website company profile kami sekarang terlihat jauh lebih kredibel untuk kebutuhan presentasi ke klien dan partner. Pengerjaannya cepat dan komunikasinya enak.",
    name: "Difa Putra Ramadhan",
    business: "PT. Indomedia Outdoor, Jakarta",
    initial: "D",
    avatar: "/images/portfolio/putra.png",
  },
  {
    quote:
      "Website kami sekarang lebih kuat merepresentasikan identitas perusahaan di sektor defence. Tampilan lebih profesional dan memudahkan komunikasi ke partner strategis.",
    name: "Asuryo",
    business: "PT. Jatik Cakra Nanggala",
    initial: "A",
    avatar: "/images/portfolio/asuryo.png",
  },
];

export default function Testimonials() {
  return (
    <section id="testimoni" className="bg-brand-dark py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Headline */}
        <h2 className="text-4xl font-black text-center mb-4 leading-tight">
          Kata mereka yang{" "}
          <span className="text-brand-turquoise">sudah online.</span>
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-brand-card rounded-2xl p-8 border border-white/5 hover:border-brand-turquoise/20 transition-colors duration-200"
            >
              {/* Stars */}
              <div className="flex gap-1 text-brand-turquoise mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-brand-turquoise text-brand-turquoise"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-white text-lg font-medium leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-turquoise/20 flex items-center justify-center text-brand-turquoise font-bold text-sm flex-shrink-0">
                  {t.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    t.initial
                  )}
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{t.name}</p>
                  <p className="text-brand-muted text-xs">{t.business}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
