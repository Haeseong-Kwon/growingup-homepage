"use client";

import { motion } from "framer-motion";
import { BandWipe, GrowRule } from "@/components/motion/band-wipe";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { ParallaxPlate } from "@/components/motion/parallax-plate";
import { DURATION, DURATION_HEADING, EASE, REVEAL_VIEWPORT, STAGGER } from "@/lib/motion";

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

/**
 * Third beat: a plate drifts slowly against the scroll, and a
 * solid band wipes across to uncover the brand mark. The three pillars are then
 * stitched together with dashed rules that draw themselves in.
 */
export function PillarsSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--ink)] text-white">
      <ParallaxPlate
        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1280&fit=crop"
        className="opacity-30"
      />
      <div aria-hidden className="absolute inset-0 bg-[var(--ink)]/55" />

      <div className="relative flex flex-col justify-center py-[14vh] md:min-h-[100svh]">
        <BandWipe text="GROWING UP — GROWING UP — GROWING UP" />

        {/* Paired marks split by a rule that grows out from the centre */}
        <div className="relative mt-[10vh] flex items-center justify-center gap-[12%] rail md:gap-[17%]">
          <GrowRule className="absolute left-1/2 top-1/2 h-[clamp(56px,7vw,120px)] -translate-x-1/2 -translate-y-1/2" />
          {BAND_MARKS.map((mark, i) => (
            <motion.span
              key={mark}
              className="text-[clamp(28px,3vw,72px)] font-semibold uppercase leading-none tracking-[-0.01em]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.12 }}
            >
              {mark}
            </motion.span>
          ))}
        </div>

        <div className="mt-[8vh] rail">
          <p className="mx-auto max-w-[44ch] text-center t-body text-white/75">
            5단계 운영 루프로 런칭의 불확실성을 체계적으로 관리하며, 각 단계마다
            명확한 산출물과 의사결정 기준을 제공합니다.
          </p>
        </div>
      </div>

      {/* Pillar detail — each pillar gets a full-width row. Its one-word mark is
          set as large as the rail allows, in outline, and fills solid on hover:
          the word is the pillar, the sentence beside it is the footnote. */}
      <div className="relative rail pb-[14vh]">
        <p className="t-label text-white/45">(What we stand on)</p>
        <MaskReveal
          as="h2"
          lines={["What we", "stand on"]}
          className="mt-3 t-display text-white"
        />
        <ul className="mt-12 border-t border-dashed border-[var(--rule)] md:mt-16">
          {PILLARS.map((pillar, i) => (
            <li
              key={pillar.title}
              className="group grid items-end gap-5 border-b border-dashed border-[var(--rule)] py-7 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] md:gap-10 md:py-10"
            >
              {/* The in-view trigger sits on the mask, not the word: the word
                  starts clipped below the mask, so it would never intersect. */}
              <motion.span
                className="mask-line"
                initial="hidden"
                whileInView="visible"
                viewport={REVEAL_VIEWPORT}
              >
                <motion.span
                  className="block text-[clamp(80px,17vw,300px)] font-semibold uppercase leading-[0.8] tracking-[-0.055em] text-transparent transition-colors duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [-webkit-text-stroke:1px_rgba(255,255,255,0.6)] group-hover:text-white"
                  variants={{ hidden: { y: "105%" }, visible: { y: "0%" } }}
                  transition={{ duration: DURATION_HEADING, ease: EASE, delay: i * STAGGER }}
                >
                  {pillar.mark}
                </motion.span>
              </motion.span>
              <motion.div
                className="md:pb-[0.6vw]"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={REVEAL_VIEWPORT}
                transition={{ duration: DURATION, ease: EASE, delay: 0.15 + i * STAGGER }}
              >
                <h3 className="text-[clamp(22px,2.2vw,38px)] font-semibold leading-[1.15] tracking-[-0.03em]">
                  {pillar.title}
                </h3>
                <p className="mt-3 max-w-[40ch] t-lead text-white/70">{pillar.body}</p>
              </motion.div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
