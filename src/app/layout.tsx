import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  INSTAGRAM_URL,
  SITE_URL,
  TIKTOK_URL,
  WA_TELEPHONE_E164,
} from "@/lib/constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: "/images/favicon.ico",
    shortcut: "/images/favicon.ico",
    apple: "/images/favicon.ico",
  },
  title: {
    default: "Gercep — Website Usaha Kamu Jadi Hari Ini",
    template: "%s | Gercep",
  },
  description:
    "Jasa bikin website cepat untuk UMKM Indonesia. Live bareng kamu, pakai AI, selesai dalam 1 jam. Tampil profesional tanpa ribet.",
  keywords: [
    "jasa website UMKM",
    "website cepat Indonesia",
    "bikin website 1 jam",
    "jasa website murah",
    "website UMKM profesional",
    "gercep website",
  ],
  authors: [{ name: "Gercep", url: SITE_URL }],
  creator: "Gercep",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_URL,
    siteName: "Gercep",
    title: "Gercep — Website Usaha Kamu Jadi Hari Ini",
    description: "Live bareng kamu. Pakai AI. Selesai dalam 1 jam.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gercep — Jasa Website Cepat untuk UMKM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gercep — Website Usaha Kamu Jadi Hari Ini",
    description: "Jasa website cepat untuk UMKM Indonesia.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: "REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_TOKEN",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Gercep",
  description: "Jasa bikin website cepat untuk UMKM Indonesia",
  url: SITE_URL,
  telephone: WA_TELEPHONE_E164,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tangerang Selatan",
    addressRegion: "Banten",
    addressCountry: "ID",
  },
  priceRange: "Rp750.000 - Rp5.000.000",
  openingHours: "Mo-Su 09:00-21:00",
  sameAs: [INSTAGRAM_URL, TIKTOK_URL],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${inter.className} bg-brand-dark text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
