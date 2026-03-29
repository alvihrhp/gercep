import { CheckCircle2 } from "lucide-react";

const painPoints = [
  {
    title:
      "Sekarang Sudah Zaman AI, Mudahkan AI & Google Menemukan Usaha Anda",
    desc: "Website yang rapi dan jelas membuat mesin pencari dan asisten AI lebih mudah memahami bisnis kamu, mulai dari alamat, jam buka, layanan, dan kontak yang tersaji di satu tempat dan bisa diindeks.",
  },
  {
    title:
      "Semua Orang Pasti Cari Informasi Di Google Terlebih Dahulu, Pastikan Usaha Anda Ditemukan",
    desc: "Calon pelanggan biasanya googling nama usaha, alamat, atau jenis produk dulu. Tanpa halaman resmi, kamu bisa kalah saing dari kompetitor yang sudah muncul di hasil pencarian.",
  },
  {
    title: "Customer Lebih Percaya Usaha Yang Punya Website",
    desc: "Domain dan halaman profesional memberi kesan serius dan transparan, beda dengan akun sosmed saja yang terasa sementara. Kepercayaan awal sering mulai dari situ.",
  },
];

export default function PainPoint() {
  return (
    <section className="bg-brand-card py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Headline */}
        <h2 className="text-4xl font-black text-center mb-4 leading-tight">
          Masih Merasa Usahamu{" "}
          <span className="text-brand-turquoise">Tidak Butuh Website?</span>
        </h2>

        {/* Subtext */}
        <p className="text-brand-muted text-center mb-12 text-lg">
          Ini tiga alasan kuat kenapa punya website masih relevan untuk usaha kamu
          hari ini:
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="bg-brand-dark rounded-2xl p-8 border border-green-500/20 hover:border-green-500/40 transition-colors duration-200"
            >
              <div className="mb-4">
                <CheckCircle2
                  className="w-9 h-9 text-green-500"
                  strokeWidth={2}
                  aria-hidden
                />
              </div>
              <h3 className="font-bold text-lg text-white mb-2">
                {point.title}
              </h3>
              <p className="text-brand-muted text-sm leading-relaxed">
                {point.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Closing */}
        <p className="text-center text-brand-turquoise font-semibold text-lg">
          → Gercep hadir buat ngubah itu semua.
        </p>
      </div>
    </section>
  );
}
