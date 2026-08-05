"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
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
  eyebrow?: string[];
  /** Plates arranged in depth. Order is front-to-back along the flight path. */
  plates?: string[];
  /** Run the counter intro and the full pinned flight. Front door only. */
  intro?: boolean;
}

const DEFAULT_PLATES = [
  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&h=1800&fit=crop",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&h=1800&fit=crop",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&h=1800&fit=crop",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1400&h=1800&fit=crop",
  "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1400&h=1800&fit=crop",
];

/* ---- Panel deck ----------------------------------------------------------
 * The plates are discrete panels floating in a perspective volume, not
 * full-bleed backdrops. Each one sits at its own point in space, and as the deck
 * dollies forward every panel turns through its own arc — so the motion reads as
 * rotation in depth rather than an image swap. Panels keep visible edges on
 * purpose: the edge is what makes the rotation legible.
 * -------------------------------------------------------------------------- */
const PERSPECTIVE = 1500;
const SPACING = 640;
const travelFor = (count: number) => count * SPACING;

interface PanelSpec {
  /** Placement in the frame, as a percentage of the viewport. */
  left: number;
  top: number;
  /** Y-rotation swept from arrival to departure, in degrees. */
  rotFrom: number;
  rotTo: number;
  /** X-rotation swept over the same arc. */
  tiltFrom: number;
  tiltTo: number;
  /** Roll, kept small — it reads as craft, not as a spin. */
  rollFrom: number;
  rollTo: number;
}

/**
 * Alternating rotation directions so consecutive panels never turn in lockstep —
 * that is what stops the deck reading as a single sliding wall.
 *
 * All of them sit in the upper-right of the frame: the headline owns the
 * bottom-left rail, and a bright panel passing behind it destroys the type.
 */
const PANEL_SPECS: PanelSpec[] = [
  { left: 56, top: 34, rotFrom: 52, rotTo: -34, tiltFrom: -12, tiltTo: 9, rollFrom: -5, rollTo: 3 },
  { left: 76, top: 44, rotFrom: -58, rotTo: 38, tiltFrom: 10, tiltTo: -8, rollFrom: 4, rollTo: -3 },
  { left: 62, top: 30, rotFrom: 46, rotTo: -42, tiltFrom: -8, tiltTo: 11, rollFrom: -3, rollTo: 5 },
  { left: 80, top: 33, rotFrom: -50, rotTo: 44, tiltFrom: 12, tiltTo: -7, rollFrom: 5, rollTo: -4 },
  { left: 68, top: 42, rotFrom: 40, rotTo: -46, tiltFrom: -10, tiltTo: 10, rollFrom: -4, rollTo: 4 },
];

const INTRO_MS = 2200;
const EASE = [0.16, 1, 0.3, 1] as const;

function useIntroProgress(active: boolean) {
  const [value, setValue] = useState(active ? 0 : 100);

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    let start: number | null = null;

    const tick = (now: number) => {
      start ??= now;
      const p = Math.min((now - start) / INTRO_MS, 1);
      setValue(Math.round(p * 100));
      if (p < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active]);

  return value;
}

/**
 * One panel in the deck. Its z is driven by the shared flight progress, and
 * every rotation is derived from that z rather than from progress directly — so
 * a panel is always at the same attitude at the same physical distance, and the
 * whole arc runs backwards exactly when you scroll back up.
 */
function DepthPanel({
  src,
  index,
  count,
  spec,
  flight,
  priority,
}: {
  src: string;
  index: number;
  count: number;
  spec: PanelSpec;
  flight: MotionValue<number>;
  priority: boolean;
}) {
  const base = -(index + 1) * SPACING;
  const travel = travelFor(count);
  const depth: [number, number] = [base, base + travel];

  const z = useTransform(flight, [0, 1], depth);
  const rotateY = useTransform(z, depth, [spec.rotFrom, spec.rotTo]);
  const rotateX = useTransform(z, depth, [spec.tiltFrom, spec.tiltTo]);
  const rotateZ = useTransform(z, depth, [spec.rollFrom, spec.rollTo]);

  // Fade in out of the far dark, hold through the readable band, dissolve as the
  // panel sweeps past the camera plane.
  const opacity = useTransform(
    z,
    [base - 1, -SPACING * 2.2, -SPACING * 1.35, -220, 190],
    [0, 0, 1, 1, 0]
  );

  return (
    <motion.div
      className="absolute h-[38vh] w-[30vw] max-w-[430px] overflow-hidden will-change-transform md:h-[46vh]"
      style={{
        left: `${spec.left}%`,
        top: `${spec.top}%`,
        x: "-50%",
        y: "-50%",
        z,
        rotateX,
        rotateY,
        rotateZ,
        opacity,
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
      }}
    >
      <Image
        src={src}
        alt=""
        fill
        priority={priority}
        sizes="(max-width: 768px) 70vw, 38vw"
        className="object-cover grayscale"
      />
      {/* Hairline edge: without it a dark panel loses its silhouette against the
          ink and the rotation stops being readable. */}
      <div className="pointer-events-none absolute inset-0 border border-white/15" />
    </motion.div>
  );
}

/**
 * Opening scene: a pinned 3D flight. The plate stack lives on a real z-axis
 * inside a perspective container and the rig dollies forward as you scroll, so
 * plates travel past the camera instead of cross-fading in place. The rig also
 * tilts a few degrees toward the pointer, which is what sells the depth when
 * the page is still.
 *
 * Every driver is a spring over scroll progress, so scrolling back up flies the
 * whole scene in reverse rather than snapping to a keyframe.
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
  plates = DEFAULT_PLATES,
  intro = false,
}: HeroSceneProps) {
  const trackRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const runIntro = intro && !prefersReducedMotion;
  const progress = useIntroProgress(runIntro);
  const introDone = progress >= 100;

  // Pinned for a viewport and a half past the fold, which is the room the
  // flight needs to read as travel. Inner pages skip the pin entirely.
  const pinned = intro && !prefersReducedMotion;

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: pinned ? ["start start", "end end"] : ["start start", "end start"],
  });

  const flight = useSpring(scrollYProgress, {
    stiffness: 64,
    damping: 22,
    mass: 0.45,
    restDelta: 0.0002,
  });

  // Rig attitude: a slow roll through the flight, plus pointer tilt on top.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const tiltX = useSpring(pointerY, { stiffness: 60, damping: 20, mass: 0.6 });
  const tiltY = useSpring(pointerX, { stiffness: 60, damping: 20, mass: 0.6 });

  // The deck itself also swings, on top of each panel's own rotation. Panels are
  // discrete cards now, so a wider arc costs nothing — there is no full-bleed
  // edge left to swing into frame.
  const rollX = useTransform(flight, [0, 1], [7, -6]);
  const rollY = useTransform(flight, [0, 1], [-9, 8]);
  const rotateX = useTransform([rollX, tiltX], ([a, b]: number[]) => a + b);
  const rotateY = useTransform([rollY, tiltY], ([a, b]: number[]) => a + b);

  // Content rides slightly ahead of the rig and clears out just before the pin
  // releases. No z-push here: the block is left-aligned to the rail, so scaling
  // it in depth would walk the headline off the edge.
  const contentY = useTransform(flight, [0, 1], ["0%", "-14%"]);
  const contentOpacity = useTransform(flight, [0, 0.72, 0.99], [1, 1, 0]);
  const ruleScale = useTransform(flight, [0, 0.6], [1, 0]);
  const vignette = useTransform(flight, [0, 1], [0.12, 0.42]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (prefersReducedMotion) {
      video.pause();
      return;
    }
    video.play().catch(() => undefined);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const onMove = (e: PointerEvent) => {
      // Normalised to ±1 across the viewport, then scaled to a few degrees.
      pointerX.set((e.clientX / window.innerWidth - 0.5) * 7);
      pointerY.set((0.5 - e.clientY / window.innerHeight) * 5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [pointerX, pointerY, prefersReducedMotion]);

  const revealDelay = runIntro ? INTRO_MS / 1000 + 0.1 : 0.25;

  return (
    <section
      ref={trackRef}
      className="relative z-0 w-full bg-[var(--ink)] text-white"
      // 190svh gives the flight ~90vh of scroll — long enough to read as travel,
      // short enough that the pin never sits on an emptied-out frame.
      style={{ height: pinned ? "190svh" : "100svh" }}
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* Depth rig */}
        <div
          className="absolute inset-0"
          style={{ perspective: `${PERSPECTIVE}px`, perspectiveOrigin: "50% 45%" }}
        >
          <motion.div
            className="absolute inset-0 [transform-style:preserve-3d]"
            style={
              prefersReducedMotion ? undefined : { rotateX, rotateY }
            }
          >
            {/* Backdrop: sits far behind the deck and never rotates, so the
                panels have something to read as depth against. */}
            <div
              className="absolute overflow-hidden"
              style={{
                inset: "-30%",
                transform: `translateZ(-${SPACING * (plates.length + 2)}px)`,
              }}
            >
              <video
                ref={videoRef}
                src={videoSrc}
                poster={posterSrc}
                muted
                loop
                playsInline
                preload="metadata"
                className="h-full w-full object-cover opacity-40 grayscale"
              />
            </div>

            {!prefersReducedMotion &&
              plates.map((src, i) => (
                <DepthPanel
                  key={src}
                  src={src}
                  index={i}
                  count={plates.length}
                  spec={PANEL_SPECS[i % PANEL_SPECS.length]}
                  flight={flight}
                  priority={i === 0}
                />
              ))}
          </motion.div>
        </div>

        {/* Scrims sit outside the rig so they never tilt with it. Lighter than a
            full-bleed treatment would need — the panels have to stay readable. */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-[var(--ink)]/20 to-[var(--ink)]/55" />
        <motion.div
          className="pointer-events-none absolute inset-0 bg-[var(--ink)]"
          style={prefersReducedMotion ? { opacity: 0.25 } : { opacity: vignette }}
        />

        {runIntro && (
          <motion.div
            className="absolute inset-[var(--gut)] z-10 hidden text-white/30 md:block"
            style={{ opacity: contentOpacity }}
          >
            <DrawnFrame duration={INTRO_MS / 1000} delay={0.1} />
          </motion.div>
        )}

        {/* Two layers: the outer carries the scroll fade (left standing, this
            collides with the header's copy as the pin releases), the inner
            carries the intro fade. One element can't hold both, because a `style`
            motion value overrides `animate` on the same property. */}
        <motion.div
          className="absolute left-[var(--gut)] top-[calc(var(--header-h)+2.5rem)] z-10"
          style={prefersReducedMotion ? undefined : { opacity: contentOpacity }}
        >
          <motion.p
            className="t-label text-white/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: revealDelay - 0.2 }}
          >
            {eyebrow.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </motion.p>
        </motion.div>

        {/* Headline block — given its own z so it floats clear of the plates */}
        <motion.div
          className="absolute inset-x-0 bottom-0 z-10 rail pb-[calc(var(--gut)+4.5rem)]"
          style={
            prefersReducedMotion
              ? undefined
              : { y: contentY, opacity: contentOpacity }
          }
        >
          <MaskReveal
            as="h1"
            immediate
            delay={revealDelay}
            stagger={0.11}
            lines={line2 ? [line1, line2] : [line1]}
            className="t-display max-w-[20ch] normal-case text-white"
          />

          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <motion.p
              className="max-w-[38ch] t-body text-white/60"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: revealDelay + 0.3, ease: EASE }}
            >
              {subtitle}
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: revealDelay + 0.42, ease: EASE }}
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

        {/* Foot rule: nested so the scroll retract and the intro draw don't
            fight over the same transform property. */}
        <motion.div
          className="pointer-events-none absolute bottom-[var(--gut)] left-[var(--gut)] right-[var(--gut)] z-20 h-px origin-left"
          style={prefersReducedMotion ? undefined : { scaleX: ruleScale }}
        >
          <motion.div
            className="h-px w-full origin-left bg-white/45"
            initial={runIntro ? { scaleX: 0 } : { scaleX: 1 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: runIntro ? INTRO_MS / 1000 : 1.1,
              ease: [0.65, 0, 0.35, 1],
            }}
          />
        </motion.div>

        <motion.span
          className="pointer-events-none absolute bottom-[calc(var(--gut)+0.6rem)] left-1/2 z-20 -translate-x-1/2 t-label tabular-nums text-white/70"
          animate={{ opacity: introDone ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          {String(progress).padStart(3, "0")}
        </motion.span>

        <motion.span
          className="pointer-events-none absolute bottom-[calc(var(--gut)+0.6rem)] right-[var(--gut)] z-20 t-label text-white/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: introDone ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Scroll
        </motion.span>
      </div>
    </section>
  );
}
