"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Target, TrendingUp } from "lucide-react";
import Link from "next/link";
import { PortfolioItem } from "@/data/portfolio";
import { Separator } from "@/components/ui/separator";

interface PortfolioDetailModalProps {
  portfolioItem: PortfolioItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PortfolioDetailModal({
  portfolioItem,
  open,
  onOpenChange,
}: PortfolioDetailModalProps) {
  if (!portfolioItem) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <Badge
                  variant="secondary"
                  className="uppercase tracking-wide bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]"
                >
                  {portfolioItem.category}
                </Badge>
                <span className="text-sm text-[var(--brand-fg)]/60">
                  {portfolioItem.year} · {portfolioItem.industry}
                </span>
              </div>
              <DialogTitle className="text-2xl md:text-3xl font-bold mb-2 break-words">
                {portfolioItem.title}
              </DialogTitle>
              <p className="text-lg text-[var(--brand-fg)]/70 mb-4">
                {portfolioItem.client}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* 썸네일 이미지 */}
          <div className="aspect-video relative overflow-hidden rounded-lg bg-[var(--brand-muted-light)]">
            {portfolioItem.thumbnailUrl ? (
              <div className="w-full h-full bg-gradient-to-br from-[var(--brand-primary)]/20 via-[var(--brand-secondary)]/20 to-[var(--brand-hot1)]/20" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--brand-primary)]/10 via-[var(--brand-secondary)]/10 to-[var(--brand-hot1)]/10">
                <span className="text-lg text-[var(--brand-fg)]/40 font-medium px-4 text-center">
                  {portfolioItem.title}
                </span>
              </div>
            )}
          </div>

          {/* 요약 */}
          <div>
            <h3 className="text-lg font-bold mb-2 text-[var(--brand-fg)]">
              프로젝트 개요
            </h3>
            <p className="text-[var(--brand-fg)]/70 leading-relaxed">
              {portfolioItem.summary}
            </p>
          </div>

          <Separator />

          {/* 목표 */}
          {portfolioItem.goals.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Target className="h-5 w-5 text-[var(--brand-primary)]" />
                <h3 className="text-lg font-bold text-[var(--brand-fg)]">
                  프로젝트 목표
                </h3>
              </div>
              <ul className="space-y-2">
                {portfolioItem.goals.map((goal, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-[var(--brand-fg)]/70"
                  >
                    <span className="text-[var(--brand-primary)] mt-1">•</span>
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 성과 (KPI) */}
          {portfolioItem.kpis.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-5 w-5 text-[var(--brand-primary)]" />
                <h3 className="text-lg font-bold text-[var(--brand-fg)]">
                  달성 성과
                </h3>
              </div>
              <ul className="space-y-2">
                {portfolioItem.kpis.map((kpi, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-[var(--brand-fg)]/70"
                  >
                    <span className="text-[var(--brand-primary)] mt-1">•</span>
                    <span>{kpi}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 태그 */}
          {portfolioItem.tags.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mb-3 text-[var(--brand-fg)]">
                태그
              </h3>
              <div className="flex flex-wrap gap-2">
                {portfolioItem.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-[var(--brand-muted-light)] border-[var(--brand-muted)] text-[var(--brand-fg)]/70"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* 어워드 */}
          {portfolioItem.awards && portfolioItem.awards.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Trophy className="h-5 w-5 text-[var(--brand-primary)]" />
                <h3 className="text-lg font-bold text-[var(--brand-fg)]">
                  수상 내역
                </h3>
              </div>
              <div className="space-y-3">
                {portfolioItem.awards.map((award, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-[var(--brand-muted-light)] border border-[var(--brand-muted)]"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div>
                        <div className="font-bold text-[var(--brand-fg)] mb-1">
                          {award.award}
                        </div>
                        <div className="text-sm text-[var(--brand-fg)]/70">
                          {award.category}
                        </div>
                      </div>
                      <div className="text-sm font-medium text-[var(--brand-primary)]">
                        {award.year}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA 버튼 */}
          <div className="pt-4">
            <Button
              asChild
              size="lg"
              className="w-full bg-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/90 text-white rounded-lg h-12 px-8 text-base font-bold"
            >
              <Link href="/diagnosis">진단 요청</Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

