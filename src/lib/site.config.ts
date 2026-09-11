export const siteConfig = {
  name: "Rznish Studio",
  tagline: "",
  description:
    "Rznish Studio is a concert, travel, and studio photography practice based in India — raw frames from the pit, the road, and the studio.",
  url: "https://www.rznishstudio.vercel.app",
  ogImage: "/images/og.jpg",
  links: {
    youtube: "https://www.youtube.com/@rznishsingh",
    instagram: "https://instagram.com/rznishstudio",
  },
  nav: [
    { title: "projects", href: "/projects/concerts" },
    { title: "Stories", href: "/projects/stories" },
    { title: "lifestyle", href: "/projects/studio" },
    // { title: "nature", href: "/projects/travels" },
    { title: "Blog", href: "/blog" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
  ],
  footerNav: [
    { title: "YouTube", href: "https://youtube.com/@rznishsingh" },
    { title: "Work", href: "/projects/concerts" },
    { title: "Contact", href: "/contact" },
    { title: "Blogs", href: "/blog" },
    { title: "Instagram", href: "https://instagram.com/rznishstudio" },
    { title: "FAQs", href: "/faqs" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
