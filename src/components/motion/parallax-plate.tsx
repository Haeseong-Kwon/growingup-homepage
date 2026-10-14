"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { SCROLL_SPRING } from "@/lib/motion";

interface ParallaxPlateProps {
  src: string;
  /** Plate opacity over the ink. */
  className?: string;
  /** How far the plate drifts against the scroll, as a percentage of its height. */
  drift?: number;
}

/**
 * Background photograph that drifts against the scroll inside its section.
 * Replaces `background-attachment: fixed`, which iOS ignores and which forces a
 * full repaint per frame elsewhere — this stays on the compositor everywhere.
 *
 * Must sit inside a `relative overflow-hidden` section.
 */
export function ParallaxPlate({ src, className, drift = 12 }: ParallaxPlateProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, SCROLL_SPRING);
  // A `y` percentage resolves against the plate's own (oversized) height, not the
  // section's: the plate is (1 + 2·drift) tall, so travelling ±drift% of itself
  // would overshoot the oversize and show its edge. Scale the travel down to fit.
  const travel = drift / (1 + (2 * drift) / 100);
  const y = useTransform(smooth, [0, 1], [`-${travel}%`, `${travel}%`]);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        // Oversized by twice the drift so the plate's edge never enters frame.
        className="absolute inset-x-0"
        style={{
          top: `-${drift}%`,
          bottom: `-${drift}%`,
          y: prefersReducedMotion ? 0 : y,
        }}
      >
        <div
          className={cn("h-full w-full bg-cover bg-center grayscale", className)}
          style={{ backgroundImage: `url(${src})` }}
        />
      </motion.div>
    </div>
  );
}
