"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { updatesData } from "@/components/insights/insightsData";

const EASE = [0.16, 1, 0.3, 1] as const;

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
            className="group inline-flex items-center gap-2 border-b border-white pb-1 text-[13px] font-semibold uppercase"
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
              viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
              transition={{ duration: 0.85, ease: EASE, delay: i * 0.08 }}
            >
              <Link
                href={update.href}
                className="group grid items-baseline gap-3 py-7 md:grid-cols-[7rem_1fr_auto] md:gap-10"
              >
                <span className="t-label text-white/40">{update.date}</span>

                <div>
                  <h3 className="text-[clamp(18px,1.9vw,30px)] font-semibold leading-tight tracking-[-0.02em] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
                    {update.title}
                  </h3>
                  <p className="mt-2 max-w-[60ch] t-body text-white/55">
                    {update.excerpt}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="hidden gap-2 md:flex">
                    {update.badges.map((badge) => (
                      <span key={badge} className="rule-box px-2.5 py-1 t-label text-white/60">
                        {badge}
                      </span>
                    ))}
                  </span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 -translate-x-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
