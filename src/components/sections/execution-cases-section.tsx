"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { MediaReveal } from "@/components/motion/media-reveal";

interface ExecutionCase {
  category: string;
  title: string;
  problem: string;
  hypothesis: string;
  execution: string;
  result: string;
}

const executionCases: ExecutionCase[] = [
  {
    category: "전자제품",
    title: "Great 포터블 스크린",
    problem: "무명 브랜드 30만원대 제품, 기존 채널 포화",
    hypothesis: "제품 USP를 숏폼으로 시각화해 초기 트래픽 집중",
    execution: "유튜브 숏츠 · 인스타 릴스 · 스마트스토어",
    result: "4주 만에 3,500대 완판",
  },
  {
    category: "프랜차이즈",
    title: "글라소",
    problem: "브랜드 인지도 0, B2B 리드 확보 예산 제한",
    hypothesis: "창업 니즈 타겟 콘텐츠로 오가닉 리드 확보",
    execution: "블로그 SEO · 유튜브 · 랜딩 퍼널 구축",
    result: "3개월 내 20개 점포 계약",
  },
  {
    category: "크라우드펀딩",
    title: "와디즈 GPT 전자책",
    problem: "신규 카테고리, 레퍼런스 부재, 3주 펀딩 기간",
    hypothesis: "AI 트렌드 + 실용 가치 스토리텔링으로 얼리어답터 공략",
    execution: "상세페이지 기획 · 뉴스레터 · 커뮤니티",
    result: "3주 만에 4억 펀딩 달성",
  },
];

export function ExecutionCasesSection() {
  return (
    <Section
      data-palette="light"
      data-theme="light"
      data-section="execution-cases"
      data-band="120"
      variant="default"
      divider="top"
      minHeight="auto"
      className="py-12 md:py-16"
    >
      <Container className="relative">
        {/* 배경 장식 요소 */}
        <div className="absolute top-0 left-0 w-64 h-64 md:w-96 md:h-96 rounded-full bg-[var(--brand-primary)]/5 blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 rounded-full bg-[var(--brand-secondary)]/5 blur-3xl pointer-events-none translate-x-1/2 translate-y-1/2" />

        {/* 섹션 헤더 */}
        <MediaReveal intensity="subtle">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-8 mb-12 md:mb-16 relative z-10">
            <div>
              <div className="text-sm md:text-base font-medium text-[var(--brand-primary)] mb-2 uppercase tracking-wide">
                실행 사례
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--brand-fg)] leading-tight">
                문제 정의 → 가설 수립 → 실행 → 결과
              </h2>
            </div>
            <Link
              href="/cases"
              className="inline-flex items-center gap-2 text-sm md:text-base font-medium text-[var(--brand-primary)] hover:text-[var(--brand-primary)]/80 transition-colors group/link"
            >
              전체 사례 보기
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
            </Link>
          </div>
        </MediaReveal>

        {/* 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {executionCases.map((caseItem, index) => (
            <MediaReveal key={index} delay={index * 100} intensity="medium">
              <Card
                className={cn(
                  "group relative border-2 flex flex-col h-full overflow-hidden",
                  "transition-transform duration-200 ease-out [contain:paint]",
                  "hover:-translate-y-1.5 motion-reduce:transition-none",
                  "bg-gradient-to-br from-white to-[var(--brand-muted-light)]/30",
                  "border-[var(--color-border)]",
                  "hover:border-[var(--brand-primary)]/40 shadow-sm"
                )}
              >
                {/* 배경 그라데이션 효과 */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out motion-reduce:transition-none bg-gradient-to-br from-[var(--brand-primary)]/5 via-transparent to-transparent" />

                {/* 상단 액센트 바 */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--brand-primary)]/50 via-[var(--brand-secondary)]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out motion-reduce:transition-none" />

                {/* 우상단 아이콘 */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out motion-reduce:transition-none z-10">
                  <ArrowUpRight className="w-5 h-5 text-[var(--brand-primary)]" />
                </div>

              <CardHeader className="pb-4 flex-1 relative z-10">
                {/* 카테고리 칩 */}
                <div className="mb-3">
                  <span className="inline-block px-3 py-1.5 rounded-full bg-[var(--brand-primary)]/10 text-xs font-medium text-[var(--brand-primary)] transition-colors duration-200 ease-out motion-reduce:transition-none group-hover:bg-[var(--brand-primary)]/20">
                    {caseItem.category}
                  </span>
                </div>

                {/* 타이틀 */}
                <h3 className="text-xl md:text-2xl font-bold text-[var(--brand-fg)] mb-6 pr-8">
                  {caseItem.title}
                </h3>

                {/* 문제/가설/실행 블록 */}
                <div className="space-y-4">
                  <div>
                    <div className="text-xs font-medium text-[var(--brand-fg)]/50 mb-1.5 uppercase tracking-wide">
                      문제
                    </div>
                    <p className="text-sm text-[var(--brand-fg)]/80 leading-relaxed">
                      {caseItem.problem}
                    </p>
                  </div>

                  <div className="border-t border-[var(--color-border)] pt-4">
                    <div className="text-xs font-medium text-[var(--brand-fg)]/50 mb-1.5 uppercase tracking-wide">
                      가설
                    </div>
                    <p className="text-sm text-[var(--brand-fg)]/80 leading-relaxed">
                      {caseItem.hypothesis}
                    </p>
                  </div>

                  <div className="border-t border-[var(--color-border)] pt-4">
                    <div className="text-xs font-medium text-[var(--brand-fg)]/50 mb-1.5 uppercase tracking-wide">
                      실행
                    </div>
                    <p className="text-sm text-[var(--brand-fg)]/80 leading-relaxed">
                      {caseItem.execution}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0 mt-auto relative z-10">
                {/* 성과 (하단 강조) */}
                <div className="border-t border-[var(--color-border)] pt-4 group-hover:border-[var(--brand-primary)]/20 transition-colors duration-200 ease-out motion-reduce:transition-none">
                  <div className="text-xs font-medium text-[var(--brand-primary)] mb-2 uppercase tracking-wide">
                    성과
                  </div>
                  <p className="text-lg md:text-xl font-bold text-[var(--brand-primary)] leading-tight">
                    {caseItem.result}
                  </p>
                </div>
              </CardContent>
            </Card>
            </MediaReveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

