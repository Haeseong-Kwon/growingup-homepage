"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SiteShellProps {
  children: React.ReactNode;
}

/**
 * AppShell: 블렌딩 기반 컬러 엔진이 CSS 변수를 직접 설정
 * --bg, --fg, --surface, --border 변수를 사용
 */
export function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <main
      id="app-shell"
      className={cn(
        "flex-1",
        !isHome && "pt-[var(--header-h)]"
      )}
    >
      {children}
    </main>
  );
}

