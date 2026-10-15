"use client";

import { motion } from "framer-motion";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { DURATION, EASE, REVEAL_VIEWPORT, STAGGER } from "@/lib/motion";

interface DeliverableGroup {
  title: string;
  latin: string;
  description: string;
  items: string[];
}

/** Mirrors the deliverables already published on /capabilities. */
const GROUPS: DeliverableGroup[] = [
  {
    title: "조사 · 분석",
    latin: "Research",
    description: "시장의 기회를 발견하는 데이터 분석",
    items: ["3C 분석 (고객/경쟁/자사)", "타겟 페르소나 카드", "STP 프레임워크", "포지셔닝 맵"],
  },
  {
    title: "전략 · 기획",
    latin: "Strategy",
    description: "성공 확률을 높이는 정교한 설계",
    items: ["채널별 KPI 설정", "미디어믹스 플랜", "예산 배분 시뮬레이션", "실행 로드맵"],
  },
  {
    title: "제작 · 실행",
    latin: "Production",
    description: "고객의 마음을 움직이는 크리에이티브",
    items: ["크리에이티브 가이드", "숏폼/롱폼 콘텐츠", "상세페이지 기획", "광고 소재 패키지"],
  },
  {
    title: "측정 · 학습",
    latin: "Learning",
    description: "지속적 성장을 위한 데이터 자산화",
    items: ["주간 성과 리포트", "월간 인사이트 리뷰", "학습 DB 업데이트", "넥스트 액션 플랜"],
  },
];

/**
 * What the engagement actually hands over. Four stacked rows rather than cards:
 * each row spans the full rail so the deliverable lists read as a spec sheet,
 * which is how the reference presents its process block.
 */
export function DeliverablesSection() {
  return (
    <section className="bg-[var(--ink)] py-[12vh] text-white">
      <div className="rail">
        <p className="t-label text-white/45">(Deliverables)</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-8">
          <MaskReveal
            as="h2"
            lines={["What you", "actually get"]}
            className="t-display text-white"
          />
          <p className="max-w-[40ch] pb-2 t-body text-white/70">
            모호한 조언이 아닌, 실체 있는 결과물을 제공합니다. 모든 산출물은 귀사의
            영구적인 자산이 됩니다.
          </p>
        </div>
      </div>

      <div className="mt-14 rail">
        <ul className="border-t border-dashed border-[var(--rule)]">
          {GROUPS.map((group, i) => (
            <motion.li
              key={group.title}
              // Full-bleed row: a white sheet wipes up from the bottom edge on
              // hover and the type inverts with it, so the row you're reading
              // is the only lit thing on the page.
              className="group relative -mx-[var(--gut)] grid gap-5 border-b border-dashed border-[var(--rule)] px-[var(--gut)] py-9 md:grid-cols-[auto_1.1fr_1.3fr] md:gap-12 md:py-12"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={REVEAL_VIEWPORT}
              transition={{ duration: DURATION, ease: EASE, delay: i * STAGGER }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-white transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100"
              />

              <span className="relative t-label text-white/40 transition-colors duration-500 group-hover:text-black/45 md:w-16">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="relative">
                <h3 className="text-[clamp(30px,3.6vw,64px)] font-semibold leading-[0.95] tracking-[-0.04em] transition-[color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 group-hover:text-[var(--ink)]">
                  {group.title}
                </h3>
                <p className="mt-3 t-label text-white/40 transition-colors duration-500 group-hover:text-black/45">{group.latin}</p>
                <p className="mt-4 max-w-[34ch] t-lead text-white/70 transition-colors duration-500 group-hover:text-black/70">{group.description}</p>
              </div>

              <ul className="relative grid content-end gap-x-8 gap-y-2.5 sm:grid-cols-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-3 t-body text-white/75 transition-colors duration-500 group-hover:text-[var(--ink)]"
                  >
                    <span aria-hidden className="text-white/30 transition-colors duration-500 group-hover:text-black/35">
                      —
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
