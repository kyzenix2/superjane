import { ContractBar } from "@/components/ui/ContractBar";
import { SocialIconLink } from "@/components/ui/Actions";
import { MascotMark } from "@/components/ui/MascotMark";
import { site } from "@/lib/token";

const links = [
  { href: "#about", label: "About" },
  { href: "#how-to-buy", label: "How to Buy" },
  { href: "#community", label: "Community" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 px-4 py-14">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
        <div>
          <a href="#top" className="inline-flex items-center gap-3">
            <MascotMark className="h-12 w-12" alt="" />
            <span className="font-display text-xl font-bold">{site.name}</span>
          </a>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/70">{site.tagline}</p>
        </div>

        <nav aria-label="Footer">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal">Quick links</p>
          <ul className="mt-3 space-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-white/80 transition hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal">Socials</p>
          <div className="mt-3 flex gap-2">
            <SocialIconLink network="x" />
            <SocialIconLink network="telegram" />
          </div>
          <ContractBar className="mt-5" />
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl border-t border-white/10 pt-6 text-sm text-white/70">
        <p>This is a meme coin. Not financial advice. DYOR.</p>
        <p className="mt-2">
          © {year} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
