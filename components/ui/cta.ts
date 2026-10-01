import { cn } from "@/lib/utils";

const base =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-bold tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-ink";

export function cta(variant: "primary" | "secondary", className?: string) {
  return cn(
    base,
    variant === "primary"
      ? "bg-teal text-ink shadow-glow"
      : "border border-white/15 bg-white/5 text-white",
    className,
  );
}

export const tap = {
  whileHover: { scale: 1.04 },
  whileTap: { scale: 0.98 },
  transition: { type: "spring" as const, stiffness: 420, damping: 24 },
};
