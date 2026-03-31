"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { WA_NUMBER, waUrlWithText } from "@/lib/constants";

const PAKET_LABELS: Record<string, { name: string; price: string }> = {
  xdeal: { name: "XDeal", price: "Rp 750.000" },
  xquick: { name: "XQuick", price: "Rp 1.500.000" },
  xpress: { name: "Xpress", price: "Rp 3.000.000" },
  xpriority: { name: "Xpriority", price: "Rp 5.000.000" },
};

export default function TerimaKasihPage() {
  const [data, setData] = useState<{
    orderNo?: string;
    nama: string;
    whatsapp: string;
    email?: string;
    paket: string;
  } | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("gercep_onboarding");
      if (raw) {
        setData(JSON.parse(raw));
        sessionStorage.removeItem("gercep_onboarding");
      }
    } catch {
      // ignore
    }
  }, []);

  const paketInfo = data?.paket ? PAKET_LABELS[data.paket] : null;

  return (
    <main className="min-h-screen bg-brand-dark flex flex-col items-center justify-center px-4 py-16">
      {/* Logo */}
      <Link href="/" className="flex items-center mb-10">
        <span className="font-black text-2xl tracking-tight text-white">GERCEP</span>
        <span className="w-2 h-2 rounded-full bg-brand-turquoise inline-block ml-1 mb-3" />
      </Link>

      <div className="w-full max-w-md bg-brand-darker rounded-2xl shadow-xl border border-white/10 p-8 text-center">
        {/* Success icon */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-brand-turquoise/15 rounded-full flex items-center justify-center">
            <CheckCircle2 size={36} className="text-brand-turquoise" />
          </div>
        </div>

        <h1 className="text-2xl font-black text-white mb-3">
          Brief kamu sudah kami terima! 🎉
        </h1>
        <p className="text-brand-muted text-sm leading-relaxed mb-8">
          Tim Gercep akan menghubungi kamu via WhatsApp dalam{" "}
          <span className="font-semibold text-white">1×24 jam</span> untuk
          konfirmasi jadwal sesi.
        </p>

        {/* Summary card */}
        {data && (
          <div className="bg-brand-dark/60 border border-white/10 rounded-xl p-5 text-left mb-8 space-y-3">
            <p className="text-xs font-semibold text-brand-muted uppercase tracking-wide mb-3">
              Ringkasan
            </p>
            <div className="flex justify-between text-sm">
              <span className="text-brand-muted">No. Order</span>
              <span className="font-semibold text-brand-turquoise">{data.orderNo ?? "-"}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-brand-muted">Nama</span>
              <span className="font-semibold text-white">{data.nama}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-brand-muted">WhatsApp</span>
              <span className="font-semibold text-white">{data.whatsapp}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-brand-muted">Email</span>
              <span className="font-semibold text-white">{data.email ?? "-"}</span>
            </div>
            {paketInfo && (
              <div className="flex justify-between text-sm">
                <span className="text-brand-muted">Paket</span>
                <span className="font-semibold text-brand-turquoise">
                  {paketInfo.name} — {paketInfo.price}
                </span>
              </div>
            )}
          </div>
        )}

        {/* CTA buttons */}
        <div className="flex flex-col gap-3">
          <a
            href={waUrlWithText(
              `Halo Gercep! Saya sudah submit brief atas nama ${data?.nama ?? ""}.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-brand-turquoise hover:opacity-90 text-brand-dark font-bold py-3 px-6 rounded-xl transition-colors text-sm"
          >
            <MessageCircle size={16} />
            Chat langsung via WhatsApp
          </a>
          <Link
            href="/"
            className="text-brand-muted hover:text-brand-turquoise text-sm underline underline-offset-4 transition-colors"
          >
            Kembali ke beranda
          </Link>
        </div>
      </div>

      <p className="text-brand-muted text-xs mt-8">
        Ada pertanyaan? Hubungi{" "}
        <a
          href={`https://wa.me/${WA_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-turquoise hover:underline"
        >
          wa.me/{WA_NUMBER}
        </a>
      </p>
    </main>
  );
}
