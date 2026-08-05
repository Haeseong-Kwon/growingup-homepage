"use client";

import { cn } from "@/lib/utils";

export interface TickerItem {
  name: string;
  /** Emphasised entries are set solid; the rest recede. */
  featured?: boolean;
}

interface TextTickerProps {
  items: TickerItem[];
  /** Seconds for one full pass. Longer reads as calmer. */
  durationSeconds?: number;
  className?: string;
  itemClassName?: string;
  gap?: string;
  reverse?: boolean;
}

/**
 * Seamless single-line ticker. The list is rendered twice and translated by
 * exactly -50%, so the second copy lands where the first began and the loop has
 * no visible seam. Pauses on hover so names stay readable.
 */
export function TextTicker({
  items,
  durationSeconds = 90,
  className,
  itemClassName,
  gap = "clamp(40px, 6vw, 100px)",
  reverse = false,
}: TextTickerProps) {
  const renderSet = (ariaHidden: boolean) => (
    <ul
      className="flex shrink-0 items-center"
      style={{ gap, paddingRight: gap }}
      aria-hidden={ariaHidden || undefined}
    >
      {items.map((item, i) => (
        <li
          key={`${item.name}-${i}`}
          className={cn(
            "whitespace-nowrap text-[clamp(15px,1.5vw,22px)] font-semibold leading-none transition-colors duration-300",
            item.featured ? "text-[var(--fg)]" : "text-[var(--fg)]/45 hover:text-[var(--fg)]",
            itemClassName
          )}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );

  return (
    <div className={cn("group relative w-full overflow-hidden", className)}>
      <div
        className="flex w-max animate-rail group-hover:[animation-play-state:paused]"
        style={
          {
            "--rail-duration": `${durationSeconds}s`,
            animationDirection: reverse ? "reverse" : "normal",
          } as React.CSSProperties
        }
      >
        {renderSet(false)}
        {renderSet(true)}
      </div>
    </div>
  );
}
