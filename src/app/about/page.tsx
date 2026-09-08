import type { Metadata } from "next";

import { PixelHeading } from "@/components/pixel-heading";
import { TextAnimate } from "@/components/text-animate";
import { SmartImage } from "@/components/smart-image";
import { buildMetadata } from "@/lib/seo";
import { aboutPortrait } from "@/lib/projects";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description: "Who's behind Rznish Studio and how the practice works.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <section className="mx-auto grid max-w-5xl gap-10 px-6 py-16 sm:grid-cols-[1.1fr_0.9fr] sm:items-center">
      <div>
        <PixelHeading as="h1" mode="multi" autoPlay className="mb-8 text-4xl sm:text-6xl">
          ABOUT
        </PixelHeading>
        <TextAnimate
          text="Rznish Studio shoots concerts, travel, and studio work out of India. No pitch decks, mostly cold DMs and a simple ask that worked."
          type="slideUp"
          by="word"
          className="text-lg text-muted-foreground"
        />
      </div>
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted">
        <SmartImage
          src={aboutPortrait}
          alt="Behind the camera at a shoot"
          fill
          sizes="(min-width: 640px) 40vw, 100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
