"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCountUp } from "@/hooks/use-count-up";
import { MediaReveal } from "@/components/motion/media-reveal";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PerformanceCardProps {
  icon: LucideIcon;
  title: string;
  number: number;
  numberSuffix: string;
  description: string;
  metrics: string[];
  color: "primary" | "secondary" | "hot1";
  delay?: number;
  mode?: "light" | "dark";
}

const colorClasses = {
  primary: {
    borderHover: "hover:border-[var(--brand-primary)]",
    gradient: "from-[var(--brand-primary)] to-[#4B5DFF]",
    iconBg: "bg-[var(--brand-primary)]/10",
    iconColor: "text-[var(--brand-primary)]",
    numberColor: "text-[var(--brand-primary)]",
  },
  secondary: {
    borderHover: "hover:border-[var(--brand-secondary)]",
    gradient: "from-[var(--brand-secondary)] to-[#10B981]",
    iconBg: "bg-[var(--brand-secondary)]/10",
    iconColor: "text-[var(--brand-secondary)]",
    numberColor: "text-[var(--brand-secondary)]",
  },
  hot1: {
    borderHover: "hover:border-[var(--brand-hot1)]",
    gradient: "from-[var(--brand-hot1)] to-[#FF4D4D]",
    iconBg: "bg-[var(--brand-hot1)]/10",
    iconColor: "text-[var(--brand-hot1)]",
    numberColor: "text-[var(--brand-hot1)]",
  },
};

export function PerformanceCard({
  icon: Icon,
  title,
  number,
  numberSuffix,
  description,
  metrics,
  color,
  delay = 0,
  mode = "light",
}: PerformanceCardProps) {
  // ... existing formatNumber logic ... 
  // (Copy formatNumber, formatted, suffix, useCountUp logic exactly)
  const formatNumber = (num: number): { display: string; raw: number } => {
    if (num >= 100000000) {
      const eok = num / 100000000;
      return { display: eok.toFixed(1).replace(/\.0$/, ""), raw: num };
    } else if (num >= 10000) {
      const man = num / 10000;
      return { display: man.toFixed(1).replace(/\.0$/, ""), raw: num };
    }
    return { display: num.toString(), raw: num };
  };

  const formatted = formatNumber(number);
  const suffix = number >= 100000000 ? "억" : number >= 10000 ? "만" : "";
  const { ref, count } = useCountUp({
    end: parseFloat(formatted.display),
    duration: 2000,
    decimals: formatted.display.includes(".") ? 1 : 0,
  });
  const colors = colorClasses[color];
  const isDark = mode === "dark";

  return (
    <MediaReveal delay={delay} intensity="medium">
      <div ref={ref} className="h-full flex">
        <Card
          className={cn(
            "group relative overflow-hidden border-2 flex flex-col w-full",
            "transition-transform duration-200 ease-out [contain:paint]",
            "hover:-translate-y-1.5 motion-reduce:transition-none",
            colors.borderHover,
            isDark
              ? "bg-white/5 border-white/10 text-white"
              : "bg-gradient-to-br from-white to-[var(--brand-muted-light)]/30 text-slate-900",
            "shadow-sm"
          )}
        >
          {/* 배경 그라데이션 효과 - Dark mode uses different blend */}
          <div
            className={cn(
              "absolute inset-0 opacity-0 transition-opacity duration-200 ease-out motion-reduce:transition-none",
              "group-hover:opacity-100",
              "bg-gradient-to-br",
              colors.gradient,
              isDark && "mix-blend-screen opacity-20"
            )}
          />

          {/* 상단 액센트 바 */}
          <div
            className={cn(
              "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r opacity-0 transition-opacity duration-200 ease-out motion-reduce:transition-none",
              "group-hover:opacity-100",
              colors.gradient
            )}
          />

          <CardHeader className="relative z-10 flex-1 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div
                className={cn(
                  "w-14 h-14 rounded-xl flex items-center justify-center transition-colors",
                  isDark ? "bg-white/10" : colors.iconBg
                )}
              >
                <Icon className={cn("w-7 h-7", colors.iconColor)} />
              </div>
              <CardTitle className={cn("text-lg md:text-xl font-bold", isDark ? "text-white" : "text-slate-900")}>
                {title}
              </CardTitle>
            </div>

            <div className={cn("text-3xl md:text-4xl lg:text-5xl font-bold mb-3", colors.numberColor)}>
              {count}
              {suffix && <span className="text-2xl md:text-3xl">{suffix}</span>}
              {numberSuffix}
            </div>

            <p className={cn("text-sm leading-relaxed", isDark ? "text-white/60" : "text-slate-600")}>
              {description}
            </p>
          </CardHeader>

          <CardContent className="relative z-10 mt-auto">
            <div className={cn("text-xs font-medium mb-3 uppercase tracking-wide", isDark ? "text-white/40" : "text-slate-400")}>
              핵심 지표
            </div>
            <div className="flex flex-wrap gap-2">
              {metrics.map((metric, index) => (
                <span
                  key={index}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium",
                    isDark
                      ? "bg-white/10 text-white/80"
                      : "bg-[var(--brand-muted-light)] text-slate-700"
                  )}
                >
                  {metric}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MediaReveal>
  );
}

