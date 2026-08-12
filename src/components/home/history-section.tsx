"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { CATEGORY_ARC, HISTORY, type HistoryEntry, type HistoryYear } from "@/data/history";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * 타임라인 한 항목. 왼쪽 점선 레일 위의 점이 먼저 찍히고 본문이 따라 올라옵니다 —
 * 페이지의 다른 리스트 행과 같은 등장 방식이라 별도의 어휘를 만들지 않습니다.
 */
function Entry({ entry, index }: { entry: HistoryEntry; index: number }) {
  return (
    <motion.li
      className="relative pb-12 last:pb-0"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.85, ease: EASE, delay: index * 0.05 }}
    >
      {/* 레일 위의 점. 마일스톤은 채워지고 링을 답니다. */}
      <motion.span
        aria-hidden
        className={
          entry.key
            ? "absolute left-[calc(-1*var(--rail-gap)-5px)] top-[9px] h-[11px] w-[11px] rounded-full bg-white ring-[5px] ring-white/12"
            : "absolute left-[calc(-1*var(--rail-gap)-5px)] top-[9px] h-[11px] w-[11px] rounded-full border border-white/45 bg-[var(--ink)]"
        }
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 0.6, ease: EASE, delay: index * 0.05 + 0.1 }}
      />

      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="t-label text-white/40">{entry.when}</span>
        <span className="rule-box px-2.5 py-0.5 t-label text-white/55">{entry.category}</span>
      </div>

      <h3
        className={
          entry.key
            ? "mt-3 text-[clamp(20px,2.1vw,34px)] font-semibold leading-[1.2] tracking-[-0.025em] text-white"
            : "mt-3 text-[clamp(17px,1.6vw,26px)] font-semibold leading-[1.25] tracking-[-0.02em] text-white/90"
        }
      >
        {entry.title}
      </h3>

      <p className="mt-3 max-w-[62ch] t-body text-white/55">{entry.body}</p>

      {entry.highlight && (
        <p className="mt-5 border-l border-white pl-4 t-body font-semibold text-white">
          {entry.highlight}
        </p>
      )}

      {entry.facts && (
        <div className="mt-5 flex flex-wrap gap-3">
          {entry.facts.map((fact) => (
            <div key={fact.label} className="rule-box px-4 py-2.5">
              <span className="block t-label text-white/40">{fact.label}</span>
              <span className="mt-1 block text-[clamp(15px,1.2vw,19px)] font-semibold tracking-[-0.02em] text-white">
                {fact.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </motion.li>
  );
}

/**
 * 한 해. 연도는 그 해의 항목이 지나가는 동안 붙어 있고(sticky), 항목 옆의 실선은
 * 스크롤에 맞춰 위에서 아래로 그어집니다 — 점선 레일 위를 지나간 만큼만 실선이 됩니다.
 */
function YearBlock({ year, blockIndex }: { year: HistoryYear; blockIndex: number }) {
  const listRef = useRef<HTMLOListElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 78%", "end 62%"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.4,
    restDelta: 0.001,
  });
  const scaleY = useTransform(smooth, [0, 1], [0, 1]);

  return (
    <div className="grid gap-y-8 border-t border-dashed border-[var(--rule)] py-10 md:grid-cols-[minmax(0,180px)_1fr] md:gap-x-12 md:py-14">
      <div className="md:sticky md:top-[calc(var(--header-h)+48px)] md:self-start">
        <MaskReveal
          as="p"
          lines={[year.year]}
          className="text-[clamp(38px,4.4vw,76px)] font-semibold leading-[0.9] tracking-[-0.04em] text-white"
          delay={blockIndex * 0.04}
        />
        <p className="mt-3 t-label text-white/40">{year.label}</p>
      </div>

      <ol
        ref={listRef}
        className="relative border-l border-dashed border-[var(--rule)]"
        style={{ "--rail-gap": "clamp(24px, 3vw, 44px)", paddingLeft: "var(--rail-gap)" } as React.CSSProperties}
      >
        {/* 점선 위에 겹쳐 그리는 진행선. 점선을 지우지 않고 덮습니다. */}
        {!prefersReducedMotion && (
          <motion.span
            aria-hidden
            className="absolute -left-px top-0 h-full w-px origin-top bg-white/70"
            style={{ scaleY }}
          />
        )}

        {year.entries.map((entry, i) => (
          <Entry key={entry.title} entry={entry} index={i} />
        ))}
      </ol>
    </div>
  );
}

/**
 * 연혁. 고려대 창업스튜디오 3층에서 시작해 네 개 산업을 지나온 3년을, 해마다
 * 고정되는 연도와 스크롤을 따라 그어지는 선으로 읽게 만듭니다. 앞머리의 네 칸은
 * 그 3년이 어떤 카테고리를 거쳐 왔는지를 한눈에 요약합니다.
 */
export function HistorySection() {
  return (
    <section id="history" className="bg-[var(--ink)] py-[12vh] text-white">
      <div className="rail">
        <p className="t-label text-white/45">(History)</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-8">
          <MaskReveal as="h2" lines={["연혁"]} className="t-display normal-case text-white" />
          <p className="max-w-[44ch] pb-2 t-body text-white/60">
            고려대학교 창업스튜디오 3층에서 시작해, 우리 제품을 먼저 팔아보고, 그
            방법을 다른 브랜드에 적용해 온 3년의 기록입니다.
          </p>
        </div>

        {/* 4개 카테고리 — 평균 3.5개월마다 새 카테고리의 런칭을 겪었다는 사실 */}
        <div className="mt-14 grid border-t border-dashed border-[var(--rule)] sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORY_ARC.map((arc, i) => (
            <motion.article
              key={arc.year}
              className="group border-b border-dashed border-[var(--rule)] py-7 transition-colors duration-500 lg:border-b-0 lg:border-l lg:px-6 lg:first:border-l-0 lg:first:pl-0"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-12% 0px -12% 0px" }}
              transition={{ duration: 0.85, ease: EASE, delay: i * 0.08 }}
            >
              <span className="t-label text-white/40">{arc.year}</span>
              <h3 className="mt-5 text-[clamp(24px,2.4vw,40px)] font-semibold leading-none tracking-[-0.03em] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5">
                {arc.field}
              </h3>
              <p className="mt-4 t-body font-semibold text-white/90">{arc.subject}</p>
              <p className="mt-1 t-body text-white/50">{arc.detail}</p>
            </motion.article>
          ))}
        </div>

        <p className="mt-10 max-w-[52ch] t-lead text-white/70">
          평균 3.5개월마다 새로운 카테고리의 런칭을 겪었습니다. 카테고리는 달랐지만,
          아이템을 다시 정의하는 방법은 같았습니다.
        </p>

        {/* 타임라인 */}
        <div className="mt-[10vh] border-b border-dashed border-[var(--rule)]">
          {HISTORY.map((year, i) => (
            <YearBlock key={year.year} year={year} blockIndex={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
