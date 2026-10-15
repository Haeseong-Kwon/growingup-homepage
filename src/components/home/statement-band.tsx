"use client";

import { MaskReveal } from "@/components/motion/mask-reveal";
import { ParallaxPlate } from "@/components/motion/parallax-plate";

/**
 * The thesis, set as large as the grid allows over a plate that drifts against
 * the scroll. Scrubbed rather than triggered, so it tracks in both directions.
 */
export function StatementBand() {
  return (
    <section
      className="relative flex min-h-[92svh] items-center overflow-hidden bg-[var(--ink)] py-[14vh] text-white"
    >
      {/* Oversized plate: its edge can never drift into frame, which the old
          scale-and-shift pair allowed near both ends of the scroll. */}
      <ParallaxPlate
        src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&h=1280&fit=crop"
        className="opacity-25"
      />
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
