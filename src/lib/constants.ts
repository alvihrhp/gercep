function stripEnvQuotes(s: string | undefined): string | undefined {
  if (!s) return undefined;
  const t = s.trim();
  if (
    (t.startsWith('"') && t.endsWith('"')) ||
    (t.startsWith("'") && t.endsWith("'"))
  ) {
    return t.slice(1, -1).trim();
  }
  return t;
}

const rawSite =
  stripEnvQuotes(process.env.NEXT_PUBLIC_APP_URL) ||
  stripEnvQuotes(process.env.NEXT_PUBLIC_SITE_URL) ||
  "https://gercep.id";

/** Origin situs (tanpa trailing slash) — pakai di metadata, OG, canonical */
export const SITE_URL = rawSite.replace(/\/+$/, "");

export const SITE_HOSTNAME = (() => {
  try {
    return new URL(SITE_URL).hostname;
  } catch {
    return "gercep.id";
  }
})();

const digitsWa =
  stripEnvQuotes(process.env.NEXT_PUBLIC_WA_NUMBER)?.replace(/\D/g, "") ||
  "6287888887740";

export const WA_NUMBER = digitsWa;

export const WA_MESSAGE =
  stripEnvQuotes(process.env.NEXT_PUBLIC_WA_MESSAGE) ||
  "Halo Gercep! Saya mau bikin website untuk usaha saya.";

export const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;

/** Link wa.me dengan teks custom (mis. setelah submit brief) */
export function waUrlWithText(text: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

/** Untuk schema.org / tel: — asumsi nomor sudah format negara tanpa + */
export const WA_TELEPHONE_E164 = `+${WA_NUMBER}`;

export const INSTAGRAM_URL =
  stripEnvQuotes(process.env.NEXT_PUBLIC_INSTAGRAM_URL) ||
  "https://instagram.com/gercep.id";

export const TIKTOK_URL =
  stripEnvQuotes(process.env.NEXT_PUBLIC_TIKTOK_URL) ||
  "https://tiktok.com/@gercep.id";

export const ONBOARDING_URL = "/onboarding";
export const getOnboardingURL = (paket?: string) =>
  paket ? `/onboarding?paket=${paket}` : "/onboarding";
