"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CaseItem } from "./casesData";

interface CaseCardProps {
  caseItem: CaseItem;
}

export function CaseCard({ caseItem }: CaseCardProps) {
  return (
    <Link href={`/cases/${caseItem.slug}`} className="group block h-full">
      <Card className="group overflow-hidden border-2 hover:border-[var(--brand-primary)]/20 transition-all duration-300 bg-white shadow-sm hover:shadow-xl rounded-2xl h-full flex flex-col">
        <div className="relative aspect-[4/3] overflow-hidden">
          {/* 이미지 (플레이스홀더) */}
          <div className="absolute inset-0 bg-[var(--brand-muted-light)] group-hover:scale-105 transition-transform duration-500 will-change-transform" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <CardHeader className="p-6 pb-2">
          <div className="flex items-center justify-between mb-3">
            <Badge
              variant="secondary"
              className="rounded-full bg-[var(--brand-primary)]/5 text-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/10 px-3 py-1"
            >
              {caseItem.category}
            </Badge>
          </div>
          <CardTitle className="text-xl md:text-2xl font-bold leading-tight group-hover:text-[var(--brand-primary)] transition-colors text-[var(--brand-fg)]">
            {caseItem.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-2 space-y-4 flex-1 flex flex-col">
          <p className="text-[var(--brand-fg)]/70 line-clamp-2 leading-relaxed">
            {caseItem.excerpt}
          </p>
          <div className="pt-4 border-t border-[var(--brand-muted)] flex items-center justify-between mt-auto">
            <span className="text-sm font-semibold text-[var(--brand-primary)]">
              {caseItem.result}
            </span>
            <div className="w-8 h-8 rounded-full bg-[var(--brand-muted-light)] flex items-center justify-center group-hover:bg-[var(--brand-primary)] transition-colors duration-300">
              <svg
                className="w-4 h-4 text-[var(--brand-fg)]/40 group-hover:text-white transition-colors duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
