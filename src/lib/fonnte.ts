export async function sendWhatsApp({
  to,
  message,
}: {
  to: string;
  message: string;
}): Promise<{ success: boolean; message?: string }> {
  const token = process.env.FONNTE_TOKEN?.trim();
  if (!token) {
    console.warn("[fonnte] FONNTE_TOKEN belum diset");
    return { success: false, message: "FONNTE_TOKEN tidak ditemukan" };
  }

  try {
    const res = await fetch("https://api.fonnte.com/send", {
      method: "POST",
      headers: {
        // Fonnte expects raw token, not "Bearer <token>"
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ target: to, message, countryCode: "62" }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok || data.status === false) {
      console.error("[fonnte] Error:", data);
      return { success: false, message: data.reason ?? "Gagal kirim WA" };
    }

    return { success: true };
  } catch (err) {
    console.error("[fonnte] Network error:", err);
    return { success: false, message: "Network error" };
  }
}
