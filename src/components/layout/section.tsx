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
  variant?: "default" | "contrast" | "minimal" | "ink" | "tinted";
  divider?: "none" | "top" | "bottom";
  bleed?: boolean;
  reveal?: boolean;
  withContainer?: boolean;
  containerVariant?: "default" | "fluid" | "offset" | "narrow";
  minHeight?: "short" | "medium" | "tall" | "auto" | string;
  "data-palette"?: "light" | "dark" | "brand";
  theme?: "light" | "dark";
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
  reveal = true,
  withContainer = true,
  containerVariant = "default",
  minHeight,
  "data-palette": dataPalette,
  theme,
  "data-section": dataSection,
}: SectionProps) {
  const { ref, inView } = useInView({
    threshold: 0.05, // Earlier trigger for smooth feeling
    triggerOnce: true,
  });

  // Variant Styles mapping
  const variantStyles = {
    default: "bg-[var(--brand-bg)]",
    contrast: "bg-black text-white", // Explicit high contrast
    minimal: "bg-transparent",
    ink: "bg-[#050505] text-white",
    tinted: "bg-[#F4F4F4] text-black",
  };

  // Min-height standardization (Expanded)
  const minHeightClass = minHeight
    ? minHeight === "short"
      ? "min-h-[50svh]"
      : minHeight === "medium"
        ? "min-h-[80svh]"
        : minHeight === "tall"
          ? "min-h-[100svh]"
          : minHeight === "auto"
            ? ""
            : minHeight
    : "min-h-[80svh]"; // Default deeply expansive

  // Divider logic (Subtle lines)
  const dividerClass = divider === "top"
    ? "border-t border-[var(--border)]"
    : divider === "bottom"
      ? "border-b border-[var(--border)]"
      : "";

  const content = (
    <>
      {(title || subtitle || action) && (
        <div className="mb-20 md:mb-32 lg:mb-40 flex flex-col md:flex-row items-start justify-between gap-12 md:gap-8">
          <div className="max-w-[80vw]">
            {title && (
              <h2 className={cn(
                "section-title text-balance mb-6 md:mb-8",
                "opacity-0 transition-opacity duration-700 delay-100",
                reveal && inView && "opacity-100" // Nested reveal for title
              )}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={cn(
                "section-subtitle",
                "opacity-0 transition-opacity duration-700 delay-200",
                reveal && inView && "opacity-100"
              )}>
                {subtitle}
              </p>
            )}
          </div>
          {action && (
            <div className={cn(
              "hidden md:block flex-shrink-0 pt-2",
              "opacity-0 transition-opacity duration-700 delay-300",
              reveal && inView && "opacity-100"
            )}>
              {action}
            </div>
          )}
        </div>
      )}
      <div className={cn(
        "opacity-0 transition-all duration-1000 ease-out delay-300",
        reveal && inView && "opacity-100 translate-y-0",
        !inView && "translate-y-12"
      )}>
        {children}
      </div>
    </>
  );

  return (
    <section
      ref={reveal ? ref : undefined}
      id={id}
      data-section={dataSection}
      data-palette={dataPalette}
      className={cn(
        "py-32 md:py-48 lg:py-56", // Massive padding
        "scroll-mt-[100px]",
        !bleed && variantStyles[variant],
        dividerClass,
        bleed && "relative w-full overflow-hidden isolate",
        minHeightClass,
        "relative",
        className
      )}
    >
      {/* Background Ambience (Optional per section) */}
      {theme === "dark" && (
        <div className="absolute inset-0 bg-aurora opacity-30 pointer-events-none -z-10" />
      )}

      {bleed ? (
        <div className="w-full h-full">
          {withContainer ? (
            <Container variant={containerVariant}>{content}</Container>
          ) : (
            content
          )}
        </div>
      ) : withContainer ? (
        <Container variant={containerVariant}>{content}</Container>
      ) : (
        content
      )}
    </section>
  );
}
