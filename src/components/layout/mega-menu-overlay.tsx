"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface MegaMenuOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const menuItems = [
  { href: "/capabilities", label: "Capabilities", category: "Agency" },
  { href: "/services", label: "Services", category: "Offerings" },
  { href: "/cases", label: "Cases", category: "Work" },
  { href: "/portfolio", label: "Portfolio", category: "Work" },
  { href: "/insights", label: "Insights", category: "Thinking" },
  { href: "/arena", label: "Arena", category: "Culture" },
];

export function MegaMenuOverlay({ open, onOpenChange }: MegaMenuOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Lock Scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [open]);

  // ESC Close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onOpenChange(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[1001] bg-[#050505]/95 backdrop-blur-xl text-white flex flex-col"
        >
          {/* Close Button */}
          <div className="absolute top-6 right-6 md:top-8 md:right-8 z-[1002]">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="rounded-full w-12 h-12 md:w-14 md:h-14 bg-white/10 hover:bg-white/20 text-white transition-all duration-300 backdrop-blur-md"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          <div className="flex-1 flex flex-col justify-center px-6 md:px-20 lg:px-32 max-w-[1800px] mx-auto w-full">
            <nav className="flex flex-col gap-2 md:gap-4">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 40, skewY: 5 }}
                  animate={{ opacity: 1, y: 0, skewY: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.1 + (index * 0.05)
                  }}
                  className="group"
                >
                  <Link
                    href={item.href}
                    onClick={() => onOpenChange(false)}
                    className="flex items-baseline gap-4 md:gap-8 group"
                  >
                    <span className="text-sm md:text-base font-mono text-white/40 group-hover:text-white/80 transition-colors duration-300">
                      0{index + 1}
                    </span>
                    <span
                      className={cn(
                        "font-bold text-[clamp(2.5rem,7vw,8rem)] leading-[0.85] tracking-tight uppercase",
                        "text-white/90 group-hover:text-white transition-all duration-500",
                        "group-hover:translate-x-4",
                        "origin-left transform"
                      )}
                    >
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="mt-12 md:mt-24 pt-8 border-t border-white/10 flex justify-between items-end"
            >
              <div className="flex flex-col gap-2">
                <span className="text-white/40 text-sm uppercase tracking-widest">Get in touch</span>
                <a href="mailto:hello@growingup.com" className="text-xl md:text-2xl hover:text-[var(--brand-primary)] transition-colors">hello@growingup.com</a>
              </div>

              <Link
                href="/diagnosis"
                onClick={() => onOpenChange(false)}
                className="hidden md:block px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300"
              >
                Start Project
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

