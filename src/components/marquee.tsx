import { cn } from "@/lib/utils";

interface MarqueeProps {
  text: string;
  className?: string;
  reverse?: boolean;
}

export function Marquee({ text, className, reverse = false }: MarqueeProps) {
  const items = new Array(8).fill(text);

  return (
    <div
      className={cn("overflow-hidden border-y border-border/60 bg-background py-2", className)}
      aria-hidden="true"
    >
      <div className={cn("flex w-max animate-marquee gap-6 whitespace-nowrap", reverse && "[animation-direction:reverse]")}>
        {items.map((label, i) => (
          <span key={i} className="flex items-center gap-6 text-sm font-bold uppercase tracking-widest text-signal">
            {label}
            <span className="text-muted-foreground">—</span>
          </span>
        ))}
      </div>
    </div>
  );
}
