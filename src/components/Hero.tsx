"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { WA_URL } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-dark pt-20 lg:min-h-[85vh] flex flex-col">
      {/* Background radial gradient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 80% 20%, rgba(18,209,151,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-12 lg:py-20 w-full flex-1 flex flex-col justify-center lg:min-h-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 lg:items-stretch lg:min-h-[calc(85vh-11rem)] gap-8 w-full">
          {/* Kolom kanan — foto (atas di mobile/tablet, kanan di desktop) */}
          <div className="order-1 lg:order-2 relative w-full min-h-[220px] h-[40vh] max-h-[380px] sm:min-h-[260px] sm:h-[38vh] sm:max-h-[420px] lg:h-full lg:max-h-none lg:min-h-0 rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/images/bg-hero.webp"
              alt="Gercep — jasa website cepat untuk UMKM"
              fill
              priority
              className="object-cover object-[center_30%] sm:object-[center_32%] lg:object-[center_38%]"
              sizes="(max-width: 1023px) 100vw, 50vw"
            />
            {/* Gradient: mobile & tablet — fade ke bawah (blend ke bg teks) */}
            <div
              className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-brand-dark/25 to-brand-dark lg:hidden"
              aria-hidden
            />
            {/* Gradient: desktop — fade dari kiri (warna bg site) */}
            <div
              className="absolute inset-0 pointer-events-none hidden lg:block bg-gradient-to-r from-brand-dark via-transparent to-transparent"
              aria-hidden
            />
          </div>

          {/* Kolom kiri — teks */}
          <motion.div
            className="order-2 lg:order-1 flex flex-col justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Badge */}
            <div className="border border-brand-turquoise text-brand-turquoise text-xs rounded-full px-4 py-1.5 inline-flex gap-2 items-center mb-6">
              <span>⚡</span>
              <span>Live · AI-Powered · 1 Jam Jadi</span>
            </div>

            {/* H1 */}
            <h1 className="text-5xl lg:text-7xl font-black leading-tight tracking-tight mb-6">
              Co-Create Website Instantly{" "}
              <br className="hidden sm:block" />
              <span className="text-brand-turquoise">In 1 Hour</span>
            </h1>

            {/* Subtext */}
            <p className="text-brand-muted text-lg lg:text-xl mb-8 max-w-lg leading-relaxed">
              Bikin Website Live Sessions Hanya 750 Ribu Dalam 1 Jam
            </p>

            {/* CTA Row */}
            <div className="flex gap-4 flex-wrap items-center mb-8">
              <motion.a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-turquoise text-brand-dark font-bold px-8 py-4 rounded-xl text-lg hover:opacity-90 transition-opacity"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                Gas Sekarang →
              </motion.a>
              <a
                href="#cara-kerja"
                className="text-brand-muted hover:text-white underline underline-offset-4 transition-colors duration-200 text-sm"
              >
                Lihat cara kerjanya ↓
              </a>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-2 text-sm text-brand-muted">
              <span>⭐⭐⭐⭐⭐</span>
              <span>Dipercaya 50+ usaha di Indonesia</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
