"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { siteConfig } from "@/lib/site.config";
import { PixelHeading } from "@/components/pixel-heading";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="shrink-0">
          <PixelHeading as="h2" mode="wave" autoPlay cycleInterval={220} staggerDelay={60} className="text-lg sm:text-xl">
            {siteConfig.name.toUpperCase()}
          </PixelHeading>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold uppercase tracking-wide text-foreground/80 transition-colors hover:text-signal"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <button
          className="text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open ? (
        <nav className="flex flex-col gap-6 border-t border-border/60 bg-background px-6 py-8 md:hidden">
          {siteConfig.nav.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="text-2xl font-bold uppercase tracking-wide text-foreground">
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
