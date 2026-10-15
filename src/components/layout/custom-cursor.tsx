"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type CursorMode = "hidden" | "dot" | "link" | "label";

/** Size of the disc at full scale; every mode is a scale of this one element. */
const DISC = 92;
const SCALE: Record<CursorMode, number> = { hidden: 0, dot: 0.11, link: 0.5, label: 1 };
/** Snappy enough to feel attached to the hand, with just enough settle to read as weight. */
const FOLLOW = { stiffness: 900, damping: 50, mass: 0.25 };

/**
 * Desktop pointer, drawn as one disc that changes scale with context: a small
 * dot in open space, a ring over links, and a labelled disc over anything that
 * declares `data-cursor="보기"`. Only on fine pointers with hover; touch devices
 * and reduced-motion visitors keep the native cursor and never mount it.
 */
export function CustomCursor() {
  const [mode, setMode] = useState<CursorMode>("hidden");
  const [label, setLabel] = useState("");

  const x = useMotionValue(-DISC);
  const y = useMotionValue(-DISC);
  const sx = useSpring(x, FOLLOW);
  const sy = useSpring(y, FOLLOW);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    document.documentElement.classList.add("has-cursor");

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = (e.target as Element | null)?.closest<HTMLElement>(
        "[data-cursor], a, button, [role='button'], label, summary"
      );
      if (target?.dataset.cursor) {
        setMode("label");
        setLabel(target.dataset.cursor);
      } else {
        setMode(target ? "link" : "dot");
      }
    };
    const onLeave = () => setMode("hidden");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [x, y]);

  // Rendered everywhere but scaled to zero until the first pointer move, so
  // touch devices (which never attach the listener) never see it.
  const isLabel = mode === "label";

  return (
    <motion.div
      aria-hidden
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-[10002] flex items-center justify-center rounded-full",
        // The dot and ring invert whatever they cross, so one white disc reads on
        // ink and on paper alike; the labelled disc stays solid so its text reads.
        isLabel ? "bg-white text-[var(--ink)]" : "bg-white mix-blend-difference",
        mode === "link" && "bg-transparent ring-2 ring-white"
      )}
      style={{ x: sx, y: sy, width: DISC, height: DISC, translateX: "-50%", translateY: "-50%" }}
      animate={{ scale: SCALE[mode] }}
      transition={{ type: "spring", stiffness: 400, damping: 32, mass: 0.4 }}
    >
      <motion.span
        className="text-[13px] font-semibold tracking-[-0.01em]"
        animate={{ opacity: isLabel ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.span>
    </motion.div>
  );
}
