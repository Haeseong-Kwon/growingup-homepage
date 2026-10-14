"use client";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";
import { motion, useInView, Variants } from "framer-motion";
import { ReactNode, useRef } from "react";

interface MediaRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  intensity?: "subtle" | "medium" | "strong";
  viewportMargin?: string;
}

export function MediaReveal({
  children,
  className,
  delay = 0,
  intensity = "subtle",
  viewportMargin = "-50px" // 약간의 여유
}: MediaRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: viewportMargin as any });

  const intensityVariants: Record<string, Variants> = {
    subtle: {
      hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
      visible: { opacity: 1, y: 0, filter: "blur(0px)" },
    },
    medium: {
      hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
      visible: { opacity: 1, y: 0, filter: "blur(0px)" },
    },
    strong: {
      hidden: { opacity: 0, y: 60, scale: 0.95, filter: "blur(10px)" },
      visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    },
  };

  const variants = intensityVariants[intensity];

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        delay: delay / 1000,
      }}
      className={cn(className, "will-change-transform")} // 힌트 제공
    >
      {children}
    </motion.div>
  );
}
