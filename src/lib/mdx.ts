import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  project?: string;
  cover?: string;
  tags?: string[];
  aiSummary?: string;
};

export type Post = {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  readingTime: string;
};

function assertFrontmatter(
  data: Record<string, unknown>,
  slug: string
): asserts data is PostFrontmatter {
  if (!data.title || !data.description || !data.date) {
    throw new Error(
      `content/blog/${slug}.mdx is missing required frontmatter (title, description, date).`
    );
  }
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string): Post {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  assertFrontmatter(data, slug);

  return {
    slug,
    frontmatter: data,
    content,
    readingTime: readingTime(content).text,
  };
}

export function getAllPosts(): Post[] {
  return getAllSlugs()
    .map(getPostBySlug)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
    );
}
