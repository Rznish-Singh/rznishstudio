export type VideoProvider = "youtube" | "vimeo" | "file";

export function detectVideoProvider(src: string): VideoProvider {
  if (/youtube\.com|youtu\.be/.test(src)) return "youtube";
  if (/vimeo\.com/.test(src)) return "vimeo";
  return "file";
}

function getYouTubeEmbedUrl(src: string): string {
  const match = src.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{6,})/);
  const id = match?.[1] ?? "";
  return `https://www.youtube.com/embed/${id}`;
}

function getVimeoEmbedUrl(src: string): string {
  const match = src.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  const id = match?.[1] ?? "";
  return `https://player.vimeo.com/video/${id}`;
}

/** Turns a YouTube/Vimeo watch link into its iframe-embeddable URL. Direct file
 * links (mp4/webm on your own CDN) are returned unchanged for a native <video>. */
export function getVideoEmbedUrl(src: string): string {
  const provider = detectVideoProvider(src);
  if (provider === "youtube") return getYouTubeEmbedUrl(src);
  if (provider === "vimeo") return getVimeoEmbedUrl(src);
  return src;
}
