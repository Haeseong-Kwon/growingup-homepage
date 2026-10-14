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
    <section className="tone-paper py-[12vh]">
      <div className="rail">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <MaskReveal
            as="h2"
            lines={["최근 업데이트"]}
            className="t-display normal-case"
          />
          <Link
            href="/insights"
            className="group inline-flex h-11 items-center gap-2 border-b border-current text-[14px] font-semibold"
          >
            전체 업데이트 보기
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
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              transition={{ duration: 0.85, ease: EASE, delay: i * 0.08 }}
            >
              <Link
                href={update.href}
                className="group relative grid items-baseline gap-2 py-7 md:grid-cols-[7rem_1fr_auto] md:gap-10 md:py-9"
              >
                <span className="t-label fg-faint tabular-nums">{update.date}</span>

                <div>
                  <h3 className="text-[clamp(18px,1.9vw,30px)] font-semibold leading-tight tracking-[-0.02em] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
                    {update.title}
                  </h3>
                  <p className="mt-2 max-w-[60ch] t-body fg-muted">
                    {update.excerpt}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="hidden gap-2 md:flex">
                    {update.badges.map((badge) => (
                      <span key={badge} className="rule-box px-2.5 py-1 t-label fg-muted">
                        {badge}
                      </span>
                    ))}
                  </span>
                  <ArrowUpRight className="hidden h-5 w-5 shrink-0 -translate-x-2 text-[var(--signal)] opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 md:block" />
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
