"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CaseItem } from "./casesData";

interface CaseCardProps {
  caseItem: CaseItem;
  className?: string;
}

export function CaseCard({ caseItem, className }: CaseCardProps) {
  return (
    <Link href={`/cases/${caseItem.slug}`} className={cn("group block h-full", className)}>
      <Card className={cn(
        "h-full flex flex-col transition-all duration-300",
        "bg-white border-2 border-[var(--brand-fg)] rounded-none", // Sharp corners, black border
        "group-hover:bg-[var(--brand-fg)] group-hover:text-white" // Inverse hover
      )}>
        <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-[var(--brand-fg)]">
          <div className="absolute inset-0 bg-[var(--brand-muted-light)] group-hover:scale-105 transition-transform duration-500 will-change-transform" />
          {/* Gradient overlay for text readability if needed, but we have text below */}
        </div>
        <CardHeader className="p-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <Badge
              variant="outline"
              className="rounded-full border-[var(--brand-fg)] text-[var(--brand-fg)] group-hover:border-white group-hover:text-white transition-colors px-3 py-1"
            >
              {caseItem.category}
            </Badge>
          </div>
          <CardTitle className="text-xl md:text-2xl font-bold leading-tight group-hover:text-white transition-colors text-[var(--brand-fg)]">
            {caseItem.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-0 space-y-4 flex-1 flex flex-col">
          <p className="text-[var(--brand-fg)]/70 group-hover:text-white/80 line-clamp-2 leading-relaxed transition-colors">
            {caseItem.excerpt}
          </p>
          <div className="pt-4 border-t border-[var(--brand-fg)]/10 group-hover:border-white/20 flex items-center justify-between mt-auto transition-colors">
            <span className="text-sm font-bold text-[var(--brand-primary)] group-hover:text-white transition-colors">
              {caseItem.result}
            </span>
            <div className="w-8 h-8 flex items-center justify-center border border-[var(--brand-fg)]/20 rounded-full group-hover:border-white/40 transition-colors">
              <svg
                className="w-4 h-4 text-[var(--brand-fg)] group-hover:text-white transition-colors"
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
