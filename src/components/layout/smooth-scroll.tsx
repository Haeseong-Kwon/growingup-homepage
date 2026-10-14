"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

let instance: Lenis | null = null;

/** Pause/resume wheel smoothing while a modal layer owns the screen. */
export function setScrollLocked(locked: boolean) {
  if (instance) {
    if (locked) instance.stop();
    else instance.start();
  }
  document.documentElement.style.overflow = locked ? "hidden" : "";
}

/**
 * Inertial wheel scrolling on pointer devices. It still drives the native
 * scroll position, so sticky pins and framer-motion's useScroll keep working
 * unchanged. Touch devices keep native momentum, which is already good and
 * which users expect; reduced-motion users keep the native wheel.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (coarse || reduced) return;

    instance = new Lenis({ lerp: 0.1, smoothWheel: true, anchors: true, autoRaf: true });
    return () => {
      instance?.destroy();
      instance = null;
    };
  }, []);

  // New route starts at the top, without gliding there from the old position.
  useEffect(() => {
    instance?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
