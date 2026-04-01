type PortfolioItem = {
  name: string;
  category: string;
  description: string;
  url: string;
  screenshotUrl: string;
};

const portfolioItems: PortfolioItem[] = [
  {
    name: "Asialink Holidays",
    category: "Travel",
    description: "Company Profile — DMC Internasional dengan kantor di 3 negara",
    url: "https://asialink-holidays.com",
    screenshotUrl: "/images/portfolio/asialink-holidays.png",
  },
  {
    name: "Indomedia",
    category: "Media",
    description: "Company Profile — Portal media digital",
    url: "https://indomedia.co.id",
    screenshotUrl: "/images/portfolio/indomedia.png",
  },
  {
    name: "Jatik",
    category: "Defence",
    description: "Company Profile — Solusi defence, security, dan intelligence technologies",
    url: "https://jatik.id",
    screenshotUrl: "/images/portfolio/jatik.png",
  },
];

function PortfolioCard({
  name,
  category,
  description,
  url,
  screenshotUrl,
}: PortfolioItem) {
  const shouldShowImage = Boolean(screenshotUrl);

  return (
    <div className="rounded-xl border border-white/10 bg-brand-card overflow-hidden hover:shadow-md hover:shadow-brand-turquoise/10 transition-shadow duration-200">
      {shouldShowImage ? (
        <div className="aspect-video overflow-hidden bg-brand-dark">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={screenshotUrl}
            alt={`Screenshot website ${name}`}
            width={1440}
            height={900}
            loading="lazy"
            className="w-full h-full object-cover object-top"
          />
        </div>
      ) : (
        <div className="aspect-video bg-gradient-to-br from-brand-card to-brand-dark flex items-center justify-center">
          <span className="text-brand-muted text-sm font-medium">{name}</span>
        </div>
      )}

      <div className="p-4">
        <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-full bg-brand-turquoise/10 text-brand-turquoise mb-2">
          {category}
        </span>
        <h3 className="font-bold text-base text-white">{name}</h3>
        <p className="text-sm text-brand-muted mt-1 mb-3">{description}</p>
        {url !== "#" && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-brand-turquoise hover:underline inline-flex items-center gap-1"
          >
            Lihat website →
          </a>
        )}
      </div>
    </div>
  );
}

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="py-16 md:py-24 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10 md:mb-14">
          <p className="text-sm font-medium text-brand-turquoise uppercase tracking-widest mb-2">
            Hasil Nyata
          </p>
          <h2 className="text-4xl font-black leading-tight text-white">
            Ini beberapa klien yang sudah jalan bareng kami.
          </h2>
          <p className="text-brand-muted mt-2 text-base">
            Dibangun langsung bersama klien, selesai dalam waktu singkat.
          </p>
        </div>

        <div
          className={`grid grid-cols-1 gap-6 ${
            portfolioItems.length === 2
              ? "md:grid-cols-2 max-w-4xl mx-auto"
              : "md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {portfolioItems.map((item) => (
            <PortfolioCard key={item.name} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
