"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { SocialButton } from "@/components/ui/Actions";
import { TelegramIcon, XIcon } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { socialUrl } from "@/lib/token";

const cards = [
  {
    network: "x" as const,
    icon: XIcon,
    title: "X",
    kicker: "The chaos feed",
    body: "Main-character posts, chart yells, and the occasional cape check. This is where the timeline gets broken in public.",
  },
  {
    network: "telegram" as const,
    icon: TelegramIcon,
    title: "Telegram",
    kicker: "The war room",
    body: "Faster than the feed. Plans, raids, and the kind of noise that turns a meme into a crowd.",
  },
];

export function Community() {
  const reduce = useReducedMotion();

  return (
    <section id="community" className="relative scroll-mt-24 px-4 py-20 sm:py-28">
      <div className="pointer-events-none absolute left-0 top-20 h-64 w-64 rounded-full bg-magenta/10 blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="The army"
          title="Join the Army"
          subtitle="Capes on. Notifications on. Super Jane moves louder with a crowd behind the ribbon."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {cards.map((card, index) => {
            const Icon = card.icon;
            const live = Boolean(socialUrl(card.network));
            return (
              <FadeIn key={card.network} delay={index * 0.06}>
                <motion.article
                  {...(reduce ? {} : { whileHover: { scale: 1.02 } })}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                  className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-panel p-6 sm:p-8"
                >
                  <div className="pointer-events-none absolute -right-8 -top-10 h-36 w-36 rounded-full bg-teal/15 blur-3xl" />
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-teal">
                    <Icon className="h-7 w-7" />
                  </span>
                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-teal">{card.kicker}</p>
                  <h3 className="mt-2 font-display text-3xl font-bold text-white">{card.title}</h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75 sm:text-base">{card.body}</p>
                  <div className="mt-6 flex items-center gap-2 text-sm text-white/70">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-sunset" aria-hidden />
                    {live ? "Door’s open" : "Channel warming up"}
                  </div>
                  <div className="mt-6">
                    <SocialButton network={card.network} className="w-full sm:w-auto">
                      {card.network === "x" ? "Follow on X" : "Join Telegram"}
                    </SocialButton>
                  </div>
                </motion.article>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
