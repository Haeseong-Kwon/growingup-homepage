  "use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface HorizontalSliderItem {
  title: string;
  description: string;
  detail?: string;
  outputs?: string; // 산출물
}

interface HorizontalSliderProps {
  items: HorizontalSliderItem[];
  className?: string;
  autoplay?: boolean;
  intervalMs?: number;
  pauseOnHover?: boolean;
  dark?: boolean; // 다크 섹션용 스타일
}

export function HorizontalSlider({
  items,
  className,
  autoplay = true,
  intervalMs = 3500, // 슬라이드 속도 조정: 3500ms
  pauseOnHover = true,
  dark = false,
}: HorizontalSliderProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // 상태 변경을 최소화하기 위한 ref
  const scrollStateRef = useRef({ canLeft: false, canRight: true });

  const shouldAutoplay = autoplay && !prefersReducedMotion && !isHovered && !isFocused;

  // Throttled Scroll Check
  const checkScrollability = useCallback(() => {
    if (!scrollContainerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;

    // 약간의 여유를 두어 계산 오차 방지
    const canLeft = scrollLeft > 5;
    const canRight = scrollLeft < scrollWidth - clientWidth - 5;

    if (scrollStateRef.current.canLeft !== canLeft) {
      setCanScrollLeft(canLeft);
      scrollStateRef.current.canLeft = canLeft;
    }

    if (scrollStateRef.current.canRight !== canRight) {
      setCanScrollRight(canRight);
      scrollStateRef.current.canRight = canRight;
    }
  }, []);

  const scroll = (direction: "left" | "right", resetAutoplayTimer = true) => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const itemWidth = container.querySelector<HTMLElement>(".snap-item")?.offsetWidth || 0;
    const scrollAmount = itemWidth + 24; // gap 포함

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });

    // 사용자 조작 시 autoplay 타이머 리셋 (autoplay로 인한 스크롤이 아닐 때만)
    if (resetAutoplayTimer && autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
      autoplayIntervalRef.current = null;

      // shouldAutoplay가 true면 다시 시작
      if (shouldAutoplay) {
        setTimeout(() => {
          if (shouldAutoplay && !autoplayIntervalRef.current) {
            autoplayIntervalRef.current = setInterval(() => {
              scrollToNext();
            }, intervalMs);
          }
        }, 100);
      }
    }
  };

  const scrollToNext = useCallback(() => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const { scrollLeft, scrollWidth, clientWidth } = container;

    // 마지막 슬라이드면 첫 슬라이드로 loop
    if (scrollLeft >= scrollWidth - clientWidth - 10) {
      container.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    } else {
      // autoplay로 인한 스크롤이므로 타이머 리셋하지 않음
      const itemWidth = container.querySelector<HTMLElement>(".snap-item")?.offsetWidth || 0;
      const scrollAmount = itemWidth + 24; // gap 포함

      container.scrollBy({
        left: scrollAmount,
        behavior: "smooth"
      });
    }
  }, []);

  // Autoplay 설정
  useEffect(() => {
    if (shouldAutoplay) {
      // 기존 interval 정리
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }

      // 새 interval 시작
      autoplayIntervalRef.current = setInterval(() => {
        scrollToNext();
      }, intervalMs);
    } else {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
        autoplayIntervalRef.current = null;
      }
    }

    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
    };
  }, [shouldAutoplay, intervalMs, scrollToNext]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    checkScrollability();

    // Scroll Event Throttling (using requestAnimationFrame)
    let rafId: number;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(checkScrollability);
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [items, checkScrollability]);

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => pauseOnHover && setIsHovered(true)}
      onMouseLeave={() => pauseOnHover && setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={(e) => {
        // 포커스가 슬라이드 영역 밖으로 나갔는지 확인
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setIsFocused(false);
        }
      }}
    >
      {/* 스크롤 컨테이너 */}
      <div
        ref={scrollContainerRef}
        className="horizontal-slider-container flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4"
        style={{
          WebkitOverflowScrolling: "touch",
        }}
      // onScroll is handled by useEffect for passive: true
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="snap-item flex-shrink-0 w-[80vw] md:w-[420px] lg:w-[520px]"
          >
            <div className={cn(
              "h-full p-6 md:p-8 border rounded-xl transition-all duration-300 relative overflow-hidden",
              dark
                ? "bg-white/10 border-white/10 hover:border-white/30 text-white"
                : "bg-[var(--color-card)] hover:border-[var(--brand-primary)]/30"
            )}>
              {/* 포인트컬러 하이라이트 - 상단 액센트 바 */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--brand-primary)] via-[var(--brand-secondary)] to-[var(--brand-hot1)]" />

              <div className="flex items-center gap-3 mb-4 relative z-10">
                {/* 번호에 포인트컬러 배경 */}
                <span className={cn(
                  "text-2xl md:text-3xl font-bold relative",
                  dark
                    ? "text-white"
                    : "text-[var(--brand-primary)]"
                )}>
                  <span className="relative z-10">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {/* 번호 배경 포인트컬러 원형 */}
                  <span className={cn(
                    "absolute -z-10 -inset-2 rounded-full opacity-10",
                    dark
                      ? "bg-white"
                      : "bg-[var(--brand-primary)]"
                  )} />
                </span>
                <h3 className={cn(
                  "text-xl md:text-2xl font-bold tracking-tight",
                  dark && "text-white"
                )}>
                  {item.title}
                </h3>
              </div>
              <p className={cn(
                "text-sm md:text-base leading-relaxed mb-4",
                dark ? "text-white/80" : "text-[var(--brand-fg)]/70"
              )}>
                {item.description}
              </p>
              {item.outputs && (
                <>
                  <div className={cn(
                    "h-px mb-3",
                    dark ? "bg-white/10" : "bg-[var(--brand-muted)]"
                  )} />
                  <div className="text-xs font-medium uppercase tracking-wide mb-2" style={{
                    color: dark ? "rgba(255,255,255,0.6)" : "var(--brand-fg, #0b0b0c)"
                  }}>
                    산출물
                  </div>
                  <p className={cn(
                    "text-xs leading-relaxed",
                    dark ? "text-white/60" : "text-[var(--brand-fg)]/50"
                  )}>
                    {item.outputs}
                  </p>
                </>
              )}
              {item.detail && !item.outputs && (
                <p className={cn(
                  "text-xs leading-relaxed",
                  dark ? "text-white/60" : "text-[var(--brand-fg)]/50"
                )}>
                  {item.detail}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 네비게이션 버튼 */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <Button
          variant="outline"
          size="icon"
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          aria-label="이전으로 스크롤"
          className={cn(
            "rounded-full",
            dark && "border-white/40 bg-white/10 text-white hover:bg-white/20 hover:border-white/60"
          )}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          aria-label="다음으로 스크롤"
          className={cn(
            "rounded-full",
            dark && "border-white/40 bg-white/10 text-white hover:bg-white/20 hover:border-white/60"
          )}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

    </div>
  );
}
