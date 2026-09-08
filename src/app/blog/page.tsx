import Link from "next/link";
import type { Metadata } from "next";

import { PixelHeading } from "@/components/pixel-heading";
import { buildMetadata } from "@/lib/seo";
import { getAllPosts } from "@/lib/mdx";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description: "Notes from the pit, the road, and the studio.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <PixelHeading as="h1" mode="multi" autoPlay className="mb-10 text-4xl sm:text-6xl">
        BLOG
      </PixelHeading>

      <div className="flex flex-col divide-y divide-border/60">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group py-8">
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-signal">
              {new Date(post.frontmatter.date).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}{" "}
              · {post.readingTime}
            </p>
            <h2 className="mb-2 text-2xl font-bold group-hover:text-signal">{post.frontmatter.title}</h2>
            <p className="text-sm text-muted-foreground">{post.frontmatter.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
