import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function buildPrompt(body: Record<string, string>): string {
  const { type, namaUsaha, jenisUsaha, deskripsi, keunggulan } = body;

  switch (type) {
    case "deskripsi":
      return `Kamu adalah copywriter profesional untuk UMKM Indonesia.
Tulis deskripsi bisnis yang engaging untuk:
- Nama usaha: ${namaUsaha}
- Jenis usaha: ${jenisUsaha}

Tulis 2–3 kalimat dalam Bahasa Indonesia yang natural, hangat, dan menarik minat calon pelanggan.
Jangan gunakan bullet point. Langsung tulis deskripsinya saja tanpa pembuka.`;

    case "produk":
      return `Kamu adalah copywriter UMKM Indonesia.
Generate daftar produk/jasa yang relevan untuk:
- Nama usaha: ${namaUsaha}
- Jenis usaha: ${jenisUsaha}
- Deskripsi: ${deskripsi}

Format tiap item: Nama Produk — Harga (dalam Rupiah)
Buat 5–8 item yang realistis dan relevan. Satu item per baris. Jangan tambahkan penjelasan lain.`;

    case "keunggulan":
      return `Kamu adalah copywriter UMKM Indonesia.
Tulis 3 poin keunggulan yang compelling untuk:
- Nama usaha: ${namaUsaha}
- Jenis usaha: ${jenisUsaha}
- Deskripsi: ${deskripsi}

Format: 3 poin singkat dan kuat, masing-masing 1 kalimat, dipisahkan newline.
Jangan gunakan bullet point atau nomor. Langsung tulis poin-poinnya.`;

    case "tagline":
      return `Kamu adalah copywriter UMKM Indonesia.
Buat tepat 3 opsi tagline pendek dan catchy untuk:
- Nama usaha: ${namaUsaha}
- Jenis usaha: ${jenisUsaha}
- Keunggulan: ${keunggulan}

Return HANYA JSON array berisi tepat 3 string tagline. Contoh: ["Tagline 1", "Tagline 2", "Tagline 3"]
Jangan tambahkan teks lain.`;

    default:
      return "Bantu pengguna.";
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type } = body;

    if (!type) {
      return NextResponse.json({ error: "type required" }, { status: 400 });
    }

    const prompt = buildPrompt(body);

    // Tagline: return JSON, no stream
    if (type === "tagline") {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8,
      });
      const text = completion.choices[0].message.content ?? "[]";
      try {
        const options = JSON.parse(text);
        return NextResponse.json({ options });
      } catch {
        return NextResponse.json({ options: [] });
      }
    }

    // All other types: stream
    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.75,
      stream: true,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content ?? "";
          if (text) controller.enqueue(encoder.encode(text));
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err) {
    console.error("[ai-assist]", err);
    return NextResponse.json({ error: "AI error" }, { status: 500 });
  }
}
