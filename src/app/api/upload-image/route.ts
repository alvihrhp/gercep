import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { normalizeCloudinaryConfig, stripEnvQuotes } from "@/lib/server-env";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "Tidak ada file" },
        { status: 400 }
      );
    }
    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "File terlalu besar, maksimal 2MB" },
        { status: 400 }
      );
    }
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { success: false, error: "Hanya file gambar yang diizinkan" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const unsignedPreset = stripEnvQuotes(
      process.env.CLOUDINARY_UNSIGNED_UPLOAD_PRESET
    );

    if (unsignedPreset) {
      const { cloud_name } = normalizeCloudinaryConfig();
      if (!cloud_name) {
        return NextResponse.json(
          {
            success: false,
            error: "CLOUDINARY_CLOUD_NAME wajib untuk upload unsigned",
          },
          { status: 500 }
        );
      }
      cloudinary.config({ cloud_name });
      const result = await new Promise<{ secure_url: string }>(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                upload_preset: unsignedPreset,
                folder: "gercep-clients",
                resource_type: "image",
                transformation: [{ quality: "auto", fetch_format: "auto" }],
              },
              (error, res) => {
                if (error || !res) reject(error);
                else resolve(res as { secure_url: string });
              }
            )
            .end(buffer);
        }
      );
      return NextResponse.json({ success: true, url: result.secure_url });
    }

    const cfg = normalizeCloudinaryConfig();
    if (!cfg.cloud_name || !cfg.api_key || !cfg.api_secret) {
      console.error("[upload-image] Cloudinary env tidak lengkap");
      return NextResponse.json(
        {
          success: false,
          error:
            "Upload gagal: isi CLOUDINARY_CLOUD_NAME, API_KEY, API_SECRET (atau pakai CLOUDINARY_UNSIGNED_UPLOAD_PRESET)",
        },
        { status: 500 }
      );
    }

    cloudinary.config(cfg);

    const result = await new Promise<{ secure_url: string }>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "gercep-clients",
              resource_type: "image",
              transformation: [{ quality: "auto", fetch_format: "auto" }],
            },
            (error, res) => {
              if (error || !res) reject(error);
              else resolve(res as { secure_url: string });
            }
          )
          .end(buffer);
      }
    );

    return NextResponse.json({ success: true, url: result.secure_url });
  } catch (err: unknown) {
    const msg =
      err && typeof err === "object" && "message" in err
        ? String((err as { message: string }).message)
        : "Upload failed";
    console.error("[upload-image]", err);
    if (msg.includes("Invalid Signature") || msg.includes("401")) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Cloudinary: signature tidak valid. Cek CLOUDINARY_API_SECRET (tanpa spasi/kutip salah). Atau buat Unsigned upload preset di dashboard Cloudinary dan set CLOUDINARY_UNSIGNED_UPLOAD_PRESET.",
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Upload failed" },
      { status: 500 }
    );
  }
}
