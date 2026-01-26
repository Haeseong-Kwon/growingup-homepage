"use client";

import { useInView } from "@/hooks/use-in-view";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface SplitTextRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  align?: "left" | "center" | "right";
  split?: "words" | "chars";
  direction?: "lr" | "ud";
  delay?: number;
  className?: string;
}

export function SplitTextReveal({
  text,
  as: Component = "h2",
  align = "left",
  split = "words",
  direction = "lr",
  delay = 0,
  className,
}: SplitTextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { inView: isInView } = useInView({ 
    amount: 0.4,
    triggerOnce: true,
    ref: containerRef 
  });
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 텍스트 분할
  const splitText = () => {
    if (split === "words") {
      return text.split(/\s+/).filter((word) => word.length > 0);
    } else {
      return text.split("").filter((char) => char !== " ");
    }
  };

  const parts = splitText();
  const staggerDelay = 20; // ms

  const alignStyles = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  const directionStyles = {
    lr: {
      initial: direction === "lr" ? "translate-x-[-8px]" : "translate-x-[8px]",
      final: "translate-x-0",
    },
    ud: {
      initial: direction === "ud" ? "translate-y-[-8px]" : "translate-y-[8px]",
      final: "translate-y-0",
    },
  };

  const style = directionStyles[direction];

  // Reduced motion이면 분할 없이 표시
  if (prefersReducedMotion || !mounted) {
    return (
      <Component
        ref={containerRef as any}
        className={cn(className)}
        style={{ opacity: isInView ? 1 : 0, transition: "opacity 300ms ease" }}
      >
        {text}
      </Component>
    );
  }

  return (
    <Component
      ref={containerRef as any}
      className={cn(
        "flex flex-wrap gap-x-1 gap-y-0",
        alignStyles[align],
        className
      )}
    >
      {parts.map((part, index) => {
        const itemDelay = delay + index * staggerDelay;
        const isVisible = isInView;

        return (
          <span
            key={index}
            className="inline-block"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? style.final : style.initial,
              transition: `opacity 600ms ease ${itemDelay}ms, transform 600ms ease ${itemDelay}ms`,
            }}
          >
            {part}
            {split === "words" && index < parts.length - 1 && "\u00A0"}
          </span>
        );
      })}
    </Component>
  );
}

