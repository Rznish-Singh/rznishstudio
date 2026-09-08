# 404 Pixels — Next.js site

A modern rebuild of the 404 Pixels photography site: Next.js 14 (App
Router), Tailwind, shadcn/ui, an MDX-powered blog with an AI-summary
block, per-project route folders, Sentry error monitoring, and a Jest
test suite.

## Stack

- **Next.js 14** (App Router, RSC, `generateMetadata`, `sitemap.ts`, `robots.ts`)
- **Tailwind CSS** + **shadcn/ui**-style `Card`, `Button`, `Carousel` (Embla)
- **Inter** (`next/font/google`) for body copy, **Geist Pixel** fonts for
  the animated `PixelHeading` display type
- **Framer Motion** `TextAnimate` component (fadeIn / blurIn / slideUp /
  rollIn / etc.)
- **MDX** blog via `next-mdx-remote/rsc` + `gray-matter`, with a custom
  `<AiSummary>` MDX component for AI-generated callouts
- **Sentry** (`@sentry/nextjs`) wired through `instrumentation.ts` and
  per-runtime config files
- **Jest** + **React Testing Library** for component/unit tests

## Project structure

```
content/blog/*.mdx              # blog posts (frontmatter: title, description, date, cover, tags)
src/app/
  layout.tsx                    # fonts, header/footer shell, base metadata
  page.tsx                      # home page
  projects/
    concerts/page.tsx           # 404 Concerts grid
    concerts/[slug]/page.tsx    # one page per artist
    stories/page.tsx            # 404 Stories (long-form posts)
    studio/page.tsx             # 404 Studio
    travels/page.tsx            # 404 Travels
  blog/page.tsx                 # blog index
  blog/[slug]/page.tsx          # MDX post renderer
  about/, contact/, faqs/       # static pages
  sitemap.ts, robots.ts         # SEO
src/components/
  pixel-heading.tsx             # per-character animated pixel-font heading
  text-animate.tsx              # Framer Motion text-reveal component
  mdx-content.tsx               # MDXRemote wrapper + <AiSummary>
  ui/                           # shadcn-style Button, Card, Carousel
src/lib/
  mdx.ts                        # frontmatter loader + reading time
  seo.ts                        # shared Metadata builder
  projects.ts                   # artist/category data
__tests__/                      # Jest specs
```

Each project category is its own route folder under `src/app/projects/`
so they can diverge independently (concerts has per-artist detail
pages; stories reads from the MDX blog; studio/travels are ready for
their own data sources).

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in Sentry DSN if you want error reporting
npm run dev
```

Add real photos to `public/images/` matching the filenames referenced
in `src/lib/projects.ts` and each MDX post's `cover` frontmatter.

## Testing

```bash
npm test          # run once
npm run test:watch
npm run test:ci    # with coverage, for CI
```

## SEO

`src/lib/seo.ts` centralizes title/description/OG/Twitter metadata;
every route calls `buildMetadata()` from its own `generateMetadata` or
static `metadata` export. `sitemap.ts` and `robots.ts` are generated
from the same project/post data so they never drift from the actual
routes.

## Sentry

Sentry initializes via `instrumentation.ts` (server/edge) and
`sentry.client.config.ts` (browser), and only activates when
`NODE_ENV=production` and `NEXT_PUBLIC_SENTRY_DSN` is set — so local
dev stays silent by default. Set `SENTRY_ORG` / `SENTRY_PROJECT` /
`SENTRY_AUTH_TOKEN` in CI to enable source-map upload during `next build`.

## Adding images & videos to a project

Each item in `src/lib/projects.ts` has a `cover` (used on cards/carousels)
and an optional `gallery: MediaItem[]` (used on the project's own detail
page, e.g. `/projects/concerts/glass-animals`):

```ts
{
  slug: "glass-animals",
  title: "Glass Animals",
  cover: "https://your-cdn.com/glass-animals/cover.jpg",
  category: "concerts",
  gallery: [
    { type: "image", src: "https://your-cdn.com/glass-animals/1.jpg", alt: "Wide stage shot" },
    { type: "video", src: "https://your-cdn.com/glass-animals/recap.mp4", poster: "https://your-cdn.com/glass-animals/recap-poster.jpg" },
    { type: "video", src: "https://youtu.be/VIDEO_ID" }, // or a vimeo.com link
  ],
}
```

- `src` can be a local path under `/public/images/...` **or** any HTTPS CDN
  URL (Cloudinary, S3/CloudFront, Bunny, imgix, Mux, etc.) — `next.config.mjs`
  already allows any HTTPS image host, so no extra config is needed.
- Video `src` can be a direct file link (mp4/webm from your CDN) — it renders
  with native `<video controls>` — or a YouTube/Vimeo watch link, which
  `src/lib/video.ts` detects automatically and renders as an embedded iframe.
- `MediaGallery` (`src/components/media-gallery.tsx`) renders whatever you
  put in `gallery`. Add as many entries as you like, mix images and videos
  freely; an empty/omitted `gallery` shows a "no images yet" placeholder
  instead of a blank page.
- Right now every artist ships with placeholder images from picsum.photos
  purely so pages render something real out of the box — replace `cover`
  and each `gallery[].src` with your actual photos/video whenever you have
  them, nothing else needs to change.
- Studio (`/projects/studio`) and Travels (`/projects/travels`) use
  loremflickr.com tagged placeholders (`nature`, `photostudio`, etc.) so
  they look roughly like the real thing instead of arbitrary random photos —
  swap `studioShoots` / `travelShoots` in `src/lib/projects.ts` for real
  work whenever it's ready. The homepage hero background and the About
  page portrait (`heroBackground` / `aboutPortrait` in the same file) are
  placeholders too.

### Optional: Cloudinary-optimized delivery

Every image in the app renders through `SmartImage`
(`src/components/smart-image.tsx`) instead of `next/image` directly:

- By default it's a transparent pass-through to `next/image`, so any full
  `https://...` URL (your own CDN, S3, picsum, loremflickr) works with zero
  setup, exactly as shipped.
- If you set `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` in `.env.local` **and**
  give an image a bare Cloudinary public ID instead of a URL (e.g.
  `src: "concerts/glass-animals-1"`), it automatically renders via
  Cloudinary's `CldImage` — auto AVIF/WebP, the `sizes`-driven responsive
  `srcset`, and on-the-fly crop/resize, all per the
  [next-cloudinary docs](https://next.cloudinary.dev).
- Nothing else changes: mix Cloudinary public IDs and plain URLs freely
  across `cover`/`gallery` entries in `src/lib/projects.ts`.

## Notes

- `geist`'s pixel font subpackage (`geist/font/pixel`) powers
  `PixelHeading`; if a newer/older `geist` version changes that export
  path, update the import in `src/app/layout.tsx`.
- `TextAnimate` and `PixelHeading` are plain components (no external
  registry dependency) — copy them into another project by hand if
  needed, per the shadcn "manual install" pattern.
