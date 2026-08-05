"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

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
export function BandWipe({ text, className, height = "7.5vw" }: BandWipeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.25"],
  });

  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className={cn("relative w-full", className)} style={{ height }}>
      <motion.div
        className="absolute top-0 left-0 h-full overflow-hidden bg-[var(--paper)] text-[#000]"
        style={{ width: prefersReducedMotion ? "100%" : width }}
      >
        <span
          className="absolute top-0 left-[-8.5vw] whitespace-nowrap font-semibold tracking-[-0.01em]"
          style={{ fontSize: "4.7vw", lineHeight: height }}
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
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
    />
  );
}
