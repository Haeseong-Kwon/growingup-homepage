"use client";

import { motion } from "framer-motion";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { ParallaxPlate } from "@/components/motion/parallax-plate";
import { TextTicker } from "@/components/motion/text-ticker";
import { useCountUp } from "@/hooks/use-count-up";
import { PARTNERS, TICKER_NAMES } from "@/data/partners";
import { DURATION, EASE, REVEAL_VIEWPORT } from "@/lib/motion";

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
    duration: 1300,
  });

  return (
    <div
      ref={ref}
      className="border-b border-dashed border-[var(--rule)] py-6 max-lg:odd:pr-4 max-lg:even:pl-4 lg:border-b-0 lg:border-l lg:px-5 lg:first:border-l-0 lg:first:pl-0"
    >
      <p className="t-label text-white/45">{stat.label}</p>
      <p className="mt-2 text-[clamp(30px,5.5vw,110px)] font-semibold uppercase leading-[0.95] tracking-[-0.02em] tabular-nums">
        {count}
      </p>
    </div>
  );
}

/**
 * Closing beat: who we build with. The four partner firms get named panels that
 * invert on hover, then every name — partners and shipped brands — runs past in
 * a single continuous line, followed by the numbers those projects produced.
 */
export function PartnersSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--ink)] text-white">
      <ParallaxPlate
        src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&h=1280&fit=crop"
        className="opacity-20"
      />

      <div className="relative pb-[12vh] pt-[16vh]">
        <div className="rail">
          <p className="t-label text-white/45">(Collaboration)</p>
          <MaskReveal
            as="h2"
            lines={["함께 성장한", "브랜드와 협력사"]}
            // t-display, not t-mega: at 8vw the Hangul headline runs past the
            // section and reads as a wall rather than a statement.
            className="mt-3 t-display normal-case text-white"
          />
        </div>

        {/* 협력사 */}
        <div className="mt-[10vh] rail">
          <h3 className="t-label text-white/45">협력사 / Partners</h3>
          <div className="mt-5 grid grid-cols-2 border-t border-dashed border-[var(--rule)] lg:grid-cols-4">
            {PARTNERS.map((partner, i) => (
              <motion.article
                key={partner.latin}
                className="group relative overflow-hidden border-b border-dashed border-[var(--rule)] p-5 transition-colors duration-500 odd:border-r hover:bg-white md:p-6 lg:border-b-0 lg:border-l lg:odd:border-r-0 lg:first:border-l-0"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={REVEAL_VIEWPORT}
                transition={{ duration: DURATION, ease: EASE, delay: i * 0.08 }}
              >
                <span className="t-label text-white/45 transition-colors duration-500 group-hover:text-black/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-8 text-[clamp(26px,2.6vw,44px)] font-semibold uppercase leading-none tracking-[-0.03em] transition-colors duration-500 group-hover:text-[var(--ink)]">
                  {partner.latin}
                </p>
                <p className="mt-2 t-body text-white/70 transition-colors duration-500 group-hover:text-black/60">
                  {partner.name}
                </p>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Continuous name line */}
        <div className="mt-[10vh] border-y border-dashed border-[var(--rule)] py-6">
          <TextTicker items={TICKER_NAMES} durationSeconds={70} />
        </div>

        {/* Numbers */}
        <div className="mt-[8vh] rail">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat) => (
              <StatCounter key={stat.label} stat={stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
