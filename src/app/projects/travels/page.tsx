import type { Metadata } from "next";

import { PixelHeading } from "@/components/pixel-heading";
import { MediaGallery } from "@/components/media-gallery";
import { buildMetadata } from "@/lib/seo";
import { projectCategories, travelShoots } from "@/lib/projects";

export const metadata: Metadata = buildMetadata({
  title: projectCategories.travels.title,
  description: projectCategories.travels.description,
  path: "/projects/travels",
});

export default function TravelsPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <PixelHeading as="h1" mode="wave" autoPlay className="mb-3 text-4xl sm:text-6xl">
        NATURE
      </PixelHeading>
      <p className="mb-10 max-w-xl text-muted-foreground">{projectCategories.travels.description}</p>
      <MediaGallery items={travelShoots} />
    </section>
  );
}
