"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { MediaReveal } from "@/components/motion/media-reveal";
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
      <Section
        data-palette="light"
        data-theme="light"
        data-section="cases-hero"
        variant="default"
        divider="none"
        minHeight="auto"
        className="pt-24 md:pt-32"
      >
        <Container>
          <MediaReveal intensity="subtle">
            <div className="max-w-4xl">
              <div className="text-sm md:text-base font-medium text-[var(--brand-primary)] mb-2 uppercase tracking-wide">
                실행 사례
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-balance">
                결과로 증명한 런칭 사례
              </h1>
              <p className="text-lg md:text-xl text-[var(--brand-fg)]/70 leading-relaxed max-w-3xl">
                기획서가 아닌 실제 출시 결과로 검증된 케이스를 확인하세요. 문제 정의부터 성과 측정까지 전 과정을 공개합니다.
              </p>
            </div>
          </MediaReveal>
        </Container>
      </Section>

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
          {/* Filter Bar */}
          <MediaReveal intensity="subtle">
            <div className="mb-10 lg:mb-12">
              <div className="flex items-center gap-4 overflow-x-auto pb-2 filter-bar-scroll">
                <span className="text-sm font-medium text-[var(--brand-fg)] whitespace-nowrap flex-shrink-0">
                  필터:
                </span>
                <div className="flex gap-2 min-w-0">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 ease-out motion-reduce:transition-none flex-shrink-0",
                        activeCategory === category
                          ? "bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-primary)]/90"
                          : "bg-[var(--brand-muted-light)] text-[var(--brand-fg)]/70 hover:bg-[var(--brand-primary)]/10 hover:text-[var(--brand-primary)]"
                      )}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </MediaReveal>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredCases.map((caseItem, index) => (
              <MediaReveal key={caseItem.slug} delay={index * 100} intensity="medium">
                <CaseCard caseItem={caseItem} />
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
        variant="default"
        divider="top"
        minHeight="auto"
        className="py-16 md:py-24"
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

