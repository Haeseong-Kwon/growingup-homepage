"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Search, 
  Target, 
  FileText, 
  BarChart3,
  CheckCircle2 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { MediaReveal } from "@/components/motion/media-reveal";

interface DeliverableItem {
  title: string;
  items: string[];
  icon: typeof Search;
}

const deliverableGroups: DeliverableItem[] = [
  {
    title: "조사/분석",
    items: [
      "3C 분석 (고객/경쟁/자사)",
      "타겟 페르소나 카드",
      "STP 프레임워크",
      "포지셔닝 맵",
    ],
    icon: Search,
  },
  {
    title: "전략/기획",
    items: [
      "채널별 KPI 설정",
      "미디어믹스 플랜",
      "예산 배분 시뮬레이션",
      "실행 로드맵",
    ],
    icon: Target,
  },
  {
    title: "제작/실행",
    items: [
      "크리에이티브 가이드",
      "숏폼/롱폼 콘텐츠",
      "상세페이지 기획",
      "광고 소재 패키지",
    ],
    icon: FileText,
  },
  {
    title: "측정/학습",
    items: [
      "주간 성과 리포트",
      "월간 인사이트 리뷰",
      "학습 DB 업데이트",
      "넥스트 액션 플랜",
    ],
    icon: BarChart3,
  },
];

export function DeliverablesSection() {
  return (
    <Section
      data-palette="light"
      data-theme="light"
      data-band="120"
      variant="default"
      divider="top"
      minHeight="auto"
      className="py-12 md:py-16"
    >
      <Container>
        {/* 섹션 헤더 */}
        <MediaReveal intensity="subtle">
          <div className="mb-12 md:mb-16">
            <div className="text-sm md:text-base font-medium text-[var(--brand-primary)] mb-2 uppercase tracking-wide">
              산출물
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--brand-fg)] mb-4 leading-tight">
              협업 시 제공되는 산출물
            </h2>
            <div className="space-y-2 text-base md:text-lg text-[var(--brand-fg)]/70 leading-relaxed max-w-3xl">
              <p>모든 산출물은 재사용 가능한 형태로 DB화됩니다.</p>
              <p>프로젝트 종료 후에도 내부 자산으로 활용할 수 있습니다.</p>
            </div>
          </div>
        </MediaReveal>

        {/* 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
          {deliverableGroups.map((group, index) => {
            const Icon = group.icon;
            return (
              <MediaReveal key={index} delay={index * 100} intensity="medium">
                <Card
                  className={cn(
                    "group relative border-2 transition-all duration-300 flex flex-col",
                    "bg-[var(--brand-bg)]",
                    "border-[var(--color-border)]",
                    "hover:border-[var(--brand-primary)]/40 hover:-translate-y-0.5 hover:shadow-lg",
                    "h-full min-h-[280px]"
                  )}
                >
                  <CardHeader className="pb-4">
                    {/* 아이콘 + 타이틀 */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-[var(--brand-primary)]/10 flex items-center justify-center group-hover:bg-[var(--brand-primary)]/20 transition-colors duration-300">
                        <Icon className="w-5 h-5 text-[var(--brand-primary)]" />
                      </div>
                      <CardTitle className="text-xl md:text-2xl font-bold text-[var(--brand-fg)]">
                        {group.title}
                      </CardTitle>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0 flex-1 flex flex-col">
                    {/* 리스트 항목들 */}
                    <ul className="space-y-3">
                      {group.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="flex items-start gap-2.5"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[var(--brand-primary)] mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-[var(--brand-fg)]/80 leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </MediaReveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

