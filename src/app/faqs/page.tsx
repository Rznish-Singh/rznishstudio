import type { Metadata } from "next";

import { PixelHeading } from "@/components/pixel-heading";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "FAQs",
  description: "Common questions about booking and licensing Rznish Studio's work.",
  path: "/faqs",
});

const faqs = [
  {
    q: "Do you offer talent management?",
    a: "No — Rznish Studio is a photography practice, not a talent-management arm.",
  },
  {
    q: "Can I license a photo for press?",
    a: "Yes, reach out via the contact page with the artist/event and intended use.",
  },
  {
    q: "Do you travel for shoots?",
    a: "Regularly — see 404 Travels for recent on-location work.",
  },
];

export default function FaqsPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <PixelHeading as="h1" mode="random" autoPlay className="mb-10 text-4xl sm:text-6xl">
        FAQs
      </PixelHeading>
      <div className="flex flex-col divide-y divide-border/60">
        {faqs.map((item) => (
          <div key={item.q} className="py-6">
            <h2 className="mb-2 text-lg font-bold">{item.q}</h2>
            <p className="text-muted-foreground">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
