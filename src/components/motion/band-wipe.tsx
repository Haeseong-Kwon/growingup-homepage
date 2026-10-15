"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { EASE, REVEAL_VIEWPORT, SCROLL_SPRING } from "@/lib/motion";

interface BandWipeProps {
  text: string;
  className?: string;
  /** Scroll range the wipe is scrubbed across, as offsets on the tracked element. */
  height?: string;
}

/**
 * A solid band that grows from the left edge, uncovering oversized type that is
 * already in place behind it. Because the text does not move with the band, the
 * effect reads as a print reveal rather than a slide.
 *
 * Scroll-scrubbed: progress is bound to scroll position, not to a timer.
 */
export function BandWipe({ text, className, height = "clamp(52px, 7.5vw, 160px)" }: BandWipeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.3"],
  });

  // Spring the raw progress so the band glides open and closed rather than
  // tracking the wheel tick-for-tick.
  const smooth = useSpring(scrollYProgress, SCROLL_SPRING);
  // Clip, don't resize: animating width forces layout every frame, while a
  // clip-path inset stays on the compositor and reveals exactly the same edge.
  const clipPath = useTransform(smooth, (p) => `inset(0 ${(1 - p) * 100}% 0 0)`);

  return (
    <div ref={ref} className={cn("relative w-full", className)} style={{ height }}>
      <motion.div
        className="absolute inset-0 overflow-hidden bg-[var(--paper)] text-[#000]"
        style={{ clipPath: prefersReducedMotion ? "none" : clipPath }}
      >
        <span
          className="absolute top-0 left-[-8.5vw] whitespace-nowrap font-semibold tracking-[-0.01em]"
          // Type tracks the band: 63% of its height, so it scales with the clamp.
          style={{ fontSize: `calc(${height} * 0.63)`, lineHeight: height }}
        >
          {text}
        </span>
      </motion.div>
    </div>
  );
}

interface GrowRuleProps {
  className?: string;
  orientation?: "vertical" | "horizontal";
}

/**
 * A dashed rule that draws itself out from its centre as it enters the viewport
 * — the reference uses these to stitch columns together after content lands.
 *
 * Scales rather than animating height/width so the caller owns the size and the
 * animation stays on the compositor.
 */
export function GrowRule({ className, orientation = "vertical" }: GrowRuleProps) {
  const prefersReducedMotion = useReducedMotion();
  const isVertical = orientation === "vertical";
  const axis = isVertical ? "scaleY" : "scaleX";

  return (
    <motion.div
      aria-hidden
      className={cn(isVertical ? "w-px rule-l" : "h-px rule-t", className)}
      initial={prefersReducedMotion ? false : { [axis]: 0 }}
      whileInView={{ [axis]: 1 }}
      viewport={REVEAL_VIEWPORT}
      transition={{ duration: 1.1, ease: EASE, delay: 0.25 }}
    />
  );
}
