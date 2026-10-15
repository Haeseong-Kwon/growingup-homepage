"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface ScrollWordsProps {
  text: string;
  as?: "h2" | "p";
  className?: string;
  /** Opacity of a word that hasn't been reached yet. */
  dim?: number;
}

function Word({
  word,
  range,
  progress,
  dim,
}: {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
  dim: number;
}) {
  const opacity = useTransform(progress, range, [dim, 1]);
  return (
    <motion.span className="inline-block" style={{ opacity }}>
      {word}
      {" "}
    </motion.span>
  );
}

/**
 * A statement that is read in with the scroll: each word lights up as the
 * paragraph passes through the middle of the viewport, so the sentence lands at
 * the reader's pace rather than on a timer. Scrubbed, so it runs backwards too.
 */
export function ScrollWords({ text, as = "p", className, dim = 0.16 }: ScrollWordsProps) {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });

  const words = text.split(" ");
  const Tag = as;

  // The ref stays attached in both branches: useScroll needs a hydrated target.
  const tagRef = ref as React.Ref<HTMLHeadingElement & HTMLParagraphElement>;

  if (prefersReducedMotion) {
    return (
      <Tag ref={tagRef} className={className}>
        {text}
      </Tag>
    );
  }

  return (
    <Tag ref={tagRef} className={cn(className)} aria-label={text}>
      <span aria-hidden>
        {words.map((word, i) => (
          <Word
            key={`${word}-${i}`}
            word={word}
            range={[i / words.length, (i + 1) / words.length]}
            progress={scrollYProgress}
            dim={dim}
          />
        ))}
      </span>
    </Tag>
  );
}
