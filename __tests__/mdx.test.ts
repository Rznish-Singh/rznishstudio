import { getAllPosts, getAllSlugs } from "@/lib/mdx";

describe("mdx content loader", () => {
  it("lists every mdx file in content/blog", () => {
    const slugs = getAllSlugs();
    expect(slugs.length).toBeGreaterThan(0);
  });

  it("sorts posts newest first", () => {
    const posts = getAllPosts();
    const dates = posts.map((p) => new Date(p.frontmatter.date).getTime());
    const sorted = [...dates].sort((a, b) => b - a);
    expect(dates).toEqual(sorted);
  });
});
