"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { DrawnFrame } from "@/components/motion/line-draw";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface Cta {
  label: string;
  href: string;
}

interface HeroSceneProps {
  line1: string;
  line2?: string;
  subtitle: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  videoSrc?: string;
  posterSrc?: string;
  /** Small standing mark at the top-left rail. */
  eyebrow?: string[];
}

/**
 * Opening scene: a full-bleed desaturated plate under a hairline frame that
 * draws itself in, with the headline riding up from behind a hard edge.
 *
 * The plate is scrubbed by scroll (slower than the page, scaling down) so the
 * hero recedes into the next section instead of cutting away.
 */
export function HeroScene({
  line1,
  line2,
  subtitle,
  primaryCta,
  secondaryCta,
  videoSrc = "/hero.mp4",
  posterSrc = "/hero-poster.svg",
  eyebrow = ["Growth Marketing", "Seoul, KR"],
}: HeroSceneProps) {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const plateY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const plateScale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (prefersReducedMotion) {
      video.pause();
      return;
    }
    // Autoplay is best-effort: browsers may refuse it, and the poster holds the frame.
    video.play().catch(() => undefined);
  }, [prefersReducedMotion]);

  return (
    <section
      ref={ref}
      className="relative z-0 h-[100svh] w-full overflow-hidden bg-[var(--ink)] text-white"
    >
      {/* Plate */}
      <motion.div
        className="absolute inset-0"
        style={
          prefersReducedMotion ? undefined : { y: plateY, scale: plateScale }
        }
      >
        {/* Renders on the server too — the poster is the first frame either way,
            so a reduced-motion visitor sees a still plate rather than nothing. */}
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover opacity-70 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-[var(--ink)]/25 to-[var(--ink)]/70" />
      </motion.div>

      {/* Hairline frame, inset to the gutter rail */}
      <div className="absolute inset-[var(--gut)] hidden text-white/45 md:block">
        <DrawnFrame label="Scroll" />
      </div>

      {/* Standing marks */}
      <motion.p
        className="absolute left-[var(--gut)] top-[calc(var(--header-h)+2.5rem)] z-10 t-label text-white/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
      >
        {eyebrow.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </motion.p>

      {/* Headline block, anchored to the bottom-left rail */}
      <motion.div
        className="absolute inset-x-0 bottom-0 z-10 rail pb-[calc(var(--gut)+3.5rem)]"
        style={
          prefersReducedMotion ? undefined : { y: contentY, opacity: contentOpacity }
        }
      >
        <MaskReveal
          as="h1"
          immediate
          delay={0.35}
          lines={line2 ? [line1, line2] : [line1]}
          className="t-display max-w-[20ch] normal-case text-white"
        />

        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <motion.p
            className="max-w-[38ch] t-body text-white/60"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
          >
            {subtitle}
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className="group inline-flex items-center gap-2 bg-white px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.01em] text-[var(--ink)] transition-colors hover:bg-white/85"
              >
                {primaryCta.label}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center gap-2 rule-box px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.01em] text-white transition-colors hover:bg-white hover:text-[var(--ink)]"
              >
                {secondaryCta.label}
              </Link>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
