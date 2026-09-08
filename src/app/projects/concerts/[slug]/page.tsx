import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { PixelHeading } from "@/components/pixel-heading";
import { MediaGallery } from "@/components/media-gallery";
import { SmartImage } from "@/components/smart-image";
import { buildMetadata } from "@/lib/seo";
import { concertArtists } from "@/lib/projects";

export function generateStaticParams() {
  return concertArtists.map((artist) => ({ slug: artist.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const artist = concertArtists.find((a) => a.slug === params.slug);
  if (!artist) return buildMetadata({ title: "Not found", path: `/projects/concerts/${params.slug}` });

  return buildMetadata({
    title: artist.title,
    description: `Concert photography from ${artist.title}, shot by Rznish Studio.`,
    path: `/projects/concerts/${artist.slug}`,
    image: artist.cover,
    type: "article",
  });
}

export default function ConcertDetailPage({ params }: { params: { slug: string } }) {
  const artist = concertArtists.find((a) => a.slug === params.slug);
  if (!artist) notFound();

  return (
    <article>
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted sm:aspect-[16/7]">
        <SmartImage
          src={artist.cover}
          alt={artist.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      <div className="bg-signal px-6 py-10 text-black sm:px-12">
        <div className="mx-auto max-w-5xl">
          <PixelHeading as="h1" mode="wave" autoPlay className="mb-4 text-3xl sm:text-5xl">
            {artist.title.toUpperCase()}
          </PixelHeading>
          <p className="max-w-2xl text-sm leading-relaxed sm:text-base">
            shot by rajnish singh | canon 1500d | canon 18-55mm lens + 55-250mm lens
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-12">
        <MediaGallery items={artist.gallery} />
      </div>
    </article>
  );
}
