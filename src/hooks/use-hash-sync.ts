"use client";

import { useEffect, useRef } from "react";

/**
 * ⚠️ 안정화: 스크롤 중 hash sync 비활성화
 * hash sync는 사용자 클릭 이동 시에만 동작 (scrollToSection 함수에서만)
 */
export function useHashSync(activeSection: string | null) {
  // 스크롤 중 hash sync는 비활성화 (안정화)
  // hash는 scrollToSection 함수에서만 업데이트됨
  // useEffect(() => {
  //   if (!activeSection) return;
  //   // ... 비활성화
  // }, [activeSection]);
}

export function scrollToSection(sectionId: string, offset = 88) {
  const element = document.getElementById(sectionId);
  if (!element) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: prefersReducedMotion ? "auto" : "smooth",
  });

  // URL hash 업데이트
  history.pushState(null, "", `#${sectionId}`);
}

