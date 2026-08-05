"use client";

import { motion } from "framer-motion";
import { MaskReveal } from "@/components/motion/mask-reveal";

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

const EASE = [0.16, 1, 0.3, 1] as const;

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
          <p className="max-w-[40ch] pb-2 t-body text-white/60">
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
              className="group grid gap-6 border-b border-dashed border-[var(--rule)] py-9 md:grid-cols-[auto_1fr_1.4fr] md:gap-12"
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.07 }}
            >
              <span className="t-label text-white/40 md:w-16">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div>
                <h3 className="text-[clamp(22px,2.3vw,40px)] font-semibold leading-none tracking-[-0.025em] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
                  {group.title}
                </h3>
                <p className="mt-2 t-label text-white/40">{group.latin}</p>
                <p className="mt-4 t-body text-white/60">{group.description}</p>
              </div>

              <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-3 t-body text-white/70"
                  >
                    <span aria-hidden className="text-white/30">
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
