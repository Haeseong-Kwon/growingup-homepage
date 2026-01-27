"use client";

import { useEffect, useRef } from "react";

/**
 * ThemeObserver: IntersectionObserver를 사용하여 스크롤에 따라
 * 화면 중앙 근처에 가장 많이 들어온 섹션의 data-theme 값을 읽어
 * document.documentElement.dataset.theme에 설정합니다.
 * 
 * - 쿨다운: 마지막 변경 후 200ms 내에는 변경하지 않음
 * - 성능: scroll 이벤트 리스너 사용 금지, IntersectionObserver만 사용
 * - 크로스페이드: 테마 변경 시 이전 배경색 오버레이로 부드러운 전환
 */
export function ThemeObserver() {
  const lastChangeTimeRef = useRef<number>(0);
  const currentThemeRef = useRef<string | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotionRef = useRef<boolean>(false);

  useEffect(() => {
    // prefers-reduced-motion 체크
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotionRef.current = mediaQuery.matches;
    
    const handleChange = () => {
      prefersReducedMotionRef.current = mediaQuery.matches;
    };
    mediaQuery.addEventListener("change", handleChange);

    // 크로스페이드 오버레이 생성 (한 번만)
    const overlay = document.createElement("div");
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      opacity: 0;
      transition: opacity 240ms ease-out;
    `;
    document.body.appendChild(overlay);
    overlayRef.current = overlay;

    // 모든 섹션의 intersection 상태를 추적
    const sectionStates = new Map<HTMLElement, IntersectionObserverEntry>();

    // IntersectionObserver 설정
    // 화면 중앙 근처에 가장 많이 들어온 섹션을 active로 간주
    const observer = new IntersectionObserver(
      (entries) => {
        // 섹션 상태 업데이트
        entries.forEach((entry) => {
          sectionStates.set(entry.target as HTMLElement, entry);
        });

        const now = Date.now();
        const cooldown = 200; // 200ms 쿨다운

        // 현재 시간이 쿨다운 기간 내면 무시
        if (now - lastChangeTimeRef.current < cooldown) {
          return;
        }

        // 화면 중앙 근처에 가장 많이 들어온 섹션 찾기
        let bestEntry: IntersectionObserverEntry | null = null;
        let bestScore = -1;
        const viewportHeight = window.innerHeight;
        const centerY = viewportHeight / 2;

        sectionStates.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const rect = entry.boundingClientRect;
          const entryCenterY = rect.top + rect.height / 2;
          const distanceFromCenter = Math.abs(entryCenterY - centerY);
          
          // 화면 중앙에 가까울수록, 많이 보일수록 높은 점수
          // 거리 점수 (중앙에 가까울수록 높음) + intersection ratio
          const distanceScore = Math.max(0, 1 - distanceFromCenter / (viewportHeight * 0.5));
          const ratioScore = entry.intersectionRatio;
          const totalScore = distanceScore * 0.6 + ratioScore * 0.4;

          if (totalScore > bestScore) {
            bestScore = totalScore;
            bestEntry = entry;
          }
        });

        if (bestEntry) {
          const target = bestEntry.target as HTMLElement;
          const newTheme = target.dataset.theme;

          if (newTheme && newTheme !== currentThemeRef.current) {
            const previousTheme = currentThemeRef.current;
            currentThemeRef.current = newTheme;

            // 크로스페이드: 이전 배경색을 오버레이에 설정
            if (overlayRef.current && previousTheme && !prefersReducedMotionRef.current) {
              const previousBg = previousTheme === "dark" ? "#0b0c0f" : "#ffffff";
              overlayRef.current.style.backgroundColor = previousBg;
              overlayRef.current.style.opacity = "1";

              // 페이드아웃
              requestAnimationFrame(() => {
                if (overlayRef.current) {
                  overlayRef.current.style.opacity = "0";
                }
              });

              // 애니메이션 완료 후 오버레이 제거 (재사용을 위해 유지)
              setTimeout(() => {
                if (overlayRef.current) {
                  overlayRef.current.style.opacity = "0";
                }
              }, 240);
            }

            // 테마 변경
            document.documentElement.dataset.theme = newTheme;
            lastChangeTimeRef.current = now;
          }
        }
      },
      {
        // threshold를 여러 단계로 설정하여 더 정확한 감지
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: "0px",
      }
    );

    // 모든 [data-theme] 엘리먼트 관찰
    const sections = document.querySelectorAll<HTMLElement>("[data-theme]");
    sections.forEach((section) => {
      observer.observe(section);
    });

    // 초기 테마 설정 (첫 번째 섹션)
    if (sections.length > 0) {
      const firstSection = sections[0];
      const initialTheme = firstSection.dataset.theme;
      if (initialTheme) {
        document.documentElement.dataset.theme = initialTheme;
        currentThemeRef.current = initialTheme;
      }
    }

    // cleanup
    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", handleChange);
      if (overlayRef.current && overlayRef.current.parentNode) {
        overlayRef.current.parentNode.removeChild(overlayRef.current);
      }
    };
  }, []);

  return null;
}

