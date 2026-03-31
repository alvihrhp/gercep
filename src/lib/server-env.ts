/**
 * Normalisasi nilai dari .env (kutip, spasi, \n literal) untuk kredensial server.
 */

import { createPrivateKey } from "crypto";

export function stripEnvQuotes(value: string | undefined): string {
  if (!value) return "";
  let s = value.trim();
  if (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  ) {
    s = s.slice(1, -1);
  }
  return s.trim();
}

/** GOOGLE_PRIVATE_KEY dari .env: kutip luar + \\n literal → newline nyata */
export function normalizeGooglePrivateKey(raw: string | undefined): string {
  if (!raw) return "";
  let key = stripEnvQuotes(raw);
  key = key.replace(/^\uFEFF/, "");
  key = key.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  key = key.replace(/\\n/g, "\n");
  return key.trim();
}

export type GoogleServiceAccountCreds = {
  clientEmail: string;
  privateKey: string;
};

/**
 * Prefer: seluruh file JSON service account (paling aman, tanpa rusak PEM).
 *
 * Opsi A — `GOOGLE_SERVICE_ACCOUNT_B64`: isi base64 dari file JSON (satu baris).
 *   Terminal: `base64 -i credentials.json | tr -d '\n'`
 *
 * Opsi B — `GOOGLE_SERVICE_ACCOUNT_JSON`: satu baris JSON (stringify file).
 *
 * Opsi C — `GOOGLE_CLIENT_EMAIL` + `GOOGLE_PRIVATE_KEY` (PEM dengan \\n antar baris).
 */
export function getGoogleServiceAccountCredentials(): GoogleServiceAccountCreds {
  const b64 = stripEnvQuotes(process.env.GOOGLE_SERVICE_ACCOUNT_B64);
  if (b64) {
    let json: string;
    try {
      json = Buffer.from(b64, "base64").toString("utf8");
    } catch {
      throw new Error("GOOGLE_SERVICE_ACCOUNT_B64 bukan base64 valid");
    }
    const o = JSON.parse(json) as { client_email?: string; private_key?: string };
    if (!o.client_email || !o.private_key) {
      throw new Error("Isi B64 bukan service account JSON (butuh client_email & private_key)");
    }
    tryCreatePrivateKeyOrThrow(o.private_key, "B64/JSON");
    return { clientEmail: o.client_email, privateKey: o.private_key };
  }

  const jsonLine = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (jsonLine?.trim()) {
    const cleaned = stripEnvQuotes(jsonLine.trim());
    let o: { client_email?: string; private_key?: string };
    try {
      o = JSON.parse(cleaned) as { client_email?: string; private_key?: string };
    } catch {
      throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON bukan JSON valid (cek kutip/escape)");
    }
    if (!o.client_email || !o.private_key) {
      throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON tidak berisi client_email / private_key");
    }
    tryCreatePrivateKeyOrThrow(o.private_key, "JSON");
    return { clientEmail: o.client_email, privateKey: o.private_key };
  }

  const clientEmail = stripEnvQuotes(process.env.GOOGLE_CLIENT_EMAIL);
  const privateKey = normalizeGooglePrivateKey(process.env.GOOGLE_PRIVATE_KEY);

  if (!clientEmail || !privateKey) {
    throw new Error(
      "Google Sheets: set GOOGLE_SERVICE_ACCOUNT_B64 (disarankan) atau GOOGLE_CLIENT_EMAIL + GOOGLE_PRIVATE_KEY"
    );
  }
  if (!privateKey.includes("BEGIN") || !privateKey.includes("PRIVATE KEY")) {
    throw new Error(
      "GOOGLE_PRIVATE_KEY harus berisi PEM lengkap (-----BEGIN ... PRIVATE KEY-----)"
    );
  }
  tryCreatePrivateKeyOrThrow(privateKey, "PEM .env");
  return { clientEmail, privateKey };
}

function tryCreatePrivateKeyOrThrow(pem: string, source: string): void {
  try {
    createPrivateKey(pem);
  } catch {
    throw new Error(
      `Private key tidak valid bagi OpenSSL (${source}). Gunakan GOOGLE_SERVICE_ACCOUNT_B64: ` +
        `base64 -i credentials.json | tr -d '\\n' lalu paste ke .env sebagai satu baris.`
    );
  }
}

export function normalizeCloudinaryConfig() {
  return {
    cloud_name: stripEnvQuotes(process.env.CLOUDINARY_CLOUD_NAME),
    api_key: stripEnvQuotes(process.env.CLOUDINARY_API_KEY),
    api_secret: stripEnvQuotes(process.env.CLOUDINARY_API_SECRET),
  };
}
