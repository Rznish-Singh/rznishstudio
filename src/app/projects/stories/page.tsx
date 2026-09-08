import Link from "next/link";
import type { Metadata } from "next";

import { PixelHeading } from "@/components/pixel-heading";
import { buildMetadata } from "@/lib/seo";
import { projectCategories } from "@/lib/projects";
import { getAllPosts } from "@/lib/mdx";

export const metadata: Metadata = buildMetadata({
  title: projectCategories.stories.title,
  description: projectCategories.stories.description,
  path: "/projects/stories",
});

export default function StoriesPage() {
  const posts = getAllPosts();

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <PixelHeading as="h1" mode="random" autoPlay className="mb-3 text-4xl sm:text-6xl">
         STORIES
      </PixelHeading>
      <p className="mb-10 max-w-xl text-muted-foreground">{projectCategories.stories.description}</p>

      <div className="flex flex-col divide-y divide-border/60">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group py-8">
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-signal">
              {new Date(post.frontmatter.date).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
            <h2 className="mb-2 text-2xl font-bold group-hover:text-signal">{post.frontmatter.title}</h2>
            <p className="text-sm text-muted-foreground">{post.frontmatter.description}</p>
          </Link>
        ))}
        {posts.length === 0 ? (
          <p className="py-8 text-muted-foreground">No stories published yet — check back soon.</p>
        ) : null}
      </div>
    </section>
  );
}
