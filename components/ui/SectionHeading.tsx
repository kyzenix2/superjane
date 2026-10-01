"use client";

import { FadeIn } from "@/components/ui/FadeIn";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
};

export function SectionHeading({ eyebrow, title, subtitle }: SectionHeadingProps) {
  return (
    <FadeIn className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal">{eyebrow}</p>
      <h2 className="mt-3 text-balance font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-pretty text-base leading-relaxed text-white/75 sm:text-lg">{subtitle}</p>
      ) : null}
    </FadeIn>
  );
}
