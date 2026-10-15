"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { setScrollLocked } from "./smooth-scroll";
import { cn } from "@/lib/utils";
import { EASE, EASE_IN_OUT } from "@/lib/motion";

interface MegaMenuOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PLATE = (id: string) => `https://images.unsplash.com/${id}?w=640&h=800&fit=crop`;

/** Each destination carries the plate that previews it on hover (desktop). */
const MENU_ITEMS = [
  { href: "/capabilities", label: "Capabilities", kr: "역량", image: PLATE("photo-1552664730-d307ca884978") },
  { href: "/services", label: "Services", kr: "서비스", image: PLATE("photo-1460925895917-afdab827c52f") },
  { href: "/cases", label: "Cases", kr: "사례", image: PLATE("photo-1498050108023-c5249f4df085") },
  { href: "/portfolio", label: "Portfolio", kr: "포트폴리오", image: PLATE("photo-1522202176988-66273c2fd55f") },
  { href: "/insights", label: "Insights", kr: "인사이트", image: PLATE("photo-1481627834876-b7833e8f5570") },
  { href: "/arena", label: "Arena", kr: "아레나", image: PLATE("photo-1531482615713-2afd69097998") },
  { href: "/contact", label: "Contact", kr: "문의하기", image: PLATE("photo-1497215728101-856f4ea42174") },
];

const PREVIEW_W = 300;
const PREVIEW_H = 380;


export function MegaMenuOverlay({ open, onOpenChange }: MegaMenuOverlayProps) {
  const pathname = usePathname();
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  // The preview trails the pointer on a loose spring, so it floats beside the
  // type rather than sticking to the cursor tip.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 160, damping: 22, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 160, damping: 22, mass: 0.6 });
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    setScrollLocked(true);
    closeRef.current?.focus({ preventScroll: true });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false);
        return;
      }
      if (e.key !== "Tab") return;
      // Focus trap: Tab wraps within the dialog instead of escaping behind it.
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
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
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="전체 메뉴"
          // Wipes down from the top edge, matching the page transition so
          // navigation reads as one mechanism.
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 0.6, ease: EASE_IN_OUT, delay: 0.1 } }}
          transition={{ duration: 0.75, ease: EASE_IN_OUT }}
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

          {/* Hover preview — desktop only; touch has no hover to drive it. */}
          <motion.div
            aria-hidden
            className="pointer-events-none fixed left-0 top-0 z-[1] hidden overflow-hidden lg:block"
            style={{ x: sx, y: sy, width: PREVIEW_W, height: PREVIEW_H }}
            animate={{ opacity: hovered === null ? 0 : 1, scale: hovered === null ? 0.92 : 1 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <AnimatePresence initial={false}>
              {hovered !== null && (
                <motion.div
                  key={hovered}
                  className="absolute inset-0"
                  initial={{ clipPath: "inset(100% 0 0 0)" }}
                  animate={{ clipPath: "inset(0% 0 0 0)" }}
                  exit={{ clipPath: "inset(0 0 100% 0)" }}
                  transition={{ duration: 0.6, ease: EASE_IN_OUT }}
                >
                  <Image
                    src={MENU_ITEMS[hovered].image}
                    alt=""
                    fill
                    sizes={`${PREVIEW_W}px`}
                    className="object-cover grayscale"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <nav
            aria-label="전체 메뉴 목록"
            className="relative z-[2] flex flex-1 flex-col justify-center px-[var(--gut)] py-6"
            onPointerMove={(e) => {
              px.set(e.clientX - PREVIEW_W * 0.35);
              py.set(e.clientY - PREVIEW_H * 0.5);
            }}
            onPointerLeave={() => setHovered(null)}
          >
            <ul className="border-t border-dashed border-white/25">
              {MENU_ITEMS.map((item, i) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href} className="overflow-hidden border-b border-dashed border-white/25">
                    <motion.div
                      initial={{ y: "105%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "-105%", transition: { duration: 0.4, ease: EASE_IN_OUT, delay: i * 0.02 } }}
                      transition={{ duration: 0.8, ease: EASE, delay: 0.28 + i * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => onOpenChange(false)}
                        onPointerEnter={() => setHovered(i)}
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
