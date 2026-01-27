"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { VideoHero } from "@/components/hero/video-hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ArrowUpRight, Sparkles, Zap, Target, TrendingUp, Store, Book, Search, Palette, Share2, Users, RefreshCw } from "lucide-react";
import { SplitTextReveal } from "@/components/motion/split-text-reveal";
import { MediaReveal } from "@/components/motion/media-reveal";
import { HorizontalSlider } from "@/components/sections/horizontal-slider";
import { ExecutionCasesSection } from "@/components/sections/execution-cases-section";
import { DeliverablesSection } from "@/components/sections/deliverables-section";
import { Accordion } from "@/components/ui/accordion";
import { KpiBadge } from "@/components/ui/kpi-badge";
import { PerformanceCard } from "@/components/sections/performance-card";

// 더미 데이터 - 진행 중인 프로젝트
const ongoingProjects = [
  {
    id: "1",
    title: "브랜드 리뉴얼 프로젝트",
    category: "브랜딩",
    description: "디지털 시대에 맞는 새로운 브랜드 아이덴티티 구축",
    href: "/projects/1",
  },
  {
    id: "2",
    title: "마케팅 캠페인 최적화",
    category: "마케팅",
    description: "데이터 기반 캠페인 성과 개선 및 ROI 향상",
    href: "/projects/2",
  },
  {
    id: "3",
    title: "고객 경험 혁신",
    category: "UX/UI",
    description: "사용자 중심의 디지털 경험 설계 및 구현",
    href: "/projects/3",
  },
  {
    id: "4",
    title: "콘텐츠 전략 수립",
    category: "콘텐츠",
    description: "브랜드 스토리텔링을 통한 고객 소통 강화",
    href: "/projects/4",
  },
];

// 프로세스 스텝 (GrowingUp Marketing OS)
const processSteps = [
  {
    title: "시장조사",
    description: "경쟁 환경, 타겟 분석, 기회 영역 도출",
    outputs: "3C 분석, 타겟 페르소나, 포지셔닝 맵",
  },
  {
    title: "전략 수립",
    description: "채널 믹스, 메시지, KPI 설계",
    outputs: "전략 문서, 크리에이티브 브리프, 예산 배분표",
  },
  {
    title: "실행",
    description: "콘텐츠 제작, 미디어 바잉, 채널 운영",
    outputs: "콘텐츠 패키지, 진행 리포트, 성과 대시보드",
  },
  {
    title: "인력 매칭",
    description: "전문 인력 연결, 역할 분담, 협업 체계",
    outputs: "파트너 리스트, SOP 문서, 커뮤니케이션 가이드",
  },
  {
    title: "피드백 학습",
    description: "성과 분석, 가설 검증, 다음 실험 설계",
    outputs: "인사이트 리포트, 학습 DB, 넥스트 액션 플랜",
  },
];

// FAQ 데이터
const faqItems = [
  {
    question: "외주 참여는 어떻게 신청하나요?",
    answer: "홈페이지의 '외주 파트너 등록' 메뉴에서 신청서를 작성하시면 됩니다. 검토 후 연락드리겠습니다.",
  },
  {
    question: "마케팅 제안은 어떤 방식으로 진행되나요?",
    answer: "프로젝트 목표와 예산을 공유해주시면 맞춤형 제안서를 작성해드립니다. 제안 요청 페이지에서 신청하실 수 있습니다.",
  },
  {
    question: "프로젝트 진행 기간은 얼마나 걸리나요?",
    answer: "프로젝트 규모와 범위에 따라 다르지만, 일반적으로 4주~12주 정도 소요됩니다. 정확한 일정은 프로젝트 킥오프 미팅에서 확정됩니다.",
  },
  {
    question: "정산은 언제 이루어지나요?",
    answer: "프로젝트 단계별 마일스톤 완료 시 정산이 이루어집니다. 계약서에 명시된 조건에 따라 진행됩니다.",
  },
  {
    question: "작업물 검수는 어떻게 하나요?",
    answer: "각 단계별로 작업물을 공유하며 피드백을 받습니다. 최종 검수는 프로젝트 완료 전에 진행됩니다.",
  },
  {
    question: "어떤 분야의 외주를 모집하나요?",
    answer: "마케팅, 디자인, 개발, 콘텐츠 제작, 데이터 분석 등 다양한 분야의 전문가를 모집하고 있습니다.",
  },
  {
    question: "프로젝트 참여 시 필요한 자격은 무엇인가요?",
    answer: "관련 분야 경력과 포트폴리오가 필요합니다. 자세한 사항은 외주 파트너 등록 페이지를 참고해주세요.",
  },
  {
    question: "비용은 어떻게 책정되나요?",
    answer: "프로젝트 규모, 기간, 난이도에 따라 차등 책정됩니다. 무료 상담을 통해 정확한 견적을 받아보실 수 있습니다.",
  },
];


// 포트폴리오 케이스
const portfolioCases = [
  {
    category: "전자제품",
    title: "Great 포터블 스크린",
    summary: "무명 브랜드 30만원대 제품, 기존 마케팅 채널 포화 상태에서 신규 진입 필요",
    result: "4주 만에 3,500대 완판",
    href: "/portfolio/great-portable-screen",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
  },
  {
    category: "프랜차이즈",
    title: "글라소",
    summary: "브랜드 인지도 0%, 가맹점 모집 광고 예산 제한, B2B 리드 확보 어려움",
    result: "3개월 내 20개 점포 계약",
    href: "/portfolio/glaso",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&fit=crop",
  },
  {
    category: "크라우드펀딩",
    title: "와디즈 GPT 전자책",
    summary: "신규 카테고리(AI 전자책), 레퍼런스 부재, 3주라는 짧은 펀딩 기간",
    result: "3주 만에 4억 펀딩 달성",
    href: "/portfolio/wadiz-gpt-ebook",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop",
  },
];

export default function HomePage() {
  return (
    <>
      {/* [0] Video Hero - brand palette */}
      <VideoHero
        title="런칭을 기획서가 아닌 매출과 데이터로 증명합니다"
        subtitle="데이터 기반의 정확한 진단으로 비즈니스의 본질적인 성장을 만듭니다."
        primaryCta={{
          label: "진행 중인 프로젝트 보기",
          href: "/projects",
        }}
        secondaryCta={{
          label: "마케팅 제안 요청",
          href: "/proposal",
        }}
      />

      {/* [1] "Why GrowingUp" - light */}
      <Section
        data-palette="light"
        data-theme="light"
        data-section="why-growingup"
        data-band="160"
        theme="light"
        variant="default"
        divider="top"
        bleed={true}
        minHeight="medium"
      >
        <Container>
          <div className="mb-16 md:mb-20">
            <SplitTextReveal
              text="왜 GrowingUp인가"
              as="h2"
              align="left"
              split="words"
              direction="lr"
              className="mb-6"
            />
            <p className="text-lg md:text-xl text-[var(--brand-fg)]/70 max-w-3xl leading-relaxed">
              데이터 기반의 정확한 진단과 실행력으로 비즈니스의 본질적인 성장을 만들어갑니다.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <Card className="border-2 hover:border-[var(--brand-primary)]/30 transition-transform transition-colors duration-200 ease-out [contain:paint] motion-reduce:transition-none hover:-translate-y-1 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl font-bold mb-3">
                  데이터 기반 전략
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--brand-fg)]/70 leading-relaxed">
                  추측이 아닌 데이터로 의사결정합니다. 정확한 분석을 통해 최적의 솔루션을 제시합니다.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-[var(--brand-primary)]/30 transition-transform transition-colors duration-200 ease-out [contain:paint] motion-reduce:transition-none hover:-translate-y-1 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl font-bold mb-3">
                  크리에이티브 실행력
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--brand-fg)]/70 leading-relaxed">
                  아이디어를 현실로 만드는 실행력. 빠르고 정확한 구현으로 시장을 선도합니다.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-[var(--brand-primary)]/30 transition-transform transition-colors duration-200 ease-out [contain:paint] motion-reduce:transition-none hover:-translate-y-1 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl font-bold mb-3">
                  지속적인 최적화
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--brand-fg)]/70 leading-relaxed">
                  한 번의 성공으로 끝나지 않습니다. 지속적인 모니터링과 개선으로 성장을 이어갑니다.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* [2] 실행 결과 - 성과 섹션 */}
      <Section
        data-palette="light"
        data-theme="light"
        data-section="performance"
        data-band="120"
        variant="default"
        divider="top"
        minHeight="auto"
        className="py-12 md:py-16 relative overflow-hidden"
      >
        {/* 배경 장식 요소 */}
        <div className="absolute top-0 left-0 w-64 h-64 md:w-96 md:h-96 rounded-full bg-[var(--brand-primary)]/5 blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 rounded-full bg-[var(--brand-secondary)]/5 blur-3xl pointer-events-none translate-x-1/2 translate-y-1/2" />

        <Container className="relative z-10">
          {/* 섹션 제목 */}
          <MediaReveal intensity="subtle">
            <div className="text-center mb-8 md:mb-12">
              <div className="text-sm md:text-base font-medium text-[var(--brand-primary)] mb-2 uppercase tracking-wide">
                실행 결과
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--brand-fg)] mb-2">
                숫자로 검증된 런칭 성과
              </h2>
            </div>
          </MediaReveal>

          {/* 성과 카드 3개 */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 items-stretch">
            <PerformanceCard
              icon={TrendingUp}
              title="Great 포터블 스크린"
              number={3500}
              numberSuffix="대 완판"
              description="4주 집중 캠페인, 정식 런칭 1개월 내 완판 달성"
              metrics={["ROAS 320%", "CPA 8,500원", "CTR 4.2%"]}
              color="primary"
              delay={0}
            />
            <PerformanceCard
              icon={Store}
              title="글라소 프랜차이즈"
              number={20}
              numberSuffix="개 점포"
              description="SEO + 콘텐츠 마케팅으로 가맹 문의 월 50건 확보"
              metrics={["리드 전환율 12%", "CAC 15만원", "1페이지 키워드 23개"]}
              color="secondary"
              delay={100}
            />
            <PerformanceCard
              icon={Book}
              title="와디즈 GPT 전자책"
              number={400000000}
              numberSuffix=" 펀딩"
              description="한국 최초 GPT 활용 전자책, 펀딩률 4,000% 달성"
              metrics={["후원자 3,200명", "평균 후원금 12.5만원", "펀딩률 4,000%"]}
              color="hot1"
              delay={200}
            />
          </div>
        </Container>
      </Section>

      {/* [2-1] 실행 사례 섹션 */}
      <ExecutionCasesSection />

      {/* [3] Theme Switch Section - dark */}
      <Section
        data-palette="dark"
        data-theme="dark"
        data-section="brand-creative"
        data-band="120"
        theme="dark"
        variant="ink"
        divider="none"
        bleed={true}
        minHeight="medium"
        edgeFade="both"
      >
        <Container>
          <div className="max-w-4xl mx-auto text-center relative">
            {/* 여백 장식 요소 - 포인트컬러 원형 그라데이션 */}
            <div className="absolute -top-8 -left-8 w-32 h-32 md:w-48 md:h-48 rounded-full bg-[var(--brand-primary)]/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-8 -right-8 w-32 h-32 md:w-48 md:h-48 rounded-full bg-[var(--brand-secondary)]/20 blur-3xl pointer-events-none" />
            
            <div className="relative z-10">
              <SplitTextReveal
                text="브랜드와 크리에이티브, 실행력의 완벽한 조화"
                as="h2"
                align="center"
                split="words"
                direction="lr"
                className="text-white mb-8"
              />
              <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto mb-12 md:mb-16">
                단순한 실행이 아닌, 전략적 사고와 창의적 솔루션이 만나는 지점에서 진정한 성장이 시작됩니다.
              </p>

              {/* 핵심 가치 카드 그리드 */}
              <div className="grid md:grid-cols-3 gap-6 md:gap-8 mt-12">
                {/* 브랜드 */}
                <div className="group relative p-6 md:p-8 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-colors duration-200 ease-out [contain:paint] motion-reduce:transition-none">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--brand-primary)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out motion-reduce:transition-none" />
                  <div className="mb-4 text-center">
                    <div className="w-12 h-12 rounded-lg bg-[var(--brand-primary)]/20 flex items-center justify-center mb-4 mx-auto group-hover:bg-[var(--brand-primary)]/30 transition-colors">
                      <Sparkles className="w-6 h-6 text-[var(--brand-primary)]" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                      브랜드
                    </h3>
                  </div>
                  <p className="text-sm md:text-base text-white/70 leading-relaxed">
                    차별화된 브랜드 아이덴티티로 시장에서 독보적인 위치를 확보합니다.
                  </p>
                </div>

                {/* 크리에이티브 */}
                <div className="group relative p-6 md:p-8 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-colors duration-200 ease-out [contain:paint] motion-reduce:transition-none">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--brand-secondary)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out motion-reduce:transition-none" />
                  <div className="mb-4 text-center">
                    <div className="w-12 h-12 rounded-lg bg-[var(--brand-secondary)]/20 flex items-center justify-center mb-4 mx-auto group-hover:bg-[var(--brand-secondary)]/30 transition-colors">
                      <Zap className="w-6 h-6 text-[var(--brand-secondary)]" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                      크리에이티브
                    </h3>
                  </div>
                  <p className="text-sm md:text-base text-white/70 leading-relaxed">
                    혁신적인 아이디어와 창의적 솔루션으로 고객의 니즈를 뛰어넘습니다.
                  </p>
                </div>

                {/* 실행력 */}
                <div className="group relative p-6 md:p-8 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-colors duration-200 ease-out [contain:paint] motion-reduce:transition-none">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--brand-hot1)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out motion-reduce:transition-none" />
                  <div className="mb-4 text-center">
                    <div className="w-12 h-12 rounded-lg bg-[var(--brand-hot1)]/20 flex items-center justify-center mb-4 mx-auto group-hover:bg-[var(--brand-hot1)]/30 transition-colors">
                      <Target className="w-6 h-6 text-[var(--brand-hot1)]" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                      실행력
                    </h3>
                  </div>
                  <p className="text-sm md:text-base text-white/70 leading-relaxed">
                    빠르고 정확한 실행으로 전략을 현실로 만들어 성과를 창출합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* [4] Process / How we work - dark 유지 */}
      <Section
        data-palette="dark"
        data-theme="dark"
        data-section="process"
        data-band="160"
        theme="dark"
        variant="ink"
        divider="none"
        bleed={true}
        minHeight="medium"
        edgeFade="both"
      >
        <Container>
          <div className="mb-12 md:mb-16">
            <div className="text-center mb-4">
              <div className="text-sm md:text-base font-medium text-white/60 mb-2 uppercase tracking-wide">
                운영 프레임워크
              </div>
              <SplitTextReveal
                text="GrowingUp Marketing OS"
                as="h2"
                align="center"
                split="words"
                direction="lr"
                className="text-white mb-4"
              />
            </div>
            <div className="text-center text-white/80 max-w-2xl mx-auto space-y-2">
              <p>5단계 운영 루프로 런칭의 불확실성을 체계적으로 관리합니다.</p>
              <p>각 단계마다 명확한 산출물과 의사결정 기준을 제공합니다.</p>
            </div>
          </div>
          <HorizontalSlider items={processSteps} dark={true} intervalMs={3000} />
          <div className="mt-12 text-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-[var(--brand-primary)] hover:bg-white/90 rounded-lg h-12 px-8 text-base font-bold"
            >
              <Link href="/apply">외주 파트너 등록</Link>
            </Button>
        </div>
        </Container>
      </Section>

      {/* [4-1] Deliverables Section - light */}
      <DeliverablesSection />

      {/* [5] Ongoing Projects Preview - light로 전환 */}
      <Section
        data-palette="light"
        data-theme="light"
        data-section="ongoing-projects"
        data-band="120"
        variant="default"
        divider="top"
        minHeight="medium"
        edgeFade="both"
      >
        <Container>
          <div className="mb-12 md:mb-16">
            <h2 className="section-title text-balance mb-4">
              진행 중인 프로젝트
            </h2>
            <p className="text-lg text-[var(--brand-fg)]/70 max-w-2xl">
              현재 진행 중인 다양한 프로젝트를 확인하세요.
              </p>
            </div>

          <MediaReveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {ongoingProjects.map((project) => (
                <Link key={project.id} href={project.href || "/projects"}>
                  <Card className="h-full border-2 hover:border-[var(--brand-primary)]/30 transition-transform transition-colors duration-200 ease-out [contain:paint] motion-reduce:transition-none hover:-translate-y-1 cursor-pointer shadow-sm">
                    <CardHeader>
                      <div className="text-xs font-bold text-[var(--brand-primary)] mb-2 uppercase tracking-wide">
                        {project.category}
                      </div>
                      <CardTitle className="text-xl md:text-2xl font-bold mb-3">
                        {project.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-[var(--brand-fg)]/70 leading-relaxed">
                        {project.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
          ))}
        </div>
          </MediaReveal>

          <div className="mt-12 text-center">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-lg h-12 px-8 text-base font-bold"
            >
              <Link href="/projects">
                전체 프로젝트 보기
                <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
            </Button>
        </div>
        </Container>
      </Section>

      {/* [6] Portfolio / Case Highlights - light */}
      <Section
        data-palette="light"
        data-theme="light"
        data-section="portfolio"
        data-band="120"
        variant="tinted"
        divider="top"
        bleed={true}
        minHeight="medium"
      >
        <Container>
          <div className="mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              포트폴리오 하이라이트
            </h2>
            <p className="text-lg text-[var(--brand-fg)]/70 max-w-2xl">
              성공적인 프로젝트 사례를 통해 우리의 역량을 확인하세요.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {portfolioCases.map((caseItem, index) => (
              <Link key={index} href={caseItem.href || "#"} className="group">
                <Card className="h-full border-2 overflow-hidden hover:border-[var(--brand-primary)]/30 transition-transform duration-200 ease-out [contain:paint] motion-reduce:transition-none hover:-translate-y-1 shadow-sm">
                  <div className="relative aspect-video overflow-hidden bg-[var(--brand-muted-light)]">
                    <Image
                      src={caseItem.image}
                      alt={caseItem.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <CardHeader className="relative">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 rounded-full bg-[var(--brand-muted-light)] text-xs font-medium text-[var(--brand-fg)]">
                        {caseItem.category}
                      </span>
                      <ArrowUpRight className="w-5 h-5 text-[var(--brand-fg)]/50 group-hover:text-[var(--brand-primary)] transition-colors" />
                    </div>
                    <CardTitle className="text-xl md:text-2xl font-bold text-[var(--brand-fg)] leading-tight">
                      {caseItem.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[var(--brand-fg)]/70 leading-relaxed mb-4">
                      {caseItem.summary}
                    </p>
                    <div className="pt-4 border-t border-[var(--brand-muted)]">
                      <div className="text-xs font-medium text-[var(--brand-fg)]/60 mb-2 uppercase tracking-wide">
                        성과
                      </div>
                      <div className="text-lg md:text-xl font-bold text-[var(--brand-primary)]">
                        {caseItem.result}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-lg h-12 px-8 text-base font-bold"
            >
              <Link href="/portfolio">
                포트폴리오 보기
                <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
            </Button>
        </div>
        </Container>
      </Section>

      {/* [8] FAQ - light */}
      <Section
        data-palette="light"
        data-theme="light"
        data-section="faq"
        data-band="160"
        variant="tinted"
        divider="top"
        bleed={true}
        minHeight="medium"
      >
        <Container>
          <div className="mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
              자주 묻는 질문
            </h2>
            <p className="text-center text-[var(--brand-fg)]/70 max-w-2xl mx-auto">
              프로젝트 참여와 서비스 이용에 대한 궁금증을 해결해드립니다.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion items={faqItems} />
          </div>
        </Container>
      </Section>

      {/* [9] Final CTA - dark */}
      <Section
        data-palette="dark"
        data-theme="dark"
        data-section="final-cta"
        data-band="120"
        theme="dark"
        variant="ink"
        divider="none"
        bleed={true}
        minHeight="medium"
        edgeFade="both"
      >
        <Container>
        <div className="max-w-3xl mx-auto text-center">
          <h2
              className="font-bold tracking-tight mb-6 text-balance text-white"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              lineHeight: "1.05",
              letterSpacing: "-0.02em",
            }}
          >
            지금 바로 시작하세요
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed">
              프로젝트 참여 신청 또는 마케팅 제안 요청을 통해 성장의 첫 걸음을 내딛어보세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
                className="bg-white text-[var(--brand-primary)] hover:bg-white/90 rounded-lg h-12 px-8 text-base font-bold"
            >
                <Link href="/apply">프로젝트 참여 신청</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
                className="border-2 border-white/30 bg-white/10 hover:bg-white/20 text-white rounded-lg h-12 px-8 text-base font-bold"
            >
                <Link href="/proposal">마케팅 제안 요청</Link>
            </Button>
          </div>
        </div>
        </Container>
      </Section>
    </>
  );
}
