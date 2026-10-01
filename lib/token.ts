/**
 * Super Jane site content.
 * Paste a real Solana mint into `ca`, and full https links into `x` / `telegram`.
 * The pump.fun buy link, DexScreener chart, and copy button stay inactive until `ca` is valid.
 */

export const site = {
  name: "Super Jane",
  ticker: "SJM",
  chain: "solana" as const,
  chainLabel: "Solana",
  ca: "7A6pgYtKkN75URKFyrStMBzkBYoceDk4Wo2Es1Ctpump",
  x: "https://x.com/SuperJane_sol",
  telegram: "https://t.me/SuperJane_sol",
  bio: "Super Jane isn’t here to follow the timeline—she’s here to break it, dominate the memes, and turn pure chaos into legendary vibes.",
  tagline: "Break the timeline. Dominate the memes.",
};

const WRAPPED_SOL = "So11111111111111111111111111111111111111112";
const BASE58 = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

export function isLiveCa(ca: string): boolean {
  return BASE58.test(ca.trim());
}

export function buyUrl(ca: string): string | null {
  const mint = ca.trim();
  if (!isLiveCa(mint)) return null;
  return `https://swap.pump.fun/?input=${WRAPPED_SOL}&output=${mint}`;
}

export function chartEmbedUrl(ca: string): string | null {
  const mint = ca.trim();
  if (!isLiveCa(mint)) return null;
  return `https://dexscreener.com/solana/${mint}?embed=1&theme=dark&trades=0&info=0`;
}

export function chartPageUrl(ca: string): string | null {
  const mint = ca.trim();
  if (!isLiveCa(mint)) return null;
  return `https://dexscreener.com/solana/${mint}`;
}

export function socialUrl(network: "x" | "telegram"): string | null {
  const value = (network === "x" ? site.x : site.telegram).trim();
  if (!value) return null;
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return null;
    return parsed.toString();
  } catch {
    return null;
  }
}

export const story = [
  site.bio,
  "The cape showed up before the whitepaper. Teal armor, ribbon on the chest, a skyline that already looks like a chart having a moment. Super Jane takes the main character slot and leaves the timeline louder than she found it.",
  "$SJM is the chant. Solana is the speed. The army is the whole point. If you like your memes dressed like a hero and your entries made on purpose, you’re in the right alley.",
];

export const highlights = [
  {
    icon: "zap",
    title: "Timeline Breaker",
    body: "The feed follows her. Capes outrun candles, and the group chat finds out last.",
  },
  {
    icon: "flame",
    title: "Meme Supremacy",
    body: "Jokes with a jawline. Memes with a mission. The bit is the brand.",
  },
  {
    icon: "users",
    title: "Community Army",
    body: "The group chat is the engine. Capes on, notifications on, no lone-wolf cosplay.",
  },
  {
    icon: "rocket",
    title: "Solana Native",
    body: "Built for the fast chain. In, out, and loud enough to rattle a skyline.",
  },
  {
    icon: "shield",
    title: "Mint Discipline",
    body: "When the contract drops, copy it from this site. Hands off random pastebins.",
  },
  {
    icon: "sparkles",
    title: "Legendary Vibes",
    body: "Pure chaos, pressed into something you’d actually wear on main.",
  },
] as const;

export const buySteps = [
  {
    n: "01",
    title: "Get a wallet",
    body: "Install Phantom on mobile or desktop. Create the wallet. Keep the recovery phrase offline, not in a cloud note titled crypto.",
  },
  {
    n: "02",
    title: "Get SOL",
    body: "Fund the wallet with SOL. Buy it inside Phantom, or swap USDC into SOL on Jupiter. Keep a little extra for the network fee.",
  },
  {
    n: "03",
    title: "Swap for $SJM",
    body: "Swap on Dex opens pump.fun with SOL in and Super Jane out. Use the copy button so you paste the mint instead of typing it.",
  },
  {
    n: "04",
    title: "Join the army",
    body: "X for the noise. Telegram for the plans. A meme this loud is a team sport.",
  },
] as const;
