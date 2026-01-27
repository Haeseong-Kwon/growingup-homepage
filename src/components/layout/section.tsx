"use client";

import { cn } from "@/lib/utils";
import { Container } from "./container";
import { useInView } from "@/hooks/use-in-view";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  variant?: "default" | "tinted" | "ink";
  divider?: "none" | "top" | "both";
  bleed?: boolean;
  reveal?: boolean;
  withContainer?: boolean;
  /**
   * 최소 높이 (기본값: 없음)
   * "short" | "medium" | "tall" | "auto" 또는 직접 값 (예: "min-h-[60vh]")
   */
  minHeight?: "short" | "medium" | "tall" | "auto" | string;
  /**
   * 블렌딩 기반 컬러 엔진용 팔레트
   * "light" | "dark" | "brand"
   */
  "data-palette"?: "light" | "dark" | "brand";
  /**
   * 전환 밴드 높이 (px, 기본값: 120)
   * 섹션 하단에서 전환이 일어나는 구간의 높이
   */
  "data-band"?: number | string;
  /**
   * 섹션 테마 (배경색 결정)
   * "light" | "dark"
   */
  theme?: "light" | "dark";
  /**
   * 전환 밴드 (edge fade) 활성화
   * "none" | "both" | "top" | "bottom"
   * 다크 섹션의 경우 기본값은 "both"
   */
  edgeFade?: "none" | "both" | "top" | "bottom";
  /**
   * @deprecated data-palette를 사용하세요
   * 하위 호환성을 위해 유지 (헤더/아이콘 스타일용)
   */
  "data-theme"?: "light" | "dark";
  /**
   * 섹션 ID (테마 관찰용)
   */
  "data-section"?: string;
}

export function Section({
  children,
  className,
  id,
  title,
  subtitle,
  action,
  variant = "default",
  divider = "none",
  bleed = false,
  reveal = true, // 안정화: 기본 ON (섹션 단위 reveal)
  withContainer = true,
  minHeight,
  "data-palette": dataPalette,
  "data-band": dataBand,
  theme,
  edgeFade,
  "data-theme": dataTheme,
  "data-section": dataSection,
}: SectionProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // theme이 dark인 경우 edgeFade 기본값을 "both"로 설정
  const effectiveEdgeFade = edgeFade ?? (theme === "dark" ? "both" : "none");
  
  // 다크 테마 배경색
  const darkBg = "#07080a";
  const lightBg = "#ffffff";

  const variantStyles = {
    default: "bg-[var(--brand-bg)]",
    tinted: "bg-[color-mix(in_srgb,var(--brand-bg)_97%,var(--brand-fg)_3%)]",
    ink: "bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white",
  };

  // bleed일 때 배경 레이어 색상/스타일 결정
  // theme="dark"가 우선, variant="ink"는 theme이 없을 때만 그라데이션 사용
  const getBleedBg = () => {
    if (theme === "dark") return darkBg;
    if (theme === "light") return lightBg;
    return undefined;
  };

  const bleedBg = getBleedBg();
  
  // variant="ink"일 때 그라데이션 배경 스타일 (theme이 없을 때만)
  const inkGradientStyle = variant === "ink" && !theme
    ? {
        background: `linear-gradient(to bottom right, var(--brand-primary), var(--brand-secondary))`,
      }
    : undefined;

  // minHeight 처리 (섹션 규격 통일)
  const minHeightClass = minHeight
    ? minHeight === "short"
      ? "min-h-[64svh]"
      : minHeight === "medium"
      ? "min-h-[72svh]"
      : minHeight === "tall"
      ? "min-h-[78svh]"
      : minHeight === "auto"
      ? ""
      : minHeight // 직접 값
    : dataPalette === "dark"
    ? "min-h-[78svh]" // 다크 섹션 기본
    : dataPalette === "brand"
    ? "min-h-[100svh]" // 브랜드/히어로 기본
    : "min-h-[72svh]"; // 라이트 섹션 기본

  // divider 스타일 (단락감 강화) - 섹션 시작점에 얇은 키라인
  const dividerClass = divider === "top" 
    ? cn(
        "border-t relative z-0",
        theme === "dark" ? "border-white/10" : "border-black/8"
      )
    : divider === "both" 
    ? cn(
        "border-t border-b relative z-0",
        theme === "dark" ? "border-white/10" : "border-black/8"
      )
    : "";

  const content = (
    <>
      {(title || subtitle || action) && (
        <div className="mb-12 md:mb-16 lg:mb-20">
          <div className="flex items-end justify-between gap-8">
            <div>
              {title && (
                <h2 className={cn(
                  "section-title text-balance mb-4 md:mb-6",
                  variant === "ink" && "text-white"
                )}>
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className={cn(
                  "section-subtitle",
                  variant === "ink" && "text-white/90 max-w-2xl"
                )}>
                  {subtitle}
                </p>
              )}
            </div>
            {action && <div className="hidden md:block">{action}</div>}
          </div>
        </div>
      )}
      {children}
    </>
  );

  // data-band 기본값
  const bandHeight = dataBand ?? 120;

  return (
    <section
      ref={reveal ? ref : undefined}
      id={id}
      data-section={dataSection ?? "true"}
      data-palette={dataPalette}
      data-band={bandHeight}
      data-theme={dataTheme ?? theme}
      className={cn(
        // 기본 패딩 (단락 리듬 통일)
        "py-24 md:py-32",
        // scroll-margin-top 통일 (헤더 높이 + 여백)
        "scroll-mt-[calc(var(--header-h)+48px)]",
        // variant 스타일 (bleed일 때는 배경 레이어가 담당하므로 제거, 단 variant="ink"는 텍스트 색상 유지)
        !bleed && variantStyles[variant],
        // variant="ink"일 때 텍스트 색상 유지
        variant === "ink" && "text-white",
        // divider (단락감 강화) - 컨텐츠 영역 안쪽에만 배치
        dividerClass,
        // reveal 애니메이션 (transform 사용 최소화: opacity만 사용)
        reveal && !inView && "opacity-0",
        reveal && inView && "opacity-100",
        reveal && "transition-opacity duration-[520ms] ease-out",
        // bleed (배경이 화면 전체를 채우되 컨텐츠는 Container 폭으로 제한)
        // fullbleed 클래스 대신 배경 레이어만 풀블리드로 처리
        bleed && "relative isolate w-full overflow-hidden",
        // minHeight
        minHeightClass,
        // edgeFade를 위한 relative
        effectiveEdgeFade !== "none" && "relative",
        className
      )}
    >
      {/* 풀블리드 배경 레이어 (bleed일 때만) */}
      {bleed && (bleedBg || inkGradientStyle) && (
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 bottom-0 -z-10 isolate"
          style={{
            ...(bleedBg ? { backgroundColor: bleedBg } : {}),
            ...(inkGradientStyle || {}),
          }}
        />
      )}

      {/* 전환 밴드 (edge fade) */}
      {effectiveEdgeFade !== "none" && (
        <>
          {/* 상단 gradient overlay - 전환 밴드 높이와 동일 */}
          {(effectiveEdgeFade === "both" || effectiveEdgeFade === "top") && (
            <div
              aria-hidden
              className="pointer-events-none absolute top-0 inset-x-0 z-10"
              style={{
                height: `${Number(bandHeight)}px`,
                background: `linear-gradient(to bottom, ${
                  bleedBg || (theme === "dark" ? darkBg : lightBg)
                }, transparent)`,
              }}
            />
          )}
          {/* 하단 gradient overlay - 전환 밴드 높이와 동일 */}
          {(effectiveEdgeFade === "both" || effectiveEdgeFade === "bottom") && (
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-0 inset-x-0 z-10"
              style={{
                height: `${Number(bandHeight)}px`,
                background: `linear-gradient(to top, ${
                  bleedBg || (theme === "dark" ? darkBg : lightBg)
                }, transparent)`,
              }}
            />
          )}
        </>
      )}

      {withContainer ? (
        <Container>{content}</Container>
      ) : bleed ? (
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          {content}
        </div>
      ) : (
        content
      )}
    </section>
  );
}
