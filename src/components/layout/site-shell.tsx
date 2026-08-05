"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { hasVideoHero } from "@/lib/constants";

interface SiteShellProps {
  children: React.ReactNode;
}

/**
 * AppShell: 블렌딩 기반 컬러 엔진이 CSS 변수를 직접 설정
 * --bg, --fg, --surface, --border 변수를 사용
 */
export function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname();
  
  // VideoHero가 있는 페이지들은 헤더 높이만큼 padding-top을 추가하지 않음
  // (VideoHero가 -mt-[var(--header-h)]로 헤더까지 올라가야 하므로)
  const hasVideoHeroPage = hasVideoHero(pathname);

  return (
    <main
      id="app-shell"
      className={cn(
        // `relative` gives the scroll-scrubbed sections a positioned offsetParent,
        // which is what framer-motion measures scroll offsets against.
        "relative flex-1",
        // The header floats over the page, so only non-hero routes need clearance.
        !hasVideoHeroPage && "pt-[calc(var(--header-h)+3rem)]"
      )}
    >
      {children}
    </main>
  );
}

