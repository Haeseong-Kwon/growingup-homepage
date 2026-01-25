"use client";

import { useEffect, useState, useRef } from "react";

interface UseScrollSpyOptions {
  sectionIds: string[];
  offset?: number;
  rootMargin?: string;
  threshold?: number;
}

export function useScrollSpy({
  sectionIds,
  offset = 0,
  rootMargin = "0px 0px -60% 0px",
  threshold = 0.2,
}: UseScrollSpyOptions) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const tickingRef = useRef<boolean>(false);
  const lastActiveIdRef = useRef<string | null>(null);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const visibleSections = new Map<string, boolean>();

    const updateActiveSection = () => {
      if (tickingRef.current) return;
      
      tickingRef.current = true;
      
      window.requestAnimationFrame(() => {
        // 보이는 섹션 중 가장 위에 있는 것을 active로
        const visibleIds = Array.from(visibleSections.entries())
          .filter(([_, isVisible]) => isVisible)
          .map(([id]) => id);

        const newActiveId = visibleIds.length > 0 ? visibleIds[0] : null;
        
        // 안정화: 동일한 값이면 setState 호출하지 않음
        if (newActiveId !== lastActiveIdRef.current) {
          lastActiveIdRef.current = newActiveId;
          setActiveId(newActiveId);
        }

        tickingRef.current = false;
      });
    };

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleSections.set(entry.target.id, entry.isIntersecting);
        });
        updateActiveSection();
      },
      {
        rootMargin,
        threshold,
      }
    );

    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, [sectionIds, rootMargin, threshold]);

  return activeId;
}

