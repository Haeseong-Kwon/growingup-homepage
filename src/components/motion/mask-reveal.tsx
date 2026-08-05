"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

interface MaskRevealProps {
  /** One entry per line. Each line rides up from behind its own hard edge. */
  lines: string[];
  as?: "h1" | "h2" | "h3" | "p" | "div";
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  /** Play immediately (hero) instead of waiting for the viewport. */
  immediate?: boolean;
  /**
   * Keep the revealed state once played. Off by default: the reference plays
   * forward on entry and reverses on exit, so scrolling back up re-arms every
   * reveal instead of leaving a page of already-landed type behind you.
   */
  once?: boolean;
}

/**
 * The reference's foundational text move: type is clipped by an overflow edge and
 * translated up into place, so it reads as revealed rather than faded in.
 */
export function MaskReveal({
  lines,
  as = "div",
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
  immediate = false,
  once = false,
}: MaskRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const Tag = as;

  if (prefersReducedMotion) {
    return (
      <Tag className={className}>
        {lines.map((line, i) => (
          <span key={i} className={cn("block", lineClassName)}>
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  const animationProps = immediate
    ? { animate: "visible" as const }
    : {
        whileInView: "visible" as const,
        // The bottom margin keeps the reveal from re-arming while the line is
        // still comfortably on screen, so small scroll jitter never re-triggers it.
        viewport: { once, margin: "-12% 0px -12% 0px" },
      };

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <motion.span
          key={i}
          className="mask-line"
          initial="hidden"
          {...animationProps}
        >
          <motion.span
            className={cn("block", lineClassName)}
            variants={{
              hidden: { y: "108%", rotate: 1.5 },
              visible: { y: "0%", rotate: 0 },
            }}
            transition={{
              duration: 1.05,
              ease: EASE,
              delay: delay + i * stagger,
            }}
          >
            {line}
          </motion.span>
        </motion.span>
      ))}
    </Tag>
  );
}
