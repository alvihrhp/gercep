"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const faqs = [
  {
    question: "Apakah saya perlu ngerti coding?",
    answer:
      "Sama sekali tidak. Kamu tinggal duduk, cerita soal bisnis kamu, dan kami yang kerjakan semuanya live di depan kamu.",
  },
  {
    question: "Apa yang perlu saya siapkan sebelum sesi?",
    answer:
      "Cukup nama bisnis, deskripsi singkat, nomor WhatsApp, dan logo kalau ada. Kami kirim form lengkapnya setelah booking.",
  },
  {
    question: "Apakah ada revisi?",
    answer:
      "XQuick dan Xpress mendapat 1x revisi dalam 48 jam setelah delivery. Xpriority mendapat revisi langsung saat sesi berlangsung.",
  },
  {
    question: "Bagaimana cara bayarnya?",
    answer:
      "Transfer bank atau QRIS (GoPay, OVO, Dana). XDeal & Xpriority: lunas di muka. XQuick & Xpress: 50% DP, 50% setelah website jadi.",
  },
  {
    question: "Website-nya di-host di mana?",
    answer:
      "Kami deploy ke Vercel — gratis, cepat, dan reliable. Domain milik kamu sendiri, kami bantu setup dan sambungkan semuanya.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="bg-brand-card py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Headline */}
        <h2 className="text-4xl font-black text-center mb-4 leading-tight">
          Pertanyaan yang{" "}
          <span className="text-brand-turquoise">sering ditanya.</span>
        </h2>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto mt-16">
          {faqs.map((faq, index) => (
            <div key={index}>
              <button
                className="w-full flex justify-between items-center py-5 border-b border-white/10 text-left group"
                onClick={() =>
                  setActiveIndex(activeIndex === index ? null : index)
                }
              >
                <span className="font-semibold text-white text-lg group-hover:text-brand-turquoise transition-colors duration-200 pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  size={20}
                  className={`text-brand-muted flex-shrink-0 transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="text-brand-muted py-4 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
