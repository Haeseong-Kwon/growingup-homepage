"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

interface SiteMenuOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SiteMenuOverlay({ open, onOpenChange }: SiteMenuOverlayProps) {
  const mainLinks = [
    { href: "/", label: "홈" },
    { href: "/capabilities", label: "역량" },
    { href: "/services", label: "서비스" },
    { href: "/cases", label: "사례" },
    { href: "/insights", label: "인사이트" },
    { href: "/arena", label: "아레나" },
    { href: "/diagnosis", label: "진단 요청" },
  ];

  const subLinks = [
    { href: "/contact", label: "문의하기" },
    { href: "/updates", label: "업데이트" },
    { href: "/privacy", label: "개인정보처리방침" },
    { href: "/terms", label: "이용약관" },
    { href: "/cookies", label: "쿠키 정책" },
  ];

  // 오버레이 열릴 때 스크롤 방지
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop - 안정화: backdrop-blur 제거 */}
      <div
        className="fixed inset-0 z-[100] bg-[var(--brand-fg)]/20 transition-opacity duration-300"
        onClick={() => onOpenChange(false)}
        style={{
          animation: open ? "fadeIn 0.3s ease-out" : "fadeOut 0.3s ease-out",
        }}
      />

      {/* Menu Panel */}
      <div
        className="fixed inset-0 z-[101] overflow-y-auto"
        style={{
          animation: open ? "slideIn 0.4s ease-out" : "slideOut 0.4s ease-out",
        }}
      >
        <div className="min-h-screen bg-[var(--brand-bg)] p-6 md:p-8 lg:p-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-16 lg:mb-20">
            <Link
              href="/"
              className="text-xl font-medium tracking-tight"
              onClick={() => onOpenChange(false)}
            >
              GROWING UP
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              aria-label="메뉴 닫기"
              className="hover:bg-[var(--brand-muted-light)] rounded-lg"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-[2fr,1fr] gap-12 lg:gap-20 max-w-[1320px] mx-auto">
            {/* Main Navigation */}
            <nav>
              <ul className="space-y-2">
                {mainLinks.map((link, index) => (
                  <li
                    key={link.href}
                    style={{
                      animation: open
                        ? `fadeInUp 0.5s ease-out ${index * 0.05}s both`
                        : "none",
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => onOpenChange(false)}
                      className="block py-3 text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tight hover:text-[var(--brand-primary)] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Sidebar Links */}
            <div
              className="lg:pt-4"
              style={{
                animation: open ? "fadeIn 0.6s ease-out 0.3s both" : "none",
              }}
            >
              <h3 className="text-xs uppercase tracking-wider text-[var(--brand-fg)]/50 mb-6">
                더 보기
              </h3>
              <ul className="space-y-3">
                {subLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => onOpenChange(false)}
                      className="text-sm text-[var(--brand-fg)]/70 hover:text-[var(--brand-fg)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        @keyframes slideIn {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideOut {
          from {
            transform: translateY(0);
            opacity: 1;
          }
          to {
            transform: translateY(-20px);
            opacity: 0;
          }
        }

        @keyframes fadeInUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
