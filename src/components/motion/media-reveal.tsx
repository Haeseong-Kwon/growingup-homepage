"use client";

import { useInView } from "@/hooks/use-in-view";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MediaRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  intensity?: "subtle" | "medium" | "strong";
}

export function MediaReveal({
  children,
  className,
  delay = 0,
  intensity = "subtle",
}: MediaRevealProps) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const prefersReducedMotion = useReducedMotion();

  const intensityStyles = {
    subtle: {
      initial: { opacity: 0, transform: "translateY(12px) scale(0.98)", filter: "blur(2px)" },
      final: { opacity: 1, transform: "translateY(0) scale(1)", filter: "blur(0)" },
      duration: 600,
    },
    medium: {
      initial: { opacity: 0, transform: "translateY(24px) scale(0.95)", filter: "blur(4px)" },
      final: { opacity: 1, transform: "translateY(0) scale(1)", filter: "blur(0)" },
      duration: 700,
    },
    strong: {
      initial: { opacity: 0, transform: "translateY(40px) scale(0.92)", filter: "blur(6px)" },
      final: { opacity: 1, transform: "translateY(0) scale(1)", filter: "blur(0)" },
      duration: 800,
    },
  };

  const style = intensityStyles[intensity];

  if (prefersReducedMotion) {
    return (
      <div ref={ref as any} className={className} style={{ opacity: inView ? 1 : 0, transition: "opacity 300ms ease" }}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref as any}
      className={className}
      style={{
        opacity: inView ? style.final.opacity : style.initial.opacity,
        transform: inView ? style.final.transform : style.initial.transform,
        filter: inView ? style.final.filter : style.initial.filter,
        transition: `opacity ${style.duration}ms ease ${delay}ms, transform ${style.duration}ms ease ${delay}ms, filter ${style.duration}ms ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

