"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { updatesData } from "@/components/insights/insightsData";
import { DURATION, EASE, REVEAL_VIEWPORT } from "@/lib/motion";

/** Only entries with a written excerpt earn a slot on the front page. */
const FEATURED = updatesData.filter((update) => update.excerpt).slice(0, 3);

/**
 * The operating log. A dashed index where each row slides its title aside on
 * hover to expose the arrow — the reference's list-row behaviour.
 */
export function UpdatesSection() {
  return (
    <section className="bg-[var(--ink)] py-[12vh] text-white">
      <div className="rail">
        <p className="t-label text-white/45">(Operating log)</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-8">
          <MaskReveal
            as="h2"
            lines={["최근 업데이트"]}
            className="t-display normal-case text-white"
          />
          <Link
            href="/insights"
            className="group inline-flex items-center gap-2 relative after:absolute after:inset-x-0 after:-inset-y-2.5 after:content-[''] border-b border-white pb-1 text-[13px] font-semibold uppercase"
          >
            All updates
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>

        <ul className="mt-12 border-t border-dashed border-[var(--rule)]">
          {FEATURED.map((update, i) => (
            <motion.li
              key={update.id}
              className="border-b border-dashed border-[var(--rule)]"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={REVEAL_VIEWPORT}
              transition={{ duration: DURATION, ease: EASE, delay: i * 0.08 }}
            >
              {/* Same full-bleed invert as the deliverables rows: one vocabulary
                  for "this row is a thing you can open". */}
              <Link
                href={update.href}
                data-cursor="읽기"
                className="group relative -mx-[var(--gut)] grid items-baseline gap-3 px-[var(--gut)] py-8 md:grid-cols-[8rem_1fr_auto] md:gap-10 md:py-10"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-white transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100"
                />
                <span className="relative t-label tabular-nums text-white/40 transition-colors duration-500 group-hover:text-black/45">{update.date}</span>

                <div className="relative">
                  <h3 className="text-[clamp(22px,2.8vw,48px)] font-semibold leading-[1.08] tracking-[-0.035em] transition-[color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 group-hover:text-[var(--ink)]">
                    {update.title}
                  </h3>
                  <p className="mt-3 max-w-[60ch] t-body text-white/70 transition-colors duration-500 group-hover:text-black/65">
                    {update.excerpt}
                  </p>
                </div>

                <div className="relative flex items-center gap-4">
                  <span className="hidden gap-2 md:flex">
                    {update.badges.map((badge) => (
                      <span key={badge} className="rule-box px-2.5 py-1 t-label text-white/60 transition-colors duration-500 group-hover:border-black/30 group-hover:text-black/60">
                        {badge}
                      </span>
                    ))}
                  </span>
                  <ArrowUpRight className="h-6 w-6 shrink-0 -translate-x-2 text-[var(--ink)] opacity-0 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:opacity-100" />
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
