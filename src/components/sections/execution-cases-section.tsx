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
      className="py-16 md:py-24"
    >
      <Container className="relative">
        {/* 섹션 헤더 - Massive Typography */}
        <MediaReveal intensity="subtle">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-24 relative z-10">
            <div className="max-w-3xl">
              <div className="text-sm font-bold text-[var(--brand-primary)] mb-4 uppercase tracking-widest border-l-4 border-[var(--brand-primary)] pl-4">
                Process to Results
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-[var(--brand-fg)] leading-[0.9] tracking-tighter mb-6">
                EXECUTION<br />CASES
              </h2>
              <p className="text-xl text-[var(--brand-fg)]/60 max-w-xl leading-relaxed">
                문제 정의부터 가설 검증, 그리고 압도적인 성과까지.<br className="hidden md:block" />
                우리의 실행은 데이터로 증명됩니다.
              </p>
            </div>
            <Link
              href="/cases"
              className="inline-flex items-center gap-2 text-lg font-bold text-[var(--brand-fg)] hover:text-[var(--brand-primary)] transition-colors group/link border-b-2 border-black pb-1 hover:border-[var(--brand-primary)]"
            >
              VIEW ALL CASES
              <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
            </Link>
          </div>
        </MediaReveal>

        {/* 카드 그리드 - Sharp & High Contrast */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t-2 border-l-2 border-[var(--brand-fg)]">
          {executionCases.map((caseItem, index) => (
            <MediaReveal key={index} delay={index * 100} intensity="medium">
              <div
                className={cn(
                  "group relative h-full flex flex-col justify-between p-8 md:p-10",
                  "bg-white border-r-2 border-b-2 border-[var(--brand-fg)]",
                  "transition-all duration-300 ease-out",
                  "hover:bg-[var(--brand-fg)] hover:text-white"
                )}
              >
                <div className="mb-8">
                  <div className="mb-6 flex justify-between items-start">
                    <span className="inline-block px-3 py-1 bg-[var(--brand-fg)] text-white text-xs font-bold uppercase tracking-widest group-hover:bg-white group-hover:text-[var(--brand-fg)] transition-colors">
                      {caseItem.category}
                    </span>
                    <ArrowUpRight className="w-6 h-6 text-[var(--brand-fg)] opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 text-white transition-all duration-300" />
                  </div>

                  <h3 className="text-2xl md:text-3xl font-black mb-6 leading-tight group-hover:text-white transition-colors">
                    {caseItem.title}
                  </h3>

                  <div className="space-y-6">
                    <div>
                      <div className="text-xs font-bold opacity-40 uppercase tracking-widest mb-2 group-hover:text-white group-hover:opacity-60">PROBLEM</div>
                      <p className="text-sm font-medium opacity-80 leading-relaxed group-hover:text-white/90">{caseItem.problem}</p>
                    </div>
                    <div className="w-full h-px bg-[var(--brand-fg)]/10 group-hover:bg-white/20 transition-colors" />
                    <div>
                      <div className="text-xs font-bold opacity-40 uppercase tracking-widest mb-2 group-hover:text-white group-hover:opacity-60">SOLUTION</div>
                      <p className="text-sm font-medium opacity-80 leading-relaxed group-hover:text-white/90">{caseItem.hypothesis}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t-2 border-[var(--brand-fg)]/10 group-hover:border-white/20 transition-colors">
                  <div className="text-xs font-bold text-[var(--brand-primary)] uppercase tracking-widest mb-2 group-hover:text-white group-hover:opacity-80 transition-colors">RESULT</div>
                  <div className="text-2xl font-black text-[var(--brand-primary)] group-hover:text-white transition-colors">
                    {caseItem.result}
                  </div>
                </div>
              </div>
            </MediaReveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

