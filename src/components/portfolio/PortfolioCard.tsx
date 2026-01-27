"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { PortfolioItem } from "@/data/portfolio";

interface PortfolioCardProps {
  portfolioItem: PortfolioItem;
  onClick: () => void;
}

export function PortfolioCard({ portfolioItem, onClick }: PortfolioCardProps) {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "group relative border-2 flex flex-col h-full overflow-hidden min-w-0 cursor-pointer",
        "transition-transform duration-200 ease-out [contain:paint] motion-reduce:transition-none",
        "hover:-translate-y-1.5 hover:border-[var(--brand-primary)]/40",
        "bg-[var(--brand-bg)] border-[var(--color-border)] shadow-sm"
      )}
    >
      {/* 배경 그라데이션 효과 */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out motion-reduce:transition-none bg-gradient-to-br from-[var(--brand-primary)]/5 via-transparent to-transparent z-0" />

      {/* 썸네일 */}
      <div className="aspect-[16/10] relative overflow-hidden bg-[var(--brand-muted-light)]">
        {portfolioItem.thumbnailUrl ? (
          <div className="w-full h-full bg-gradient-to-br from-[var(--brand-primary)]/20 via-[var(--brand-secondary)]/20 to-[var(--brand-hot1)]/20" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--brand-primary)]/10 via-[var(--brand-secondary)]/10 to-[var(--brand-hot1)]/10 transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none">
            <span className="text-sm text-[var(--brand-fg)]/40 font-medium px-4 text-center">
              {portfolioItem.title}
            </span>
          </div>
        )}
      </div>

      <CardHeader className="relative z-10 pb-4 min-w-0">
        {/* 카테고리 & 어워드 배지 */}
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <Badge
            variant="secondary"
            className="uppercase tracking-wide bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/20"
          >
            {portfolioItem.category}
          </Badge>
          {portfolioItem.awards && portfolioItem.awards.length > 0 && (
            <div className="flex items-center gap-1 text-xs font-medium text-[var(--brand-primary)]">
              <Trophy className="h-3 w-3" />
              <span>Awarded {portfolioItem.awards.length}</span>
            </div>
          )}
        </div>

        {/* 제목 */}
        <h3 className="text-xl md:text-2xl font-bold text-[var(--brand-fg)] mb-2 leading-tight break-words line-clamp-2">
          {portfolioItem.title}
        </h3>

        {/* 클라이언트 */}
        <p className="text-sm text-[var(--brand-fg)]/60 mb-3">
          {portfolioItem.client}
        </p>

        {/* 메타: 연도 · 산업 */}
        <div className="flex items-center gap-2 text-xs text-[var(--brand-fg)]/50 mb-3">
          <span>{portfolioItem.year}</span>
          <span>·</span>
          <span>{portfolioItem.industry}</span>
        </div>

        {/* 태그 chips (최대 3개) */}
        {portfolioItem.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 min-w-0">
            {portfolioItem.tags.slice(0, 3).map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs bg-[var(--brand-muted-light)] border-[var(--brand-muted)] text-[var(--brand-fg)]/70"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>
    </Card>
  );
}

