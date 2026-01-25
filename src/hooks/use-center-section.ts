"use client";

import { useEffect, useRef } from "react";

interface UseCenterSectionOptions {
  /**
   * viewport 중앙선 위치 (0~1, 기본값: 0.48)
   * 0.48 = viewport 높이의 48% 지점
   */
  centerRatio?: number;
  /**
   * 섹션 전환을 위한 최소 거리 차이 (px, 기본값: 80)
   * 새 섹션이 현재보다 이 값 이상 가까워야 전환
   */
  minDistanceDiff?: number;
  /**
   * 최소 유지 시간 (ms, 기본값: 200)
   * 섹션이 변경된 후 이 시간 동안은 다시 변경되지 않음
   */
  minHoldTime?: number;
  /**
   * 업데이트 주기 제어 (기본값: true)
   * false면 스크롤 이벤트마다, true면 rAF로 제어
   */
  useRAF?: boolean;
}

interface SectionData {
  element: HTMLElement;
  theme: string | null;
  midY: number; // 섹션 중심 Y 좌표
  top: number;
  bottom: number;
}

/**
 * viewport 중앙선 기준으로 활성 섹션을 결정하는 훅
 * 
 * @example
 * const activeSection = useCenterSection({
 *   centerRatio: 0.48,
 *   minDistanceDiff: 80,
 * });
 */
export function useCenterSection(options: UseCenterSectionOptions = {}) {
  const {
    centerRatio = 0.48,
    minDistanceDiff = 80,
    minHoldTime = 200,
    useRAF = true,
  } = options;

  const sectionsRef = useRef<Map<HTMLElement, SectionData>>(new Map());
  const activeSectionRef = useRef<HTMLElement | null>(null);
  const lastChangeTimeRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);
  const tickingRef = useRef<boolean>(false);

  useEffect(() => {
    // 섹션 데이터 수집
    const collectSections = (): Map<HTMLElement, SectionData> => {
      const sections = document.querySelectorAll<HTMLElement>("[data-theme]");
      const map = new Map<HTMLElement, SectionData>();

      sections.forEach((section) => {
        const theme = section.dataset.theme || null;
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

    // 활성 섹션 결정
    const updateActiveSection = () => {
      const now = Date.now();
      
      // 최소 유지 시간 체크
      if (now - lastChangeTimeRef.current < minHoldTime) {
        return;
      }

      const centerY = window.innerHeight * centerRatio;
      sectionsRef.current = collectSections();

      if (sectionsRef.current.size === 0) {
        return;
      }

      let candidate: HTMLElement | null = null;
      let minDistance = Infinity;
      let candidateDistance = Infinity;

      // 1단계: centerY를 포함하는 섹션 찾기
      for (const [element, data] of sectionsRef.current.entries()) {
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
        for (const [element, data] of sectionsRef.current.entries()) {
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
          const currentData = sectionsRef.current.get(currentElement);
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
          activeSectionRef.current = candidate;
          lastChangeTimeRef.current = now;
        }
      }

      tickingRef.current = false;
    };

    // 스크롤 핸들러
    const handleScroll = () => {
      if (!tickingRef.current) {
        if (useRAF) {
          rafIdRef.current = requestAnimationFrame(() => {
            updateActiveSection();
          });
        } else {
          updateActiveSection();
        }
        tickingRef.current = true;
      }
    };

    // 초기 업데이트
    updateActiveSection();

    // 스크롤 이벤트 리스너
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    // 동적 섹션 감지를 위한 MutationObserver
    const mutationObserver = new MutationObserver(() => {
      // 섹션이 추가/제거되면 다시 수집
      sectionsRef.current = collectSections();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      mutationObserver.disconnect();
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [centerRatio, minDistanceDiff, minHoldTime, useRAF]);

  // 활성 섹션의 테마 반환
  return activeSectionRef.current?.dataset.theme || null;
}

