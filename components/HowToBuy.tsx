"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { GetSolButton, GetWalletButton, SwapButton } from "@/components/ui/Actions";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buySteps } from "@/lib/token";

export function HowToBuy() {
  const reduce = useReducedMotion();

  return (
    <section id="how-to-buy" className="relative scroll-mt-24 px-4 py-20 sm:py-28">
      <div className="pointer-events-none absolute right-0 top-24 h-64 w-64 rounded-full bg-sunset/10 blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="The ritual"
          title="How to buy"
          subtitle="Solana playbook. Phantom, SOL, then the swap."
        />

        <FadeIn className="mx-auto mt-8 max-w-3xl rounded-3xl border border-teal/30 bg-teal/10 px-5 py-4 text-center">
          <p className="font-display text-lg font-bold text-white">You’re on Solana.</p>
          <p className="mt-1 text-sm leading-relaxed text-white/80">
            Get the wallet. Get the gas. Swap SOL for $SJM on pump.fun.
          </p>
        </FadeIn>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {buySteps.map((step, index) => (
            <FadeIn key={step.n} delay={index * 0.05} className="h-full">
              <motion.article
                {...(reduce ? {} : { whileHover: { scale: 1.03 } })}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className="flex h-full flex-col rounded-3xl border border-white/10 bg-panel/80 p-5"
              >
                <span className="font-display text-4xl font-bold text-teal">{step.n}</span>
                <h3 className="mt-3 font-display text-xl font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{step.body}</p>
              </motion.article>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
          <GetWalletButton className="w-full sm:w-auto" />
          <GetSolButton className="w-full sm:w-auto" />
          <SwapButton className="w-full sm:w-auto" />
        </FadeIn>
      </div>
    </section>
  );
}
