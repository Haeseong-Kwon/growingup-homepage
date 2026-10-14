"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export interface ProcessStep {
  title: string;
  description: string;
  outputs: string;
}

interface ProcessSectionProps {
  steps: ProcessStep[];
}

/**
 * One stop on the loop. It switches on when the drawn line reaches it, so the
 * reader sees which step the scroll has "run" so far.
 */
function Step({
  step,
  index,
  count,
  progress,
  isStatic,
}: {
  step: ProcessStep;
  index: number;
  count: number;
  progress: MotionValue<number>;
  isStatic: boolean;
}) {
  const reach = index / count;
  const lit = useTransform(progress, [reach - 0.04, reach + 0.02], [0, 1]);
  const textOpacity = useTransform(lit, [0, 1], [0.38, 1]);

  return (
    <li className="relative pb-10 pl-9 last:pb-0 lg:pb-0 lg:pl-0 lg:pr-8 lg:pt-12">
      {/* Node, centred on the rail in either orientation. */}
      <span
        aria-hidden
        className="absolute left-0 top-[5px] h-[13px] w-[13px] -translate-x-1/2 rounded-full border border-white/50 bg-[var(--ink)] lg:left-0 lg:top-0 lg:-translate-y-1/2 lg:translate-x-0"
      >
        <motion.span
          className="absolute inset-[-1px] rounded-full bg-[var(--signal)] shadow-[0_0_0_6px_rgba(47,75,255,0.22)]"
          style={isStatic ? undefined : { opacity: lit, scale: lit }}
        />
      </span>

      <motion.div style={isStatic ? undefined : { opacity: textOpacity }}>
        <span className="text-[13px] font-semibold tabular-nums text-[var(--signal-soft)]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="mt-2 text-[clamp(24px,2.1vw,36px)] font-semibold leading-[1.05] tracking-[-0.03em]">
          {step.title}
        </h3>
        <p className="mt-3 max-w-[30ch] t-body fg-muted">{step.description}</p>
        <div className="mt-5 border-t border-dashed border-[var(--rule)] pt-3">
          <span className="t-label fg-faint">Output</span>
          <p className="mt-1.5 max-w-[30ch] text-[14px] leading-relaxed text-white/80">{step.outputs}</p>
        </div>
      </motion.div>
    </li>
  );
}

/**
 * The operating loop as a single drawn line. Scrolling draws it through the
 * five steps — across on desktop, down on phones — and each step lights as the
 * line reaches it. The sequence is the content, so the motion follows it.
 */
export function ProcessSection({ steps }: ProcessSectionProps) {
  const listRef = useRef<HTMLOListElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.8", "end 0.55"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4, restDelta: 0.001 });
  const line = prefersReducedMotion ? 1 : progress;

  return (
    <section className="tone-ink py-[14vh]">
      <div className="rail">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <MaskReveal as="h2" lines={["GrowingUp", "Marketing OS"]} className="t-display" />
          <p className="max-w-[40ch] pb-2 t-lead fg-muted">
            5단계 운영 루프로 런칭의 불확실성을 관리합니다. 단계마다 산출물과
            의사결정 기준이 남습니다.
          </p>
        </div>

        <ol
          ref={listRef}
          className="relative mt-14 grid border-l border-dashed border-white/25 lg:mt-20 lg:grid-cols-5 lg:border-l-0 lg:border-t"
        >
          {/* The drawn line, laid over the dashed rail it is tracing. */}
          <motion.span
            aria-hidden
            className="absolute -left-px top-0 h-full w-[2px] origin-top bg-[var(--signal)] lg:hidden"
            style={{ scaleY: line }}
          />
          <motion.span
            aria-hidden
            className="absolute -top-px left-0 hidden h-[2px] w-full origin-left bg-[var(--signal)] lg:block"
            style={{ scaleX: line }}
          />

          {steps.map((step, i) => (
            <Step
              key={step.title}
              step={step}
              index={i}
              count={steps.length}
              progress={progress}
              isStatic={prefersReducedMotion}
            />
          ))}
        </ol>

        <div className="mt-14 lg:mt-20">
          <Magnetic strength={0.25} className="inline-block w-full sm:w-auto">
            <Link
              href="/arena"
              className="group inline-flex h-12 w-full items-center justify-center gap-2 bg-white px-7 text-[14px] font-semibold text-[var(--ink)] transition-colors duration-300 hover:bg-[var(--signal)] hover:text-white sm:w-auto"
            >
              외주 파트너로 참여하기
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
