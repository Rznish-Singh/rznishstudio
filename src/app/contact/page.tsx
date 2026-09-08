import type { Metadata } from "next";

import { PixelHeading } from "@/components/pixel-heading";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Book a shoot or say hello.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <PixelHeading as="h1" mode="wave" autoPlay className="mb-8 text-4xl sm:text-6xl">
        CONTACT
      </PixelHeading>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name"
          className="rounded-md border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-signal"
        />
        <input
          type="email"
          placeholder="Email"
          className="rounded-md border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-signal"
        />
        <textarea
          placeholder="Tell us about the shoot"
          rows={5}
          className="rounded-md border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-signal"
        />
        <Button type="submit" className="self-start">
          Send
        </Button>
      </form>
    </section>
  );
}
