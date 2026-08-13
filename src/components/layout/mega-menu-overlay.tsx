"use client";

import Link from "next/link";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

export function MegaMenuOverlay({ open, onOpenChange }: MegaMenuOverlayProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onOpenChange]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="전체 메뉴"
          // Wipes down from the top edge rather than fading, matching the page
          // transition so navigation feels like one mechanism.
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col bg-[var(--ink)] text-white"
        >
          <div className="flex items-start justify-between px-[var(--gut)] pt-5 text-[15px] font-semibold uppercase leading-[17px] lg:text-[17px]">
            <span>Menu</span>
            <button type="button" onClick={() => onOpenChange(false)} className="hover:opacity-60">
              Close
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center px-[var(--gut)]">
            <ul className="border-t border-dashed border-[var(--rule)]">
              {MENU_ITEMS.map((item, i) => (
                <motion.li
                  key={item.href}
                  className="border-b border-dashed border-[var(--rule)]"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.2 + i * 0.045 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => onOpenChange(false)}
                    className="group flex items-baseline gap-5 py-3 md:gap-8"
                  >
                    <span className="t-label w-8 shrink-0 text-white/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[clamp(2rem,5.5vw,5.5rem)] font-semibold uppercase leading-[1.02] tracking-[-0.03em] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3">
                      {item.label}
                    </span>
                    <span className="t-label ml-auto text-white/40">{item.kr}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          <motion.div
            className="flex flex-col gap-3 px-[var(--gut)] pb-6 t-label text-white/50 md:flex-row md:items-center md:justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <a href="mailto:jaeil@wekeepgrowing.com" className="hover:text-white">
              jaeil@wekeepgrowing.com
            </a>
            <Link
              href="/diagnosis"
              onClick={() => onOpenChange(false)}
              className="bg-white px-6 py-3 text-center font-semibold text-[var(--ink)] transition-opacity hover:opacity-85"
            >
              Start a project
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
