"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { useTypingEffect } from "@/hooks/use-typing-effect";

interface VideoHeroProps {
  title: string;
  subtitle: string;
  videoSrc?: string;
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
  title,
  subtitle,
  videoSrc = "/hero.mp4",
  primaryCta,
  secondaryCta,
}: VideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 타이핑 효과
  const { displayedText: typedTitle, isComplete } = useTypingEffect({
    text: title,
    speed: 80,
    delay: 500,
  });

  useEffect(() => {
    // 마운트 완료 표시
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    
    // prefers-reduced-motion 체크
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    
    // 초기값 설정
    handleChange();
    
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <section 
      data-theme="light"
      data-section="hero"
      data-palette="brand"
      data-band="160"
      className="relative min-h-[calc(100svh+var(--header-h))] w-full overflow-hidden bg-gradient-to-br from-[var(--brand-primary)] via-[var(--brand-secondary)] to-[var(--brand-hot1)] -mt-[var(--header-h)]"
      style={{ zIndex: 1, position: "relative" }}
    >
      {/* Fallback Gradient (항상 표시, 검정 띠 방지) */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-secondary) 50%, var(--brand-hot1) 100%)`,
          zIndex: 1,
        }}
      />

      {/* Video Background */}
      {mounted && !prefersReducedMotion && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={() => setVideoLoaded(true)}
          onError={() => {
            setVideoLoaded(false);
          }}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ zIndex: 2 }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        style={{
          zIndex: 3,
        }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-[calc(100svh+var(--header-h))] flex items-center pt-[calc(var(--header-h)+32px)]" style={{ zIndex: 101 }}>
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-4xl">
            {/* Title with Typing Effect */}
            <h1
              className="text-white font-medium tracking-tight mb-6 text-balance"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                lineHeight: "0.95",
                letterSpacing: "-0.02em",
                minHeight: "1em",
              }}
            >
              {typedTitle}
              {!isComplete && (
                <span className="inline-block w-1 h-[0.9em] bg-white ml-1 animate-pulse" />
              )}
            </h1>

            {/* Subtitle - fade in after typing complete */}
            <p
              className={`text-white/90 mb-10 max-w-2xl text-balance transition-opacity duration-500 ${
                isComplete ? "opacity-100" : "opacity-0"
              }`}
              style={{
                fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                lineHeight: "1.6",
              }}
            >
              {subtitle}
            </p>

            {/* CTAs - fade in after subtitle */}
            {(primaryCta || secondaryCta) && (
              <div
                className={`flex flex-col sm:flex-row gap-4 transition-opacity duration-500 delay-200 ${
                  isComplete ? "opacity-100" : "opacity-0"
                }`}
              >
                {primaryCta && (
                  <Button
                    asChild
                    size="lg"
                    className="bg-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/90 text-white rounded-lg h-12 px-8 text-base"
                  >
                    <Link href={primaryCta.href}>{primaryCta.label}</Link>
                  </Button>
                )}
                {secondaryCta && (
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-2 border-white/30 bg-white/10 hover:bg-white/20 text-white rounded-lg h-12 px-8 text-base"
                  >
                    <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block transition-opacity duration-500 delay-500 ${
          isComplete ? "opacity-100" : "opacity-0"
        }`}
        style={{ zIndex: 101 }}
      >
        <div className="w-[1px] h-12 bg-white/30 animate-pulse" />
      </div>
    </section>
  );
}
