import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { chartEmbedUrl, chartPageUrl, site } from "@/lib/token";

function ChartPlaceholder() {
  return (
    <div className="relative h-[420px] overflow-hidden bg-[#090712] md:h-[560px]">
      <svg viewBox="0 0 800 360" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id="sj-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ff6b3d" />
            <stop offset="55%" stopColor="#e879f9" />
            <stop offset="100%" stopColor="#3dcdc4" />
          </linearGradient>
        </defs>
        {Array.from({ length: 6 }).map((_, index) => (
          <line
            key={`h-${index}`}
            x1="0"
            x2="800"
            y1={40 + index * 56}
            y2={40 + index * 56}
            stroke="rgba(255,255,255,0.06)"
          />
        ))}
        {Array.from({ length: 8 }).map((_, index) => (
          <line
            key={`v-${index}`}
            y1="0"
            y2="360"
            x1={index * 114}
            x2={index * 114}
            stroke="rgba(255,255,255,0.05)"
          />
        ))}
        <path
          d="M0 250 C 70 240, 110 180, 170 190 S 280 90, 360 120 S 470 40, 560 80 S 690 190, 800 70"
          fill="none"
          stroke="url(#sj-line)"
          strokeWidth="4"
          className="chart-line animate-dash"
        />
        <path
          d="M0 280 C 90 260, 150 220, 230 230 S 360 150, 470 170 S 640 120, 800 150"
          fill="none"
          stroke="rgba(61,205,196,0.35)"
          strokeWidth="2"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="max-w-sm rounded-3xl border border-white/10 bg-ink/80 px-6 py-5 text-center backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sunset">Pre-launch</p>
          <p className="mt-2 font-display text-2xl font-bold text-white">Pair warms up with the mint</p>
          <p className="mt-2 text-sm leading-relaxed text-white/70">
            DexScreener plugs in the moment $SJM has a contract. The tape is already stretching.
          </p>
        </div>
      </div>
    </div>
  );
}

export function Charts() {
  const embed = chartEmbedUrl(site.ca);
  const page = chartPageUrl(site.ca);

  return (
    <section id="charts" className="relative scroll-mt-24 px-4 py-20 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-10 h-56 w-72 -translate-x-1/2 rounded-full bg-teal/10 blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="The tape"
          title="Live Chart"
          subtitle="Price, market cap, and the usual beautiful chaos — wired to DexScreener on Solana."
        />

        <FadeIn className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
          {embed ? (
            <iframe
              title="Super Jane live chart on DexScreener"
              src={embed}
              className="h-[480px] w-full border-0 md:h-[640px]"
              loading="lazy"
              allow="clipboard-write"
            />
          ) : (
            <ChartPlaceholder />
          )}
        </FadeIn>

        {page ? (
          <p className="mt-4 text-center text-sm">
            <a
              href={page}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-teal underline-offset-4 hover:underline"
            >
              Open on DexScreener
            </a>
          </p>
        ) : null}
      </div>
    </section>
  );
}
