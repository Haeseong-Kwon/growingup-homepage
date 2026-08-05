"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
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

/**
 * Nav item whose label is wiped by a solid box on hover: a white panel grows from
 * the left edge, carrying a dark copy of the same label over the light one. The
 * two labels are pinned to the same baseline so nothing shifts during the wipe.
 */
function NavItem({
  href,
  label,
  active,
  className,
}: {
  href: string;
  label: string;
  active: boolean;
  className?: string;
}) {
  return (
    <li className={cn("relative h-[17px] overflow-visible", className)}>
      <Link href={href} className="group relative block h-full">
        <span className={cn("relative block whitespace-nowrap", active && "underline underline-offset-4")}>
          {label}
        </span>
        <span
          aria-hidden
          className="absolute -left-[7px] -top-[3px] h-[22px] w-0 overflow-hidden bg-white text-[#0E0E0E] transition-[width] duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:w-[calc(100%+14px)]"
        >
          <span className="absolute left-[7px] top-[3px] whitespace-nowrap">{label}</span>
        </span>
      </Link>
    </li>
  );
}

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* mix-blend-difference lets one white header stay legible over both the
          ink sections and the light ones — no scroll listener, no theme state. */}
      <motion.header
        className="fixed left-[var(--gut)] right-[var(--gut)] top-5 z-[9999] flex items-start justify-between text-[15px] font-semibold uppercase leading-[17px] text-white mix-blend-difference lg:text-[17px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Left: standing statement, lower-case against the uppercase rail */}
        <p className="hidden max-w-[16ch] text-[13px] font-semibold normal-case leading-4 tracking-[-0.01em] md:block">
          런칭을 기획서가 아닌
          <br />
          매출과 데이터로 증명합니다
        </p>

        <Link
          href="/"
          className="tracking-[-0.02em] md:absolute md:left-1/2 md:top-0 md:-translate-x-1/2"
        >
          GROWING&nbsp;UP
        </Link>

        <nav aria-label="주요 메뉴">
          <ul className="flex items-start gap-3">
            {NAV_LINKS.map((link) => (
              <NavItem
                key={link.href}
                href={link.href}
                label={link.label}
                active={pathname === link.href}
                className="hidden lg:block"
              />
            ))}
            <li className="h-[17px]">
              <button
                type="button"
                onClick={() => setIsMenuOpen(true)}
                aria-label="전체 메뉴 열기"
                className="group relative block h-full"
              >
                <span className="relative block">Menu</span>
                <span
                  aria-hidden
                  className="absolute -left-[7px] -top-[3px] h-[22px] w-0 overflow-hidden bg-white text-[#0E0E0E] transition-[width] duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:w-[calc(100%+14px)]"
                >
                  <span className="absolute left-[7px] top-[3px]">Menu</span>
                </span>
              </button>
            </li>
          </ul>
        </nav>
      </motion.header>

      <MegaMenuOverlay open={isMenuOpen} onOpenChange={setIsMenuOpen} />
    </>
  );
}
