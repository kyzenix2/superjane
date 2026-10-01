"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { BuyButton, SocialButton } from "@/components/ui/Actions";
import { ContractBar } from "@/components/ui/ContractBar";
import { MascotMark } from "@/components/ui/MascotMark";
import { isLiveCa, site } from "@/lib/token";

const ticker =
  "SUPER JANE   ·   $SJM   ·   BREAK THE TIMELINE   ·   DOMINATE THE MEMES   ·   LEGENDARY VIBES   ·   ";

function FloatingMascot() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 420], [0, 28]);

  return (
    <motion.div style={reduce ? undefined : { y }} className="relative mx-auto h-28 w-44 sm:h-36 sm:w-56">
      <div className="absolute inset-6 -z-10 rounded-full bg-teal/40 blur-3xl" />
      <div className={reduce ? "relative h-full w-full" : "relative h-full w-full animate-floaty"}>
        <MascotMark className="h-full w-full" alt="Super Jane" priority />
      </div>
    </motion.div>
  );
}

export function Hero() {
  const live = isLiveCa(site.ca);

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="relative h-[210px] w-full overflow-hidden sm:h-[280px] lg:h-[340px]">
        <Image
          src="/banner.jpg"
          alt="Super Jane above a neon skyline at sunset"
          fill
          priority
          sizes="100vw"
          className="animate-drift object-cover object-[center_42%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-ink" />
      </div>

      <div className="relative z-10 mx-auto -mt-14 max-w-3xl px-4 pb-10 text-center sm:-mt-16">
        <div className="pointer-events-none absolute inset-x-0 top-16 -z-10 h-72 bg-grid" />
        <FloatingMascot />

        <h1 className="mt-2 text-balance font-display text-5xl font-bold tracking-tight text-white sm:text-7xl">
          SUPER JANE
        </h1>

        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm backdrop-blur">
          <span className="font-display font-bold text-teal">${site.ticker}</span>
          <span className="text-white/30" aria-hidden>
            /
          </span>
          <span className="font-medium text-white/85">{site.chainLabel}</span>
        </div>

        <p className="mx-auto mt-5 max-w-xl text-pretty font-display text-xl font-medium leading-snug text-white sm:text-2xl">
          {site.tagline}
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-pretty text-base leading-relaxed text-white/75 sm:text-lg">
          Turn pure chaos into legendary vibes.
        </p>

        <ContractBar className="mx-auto mt-6 max-w-xl" compact />

        <p className="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-white/60">
          {live
            ? "Buy opens pump.fun with SOL in and $SJM out."
            : "Buy arms the second the mint is live. The ritual below is ready."}
        </p>

        <div className="mx-auto mt-5 flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:justify-center">
          <BuyButton className="w-full sm:min-w-[180px] sm:flex-1" />
          <SocialButton network="x" className="w-full sm:w-auto">
            X
          </SocialButton>
          <SocialButton network="telegram" className="w-full sm:w-auto">
            Telegram
          </SocialButton>
        </div>

        <p className="mt-4 inline-flex items-center justify-center gap-2 text-xs font-medium tracking-wide text-white/50">
          <span>{site.chainLabel}</span>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-teal" aria-hidden />
            {live ? "Live" : "Suiting up"}
          </span>
        </p>
      </div>

      <div className="overflow-hidden border-y border-teal/20 bg-teal/10" aria-hidden="true">
        <div className="flex w-max animate-marquee motion-reduce:animate-none">
          {[0, 1].map((copy) => (
            <p
              key={copy}
              className="whitespace-nowrap py-3 pr-8 font-display text-xs font-semibold tracking-[0.28em] text-teal-bright"
            >
              {ticker.repeat(4)}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
