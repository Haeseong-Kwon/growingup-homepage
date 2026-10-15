"use client";

import { MaskReveal } from "@/components/motion/mask-reveal";
import { ParallaxPlate } from "@/components/motion/parallax-plate";
import { TextTicker } from "@/components/motion/text-ticker";
import { useCountUp } from "@/hooks/use-count-up";
import { PARTNERS, TICKER_NAMES } from "@/data/partners";

const PARTNER_RAIL = PARTNERS.map((partner) => ({ name: partner.latin, featured: true }));
const BRAND_RAIL = TICKER_NAMES.filter((item) => !("featured" in item));

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

        {/* Who we build with, as two oversized rails running against each
            other: partner firms set solid, shipped brands set in outline. */}
        <div className="mt-[8vh] border-y border-dashed border-[var(--rule)] py-6 md:py-9">
          <h3 className="sr-only">협력사와 함께한 브랜드</h3>
          <TextTicker
            items={PARTNER_RAIL}
            durationSeconds={36}
            gap="clamp(36px, 6vw, 120px)"
            itemClassName="text-[clamp(56px,10vw,184px)] uppercase leading-[0.92] tracking-[-0.05em]"
          />
          <TextTicker
            items={BRAND_RAIL}
            durationSeconds={48}
            reverse
            gap="clamp(36px, 6vw, 120px)"
            className="mt-2 md:mt-4"
            itemClassName="text-[clamp(44px,7.6vw,140px)] leading-[0.98] tracking-[-0.045em] !text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.55)] hover:!text-white"
          />
        </div>

        <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 rail">
          <dt className="t-label text-white/45">협력사</dt>
          {PARTNERS.map((partner) => (
            <dd key={partner.latin} className="t-body text-white/70">
              <span className="font-semibold text-white">{partner.latin}</span> {partner.name}
            </dd>
          ))}
        </dl>

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
