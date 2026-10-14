"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const WIPE = [0.76, 0, 0.24, 1] as const;

/**
 * Two stacked panels lift off the incoming page on every route change — a signal
 * sliver leads, the ink sheet follows — so navigation reads as one continuous
 * surface rather than a hard swap.
 *
 * Skipped on first load: the hero owns that moment, and covering it would only
 * delay the first paint of real content.
 */
export function PageTransition() {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const [lastPath, setLastPath] = useState(pathname);
  const [hasNavigated, setHasNavigated] = useState(false);

  // Derived during render (React's sanctioned "adjust state on prop change").
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setHasNavigated(true);
  }

  if (prefersReducedMotion || !hasNavigated) return null;

  return (
    <div key={pathname} aria-hidden className="pointer-events-none fixed inset-0 z-[9998]">
      <motion.div
        className="absolute inset-0 origin-top bg-[var(--signal)]"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.9, ease: WIPE, delay: 0.08 }}
      />
      <motion.div
        className="absolute inset-0 origin-top bg-[var(--ink)]"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.8, ease: WIPE }}
      />
    </div>
  );
}
