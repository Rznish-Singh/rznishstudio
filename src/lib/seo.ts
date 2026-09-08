import type { Metadata } from "next";
import { siteConfig } from "./site.config";

type BuildMetadataInput = {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
};

export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  image = siteConfig.ogImage,
  type = "website",
}: BuildMetadataInput): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  const fullTitle = path === "/" ? siteConfig.name : `${title} — ${siteConfig.name}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      type,
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
