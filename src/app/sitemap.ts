import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site.config";
import { getAllSlugs } from "@/lib/mdx";
import { concertArtists, projectCategories } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/contact", "/faqs", "/blog"].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }));

  const categoryRoutes = Object.keys(projectCategories).map((category) => ({
    url: `${siteConfig.url}/projects/${category}`,
    lastModified: new Date(),
  }));

  const artistRoutes = concertArtists.map((artist) => ({
    url: `${siteConfig.url}/projects/${artist.category}/${artist.slug}`,
    lastModified: new Date(),
  }));

  const postRoutes = getAllSlugs().map((slug) => ({
    url: `${siteConfig.url}/blog/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...categoryRoutes, ...artistRoutes, ...postRoutes];
}
