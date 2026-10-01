"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Flame, Rocket, Shield, Sparkles, Users, Zap } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { highlights, story } from "@/lib/token";

const icons = {
  zap: Zap,
  flame: Flame,
  users: Users,
  rocket: Rocket,
  shield: Shield,
  sparkles: Sparkles,
};

export function About() {
  const reduce = useReducedMotion();

  return (
    <section id="about" className="relative scroll-mt-24 px-4 py-20 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-72 -translate-x-1/2 rounded-full bg-teal/10 blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="The lore"
          title="Chaos, caped."
          subtitle="A teal hero for a chain that already moves like a meme."
        />

        <div className="mx-auto mt-10 max-w-3xl space-y-5 text-center">
          {story.map((paragraph, index) => (
            <FadeIn key={paragraph.slice(0, 16)} delay={index * 0.05}>
              <p
                className={
                  index === 0
                    ? "text-pretty font-display text-2xl font-medium leading-snug text-white sm:text-3xl"
                    : "text-pretty text-base leading-relaxed text-white/75 sm:text-lg"
                }
              >
                {paragraph}
              </p>
            </FadeIn>
          ))}
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item, index) => {
            const Icon = icons[item.icon];
            return (
              <FadeIn key={item.title} delay={index * 0.04}>
                <motion.article
                  {...(reduce ? {} : { whileHover: { scale: 1.03 } })}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                  className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-teal/40 hover:bg-teal/[0.06]"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-teal/15 text-teal">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">{item.body}</p>
                </motion.article>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
