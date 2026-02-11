"use client";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

interface SplitTextRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  align?: "left" | "center" | "right";
  split?: "words" | "chars";
  direction?: "lr" | "ud";
  delay?: number;
  className?: string;
  viewportMargin?: string;
}

export function SplitTextReveal({
  text,
  as: Component = "h2",
  align = "left",
  split = "words",
  direction = "lr",
  delay = 0,
  className,
  viewportMargin = "-10% 0px -10% 0px", // 기본적으로 화면에 타이트하게 들어왔을 때 실행
}: SplitTextRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: viewportMargin as any });

  // 텍스트 분할
  const splitText = () => {
    if (split === "words") {
      return text.split(/\s+/).filter((word) => word.length > 0);
    } else {
      return text.split("").filter((char) => char !== " ");
    }
  };

  const parts = splitText();

  const alignStyles = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  // Framer Motion Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay / 1000,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      x: direction === "lr" ? -10 : 0,
      y: direction === "ud" ? 10 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        duration: 0.4,
      },
    },
  };

  // Reduced Motion 대응
  if (prefersReducedMotion) {
    return (
      <Component
        className={cn(className)}
        style={{ opacity: 1 }} // 기본적으로 보임
      >
        {text}
      </Component>
    );
  }

  // Motion Component 생성
  const MotionComponent = motion(Component as any);

  return (
    <MotionComponent
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={cn(
        "flex flex-wrap gap-x-[0.25em] gap-y-0", // word spacing 보정
        alignStyles[align],
        className
      )}
    >
      {parts.map((part, index) => (
        <motion.span
          key={index}
          className="inline-block whitespace-pre" // 공백 유지
          variants={itemVariants}
        >
          {part}
          {/* words 모드일 때 스페이스 추가 로직은 gap-x로 대체하거나 필요시 추가 */}
        </motion.span>
      ))}
    </MotionComponent>
  );
}
