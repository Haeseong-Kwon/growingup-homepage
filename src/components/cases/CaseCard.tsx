"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CaseItem } from "./casesData";

interface CaseCardProps {
  caseItem: CaseItem;
}

export function CaseCard({ caseItem }: CaseCardProps) {
  return (
    <Link href={`/cases/${caseItem.slug}`} className="group block h-full">
      <Card
        className={cn(
          "group relative border-2 flex flex-col h-full overflow-hidden min-w-0",
          "transition-transform duration-200 ease-out [contain:paint] motion-reduce:transition-none",
          "hover:-translate-y-1.5 hover:border-[var(--brand-primary)]/40",
          "bg-[var(--brand-bg)] border-[var(--color-border)] shadow-sm"
        )}
      >
        {/* 배경 그라데이션 효과 */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out motion-reduce:transition-none bg-gradient-to-br from-[var(--brand-primary)]/5 via-transparent to-transparent z-0" />

        {/* 썸네일 */}
        <div className="aspect-[4/3] relative overflow-hidden bg-[var(--brand-muted-light)]">
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--brand-primary)]/10 via-[var(--brand-secondary)]/10 to-[var(--brand-hot1)]/10 transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none">
            <span className="text-sm text-[var(--brand-fg)]/40 font-medium px-4 text-center">
              {caseItem.title}
            </span>
          </div>
        </div>

        <CardHeader className="relative z-10 pb-4 min-w-0">
          {/* 카테고리 pill */}
          <div className="mb-3">
            <Badge
              variant="secondary"
              className="uppercase tracking-wide bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/20"
            >
              {caseItem.category}
            </Badge>
          </div>

          {/* 제목 */}
          <h3 className="text-xl md:text-2xl font-bold text-[var(--brand-fg)] mb-3 leading-tight break-words">
            {caseItem.title}
          </h3>

          {/* 요약 (2줄) */}
          <p className="text-sm text-[var(--brand-fg)]/70 leading-relaxed line-clamp-2 min-w-0 break-words">
            {caseItem.excerpt}
          </p>
        </CardHeader>

        <CardContent className="relative z-10 pt-0 mt-auto min-w-0">
          {/* 성과 (하단 강조) */}
          <div className="border-t border-[var(--brand-muted)] pt-4">
            <div className="text-xs font-medium text-[var(--brand-primary)] mb-2 uppercase tracking-wide">
              성과
            </div>
            <p className="text-lg md:text-xl font-bold text-[var(--brand-primary)] leading-tight break-words">
              {caseItem.result}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

