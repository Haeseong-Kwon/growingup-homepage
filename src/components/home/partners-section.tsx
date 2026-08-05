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

/** Figures already published elsewhere on the site — no new claims here. */
const STATS: Stat[] = [
  { label: "Units sold out", end: 3500, suffix: "대" },
  { label: "Store contracts", end: 20, suffix: "개" },
  { label: "Funding raised", end: 4, suffix: "억", decimals: 1 },
  { label: "Peak ROAS", end: 320, suffix: "%" },
];

function StatCounter({ stat }: { stat: Stat }) {
  const { ref, count } = useCountUp({
    end: stat.end,
    decimals: stat.decimals ?? 0,
    suffix: stat.suffix ?? "",
    duration: 1800,
    replay: true,
  });

  return (
    <div
      ref={ref}
      className="border-b border-dashed border-[var(--rule)] py-6 lg:border-b-0 lg:border-l lg:px-5 lg:first:border-l-0 lg:first:pl-0"
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
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-fixed bg-center opacity-20 grayscale"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&h=1280&fit=crop)",
        }}
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
          <div className="mt-5 grid border-t border-dashed border-[var(--rule)] sm:grid-cols-2 lg:grid-cols-4">
            {PARTNERS.map((partner, i) => (
              <motion.article
                key={partner.latin}
                className="group relative overflow-hidden border-b border-dashed border-[var(--rule)] p-6 transition-colors duration-500 hover:bg-white lg:border-b-0 lg:border-l lg:first:border-l-0"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-12% 0px -12% 0px" }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              >
                <span className="t-label text-white/45 transition-colors duration-500 group-hover:text-black/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-8 text-[clamp(26px,2.6vw,44px)] font-semibold uppercase leading-none tracking-[-0.03em] transition-colors duration-500 group-hover:text-[var(--ink)]">
                  {partner.latin}
                </p>
                <p className="mt-2 t-body text-white/60 transition-colors duration-500 group-hover:text-black/60">
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
