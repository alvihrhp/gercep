import { WA_URL } from "@/lib/constants";

export default function FinalCTA() {
  return (
    <section className="bg-brand-turquoise py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Headline */}
        <h2 className="text-5xl font-black text-brand-dark leading-tight mb-6">
          Kapan lagi usaha kamu
          <br />
          tampil profesional hari ini?
        </h2>

        {/* Subtext */}
        <p className="text-brand-dark/70 text-xl mb-10">
          Pilih slot, bayar, langsung sesi. Sesimpel itu.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-dark text-white font-bold px-10 py-4 rounded-xl text-lg hover:opacity-90 transition-opacity duration-200"
          >
            Gas Sekarang →
          </a>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-brand-dark text-brand-dark font-semibold px-10 py-4 rounded-xl hover:bg-brand-dark hover:text-white transition-all duration-200"
          >
            💬 Chat via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
