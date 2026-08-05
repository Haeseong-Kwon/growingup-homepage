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

/**
 * Third beat: a fixed plate holds still while the page scrolls over it, and a
 * solid band wipes across to uncover the brand mark. The three pillars are then
 * stitched together with dashed rules that draw themselves in.
 */
export function PillarsSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--ink)] text-white">
      {/* Fixed plate: stays put under the scroll, which reads as depth without
          any transform work. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-fixed bg-center opacity-30 grayscale"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1280&fit=crop)",
        }}
      />
      <div aria-hidden className="absolute inset-0 bg-[var(--ink)]/55" />

      <div className="relative flex min-h-[100svh] flex-col justify-center py-[14vh]">
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
              viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 }}
            >
              {mark}
            </motion.span>
          ))}
        </div>

        <div className="mt-[8vh] rail">
          <p className="mx-auto max-w-[52ch] text-center t-body text-white/70">
            5단계 운영 루프로 런칭의 불확실성을 체계적으로 관리하며, 각 단계마다
            명확한 산출물과 의사결정 기준을 제공합니다.
          </p>
        </div>
      </div>

      {/* Pillar detail — dashed column grid, the reference's specimen-sheet motif */}
      <div className="relative rail pb-[14vh]">
        <MaskReveal
          as="h2"
          lines={["What we", "stand on"]}
          className="t-display mb-12 text-white"
        />
        <div className="grid rule-t md:grid-cols-3">
          {PILLARS.map((pillar, i) => (
            <motion.article
              key={pillar.title}
              className="flex flex-col gap-4 py-8 md:border-l md:border-dashed md:border-[var(--rule)] md:px-7 md:first:border-l-0 md:first:pl-0"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-12% 0px -12% 0px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
            >
              <span className="t-label text-white/45">0{i + 1}</span>
              <h3 className="t-headline">{pillar.title}</h3>
              <p className="t-body text-white/60">{pillar.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
