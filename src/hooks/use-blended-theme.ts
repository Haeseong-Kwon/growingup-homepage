"use client";

import { useEffect, useRef } from "react";
import { PALETTES, DEFAULT_PALETTE, type Palette, type PaletteName } from "@/lib/palette";
import { useReducedMotion } from "./use-reduced-motion";

/**
 * RGB 색상 파싱 및 보간 유틸리티
 */
function parseColor(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return [r, g, b];
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${Math.round(r).toString(16).padStart(2, "0")}${Math.round(g).toString(16).padStart(2, "0")}${Math.round(b).toString(16).padStart(2, "0")}`;
}

function lerpColor(color1: Palette, color2: Palette, t: number): Palette {
  // t를 0~1로 클램프
  const clampedT = Math.max(0, Math.min(1, t));

  // 각 색상 속성에 대해 RGB 보간
  const blend = (hex1: string, hex2: string): string => {
    const [r1, g1, b1] = parseColor(hex1);
    const [r2, g2, b2] = parseColor(hex2);
    const r = r1 + (r2 - r1) * clampedT;
    const g = g1 + (g2 - g1) * clampedT;
    const b = b1 + (b2 - b1) * clampedT;
    return rgbToHex(r, g, b);
  };

  // rgba 문자열 파싱 (border, surface)
  const blendRgba = (rgba1: string, rgba2: string): string => {
    // rgba(r,g,b,a) 또는 rgba(r,g,b,a) 형식 파싱
    const match1 = rgba1.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    const match2 = rgba2.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);

    if (match1 && match2) {
      const r1 = parseInt(match1[1]);
      const g1 = parseInt(match1[2]);
      const b1 = parseInt(match1[3]);
      const a1 = match1[4] ? parseFloat(match1[4]) : 1;

      const r2 = parseInt(match2[1]);
      const g2 = parseInt(match2[2]);
      const b2 = parseInt(match2[3]);
      const a2 = match2[4] ? parseFloat(match2[4]) : 1;

      const r = r1 + (r2 - r1) * clampedT;
      const g = g1 + (g2 - g1) * clampedT;
      const b = b1 + (b2 - b1) * clampedT;
      const a = a1 + (a2 - a1) * clampedT;

      return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${a.toFixed(2)})`;
    }

    // 파싱 실패 시 첫 번째 색상 반환
    return rgba1;
  };

  return {
    bg: blend(color1.bg, color2.bg),
    fg: blend(color1.fg, color2.fg),
    surface: blendRgba(color1.surface, color2.surface),
    border: blendRgba(color1.border, color2.border),
  };
}

/**
 * smoothstep 함수: 완만한 전환을 위한 easing
 */
function smoothstep(t: number): number {
  const clamped = Math.max(0, Math.min(1, t));
  return clamped * clamped * (3 - 2 * clamped);
}

/**
 * clamp 함수
 */
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

interface SectionData {
  element: HTMLElement;
  palette: Palette;
  bandHeight: number;
}

/**
 * 블렌딩 기반 컬러 엔진 훅
 * 스크롤 진행도에 따라 섹션 간 색상을 자연스럽게 블렌딩
 */
export function useBlendedTheme() {
  const prefersReducedMotion = useReducedMotion();
  const sectionsRef = useRef<SectionData[]>([]);
  const rafRef = useRef<number | null>(null);
  const needsUpdateRef = useRef<boolean>(false);
  const lastBlendedRef = useRef<Palette | null>(null);
  const appShellRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // app-shell 요소 찾기
    appShellRef.current = document.getElementById("app-shell");

    if (!appShellRef.current) {
      console.warn("[useBlendedTheme] app-shell element not found");
      return;
    }

    // 섹션 데이터 수집 (data-section="true"와 data-palette가 있는 섹션만)
    const collectSections = (): SectionData[] => {
      const sections = document.querySelectorAll<HTMLElement>('[data-section="true"][data-palette]');
      const data: SectionData[] = [];

      sections.forEach((section) => {
        const paletteName = section.dataset.palette;
        const bandHeight = Number(section.dataset.band ?? 120);
        
        if (paletteName && paletteName in PALETTES) {
          data.push({
            element: section,
            palette: PALETTES[paletteName as PaletteName],
            bandHeight,
          });
        }
      });

      // DOM 순서대로 정렬 (getBoundingClientRect로 실시간 계산)
      return data;
    };

    // 블렌딩 계산 및 적용 (섹션 단위 고정 + Blend Band 전환)
    const updateBlendedTheme = () => {
      if (!appShellRef.current) return;

      const viewportCenter = window.innerHeight * 0.5;

      sectionsRef.current = collectSections();

      if (sectionsRef.current.length === 0) {
        // 섹션이 없으면 기본 팔레트 적용
        const defaultPalette = DEFAULT_PALETTE;
        applyPalette(defaultPalette);
        return;
      }

      // 현재 섹션(cur) 찾기: viewportCenter가 rect.top~rect.bottom 사이에 들어가는 섹션
      let cur: SectionData | null = null;
      let next: SectionData | null = null;

      for (let i = 0; i < sectionsRef.current.length; i++) {
        const section = sectionsRef.current[i];
        const rect = section.element.getBoundingClientRect();
        
        // viewportCenter가 섹션 내부에 있는지 확인
        if (rect.top <= viewportCenter && viewportCenter <= rect.bottom) {
          cur = section;
          // 다음 섹션이 있으면 가져오기
          if (i < sectionsRef.current.length - 1) {
            next = sectionsRef.current[i + 1];
          }
          break;
        }
      }

      // 현재 섹션을 찾지 못한 경우, 가장 가까운 섹션 찾기
      if (!cur) {
        let minDistance = Infinity;
        for (let i = 0; i < sectionsRef.current.length; i++) {
          const section = sectionsRef.current[i];
          const rect = section.element.getBoundingClientRect();
          const sectionMidY = rect.top + rect.height / 2;
          const distance = Math.abs(sectionMidY - viewportCenter);
          
          if (distance < minDistance) {
            minDistance = distance;
            cur = section;
            // 다음 섹션 찾기
            if (i < sectionsRef.current.length - 1) {
              next = sectionsRef.current[i + 1];
            }
          }
        }
      }

      if (!cur) {
        // 여전히 섹션을 찾지 못한 경우 기본 팔레트
        applyPalette(DEFAULT_PALETTE);
        return;
      }

      // Blend Band 전환 구간 계산
      let progress = 0;
      if (next) {
        const curRect = cur.element.getBoundingClientRect();
        const bandHeight = cur.bandHeight;
        
        // 전환 구간 정의: cur 섹션의 bottom에서 위로 bandHeight 만큼
        const transitionStart = curRect.bottom - bandHeight;
        const transitionEnd = curRect.bottom;
        
        // progress 계산: viewportCenter가 전환 구간에 있는지 확인
        if (viewportCenter >= transitionStart && viewportCenter <= transitionEnd) {
          // 전환 구간 내부: 0~1 사이 값
          const t = clamp(
            (viewportCenter - transitionStart) / (transitionEnd - transitionStart),
            0,
            1
          );
          // smoothstep으로 부드럽게
          progress = smoothstep(t);
        } else if (viewportCenter < transitionStart) {
          // 전환 구간 밖 (섹션 내부): t=0으로 고정
          progress = 0;
        } else {
          // 전환 구간 밖 (다음 섹션): t=1
          progress = 1;
        }
      }

      // 블렌딩
      const blended = next
        ? lerpColor(cur.palette, next.palette, progress)
        : cur.palette;

      // 적용
      applyPalette(blended);
    };

    // 팔레트 적용 (변경폭이 작으면 skip)
    const applyPalette = (palette: Palette) => {
      if (!appShellRef.current) return;

      // 이전 값과 비교하여 변경폭이 작으면 skip
      if (lastBlendedRef.current) {
        const delta = calculateDelta(lastBlendedRef.current, palette);
        if (delta < 1) {
          // 변경폭이 너무 작으면 skip
          return;
        }
      }

      // CSS 변수 직접 설정
      appShellRef.current.style.setProperty("--bg", palette.bg);
      appShellRef.current.style.setProperty("--fg", palette.fg);
      appShellRef.current.style.setProperty("--surface", palette.surface);
      appShellRef.current.style.setProperty("--border", palette.border);

      lastBlendedRef.current = palette;
    };

    // 색상 차이 계산 (간단한 RGB 거리)
    const calculateDelta = (palette1: Palette, palette2: Palette): number => {
      const [r1, g1, b1] = parseColor(palette1.bg);
      const [r2, g2, b2] = parseColor(palette2.bg);
      const delta = Math.sqrt(
        Math.pow(r2 - r1, 2) + Math.pow(g2 - g1, 2) + Math.pow(b2 - b1, 2)
      );
      return delta;
    };

    // rAF 루프
    const rafLoop = () => {
      if (needsUpdateRef.current) {
        updateBlendedTheme();
        needsUpdateRef.current = false;
      }
      rafRef.current = requestAnimationFrame(rafLoop);
    };

    // 스크롤 핸들러 (needsUpdate만 설정)
    const handleScroll = () => {
      needsUpdateRef.current = true;
    };

    // 리사이즈 핸들러
    const handleResize = () => {
      needsUpdateRef.current = true;
    };

    // 초기 업데이트
    updateBlendedTheme();

    // reduced-motion이면 업데이트 빈도 줄이기
    if (prefersReducedMotion) {
      // reduced-motion: 토글 방식으로 대체 (섹션 경계에서만 변경)
      const handleScrollReduced = () => {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }
        rafRef.current = requestAnimationFrame(() => {
          updateBlendedTheme();
        });
      };
      window.addEventListener("scroll", handleScrollReduced, { passive: true });
      window.addEventListener("resize", handleResize, { passive: true });

      return () => {
        window.removeEventListener("scroll", handleScrollReduced);
        window.removeEventListener("resize", handleResize);
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }
      };
    }

    // 일반 모드: rAF 루프 시작
    rafRef.current = requestAnimationFrame(rafLoop);

    // 이벤트 리스너
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    // 동적 섹션 감지
    const mutationObserver = new MutationObserver(() => {
      needsUpdateRef.current = true;
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      mutationObserver.disconnect();
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [prefersReducedMotion]);
}

