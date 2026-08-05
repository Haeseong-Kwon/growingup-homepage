"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export interface WorkItem {
  category: string;
  title: string;
  summary: string;
  result?: string;
  href: string;
  image: string;
}

interface WorksSectionProps {
  items: WorkItem[];
}

/**
 * Coverflow attitude for one card. The reel's own `x` tells us where this card
 * currently sits relative to the middle of the screen; that offset drives a
 * Y-rotation and a push back in depth, so cards turn to face you as they reach
 * centre and turn away again as they leave.
 *
 * `centre` is the card's static distance from the track origin, measured once
 * per layout — combining it with the live `x` avoids per-frame DOM reads.
 */
function useCoverflow(
  x: MotionValue<number>,
  centre: number,
  enabled: boolean
) {
  const offset = useTransform(x, (value) => {
    if (!enabled || typeof window === "undefined") return 0;
    // Normalised: 0 at screen centre, ±1 roughly one half-viewport away.
    return (centre + value - window.innerWidth / 2) / (window.innerWidth / 2);
  });

  const rotateY = useTransform(offset, [-1.6, 0, 1.6], [34, 0, -34]);
  const z = useTransform(offset, [-1.6, 0, 1.6], [-260, 40, -260]);
  const opacity = useTransform(offset, [-2.1, -1.4, 0, 1.4, 2.1], [0.25, 0.75, 1, 0.75, 0.25]);

  return { rotateY, z, opacity };
}

function WorkCard({
  item,
  index,
  x,
  enabled,
}: {
  item: WorkItem;
  index: number;
  x: MotionValue<number>;
  enabled: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [centre, setCentre] = useState(0);

  useEffect(() => {
    // offsetLeft resolves against the pinned section, which spans the viewport —
    // so this is the card's x before the reel's own translation is applied.
    const measure = () => {
      const el = ref.current;
      if (el) setCentre(el.offsetLeft + el.offsetWidth / 2);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { rotateY, z, opacity } = useCoverflow(x, centre, enabled);

  return (
    <motion.div
      ref={ref}
      className="shrink-0 will-change-transform"
      style={
        enabled
          ? { rotateY, z, opacity, transformStyle: "preserve-3d" }
          : undefined
      }
    >
    <Link
      href={item.href}
      className="group img-gray relative block h-[62vh] w-[78vw] overflow-hidden bg-[var(--ink-soft)] md:h-[52vh] md:w-[38vw] lg:w-[29vw]"
    >
      <Image
        src={item.image}
        alt={item.title}
        fill
        sizes="(max-width: 768px) 78vw, 30vw"
        className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
      />
      {/* Constant scrim keeps the overlaid type legible on every plate. */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/35" />

      <div className="absolute inset-0 flex flex-col justify-between p-6">
        <div className="flex items-start justify-between gap-4">
          <span className="t-label text-white/80">
            {String(index + 1).padStart(2, "0")} / {item.category}
          </span>
          <ArrowUpRight className="h-5 w-5 -translate-x-2 translate-y-2 text-white opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
        </div>

        <div>
          <h3 className="t-headline text-white">{item.title}</h3>
          <p className="mt-2 max-w-[34ch] t-body text-white/70">{item.summary}</p>
          {item.result && (
            <p className="mt-4 border-t border-dashed border-white/40 pt-3 text-[clamp(18px,1.8vw,28px)] font-semibold tracking-[-0.02em] text-white">
              {item.result}
            </p>
          )}
        </div>
      </div>
    </Link>
    </motion.div>
  );
}

/**
 * Selected work as a horizontal reel driven by vertical scroll: the section is
 * pinned and the track slides sideways by exactly its overflow, so the last card
 * lands flush with the right rail as the pin releases.
 *
 * Falls back to a native swipe row on touch and reduced-motion.
 */
export function WorksSection({ items }: WorksSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [overflow, setOverflow] = useState(0);
  const [canPin, setCanPin] = useState(false);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      // Pinning only makes sense on pointer-driven widths; below that a swipe
      // row is the better interaction and costs nothing.
      const wide = window.matchMedia("(min-width: 768px)").matches;
      setCanPin(wide && !prefersReducedMotion);
      if (!track || !wide) {
        setOverflow(0);
        return;
      }
      setOverflow(Math.max(0, track.scrollWidth - window.innerWidth));
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [prefersReducedMotion, items.length]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const rawX = useTransform(scrollYProgress, [0, 1], [0, -overflow]);
  // Softer than a 1:1 track — the reel keeps gliding for a beat after the wheel
  // stops, and settles the same way when you scroll back up.
  const x = useSpring(rawX, {
    stiffness: 140,
    damping: 30,
    mass: 0.45,
    restDelta: 0.5,
  });

  const viewAll = (
    <Link
      href="/portfolio"
      className="group inline-flex items-center gap-2 border-b border-white pb-1 text-[13px] font-semibold uppercase"
    >
      View all projects
      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
    </Link>
  );

  /** Pinned layout has one viewport to spend, so the header stays on one line. */
  const header = (compact: boolean) => (
    <div className="rail">
      <p className="t-label text-white/45">(Selected work)</p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-6">
        <MaskReveal
          as="h2"
          lines={compact ? ["Selected works"] : ["Selected", "works"]}
          className="t-display text-white"
        />
        <div className="hidden pb-2 md:block">{viewAll}</div>
      </div>
      <p className="mt-5 max-w-[52ch] t-lead text-white/70">
        문제 정의부터 가설 검증, 그리고 압도적인 성과까지. 우리의 실행은 데이터로
        증명됩니다.
      </p>
    </div>
  );

  const track = (
    <div
      ref={trackRef}
      className="flex w-max gap-8 pl-[var(--gut)] pr-[var(--gut)] [transform-style:preserve-3d]"
    >
      {items.map((item, i) => (
        <WorkCard key={item.href} item={item} index={i} x={x} enabled={canPin} />
      ))}
    </div>
  );

  // One <section> for both layouts: useScroll's target must stay attached from
  // the first render, and canPin only resolves after mount.
  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--ink)] text-white"
      style={
        canPin
          // Scroll distance = one viewport to read the header, plus the exact
          // horizontal overflow so the reel never over- or under-runs.
          ? { height: `calc(100svh + ${overflow}px)` }
          : undefined
      }
    >
      {canPin ? (
        <div className="sticky top-0 flex h-[100svh] flex-col justify-center gap-7 overflow-hidden pt-[var(--header-h)]">
          {header(true)}
          {/* Perspective lives on the wrapper, not the moving track: a translated
              element establishes its own containing block and would flatten the
              cards' rotation. */}
          <div style={{ perspective: "1400px" }}>
            <motion.div style={{ x }} className="[transform-style:preserve-3d]">
              {track}
            </motion.div>
          </div>
        </div>
      ) : (
        <div className="py-[12vh]">
          {header(false)}
          <div className="no-scrollbar mt-12 overflow-x-auto">{track}</div>
          <div className="mt-10 rail">{viewAll}</div>
        </div>
      )}
    </section>
  );
}
