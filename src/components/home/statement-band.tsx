"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * The thesis, set as large as the grid allows over a plate that drifts against
 * the scroll. Scrubbed rather than triggered, so it tracks in both directions.
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
      className="relative flex min-h-[92svh] items-center overflow-hidden bg-[var(--ink)] py-[14vh] text-white"
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
        <p className="t-label text-white/50">(What we believe)</p>
        <MaskReveal
          as="h2"
          lines={["When strategy meets", "execution, growth", "stops being a guess."]}
          className="mt-6 t-mega text-white"
          stagger={0.08}
        />
        <p className="mt-10 max-w-[54ch] t-lead text-white/70">
          런칭은 감이 아니라 시스템입니다. 시장을 읽고, 가설을 세우고, 실행하고,
          결과를 다시 학습으로 되돌리는 하나의 루프. 그 루프를 대신 돌려드립니다.
        </p>
      </div>
    </section>
  );
}
