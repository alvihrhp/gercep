"use client";

import { motion } from "framer-motion";
import { WA_URL } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center relative overflow-hidden bg-brand-dark pt-20">
      {/* Background radial gradient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 80% 20%, rgba(18,209,151,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Column */}
          <motion.div
            className="lg:w-3/5"
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
              Website usaha kamu jadi{" "}
              <br className="hidden sm:block" />
              <span className="text-brand-turquoise">hari ini.</span>
            </h1>

            {/* Subtext */}
            <p className="text-brand-muted text-lg lg:text-xl mb-8 max-w-lg leading-relaxed">
              Live bareng kamu. Pakai AI. Selesai dalam 1 jam — tanpa ribet,
              tanpa nunggu berminggu-minggu.
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

          {/* Right Column — Browser Mockup */}
          <div className="lg:w-2/5 flex justify-center w-full">
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-full max-w-sm"
            >
              <div className="bg-brand-card rounded-2xl p-4 shadow-[0_0_60px_rgba(18,209,151,0.15)] w-full">
                {/* Browser Chrome */}
                <div className="flex gap-1.5 mb-3">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400" />
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                </div>

                {/* URL Bar */}
                <div className="bg-brand-dark rounded px-3 py-1 text-xs text-brand-muted text-center mb-4">
                  gercep.id/usaha-kamu
                </div>

                {/* Fake Website Skeleton */}
                <div className="space-y-3">
                  {/* Hero skeleton */}
                  <div className="bg-brand-turquoise/20 rounded-lg h-20 animate-pulse" />

                  {/* Nav skeleton */}
                  <div className="flex gap-2">
                    <div className="bg-white/10 rounded h-3 w-16" />
                    <div className="bg-white/10 rounded h-3 w-12" />
                    <div className="bg-white/10 rounded h-3 w-14" />
                  </div>

                  {/* Text lines skeleton */}
                  <div className="bg-white/10 rounded h-3 w-full" />
                  <div className="bg-white/10 rounded h-3 w-4/5" />
                  <div className="bg-white/10 rounded h-3 w-3/5" />

                  {/* Button skeleton */}
                  <div className="bg-brand-turquoise/40 rounded h-8 w-24" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
