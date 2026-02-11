"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { VideoHero } from "@/components/hero/video-hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ArrowUpRight, Sparkles, Zap, Target, TrendingUp, Store, Book, Palette } from "lucide-react";
import { SplitTextReveal } from "@/components/motion/split-text-reveal";
import { MediaReveal } from "@/components/motion/media-reveal";
import { SkewScroll } from "@/components/motion/skew-scroll";
import { Magnetic } from "@/components/motion/magnetic";
import { HorizontalSlider } from "@/components/sections/horizontal-slider";
import { ExecutionCasesSection } from "@/components/sections/execution-cases-section";
import { DeliverablesSection } from "@/components/sections/deliverables-section";
import { Accordion } from "@/components/ui/accordion";
import { PerformanceCard } from "@/components/sections/performance-card";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

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
    <div className="relative overflow-x-hidden md:overflow-visible">
      {/* [0] Video Hero - brand palette */}
      <VideoHero
        line1="런칭을 기획서가 아닌"
        line2="매출과 데이터로 증명합니다"
        highlightText="매출과 데이터"
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

      {/* [1] "Why GrowingUp" - Broken Grid & Massive Typography */}
      <Section
        data-palette="light"
        data-theme="light"
        data-section="why-growingup"
        className="py-32 lg:py-48"
        bleed={true}
        withContainer={false}
      >
        <Container variant="fluid" className="px-6 lg:px-24">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-32 items-start mb-24 lg:mb-32">
            <div className="lg:w-1/3 sticky top-32">
              <SplitTextReveal
                text="왜 GrowingUp인가"
                as="h2"
                align="left"
                className="text-6xl lg:text-8xl font-black leading-[0.9] tracking-tighter mb-8 text-black"
              />
              <p className="text-xl text-black/60 leading-relaxed max-w-sm">
                데이터 기반의 정확한 진단과 실행력으로 비즈니스의 본질적인 성장을 만들어갑니다.
              </p>
            </div>

            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {/* Broken Grid: Staggered Cards */}
              <div className="space-y-8 lg:space-y-12 lg:mt-24">
                <Card className="border border-black/5 bg-white shadow-sm rounded-3xl p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group min-h-[320px] flex flex-col justify-between">
                  <CardHeader className="p-0">
                    <div className="text-4xl lg:text-5xl font-bold mb-4 text-[var(--brand-primary)]">01</div>
                    <CardTitle className="text-2xl font-bold">데이터 기반 전략</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 mt-4">
                    <p className="text-lg text-black/60 group-hover:text-black transition-colors">추측이 아닌 데이터로 의사결정합니다. 정확한 분석을 통해 최적의 솔루션을 제시합니다.</p>
                  </CardContent>
                </Card>

                <Card className="border border-black/5 bg-white shadow-sm rounded-3xl p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group min-h-[320px] flex flex-col justify-between">
                  <CardHeader className="p-0">
                    <div className="text-4xl lg:text-5xl font-bold mb-4 text-[var(--brand-primary)]">02</div>
                    <CardTitle className="text-2xl font-bold">크리에이티브 실행력</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 mt-4">
                    <p className="text-lg text-black/60 group-hover:text-black transition-colors">아이디어를 현실로 만드는 실행력. 빠르고 정확한 구현으로 시장을 선도합니다.</p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-8 lg:space-y-12">
                <Card className="border border-black/5 bg-white shadow-sm rounded-3xl p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group min-h-[320px] flex flex-col justify-between">
                  <CardHeader className="p-0">
                    <div className="text-4xl lg:text-5xl font-bold mb-4 text-[var(--brand-primary)]">03</div>
                    <CardTitle className="text-2xl font-bold">지속적인 최적화</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 mt-4">
                    <p className="text-lg text-black/60 group-hover:text-black transition-colors">한 번의 성공으로 끝나지 않습니다. 지속적인 모니터링과 개선으로 성장을 이어갑니다.</p>
                  </CardContent>
                </Card>
                {/* Abstract Decorative Element */}
                <div className="hidden md:block h-[320px] rounded-3xl bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/10 flex items-center justify-center overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-primary)]/10 to-transparent mix-blend-multiply opacity-50 group-hover:opacity-100 transition-opacity" />
                  <TrendingUp className="w-32 h-32 text-[var(--brand-primary)] opacity-20 group-hover:scale-110 transition-transform duration-700" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* [2] 실행 결과 - Horizontal Staggered Layout */}
      <Section
        data-palette="dark"
        data-theme="dark"
        variant="ink"
        className="py-32 lg:py-40 relative overflow-hidden"
        withContainer={false}
      >
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[var(--brand-primary)]/20 via-transparent to-transparent opacity-50 blur-3xl pointer-events-none" />

        <Container variant="fluid" className="px-6 lg:px-24">
          <div className="grid lg:grid-cols-12 gap-12 items-end mb-20">
            <div className="lg:col-span-5">
              <div className="text-sm font-bold text-[var(--brand-primary)] mb-4 uppercase tracking-widest border-l-2 border-[var(--brand-primary)] pl-4">Proven Results</div>
              <h2 className="text-5xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter">
                NUMBERS<br /><span className="text-[var(--brand-primary)]">NEVER LIE</span>
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-xl text-white/70 max-w-2xl leading-relaxed">
                우리의 퍼포먼스는 단순한 수치가 아닌, 비즈니스 성장의 증거입니다.
              </p>
            </div>
          </div>
        </Container>

        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 px-6 lg:px-24 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide">
          {[
            { icon: TrendingUp, title: "Great 포터블 스크린", num: "3,500", suffix: "대 완판", desc: "4주 집중 캠페인", tag: "ROAS 320%" },
            { icon: Store, title: "글라소 프랜차이즈", num: "20", suffix: "개 점포", desc: "SEO + 콘텐츠 마케팅", tag: "리드 월 50건" },
            { icon: Book, title: "와디즈 GPT 전자책", num: "4.0", suffix: "억 펀딩", desc: "한국 최초 사례", tag: "펀딩률 4,000%" }
          ].map((item, idx) => (
            <div key={idx} className="min-w-[300px] md:min-w-[400px] snap-center">
              <PerformanceCard
                icon={item.icon}
                title={item.title}
                number={parseInt(item.num.replace(/,/g, ''))} // A bit hacky, but consistent with component
                numberSuffix={item.suffix}
                description={item.desc}
                metrics={[item.tag]}
                color={idx === 0 ? "primary" : idx === 1 ? "secondary" : "hot1"}
                delay={idx * 100}
                mode="dark"
              />
            </div>
          ))}
        </div>
      </Section>

      {/* [3] Execution Cases - Keep existing component but check its style later */}
      <ExecutionCasesSection />

      {/* [4] Process - Dark Mode with Large Typography */}
      <Section
        data-palette="dark"
        data-theme="dark"
        variant="ink"
        className="py-32"
        withContainer={false}
      >
        <Container>
          <div className="text-center mb-24">
            <h2 className="text-4xl lg:text-6xl font-black text-white mb-6 tracking-tight">
              GrowingUp <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)]">Marketing OS</span>
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              5단계 운영 루프로 런칭의 불확실성을 체계적으로 관리하며,<br className="hidden md:block" />
              각 단계마다 명확한 산출물과 의사결정 기준을 제공합니다.
            </p>
          </div>
          <HorizontalSlider items={processSteps} dark={true} intervalMs={3000} />

          <div className="mt-20 text-center">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-white text-black hover:bg-white/90 px-12 h-16 text-lg font-bold transition-all hover:scale-105"
            >
              <Link href="/apply">외주 파트너 등록</Link>
            </Button>
          </div>
        </Container>
      </Section>

      <DeliverablesSection />

      {/* [5] Ongoing Projects - Masonry-ish List */}
      <Section
        data-palette="light"
        data-theme="light"
        className="py-32 lg:py-48 bg-white"
        withContainer={false}
      >
        <Container variant="fluid" className="px-6 lg:px-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-black/10 pb-8">
            <div>
              <h2 className="text-5xl lg:text-7xl font-black tracking-tighter mb-4">ONGOING<br />PROJECTS</h2>
              <p className="text-xl text-black/60">현재 진행 중인 다양한 프로젝트</p>
            </div>
            <Button asChild variant="outline" className="rounded-full px-8 h-12 border-black/20 hover:bg-black hover:text-white transition-colors">
              <Link href="/projects">VIEW ALL PROJECTS <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>

          <SkewScroll skewIntensity={0.5}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {ongoingProjects.map((project, i) => (
                <Link key={project.id} href={project.href} className={cn("group block", i % 2 !== 0 ? "md:mt-24" : "")}>
                  <div className="aspect-[4/3] bg-[#F2F2F2] mb-6 rounded-2xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                    <div className="absolute top-6 left-6 px-4 py-2 bg-white rounded-full text-xs font-bold uppercase tracking-wider">{project.category}</div>
                    {/* Placeholder for project image */}
                    <div className="w-full h-full flex items-center justify-center text-black/20 group-hover:scale-105 transition-transform duration-700">
                      <Palette className="w-16 h-16" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-[var(--brand-primary)] transition-colors">{project.title}</h3>
                  <p className="text-black/60 leading-relaxed">{project.description}</p>
                </Link>
              ))}
            </div>
          </SkewScroll>
        </Container>
      </Section>

      {/* [6] Portfolio - Parallax/Big Cards */}
      <Section
        data-palette="light"
        data-theme="light"
        variant="tinted"
        className="py-32"
        withContainer={false}
      >
        <Container>
          <div className="mb-20">
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-6">SELECTED<br />WORKS</h2>
          </div>

          <div className="flex flex-col gap-32">
            {portfolioCases.map((caseItem, index) => (
              <div key={index} className="group grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
                <div className={cn("relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl", index % 2 !== 0 ? "md:order-2" : "")}>
                  <Image
                    src={caseItem.image}
                    alt={caseItem.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <div className={cn("space-y-8", index % 2 !== 0 ? "md:order-1 text-right" : "")}>
                  <div className="inline-block px-4 py-2 rounded-full border border-black/10 text-sm font-bold uppercase tracking-wider">
                    {caseItem.category}
                  </div>
                  <h3 className="text-4xl lg:text-5xl font-bold leading-tight decoration-2 group-hover:underline decoration-[var(--brand-primary)] underline-offset-8 transition-all">
                    {caseItem.title}
                  </h3>
                  <p className="text-xl text-black/60 leading-relaxed">{caseItem.summary}</p>

                  <div className={cn("flex flex-col", index % 2 !== 0 ? "items-end" : "items-start")}>
                    <div className="text-sm text-black/40 font-bold uppercase tracking-widest mb-1">Result</div>
                    <div className="text-3xl lg:text-4xl font-black text-[var(--brand-primary)]">{caseItem.result}</div>
                  </div>

                  <Button asChild variant="link" className="p-0 text-lg font-bold hover:text-[var(--brand-primary)]">
                    <Link href={caseItem.href}>View Case Study <ArrowUpRight className="ml-2 w-5 h-5" /></Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ & CTA */}
      <Section className="py-32 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-4xl font-black mb-8">FAQ</h2>
              <Accordion items={faqItems} />
            </div>
            <div className="bg-black text-white rounded-3xl p-12 flex flex-col justify-between min-h-[400px]">
              <div>
                <h2 className="text-4xl lg:text-5xl font-black mb-6 leading-[0.9]">READY TO<br />GROW UP?</h2>
                <p className="text-white/70 text-lg">프로젝트 참여 신청 또는 마케팅 제안 요청을 통해 성장의 첫 걸음을 내딛어보세요.</p>
              </div>
              <div className="flex flex-col gap-4 mt-12">
                <Magnetic strength={0.2}>
                  <Button asChild size="lg" className="h-16 text-lg font-bold bg-white text-black hover:bg-white/90 rounded-full w-full">
                    <Link href="/apply">Start a Project</Link>
                  </Button>
                </Magnetic>
                <Magnetic strength={0.2}>
                  <Button asChild size="lg" variant="outline" className="h-16 text-lg font-bold border-white/20 text-white hover:bg-white/10 rounded-full w-full">
                    <Link href="/proposal">Request Proposal</Link>
                  </Button>
                </Magnetic>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
