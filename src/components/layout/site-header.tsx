"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { MegaMenuOverlay } from "./mega-menu-overlay";
import { cn } from "@/lib/utils";

/**
 * Only three links sit on the rail. Any more and the centred wordmark collides
 * with them at laptop widths — the rest live in the overlay.
 */
const NAV_LINKS = [
  { href: "/portfolio", label: "Work" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

/** Past this many pixels the header leaves its transparent hero state. */
const SOLID_AFTER = 24;
/** Ignore direction changes smaller than this, so trackpad jitter can't flicker it. */
const DIRECTION_SLOP = 6;

/**
 * Label wiped by a solid box on hover: a white panel grows from the left edge,
 * carrying a dark copy of the same label over the light one.
 */
function WipeLabel({ label, active }: { label: string; active?: boolean }) {
  return (
    <>
      <span className={cn("relative block whitespace-nowrap", active && "underline underline-offset-4")}>
        {label}
      </span>
      <span
        aria-hidden
        className="absolute -left-[7px] top-1/2 h-[22px] w-0 -translate-y-1/2 overflow-hidden bg-white text-[var(--ink)] transition-[width] duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:w-[calc(100%+14px)] group-focus-visible:w-[calc(100%+14px)]"
      >
        <span className="absolute left-[7px] top-1/2 -translate-y-1/2 whitespace-nowrap">{label}</span>
      </span>
    </>
  );
}

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSolid, setIsSolid] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const pathname = usePathname();

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  // Hide while reading downward, return the moment the reader reverses —
  // the header is there when wanted and out of the way otherwise.
  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setIsSolid(y > SOLID_AFTER);
    if (Math.abs(y - previous) < DIRECTION_SLOP) return;
    setIsHidden(y > previous && y > 160);
  });

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-[9999] text-white transition-[background-color,backdrop-filter,border-color] duration-500",
          "pt-[env(safe-area-inset-top)]",
          isSolid
            ? "border-b border-white/10 bg-[rgba(14,14,14,0.9)] backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent bg-transparent"
        )}
        initial={{ y: "-100%" }}
        animate={{ y: isHidden && !isMenuOpen ? "-100%" : "0%" }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative flex h-[var(--header-h)] items-center justify-between px-[var(--gut)] text-[15px] font-semibold uppercase leading-none lg:text-[16px]">
          {/* Standing statement: only while the header sits over the hero. */}
          <p
            className={cn(
              "hidden max-w-[16ch] text-[13px] font-semibold normal-case leading-4 tracking-[-0.01em] transition-opacity duration-500 md:block",
              isSolid ? "opacity-0" : "opacity-100"
            )}
            aria-hidden={isSolid}
          >
            런칭을 기획서가 아닌
            <br />
            매출과 데이터로 증명합니다
          </p>

          <Link
            href="/"
            aria-label="GrowingUp 홈"
            className="flex h-11 items-center tracking-[-0.02em] md:absolute md:left-1/2 md:-translate-x-1/2"
          >
            GROWING&nbsp;UP
          </Link>

          <nav aria-label="주요 메뉴">
            <ul className="flex items-center gap-1 lg:gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href} className="hidden lg:block">
                  <Link href={link.href} className="group relative flex h-11 items-center px-1.5">
                    <WipeLabel label={link.label} active={pathname === link.href} />
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(true)}
                  aria-label="전체 메뉴 열기"
                  aria-expanded={isMenuOpen}
                  className="group relative -mr-1.5 flex h-11 items-center gap-2.5 px-1.5 uppercase"
                >
                  <WipeLabel label="Menu" />
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Reading progress: a hairline along the header's bottom edge. */}
        <motion.span
          aria-hidden
          className="absolute inset-x-0 bottom-[-1px] h-px origin-left bg-white/60"
          style={{ scaleX: progress, opacity: isSolid ? 1 : 0 }}
        />
      </motion.header>

      <MegaMenuOverlay open={isMenuOpen} onOpenChange={setIsMenuOpen} />
    </>
  );
}
