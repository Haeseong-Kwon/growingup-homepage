"use client";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface LogoMarqueeProps {
  logos: Array<{
    name: string;
    image?: string;
    placeholder?: string;
  }>;
  className?: string;
  speed?: "slow" | "normal" | "fast";
}

export function LogoMarquee({ logos, className, speed = "normal" }: LogoMarqueeProps) {
  const prefersReducedMotion = useReducedMotion();

  // 로고를 2배로 복제하여 무한 루프 효과 생성
  const duplicatedLogos = [...logos, ...logos];

  const speedClasses = {
    slow: "animate-marquee-slow",
    normal: "animate-marquee",
    fast: "animate-marquee-fast",
  };

  if (prefersReducedMotion) {
    // Reduced motion: 정적 그리드로 표시
    return (
      <div className={cn("grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8", className)}>
        {logos.map((logo, index) => (
          <div
            key={index}
            className="flex items-center justify-center h-16 md:h-20 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
          >
            {logo.image ? (
              <img
                src={logo.image}
                alt={logo.name}
                className="max-h-full max-w-full object-contain"
              />
            ) : (
              <span className="text-sm md:text-base font-medium text-[var(--brand-fg)]/40">
                {logo.placeholder || logo.name}
              </span>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="flex gap-12 md:gap-16">
        {/* 첫 번째 세트 */}
        <div
          className={cn(
            "flex gap-12 md:gap-16 items-center",
            speedClasses[speed]
          )}
          style={{
            animationDuration: speed === "slow" ? "60s" : speed === "fast" ? "30s" : "45s",
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div
              key={`first-${index}`}
              className="flex-shrink-0 flex items-center justify-center h-16 md:h-20 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
            >
              {logo.image ? (
                <img
                  src={logo.image}
                  alt={logo.name}
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <span className="text-sm md:text-base font-medium text-[var(--brand-fg)]/40 whitespace-nowrap">
                  {logo.placeholder || logo.name}
                </span>
              )}
            </div>
          ))}
        </div>
        {/* 두 번째 세트 (seamless loop) */}
        <div
          className={cn(
            "flex gap-12 md:gap-16 items-center",
            speedClasses[speed]
          )}
          style={{
            animationDuration: speed === "slow" ? "60s" : speed === "fast" ? "30s" : "45s",
          }}
          aria-hidden="true"
        >
          {duplicatedLogos.map((logo, index) => (
            <div
              key={`second-${index}`}
              className="flex-shrink-0 flex items-center justify-center h-16 md:h-20 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
            >
              {logo.image ? (
                <img
                  src={logo.image}
                  alt=""
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <span className="text-sm md:text-base font-medium text-[var(--brand-fg)]/40 whitespace-nowrap">
                  {logo.placeholder || logo.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

