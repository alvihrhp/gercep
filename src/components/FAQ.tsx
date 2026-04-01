"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { WA_URL } from "@/lib/constants";

type FAQItem = {
  question: string;
  answer: ReactNode;
};

const faqs: FAQItem[] = [
  {
    question: "Apakah saya perlu ngerti coding?",
    answer:
      "Sama sekali tidak. Kamu tinggal duduk, cerita soal bisnis kamu, dan kami yang kerjakan semuanya live di depan kamu.",
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
  {
    question: "Domain harus beli sendiri atau sudah include?",
    answer: (
      <>
        Untuk domain, kamu bisa beli sendiri lewat{" "}
        <a
          href="https://www.hostinger.com/id?utm_source=google&utm_medium=cpc&utm_id=22684210794&utm_campaign=Brand-Exact-Niagahoster|NT:Se|LO:ID&utm_term=niagahoster&utm_content=759081079800&gad_source=1&gad_campaignid=22684210794"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-turquoise underline underline-offset-2"
        >
          Niagahoster
        </a>. Tenang, tim kami siap bantu setup sampai website kamu live di
        domain tersebut.
      </>
    ),
  },
  {
    question: "Setelah jadi, ada biaya bulanan/tahunan gak?",
    answer:
      "Tenang, dari kami tidak ada biaya tambahan bulanan atau tahunan. Setelah website jadi, kamu cukup lanjutkan biaya layanan pihak ketiga yang memang kamu pakai (misalnya domain/hosting) sesuai kebutuhan.",
  },
  {
    question: "Bedanya tiap paket apa, yang mana cocok buat saya?",
    answer: (
      <>
        Biar kamu tidak salah pilih, kita bisa bantu rekomendasikan paket yang
        paling pas sesuai kebutuhan bisnismu. Langsung konsultasi lewat{" "}
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-turquoise underline underline-offset-2"
        >
          WhatsApp
        </a>
        , ya.
      </>
    ),
  },
  {
    question: "Sesinya online atau offline? Via apa?",
    answer:
      "Sesi kita dilakukan online supaya lebih fleksibel. Kamu bisa pilih via Google Meet atau Zoom, mana yang paling nyaman buat kamu.",
  },
];

export default function FAQ() {
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);

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
          {faqs.map((faq) => (
            <div key={faq.question}>
              <button
                type="button"
                className="w-full flex justify-between items-center py-5 border-b border-white/10 text-left group"
                onClick={() =>
                  setActiveQuestion(
                    activeQuestion === faq.question ? null : faq.question
                  )
                }
              >
                <span className="font-semibold text-white text-lg group-hover:text-brand-turquoise transition-colors duration-200 pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  size={20}
                  className={`text-brand-muted flex-shrink-0 transition-transform duration-300 ${
                    activeQuestion === faq.question ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {activeQuestion === faq.question && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="text-brand-muted py-4 leading-relaxed">
                      {faq.answer}
                    </div>
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
