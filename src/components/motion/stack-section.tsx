"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { SCROLL_SPRING } from "@/lib/motion";

interface StackSectionProps {
  children: React.ReactNode;
  /** Stacking order: later sections must sit above earlier ones. */
  index: number;
}

/**
 * Wraps a page section so the next one slides over it like a sheet laid on a
 * stack. As this section's bottom edge leaves the viewport it recedes — scales
 * toward its bottom edge, drifts down at a slower rate, and dims — while the
 * following section scrolls over it at full speed.
 *
 * Driven only during the exit window (bottom edge from viewport bottom to
 * viewport top), so pinned sticky content inside is untouched while it pins.
 * Needs an opaque section background and a darker page behind it, so the
 * receding sheet's margins read as depth.
 */
export function StackSection({ children, index }: StackSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["end end", "end start"] });
  const progress = useSpring(scrollYProgress, SCROLL_SPRING);
  const scale = useTransform(progress, [0, 1], [1, 0.9]);
  const y = useTransform(progress, [0, 1], ["0vh", "28vh"]);
  const dim = useTransform(progress, [0, 1], [0, 0.7]);

  return (
    <div ref={ref} className="relative" style={{ zIndex: index }}>
      <motion.div
        style={
          prefersReducedMotion
            ? undefined
            : { scale, y, transformOrigin: "50% 100%" }
        }
      >
        {children}
      </motion.div>
      {!prefersReducedMotion && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-black"
          style={{ opacity: dim }}
        />
      )}
    </div>
  );
}
