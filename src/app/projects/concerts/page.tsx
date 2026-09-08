import type { Metadata } from "next";

import { PixelHeading } from "@/components/pixel-heading";
import { ProjectCard } from "@/components/project-card";
import { buildMetadata } from "@/lib/seo";
import { concertArtists, projectCategories } from "@/lib/projects";

export const metadata: Metadata = buildMetadata({
  title: projectCategories.concerts.title,
  description: projectCategories.concerts.description,
  path: "/projects/concerts",
});

export default function ConcertsPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <PixelHeading as="h1" mode="multi" autoPlay className="mb-3 text-4xl sm:text-6xl">
        PROJECTS
      </PixelHeading>
      <p className="mb-10 max-w-xl text-muted-foreground">{projectCategories.concerts.description}</p>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {concertArtists.map((artist) => (
          <ProjectCard key={artist.slug} item={artist} />
        ))}
      </div>
    </section>
  );
}
