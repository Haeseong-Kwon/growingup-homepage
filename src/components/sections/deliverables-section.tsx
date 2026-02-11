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
  description: string;
}

const deliverableGroups: DeliverableItem[] = [
  {
    title: "조사/분석",
    description: "시장의 기회를 발견하는 데이터 분석",
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
    description: "성공 확률을 높이는 정교한 설계",
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
    description: "고객의 마음을 움직이는 크리에이티브",
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
    description: "지속적 성장을 위한 데이터 자산화",
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
      data-section="deliverables"
      className="py-32 bg-[#F8F9FA]"
    >
      <Container>
        {/* 섹션 헤더 */}
        <MediaReveal intensity="subtle">
          <div className="mb-20 text-center max-w-3xl mx-auto">
            <div className="text-sm font-bold text-[var(--brand-primary)] mb-4 uppercase tracking-widest border-2 border-[var(--brand-primary)] rounded-full px-4 py-1 inline-block">
              Deliverables
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-black mb-6 leading-[0.95] tracking-tighter">
              WHAT YOU<br />ACTUALLY GET
            </h2>
            <p className="text-lg text-black/60 leading-relaxed">
              모호한 조언이 아닌, 실체 있는 결과물을 제공합니다.<br className="hidden md:block" />
              모든 산출물은 귀사의 영구적인 자산이 됩니다.
            </p>
          </div>
        </MediaReveal>

        {/* 카드 그리드 - Floating Glass Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {deliverableGroups.map((group, index) => {
            const Icon = group.icon;
            return (
              <div
                key={index}
                className="group relative h-full"
                style={{ marginTop: index % 2 === 1 ? '3rem' : '0' }} // Staggered grid effect
              >
                {/* Shadow blob */}
                <div className="absolute inset-x-4 bottom-0 h-4 bg-black/20 blur-xl rounded-[100%] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <Card
                  className={cn(
                    "relative h-full border-none overflow-visible",
                    "bg-white",
                    "transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
                    "hover:-translate-y-4 hover:shadow-2xl",
                    "flex flex-col rounded-3xl"
                  )}
                >
                  <CardHeader className="pt-8 pb-4 px-8 relative z-10">
                    <div className="mb-6 flex justify-between items-start">
                      <div className="w-14 h-14 rounded-2xl bg-[#F2F2F2] flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <Icon className="w-7 h-7 text-black group-hover:text-[var(--brand-primary)] transition-colors duration-300" />
                      </div>
                      <span className="text-6xl font-black text-black/5 select-none absolute top-4 right-4 leading-none">
                        0{index + 1}
                      </span>
                    </div>

                    <CardTitle className="text-2xl font-bold text-black mb-2">
                      {group.title}
                    </CardTitle>
                    <p className="text-sm text-black/50 font-medium">
                      {group.description}
                    </p>
                  </CardHeader>

                  <CardContent className="px-8 pb-8 pt-2 flex-1 relative z-10">
                    <div className="w-full h-px bg-black/5 mb-6" />
                    <ul className="space-y-4">
                      {group.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="flex items-start gap-3 group/item"
                        >
                          <CheckCircle2 className="w-5 h-5 text-[var(--brand-primary)]/40 group-hover/item:text-[var(--brand-primary)] mt-0.5 flex-shrink-0 transition-colors" />
                          <span className="text-sm font-medium text-black/70 group-hover/item:text-black transition-colors">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

