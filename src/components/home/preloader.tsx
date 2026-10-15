"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { setScrollLocked } from "@/components/layout/smooth-scroll";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { isIntroDone, markIntroDone } from "@/lib/intro-store";
import { EASE, EASE_IN_OUT } from "@/lib/motion";

const WORDMARK = "GROWING UP";
/** Count length. Eased, so the last stretch slows the way a real load does. */
const COUNT_MS = 1500;
/** Beat held on 100 before the curtain opens. */
const HOLD_MS = 180;
const SPLIT_S = 1.0;

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Front-door intro. The wordmark rises letter by letter while a count runs to
 * 100, then the sheet splits horizontally and the two halves part to reveal the
 * hero — which starts its own entrance the moment the split begins.
 *
 * Plays once per hard load: client-side returns to the homepage skip it.
 */
export function Preloader() {
  const prefersReducedMotion = useReducedMotion();
  // Server and first client render agree (curtain present); a client-side
  // navigation back home mounts with the intro already done and renders nothing.
  const [isVisible, setIsVisible] = useState(() => !isIntroDone());
  const [count, setCount] = useState(0);
  const [isSplitting, setIsSplitting] = useState(false);

  useEffect(() => {
    if (!isVisible) return;
    window.scrollTo(0, 0);
    setScrollLocked(true);

    if (prefersReducedMotion) {
      markIntroDone();
      setScrollLocked(false);
      setIsVisible(false);
      return;
    }

    let frame = 0;
    let start: number | null = null;
    let holdTimer = 0;

    const tick = (now: number) => {
      start ??= now;
      const t = Math.min((now - start) / COUNT_MS, 1);
      setCount(Math.round(easeOutCubic(t) * 100));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
        return;
      }
      holdTimer = window.setTimeout(() => {
        setIsSplitting(true);
        markIntroDone();
      }, HOLD_MS);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(holdTimer);
      setScrollLocked(false);
    };
  }, [isVisible, prefersReducedMotion]);

  const half = (edge: "top" | "bottom") => (
    <motion.div
      className="absolute inset-x-0 h-1/2 bg-[var(--ink)]"
      style={{ [edge]: 0 }}
      initial={false}
      animate={{ y: isSplitting ? (edge === "top" ? "-100%" : "100%") : "0%" }}
      transition={{ duration: SPLIT_S, ease: EASE_IN_OUT }}
      onAnimationComplete={() => {
        if (isSplitting && edge === "top") {
          setScrollLocked(false);
          setIsVisible(false);
        }
      }}
    />
  );

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          aria-hidden
          className="fixed inset-0 z-[10001] text-white"
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
        >
          {half("top")}
          {half("bottom")}

          {/* Content sits over both halves and clears out just before they part. */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-between px-[var(--gut)] pb-[calc(var(--gut)+env(safe-area-inset-bottom))] pt-[calc(var(--gut)+env(safe-area-inset-top))]"
            animate={{ opacity: isSplitting ? 0 : 1 }}
            transition={{ duration: 0.35 }}
          >
            <p className="t-label text-white/50">
              <span className="block">Growth Marketing</span>
              <span className="block">Seoul, KR</span>
            </p>

            <div>
              <p className="flex overflow-hidden whitespace-nowrap text-[15.4vw] font-semibold uppercase leading-[0.86] tracking-[-0.045em]">
                {WORDMARK.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ y: "105%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1.1, ease: EASE, delay: 0.1 + i * 0.045 }}
                  >
                    {char === " " ? " " : char}
                  </motion.span>
                ))}
              </p>

              <div className="mt-6 flex items-end justify-between gap-6 md:mt-8">
                <p className="max-w-[24ch] text-[13px] font-medium leading-snug text-white/55 md:text-[14px]">
                  런칭을 기획서가 아닌 매출과 데이터로 증명합니다
                </p>
                <span className="text-[clamp(28px,4vw,56px)] font-semibold leading-none tracking-[-0.04em] tabular-nums">
                  {String(count).padStart(3, "0")}
                </span>
              </div>

              <div className="mt-4 h-px w-full bg-white/15">
                <div
                  className="h-full origin-left bg-white"
                  style={{ transform: `scaleX(${count / 100})` }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
