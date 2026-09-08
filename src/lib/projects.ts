export type ProjectCategory = "concerts" | "stories" | "studio" | "travels";

/**
 * A single gallery entry. `src` can point at:
 *  - a local file in /public/images/...
 *  - any HTTPS CDN URL (Cloudinary, S3/CloudFront, Bunny, imgix, Mux, etc.) —
 *    next.config.mjs already allows any https hostname for images
 *  - for videos: a direct file URL (mp4/webm from your CDN) OR a YouTube /
 *    Vimeo watch link — the provider is auto-detected in src/lib/video.ts
 */
export type MediaItem =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster?: string; caption?: string };

export type ProjectItem = {
  slug: string;
  title: string;
  cover: string;
  category: ProjectCategory;
  blurb?: string;
  /** Extra images/videos shown on the project's own detail page. Add as many as you like. */
  gallery?: MediaItem[];
};

export const projectCategories: Record<
  ProjectCategory,
  { title: string; description: string; accent: string }
> = {
  concerts: {
  title: "Concerts",
  description: "Live moments, stage lights, crowd energy, and split-second frames from the pit.",
  accent: "hsl(48 96% 53%)",
},

stories: {
  title: "Photography Tips",
  description: "Practical notes on composition, lighting, camera settings, and getting better frames.",
  accent: "hsl(210 40% 60%)",
},

studio: {
  title: "Studio",
  description: "Controlled lighting, clean compositions, portraits, products, and carefully built sets.",
  accent: "hsl(0 72% 51%)",
},

travels: {
  title: "Travel & Lifestyle",
  description: "Street scenes, people, places, and everyday moments captured along the way.",
  accent: "hsl(199 89% 60%)",
},
};

// Placeholder covers/galleries use picsum.photos (seeded, so they're stable across
// reloads and builds) purely so every page renders real images out of the box.
// Swap `cover` and `gallery[].src` for your own CDN/S3/Cloudinary URLs or local
// files in /public/images whenever you're ready — nothing else needs to change.
function placeholderGallery(seed: string, count = 4): MediaItem[] {
  return Array.from({ length: count }).map((_, i) => ({
    type: "image",
    src: `https://picsum.photos/seed/${seed}-${i}/1000/1250`,
    alt: `${seed} — frame ${i + 1}`,
  }));
}

export const concertArtists: ProjectItem[] = [
  {
    slug: "Badshah",
    title: "Badshah",
    cover: "https://res.cloudinary.com/dy4xybzrn/image/upload/v1788847374/5_zujug2.webp",
    category: "concerts",
    gallery: [
      { type: "image", src: "https://res.cloudinary.com/dy4xybzrn/image/upload/v1788847375/9_idorfx.webp", alt: "badshah" },
      { type: "image", src: "https://res.cloudinary.com/dy4xybzrn/image/upload/v1788847374/14_rc782i.webp", alt: "badshah" },
      { type: "image", src: "https://res.cloudinary.com/dy4xybzrn/image/upload/v1788847374/8_hval9p.webp", alt: "badshah" },
      { type: "image", src: "https://res.cloudinary.com/dy4xybzrn/image/upload/v1788847374/4_vb9rff.webp", alt: "badshah" },
      { type: "image", src: "https://res.cloudinary.com/dy4xybzrn/image/upload/v1788847373/7_dty1ht.webp", alt: "badshah" },
      { type: "image", src: "https://res.cloudinary.com/dy4xybzrn/image/upload/v1788847371/10_an7a0v.webp", alt: "badshah" },
      { type: "image", src: "https://res.cloudinary.com/dy4xybzrn/image/upload/v1788847370/12_dfxwp2.webp", alt: "badshah" },
      { type: "image", src: "https://res.cloudinary.com/dy4xybzrn/image/upload/v1788847370/11_rmetuu.webp", alt: "badshah" },
      { type: "image", src: "https://res.cloudinary.com/dy4xybzrn/image/upload/v1788847370/1_fdljq5.webp", alt: "badshah" },
      
      // // Direct CDN/file link (mp4/webm) — plays inline with native controls.
      // {
      //   type: "video",
      //   src: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      //   poster: "https://picsum.photos/seed/glass-animals-video/1000/1250",
      //   caption: "Recap clip — swap this src for your own CDN-hosted highlight reel.",
      // },
      // YouTube / Vimeo links are auto-detected and embedded as an iframe instead.
      // { type: "video", src: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", caption: "Example YouTube embed" },
      // { type: "image", src: "https://picsum.photos/seed/glass-animals-3/1000/1250", alt: "Glass Animals — keys and synths" },
    ],
  },
  {
    slug: "DjChetas",
    title: "Dj Chetas",
    cover: "https://res.cloudinary.com/dy4xybzrn/image/upload/v1788849838/2_hmr4py.webp",
    category: "concerts",
    gallery: [
      { type: "image", src: "https://res.cloudinary.com/dy4xybzrn/image/upload/v1788849839/3_of5cya.webp", alt: "dj chetas" },
      { type: "image", src: "https://res.cloudinary.com/dy4xybzrn/image/upload/v1788849839/1_styzbu.webp", alt: "dj chetas" },
      { type: "image", src: "https://res.cloudinary.com/dy4xybzrn/image/upload/v1788849839/5_jryk9c.webp", alt: "dj chetas" },
      { type: "image", src: "https://res.cloudinary.com/dy4xybzrn/image/upload/v1788849838/4_xqvart.webp", alt: "dj chetas" },
     
      // // Direct CDN/file link (mp4/webm) — plays inline with native controls.
      // {
      //   type: "video",
      //   src: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      //   poster: "https://picsum.photos/seed/glass-animals-video/1000/1250",
      //   caption: "Recap clip — swap this src for your own CDN-hosted highlight reel.",
      // },
      // YouTube / Vimeo links are auto-detected and embedded as an iframe instead.
      // { type: "video", src: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", caption: "Example YouTube embed" },
      // { type: "image", src: "https://picsum.photos/seed/glass-animals-3/1000/1250", alt: "Glass Animals — keys and synths" },
    ],
  },
   {
    slug: "Divine",
    title: "DIVINE",
    cover: "https://res.cloudinary.com/dy4xybzrn/image/upload/v1788850746/1_qii3ok.webp",
    category: "concerts",
    gallery: [
      { type: "image", src: "https://res.cloudinary.com/dy4xybzrn/image/upload/v1788850747/3_gmbcyp.webp", alt: "DIVINE" },
      { type: "image", src: "https://res.cloudinary.com/dy4xybzrn/image/upload/v1788850748/5_atbqov.webp", alt: "DIVINE" },
      { type: "image", src: "https://res.cloudinary.com/dy4xybzrn/image/upload/v1788850748/4_subgmy.webp", alt: "DIVINE" },
      { type: "image", src: "https://res.cloudinary.com/dy4xybzrn/image/upload/v1788850749/6_giemzm.webp", alt: "DIVINE" },
      { type: "image", src: "https://res.cloudinary.com/dy4xybzrn/image/upload/v1788850746/2_txmjlz.webp", alt: "DIVINE" },
     
      // // Direct CDN/file link (mp4/webm) — plays inline with native controls.
      // {
      //   type: "video",
      //   src: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      //   poster: "https://picsum.photos/seed/glass-animals-video/1000/1250",
      //   caption: "Recap clip — swap this src for your own CDN-hosted highlight reel.",
      // },
      // YouTube / Vimeo links are auto-detected and embedded as an iframe instead.
      // { type: "video", src: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", caption: "Example YouTube embed" },
      // { type: "image", src: "https://picsum.photos/seed/glass-animals-3/1000/1250", alt: "Glass Animals — keys and synths" },
    ],
  },
   {
    slug: "nss",
    title: "NSS",
    cover: "https://res.cloudinary.com/dy4xybzrn/image/upload/v1788852142/3_zzyqau.webp",
    category: "concerts",
    gallery: [
      { type: "image", src: "https://res.cloudinary.com/dy4xybzrn/image/upload/v1788852145/5_r5e0jc.webp", alt: "NSS" },
      { type: "image", src: "https://res.cloudinary.com/dy4xybzrn/image/upload/v1788852143/4_cplfsw.webp", alt: "NSS" },
      { type: "image", src: "https://res.cloudinary.com/dy4xybzrn/image/upload/v1788852141/2_xrmp8q.webp", alt: "NSS" },
      { type: "image", src: "https://res.cloudinary.com/dy4xybzrn/image/upload/v1788852140/1_kg7wsa.webp", alt: "NSS" },
      { type: "image", src: "https://res.cloudinary.com/dy4xybzrn/image/upload/v1788852135/7_fe4mf5.webp", alt: "NSS" },
      { type: "image", src: "https://res.cloudinary.com/dy4xybzrn/image/upload/v1788852134/6_pjuxu5.webp", alt: "NSS" },
      { type: "image", src: "https://res.cloudinary.com/dy4xybzrn/image/upload/v1788852136/8_xz5tun.webp", alt: "NSS" },
      { type: "image", src: "https://res.cloudinary.com/dy4xybzrn/image/upload/v1788852138/9_bhwak8.webp", alt: "NSS" },
     
      // // Direct CDN/file link (mp4/webm) — plays inline with native controls.
      // {
      //   type: "video",
      //   src: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      //   poster: "https://picsum.photos/seed/glass-animals-video/1000/1250",
      //   caption: "Recap clip — swap this src for your own CDN-hosted highlight reel.",
      // },
      // YouTube / Vimeo links are auto-detected and embedded as an iframe instead.
      // { type: "video", src: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", caption: "Example YouTube embed" },
      // { type: "image", src: "https://picsum.photos/seed/glass-animals-3/1000/1250", alt: "Glass Animals — keys and synths" },
    ],
  },
  {
    slug: "ncc",
    title: "NCC",
    cover: "https://res.cloudinary.com/dy4xybzrn/image/upload/v1788852087/6_wwcikq.webp",
    category: "concerts",
    gallery: [
      { type: "image", src: "https://res.cloudinary.com/dy4xybzrn/image/upload/v1788852095/3_l4ewer.webp", alt: "NCC" },
      { type: "image", src: "https://res.cloudinary.com/dy4xybzrn/image/upload/v1788852094/2_pvol5q.webp", alt: "NCC" },
      { type: "image", src: "https://res.cloudinary.com/dy4xybzrn/image/upload/v1788852092/1_weg4tg.webp", alt: "NCC" },
      { type: "image", src: "https://res.cloudinary.com/dy4xybzrn/image/upload/v1788852091/10_joiq2n.webp", alt: "NCC" },
      { type: "image", src: "https://res.cloudinary.com/dy4xybzrn/image/upload/v1788852090/7_ngmesz.webp", alt: "NCC" },
      { type: "image", src: "https://res.cloudinary.com/dy4xybzrn/image/upload/v1788852089/9_frn0gg.webp", alt: "NCC" },
      { type: "image", src: "https://res.cloudinary.com/dy4xybzrn/image/upload/v1788852088/8_b6gzlv.webp", alt: "NCC" },
      { type: "image", src: "https://res.cloudinary.com/dy4xybzrn/image/upload/v1788852087/5_gwa7qq.webp", alt: "NCC" },
      { type: "image", src: "https://res.cloudinary.com/dy4xybzrn/image/upload/v1788852087/4_sqy5lj.webp", alt: "NCC" },
     
      ],
  },
  
 ];

export const featuredPress = [
  {
    title: "portrait photography",
    href: "#",
    cover: "https://res.cloudinary.com/dy4xybzrn/image/upload/v1788852616/1_-_Copy_gtcym4.png",
  },
  {
    title: "concert photography",
    href: "#",
    cover: "https://res.cloudinary.com/dy4xybzrn/image/upload/v1788849838/4_xqvart.webp",
  },
];

// LoremFlickr serves real (if generic) tagged stock photos, unlike picsum which
// is seed-random with no subject control — used here so Studio/Travels actually
// look like studio/travel photography instead of arbitrary placeholder images.
// `lock` pins a specific photo per tag so the grid is stable across reloads.
export const travelShoots: MediaItem[] = [
  { type: "image", src: "https://loremflickr.com/1000/1250/nature,mountains?lock=101", alt: "Mountain range at dusk" },
  { type: "image", src: "https://loremflickr.com/1000/1250/nature,forest?lock=102", alt: "Forest trail" },
  { type: "image", src: "https://loremflickr.com/1000/1250/nature,ocean?lock=103", alt: "Coastline at sunset" },
  { type: "image", src: "https://loremflickr.com/1000/1250/nature,desert?lock=104", alt: "Desert dunes" },
  { type: "image", src: "https://loremflickr.com/1000/1250/nature,lake?lock=105", alt: "Alpine lake" },
  { type: "image", src: "https://loremflickr.com/1000/1250/nature,road?lock=106", alt: "Open road" },
];

export const studioShoots: MediaItem[] = [
  { type: "image", src: "https://loremflickr.com/1000/1250/photostudio,portrait?lock=201", alt: "Studio portrait, controlled lighting" },
  { type: "image", src: "https://loremflickr.com/1000/1250/photostudio,fashion?lock=202", alt: "Studio fashion composite" },
  { type: "image", src: "https://loremflickr.com/1000/1250/photostudio,product?lock=203", alt: "Studio product shot" },
  { type: "image", src: "https://loremflickr.com/1000/1250/photostudio,blackandwhite?lock=204", alt: "Studio black-and-white portrait" },
  { type: "image", src: "https://loremflickr.com/1000/1250/photostudio,model?lock=205", alt: "Studio set, model" },
  { type: "image", src: "https://loremflickr.com/1000/1250/photostudio,light?lock=206", alt: "Studio lighting setup" },
];

/** Background image behind the homepage hero heading. */
export const heroBackground =
  "https://res.cloudinary.com/dy4xybzrn/image/upload/v1788852572/IMG_0249_-_Copy_mizpqw.jpg";

/** Portrait used on the About page. */
export const aboutPortrait = "https://res.cloudinary.com/dy4xybzrn/image/upload/v1788852616/1_-_Copy_gtcym4.png";
