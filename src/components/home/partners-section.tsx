"use client";

import { motion } from "framer-motion";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { TextTicker } from "@/components/motion/text-ticker";
import { useCountUp } from "@/hooks/use-count-up";
import { PARTNERS, TICKER_NAMES } from "@/data/partners";

interface Stat {
  label: string;
  end: number;
  decimals?: number;
  suffix?: string;
}

/** 회사 포트폴리오의 AT A GLANCE 지표. 원문 표기를 그대로 따릅니다. */
const STATS: Stat[] = [
  { label: "사전예약 1시간", end: 1400, suffix: "대" },
  { label: "누적 거래액 · 자사 집계", end: 100, suffix: "억+" },
  { label: "프랜차이즈 가맹", end: 20, suffix: "개점" },
  { label: "누적 크라우드펀딩", end: 10, suffix: "억+" },
];

function StatCounter({ stat }: { stat: Stat }) {
  const { ref, count } = useCountUp({
    end: stat.end,
    decimals: stat.decimals ?? 0,
    suffix: stat.suffix ?? "",
    duration: 1800,
  });

  return (
    <div
      ref={ref}
      className="flex flex-col-reverse border-b border-dashed border-[var(--rule)] py-6 even:pl-4 lg:border-b-0 lg:border-l lg:px-6 lg:py-2 lg:first:border-l-0 lg:first:pl-0 lg:even:pl-6 [&:nth-last-child(-n+2)]:border-b-0"
    >
      <dt className="mt-3 text-[13px] font-medium fg-muted md:text-[14px]">{stat.label}</dt>
      <dd className="text-[clamp(34px,6vw,120px)] font-semibold leading-[0.9] tracking-[-0.045em] tabular-nums">
        {count}
      </dd>
    </div>
  );
}

/**
 * Closing proof beat: who we build with, then what it produced. The partner
 * firms get named panels that invert on hover, every shipped name runs past in
 * one continuous line, and the numbers land on the signal band — the one
 * full-bleed use of the proof colour on the page.
 */
export function PartnersSection() {
  return (
    <section className="relative">
      <div className="tone-ink pb-[12vh] pt-[14vh]">
        <div className="rail">
          <MaskReveal
            as="h2"
            lines={["함께 성장한", "브랜드와 협력사"]}
            // t-display, not t-mega: at 8vw the Hangul headline runs past the
            // section and reads as a wall rather than a statement.
            className="t-display normal-case"
          />
        </div>

        {/* 협력사 */}
        <div className="mt-[8vh] rail">
          <h3 className="text-[14px] font-medium fg-faint">협력사</h3>
          <div className="mt-4 grid grid-cols-2 border-t border-dashed border-[var(--rule)] lg:grid-cols-4">
            {PARTNERS.map((partner, i) => (
              <motion.article
                key={partner.latin}
                className="group relative overflow-hidden border-b border-dashed border-[var(--rule)] p-5 odd:border-r transition-colors duration-500 hover:bg-white md:p-6 lg:border-b-0 lg:border-l lg:odd:border-r-0 lg:first:border-l-0"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              >
                <p className="text-[clamp(24px,2.6vw,44px)] font-semibold uppercase leading-none tracking-[-0.03em] transition-colors duration-500 group-hover:text-[var(--ink)]">
                  {partner.latin}
                </p>
                <p className="mt-2 t-body fg-muted transition-colors duration-500 group-hover:text-black/60">
                  {partner.name}
                </p>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Continuous name line */}
        <div className="mt-[10vh] border-y border-dashed border-[var(--rule)] py-5 md:py-6">
          <TextTicker items={TICKER_NAMES} durationSeconds={70} />
        </div>
      </div>

      {/* Numbers */}
      <div className="tone-signal py-[10vh] md:py-[12vh]">
        <div className="rail">
          <p className="max-w-[30ch] text-[clamp(18px,1.6vw,24px)] font-semibold leading-snug tracking-[-0.02em]">
            기획서가 아니라 숫자로 남은 것들
          </p>
          <dl className="mt-8 grid grid-cols-2 md:mt-12 lg:grid-cols-4">
            {STATS.map((stat) => (
              <StatCounter key={stat.label} stat={stat} />
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
