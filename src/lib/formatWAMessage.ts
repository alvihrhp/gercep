const PAKET_LABELS: Record<string, string> = {
  xdeal: "XDeal",
  xquick: "XQuick",
  xpress: "Xpress",
  xpriority: "Xpriority",
};

const PAKET_PRICES: Record<string, string> = {
  xdeal: "Rp 750.000",
  xquick: "Rp 1.500.000",
  xpress: "Rp 3.000.000",
  xpriority: "Rp 5.000.000",
};

export function buildLeadNotification({
  nama,
  whatsapp,
  namaUsaha,
  jenisUsaha,
  paket,
  warnaMood,
}: {
  nama: string;
  whatsapp: string;
  namaUsaha: string;
  jenisUsaha: string;
  paket: string;
  warnaMood: string;
}): string {
  const paketLabel = PAKET_LABELS[paket] ?? paket;
  const harga = PAKET_PRICES[paket] ?? "-";

  return `🔔 *Lead Baru Gercep!*

👤 *Nama:* ${nama}
📱 *WA:* ${whatsapp}
🏪 *Usaha:* ${namaUsaha} (${jenisUsaha})
💰 *Paket:* ${paketLabel} — ${harga}
🎨 *Mood:* ${warnaMood || "-"}

_Cek Google Sheets untuk detail lengkap._`;
}
