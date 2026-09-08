import type { Metadata } from "next";

import { PixelHeading } from "@/components/pixel-heading";
import { MediaGallery } from "@/components/media-gallery";
import { buildMetadata } from "@/lib/seo";
import { projectCategories, studioShoots } from "@/lib/projects";

export const metadata: Metadata = buildMetadata({
  title: projectCategories.studio.title,
  description: projectCategories.studio.description,
  path: "/projects/studio",
});

export default function StudioPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <PixelHeading as="h1" mode="multi" autoPlay className="mb-3 text-4xl sm:text-6xl">
        LIFESTYLE
      </PixelHeading>
      <p className="mb-10 max-w-xl text-muted-foreground">{projectCategories.studio.description}</p>
      <MediaGallery items={studioShoots} />
    </section>
  );
}
