"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ScrollWords } from "@/components/motion/scroll-words";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * The thesis, set as large as the grid allows over a plate that drifts against
 * the scroll. The sentence lights up word by word as it is read in — the one
 * place on the page where type itself is the motion.
 */
export function StatementBand() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.4,
    restDelta: 0.0005,
  });

  const plateY = useTransform(smooth, [0, 1], ["-12%", "12%"]);
  const plateScale = useTransform(smooth, [0, 0.5, 1], [1.14, 1.02, 1.14]);

  return (
    <section
      ref={ref}
      className="tone-ink relative flex min-h-[100svh] items-center overflow-hidden py-[16vh]"
    >
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={
          prefersReducedMotion ? undefined : { y: plateY, scale: plateScale }
        }
      >
        <div
          className="h-full w-full bg-cover bg-center opacity-25 grayscale"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&h=1280&fit=crop)",
          }}
        />
      </motion.div>
      <div aria-hidden className="absolute inset-0 bg-[var(--ink)]/45" />

      <div className="relative rail">
        <ScrollWords
          as="h2"
          text="When strategy meets execution, growth stops being a guess."
          className="max-w-[16ch] t-mega"
        />
        <p className="mt-10 max-w-[46ch] t-lead fg-muted md:mt-14">
          런칭은 감이 아니라 시스템입니다. 시장을 읽고, 가설을 세우고, 실행하고,
          결과를 다시 학습으로 되돌리는 하나의 루프. 그 루프를 대신 돌려드립니다.
        </p>
      </div>
    </section>
  );
}
