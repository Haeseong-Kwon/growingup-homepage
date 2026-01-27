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
}

const colorClasses = {
  primary: {
    iconBg: "bg-[var(--brand-primary)]/10",
    iconColor: "text-[var(--brand-primary)]",
    numberColor: "text-[var(--brand-primary)]",
    borderHover: "hover:border-[var(--brand-primary)]/30",
    gradient: "from-[var(--brand-primary)]/5 via-[var(--brand-primary)]/2 to-transparent",
  },
  secondary: {
    iconBg: "bg-[var(--brand-secondary)]/10",
    iconColor: "text-[var(--brand-secondary)]",
    numberColor: "text-[var(--brand-secondary)]",
    borderHover: "hover:border-[var(--brand-secondary)]/30",
    gradient: "from-[var(--brand-secondary)]/5 via-[var(--brand-secondary)]/2 to-transparent",
  },
  hot1: {
    iconBg: "bg-[var(--brand-hot1)]/10",
    iconColor: "text-[var(--brand-hot1)]",
    numberColor: "text-[var(--brand-hot1)]",
    borderHover: "hover:border-[var(--brand-hot1)]/30",
    gradient: "from-[var(--brand-hot1)]/5 via-[var(--brand-hot1)]/2 to-transparent",
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
}: PerformanceCardProps) {
  // 숫자 포맷팅: 억 단위 처리
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

  return (
    <MediaReveal delay={delay} intensity="medium">
      <div ref={ref} className="h-full flex">
        <Card
          className={cn(
            "group relative overflow-hidden border-2 transition-all duration-500 flex flex-col w-full",
            "hover:-translate-y-2 hover:shadow-xl",
            colors.borderHover,
            "bg-gradient-to-br from-white to-[var(--brand-muted-light)]/30"
          )}
        >
        {/* 배경 그라데이션 효과 */}
        <div
          className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
            "bg-gradient-to-br",
            colors.gradient
          )}
        />

        {/* 상단 액센트 바 */}
        <div
          className={cn(
            "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500",
            colors.gradient
          )}
        />

        <CardHeader className="relative z-10 flex-1 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div
              className={cn(
                "w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3",
                colors.iconBg
              )}
            >
              <Icon className={cn("w-7 h-7", colors.iconColor)} />
            </div>
            <CardTitle className="text-lg md:text-xl font-bold text-[var(--brand-fg)]">
              {title}
            </CardTitle>
          </div>

          <div className={cn("text-3xl md:text-4xl lg:text-5xl font-bold mb-3 transition-all duration-300", colors.numberColor)}>
            {count}
            {suffix && <span className="text-2xl md:text-3xl">{suffix}</span>}
            {numberSuffix}
          </div>

          <p className="text-sm text-[var(--brand-fg)]/70 leading-relaxed">
            {description}
          </p>
        </CardHeader>

        <CardContent className="relative z-10 mt-auto">
          <div className="text-xs font-medium text-[var(--brand-fg)]/60 mb-3 uppercase tracking-wide">
            핵심 지표
          </div>
          <div className="flex flex-wrap gap-2">
            {metrics.map((metric, index) => (
              <span
                key={index}
                className="px-3 py-1.5 rounded-full bg-[var(--brand-muted-light)] text-xs font-medium text-[var(--brand-fg)] transition-all duration-300 hover:scale-105"
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

