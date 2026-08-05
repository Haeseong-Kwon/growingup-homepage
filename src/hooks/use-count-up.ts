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
  /** Re-run the count every time the element re-enters the viewport. */
  replay?: boolean;
}

export function useCountUp({
  end,
  duration = 2000,
  start = 0,
  decimals = 0,
  suffix = "",
  prefix = "",
  enabled = true,
  replay = false,
}: UseCountUpOptions) {
  const [count, setCount] = useState(start);
  const divRef = useRef<HTMLDivElement>(null);
  const { inView } = useInView({
    threshold: 0.3,
    triggerOnce: !replay,
    ref: divRef as RefObject<HTMLElement | null>,
  });

  useEffect(() => {
    if (!enabled) return;

    // Out of view in replay mode: rewind so the next entry counts up again.
    if (!inView) {
      if (replay) setCount(start);
      return;
    }

    let frame = 0;
    let startTime: number | null = null;
    const difference = end - start;

    // rAF timestamps keep the curve tied to frame time rather than wall-clock
    // reads, so the count stays smooth under load.
    const animate = (now: number) => {
      startTime ??= now;
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCount(progress < 1 ? start + difference * eased : end);
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [inView, end, start, duration, enabled, replay]);

  const formatNumber = (num: number): string => {
    const rounded = decimals > 0 ? num.toFixed(decimals) : Math.floor(num).toString();
    
    // 천 단위 콤마 추가
    const parts = rounded.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
    return prefix + parts.join(".") + suffix;
  };

  return { ref: divRef, count: formatNumber(count), rawCount: count };
}

