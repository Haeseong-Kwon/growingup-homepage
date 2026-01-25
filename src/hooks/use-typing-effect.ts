"use client";

import { useEffect, useState } from "react";

interface UseTypingEffectOptions {
  text: string;
  speed?: number;
  delay?: number;
}

export function useTypingEffect({
  text,
  speed = 80,
  delay = 300,
}: UseTypingEffectOptions) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // prefers-reduced-motion 체크
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // 모션 감소 설정이면 즉시 전체 텍스트 표시
    if (prefersReducedMotion) {
      setDisplayedText(text);
      setIsComplete(true);
      return;
    }

    // 초기 딜레이
    const delayTimeout = setTimeout(() => {
      let currentIndex = 0;

      const typingInterval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          setIsComplete(true);
          clearInterval(typingInterval);
        }
      }, speed);

      return () => clearInterval(typingInterval);
    }, delay);

    return () => clearTimeout(delayTimeout);
  }, [text, speed, delay]);

  return { displayedText, isComplete };
}

