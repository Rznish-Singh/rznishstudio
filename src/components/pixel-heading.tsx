"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

const PIXEL_FONTS = [
  "font-pixel-square",
  "font-pixel-grid",
  "font-pixel-circle",
  "font-pixel-triangle",
  "font-pixel-line",
] as const;

const PIXEL_FONT_NAMES = ["square", "grid", "circle", "triangle", "line"] as const;

type IsolateFont = (typeof PIXEL_FONT_NAMES)[number] | "sans" | "mono" | "none";

function fontClassFor(name: IsolateFont | undefined) {
  switch (name) {
    case "square":
      return "font-pixel-square";
    case "grid":
      return "font-pixel-grid";
    case "circle":
      return "font-pixel-circle";
    case "triangle":
      return "font-pixel-triangle";
    case "line":
      return "font-pixel-line";
    case "sans":
      return "font-sans";
    case "mono":
      return "font-mono";
    default:
      return undefined;
  }
}

export type PixelHeadingMode = "uniform" | "multi" | "wave" | "random";

export interface PixelHeadingProps
  extends Omit<React.HTMLAttributes<HTMLHeadingElement>, "prefix"> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  mode?: PixelHeadingMode;
  autoPlay?: boolean;
  cycleInterval?: number;
  staggerDelay?: number;
  defaultFontIndex?: number;
  showLabel?: boolean;
  prefix?: string;
  prefixFont?: IsolateFont;
  isolate?: Record<string, IsolateFont>;
  onFontIndexChange?: (index: number) => void;
  children: string;
}

const GOLDEN_RATIO_CONJUGATE = 0.618033988749895;

function goldenFontIndex(position: number) {
  const value = (position * GOLDEN_RATIO_CONJUGATE) % 1;
  return Math.floor(value * PIXEL_FONTS.length);
}

export function PixelHeading({
  as = "h1",
  mode = "multi",
  autoPlay = false,
  cycleInterval = 150,
  staggerDelay = 50,
  defaultFontIndex = 0,
  showLabel = false,
  prefix,
  prefixFont = "none",
  isolate,
  onFontIndexChange,
  className,
  children,
  ...props
}: PixelHeadingProps) {
  const Tag = as;
  const characters = React.useMemo(() => children.split(""), [children]);

  const [isActive, setIsActive] = React.useState(autoPlay);
  const [uniformIndex, setUniformIndex] = React.useState(defaultFontIndex);
  const [charIndices, setCharIndices] = React.useState<number[]>(() =>
    characters.map((_, i) => (mode === "uniform" ? defaultFontIndex : goldenFontIndex(i)))
  );

  React.useEffect(() => {
    setIsActive(autoPlay);
  }, [autoPlay]);

  React.useEffect(() => {
    if (!isActive) return;

    if (mode === "uniform") {
      const id = setInterval(() => {
        setUniformIndex((prev) => {
          const next = (prev + 1) % PIXEL_FONTS.length;
          onFontIndexChange?.(next);
          return next;
        });
      }, cycleInterval);
      return () => clearInterval(id);
    }

    const timers = characters.map((_, i) => {
      const start = mode === "wave" ? i * staggerDelay : Math.random() * staggerDelay * characters.length;
      return setTimeout(() => {
        setCharIndices((prev) => {
          const next = [...prev];
          next[i] = mode === "random" ? Math.floor(Math.random() * PIXEL_FONTS.length) : (next[i] + 1) % PIXEL_FONTS.length;
          return next;
        });
      }, start);
    });

    const tick = setInterval(() => {
      setCharIndices((prev) =>
        prev.map((v) => (mode === "random" ? Math.floor(Math.random() * PIXEL_FONTS.length) : (v + 1) % PIXEL_FONTS.length))
      );
    }, cycleInterval);

    return () => {
      timers.forEach((t) => clearTimeout(t));
      clearInterval(tick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, mode, cycleInterval, staggerDelay, characters.length]);

  const handleStep = () => {
    if (mode === "uniform") {
      setUniformIndex((prev) => {
        const next = (prev + 1) % PIXEL_FONTS.length;
        onFontIndexChange?.(next);
        return next;
      });
    } else {
      setCharIndices((prev) => prev.map((v) => (v + 1) % PIXEL_FONTS.length));
    }
  };

  return (
    <div className="inline-flex flex-col gap-1">
      <Tag
        tabIndex={0}
        onMouseEnter={() => !autoPlay && setIsActive(true)}
        onMouseLeave={() => !autoPlay && setIsActive(false)}
        onFocus={() => !autoPlay && setIsActive(true)}
        onBlur={() => !autoPlay && setIsActive(false)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleStep();
          }
        }}
        aria-label={`${prefix ? prefix + " " : ""}${children}`}
        className={cn("select-none tracking-tight outline-none", className)}
        {...props}
      >
        {prefix ? <span className={fontClassFor(prefixFont)}>{prefix}</span> : null}
        {characters.map((char, i) => {
          const isolatedFont = isolate?.[char];
          if (isolatedFont) {
            return (
              <span key={i} className={fontClassFor(isolatedFont)}>
                {char}
              </span>
            );
          }
          const fontClass = mode === "uniform" ? PIXEL_FONTS[uniformIndex] : PIXEL_FONTS[charIndices[i] ?? 0];
          return (
            <span key={i} className={fontClass}>
              {char}
            </span>
          );
        })}
      </Tag>
      {showLabel ? (
        <span className="text-xs uppercase tracking-widest text-muted-foreground">
          {mode === "uniform" ? PIXEL_FONT_NAMES[uniformIndex] : mode}
        </span>
      ) : null}
    </div>
  );
}
