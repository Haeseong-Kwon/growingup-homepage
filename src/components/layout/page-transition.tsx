"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Solid panel that lifts off the incoming page on every route change, so
 * navigation reads as one continuous surface rather than a hard swap.
 *
 * Reveal-only: the panel is already covering when the new route mounts and
 * retracts upward. Covering the *outgoing* page would mean intercepting every
 * link click — not worth the interaction cost for the same perceived effect.
 */
export function PageTransition() {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      key={pathname}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9998] origin-top bg-[var(--ink)]"
      initial={{ scaleY: 1 }}
      animate={{ scaleY: 0 }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
    />
  );
}
