"use client";

import { useState, useRef, useCallback, Suspense, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ChevronLeft, Loader2, X, Upload, Sparkles } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  nama: string;
  whatsapp: string;
  email: string;
  namaUsaha: string;
  jenisUsaha: string;
  deskripsi: string;
  keunggulan: string;
  fotoUrls: string[];
  logoUrl: string;
  warnaMood: string;
  tagline: string;
  referensiUrl: string;
  catatan: string;
  paket: string;
}


/** Kategori jenis usaha UMKM di Indonesia (diperluas; pilih yang paling dekat atau "Lainnya") */
const JENIS_USAHA = [
  "Agen perjalanan & tiket",
  "Agen properti",
  "Akuntansi, pembukuan & pajak",
  "Arsitek & desain interior",
  "Audio, lighting & rental event",
  "Automotif & sparepart",
  "Bahan bangunan & material",
  "Barbershop & pangkas rambut",
  "Bengkel mobil",
  "Bengkel motor",
  "Bimbingan belajar, kursus & bimbel",
  "Biotech, lab & riset kecil",
  "Boga, katering & frozen food",
  "Bordir, sablon & konveksi kecil",
  "Budidaya ikan, udang & tambak",
  "Budidaya tanaman & hidroponik",
  "Cafe, restoran & rumah makan",
  "Cleaning service & pest control",
  "Co-working & sewa ruang",
  "Content creator & influencer",
  "Creative agency & branding",
  "CV / firma jasa umum",
  "Digital marketing, SEO & iklan online",
  "Distributor & grosir",
  "Dropshipper & reseller online",
  "E-commerce & online shop",
  "Elektronik, gadget & aksesoris",
  "Energi & kelistrikan (solar, genset, dll.)",
  "Event organizer & wedding organizer",
  "Export, import & trading umum",
  "Farmasi, apotek & alat kesehatan",
  "Fashion, tekstil & garment",
  "Film, foto, video & drone",
  "Fitness, gym & fasilitas olahraga",
  "Furniture, mebel & kayu olahan",
  "Herbal, jamu & suplemen",
  "Homestay, hotel & penginapan",
  "IT consultant, software & SaaS",
  "Jasa angkutan, ekspedisi & logistik",
  "Jasa hukum, notaris & legal",
  "Jasa konsultan bisnis & manajemen",
  "Jasa konsultan SDM & rekrutmen",
  "Jasa penerjemah & interpreter",
  "Jasa pengurusan dokumen & visa",
  "Jasa security & satpam",
  "Jasa titip, kurir lokal & POS",
  "Kafe, kedai kopi & minuman",
  "Kerajinan, souvenir & handmade",
  "Kesehatan: klinik, dokter & praktik",
  "Klinik kecantikan, aesthetic & spa",
  "Koperasi, BUMDes & ekonomi desa",
  "Kosmetik & skincare",
  "Kriya, seni & kerajinan tradisional",
  "Kuliner jajanan & street food",
  "Laundry & dry clean",
  "Leasing, multifinance & kredit",
  "Mainan, hobi & koleksi",
  "Manufaktur ringan & home industry",
  "Maritime, perikanan & pengolahan hasil laut",
  "Media, penerbitan & percetakan",
  "Minuman (kopi, teh, jus, dll.)",
  "Musik, studio rekaman & hiburan",
  "Olahraga, rental alat & wasit",
  "Otomotif aksesoris & modifikasi",
  "Pariwisata, travel & biro wisata",
  "Pecel lele, seafood & warung ikan",
  "Pendidikan non-formal & pelatihan vokasi",
  "Percetakan, packaging & label",
  "Perdagangan besar & niaga",
  "Perdagangan eceran & toko kelontong",
  "Perhiasan, emas & aksesoris",
  "Pertambangan, quarry & mineral",
  "Pertanian, perkebunan & kehutanan",
  "Peternakan, unggas & dairy",
  "Printing 3D & prototipe",
  "Properti: developer, kontraktor & renovasi",
  "Rekreasi, taman wisata & edukasi",
  "Ritel modern, minimarket & franchise",
  "Salon wanita, nail art & treatment",
  "Seni pertunjukan, tari & budaya",
  "Sparepart industri & suku cadang",
  "Startup & produk digital",
  "Studio musik, podcast & siaran",
  "Supplier bahan baku & kemasan",
  "Teknik listrik, AC & mekanikal",
  "Teknik sipil, surveyor & geodesi",
  "Telekomunikasi & internet provider",
  "Tenun, batik, wastra & fashion tradisional",
  "Toko bangunan & material",
  "Transportasi online (ojek, taksi, rental)",
  "UKM produk lokal & oleh-oleh daerah",
  "Warung kopi, angkringan & kedai",
  "Wholesale, importir & agen tunggal",
  "Yoga, wellness & holistic health",
  "Lainnya",
].sort((a, b) => {
  // "Lainnya" selalu di akhir
  if (a === "Lainnya") return 1;
  if (b === "Lainnya") return -1;
  return a.localeCompare(b, "id");
});

const MOOD_OPTIONS = [
  { id: "hangat", label: "Hangat & Ramah", emoji: "🟠", colors: ["#F97316", "#92400E", "#FEF3C7"] },
  { id: "profesional", label: "Profesional & Bersih", emoji: "⚪", colors: ["#111827", "#6B7280", "#F9FAFB"] },
  { id: "berani", label: "Berani & Energik", emoji: "🔴", colors: ["#DC2626", "#EA580C", "#FEF08A"] },
  { id: "elegan", label: "Elegan & Mewah", emoji: "⚫", colors: ["#18181B", "#3F3F46", "#CA8A04"] },
  { id: "segar", label: "Segar & Natural", emoji: "🟢", colors: ["#16A34A", "#84CC16", "#F5F0E8"] },
];

type PaketFeature = string | { title: string; subtext: string };

const PAKET_OPTIONS = [
  {
    id: "xdeal",
    badge: "Paling Terjangkau",
    badgeClass: "text-green-700 bg-green-100",
    name: "XDeal",
    price: "Rp 750.000",
    duration: "1 Jam Live Session",
    features: ["1 landing page", "3 scroll sections", "Mobile-ready", "Deploy live hari ini", "Tombol CTA ke WhatsApp"] as PaketFeature[],
    featured: false,
  },
  {
    id: "xquick",
    badge: "Cepat & Hemat",
    badgeClass: "text-gray-600 bg-gray-100",
    name: "XQuick",
    price: "Rp 1.500.000",
    duration: "3 Hari Pengerjaan",
    features: ["3–4 halaman website", "Mobile-ready", "SEO basic", "Meta tags lengkap", "Pendampingan setup domain"] as PaketFeature[],
    featured: false,
  },
  {
    id: "xpress",
    badge: "🔥 Terlaris",
    badgeClass: "bg-green-600 text-white font-bold",
    name: "Xpress",
    price: "Rp 3.000.000",
    duration: "Selesai 1 Hari",
    features: ["4–5 halaman website", "Mobile-ready", "Copywriting dibantu AI", "Setup custom domain", "SEO on-page lengkap"] as PaketFeature[],
    featured: true,
  },
  {
    id: "xpriority",
    badge: "Premium",
    badgeClass: "text-gray-500 bg-gray-100",
    name: "Xpriority",
    price: "Rp 5.000.000",
    duration: "1 Jam Live Premium",
    features: [
      "4–5 halaman website",
      "Mobile-ready",
      "Revisi real-time saat sesi",
      {
        title: "AI discoverability setup",
        subtext:
          "Bisnis kamu dioptimasi agar muncul saat orang cari lewat ChatGPT, Perplexity, atau Google AI Overview — bukan cuma SEO biasa.",
      },
      "Priority booking slot",
    ] as PaketFeature[],
    featured: false,
  },
];

// ─── Subcomponents ─────────────────────────────────────────────────────────────

function AIButton({
  onClick,
  loading,
  label,
  disabled,
}: {
  onClick: () => void;
  loading: boolean;
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading || disabled}
      className="mt-2 inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed text-amber-900 font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
    >
      {loading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
      {loading ? "Sedang diproses…" : label}
    </button>
  );
}

function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between text-xs text-brand-muted mb-2">
        <span>Step {step} dari {total}</span>
        <span>{Math.round((step / total) * 100)}%</span>
      </div>
      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-brand-turquoise rounded-full transition-all duration-500"
          style={{ width: `${(step / total) * 100}%` }}
        />
      </div>
    </div>
  );
}

function FormLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm font-semibold text-brand-muted mb-1.5">
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}

function Input({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full border border-white/15 bg-brand-dark/60 rounded-xl px-4 py-3 text-white placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-turquoise focus:border-transparent transition text-base ${props.className ?? ""}`}
    />
  );
}

function Textarea({ maxLength, value, onChange, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { maxLength?: number }) {
  const len = typeof value === "string" ? value.length : 0;
  return (
    <div>
      <textarea
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        {...props}
        className="w-full border border-white/15 bg-brand-dark/60 rounded-xl px-4 py-3 text-white placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-turquoise focus:border-transparent transition resize-none text-base"
      />
      {maxLength && (
        <p className="text-xs text-brand-muted text-right mt-1">{len}/{maxLength}</p>
      )}
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

function OnboardingInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPaket = searchParams.get("paket") ?? "";

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [animating, setAnimating] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [aiLoading, setAiLoading] = useState<Record<string, boolean>>({});
  const [taglineOptions, setTaglineOptions] = useState<string[]>([]);
  const [customColorInput, setCustomColorInput] = useState("");
  const [customColors, setCustomColors] = useState<string[]>([]);

  // fotoSlots: per-foto state untuk upload on-pick
  const [fotoSlots, setFotoSlots] = useState<
    Array<{ blobUrl: string; cloudUrl: string; loading: boolean }>
  >([]);
  const [fotoError, setFotoError] = useState("");
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [logoCloudUrl, setLogoCloudUrl] = useState("");
  const [logoLoading, setLogoLoading] = useState(false);
  const [logoError, setLogoError] = useState("");

  const fotoInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<FormData>({
    nama: "",
    whatsapp: "",
    email: "",
    namaUsaha: "",
    jenisUsaha: "",
    deskripsi: "",
    keunggulan: "",
    fotoUrls: [],
    logoUrl: "",
    warnaMood: "",
    tagline: "",
    referensiUrl: "",
    catatan: "",
    paket: initialPaket,
  });
  const [jenisUsahaQuery, setJenisUsahaQuery] = useState("");

  const set = (key: keyof FormData, val: string | string[]) => {
    setFormData((prev) => ({ ...prev, [key]: val }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const filteredJenisUsaha = useMemo(() => {
    const q = jenisUsahaQuery.trim().toLowerCase();
    if (!q) return JENIS_USAHA.slice(0, 12);
    return JENIS_USAHA.filter((j) => j.toLowerCase().includes(q)).slice(0, 12);
  }, [jenisUsahaQuery]);

  // ── Navigation ──────────────────────────────────────────────────────────────

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (step === 1) {
      if (!formData.nama.trim()) e.nama = "Nama wajib diisi";
      if (!formData.whatsapp.trim()) e.whatsapp = "Nomor WhatsApp wajib diisi";
      if (!formData.email.trim()) e.email = "Email wajib diisi";
    }
    if (step === 2) {
      if (!formData.namaUsaha.trim()) e.namaUsaha = "Nama usaha wajib diisi";
      if (!formData.jenisUsaha) e.jenisUsaha = "Pilih jenis usaha";
    }
    if (step === 3 && !formData.deskripsi.trim()) e.deskripsi = "Deskripsi wajib diisi";
    if (step === 4 && !formData.keunggulan.trim()) e.keunggulan = "Keunggulan wajib diisi";
    if (step === 7) {
      if (!formData.warnaMood) e.warnaMood = "Pilih mood warna";
      if (formData.warnaMood === "custom:" && customColors.length === 0) {
        e.warnaMood = "Tambahkan minimal 1 warna untuk opsi custom";
      }
    }
    if (step === 10 && !formData.paket) e.paket = "Pilih paket terlebih dahulu";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const goNext = () => {
    if (!validate()) return;
    setDirection("forward");
    setAnimating(true);
    setTimeout(() => {
      setStep((s) => s + 1);
      setAnimating(false);
    }, 220);
  };

  const syncCustomMood = (next: string[]) => {
    setCustomColors(next);
    set("warnaMood", next.length > 0 ? `custom: ${next.join(", ")}` : "custom:");
  };

  const addCustomColor = () => {
    const color = customColorInput.trim();
    if (!color || customColors.length >= 3 || customColors.includes(color)) return;
    syncCustomMood([...customColors, color]);
    setCustomColorInput("");
  };

  const formatColorLabel = (value: string) =>
    value.replace(/\b\w/g, (char) => char.toUpperCase());

  const removeCustomColor = (idx: number) => {
    const next = customColors.filter((_, i) => i !== idx);
    syncCustomMood(next);
  };

  const goBack = () => {
    setDirection("backward");
    setAnimating(true);
    setTimeout(() => {
      setStep((s) => s - 1);
      setAnimating(false);
    }, 220);
  };

  // ── Upload helper ───────────────────────────────────────────────────────────

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload-image", { method: "POST", body: fd });
    const data = await res.json();
    if (!data.success || !data.url) {
      throw new Error(data.error ?? "Upload gagal");
    }
    return data.url as string;
  };

  // ── AI Assist ───────────────────────────────────────────────────────────────

  const callAI = useCallback(
    async (type: string, targetKey: keyof FormData) => {
      setAiLoading((prev) => ({ ...prev, [type]: true }));
      try {
        const res = await fetch("/api/ai-assist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type,
            namaUsaha: formData.namaUsaha,
            jenisUsaha: formData.jenisUsaha,
            deskripsi: formData.deskripsi,
            keunggulan: formData.keunggulan,
          }),
        });

        if (!res.ok) throw new Error("AI error");

        if (type === "tagline") {
          const data = await res.json();
          setTaglineOptions(data.options ?? []);
        } else {
          const reader = res.body!.getReader();
          const decoder = new TextDecoder();
          let result = "";
          set(targetKey, "");
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            result += decoder.decode(value, { stream: true });
            set(targetKey, result);
          }
        }
      } catch {
        // silently fail
      } finally {
        setAiLoading((prev) => ({ ...prev, [type]: false }));
      }
    },
    [formData]
  );

  // ── File Uploads ─────────────────────────────────────────────────────────────

  const handleFotoChange = async (files: FileList | null) => {
    if (!files) return;
    const remaining = 3 - fotoSlots.length;
    if (remaining <= 0) return;
    const valid = Array.from(files)
      .filter((f) => f.type.startsWith("image/") && f.size <= 2 * 1024 * 1024)
      .slice(0, remaining);
    if (!valid.length) return;

    setFotoError("");

    for (const file of valid) {
      const blobUrl = URL.createObjectURL(file);
      setFotoSlots((prev) => [...prev, { blobUrl, cloudUrl: "", loading: true }]);
      try {
        const cloudUrl = await uploadToCloudinary(file);
        setFotoSlots((prev) =>
          prev.map((s) => (s.blobUrl === blobUrl ? { ...s, cloudUrl, loading: false } : s))
        );
      } catch (err) {
        setFotoSlots((prev) => prev.filter((s) => s.blobUrl !== blobUrl));
        setFotoError(err instanceof Error ? err.message : "Upload foto gagal");
      }
    }
  };

  const removeFoto = (i: number) => {
    setFotoSlots((prev) => prev.filter((_, idx) => idx !== i));
  };

  const handleLogoChange = async (file: File | null) => {
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setLogoError("Logo terlalu besar, maksimal 2MB");
      return;
    }
    setLogoError("");
    setLogoLoading(true);
    setLogoPreview(URL.createObjectURL(file));
    try {
      const url = await uploadToCloudinary(file);
      setLogoCloudUrl(url);
      setLogoPreview(url);
    } catch (err) {
      setLogoError(err instanceof Error ? err.message : "Upload logo gagal");
      setLogoPreview("");
    } finally {
      setLogoLoading(false);
    }
  };

  // ── Submit ───────────────────────────────────────────────────────────────────

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const uploadedFotos = fotoSlots.map((s) => s.cloudUrl);
      const payload = {
        ...formData,
        fotoProduk1: uploadedFotos[0] ?? "",
        fotoProduk2: uploadedFotos[1] ?? "",
        fotoProduk3: uploadedFotos[2] ?? "",
        logoUrl: logoCloudUrl,
        produk: "",
      };
      const res = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error ?? "Gagal mengirim form");
      // Store summary for thank you page
      sessionStorage.setItem(
        "gercep_onboarding",
        JSON.stringify({
          orderNo: data.orderNo ?? "",
          nama: formData.nama,
          whatsapp: formData.whatsapp,
          email: formData.email,
          paket: formData.paket,
        })
      );
      router.push("/onboarding/terima-kasih");
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Terjadi kesalahan, coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Drag & Drop ──────────────────────────────────────────────────────────────

  const onDragOver = (e: React.DragEvent) => { e.preventDefault(); };
  const onDropFoto = (e: React.DragEvent) => {
    e.preventDefault();
    handleFotoChange(e.dataTransfer.files);
  };
  const onDropLogo = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0] ?? null;
    handleLogoChange(file);
  };

  // ── Slide classes ─────────────────────────────────────────────────────────────

  const slideClass = animating
    ? direction === "forward"
      ? "opacity-0 translate-x-8"
      : "opacity-0 -translate-x-8"
    : "opacity-100 translate-x-0";

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <main className="min-h-screen bg-brand-dark flex flex-col items-center py-10 px-4">
      {/* Logo */}
      <Link href="/" className="flex items-center mb-8">
        <span className="font-black text-2xl tracking-tight text-white">GERCEP</span>
        <span className="w-2 h-2 rounded-full bg-brand-turquoise inline-block ml-1 mb-3" />
      </Link>
      <Link
        href="/"
        className="text-brand-muted hover:text-brand-turquoise text-sm underline underline-offset-4 transition-colors mb-6"
      >
        ← Kembali ke beranda
      </Link>

      <div className="w-full max-w-xl">
        <ProgressBar step={step} total={10} />

        {/* Form Card */}
        <div
          className={`bg-brand-darker rounded-2xl shadow-xl border border-white/10 p-8 transition-all duration-200 [&_.text-gray-900]:text-white [&_.text-gray-800]:text-white [&_.text-gray-700]:text-brand-muted [&_.text-gray-600]:text-brand-muted [&_.text-gray-500]:text-brand-muted [&_.text-gray-400]:text-brand-muted ${slideClass}`}
        >
          {/* ── Step 1 ── */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-1">Halo! Kenalan dulu yuk 👋</h2>
              <p className="text-gray-500 text-sm mb-6">Kami butuh data ini untuk konfirmasi jadwal sesi.</p>
              <div className="space-y-4">
                <div>
                  <FormLabel required>Nama lengkap</FormLabel>
                  <Input
                    type="text"
                    placeholder="Contoh: Budi Santoso"
                    value={formData.nama}
                    onChange={(e) => set("nama", e.target.value)}
                  />
                  {errors.nama && <p className="text-red-500 text-xs mt-1">{errors.nama}</p>}
                </div>
                <div>
                  <FormLabel required>Nomor WhatsApp</FormLabel>
                  <Input
                    type="tel"
                    placeholder="08xxxxxxxxxx"
                    value={formData.whatsapp}
                    onChange={(e) => set("whatsapp", e.target.value)}
                  />
                  {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>}
                </div>
                <div>
                  <FormLabel required>Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="contoh@email.com"
                    value={formData.email}
                    onChange={(e) => set("email", e.target.value)}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>
            </div>
          )}

          {/* ── Step 2 ── */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-1">Cerita soal usaha kamu</h2>
              <p className="text-gray-500 text-sm mb-6">Info dasar yang kami butuhkan untuk bikin website kamu.</p>
              <div className="space-y-4">
                <div>
                  <FormLabel required>Nama usaha</FormLabel>
                  <Input
                    type="text"
                    placeholder="Contoh: Warung Makan Bu Sari"
                    value={formData.namaUsaha}
                    onChange={(e) => set("namaUsaha", e.target.value)}
                  />
                  {errors.namaUsaha && <p className="text-red-500 text-xs mt-1">{errors.namaUsaha}</p>}
                </div>
                <div>
                  <FormLabel required>Jenis usaha</FormLabel>
                  <Input
                    type="text"
                    placeholder="Cari jenis usaha (contoh: travel, restoran, bengkel)..."
                    value={jenisUsahaQuery}
                    onChange={(e) => {
                      setJenisUsahaQuery(e.target.value);
                      set("jenisUsaha", "");
                    }}
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Pilih salah satu hasil agar jenis usaha sesuai kategori Indonesia.
                  </p>
                  <div className="mt-2 border border-white/15 rounded-xl p-2 max-h-44 overflow-y-auto bg-brand-dark/60 [scrollbar-width:thin] [scrollbar-color:#12d197_transparent] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-brand-turquoise [&::-webkit-scrollbar-thumb]:rounded-full">
                    {filteredJenisUsaha.length === 0 ? (
                      <p className="text-sm text-brand-muted px-2 py-1">Tidak ada hasil. Coba kata kunci lain.</p>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {filteredJenisUsaha.map((j) => (
                          <button
                            key={j}
                            type="button"
                            onClick={() => {
                              set("jenisUsaha", j);
                              setJenisUsahaQuery(j);
                            }}
                            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                              formData.jenisUsaha === j
                                ? "bg-brand-turquoise/15 border-brand-turquoise text-white"
                                : "bg-transparent border-white/15 text-brand-muted hover:border-brand-turquoise/60 hover:text-white"
                            }`}
                          >
                            {j}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.jenisUsaha && <p className="text-red-500 text-xs mt-1">{errors.jenisUsaha}</p>}
                </div>
              </div>
            </div>
          )}

          {/* ── Step 3 ── */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-1">Deskripsi bisnis kamu</h2>
              <p className="text-gray-500 text-sm mb-6">Ceritain usaha kamu dalam 2–3 kalimat. Atau biar AI yang bantu!</p>
              <Textarea
                placeholder="Kami adalah warung makan yang menyajikan masakan Padang autentik di Bekasi…"
                value={formData.deskripsi}
                onChange={(e) => set("deskripsi", e.target.value)}
                maxLength={500}
                rows={5}
              />
              {errors.deskripsi && <p className="text-red-500 text-xs mt-1">{errors.deskripsi}</p>}
              <AIButton
                onClick={() => callAI("deskripsi", "deskripsi")}
                loading={!!aiLoading.deskripsi}
                disabled={!formData.namaUsaha || !formData.jenisUsaha}
                label="✨ Bantu Tulis dengan AI"
              />
            </div>
          )}

          {/* ── Step 4 — Keunggulan (was step 5) ── */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-1">Keunggulan bisnis kamu</h2>
              <p className="text-gray-500 text-sm mb-6">Apa yang bikin usaha kamu beda dari yang lain?</p>
              <Textarea
                placeholder="Bahan segar setiap hari, pelayanan ramah, harga terjangkau…"
                value={formData.keunggulan}
                onChange={(e) => set("keunggulan", e.target.value)}
                maxLength={400}
                rows={5}
              />
              {errors.keunggulan && <p className="text-red-500 text-xs mt-1">{errors.keunggulan}</p>}
              <AIButton
                onClick={() => callAI("keunggulan", "keunggulan")}
                loading={!!aiLoading.keunggulan}
                disabled={!formData.namaUsaha || !formData.deskripsi}
                label="✨ Bantu Tulis Keunggulan"
              />
            </div>
          )}

          {/* ── Step 5 — Foto (was step 6) ── */}
          {step === 5 && (
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-1">Foto produk / suasana</h2>
              <p className="text-gray-500 text-sm mb-6">Upload sampai 3 foto (jpg/png/webp, maks 2MB/foto). Opsional.</p>
              <div
                onDragOver={onDragOver}
                onDrop={onDropFoto}
                onClick={() => fotoInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 hover:border-green-500 rounded-xl p-6 text-center cursor-pointer transition-colors group"
              >
                <Upload className="mx-auto mb-2 text-gray-400 group-hover:text-green-600 transition-colors" size={28} />
                <p className="text-sm text-gray-500">Drag & drop atau <span className="text-green-600 font-semibold">klik untuk pilih</span></p>
                <p className="text-xs text-gray-400 mt-1">Maks 3 foto · JPG/PNG/WebP · 2MB per file</p>
              </div>
              <input ref={fotoInputRef} type="file" accept="image/jpeg,image/png,image/webp" multiple className="hidden" onChange={(e) => handleFotoChange(e.target.files)} />
              {fotoSlots.length > 0 && (
                <div className="flex gap-3 mt-4 flex-wrap">
                  {fotoSlots.map((slot, i) => (
                    <div key={slot.blobUrl} className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={slot.blobUrl} alt="" className="w-full h-full object-cover" />
                      {slot.loading && (
                        <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                          <Loader2 size={16} className="animate-spin text-green-600" />
                        </div>
                      )}
                      {!slot.loading && (
                        <button type="button" onClick={() => removeFoto(i)} className="absolute top-1 right-1 bg-white/80 rounded-full p-0.5 hover:bg-white">
                          <X size={12} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {fotoError && <p className="text-red-500 text-xs mt-2">{fotoError}</p>}
            </div>
          )}

          {/* ── Step 6 — Logo (was step 7) ── */}
          {step === 6 && (
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-1">Upload logo</h2>
              <p className="text-gray-500 text-sm mb-6">Satu file logo usaha kamu (jpg/png/svg, maks 1MB). Opsional.</p>
              <div
                onDragOver={onDragOver}
                onDrop={onDropLogo}
                onClick={() => logoInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 hover:border-green-500 rounded-xl p-6 text-center cursor-pointer transition-colors group"
              >
                <Upload className="mx-auto mb-2 text-gray-400 group-hover:text-green-600 transition-colors" size={28} />
                <p className="text-sm text-gray-500">Drag & drop atau <span className="text-green-600 font-semibold">klik untuk pilih</span></p>
                <p className="text-xs text-gray-400 mt-1">JPG / PNG / SVG · Maks 1MB</p>
              </div>
              <input ref={logoInputRef} type="file" accept="image/jpeg,image/png,image/svg+xml" className="hidden" onChange={(e) => handleLogoChange(e.target.files?.[0] ?? null)} />
              {logoPreview && (
                <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-gray-200 mt-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={logoPreview} alt="Logo preview" className="w-full h-full object-contain p-2" />
                  {logoLoading && (
                    <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                      <Loader2 size={18} className="animate-spin text-green-600" />
                    </div>
                  )}
                  {!logoLoading && (
                    <button type="button" onClick={() => { setLogoPreview(""); setLogoCloudUrl(""); setLogoError(""); }} className="absolute top-1 right-1 bg-white/80 rounded-full p-0.5 hover:bg-white"><X size={12} /></button>
                  )}
                </div>
              )}
              {logoError && <p className="text-red-500 text-xs mt-2">{logoError}</p>}
            </div>
          )}

          {/* ── Step 7 — Mood (was step 8) ── */}
          {step === 7 && (
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-1">Mood & warna website</h2>
              <p className="text-gray-500 text-sm mb-6">Pilih nuansa visual yang paling cocok dengan usaha kamu.</p>
              <div className="grid grid-cols-1 gap-3">
                {MOOD_OPTIONS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => set("warnaMood", m.id)}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                      formData.warnaMood === m.id
                        ? "border-brand-turquoise shadow-[0_0_0_3px_rgba(18,209,151,0.16)]"
                        : "border-gray-200 hover:border-green-300"
                    }`}
                  >
                    <div className="flex gap-1.5 flex-shrink-0">
                      {m.colors.map((c, i) => (
                        <span key={i} className="w-5 h-5 rounded-full border border-white shadow-sm" style={{ background: c }} />
                      ))}
                    </div>
                    <div className="flex-1">
                      <span className="font-semibold text-gray-800">{m.emoji} {m.label}</span>
                    </div>
                    {formData.warnaMood === m.id && (
                      <CheckCircle2 size={18} className="text-green-600 flex-shrink-0" />
                    )}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    if (!formData.warnaMood.startsWith("custom:")) {
                      set("warnaMood", customColors.length > 0 ? `custom: ${customColors.join(", ")}` : "custom:");
                    }
                  }}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                    formData.warnaMood.startsWith("custom:")
                      ? "border-brand-turquoise shadow-[0_0_0_3px_rgba(18,209,151,0.16)]"
                      : "border-gray-200 hover:border-green-300"
                  }`}
                >
                  <div className="flex gap-1.5 flex-shrink-0">
                    {(customColors.length > 0 ? customColors : ["#22C55E", "#0EA5E9", "#F59E0B"]).slice(0, 3).map((c, i) => (
                      <span key={i} className="w-5 h-5 rounded-full border border-white shadow-sm" style={{ background: c }} />
                    ))}
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-800">🎨 Custom (pilih warna sendiri)</span>
                  </div>
                  {formData.warnaMood.startsWith("custom:") && (
                    <CheckCircle2 size={18} className="text-green-600 flex-shrink-0" />
                  )}
                </button>
              </div>
              {formData.warnaMood.startsWith("custom:") && (
                <div className="mt-4 rounded-xl border-2 border-gray-200 p-4 space-y-3">
                  <p className="text-sm text-white">
                    Tambahkan maksimal 3 warna (boleh kode hex atau nama warna).
                  </p>
                  <div className="flex flex-col gap-2">
                    <Input
                      type="text"
                      placeholder="Contoh: #FFFFFF atau white"
                      value={customColorInput}
                      onChange={(e) => setCustomColorInput(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={addCustomColor}
                      disabled={!customColorInput.trim() || customColors.length >= 3}
                      className="w-full px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Tambah warna
                    </button>
                  </div>
                  <p className="text-xs text-white">
                    Belum tahu kodenya? Cek di{" "}
                    <a
                      href="https://htmlcolorcodes.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-brand-turquoise underline underline-offset-2"
                    >
                      color picker
                    </a>
                    .
                  </p>
                  {customColors.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {customColors.map((color, i) => (
                        <div key={`${color}-${i}`} className="inline-flex items-center gap-2 rounded-full border border-green-300 bg-transparent px-3 py-1.5 text-sm">
                          <span className="w-4 h-4 rounded-full border border-gray-200" style={{ background: color }} />
                          <span style={{ color: "#FFFFFF" }}>
                            {formatColorLabel(color)}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeCustomColor(i)}
                            className="text-gray-400 hover:text-red-500"
                            aria-label={`Hapus warna ${color}`}
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {errors.warnaMood && <p className="text-red-500 text-xs mt-2">{errors.warnaMood}</p>}
            </div>
          )}

          {/* ── Step 8 — Tagline (was step 9) ── */}
          {step === 8 && (
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-1">Tagline bisnis</h2>
              <p className="text-gray-500 text-sm mb-6">Kalimat singkat yang merepresentasikan usaha kamu. Opsional.</p>
              <Input
                type="text"
                placeholder="Contoh: Lezat, Segar, Terjangkau"
                maxLength={80}
                value={formData.tagline}
                onChange={(e) => set("tagline", e.target.value)}
              />
              <p className="text-xs text-gray-400 text-right mt-1">{formData.tagline.length}/80</p>
              <AIButton
                onClick={() => callAI("tagline", "tagline")}
                loading={!!aiLoading.tagline}
                disabled={!formData.namaUsaha || !formData.jenisUsaha}
                label="✨ Generate 3 Opsi Tagline"
              />
              {taglineOptions.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs text-gray-400 mb-2">Klik salah satu untuk memakai tagline tersebut:</p>
                  <div className="flex flex-wrap gap-2">
                    {taglineOptions.map((t, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => { set("tagline", t); setTaglineOptions([]); }}
                        className="text-sm bg-amber-50 border border-amber-300 text-amber-800 px-3 py-1.5 rounded-full hover:bg-amber-100 transition-colors"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Step 9 — Referensi (was step 10) ── */}
          {step === 9 && (
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-1">Referensi & catatan</h2>
              <p className="text-gray-500 text-sm mb-6">Ada website yang kamu suka stylenya? Atau ada catatan khusus? Opsional.</p>
              <div className="space-y-4">
                <div>
                  <FormLabel>URL referensi website</FormLabel>
                  <Input
                    type="url"
                    placeholder="https://contoh.com"
                    value={formData.referensiUrl}
                    onChange={(e) => set("referensiUrl", e.target.value)}
                  />
                </div>
                <div>
                  <FormLabel>Catatan tambahan untuk tim</FormLabel>
                  <Textarea
                    placeholder="Contoh: Tolong pakai warna yang tidak terlalu mencolok…"
                    value={formData.catatan}
                    onChange={(e) => set("catatan", e.target.value)}
                    maxLength={300}
                    rows={4}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ── Step 10 — Paket (was step 11) ── */}
          {step === 10 && (
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-1">Pilih paket kamu</h2>
              <p className="text-gray-500 text-sm mb-6">Semua paket sudah termasuk mobile-ready dan deploy hari itu juga.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                {PAKET_OPTIONS.map((p) => {
                  const selected = formData.paket === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => set("paket", p.id)}
                      className={`text-left rounded-2xl border-2 p-5 transition-all flex flex-col bg-gray-900 text-white ${
                        selected
                          ? "border-brand-turquoise shadow-[0_0_0_3px_rgba(18,209,151,0.16)]"
                          : "border-green-500 hover:border-brand-turquoise/80"
                      }`}
                    >
                      <span className={`text-xs rounded-full px-2.5 py-0.5 w-fit mb-3 ${p.badgeClass}`}>{p.badge}</span>
                      <p className="text-2xl font-black mb-0.5 text-white">{p.price}</p>
                      <p className="text-xs mb-4 text-gray-400">{p.duration}</p>
                      <ul className="flex flex-col gap-1.5 flex-1">
                        {p.features.map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs">
                            <CheckCircle2 size={13} className="flex-shrink-0 mt-0.5 text-green-400" />
                            <div>
                              <span className="text-gray-300">
                                {typeof f === "string" ? f : f.title}
                              </span>
                              {typeof f !== "string" && (
                                <p className="text-gray-400 text-[11px] mt-1 leading-relaxed">
                                  {f.subtext}
                                </p>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                      {selected && (
                        <div className="mt-3 flex items-center gap-1.5 text-green-400 text-xs font-semibold">
                          <CheckCircle2 size={14} /> Dipilih
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
              {errors.paket && <p className="text-red-500 text-xs mt-1">{errors.paket}</p>}
            </div>
          )}

          {/* ── Navigation Buttons ── */}
          <div className={`flex mt-8 ${step > 1 ? "justify-between" : "justify-end"}`}>
            {step > 1 && (
              <button
                type="button"
                onClick={goBack}
                className="flex items-center gap-2 text-brand-muted hover:text-white font-medium text-sm transition-colors"
              >
                <ChevronLeft size={16} /> Kembali
              </button>
            )}

            <div className="flex items-center gap-3">
              {/* Skip buttons for optional steps */}
              {(step === 5 || step === 6 || step === 9) && (
                <button type="button" onClick={goNext} className="text-brand-muted hover:text-brand-turquoise text-sm underline underline-offset-4 transition-colors">
                  {step === 5 && "Lewati, upload nanti"}
                  {step === 6 && "Belum punya logo, skip dulu"}
                  {step === 9 && "Skip"}
                </button>
              )}

              {step < 10 ? (
                <button
                  type="button"
                  onClick={goNext}
                  disabled={fotoSlots.some((s) => s.loading) || logoLoading}
                  className="bg-brand-turquoise hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-brand-dark font-bold px-6 py-3 rounded-xl transition-colors text-sm"
                >
                  {(fotoSlots.some((s) => s.loading) || logoLoading) ? <Loader2 size={16} className="animate-spin inline" /> : "Lanjut →"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex items-center gap-2 bg-brand-turquoise hover:opacity-90 disabled:opacity-60 text-brand-dark font-bold px-6 py-3 rounded-xl transition-colors text-sm"
                >
                  {submitting && <Loader2 size={16} className="animate-spin" />}
                  {submitting ? "Mengirim…" : "Kirim Brief Sekarang →"}
                </button>
              )}
            </div>
          </div>

          {submitError && (
            <p className="text-red-500 text-sm mt-3 text-center">{submitError}</p>
          )}
        </div>

        {/* Footer note */}
        <p className="text-center text-brand-muted text-xs mt-6">
          Data kamu aman dan hanya digunakan untuk keperluan pembuatan website. 🔒
        </p>
      </div>
    </main>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-brand-dark flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-brand-turquoise border-t-transparent rounded-full animate-spin" />
      </main>
    }>
      <OnboardingInner />
    </Suspense>
  );
}
