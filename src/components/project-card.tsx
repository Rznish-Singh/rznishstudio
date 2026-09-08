import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { SmartImage } from "@/components/smart-image";
import type { ProjectItem } from "@/lib/projects";

export function ProjectCard({ item }: { item: ProjectItem }) {
  return (
    <Link href={`/projects/${item.category}/${item.slug}`} className="group block">
      <Card className="overflow-hidden border-border/60 bg-card transition-colors group-hover:border-signal">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
          <SmartImage
            src={item.cover}
            alt={item.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </div>
        <CardContent className="flex items-center justify-between p-4">
          <span className="font-sans text-sm font-bold uppercase tracking-wide">{item.title}</span>
        </CardContent>
      </Card>
    </Link>
  );
}
