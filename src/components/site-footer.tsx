import Link from "next/link";

import { siteConfig } from "@/lib/site.config";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-12 sm:grid-cols-3 md:grid-cols-6">
        {siteConfig.footerNav.map((item) => (
          <Link key={item.title} href={item.href} className="text-sm font-bold uppercase tracking-wide text-foreground underline underline-offset-4 hover:text-signal">
            {item.title}
          </Link>
        ))}
      </div>
      <div className="border-t border-border/60 px-6 py-4 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
        © {new Date().getFullYear()} · rznish studio · {siteConfig.tagline}
      </div>
    </footer>
  );
}
