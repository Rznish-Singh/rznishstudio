"use client";

import * as React from "react";
import { AnimatePresence, motion, type Variants, type TargetAndTransition } from "framer-motion";

import { cn } from "@/lib/utils";

export type TextAnimateType =
  | "fadeIn"
  | "blurIn"
  | "blurInUp"
  | "blurInDown"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight"
  | "scaleUp"
  | "scaleDown"
  | "rollIn";

export type TextAnimateBy = "text" | "word" | "character" | "line";

const staggerTimings: Record<TextAnimateBy, number> = {
  text: 0.06,
  word: 0.05,
  character: 0.03,
  line: 0.08,
};

function buildVariants(type: TextAnimateType): Variants {
  const enter: Record<TextAnimateType, TargetAndTransition> = {
    fadeIn: { opacity: 1 },
    blurIn: { opacity: 1, filter: "blur(0px)" },
    blurInUp: { opacity: 1, filter: "blur(0px)", y: 0 },
    blurInDown: { opacity: 1, filter: "blur(0px)", y: 0 },
    slideUp: { opacity: 1, y: 0 },
    slideDown: { opacity: 1, y: 0 },
    slideLeft: { opacity: 1, x: 0 },
    slideRight: { opacity: 1, x: 0 },
    scaleUp: { opacity: 1, scale: 1 },
    scaleDown: { opacity: 1, scale: 1 },
    rollIn: { opacity: 1, rotate: 0, y: 0 },
  };

  const initial: Record<TextAnimateType, TargetAndTransition> = {
    fadeIn: { opacity: 0 },
    blurIn: { opacity: 0, filter: "blur(10px)" },
    blurInUp: { opacity: 0, filter: "blur(10px)", y: 12 },
    blurInDown: { opacity: 0, filter: "blur(10px)", y: -12 },
    slideUp: { opacity: 0, y: 16 },
    slideDown: { opacity: 0, y: -16 },
    slideLeft: { opacity: 0, x: 16 },
    slideRight: { opacity: 0, x: -16 },
    scaleUp: { opacity: 0, scale: 0.6 },
    scaleDown: { opacity: 0, scale: 1.4 },
    rollIn: { opacity: 0, rotate: -90, y: 10 },
  };

  return {
    hidden: initial[type],
    visible: (i: number) => ({
      ...enter[type],
      transition: { delay: i, duration: 0.4, ease: "easeOut" },
    }),
    exit: initial[type],
  };
}

function splitText(text: string, by: TextAnimateBy): string[] {
  if (by === "character") return text.split("");
  if (by === "word") return text.split(/(\s+)/);
  if (by === "line") return text.split("\n");
  return [text];
}

export interface TextAnimateProps {
  text: string;
  type?: TextAnimateType;
  by?: TextAnimateBy;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  segmentClassName?: string;
  once?: boolean;
  startOnView?: boolean;
  delay?: number;
}

export function TextAnimate({
  text,
  type = "fadeIn",
  by = "word",
  as = "p",
  className,
  segmentClassName,
  once = true,
  startOnView = true,
  delay = 0,
}: TextAnimateProps) {
  const Component = motion[as as "p"] ?? motion.p;
  const segments = React.useMemo(() => splitText(text, by), [text, by]);
  const variants = React.useMemo(() => buildVariants(type), [type]);
  const stagger = staggerTimings[by];

  return (
    <Component
      className={cn("inline-block", className)}
      initial="hidden"
      whileInView={startOnView ? "visible" : undefined}
      animate={startOnView ? undefined : "visible"}
      viewport={{ once }}
    >
      <AnimatePresence>
        {segments.map((segment, i) => (
          <motion.span
            key={`${segment}-${i}`}
            custom={delay + i * stagger}
            variants={variants}
            className={cn(by === "line" ? "block" : "inline-block whitespace-pre", segmentClassName)}
          >
            {segment}
          </motion.span>
        ))}
      </AnimatePresence>
    </Component>
  );
}
