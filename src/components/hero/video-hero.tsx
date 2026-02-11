"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState, ReactElement } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface VideoHeroProps {
  line1: string;
  line2: string;
  subtitle: string;
  highlightText?: string;
  videoSrc?: string;
  posterSrc?: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
}

// Typing Effect using Framer Motion
const TypingText = ({ text, delay = 0, onComplete }: { text: string; delay?: number; onComplete?: () => void }) => {
  const characters = Array.from(text);

  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.03, // 30ms per char
            delayChildren: delay,
          },
        },
      }}
      onAnimationComplete={onComplete}
    >
      {characters.map((char, index) => (
        <motion.span key={index} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export function VideoHero({
  line1,
  line2,
  subtitle,
  highlightText,
  videoSrc = "/hero.mp4",
  posterSrc = "/hero-poster.svg",
  primaryCta,
  secondaryCta,
}: VideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [line1Complete, setLine1Complete] = useState(false);
  const [line2Complete, setLine2Complete] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Video Autoplay Logic
  useEffect(() => {
    if (!mounted || prefersReducedMotion) return;
    const video = videoRef.current;
    if (!video) return;

    const attemptPlay = async () => {
      try {
        await video.play();
      } catch (err) {
        console.warn("Autoplay blocked", err);
        // Fallback: wait for interaction
        const onInteract = () => {
          video.play().catch(() => { });
          window.removeEventListener('click', onInteract);
          window.removeEventListener('touchstart', onInteract);
        };
        window.addEventListener('click', onInteract);
        window.addEventListener('touchstart', onInteract);
      }
    };
    attemptPlay();
  }, [mounted, prefersReducedMotion]);

  // Highlight Text Logic (Simplified for Framer Motion)
  const renderLine2 = () => {
    if (!highlightText) return <TypingText text={line2} delay={0.2} onComplete={() => setLine2Complete(true)} />;

    const parts = line2.split(highlightText);
    // Handles simple case: before + highlight + after
    if (parts.length < 2) return <TypingText text={line2} delay={0.2} onComplete={() => setLine2Complete(true)} />;

    const before = parts[0];
    const after = parts.slice(1).join(highlightText);

    return (
      <motion.span
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
        }}
        onAnimationComplete={() => setLine2Complete(true)}
      >
        {/* Before Highlight */}
        {Array.from(before).map((char, i) => (
          <motion.span key={`b-${i}`} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>{char}</motion.span>
        ))}
        {/* Highlight */}
        {Array.from(highlightText).map((char, i) => (
          <motion.span key={`h-${i}`} className="text-[var(--brand-primary)]" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>{char}</motion.span>
        ))}
        {/* After Highlight */}
        {Array.from(after).map((char, i) => (
          <motion.span key={`a-${i}`} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>{char}</motion.span>
        ))}
      </motion.span>
    );
  };


  return (
    <section
      data-theme="light"
      data-section="hero"
      data-palette="brand"
      className="relative z-0 w-full overflow-hidden bg-black -mt-[var(--header-h)] min-h-[60vh] lg:min-h-[calc(100svh+var(--header-h))]"
    >
      {/* Background Gradient Fallback */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-primary)] via-[var(--brand-secondary)] to-[var(--brand-hot1)] opacity-80" />

      {/* Video Background */}
      {mounted && !prefersReducedMotion && (
        <motion.video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: videoLoaded ? 1 : 0 }}
          transition={{ duration: 1 }}
          onLoadedData={() => setVideoLoaded(true)}
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center min-h-[60vh] lg:min-h-[calc(100svh+var(--header-h))] pt-[var(--header-h)]">
        <div className="max-w-[1320px] w-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center h-full">
          <div className="max-w-[1100px] mx-auto w-full">
            <h1 className="text-white font-medium tracking-tight leading-[1.1] text-[clamp(2rem,5vw,4.5rem)] mb-6 lg:mb-10">
              <div className="block">
                {mounted ? (
                  <TypingText text={line1} onComplete={() => setLine1Complete(true)} />
                ) : (
                  line1 // Server-side fallback
                )}
              </div>
              {line1Complete && (
                <div className="block">
                  {renderLine2()}
                  {!line2Complete && <motion.span
                    className="inline-block w-[3px] h-[1em] bg-white ml-2 align-middle"
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                  />}
                </div>
              )}
            </h1>

            {/* Subtitle & CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={line2Complete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <p className="text-white/90 text-lg lg:text-xl max-w-2xl mb-8 leading-relaxed">
                {subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                {primaryCta && (
                  <Button asChild size="lg" className="bg-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/90 text-white rounded-lg h-14 px-8 text-lg">
                    <Link href={primaryCta.href}>{primaryCta.label}</Link>
                  </Button>
                )}
                {secondaryCta && (
                  <Button asChild variant="outline" size="lg" className="border-white/30 bg-white/10 hover:bg-white/20 text-white rounded-lg h-14 px-8 text-lg">
                    <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block z-30"
        initial={{ opacity: 0 }}
        animate={line2Complete ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <div className="w-[1px] h-16 bg-white/20 overflow-hidden relative">
          <motion.div
            className="w-full h-1/2 bg-white absolute top-0"
            animate={{ top: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
