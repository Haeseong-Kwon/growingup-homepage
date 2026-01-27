"use client";

import { useEffect, useState, useRef, RefObject } from "react";
import { useInView } from "./use-in-view";

interface UseCountUpOptions {
  end: number;
  duration?: number;
  start?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  enabled?: boolean;
}

export function useCountUp({
  end,
  duration = 2000,
  start = 0,
  decimals = 0,
  suffix = "",
  prefix = "",
  enabled = true,
}: UseCountUpOptions) {
  const [count, setCount] = useState(start);
  const divRef = useRef<HTMLDivElement>(null);
  const { inView } = useInView({ 
    threshold: 0.3, 
    triggerOnce: true,
    ref: divRef as RefObject<HTMLElement | null>
  });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!enabled || !inView || hasAnimated.current) return;

    hasAnimated.current = true;
    const startTime = Date.now();
    const difference = end - start;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = start + difference * easeOut;

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, end, start, duration, enabled]);

  const formatNumber = (num: number): string => {
    const rounded = decimals > 0 ? num.toFixed(decimals) : Math.floor(num).toString();
    
    // 천 단위 콤마 추가
    const parts = rounded.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
    return prefix + parts.join(".") + suffix;
  };

  return { ref: divRef, count: formatNumber(count), rawCount: count };
}

