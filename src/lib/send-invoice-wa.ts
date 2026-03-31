type InvoiceWAData = {
  nama: string;
  whatsapp: string;
  paket: string;
  harga: number;
  tanggal_sesi: string;
  invoice_id: string;
};

function normalizeWhatsApp(whatsapp: string): string {
  const clean = whatsapp.replace(/\D/g, "");
  if (clean.startsWith("62")) return clean;
  if (clean.startsWith("0")) return `62${clean.slice(1)}`;
  return clean;
}

function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID").format(value);
}

function formatDeadlineWib(date: Date): string {
  const weekday = date.toLocaleDateString("id-ID", {
    weekday: "long",
    timeZone: "Asia/Jakarta",
  });
  const day = date.toLocaleDateString("id-ID", {
    day: "numeric",
    timeZone: "Asia/Jakarta",
  });
  const month = date.toLocaleDateString("id-ID", {
    month: "long",
    timeZone: "Asia/Jakarta",
  });
  const year = date.toLocaleDateString("id-ID", {
    year: "numeric",
    timeZone: "Asia/Jakarta",
  });
  const time = date
    .toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Jakarta",
    })
    .replace(":", ".");

  return `${weekday}, ${day} ${month} ${year} pukul ${time} WIB`;
}

export async function sendInvoiceWA(
  data: InvoiceWAData
): Promise<{ success: boolean; message: string }> {
  const token = process.env.FONNTE_TOKEN?.trim();
  const rekeningBca = process.env.REKENING_BCA?.trim() || "-";
  const namaRekening = process.env.NAMA_REKENING?.trim() || "-";

  if (!token) {
    return { success: false, message: "FONNTE_TOKEN tidak ditemukan" };
  }

  try {
    const target = normalizeWhatsApp(data.whatsapp);
    const deadline = formatDeadlineWib(
      new Date(Date.now() + 24 * 60 * 60 * 1000)
    );

    const message = `Halo ${data.nama}! 👋

Terima kasih sudah booking Gercep — Website Usaha Kamu Jadi Hari Ini! 🚀

━━━━━━━━━━━━━━━
🧾 INVOICE #${data.invoice_id}
━━━━━━━━━━━━━━━
📦 Paket: ${data.paket}
💰 Total: Rp ${formatRupiah(data.harga)}
📅 Jadwal Sesi: ${data.tanggal_sesi}
⏳ Batas Bayar: ${deadline}

━━━━━━━━━━━━━━━
💳 CARA PEMBAYARAN
━━━━━━━━━━━━━━━
Bank BCA
No. Rek: ${rekeningBca}
a.n. ${namaRekening}

atau via QRIS (konfirmasi dulu ke kami)

━━━━━━━━━━━━━━━
Setelah transfer, balas pesan ini dengan bukti pembayaran ya!

Ada pertanyaan? Langsung balas WA ini 😊

— Tim Gercep
gercep.tech`;

    const res = await fetch("https://api.fonnte.com/send", {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        target,
        message,
        countryCode: "62",
      }),
    });

    const result = await res.json().catch(() => ({}));
    if (!res.ok || result.status === false) {
      return {
        success: false,
        message: result.reason ?? "Gagal kirim invoice WA",
      };
    }

    return { success: true, message: "Invoice WA terkirim" };
  } catch (error) {
    console.error("[send-invoice-wa] Error:", error);
    return { success: false, message: "Network error" };
  }
}
