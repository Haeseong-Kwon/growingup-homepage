"use client";

import { motion } from "framer-motion";
import { BandWipe, GrowRule } from "@/components/motion/band-wipe";
import { MaskReveal } from "@/components/motion/mask-reveal";

/** The two words the band uncovers, set either side of the growing rule. */
const BAND_MARKS = ["Evidence", "Execution"];

const PILLARS = [
  {
    mark: "Data",
    title: "데이터 기반 전략",
    body: "추측이 아닌 데이터로 의사결정합니다. 정확한 분석을 통해 최적의 솔루션을 제시합니다.",
  },
  {
    mark: "Craft",
    title: "크리에이티브 실행력",
    body: "아이디어를 현실로 만드는 실행력. 빠르고 정확한 구현으로 시장을 선도합니다.",
  },
  {
    mark: "Loop",
    title: "지속적인 최적화",
    body: "한 번의 성공으로 끝나지 않습니다. 지속적인 모니터링과 개선으로 성장을 이어갑니다.",
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Third beat, and the first paper surface: the page turns from ink to sheet,
 * and an ink band wipes across to print the brand mark. The three pillars are
 * stitched together with dashed rules that draw themselves in.
 */
export function PillarsSection() {
  return (
    <section className="tone-paper relative overflow-hidden">
      <div className="relative flex flex-col justify-center pb-[10vh] pt-[14vh] md:min-h-[90svh]">
        <BandWipe text="GROWING UP — GROWING UP — GROWING UP" />

        {/* Paired marks split by a rule that grows out from the centre */}
        <div className="relative mt-[8vh] flex items-center justify-center gap-[12%] rail md:gap-[17%]">
          <GrowRule className="absolute left-1/2 top-1/2 h-[clamp(56px,7vw,120px)] -translate-x-1/2 -translate-y-1/2" />
          {BAND_MARKS.map((mark, i) => (
            <motion.span
              key={mark}
              className="text-[clamp(26px,3vw,72px)] font-semibold uppercase leading-none tracking-[-0.02em]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.12 }}
            >
              {mark}
            </motion.span>
          ))}
        </div>

        <div className="mt-[7vh] rail">
          <p className="mx-auto max-w-[44ch] text-center t-lead fg-muted">
            5단계 운영 루프로 런칭의 불확실성을 체계적으로 관리하며, 각 단계마다
            명확한 산출물과 의사결정 기준을 제공합니다.
          </p>
        </div>
      </div>

      {/* Pillar detail — dashed column grid, the specimen-sheet motif */}
      <div className="relative rail pb-[14vh]">
        <MaskReveal as="h2" lines={["What we", "stand on"]} className="t-display mb-10 md:mb-14" />
        <div className="grid rule-t md:grid-cols-3">
          {PILLARS.map((pillar, i) => (
            <motion.article
              key={pillar.title}
              className="group flex flex-col gap-3 border-b border-dashed border-[var(--rule)] py-8 md:gap-4 md:border-b-0 md:border-l md:px-7 md:py-10 md:first:border-l-0 md:first:pl-0"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.1 }}
            >
              <span className="text-[clamp(44px,5vw,88px)] font-semibold leading-[0.9] tracking-[-0.05em] text-transparent [-webkit-text-stroke:1px_var(--tone-fg)] transition-colors duration-500 group-hover:text-[var(--tone-fg)]">
                {pillar.mark}
              </span>
              <h3 className="mt-4 t-headline">{pillar.title}</h3>
              <p className="max-w-[36ch] t-body fg-muted">{pillar.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
