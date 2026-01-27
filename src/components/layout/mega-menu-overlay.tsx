"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "./container";
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
      title: "GROWING UP",
      links: [{ href: "/", label: "홈" }],
    },
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
      {/* 닫기 버튼 - 우측 상단 */}
      <div className="absolute top-6 right-6 md:top-8 md:right-8 lg:top-12 lg:right-12 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onOpenChange(false)}
          aria-label="메뉴 닫기"
          className="h-12 w-12 md:h-14 md:w-14 rounded-full hover:bg-white/10 transition-opacity hover:opacity-80"
        >
          <X className="h-6 w-6 md:h-7 md:w-7" />
        </Button>
      </div>

      {/* 메뉴 컨텐츠 */}
      <div className="h-full overflow-y-auto">
        <Container className="py-10 sm:py-16 lg:py-24">
          <div
            className={cn(
              "grid gap-y-10",
              "md:grid-cols-2 md:gap-10",
              "lg:grid-cols-4 lg:gap-12"
            )}
            style={{
              animation: open ? "slideUp 200ms ease-out" : "none",
            }}
          >
            {menuColumns.map((column, columnIndex) => (
              <div key={column.title} className="min-w-0">
                {/* 큰 타이틀 */}
                <h2
                  className={cn(
                    "font-bold tracking-tight mb-6 md:mb-8",
                    "text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
                    "leading-[0.9]"
                  )}
                  style={{
                    animation: open
                      ? `fadeInUp 300ms ease-out ${columnIndex * 50}ms both`
                      : "none",
                  }}
                >
                  {column.title}
                </h2>

                {/* 링크 리스트 */}
                <ul className="space-y-3 md:space-y-4">
                  {column.links.map((link, linkIndex) => {
                    const isFirstLink = columnIndex === 0 && linkIndex === 0;
                    return (
                      <li
                        key={link.href}
                        style={{
                          animation: open
                            ? `fadeInUp 300ms ease-out ${(columnIndex * 50 + 100 + linkIndex * 50)}ms both`
                            : "none",
                        }}
                      >
                        {link.isButton ? (
                          <Link
                            ref={isFirstLink ? firstLinkRef : undefined}
                            href={link.href}
                            onClick={handleLinkClick}
                            className={cn(
                              "inline-block px-6 py-3 md:px-8 md:py-4",
                              "rounded-full border border-white/30 bg-white/10",
                              "text-base md:text-lg font-medium",
                              "hover:bg-white/15 hover:border-white/50",
                              "transition-all duration-200",
                              "focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black"
                            )}
                          >
                            {link.label}
                          </Link>
                        ) : (
                          <Link
                            ref={isFirstLink ? firstLinkRef : undefined}
                            href={link.href}
                            onClick={handleLinkClick}
                            className={cn(
                              "group relative inline-block",
                              "text-base md:text-lg lg:text-xl",
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
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </Container>
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

