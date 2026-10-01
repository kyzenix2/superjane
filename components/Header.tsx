"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BuyButton } from "@/components/ui/Actions";
import { MascotMark } from "@/components/ui/MascotMark";
import { site } from "@/lib/token";
import { cn } from "@/lib/utils";

const links = [
  { href: "#about", label: "About" },
  { href: "#how-to-buy", label: "How to Buy" },
  { href: "#community", label: "Community" },
  { href: "#charts", label: "Chart" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open ? "border-b border-white/10 bg-ink/85 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <a href="#top" className="flex min-w-0 items-center gap-2">
          <MascotMark className="h-10 w-10 shrink-0" />
          <span className="truncate font-display text-base font-bold tracking-tight sm:text-lg">{site.name}</span>
          <span className="hidden rounded-full border border-teal/40 bg-teal/10 px-2 py-0.5 text-[11px] font-bold tracking-wide text-teal sm:inline">
            ${site.ticker}
          </span>
        </a>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/75 transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <BuyButton className="h-10 px-4 text-xs sm:h-11 sm:px-5 sm:text-sm">
            <span className="sm:hidden">Buy</span>
            <span className="hidden sm:inline">Buy Now</span>
          </BuyButton>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-white/10 px-4 py-3 md:hidden" aria-label="Mobile">
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block rounded-xl px-3 py-3 text-base font-medium text-white/90 hover:bg-white/5"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
