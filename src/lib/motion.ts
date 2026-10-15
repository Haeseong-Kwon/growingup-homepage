/**
 * The site's motion vocabulary. Every reveal, wipe and scroll-scrubbed transform
 * reads from here, so sections move with one voice instead of eight near-misses.
 */

/** Signature ease-out (expo): entrances and reveals. */
export const EASE = [0.16, 1, 0.3, 1] as const;

/** In-out (quart): wipes and panels that cover then uncover. */
export const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const;

/** Row/block entrance length, and the longer one for display headings. */
export const DURATION = 0.9;
export const DURATION_HEADING = 1.05;

/** Delay between siblings in a staggered group. */
export const STAGGER = 0.08;

/** Shared in-view trigger: fires once, a little inside the viewport edge. */
export const REVEAL_VIEWPORT = { once: true, margin: "-12% 0px -12% 0px" } as const;

/**
 * Smoothing for scroll-linked transforms. Critically damped: it settles without
 * overshoot, and is quick enough that it doesn't stack a second visible lag on
 * top of the wheel smoothing (Lenis) — the floatiness an overdamped spring adds.
 */
export const SCROLL_SPRING = { stiffness: 100, damping: 13, mass: 0.4, restDelta: 0.0005 } as const;
