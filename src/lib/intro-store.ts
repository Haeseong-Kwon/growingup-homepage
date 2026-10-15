import { useSyncExternalStore } from "react";

/**
 * Whether the front-door intro has finished. The preloader flips it once its
 * curtain opens; the hero waits on it so the headline rises *out of* the
 * curtain instead of animating unseen underneath it.
 *
 * Module state, not React state: it must survive client-side navigation so the
 * intro plays once per hard load, never again when the visitor returns home.
 */
let done = false;
const listeners = new Set<() => void>();

export function markIntroDone() {
  if (done) return;
  done = true;
  listeners.forEach((listener) => listener());
}

export function isIntroDone() {
  return done;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Server render assumes the intro is still to come (the curtain is in the HTML). */
export function useIntroDone(): boolean {
  return useSyncExternalStore(subscribe, () => done, () => false);
}
