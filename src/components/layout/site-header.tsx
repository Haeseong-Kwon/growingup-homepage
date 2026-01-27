"use client";

import Link from "next/link";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "./container";
import { useState, useRef, useEffect } from "react";
import { MegaMenuOverlay } from "./mega-menu-overlay";
import { useScroll } from "@/hooks/use-scroll";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { hasVideoHero } from "@/lib/constants";

type MenuKey = "capabilities" | "services" | "cases" | "insights" | "arena" | null;

interface MegaMenuItem {
  title: string;
  href: string;
  description?: string;
}

interface MegaMenuData {
  [key: string]: {
    title: string;
    items: MegaMenuItem[];
  };
}

const megaMenuData: MegaMenuData = {
  capabilities: {
    title: "역량",
    items: [
      { title: "7개 역량 맵", href: "/capabilities", description: "전략부터 실행까지" },
      { title: "운영 모델", href: "/capabilities", description: "체계적인 프로세스" },
      { title: "산출물", href: "/capabilities", description: "구체적인 결과물" },
    ],
  },
  services: {
    title: "서비스",
    items: [
      { title: "Launch Sprint", href: "/services", description: "4주 MVP 개발" },
      { title: "Launch Partner", href: "/services", description: "장기 파트너십" },
      { title: "가격/범위", href: "/services", description: "투명한 가격 정책" },
    ],
  },
  cases: {
    title: "사례",
    items: [
      { title: "전자제품", href: "/cases", description: "테크 브랜드 사례" },
      { title: "프랜차이즈", href: "/cases", description: "유통/서비스 사례" },
      { title: "크라우드펀딩", href: "/cases", description: "스타트업 성장 사례" },
    ],
  },
  insights: {
    title: "인사이트",
    items: [
      { title: "업데이트", href: "/insights", description: "최신 트렌드" },
      { title: "트렌드", href: "/insights", description: "시장 분석" },
      { title: "체크리스트", href: "/insights", description: "실행 가이드" },
    ],
  },
  arena: {
    title: "아레나",
    items: [
      { title: "진행 프로젝트", href: "/arena", description: "현재 진행 중" },
      { title: "미션 보드", href: "/arena", description: "참여 가능한 미션" },
      { title: "참여 방식", href: "/arena", description: "협업 프로세스" },
    ],
  },
};

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerHovered, setHeaderHovered] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuKey>(null);
  const [megaHovered, setMegaHovered] = useState(false);
  const isScrolled = useScroll(1); // 임계값을 1px로 낮춰서 스크롤 즉시 SURFACE 모드로 전환
  const pathname = usePathname();
  const isHome = pathname === "/";
  const headerRef = useRef<HTMLElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // VideoHero가 있는 페이지인지 확인 (경로 기반)
  const hasVideoHeroPage = hasVideoHero(pathname);
  
  // 파생 값: mega 메뉴가 열리는 조건
  const megaOpen = (headerHovered || megaHovered) && !!activeMenu;

  const navLinks = [
    { href: "/capabilities", label: "역량", key: "capabilities" as MenuKey },
    { href: "/services", label: "서비스", key: "services" as MenuKey },
    { href: "/cases", label: "사례", key: "cases" as MenuKey },
    { href: "/portfolio", label: "포트폴리오", key: null },
    { href: "/insights", label: "인사이트", key: "insights" as MenuKey },
    { href: "/arena", label: "아레나", key: "arena" as MenuKey },
  ];

  // 헤더 영역 hover 처리
  const handleHeaderMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setHeaderHovered(true);
  };

  const handleHeaderMouseLeave = () => {
    // 약간의 지연을 두어 mega menu로 이동할 시간 제공
    timeoutRef.current = setTimeout(() => {
      setHeaderHovered(false);
      setActiveMenu(null);
      setMegaHovered(false);
    }, 200);
  };

  // Mega menu 영역 hover 처리
  const handleMegaMenuMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setMegaHovered(true);
    setHeaderHovered(true);
  };

  const handleMegaMenuMouseLeave = () => {
    setHeaderHovered(false);
    setActiveMenu(null);
    setMegaHovered(false);
  };

  // 메뉴 항목 hover 처리
  const handleMenuMouseEnter = (key: MenuKey) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMenu(key);
    setHeaderHovered(true);
  };

  // 키보드 접근성: Esc 키로 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMenu(null);
        setHeaderHovered(false);
        setMegaHovered(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // 헤더 모드 결정 (2-state 고정: ON_HERO 또는 SURFACE)
  // VideoHero가 있는 페이지 최상단에서만 ON_HERO, 그 외는 항상 SURFACE
  // 섹션 테마와 완전 분리하여 다크 섹션 진입해도 SURFACE 유지
  // 메뉴 패널(오버레이/메가 메뉴)이 열려있으면 무조건 SURFACE
  const isMenuPanelOpen = megaOpen || isMenuOpen;
  const headerMode: "ON_HERO" | "SURFACE" =
    hasVideoHeroPage && !isScrolled && !headerHovered && !isMenuPanelOpen ? "ON_HERO" : "SURFACE";

  // 메뉴 열린 상태를 html에 반영
  useEffect(() => {
    if (isMenuOpen) {
      document.documentElement.dataset.navOpen = "true";
    } else {
      document.documentElement.removeAttribute("data-nav-open");
    }
  }, [isMenuOpen]);

  // CSS 변수 기반 색상 (전역 테마 변수 사용)
  const SURFACE_BG = "var(--header-bg, rgba(255, 255, 255, 0.72))";
  const SURFACE_TEXT = "var(--header-fg, #111111)";
  const SURFACE_BORDER = "var(--border, rgba(0, 0, 0, 0.08))";
  const ON_HERO_TEXT = "#ffffff"; // 흰색 텍스트

  return (
    <>
      <header
        ref={headerRef}
        onMouseEnter={handleHeaderMouseEnter}
        onMouseLeave={handleHeaderMouseLeave}
        className={cn(
          "fixed top-0 left-0 right-0 w-full border-b transition-colors duration-200 isolate",
          "z-[100]",
          headerMode === "SURFACE"
            ? "shadow-sm"
            : ""
        )}
        style={{
          // 배경색: SURFACE는 CSS 변수, ON_HERO는 투명
          backgroundColor: headerMode === "SURFACE" ? SURFACE_BG : "transparent",
          // 테두리: SURFACE는 CSS 변수, ON_HERO는 투명
          borderColor: headerMode === "SURFACE" ? SURFACE_BORDER : "transparent",
          // 텍스트 색상: SURFACE는 CSS 변수, ON_HERO는 흰색
          color: headerMode === "SURFACE" ? SURFACE_TEXT : ON_HERO_TEXT,
          // ON_HERO 모드에서 텍스트 가독성 보장 (text-shadow만 허용)
          textShadow: headerMode === "ON_HERO" ? "0 2px 14px rgba(0,0,0,0.35)" : "none",
          // 헤더가 항상 최상단에 보이도록 z-index 보장
          zIndex: 100,
          // transform 적용 금지 (레이아웃 안정성)
          transform: "none",
        }}
      >
        <Container>
          <div className="flex items-center justify-between" style={{ height: "var(--header-h)" }}>
            {/* 로고 - text-inherit로 헤더 root 색상 상속 (고정 색상 보장) */}
            <Link
              href="/"
              className="text-lg lg:text-xl font-bold tracking-tight text-inherit transition-colors"
            >
              GROWING UP
            </Link>

            {/* 데스크톱 메뉴 (중앙) */}
            <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => (
                <div key={link.href} className="relative">
                  <Link
                    href={link.href}
                    onMouseEnter={() => link.key && handleMenuMouseEnter(link.key)}
                    onFocus={() => link.key && handleMenuMouseEnter(link.key)}
                    className="text-sm font-bold hover-underline transition-colors flex items-center gap-1 text-inherit"
                  >
                    {link.label}
                    {link.key && (
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 text-inherit",
                          activeMenu === link.key && "rotate-180"
                        )}
                        style={{
                          transition: "transform 0.2s ease",
                        }}
                      />
                    )}
                  </Link>
                </div>
              ))}
            </nav>

            {/* 우측 CTA + 메뉴 버튼 */}
            <div className="flex items-center gap-3 lg:gap-4">
              <Button
                asChild
                size="sm"
                className={cn(
                  "hidden md:inline-flex rounded-lg h-10 px-5 font-bold transition-colors",
                  headerMode === "SURFACE"
                    ? "bg-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/90 text-white"
                    : "bg-white/10 hover:bg-white/20 text-white border border-white/30"
                )}
              >
                <Link href="/diagnosis">진단 요청</Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(true)}
                aria-label="메뉴 열기"
                className={cn(
                  "rounded-lg transition-colors text-inherit",
                  headerMode === "SURFACE"
                    ? "hover:bg-[var(--brand-muted-light)]"
                    : "hover:bg-white/10"
                )}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mega Menu */}
      {megaOpen && activeMenu && (
        <div
          ref={megaMenuRef}
          onMouseEnter={handleMegaMenuMouseEnter}
          onMouseLeave={handleMegaMenuMouseLeave}
          className={cn(
            "fixed left-0 right-0 z-40 bg-[var(--brand-bg)] border-b border-[var(--brand-muted)] shadow-lg",
            "transition-colors duration-200"
          )}
          style={{ 
            top: "var(--header-h)",
            zIndex: 998, // 헤더 바로 아래
          }}
        >
          <Container>
            <div className="py-6 md:py-8 lg:py-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                <div className="lg:col-span-1">
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-[var(--brand-fg)]">
                    {megaMenuData[activeMenu].title}
                  </h3>
                  <p className="text-sm text-[var(--brand-fg)]/60 leading-relaxed">
                    {megaMenuData[activeMenu].items[0]?.description || ""}
                  </p>
                </div>
                <div className="lg:col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
                    {megaMenuData[activeMenu].items.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className="group p-4 rounded-lg hover:bg-[var(--brand-muted-light)] transition-colors"
                        onFocus={() => handleMenuMouseEnter(activeMenu)}
                      >
                        <div className="font-bold text-sm md:text-base mb-1 text-[var(--brand-fg)] group-hover:text-[var(--brand-primary)] transition-colors leading-tight">
                          {item.title}
                        </div>
                        {item.description && (
                          <div className="text-xs md:text-sm text-[var(--brand-fg)]/60 leading-relaxed">
                            {item.description}
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      )}

      <MegaMenuOverlay open={isMenuOpen} onOpenChange={setIsMenuOpen} />
    </>
  );
}
