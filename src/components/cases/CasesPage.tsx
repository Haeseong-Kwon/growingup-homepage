"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { MediaReveal } from "@/components/motion/media-reveal";
import { VideoHero } from "@/components/hero/video-hero";
import { SplitTextReveal } from "@/components/motion/split-text-reveal";
import { CaseCard } from "./CaseCard";
import { casesData, categories, CaseItem } from "./casesData";
import { cn } from "@/lib/utils";

export function CasesPage() {
  const [activeCategory, setActiveCategory] = useState("전체");

  const filteredCases = useMemo(() => {
    if (activeCategory === "전체") {
      return casesData;
    }
    return casesData.filter((caseItem) => caseItem.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero */}
      <VideoHero
        line1="결과로 증명한 런칭 사례"
        line2=""
        subtitle="기획서가 아닌 실제 출시 결과로 검증된 케이스를 확인하세요. 문제 정의부터 성과 측정까지 전 과정을 공개합니다."
        primaryCta={{
          label: "진단 요청",
          href: "/diagnosis",
        }}
      />

      {/* Filter Bar & Cards Grid */}
      <Section
        data-palette="light"
        data-theme="light"
        data-section="cases-grid"
        variant="default"
        divider="top"
        minHeight="auto"
        className="py-16 md:py-24"
      >
        <Container>
          <div className="mb-12 md:mb-20">
            <SplitTextReveal
              text="Featured Works"
              as="h2"
              className="text-6xl md:text-8xl font-black tracking-tighter mb-8 text-[var(--brand-fg)]"
            />
            <p className="text-xl md:text-2xl text-[var(--brand-fg)]/60 max-w-2xl leading-relaxed">
              비즈니스 임팩트를 만들어낸 실제 성공 사례
            </p>
          </div>

          {/* Filter Bar */}
          <MediaReveal intensity="subtle">
            <div className="mb-12 lg:mb-16">
              <div className="flex items-center gap-4 overflow-x-auto pb-2 filter-bar-scroll">
                <span className="text-sm font-bold uppercase tracking-widest text-[var(--brand-fg)]/40 whitespace-nowrap flex-shrink-0">
                  Filter
                </span>
                <div className="flex gap-2 min-w-0">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant="ghost"
                      onClick={() => setActiveCategory(category)}
                      className={cn(
                        "rounded-full px-6 h-10 transition-all duration-300 font-bold border",
                        activeCategory === category
                          ? "bg-black text-white border-black"
                          : "bg-transparent text-[var(--brand-fg)]/60 border-transparent hover:border-[var(--brand-fg)]/20 hover:bg-[var(--brand-fg)]/5"
                      )}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </MediaReveal>

          {/* Cards Grid - Asymmetric Cheil Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 auto-rows-[minmax(400px,auto)]">
            {filteredCases.map((caseItem, index) => (
              <MediaReveal
                key={caseItem.slug}
                delay={index * 100}
                intensity="medium"
                className={cn(
                  "h-full",
                  // Asymmetric spans: 1st item is big (2 cols), 5th item is big
                  (index === 0 || index === 4) && "md:col-span-2"
                )}
              >
                <CaseCard caseItem={caseItem} className="h-full" />
              </MediaReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section
        data-palette="dark"
        data-theme="dark"
        data-section="cases-cta"
        theme="dark"
        variant="ink"
        divider="top"
        bleed={true}
        minHeight="auto"
        className="py-16 md:py-24 bg-[#050505]"
      >
        <Container>
          <MediaReveal intensity="subtle">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-6 text-balance text-white">
                다음 성공 사례가 되고 싶다면
              </h2>
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
    </div>
  );
}
