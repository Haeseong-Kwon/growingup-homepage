"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState, ReactElement } from "react";
import { useTypingEffect } from "@/hooks/use-typing-effect";

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [autoplayTried, setAutoplayTried] = useState(false);

  // Line1 타이핑 효과
  const { displayedText: typedLine1, isComplete: isLine1Complete } = useTypingEffect({
    text: line1,
    speed: 80,
    delay: 500,
  });

  // Line2 타이핑 효과 (line1이 완료된 후 시작)
  // line1이 완료되면 line2를 시작하기 위해 text를 동적으로 변경
  const [line2Text, setLine2Text] = useState("");
  
  useEffect(() => {
    if (isLine1Complete) {
      // line1 완료 후 300ms 딜레이 후 line2 시작
      const timer = setTimeout(() => {
        setLine2Text(line2);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isLine1Complete, line2]);

  const { displayedText: typedLine2, isComplete: isLine2Complete } = useTypingEffect({
    text: line2Text,
    speed: 80,
    delay: 0, // line2Text가 설정되면 즉시 시작
  });

  // Line2에서 하이라이트 텍스트를 찾아서 색상 적용
  const renderLine2WithHighlight = (text: string, highlight?: string): ReactElement[] => {
    if (!highlight) {
      return [<span key="line2-text">{text}</span>];
    }

    const parts: ReactElement[] = [];
    const highlightIndex = text.indexOf(highlight);
    
    if (highlightIndex !== -1) {
      // 하이라이트 전 텍스트
      if (highlightIndex > 0) {
        parts.push(
          <span key="line2-before">{text.substring(0, highlightIndex)}</span>
        );
      }
      // 하이라이트 텍스트 (타이핑 중일 수도 있으므로 실제로 표시된 부분만)
      const highlightedPart = text.substring(
        highlightIndex,
        Math.min(highlightIndex + highlight.length, text.length)
      );
      parts.push(
        <span key="line2-highlight" className="text-[var(--brand-primary)]">
          {highlightedPart}
        </span>
      );
      // 하이라이트 후 텍스트
      if (highlightIndex + highlight.length < text.length) {
        parts.push(
          <span key="line2-after">
            {text.substring(highlightIndex + highlight.length)}
          </span>
        );
      }
    } else {
      // 하이라이트 텍스트가 아직 타이핑되지 않았거나 없는 경우
      parts.push(<span key="line2-text">{text}</span>);
    }
    
    return parts;
  };

  const isComplete = isLine1Complete && (line2 ? isLine2Complete : true);

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

  // 가능한 경우 자동 재생을 한 번 시도하고, 실패하면 사용자 인터랙션 시 재시도
  useEffect(() => {
    if (!mounted || prefersReducedMotion || autoplayTried) return;
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      const playPromise = video.play();
      if (playPromise && typeof playPromise.then === "function") {
        playPromise.catch(() => {
          // autoplay가 막힌 경우: 이후 사용자 인터랙션에서 재시도
        });
      }
      setAutoplayTried(true);
    };

    tryPlay();

    const handleUserInteract = () => {
      if (!video.paused) return;
      const playPromise = video.play();
      if (playPromise && typeof playPromise.then === "function") {
        playPromise.catch(() => {
          // 여전히 재생이 안 되면 조용히 실패 (poster + gradient로 유지)
        });
      }
      window.removeEventListener("click", handleUserInteract);
      window.removeEventListener("touchstart", handleUserInteract);
      window.removeEventListener("scroll", handleUserInteract);
    };

    window.addEventListener("click", handleUserInteract, { once: true });
    window.addEventListener("touchstart", handleUserInteract, { once: true });
    window.addEventListener("scroll", handleUserInteract, { once: true });

    return () => {
      window.removeEventListener("click", handleUserInteract);
      window.removeEventListener("touchstart", handleUserInteract);
      window.removeEventListener("scroll", handleUserInteract);
    };
  }, [mounted, prefersReducedMotion, autoplayTried]);

  return (
    <section 
      data-theme="light"
      data-section="hero"
      data-palette="brand"
      data-band="160"
      className="relative z-0 w-full overflow-x-clip overflow-y-visible bg-gradient-to-br from-[var(--brand-primary)] via-[var(--brand-secondary)] to-[var(--brand-hot1)] -mt-[var(--header-h)] min-h-[60vh] lg:min-h-[calc(100svh+var(--header-h))]"
    >
      {/* Fallback Gradient (항상 표시, 검정 띠 방지) */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-secondary) 50%, var(--brand-hot1) 100%)`,
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
          preload="auto"
          poster={posterSrc}
          onLoadedData={() => setVideoLoaded(true)}
          onError={() => {
            setVideoLoaded(false);
          }}
          className={`absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ display: "block" }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {/* Overlay */}
      <div
        className="absolute inset-0 z-10 bg-black/40"
      />

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center min-h-[60vh] lg:min-h-[calc(100svh+var(--header-h))] pt-[var(--header-h)] pb-4 lg:pb-0">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex flex-col">
          <div className="max-w-[92vw] lg:max-w-[1100px] mx-auto w-full flex flex-col justify-between min-h-[60vh] lg:min-h-[calc(100svh-var(--header-h))]">
            {/* 타이틀 - 세로 중앙에 배치 */}
            <div className="flex-1 flex items-center justify-center lg:justify-start">
              <h1
                className="text-white font-medium tracking-tight w-full leading-[1.05] text-[clamp(1.75rem,4.5vw,2.5rem)] lg:text-[clamp(2.5rem,6vw,5.5rem)]"
                style={{
                  letterSpacing: "-0.02em",
                }}
              >
                {/* Line 1 */}
                <span className="block">
                  {typedLine1}
                </span>
                {/* Line 2 - line2가 있을 때만 렌더링 */}
                {line2 && (
                  <span className="block">
                    {renderLine2WithHighlight(typedLine2, highlightText)}
                    {!isLine2Complete && (
                      <span className="inline-block w-1 h-[0.9em] bg-white ml-1 animate-pulse" />
                    )}
                  </span>
                )}
              </h1>
            </div>

            {/* Subtitle + 버튼 - 모바일은 하단, PC는 타이틀 아래 */}
            <div className="mt-auto lg:mt-6">
              {/* Subtitle - fade in after typing complete */}
              <p
                className={`text-white/90 mb-6 lg:mb-10 max-w-2xl text-balance transition-opacity duration-500 text-[clamp(0.875rem,1.2vw,1rem)] lg:text-[clamp(1rem,1.5vw,1.25rem)] ${
                  isComplete ? "opacity-100" : "opacity-0"
                }`}
                style={{
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
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 hidden lg:block transition-opacity duration-500 delay-500 ${
          isComplete ? "opacity-100" : "opacity-0"
        }`}
        style={{ 
          zIndex: 30,
          transform: "translateX(-50%)",
        }}
      >
        <div className="w-[1px] h-12 bg-white/30 animate-pulse" />
      </div>
    </section>
  );
}
