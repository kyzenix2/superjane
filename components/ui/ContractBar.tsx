"use client";

import { CopyButton } from "@/components/ui/Actions";
import { isLiveCa, site } from "@/lib/token";
import { cn } from "@/lib/utils";

export function ContractBar({ className, compact = false }: { className?: string; compact?: boolean }) {
  const live = isLiveCa(site.ca);
  const address = site.ca.trim();

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-2xl border border-white/10 bg-black/50 p-2 pl-4 backdrop-blur-md",
        className,
      )}
    >
      <div className="min-w-0 flex-1 text-left">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal">Contract</p>
        <p
          className={cn("font-mono text-sm text-white", live && !compact ? "break-all" : "truncate")}
          title={live ? address : undefined}
        >
          {live ? address : "Suiting up — CA drops soon"}
        </p>
      </div>
      <CopyButton />
    </div>
  );
}
