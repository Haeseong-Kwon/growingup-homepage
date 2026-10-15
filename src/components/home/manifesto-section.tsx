"use client";

import { useRef } from "react";
import { Cube3D } from "@/components/motion/cube-3d";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { TextTicker } from "@/components/motion/text-ticker";

/** Right face of the cube: the vocabulary the operating system runs on. */
const WORD_ROWS: string[][] = [
  ["growth", "marketing"],
  ["growingup", "marketing os"],
  ["research", "strategy"],
  ["execution", "matching"],
  ["feedback", "learning"],
  ["data", "evidence"],
  ["funnel", "creative"],
  ["media", "buying"],
  ["seo", "content"],
  ["roas", "cac"],
  ["launch", "scale"],
  ["from brief", "to revenue"],
];

const MARQUEE = Array.from({ length: 6 }, () => ({ name: "GROWING UP" }));

/**
 * Second beat: a scroll-driven cube turns from plate to vocabulary while the
 * positioning statement holds beside it. The track is 180vh so the turn has room
 * to complete under the pin without leaving an empty viewport behind it.
 */
export function ManifestoSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative bg-[var(--ink)] text-white">
      <div className="border-y border-white/10 py-5">
        <TextTicker
          items={MARQUEE}
          durationSeconds={45}
          itemClassName="text-[clamp(28px,5vw,72px)] font-semibold uppercase tracking-[-0.03em] !text-white/15"
          gap="clamp(24px, 4vw, 64px)"
        />
      </div>

      <div ref={trackRef} className="relative h-[150vh] lg:h-[180vh]">
        <div className="sticky top-0 flex h-[100svh] items-center">
          <div className="grid w-full items-center gap-10 rail lg:grid-cols-[1fr_auto] lg:gap-16">
            {/* Explicit px, not `ch`: a ch-based max-width resolves against the
                parent's 15px body size and would clip the 80px display type. */}
            <div className="max-w-[900px]">
              <p className="t-label text-white/45">(Why GrowingUp)</p>
              <MaskReveal
                as="h2"
                lines={["왜", "GrowingUp인가"]}
                className="mt-4 text-[clamp(3.2rem,7.2vw,9rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-white"
              />
              <p className="mt-8 max-w-[34ch] t-lead text-white/75">
                데이터 기반의 정확한 진단과 실행력으로 비즈니스의 본질적인 성장을
                만들어갑니다. 추측이 아닌 근거로 의사결정하고, 실행한 결과를 다시
                학습으로 되돌립니다.
              </p>
            </div>

            <Cube3D
              trackRef={trackRef}
              image="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=900&h=900&fit=crop"
              imageAlt="GrowingUp 팀의 작업 공간"
              wordRows={WORD_ROWS}
              // Mid-turn the near face swings toward the viewer and widens; the
              // inset keeps that face from running off the right edge.
              className="lg:mr-[6vw]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
