"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  // Parallax Logic
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]); // Video moves slower
  const textY = useTransform(scrollY, [0, 500], [0, 100]); // Text moves slightly
  const opacity = useTransform(scrollY, [0, 500], [1, 0]); // Fade out on scroll

  useEffect(() => {
    setMounted(true);
  }, []);

  // Video Autoplay
  useEffect(() => {
    if (!mounted || prefersReducedMotion) return;
    const video = videoRef.current;
    if (!video) return;

    const attemptPlay = async () => {
      try {
        await video.play();
      } catch (err) {
        // Silent catch
      }
    };
    attemptPlay();
  }, [mounted, prefersReducedMotion]);

  const words = `${line1} ${line2}`.split(" ");

  return (
    <section
      ref={containerRef}
      className="relative z-0 w-full h-[100svh] overflow-hidden bg-[#050505] -mt-[var(--header-h)]"
    >
      {/* Parallax Background */}
      <motion.div
        style={{ y: prefersReducedMotion ? 0 : y }}
        className="absolute inset-0 w-full h-[120%] top-0 left-0"
      >
        {/* Video Background */}
        {mounted && !prefersReducedMotion && (
          <motion.video
            ref={videoRef}
            src={videoSrc}
            poster={posterSrc}
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-luminosity" // Cinematic look
            initial={{ opacity: 0 }}
            animate={{ opacity: videoLoaded ? 0.6 : 0 }}
            transition={{ duration: 1.5 }}
            onLoadedData={() => setVideoLoaded(true)}
          />
        )}

        {/* Artistic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_120%)]" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: prefersReducedMotion ? 0 : textY, opacity }}
        className="relative z-10 flex h-full items-center justify-center px-4"
      >
        <div className="w-full max-w-[1700px] mx-auto flex flex-col items-start px-6 lg:px-20 mt-20">
          <h1 className="font-bold tracking-tight text-white leading-[0.85] uppercase">
            {/* Massive Split Text */}
            <div className="flex flex-col items-start">
              <motion.span
                initial={{ y: 100, opacity: 0, rotate: 2 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="text-[clamp(3.5rem,9vw,9rem)] leading-[0.9] block"
              >
                {line1}
              </motion.span>
              <motion.span
                initial={{ y: 100, opacity: 0, rotate: -2 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                className="text-[clamp(3.5rem,9vw,9rem)] leading-[0.9] block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50"
              >
                {line2}
              </motion.span>
            </div>
          </h1>

          <div className="mt-12 md:mt-16 flex flex-col md:flex-row gap-12 items-start md:items-center w-full max-w-4xl">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-white/60 text-lg md:text-xl max-w-md leading-relaxed"
            >
              {subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              {primaryCta && (
                <Button asChild className="rounded-full h-16 px-10 text-xl font-bold bg-white text-black hover:bg-white/90 transition-transform hover:scale-105 duration-300">
                  <Link href={primaryCta.href}>{primaryCta.label}</Link>
                </Button>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator - Bottom Right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 right-12 hidden lg:block text-white/40 text-sm font-mono tracking-widest uppercase rotate-90 origin-right"
      >
        Scroll to Explore
      </motion.div>
    </section>
  );
}
