"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface Cube3DProps {
  /** Front face artwork. */
  image: string;
  imageAlt: string;
  /** Right face: rows of keywords, justified edge to edge like a specimen sheet. */
  wordRows: string[][];
  className?: string;
  /**
   * The element the rotation is scrubbed against. Must be the tall track that
   * holds the sticky pin, so 0→1 maps exactly onto the pinned duration — binding
   * to anything taller finishes the turn before the cube is even pinned.
   */
  trackRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * Two-faced cube pinned in the viewport and rotated by scroll: the image face
 * turns away and the keyword face turns in. Depth comes from real 3D transforms
 * (preserve-3d + translateZ), not from a crossfade, so the edge stays visible
 * through the turn.
 *
 * `--cube` carries the edge length so the half-depth offsets stay in sync with
 * the responsive width.
 */
export function Cube3D({
  image,
  imageAlt,
  wordRows,
  className,
  trackRef,
}: Cube3DProps) {
  const prefersReducedMotion = useReducedMotion();

  // "start start" → "end end" is exactly the window during which the parent is
  // pinned, so the turn begins and ends with the pin.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // Hold → turn → hold, so each face stays still long enough to be read.
  const rawRotate = useTransform(scrollYProgress, [0.22, 0.72], [0, -90]);
  const rotateY = useSpring(rawRotate, { stiffness: 120, damping: 30, mass: 0.4 });
  const scale = useTransform(scrollYProgress, [0, 0.3, 1], [0.9, 1, 1]);

  const sizeStyle = { "--cube": "min(460px, 74vw)" } as React.CSSProperties;

  if (prefersReducedMotion) {
    return (
      <div className={cn("flex justify-center", className)} style={sizeStyle}>
        <div className="relative aspect-square w-[var(--cube)] overflow-hidden bg-[var(--ink-soft)]">
          <Image src={image} alt={imageAlt} fill className="object-cover" sizes="460px" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn("flex items-center justify-center", className)}
      style={{ ...sizeStyle, perspective: "1400px" }}
    >
      {/* Pushed back by half an edge so the front face sits flush with the screen
          plane and the cube turns about an axis behind it. */}
      <div
        className="[transform-style:preserve-3d]"
        style={{ transform: "translateZ(calc(var(--cube) / -2))" }}
      >
        <motion.div
          className="relative aspect-square w-[var(--cube)] [transform-style:preserve-3d]"
          style={{ rotateY, scale }}
        >
          {/* Front face */}
          <div
            className="absolute inset-0 overflow-hidden bg-[var(--ink-soft)]"
            style={{ transform: "translateZ(calc(var(--cube) / 2))" }}
          >
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="scale-[1.7] object-cover object-bottom"
              sizes="430px"
            />
          </div>

          {/* Right face — keyword specimen */}
          <div
            className="absolute inset-0 flex flex-col justify-between bg-[var(--ink)] p-2.5"
            style={{
              transform: "rotateY(90deg) translateZ(calc(var(--cube) / 2))",
              backfaceVisibility: "hidden",
            }}
          >
            {wordRows.map((row, i) => (
              <div key={i} className="flex w-full items-baseline justify-between gap-2">
                {row.map((word) => (
                  <span
                    key={word}
                    className="text-[clamp(9px,1.45vw,21px)] font-medium uppercase leading-none tracking-[-0.01em] text-white/85"
                  >
                    {word}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
