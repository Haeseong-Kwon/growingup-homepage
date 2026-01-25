"use client";

import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useScrollSpy } from "@/hooks/use-scrollspy";

interface SectionInfo {
  id: string;
  label: string;
}

interface SectionSubnavProps {
  sections: SectionInfo[];
  headerHeight?: number;
}

export function SectionSubnav({ sections, headerHeight = 80 }: SectionSubnavProps) {
  const activeId = useScrollSpy({
    sectionIds: sections.map((s) => s.id),
    rootMargin: "0px 0px -60% 0px",
    threshold: 0.2,
  });

  const navRef = useRef<HTMLDivElement>(null);
  const activeButtonRef = useRef<HTMLButtonElement>(null);

  // Active 버튼이 보이도록 스크롤
  useEffect(() => {
    if (activeButtonRef.current && navRef.current) {
      const button = activeButtonRef.current;
      const nav = navRef.current;

      const buttonLeft = button.offsetLeft;
      const buttonWidth = button.offsetWidth;
      const navScrollLeft = nav.scrollLeft;
      const navWidth = nav.clientWidth;

      // 버튼이 보이지 않으면 스크롤
      if (buttonLeft < navScrollLeft) {
        nav.scrollTo({
          left: buttonLeft - 20,
          behavior: "smooth",
        });
      } else if (buttonLeft + buttonWidth > navScrollLeft + navWidth) {
        nav.scrollTo({
          left: buttonLeft + buttonWidth - navWidth + 20,
          behavior: "smooth",
        });
      }
    }
  }, [activeId]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    element.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });

    // URL hash 갱신
    history.replaceState(null, "", `/#${sectionId}`);
  };

  return (
    <nav
      className="sticky z-40 bg-[var(--brand-bg)]/95 border-b transition-all duration-300"
      style={{ top: `${headerHeight}px` }}
    >
      {/* Progress Line */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--brand-muted)]">
        <div
          className="h-full bg-[var(--brand-primary)] transition-all duration-300 ease-out"
          style={{
            width: `${((sections.findIndex((s) => s.id === activeId) + 1) / sections.length) * 100}%`,
          }}
        />
      </div>

      {/* Mobile: Horizontal Scroll Chips */}
      <div
        ref={navRef}
        className="md:hidden overflow-x-auto scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="flex gap-2 px-4 py-3 min-w-max">
          {sections.map((section) => {
            const isActive = activeId === section.id;
            return (
              <button
                key={section.id}
                ref={isActive ? activeButtonRef : null}
                onClick={() => scrollToSection(section.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200",
                  isActive
                    ? "bg-[var(--brand-primary)] text-white shadow-sm"
                    : "bg-[var(--brand-muted-light)] text-[var(--brand-fg)]/70 hover:bg-[var(--brand-muted)] hover:text-[var(--brand-fg)]"
                )}
              >
                {section.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop: Tabs */}
      <div className="hidden md:block">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1">
            {sections.map((section) => {
              const isActive = activeId === section.id;
              return (
                <button
                  key={section.id}
                  ref={isActive ? activeButtonRef : null}
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    "relative px-6 py-4 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "text-[var(--brand-primary)]"
                      : "text-[var(--brand-fg)]/60 hover:text-[var(--brand-fg)]"
                  )}
                >
                  {section.label}

                  {/* Active Underline */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--brand-primary)]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </nav>
  );
}

