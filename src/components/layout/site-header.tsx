"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "./container";
import { useState, useRef, useEffect } from "react";
import { MegaMenuOverlay } from "./mega-menu-overlay";
import { useScroll } from "@/hooks/use-scroll";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { hasVideoHero } from "@/lib/constants";

type MenuKey = "capabilities" | "services" | "cases" | "insights" | "arena" | null;

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerHovered, setHeaderHovered] = useState(false);
  const isScrolled = useScroll(10);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  // Logic: Always transparent/glassy, but more opaque on scroll
  const isGlass = isScrolled || headerHovered || isMenuOpen;

  const navLinks = [
    { href: "/capabilities", label: "Capabilities" },
    { href: "/services", label: "Services" },
    { href: "/cases", label: "Cases" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/insights", label: "Insights" },
    { href: "/arena", label: "Arena" },
  ];

  return (
    <>
      <header
        ref={headerRef}
        onMouseEnter={() => setHeaderHovered(true)}
        onMouseLeave={() => setHeaderHovered(false)}
        className={cn(
          "fixed top-0 left-0 right-0 w-full z-[1000] transition-all duration-500",
          isGlass ? "bg-[#050505]/80 backdrop-blur-md border-b border-white/5" : "bg-transparent border-b border-transparent"
        )}
        style={{ height: "var(--header-h)" }}
      >
        <div className="w-full h-full flex items-center">
          <div className="mx-auto w-full max-w-[1800px] px-6 lg:px-12 flex items-center justify-between">
            {/* Logo - Mix Blend Mode Difference for visibility */}
            <Link
              href="/"
              className="relative z-50 text-xl lg:text-2xl font-black tracking-tighter text-white mix-blend-difference hover:opacity-80 transition-opacity"
            >
              GROWING UP
            </Link>

            {/* Desktop Nav - Clean & Minimal */}
            <nav className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2 mix-blend-difference">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium tracking-wide text-white/90 hover:text-white transition-colors uppercase relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-4 relative z-50">
              <Button
                asChild
                variant="outline"
                className="hidden md:inline-flex rounded-full border-white/20 bg-white/5 text-white hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm mix-blend-difference"
              >
                <Link href="/diagnosis">Start Project</Link>
              </Button>

              <button
                onClick={() => setIsMenuOpen(true)}
                className="group flex items-center justify-center w-12 h-12 rounded-full hover:bg-white/10 transition-colors mix-blend-difference text-white"
                aria-label="Open Menu"
              >
                <Menu className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MegaMenuOverlay open={isMenuOpen} onOpenChange={setIsMenuOpen} />
    </>
  );
}
