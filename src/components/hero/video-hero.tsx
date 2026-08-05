"use client";

import { HeroScene } from "@/components/home/hero-scene";

interface VideoHeroProps {
  line1: string;
  line2: string;
  subtitle: string;
  /** Retained for source compatibility; the ink system sets type in one weight. */
  highlightText?: string;
  videoSrc?: string;
  posterSrc?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  eyebrow?: string[];
}

/**
 * Every page's opening scene. Kept as its own export so the sub-pages that
 * already import it inherit the renewed hero without each one being rewritten —
 * all of the composition lives in HeroScene.
 */
export function VideoHero({
  line1,
  line2,
  subtitle,
  videoSrc,
  posterSrc,
  primaryCta,
  secondaryCta,
  eyebrow,
}: VideoHeroProps) {
  return (
    <HeroScene
      line1={line1}
      line2={line2}
      subtitle={subtitle}
      videoSrc={videoSrc}
      posterSrc={posterSrc}
      primaryCta={primaryCta}
      secondaryCta={secondaryCta}
      eyebrow={eyebrow}
    />
  );
}
