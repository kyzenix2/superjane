"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, Copy, Wallet } from "lucide-react";
import { useState } from "react";
import { TelegramIcon, XIcon } from "@/components/ui/Icons";
import { useToast } from "@/components/ui/Toast";
import { cta, tap } from "@/components/ui/cta";
import { buyUrl, isLiveCa, site, socialUrl } from "@/lib/token";
import { cn } from "@/lib/utils";

async function copyText(value: string) {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    try {
      const input = document.createElement("textarea");
      input.value = value;
      input.setAttribute("readonly", "");
      input.style.position = "fixed";
      input.style.left = "-9999px";
      document.body.appendChild(input);
      input.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(input);
      return ok;
    } catch {
      return false;
    }
  }
}

type SolanaProvider = {
  isPhantom?: boolean;
  connect: () => Promise<unknown>;
  request?: (args: { method: string; params?: unknown }) => Promise<unknown>;
};

function getPhantom(): SolanaProvider | null {
  if (typeof window === "undefined") return null;
  const browser = window as Window & {
    solana?: SolanaProvider;
    phantom?: { solana?: SolanaProvider };
  };
  if (browser.phantom?.solana?.isPhantom) return browser.phantom.solana;
  if (browser.solana?.isPhantom) return browser.solana;
  return null;
}

function MotionLink({
  href,
  className,
  children,
  external = false,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.a
      href={href}
      {...(reduce ? {} : tap)}
      className={className}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </motion.a>
  );
}

export function BuyButton({ className, children = "Buy Now" }: { className?: string; children?: React.ReactNode }) {
  const url = buyUrl(site.ca);
  if (url) {
    return (
      <MotionLink href={url} external className={cta("primary", className)}>
        {children}
      </MotionLink>
    );
  }

  return (
    <MotionLink href="#how-to-buy" className={cta("primary", className)}>
      {children}
    </MotionLink>
  );
}

export function GetWalletButton({ className }: { className?: string }) {
  return (
    <MotionLink href="https://phantom.app/download" external className={cta("secondary", className)}>
      <Wallet className="h-4 w-4" aria-hidden />
      Get Wallet
    </MotionLink>
  );
}

export function GetSolButton({ className }: { className?: string }) {
  return (
    <MotionLink href="https://jup.ag/swap/USDC-SOL" external className={cta("secondary", className)}>
      Get SOL
    </MotionLink>
  );
}

export function SwapButton({ className }: { className?: string }) {
  const { toast } = useToast();
  const reduce = useReducedMotion();
  const url = buyUrl(site.ca);

  if (url) {
    return (
      <MotionLink href={url} external className={cta("primary", className)}>
        Swap on Dex
      </MotionLink>
    );
  }

  return (
    <motion.button
      type="button"
      {...(reduce ? {} : tap)}
      className={cta("primary", className)}
      onClick={() => toast("Swap on Dex arms when the mint is live. Suit up — the steps are ready.")}
    >
      Swap on Dex
    </motion.button>
  );
}

export function CopyButton({ className }: { className?: string }) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const live = isLiveCa(site.ca);

  async function onCopy() {
    if (!live) {
      toast("The mint is still suiting up. Copy wakes up when the CA is real.");
      return;
    }
    const ok = await copyText(site.ca.trim());
    if (!ok) {
      toast("Browser blocked the copy. Select the address and copy it manually.");
      return;
    }
    setCopied(true);
    toast("Contract copied. Paste it, don’t retype it.");
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={live ? "Copy contract address" : "Contract address coming soon"}
      className={cn(
        "inline-flex h-11 shrink-0 items-center gap-2 rounded-xl bg-teal px-3 text-sm font-bold text-ink transition hover:bg-teal-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
        className,
      )}
    >
      {copied ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
      <span>{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}

export function AddToWalletButton({ className }: { className?: string }) {
  const { toast } = useToast();
  const reduce = useReducedMotion();
  const [pending, setPending] = useState(false);

  async function onAdd() {
    if (!isLiveCa(site.ca)) {
      toast("Add to Wallet unlocks when the mint goes live.");
      return;
    }

    const provider = getPhantom();
    if (!provider) {
      window.open("https://phantom.app/download", "_blank", "noopener,noreferrer");
      toast("Install Phantom in this browser, then hit Add to Wallet again.");
      return;
    }

    setPending(true);
    try {
      await provider.connect();
      const mint = site.ca.trim();
      if (provider.request) {
        try {
          await provider.request({
            method: "wallet_watchAsset",
            params: { type: "SPL", options: { address: mint } },
          });
          toast("$SJM is pinned in Phantom.");
          return;
        } catch {
          const ok = await copyText(mint);
          toast(
            ok
              ? "Phantom is connected and the mint is copied. Pin $SJM from the token list."
              : "Phantom is connected. Copy the contract and pin $SJM from the token list.",
          );
          return;
        }
      }
      toast("Phantom is connected. Copy the contract and pin $SJM from the token list.");
    } catch {
      toast("Wallet connection closed. Add to Wallet is ready when you are.");
    } finally {
      setPending(false);
    }
  }

  return (
    <motion.button
      type="button"
      {...(reduce ? {} : tap)}
      onClick={onAdd}
      disabled={pending}
      className={cta("secondary", cn("disabled:opacity-70", className))}
    >
      <Wallet className="h-4 w-4" aria-hidden />
      {pending ? "Connecting" : "Add to Wallet"}
    </motion.button>
  );
}

export function SocialButton({
  network,
  className,
  children,
}: {
  network: "x" | "telegram";
  className?: string;
  children?: React.ReactNode;
}) {
  const { toast } = useToast();
  const reduce = useReducedMotion();
  const href = socialUrl(network);
  const label = children ?? (network === "x" ? "X" : "Telegram");
  const icon = network === "x" ? <XIcon /> : <TelegramIcon />;

  if (!href) {
    return (
      <motion.button
        type="button"
        {...(reduce ? {} : tap)}
        className={cta("secondary", className)}
        onClick={() => toast("Socials are still lacing the boots. The buttons go live with the links.")}
      >
        {icon}
        {label}
      </motion.button>
    );
  }

  return (
    <MotionLink href={href} external className={cta("secondary", className)}>
      {icon}
      {label}
    </MotionLink>
  );
}

export function SocialIconLink({ network }: { network: "x" | "telegram" }) {
  const { toast } = useToast();
  const href = socialUrl(network);
  const label = network === "x" ? "Super Jane on X" : "Super Jane on Telegram";
  const icon = network === "x" ? <XIcon /> : <TelegramIcon />;
  const className =
    "inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-teal/60 hover:bg-teal/10 hover:text-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal";

  if (!href) {
    return (
      <button type="button" aria-label={label} className={className} onClick={() => toast("That social link drops with the cape.")}>
        {icon}
      </button>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={className}>
      {icon}
    </a>
  );
}
