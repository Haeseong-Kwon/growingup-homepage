"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { setScrollLocked } from "./smooth-scroll";
import { cn } from "@/lib/utils";

interface MegaMenuOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MENU_ITEMS = [
  { href: "/capabilities", label: "Capabilities", kr: "역량" },
  { href: "/services", label: "Services", kr: "서비스" },
  { href: "/cases", label: "Cases", kr: "사례" },
  { href: "/portfolio", label: "Portfolio", kr: "포트폴리오" },
  { href: "/insights", label: "Insights", kr: "인사이트" },
  { href: "/arena", label: "Arena", kr: "아레나" },
  { href: "/contact", label: "Contact", kr: "문의하기" },
];

const EASE = [0.16, 1, 0.3, 1] as const;
const WIPE = [0.76, 0, 0.24, 1] as const;

export function MegaMenuOverlay({ open, onOpenChange }: MegaMenuOverlayProps) {
  const pathname = usePathname();
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    setScrollLocked(true);
    closeRef.current?.focus({ preventScroll: true });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      setScrollLocked(false);
      returnFocusRef.current?.focus({ preventScroll: true });
    };
  }, [open, onOpenChange]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="전체 메뉴"
          // Wipes down from the top edge, matching the page transition so
          // navigation reads as one mechanism.
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 0.6, ease: WIPE, delay: 0.1 } }}
          transition={{ duration: 0.75, ease: WIPE }}
          className="fixed inset-0 z-[10000] flex flex-col overflow-y-auto bg-[var(--ink)] pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)] text-white"
          data-lenis-prevent
        >
          <div className="flex h-[var(--header-h)] shrink-0 items-center justify-between px-[var(--gut)] text-[15px] font-semibold uppercase leading-none lg:text-[16px]">
            <Link href="/" onClick={() => onOpenChange(false)} className="flex h-11 items-center tracking-[-0.02em]">
              GROWING&nbsp;UP
            </Link>
            <button
              ref={closeRef}
              type="button"
              onClick={() => onOpenChange(false)}
              className="-mr-1.5 flex h-11 items-center px-1.5 uppercase transition-opacity hover:opacity-60"
            >
              Close
            </button>
          </div>

          <nav aria-label="전체 메뉴 목록" className="flex flex-1 flex-col justify-center px-[var(--gut)] py-6">
            <ul className="border-t border-dashed border-white/25">
              {MENU_ITEMS.map((item, i) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href} className="overflow-hidden border-b border-dashed border-white/25">
                    <motion.div
                      initial={{ y: "105%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "-105%", transition: { duration: 0.4, ease: WIPE, delay: i * 0.02 } }}
                      transition={{ duration: 0.8, ease: EASE, delay: 0.28 + i * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => onOpenChange(false)}
                        aria-current={isActive ? "page" : undefined}
                        className="group flex items-center gap-4 py-2.5 md:gap-8 md:py-3"
                      >
                        <span
                          className={cn(
                            "text-[clamp(2rem,min(6vw,7.4vh),5.75rem)] font-semibold uppercase leading-[1.02] tracking-[-0.035em] transition-[transform,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3",
                            isActive && "text-white/45"
                          )}
                        >
                          {item.label}
                        </span>
                        <span className="ml-auto text-[14px] font-medium text-white/50 transition-colors duration-300 group-hover:text-white">
                          {item.kr}
                        </span>
                      </Link>
                    </motion.div>
                  </li>
                );
              })}
            </ul>
          </nav>

          <motion.div
            className="flex shrink-0 flex-col gap-4 px-[var(--gut)] pb-6 md:flex-row md:items-center md:justify-between"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ delay: 0.6, duration: 0.6, ease: EASE }}
          >
            <a href="mailto:jaeil@wekeepgrowing.com" className="text-[15px] font-medium text-white/60 transition-colors hover:text-white">
              jaeil@wekeepgrowing.com
            </a>
            <Link
              href="/diagnosis"
              onClick={() => onOpenChange(false)}
              className="bg-white px-6 py-4 text-center text-[13px] font-semibold uppercase text-[var(--ink)] transition-colors hover:bg-white/85"
            >
              진단 요청하기
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
