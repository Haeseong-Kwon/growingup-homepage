"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "./use-reduced-motion";

interface UseThemeZoneOptions {
  /**
   * 테마 전환 디바운스 시간 (ms, 기본값: 180)
   */
  debounceMs?: number;
  /**
   * viewport 중앙선 위치 (0~1, 기본값: 0.48)
   */
  centerRatio?: number;
  /**
   * 섹션 전환을 위한 최소 거리 차이 (px, 기본값: 80)
   */
  minDistanceDiff?: number;
  /**
   * 최소 유지 시간 (ms, 기본값: 200)
   */
  minHoldTime?: number;
}

interface SectionData {
  element: HTMLElement;
  theme: string;
  midY: number;
  top: number;
  bottom: number;
}

/**
 * viewport 중앙선 기준으로 테마를 전환하는 훅
 * 섹션 경계가 아닌 섹션 중앙 기준으로 결정하여 깜빡임/흔들림을 제거
 */
export function useThemeZone({
  debounceMs = 180,
  centerRatio = 0.48,
  minDistanceDiff = 80,
  minHoldTime = 200,
}: UseThemeZoneOptions = {}) {
  const prefersReducedMotion = useReducedMotion();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const rafRef = useRef<number | null>(null);
  const currentThemeRef = useRef<string | null>(null);
  const sectionsDataRef = useRef<Map<HTMLElement, SectionData>>(new Map());
  const activeSectionRef = useRef<HTMLElement | null>(null);
  const lastChangeTimeRef = useRef<number>(0);
  const tickingRef = useRef<boolean>(false);
  
  // 안정화: theme 변경 쿨다운 (250ms)
  const themeCooldownRef = useRef<number>(0);
  const themeChangeCountRef = useRef<number>(0);
  const themeChangeTimeRef = useRef<number>(Date.now());
  
  // 개발 환경: theme 변경 빈도 체크
  const isDev = process.env.NODE_ENV === "development";

  useEffect(() => {
    // 테마 적용 함수 (안정화: 쿨다운 + 가드)
    const applyTheme = (newTheme: string) => {
      if (!newTheme || newTheme === currentThemeRef.current) return;

      const now = Date.now();
      
      // 쿨다운 체크 (250ms)
      if (now - themeCooldownRef.current < 250) {
        if (isDev) {
          console.warn("[useThemeZone] Theme change blocked by cooldown");
        }
        return;
      }

      // 개발 환경: theme 변경 빈도 체크
      if (isDev) {
        const timeSinceLastCheck = now - themeChangeTimeRef.current;
        if (timeSinceLastCheck < 1000) {
          themeChangeCountRef.current++;
          if (themeChangeCountRef.current > 5) {
            console.warn(
              `[useThemeZone] High theme change frequency: ${themeChangeCountRef.current} changes/sec`
            );
          }
        } else {
          themeChangeCountRef.current = 1;
          themeChangeTimeRef.current = now;
        }
      }

      const root = document.documentElement;
      root.classList.remove("theme-light", "theme-dark");

      if (prefersReducedMotion) {
        root.classList.add(`theme-${newTheme}`);
        currentThemeRef.current = newTheme;
        themeCooldownRef.current = now;
      } else {
        // RAF + 디바운스로 부드러운 전환
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }

        rafRef.current = requestAnimationFrame(() => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }

          timeoutRef.current = setTimeout(() => {
            root.classList.add(`theme-${newTheme}`);
            currentThemeRef.current = newTheme;
            themeCooldownRef.current = Date.now();
          }, debounceMs);
        });
      }
    };

    // 섹션 데이터 수집
    const collectSections = (): Map<HTMLElement, SectionData> => {
      const sections = document.querySelectorAll<HTMLElement>("[data-theme]");
      const map = new Map<HTMLElement, SectionData>();

      sections.forEach((section) => {
        const theme = section.dataset.theme;
        if (theme) {
          const rect = section.getBoundingClientRect();
          const midY = rect.top + rect.height / 2;

          map.set(section, {
            element: section,
            theme,
            midY,
            top: rect.top,
            bottom: rect.bottom,
          });
        }
      });

      return map;
    };

    // 활성 섹션 결정 및 테마 전환
    const updateActiveSection = () => {
      const now = Date.now();

      // 최소 유지 시간 체크
      if (now - lastChangeTimeRef.current < minHoldTime) {
        tickingRef.current = false;
        return;
      }

      const centerY = window.innerHeight * centerRatio;
      sectionsDataRef.current = collectSections();

      if (sectionsDataRef.current.size === 0) {
        tickingRef.current = false;
        return;
      }

      let candidate: HTMLElement | null = null;
      let minDistance = Infinity;
      let candidateDistance = Infinity;

      // 1단계: centerY를 포함하는 섹션 찾기
      for (const [element, data] of sectionsDataRef.current.entries()) {
        if (data.top <= centerY && centerY <= data.bottom) {
          const distance = Math.abs(data.midY - centerY);
          if (distance < minDistance) {
            minDistance = distance;
            candidate = element;
            candidateDistance = distance;
          }
        }
      }

      // 2단계: 포함하는 섹션이 없으면 가장 가까운 섹션 찾기
      if (!candidate) {
        for (const [element, data] of sectionsDataRef.current.entries()) {
          const distance = Math.abs(data.midY - centerY);
          if (distance < minDistance) {
            minDistance = distance;
            candidate = element;
            candidateDistance = distance;
          }
        }
      }

      // 3단계: 히스테리시스 적용
      if (candidate && candidate !== activeSectionRef.current) {
        const currentElement = activeSectionRef.current;
        let shouldChange = false;

        if (!currentElement) {
          // 현재 활성 섹션이 없으면 즉시 변경
          shouldChange = true;
        } else {
          const currentData = sectionsDataRef.current.get(currentElement);
          if (currentData) {
            const currentDistance = Math.abs(currentData.midY - centerY);
            // 새 섹션이 현재보다 minDistanceDiff 이상 가까우면 변경
            if (candidateDistance <= currentDistance - minDistanceDiff) {
              shouldChange = true;
            }
          } else {
            // 현재 섹션이 더 이상 존재하지 않으면 변경
            shouldChange = true;
          }
        }

        if (shouldChange) {
          const newTheme = candidate.dataset.theme;
          if (newTheme) {
            activeSectionRef.current = candidate;
            lastChangeTimeRef.current = now;
            applyTheme(newTheme);
          }
        }
      }

      tickingRef.current = false;
    };

    // 스크롤 핸들러 (rAF로 제어)
    const handleScroll = () => {
      if (!tickingRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          updateActiveSection();
        });
        tickingRef.current = true;
      }
    };

    // 초기 업데이트
    updateActiveSection();

    // 스크롤 및 리사이즈 이벤트 리스너
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    // 동적 섹션 감지를 위한 MutationObserver
    const mutationObserver = new MutationObserver(() => {
      // 섹션이 추가/제거되면 다시 수집하고 업데이트
      sectionsDataRef.current = collectSections();
      if (!tickingRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          updateActiveSection();
        });
        tickingRef.current = true;
      }
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      mutationObserver.disconnect();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      sectionsDataRef.current.clear();
    };
  }, [debounceMs, prefersReducedMotion, centerRatio, minDistanceDiff, minHoldTime]);
}

