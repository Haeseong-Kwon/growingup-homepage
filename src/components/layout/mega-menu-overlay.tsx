"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface MegaMenuOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface MenuColumn {
  title: string;
  links: Array<{
    href: string;
    label: string;
    isButton?: boolean;
  }>;
}

export function MegaMenuOverlay({ open, onOpenChange }: MegaMenuOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // 메뉴 그룹 정의
  const menuColumns: MenuColumn[] = [
    {
      title: "MENU",
      links: [
        { href: "/capabilities", label: "역량" },
        { href: "/services", label: "서비스" },
        { href: "/cases", label: "사례" },
      ],
    },
    {
      title: "WORK",
      links: [
        { href: "/portfolio", label: "포트폴리오" },
        { href: "/insights", label: "인사이트" },
        { href: "/arena", label: "아레나" },
      ],
    },
    {
      title: "REQUEST",
      links: [{ href: "/diagnosis", label: "진단 요청", isButton: true }],
    },
  ];

  // 스크롤 락
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      // 첫 링크에 포커스
      setTimeout(() => {
        firstLinkRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  // ESC 키로 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onOpenChange(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  // 오버레이 바깥 클릭으로 닫기
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      onOpenChange(false);
    }
  };

  // 링크 클릭 시 메뉴 닫기
  const handleLinkClick = () => {
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className={cn(
        "fixed inset-0 z-[999] bg-black text-white",
        "transition-opacity duration-200",
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      style={{
        animation: open ? "fadeIn 200ms ease-out" : "none",
      }}
    >
      {/* 닫기 버튼 - 우측 상단 (터치 영역 개선) */}
      <div className="fixed top-6 right-6 z-[1000]">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onOpenChange(false)}
          aria-label="메뉴 닫기"
          className="h-12 w-12 p-3 rounded-full hover:bg-white/10 transition-opacity hover:opacity-80"
        >
          <X className="h-6 w-6" />
        </Button>
      </div>

      {/* 메뉴 컨텐츠 */}
      <div className="h-full overflow-y-auto min-h-screen">
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-10 py-16 sm:py-20">
          <div
            className={cn(
              "grid grid-cols-12 gap-y-12 gap-x-10",
              "items-start"
            )}
            style={{
              animation: open ? "slideUp 200ms ease-out" : "none",
            }}
          >
            {/* 브랜드 타이틀 영역 - 좌측 */}
            <div
              className="col-span-12 lg:col-span-4 min-w-0"
              style={{
                animation: open ? "fadeInUp 300ms ease-out 0ms both" : "none",
              }}
            >
              {/* 큰 타이틀: GROWING / UP */}
              <h2
                className={cn(
                  "font-black tracking-tight mb-2",
                  "text-5xl sm:text-6xl lg:text-7xl",
                  "leading-[0.9]"
                )}
              >
                GROWING
                <br />
                UP
              </h2>
              {/* 작은 라벨: MENU */}
              <div className="text-xs tracking-[0.3em] uppercase opacity-70 mb-6">
                MENU
              </div>
              {/* 홈 링크 - 작은 pill 버튼 */}
              <Link
                ref={firstLinkRef}
                href="/"
                onClick={handleLinkClick}
                className={cn(
                  "inline-block px-4 py-2",
                  "rounded-full border border-white/30 bg-white/10",
                  "text-sm font-medium",
                  "hover:bg-white/15 hover:border-white/50",
                  "transition-all duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black"
                )}
              >
                홈
              </Link>
            </div>

            {/* MENU 컬럼 */}
            <div
              className="col-span-12 sm:col-span-6 lg:col-span-3 min-w-0"
              style={{
                animation: open ? "fadeInUp 300ms ease-out 50ms both" : "none",
              }}
            >
              {/* 섹션 타이틀 */}
              <h3
                className={cn(
                  "font-extrabold tracking-tight mb-6",
                  "text-4xl lg:text-5xl",
                  "leading-[0.9]"
                )}
              >
                {menuColumns[0].title}
              </h3>
              {/* 링크 리스트 */}
              <ul className="mt-6 space-y-4 min-w-0">
                {menuColumns[0].links.map((link, linkIndex) => (
                  <li
                    key={link.href}
                    style={{
                      animation: open
                        ? `fadeInUp 300ms ease-out ${(100 + linkIndex * 50)}ms both`
                        : "none",
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={handleLinkClick}
                      className={cn(
                        "group relative inline-block min-w-0",
                        "text-base lg:text-lg",
                        "font-medium",
                        "hover:opacity-100 opacity-80",
                        "transition-opacity duration-200",
                        "focus:outline-none focus:opacity-100",
                        "focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black rounded"
                      )}
                    >
                      {link.label}
                      {/* Hover underline 효과 */}
                      <span
                        className={cn(
                          "absolute bottom-0 left-0 h-[1px] bg-white",
                          "w-0 group-hover:w-full",
                          "transition-all duration-300 ease-out"
                        )}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* WORK 컬럼 */}
            <div
              className="col-span-12 sm:col-span-6 lg:col-span-3 min-w-0"
              style={{
                animation: open ? "fadeInUp 300ms ease-out 100ms both" : "none",
              }}
            >
              {/* 섹션 타이틀 */}
              <h3
                className={cn(
                  "font-extrabold tracking-tight mb-6",
                  "text-4xl lg:text-5xl",
                  "leading-[0.9]"
                )}
              >
                {menuColumns[1].title}
              </h3>
              {/* 링크 리스트 */}
              <ul className="mt-6 space-y-4 min-w-0">
                {menuColumns[1].links.map((link, linkIndex) => (
                  <li
                    key={link.href}
                    style={{
                      animation: open
                        ? `fadeInUp 300ms ease-out ${(150 + linkIndex * 50)}ms both`
                        : "none",
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={handleLinkClick}
                      className={cn(
                        "group relative inline-block min-w-0",
                        "text-base lg:text-lg",
                        "font-medium",
                        "hover:opacity-100 opacity-80",
                        "transition-opacity duration-200",
                        "focus:outline-none focus:opacity-100",
                        "focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black rounded"
                      )}
                    >
                      {link.label}
                      {/* Hover underline 효과 */}
                      <span
                        className={cn(
                          "absolute bottom-0 left-0 h-[1px] bg-white",
                          "w-0 group-hover:w-full",
                          "transition-all duration-300 ease-out"
                        )}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* REQUEST 컬럼 - 우측 정렬 */}
            <div
              className="col-span-12 lg:col-span-2 min-w-0 lg:justify-self-end"
              style={{
                animation: open ? "fadeInUp 300ms ease-out 150ms both" : "none",
              }}
            >
              {/* 섹션 타이틀 */}
              <h3
                className={cn(
                  "font-extrabold tracking-tight mb-6",
                  "text-4xl lg:text-5xl",
                  "leading-[0.9]"
                )}
              >
                {menuColumns[2].title}
              </h3>
              {/* 버튼 - 타이틀 아래 24~32px */}
              <div className="mt-6 lg:mt-8 min-w-0">
                {menuColumns[2].links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={handleLinkClick}
                    className={cn(
                      "inline-block w-full sm:w-auto",
                      "px-6 py-3 md:px-8 md:py-4",
                      "rounded-full border border-white/30 bg-white/10",
                      "text-base md:text-lg font-medium",
                      "hover:bg-white/15 hover:border-white/50",
                      "transition-all duration-200",
                      "focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 애니메이션 스타일 */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

