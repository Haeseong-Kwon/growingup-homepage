"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { servicesData } from "@/components/services/servicesData";

const EASE = [0.16, 1, 0.3, 1] as const;

const TERM: Record<string, string> = {
  sprint: "Short-term",
  partner: "Long-term",
};

/**
 * The two ways to work together, pulled straight from the services data so the
 * homepage and /services can never drift apart. Two tall panels split by a
 * dashed rule, each inverting to paper on hover.
 */
export function EngagementsSection() {
  return (
    <section className="bg-[var(--ink)] py-[12vh] text-white">
      <div className="rail">
        <p className="t-label text-white/45">(How we work)</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-8">
          <MaskReveal
            as="h2"
            lines={["Two ways", "to start"]}
            className="t-display text-white"
          />
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 border-b border-white pb-1 text-[13px] font-semibold uppercase"
          >
            Compare in detail
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>

      <div className="mt-14 grid border-t border-dashed border-[var(--rule)] lg:grid-cols-2">
        {servicesData.map((service, i) => (
          <motion.article
            key={service.id}
            className="group relative flex flex-col justify-between border-b border-dashed border-[var(--rule)] px-[var(--gut)] py-10 transition-colors duration-500 hover:bg-[var(--paper)] hover:text-[var(--ink)] lg:border-b-0 lg:border-l lg:first:border-l-0"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: 0.95, ease: EASE, delay: i * 0.1 }}
          >
            <header>
              <div className="flex items-center gap-3">
                <span className="t-label opacity-45">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="rule-box px-3 py-1 t-label transition-colors duration-500 group-hover:border-black/40">
                  {TERM[service.id] ?? "Program"}
                </span>
              </div>

              <h3 className="mt-7 text-[clamp(30px,3.4vw,64px)] font-semibold uppercase leading-[0.95] tracking-[-0.03em]">
                {service.title}
              </h3>
              <p className="mt-4 t-lead opacity-70">{service.description}</p>
            </header>

            <div className="mt-10">
              <p className="t-label opacity-45">Includes</p>
              <ul className="mt-3 space-y-1.5">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-baseline gap-3 t-body opacity-75">
                    <span aria-hidden className="opacity-50">
                      —
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <dl className="mt-8 grid gap-5 border-t border-dashed border-current/30 pt-6 sm:grid-cols-2">
                <div>
                  <dt className="t-label opacity-45">Suitable for</dt>
                  <dd className="mt-2 t-body opacity-75">{service.suitableFor}</dd>
                </div>
                <div>
                  <dt className="t-label opacity-45">Success criteria</dt>
                  <dd className="mt-2 t-body opacity-75">{service.successCriteria}</dd>
                </div>
              </dl>

              <Link
                href={`/services#${service.id}`}
                className="group/cta mt-8 inline-flex items-center gap-2 border-b border-current pb-1 text-[13px] font-semibold uppercase"
              >
                Start {service.title}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1 group-hover/cta:-translate-y-1" />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
