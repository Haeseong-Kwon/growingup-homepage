"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface DrawnFrameProps {
  className?: string;
  /** Label sat on the top edge, knocked out of the line. */
  label?: string;
  delay?: number;
  duration?: number;
}

/**
 * A hairline frame that draws itself around the viewport on load — the reference
 * opens with exactly this gesture before any content arrives.
 *
 * `preserveAspectRatio="none"` lets one path stretch to any viewport while
 * `vector-effect` keeps the stroke a true hairline at every aspect ratio.
 */
export function DrawnFrame({
  className,
  label,
  delay = 0.15,
  duration = 1.8,
}: DrawnFrameProps) {
  const prefersReducedMotion = useReducedMotion();

  // Starts at top-centre and runs both ways, so the frame closes at the top.
  const path = "M 50 0 L 100 0 L 100 100 L 0 100 L 0 0 L 50 0";

  return (
    <div className={cn("pointer-events-none absolute inset-0", className)}>
      <svg
        className="h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <motion.path
          d={path}
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
          pathLength={1}
          initial={prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : duration, ease: [0.65, 0, 0.35, 1], delay }}
        />
      </svg>

      {label && (
        <motion.span
          className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-[var(--ink)] px-3 t-label"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: delay + duration * 0.75 }}
        >
          {label}
        </motion.span>
      )}
    </div>
  );
}
