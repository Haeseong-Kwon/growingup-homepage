"use client";

import { useEffect, useState, useRef, RefObject } from "react";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  ref?: RefObject<HTMLElement | null>;
  amount?: number;
}

export function useInView({
  threshold = 0.2,
  rootMargin = "0px 0px -20% 0px",
  triggerOnce = true,
  ref: externalRef,
  amount,
}: UseInViewOptions = {}) {
  const [inView, setInView] = useState(false);
  const internalRef = useRef<HTMLElement>(null);
  const ref = externalRef || internalRef;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    // amount 옵션이 있으면 threshold로 변환
    const effectiveThreshold = amount !== undefined ? amount : threshold;

    // prefers-reduced-motion 체크
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // 모션 감소 설정이면 즉시 표시
    if (prefersReducedMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setInView(false);
        }
      },
      {
        threshold: effectiveThreshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, amount, ref]);

  // 항상 { ref, inView } 형태로 반환 (외부 ref가 있으면 그것을 사용)
  return { ref, inView };
}

