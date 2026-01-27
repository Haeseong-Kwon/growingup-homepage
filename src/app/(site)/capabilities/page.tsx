"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { MediaReveal } from "@/components/motion/media-reveal";
import { 
  Search, 
  Target, 
  Zap, 
  Users, 
  RefreshCw,
  FileText,
  BarChart3,
  Store,
  TrendingUp,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mission OS 5단계 데이터
const missionSteps = [
  { title: "시장조사", en: "Market Research", icon: Search },
  { title: "전략 수립", en: "Strategy", icon: Target },
  { title: "실행", en: "Execution", icon: Zap },
  { title: "인력 매칭", en: "Talent Match", icon: Users },
  { title: "피드백 학습", en: "Feedback Loop", icon: RefreshCw },
];

// Operating Principles 데이터
const operatingPrinciples = [
  {
    title: "숫자와 근거 중심",
    description: "감에 의존하지 않습니다. 모든 의사결정은 데이터와 검증된 프레임워크에 기반합니다.",
  },
  {
    title: "지속적 업데이트",
    description: "시장은 변합니다. 실시간 피드백을 반영해 전략을 즉각 수정하고 최적화합니다.",
  },
  {
    title: "재사용 가능한 산출물",
    description: "일회성 보고서가 아닌, DB화된 템플릿과 체계로 반복 활용이 가능합니다.",
  },
];

// Capabilities Map 7개 영역 데이터
const capabilitiesMap = [
  {
    title: "Strategy",
    description: "시장 진입 전략 수립 및 포지셔닝 설계",
    deliverables: ["STP 분석 리포트", "경쟁사 벤치마킹 문서", "런칭 로드맵"],
    successCriteria: "TAM 정의, 핵심 타겟 전환율",
  },
  {
    title: "Creative System",
    description: "브랜드 에셋 및 크리에이티브 시스템 구축",
    deliverables: ["크리에이티브 브리프", "키 비주얼 가이드", "콘텐츠 캘린더"],
    successCriteria: "CTR, 콘텐츠 참여율, 브랜드 인지도",
  },
  {
    title: "Media & Distribution",
    description: "매체 전략 및 예산 배분 최적화",
    deliverables: ["미디어믹스 플랜", "채널별 예산 배분표", "퍼포먼스 대시보드"],
    successCriteria: "ROAS, CPL, 도달률",
  },
  {
    title: "Influencer & Community",
    description: "인플루언서 매칭 및 커뮤니티 운영",
    deliverables: ["인플루언서 숏리스트", "시딩 플랜", "커뮤니티 운영 매뉴얼"],
    successCriteria: "바이럴 도달, EMV, 커뮤니티 활성도",
  },
  {
    title: "Retail & Sales Enablement",
    description: "유통 입점 및 세일즈 지원",
    deliverables: ["바이어 제안 1P", "입점 제안서", "판촉 기획안"],
    successCriteria: "입점 성공률, 완판율, 재입고율",
  },
  {
    title: "Data & Measurement",
    description: "성과 측정 및 데이터 기반 의사결정",
    deliverables: ["주간 리포트 템플릿", "KPI 대시보드", "A/B 테스트 결과서"],
    successCriteria: "전환율, LTV, 리텐션",
  },
  {
    title: "Operations",
    description: "프로젝트 운영 및 외부 리소스 매칭",
    deliverables: ["프로젝트 타임라인", "파트너 매칭 리포트", "SOP 문서"],
    successCriteria: "일정 준수율, 예산 집행률, 이슈 해결 속도",
  },
];

// Working Model 5단계 데이터
const workingModelSteps = [
  {
    step: 1,
    title: "Kickoff",
    period: "D-Day",
    deliverables: "킥오프 미팅 노트, 프로젝트 스코프 문서",
    decision: "목표 KPI 합의, 핵심 가설 확정",
  },
  {
    step: 2,
    title: "Week 1 Setup",
    period: "Week 1",
    deliverables: "전략 프레임워크, 초기 에셋 리스트",
    decision: "채널/매체 선정, 예산 배분 승인",
  },
  {
    step: 3,
    title: "Weekly Operating Loop",
    period: "Week 2+",
    deliverables: "주간 리포트, 퍼포먼스 대시보드",
    decision: "다음 주 실험 우선순위 결정",
  },
  {
    step: 4,
    title: "Report & Decision",
    period: "격주/월간",
    deliverables: "성과 리뷰 리포트, 인사이트 문서",
    decision: "전략 피벗 여부, 예산 재배분",
  },
  {
    step: 5,
    title: "Next Experiment",
    period: "지속",
    deliverables: "실험 기획안, 학습 DB 업데이트",
    decision: "스케일업/종료 결정",
  },
];

// Roadmap 6단계 데이터
const roadmapPhases = [
  { phase: 1, title: "레퍼런스 축적", status: "완료" },
  { phase: 2, title: "솔루션 MVP", status: "완료" },
  { phase: 3, title: "케이스 DB 체계화", status: "진행 중" },
  { phase: 4, title: "신뢰 확보", status: "예정" },
  { phase: 5, title: "포지셔닝", status: "예정" },
  { phase: 6, title: "SaaS 런칭", status: "예정" },
];

// Sample Deliverables 데이터
const sampleDeliverables = [
  {
    title: "런칭 준비도 진단 리포트",
    description: "진단 결과 기반으로 리스크 영역과 우선순위 액션 플랜을 정리한 샘플 리포트입니다.",
    version: "1.0",
    status: "준비 중",
  },
  {
    title: "미디어믹스/예산 배분표",
    description: "채널별 예산 배분과 예상 KPI를 시뮬레이션한 샘플 미디어 플랜입니다.",
    version: "1.0",
    status: "준비 중",
  },
  {
    title: "리테일 바이어 제안 1P",
    description: "유통 입점용으로 제작한 브랜드/제품 소개 1페이지 제안서 샘플입니다.",
    version: "1.0",
    status: "준비 중",
  },
];

export default function CapabilitiesPage() {
  return (
    <>
      {/* Hero */}
      <Section
        data-palette="light"
        data-theme="light"
        data-section="capabilities-hero"
        variant="default"
        divider="none"
        minHeight="medium"
        className="pt-24 md:pt-32"
      >
        <Container>
          <MediaReveal intensity="subtle">
            <div className="max-w-4xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-balance">
                캠페인이 아닌 런칭 시스템을 설계하고 운영합니다
              </h1>
              <p className="text-lg md:text-xl text-[var(--brand-fg)]/70 leading-relaxed mb-10 max-w-3xl">
                각 단계가 독립적으로 작동하면서도 유기적으로 연결되는 운영 프레임워크로, 측정 가능한 성과를 만듭니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/90 text-white rounded-lg h-12 px-8 text-base font-bold"
                >
                  <Link href="/diagnosis">진단 요청</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-2 border-[var(--brand-primary)] text-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/10 rounded-lg h-12 px-8 text-base font-bold"
                >
                  <Link href="/arena">진행 중인 프로젝트 보기</Link>
                </Button>
              </div>
            </div>
          </MediaReveal>
        </Container>
      </Section>

      {/* Mission: OS로 운영되는 마케팅 */}
      <Section
        data-palette="light"
        data-theme="light"
        data-section="mission"
        variant="default"
        divider="top"
        minHeight="auto"
        className="py-16 md:py-24"
      >
        <Container>
          <MediaReveal intensity="subtle">
            <div className="mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-4 text-balance">
                OS로 운영되는 마케팅
              </h2>
              <p className="text-base md:text-lg text-[var(--brand-fg)]/70 leading-relaxed max-w-3xl">
                각 단계가 독립적으로 작동하면서도 유기적으로 연결됩니다. 각 모듈은 독립 실행 가능하며, 전체 사이클을 통해 지속적으로 최적화됩니다.
              </p>
            </div>
          </MediaReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
            {missionSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <MediaReveal key={index} delay={index * 100} intensity="medium">
                  <Card
                    className={cn(
                      "group relative border-2 flex flex-col h-full",
                      "transition-transform duration-200 ease-out [contain:paint] motion-reduce:transition-none",
                      "hover:-translate-y-1.5 hover:border-[var(--brand-primary)]/40",
                      "bg-[var(--brand-bg)] border-[var(--color-border)] shadow-sm"
                    )}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out motion-reduce:transition-none bg-gradient-to-br from-[var(--brand-primary)]/5 via-transparent to-transparent" />
                    
                    <CardHeader className="relative z-10 text-center">
                      <div className="w-12 h-12 rounded-lg bg-[var(--brand-primary)]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[var(--brand-primary)]/20 transition-colors duration-200 ease-out motion-reduce:transition-none">
                        <Icon className="w-6 h-6 text-[var(--brand-primary)]" />
                      </div>
                      <CardTitle className="text-lg md:text-xl font-bold text-[var(--brand-fg)] mb-1">
                        {step.title}
                      </CardTitle>
                      <p className="text-sm text-[var(--brand-fg)]/60 font-medium">
                        {step.en}
                      </p>
                    </CardHeader>
                  </Card>
                </MediaReveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Operating Principles */}
      <Section
        data-palette="light"
        data-theme="light"
        data-section="principles"
        variant="default"
        divider="top"
        minHeight="auto"
        className="py-16 md:py-24"
      >
        <Container>
          <MediaReveal intensity="subtle">
            <div className="mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-4 text-balance">
                Operating Principles
              </h2>
              <p className="text-base md:text-lg text-[var(--brand-fg)]/70 leading-relaxed max-w-3xl">
                모든 프로젝트에 일관되게 적용되는 운영 원칙
              </p>
            </div>
          </MediaReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {operatingPrinciples.map((principle, index) => (
              <MediaReveal key={index} delay={index * 100} intensity="medium">
                <Card
                  className={cn(
                    "group relative border-2 flex flex-col h-full",
                    "transition-transform duration-200 ease-out [contain:paint] motion-reduce:transition-none",
                    "hover:-translate-y-1.5 hover:border-[var(--brand-primary)]/40",
                    "bg-[var(--brand-bg)] border-[var(--color-border)] shadow-sm"
                  )}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out motion-reduce:transition-none bg-gradient-to-br from-[var(--brand-primary)]/5 via-transparent to-transparent" />
                  
                  <CardHeader className="relative z-10">
                    <CardTitle className="text-xl md:text-2xl font-bold text-[var(--brand-fg)] mb-3">
                      {principle.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-sm md:text-base text-[var(--brand-fg)]/70 leading-relaxed">
                      {principle.description}
                    </p>
                  </CardContent>
                </Card>
              </MediaReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Capabilities Map */}
      <Section
        data-palette="light"
        data-theme="light"
        data-section="capabilities-map"
        variant="default"
        divider="top"
        minHeight="auto"
        className="py-16 md:py-24"
      >
        <Container>
          <MediaReveal intensity="subtle">
            <div className="mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-4 text-balance">
                Capabilities Map
              </h2>
              <p className="text-base md:text-lg text-[var(--brand-fg)]/70 leading-relaxed max-w-3xl">
                7개 영역에서 측정 가능한 성과를 만들어내는 체계적인 접근
              </p>
            </div>
          </MediaReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {capabilitiesMap.map((capability, index) => (
              <MediaReveal key={index} delay={index * 50} intensity="medium">
                <Card
                  className={cn(
                    "group relative border-2 flex flex-col h-full",
                    "transition-transform duration-200 ease-out [contain:paint] motion-reduce:transition-none",
                    "hover:-translate-y-1.5 hover:border-[var(--brand-primary)]/40",
                    "bg-[var(--brand-bg)] border-[var(--color-border)] shadow-sm"
                  )}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out motion-reduce:transition-none bg-gradient-to-br from-[var(--brand-primary)]/5 via-transparent to-transparent" />
                  
                  <CardHeader className="relative z-10">
                    <CardTitle className="text-xl md:text-2xl font-bold text-[var(--brand-fg)] mb-2">
                  {capability.title}
                    </CardTitle>
                    <p className="text-sm text-[var(--brand-fg)]/70 leading-relaxed mb-4">
                  {capability.description}
                </p>
                  </CardHeader>
                  <CardContent className="relative z-10 flex-1 flex flex-col">
                    <div className="mb-4">
                      <div className="text-xs font-medium uppercase tracking-wide text-[var(--brand-fg)]/60 mb-2">
                        대표 산출물
                      </div>
                      <ul className="space-y-1.5">
                        {capability.deliverables.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[var(--brand-primary)] mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-[var(--brand-fg)]/80 leading-relaxed">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-auto pt-4 border-t border-[var(--brand-muted)]">
                      <div className="text-xs font-medium uppercase tracking-wide text-[var(--brand-fg)]/60 mb-1">
                        성공 기준
                      </div>
                      <p className="text-sm text-[var(--brand-fg)]/70 leading-relaxed">
                        {capability.successCriteria}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </MediaReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Working Model */}
      <Section
        data-palette="dark"
        data-theme="dark"
        data-section="working-model"
        theme="dark"
        variant="default"
        divider="top"
        bleed={true}
        minHeight="auto"
        className="py-16 md:py-24"
      >
        <Container>
          <MediaReveal intensity="subtle">
            <div className="mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-4 text-balance text-white">
                Working Model
              </h2>
              <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-3xl">
                킥오프부터 스케일업까지, 명확한 단계와 산출물로 협업합니다
              </p>
            </div>
          </MediaReveal>

          <div className="space-y-6 md:space-y-8">
            {workingModelSteps.map((step, index) => (
              <MediaReveal key={index} delay={index * 100} intensity="medium">
                <Card
                  className={cn(
                    "group relative border-2 flex flex-col md:flex-row",
                    "transition-transform duration-200 ease-out [contain:paint] motion-reduce:transition-none",
                    "hover:-translate-y-1.5 hover:border-white/30",
                    "bg-white/5 border-white/10 shadow-sm"
                  )}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out motion-reduce:transition-none bg-gradient-to-br from-white/5 via-transparent to-transparent" />
                  
                  <CardHeader className="relative z-10 flex-shrink-0 md:w-48 pb-4 md:pb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center text-white font-bold text-lg">
                        {step.step}
                      </div>
                      <div>
                        <CardTitle className="text-lg md:text-xl font-bold text-white mb-1">
                          {step.title}
                        </CardTitle>
                        <p className="text-sm text-white/60">
                          {step.period}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10 flex-1 flex flex-col md:flex-row gap-6 pt-0">
                    <div className="flex-1">
                      <div className="text-xs font-medium uppercase tracking-wide text-white/60 mb-2">
                        산출물
                      </div>
                      <p className="text-sm text-white/80 leading-relaxed">
                        {step.deliverables}
                      </p>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-medium uppercase tracking-wide text-white/60 mb-2">
                        의사결정
                      </div>
                      <p className="text-sm text-white/80 leading-relaxed">
                        {step.decision}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </MediaReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Roadmap */}
      <Section
        data-palette="light"
        data-theme="light"
        data-section="roadmap"
        variant="default"
        divider="top"
        minHeight="auto"
        className="py-16 md:py-24"
      >
        <Container>
          <MediaReveal intensity="subtle">
            <div className="mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-4 text-balance">
                Roadmap
              </h2>
              <p className="text-base md:text-lg text-[var(--brand-fg)]/70 leading-relaxed max-w-3xl">
                체계적인 성장 경로
              </p>
            </div>
          </MediaReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {roadmapPhases.map((phase, index) => (
              <MediaReveal key={index} delay={index * 100} intensity="medium">
                <Card
                  className={cn(
                    "group relative border-2 flex flex-col",
                    "transition-transform duration-200 ease-out [contain:paint] motion-reduce:transition-none",
                    "hover:-translate-y-1.5 hover:border-[var(--brand-primary)]/40",
                    "bg-[var(--brand-bg)] border-[var(--color-border)] shadow-sm"
                  )}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out motion-reduce:transition-none bg-gradient-to-br from-[var(--brand-primary)]/5 via-transparent to-transparent" />
                  
                  <CardHeader className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-[var(--brand-fg)]/60">
                        Phase {phase.phase}
                      </span>
                      <span className={cn(
                        "text-xs font-medium px-2 py-1 rounded-full",
                        phase.status === "완료" && "bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]",
                        phase.status === "진행 중" && "bg-[var(--brand-hot1)]/10 text-[var(--brand-hot1)]",
                        phase.status === "예정" && "bg-[var(--brand-muted-light)] text-[var(--brand-fg)]/60"
                      )}>
                        {phase.status}
                      </span>
              </div>
                    <CardTitle className="text-xl md:text-2xl font-bold text-[var(--brand-fg)]">
                      {phase.title}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </MediaReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Sample Deliverables */}
      <Section
        data-palette="light"
        data-theme="light"
        data-section="sample-deliverables"
        variant="default"
        divider="top"
        minHeight="auto"
        className="py-16 md:py-24"
      >
        <Container>
          <MediaReveal intensity="subtle">
            <div className="mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-4 text-balance">
                Sample Deliverables
              </h2>
              <p className="text-base md:text-lg text-[var(--brand-fg)]/70 leading-relaxed max-w-3xl">
                실제로 클라이언트에게 전달하는 산출물 샘플을 확인하세요
              </p>
            </div>
          </MediaReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {sampleDeliverables.map((deliverable, index) => (
              <MediaReveal key={index} delay={index * 100} intensity="medium">
                <Card
                  className={cn(
                    "group relative border-2 flex flex-col h-full",
                    "transition-transform duration-200 ease-out [contain:paint] motion-reduce:transition-none",
                    "hover:-translate-y-1.5 hover:border-[var(--brand-primary)]/40",
                    "bg-[var(--brand-bg)] border-[var(--color-border)] shadow-sm"
                  )}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out motion-reduce:transition-none bg-gradient-to-br from-[var(--brand-primary)]/5 via-transparent to-transparent" />
                  
                  <CardHeader className="relative z-10">
                    <CardTitle className="text-xl md:text-2xl font-bold text-[var(--brand-fg)] mb-3">
                      {deliverable.title}
                    </CardTitle>
                    <p className="text-sm text-[var(--brand-fg)]/70 leading-relaxed mb-4">
                      {deliverable.description}
                    </p>
                  </CardHeader>
                  <CardContent className="relative z-10 mt-auto pt-0">
                    <div className="flex items-center justify-between pt-4 border-t border-[var(--brand-muted)]">
                      <div className="text-xs font-medium text-[var(--brand-fg)]/60">
                        버전: {deliverable.version}
                      </div>
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-[var(--brand-muted-light)] text-[var(--brand-fg)]/60">
                        {deliverable.status}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </MediaReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section
        data-palette="dark"
        data-theme="dark"
        data-section="capabilities-cta"
        theme="dark"
        variant="default"
        divider="top"
        bleed={true}
        minHeight="auto"
        className="py-16 md:py-24"
      >
        <Container>
          <MediaReveal intensity="subtle">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-6 text-balance text-white">
                우리의 시스템이 귀사의 런칭에 적합한지 확인하세요
              </h2>
              <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed">
                3분이면 현재 런칭 준비 상태를 진단하고, 우선순위 액션 플랜을 받아볼 수 있습니다.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-white text-[var(--brand-primary)] hover:bg-white/90 rounded-lg h-12 px-8 text-base font-bold"
              >
                <Link href="/diagnosis">진단 요청</Link>
              </Button>
            </div>
          </MediaReveal>
        </Container>
      </Section>
    </>
  );
}
