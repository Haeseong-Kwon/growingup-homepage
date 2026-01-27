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
  // 안정화: scroll 이벤트 리스너 기반 훅 비활성화
  // useBlendedTheme(); // scroll 이벤트 사용으로 인한 뭉개짐 방지를 위해 비활성화
  // useThemeZone(); // scroll 이벤트 사용으로 인한 뭉개짐 방지를 위해 비활성화
  
  return (
    <div className="flex min-h-screen flex-col">
      <ThemeObserver />
      <SiteHeader />
      <SiteShell>{children}</SiteShell>
      <SiteFooter />
    </div>
  );
}

