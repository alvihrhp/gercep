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
  const [data, setData] = useState<{ nama: string; whatsapp: string; paket: string } | null>(null);

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
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-16">
      {/* Logo */}
      <Link href="/" className="flex items-center mb-10">
        <span className="font-black text-2xl tracking-tight text-gray-900">GERCEP</span>
        <span className="w-2 h-2 rounded-full bg-green-600 inline-block ml-1 mb-3" />
      </Link>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        {/* Success icon */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 size={36} className="text-green-600" />
          </div>
        </div>

        <h1 className="text-2xl font-black text-gray-900 mb-3">
          Brief kamu sudah kami terima! 🎉
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          Tim Gercep akan menghubungi kamu via WhatsApp dalam{" "}
          <span className="font-semibold text-gray-700">1×24 jam</span> untuk
          konfirmasi jadwal sesi.
        </p>

        {/* Summary card */}
        {data && (
          <div className="bg-gray-50 rounded-xl p-5 text-left mb-8 space-y-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
              Ringkasan
            </p>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Nama</span>
              <span className="font-semibold text-gray-800">{data.nama}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">WhatsApp</span>
              <span className="font-semibold text-gray-800">{data.whatsapp}</span>
            </div>
            {paketInfo && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Paket</span>
                <span className="font-semibold text-green-700">
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
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl transition-colors text-sm"
          >
            <MessageCircle size={16} />
            Chat langsung via WhatsApp
          </a>
          <Link
            href="/"
            className="text-gray-400 hover:text-gray-700 text-sm underline underline-offset-4 transition-colors"
          >
            Kembali ke beranda
          </Link>
        </div>
      </div>

      <p className="text-gray-400 text-xs mt-8">
        Ada pertanyaan? Hubungi{" "}
        <a
          href={`https://wa.me/${WA_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 hover:underline"
        >
          wa.me/{WA_NUMBER}
        </a>
      </p>
    </main>
  );
}
