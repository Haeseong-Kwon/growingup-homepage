"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { scrollToSection } from "@/hooks/use-hash-sync";

interface SectionInfo {
  id: string;
  label: string;
}

interface SectionProgressProps {
  sections: SectionInfo[];
}

export function SectionProgress({ sections }: SectionProgressProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // prefers-reduced-motion 체크
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // IntersectionObserver로 섹션 감지
    const observers = sections.map((section) => {
      const element = document.getElementById(section.id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(section.id);
          }
        },
        {
          rootMargin: "-20% 0px -60% 0px",
          threshold: 0,
        }
      );

      observer.observe(element);
      return observer;
    });

    // 스크롤 진행률 계산
    let ticking = false;

    const handleScroll = () => {
      if (!ticking && !prefersReducedMotion) {
        window.requestAnimationFrame(() => {
          const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrolled = window.scrollY;
          const progress = Math.min(scrolled / scrollHeight, 1);
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observers.forEach((observer) => observer?.disconnect());
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sections]);

  const handleClick = (sectionId: string) => {
    scrollToSection(sectionId, 88);
  };

  return (
    <div className="hidden md:block fixed right-8 top-1/2 -translate-y-1/2 z-40">
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute left-1/2 -translate-x-1/2 w-[2px] h-full bg-[var(--brand-muted)]">
          <div
            className="w-full bg-[var(--brand-primary)] transition-all duration-300 ease-out"
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>

        {/* Section Dots */}
        <div className="relative flex flex-col gap-6 py-2">
          {sections.map((section) => {
            const isActive = activeSection === section.id;

            return (
              <button
                key={section.id}
                onClick={() => handleClick(section.id)}
                className="group relative flex items-center justify-center transition-all duration-200"
                aria-label={`${section.label} 섹션으로 이동`}
              >
                {/* Dot */}
                <div
                  className={cn(
                    "rounded-full transition-all duration-300",
                    isActive
                      ? "w-3 h-3 bg-[var(--brand-primary)] ring-4 ring-[var(--brand-primary)]/20"
                      : "w-2 h-2 bg-[var(--brand-muted)] group-hover:bg-[var(--brand-primary)]/50 group-hover:w-2.5 group-hover:h-2.5"
                  )}
                />

                {/* Label */}
                <span
                  className={cn(
                    "absolute right-full mr-4 whitespace-nowrap text-xs font-medium transition-all duration-200",
                    "opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0",
                    isActive
                      ? "text-[var(--brand-primary)]"
                      : "text-[var(--brand-fg)]/60"
                  )}
                >
                  {section.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

