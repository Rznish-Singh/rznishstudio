import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { PixelHeading } from "@/components/pixel-heading";
import { MdxContent } from "@/components/mdx-content";
import { buildMetadata } from "@/lib/seo";
import { getAllSlugs, getPostBySlug } from "@/lib/mdx";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  try {
    const post = getPostBySlug(params.slug);
    return buildMetadata({
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      path: `/blog/${post.slug}`,
      image: post.frontmatter.cover,
      type: "article",
    });
  } catch {
    return buildMetadata({ title: "Not found", path: `/blog/${params.slug}` });
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  let post;
  try {
    post = getPostBySlug(params.slug);
  } catch {
    notFound();
  }
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <p className="mb-4 font-mono text-xs uppercase tracking-widest text-signal">
        {new Date(post.frontmatter.date).toLocaleDateString("en-IN", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}{" "}
        · {post.readingTime}
      </p>
      <PixelHeading as="h1" mode="wave" autoPlay className="mb-8 text-3xl sm:text-5xl">
        {post.frontmatter.title.toUpperCase()}
      </PixelHeading>
      <MdxContent source={post.content} />
    </article>
  );
}
