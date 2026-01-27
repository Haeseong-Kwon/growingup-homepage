"use client";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteShell } from "@/components/layout/site-shell";
import { ThemeObserver } from "@/components/scroll/theme-observer";
import { useBlendedTheme } from "@/hooks/use-blended-theme";
import { useThemeZone } from "@/hooks/use-theme-zone";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 블렌딩 기반 컬러 엔진 (배경/글자색)
  useBlendedTheme();
  
  // 기존 테마 훅은 헤더/아이콘 스타일용으로만 사용 (최소화)
  useThemeZone();
  
  return (
    <div className="flex min-h-screen flex-col">
      <ThemeObserver />
      <SiteHeader />
      <SiteShell>{children}</SiteShell>
      <SiteFooter />
    </div>
  );
}

