import { NextRequest, NextResponse } from "next/server";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import { getGoogleServiceAccountCredentials, stripEnvQuotes } from "@/lib/server-env";
import { sendWhatsApp } from "@/lib/fonnte";
import { buildLeadNotification } from "@/lib/formatWAMessage";
import { sendInvoiceWA } from "@/lib/send-invoice-wa";

const PAKET_PRICES: Record<string, string> = {
  xdeal: "Rp 750.000",
  xquick: "Rp 1.500.000",
  xpress: "Rp 3.000.000",
  xpriority: "Rp 5.000.000",
};

const PAKET_LABELS: Record<string, string> = {
  xdeal: "XDeal",
  xquick: "XQuick",
  xpress: "Xpress",
  xpriority: "Xpriority",
};

const PAKET_TOTAL_NUMBERS: Record<string, number> = {
  xdeal: 750000,
  xquick: 1500000,
  xpress: 3000000,
  xpriority: 5000000,
};

function getOrdinalSuffix(day: number) {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

function formatOrderTimestamp(date = new Date()) {
  const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${weekday}, ${day}${getOrdinalSuffix(day)} ${month} ${year}`;
}

function generateOrderNo() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let randomPart = "";
  for (let i = 0; i < 6; i++) {
    randomPart += chars[Math.floor(Math.random() * chars.length)];
  }
  return `GERCEP-${randomPart}`;
}

function generateInvoiceId(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  let suffix = "";
  for (let i = 0; i < 3; i++) {
    suffix += chars[Math.floor(Math.random() * chars.length)];
  }
  return `GRCP-${y}${m}${d}-${suffix}`;
}

async function appendToSheet(data: Record<string, string>) {
  const { clientEmail, privateKey } = getGoogleServiceAccountCredentials();

  const serviceAccountAuth = new JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheetId = stripEnvQuotes(process.env.GOOGLE_SHEET_ID);
  if (!sheetId) throw new Error("GOOGLE_SHEET_ID belum diset");

  const doc = new GoogleSpreadsheet(sheetId, serviceAccountAuth);
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];

  await sheet.addRow({
    Timestamp: formatOrderTimestamp(),
    "No Order": data.orderNo,
    Nama: data.nama,
    WhatsApp: data.whatsapp,
    Email: data.email,
    "Nama Usaha": data.namaUsaha,
    "Jenis Usaha": data.jenisUsaha,
    Deskripsi: data.deskripsi,
    "Produk & Harga": data.produk,
    Keunggulan: data.keunggulan,
    "Foto 1": data.fotoProduk1,
    "Foto 2": data.fotoProduk2,
    "Foto 3": data.fotoProduk3,
    "Logo URL": data.logoUrl,
    "Warna Mood": data.warnaMood,
    Tagline: data.tagline,
    "Referensi URL": data.referensiUrl,
    Catatan: data.catatan,
    Paket: data.paket,
    "Harga Paket": PAKET_PRICES[data.paket] ?? "",
  });
}

async function sendWANotif(data: Record<string, string>) {
  const to = process.env.RAFAEL_WA_NUMBER?.trim();
  if (!to) {
    console.warn("[submit-form] RAFAEL_WA_NUMBER belum diset, skip WA notif");
    return;
  }

  const message = buildLeadNotification({
    orderNo: data.orderNo,
    nama: data.nama,
    whatsapp: data.whatsapp,
    email: data.email,
    namaUsaha: data.namaUsaha,
    jenisUsaha: data.jenisUsaha,
    paket: data.paket,
    warnaMood: data.warnaMood,
  });

  const result = await sendWhatsApp({ to, message });
  if (!result.success) {
    console.warn("[submit-form] WA notification gagal:", result.message);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const required = ["nama", "whatsapp", "email", "namaUsaha", "jenisUsaha", "deskripsi", "keunggulan", "paket"];
    for (const field of required) {
      if (!body[field]?.toString().trim()) {
        return NextResponse.json({ success: false, error: `Field ${field} wajib diisi` }, { status: 400 });
      }
    }

    const orderNo = generateOrderNo();
    const invoiceId = generateInvoiceId();

    const data = {
      orderNo,
      nama: body.nama,
      whatsapp: body.whatsapp,
      email: body.email,
      namaUsaha: body.namaUsaha,
      jenisUsaha: body.jenisUsaha,
      deskripsi: body.deskripsi,
      produk: (body.produk ?? "").toString() || "(tidak diisi)",
      keunggulan: body.keunggulan,
      fotoProduk1: (body.fotoProduk1 ?? "").toString(),
      fotoProduk2: (body.fotoProduk2 ?? "").toString(),
      fotoProduk3: (body.fotoProduk3 ?? "").toString(),
      logoUrl: (body.logoUrl ?? "").toString(),
      warnaMood: body.warnaMood ?? "",
      tagline: body.tagline ?? "",
      referensiUrl: body.referensiUrl ?? "",
      catatan: body.catatan ?? "",
      paket: body.paket,
    };

    await appendToSheet(data);
    await sendWANotif(data);

    // Non-blocking: jangan gagalkan submit kalau pengiriman invoice WA ke klien gagal.
    void sendInvoiceWA({
      nama: data.nama,
      whatsapp: data.whatsapp,
      paket: PAKET_LABELS[data.paket] ?? data.paket,
      harga: PAKET_TOTAL_NUMBERS[data.paket] ?? 0,
      tanggal_sesi: "Menunggu konfirmasi jadwal",
      invoice_id: invoiceId,
    }).then((result) => {
      if (!result.success) {
        console.warn("[submit-form] Invoice WA gagal:", result.message);
      }
    });

    return NextResponse.json({ success: true, orderNo, invoiceId });
  } catch (err: unknown) {
    console.error("[submit-form]", err);
    const msg = err instanceof Error ? err.message : "";
    if (
      msg.includes("DECODER") ||
      msg.includes("OSSL") ||
      msg.includes("unsupported") ||
      msg.includes("OpenSSL") ||
      msg.includes("PRIVATE KEY")
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Kunci Google tidak valid. Cara paling aman: di .env set GOOGLE_SERVICE_ACCOUNT_B64 = isi file JSON (base64 satu baris). Terminal: base64 -i credentials.json | tr -d '\\n'. Hapus GOOGLE_PRIVATE_KEY lama jika pakai B64.",
        },
        { status: 500 }
      );
    }
    if (msg.includes("GOOGLE_")) {
      return NextResponse.json({ success: false, error: msg }, { status: 500 });
    }
    return NextResponse.json({ success: false, error: "Terjadi kesalahan server" }, { status: 500 });
  }
}
