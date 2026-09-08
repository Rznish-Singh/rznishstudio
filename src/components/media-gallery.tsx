import { SmartImage } from "@/components/smart-image";
import { cn } from "@/lib/utils";
import { detectVideoProvider, getVideoEmbedUrl } from "@/lib/video";
import type { MediaItem } from "@/lib/projects";

export function MediaGallery({
  items = [],
  className,
}: {
  items?: MediaItem[];
  className?: string;
}) {
  if (items.length === 0) {
    return (
      <div
        className={cn(
          "rounded-lg border border-dashed border-border/60 p-10 text-center text-sm text-muted-foreground",
          className
        )}
      >
        No gallery images yet. Add entries to this project&apos;s{" "}
        <code className="rounded bg-muted px-1.5 py-0.5">gallery</code> array in{" "}
        <code className="rounded bg-muted px-1.5 py-0.5">src/lib/projects.ts</code> — any
        HTTPS image URL, plus direct video files or YouTube/Vimeo links.
      </div>
    );
  }

  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {items.map((item, i) =>
        item.type === "image" ? (
          <div key={i} className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted">
            <SmartImage
              src={item.src}
              alt={item.alt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        ) : (
          <VideoTile key={i} item={item} />
        )
      )}
    </div>
  );
}

function VideoTile({ item }: { item: Extract<MediaItem, { type: "video" }> }) {
  const provider = detectVideoProvider(item.src);

  if (provider === "file") {
    return (
      <div className="flex flex-col gap-2">
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-black">
          {/* Direct CDN/file video — swap `src` for your own mp4/webm URL. */}
          <video controls poster={item.poster} preload="metadata" className="h-full w-full object-cover">
            <source src={item.src} />
            Your browser doesn&apos;t support embedded video.
          </video>
        </div>
        {item.caption ? <p className="text-xs text-muted-foreground">{item.caption}</p> : null}
      </div>
    );
  }

  return (
    <div className="col-span-full flex flex-col gap-2 sm:col-span-2">
      <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
        <iframe
          src={getVideoEmbedUrl(item.src)}
          title={item.caption ?? "Embedded video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 h-full w-full"
        />
      </div>
      {item.caption ? <p className="text-xs text-muted-foreground">{item.caption}</p> : null}
    </div>
  );
}
