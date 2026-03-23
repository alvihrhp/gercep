const painPoints = [
  {
    icon: "❌",
    title: "Freelancer ngilang setelah dibayar DP",
    desc: "Sudah bayar, progress tidak jelas, hasil tidak sesuai harapan.",
  },
  {
    icon: "❌",
    title: "Nunggu 2–4 minggu tanpa kepastian",
    desc: "Proses tertutup, kamu tidak tahu website seperti apa yang sedang dibuat.",
  },
  {
    icon: "❌",
    title: "Template pasaran yang semua bisnis pakai sama",
    desc: "Tidak ada identitas, tidak ada diferensiasi, tidak memorable.",
  },
];

export default function PainPoint() {
  return (
    <section className="bg-brand-card py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Headline */}
        <h2 className="text-4xl font-black text-center mb-4 leading-tight">
          Masih nunggu website jadi{" "}
          <span className="text-brand-turquoise">2 minggu?</span>
        </h2>

        {/* Subtext */}
        <p className="text-brand-muted text-center mb-12 text-lg">
          Banyak UMKM stuck karena ini:
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="bg-brand-dark rounded-2xl p-8 border border-red-500/20 hover:border-red-500/40 transition-colors duration-200"
            >
              <div className="text-3xl mb-4">{point.icon}</div>
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
