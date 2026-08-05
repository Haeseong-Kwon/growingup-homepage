"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export interface ProcessStep {
  title: string;
  description: string;
  outputs: string;
}

interface ProcessSectionProps {
  steps: ProcessStep[];
}

const EASE = [0.76, 0, 0.24, 1] as const;

/**
 * The operating loop as a run of dashed panels. Each panel is masked by a solid
 * cover that lifts away in sequence, so the steps arrive in reading order rather
 * than all at once.
 */
export function ProcessSection({ steps }: ProcessSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-[var(--ink)] py-[12vh] text-white">
      <div className="rail">
        <p className="t-label text-white/45">(Our process)</p>
        <MaskReveal
          as="h2"
          lines={["GrowingUp", "Marketing OS"]}
          className="mt-3 t-display text-white"
        />
        <p className="mt-5 max-w-[54ch] t-lead text-white/70">
          5단계 운영 루프로 런칭의 불확실성을 체계적으로 관리하며, 각 단계마다
          명확한 산출물과 의사결정 기준을 제공합니다.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((step, i) => (
          <article
            key={step.title}
            className="relative flex min-h-[46vh] flex-col justify-between overflow-hidden border-b border-dashed border-[var(--rule)] bg-[var(--ink-soft)] p-6 lg:min-h-[58vh] lg:border-b-0 lg:border-l lg:first:border-l-0"
          >
            {/* Cover lifts away to expose the panel it was hiding. */}
            <motion.div
              aria-hidden
              className="absolute inset-0 z-10 origin-top bg-[var(--ink)]"
              initial={prefersReducedMotion ? false : { scaleY: 1 }}
              whileInView={{ scaleY: 0 }}
              viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.1 + i * 0.11 }}
            />

            <header>
              <span className="t-label text-white/45">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-[clamp(22px,2vw,34px)] font-semibold leading-[1.05] tracking-[-0.02em]">
                {step.title}
              </h3>
              <p className="mt-4 t-body text-white/60">{step.description}</p>
            </header>

            {/* Fills the gap between the step and its output the way the
                reference does — the run of verticals ties the panels together. */}
            <div aria-hidden className="my-8 w-px flex-1 border-l border-dashed border-[var(--rule)]" />

            <footer className="border-t border-dashed border-[var(--rule)] pt-4">
              <span className="t-label text-white/45">Output</span>
              <p className="mt-2 t-body text-white/75">{step.outputs}</p>
            </footer>
          </article>
        ))}
      </div>

      <div className="mt-12 rail">
        <Link
          href="/apply"
          className="group inline-flex items-center gap-2 bg-white px-7 py-4 text-[13px] font-semibold uppercase text-[var(--ink)] transition-colors hover:bg-white/85"
        >
          외주 파트너 등록
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
