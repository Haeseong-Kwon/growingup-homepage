"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { MediaReveal } from "@/components/motion/media-reveal";
import { VideoHero } from "@/components/hero/video-hero";
import { PortfolioFilterBar } from "@/components/portfolio/PortfolioFilterBar";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";
import { PortfolioDetailModal } from "@/components/portfolio/PortfolioDetailModal";
import { Button } from "@/components/ui/button";
import { portfolioData, PortfolioItem } from "@/data/portfolio";

export default function PortfolioPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("전체");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedIndustry, setSelectedIndustry] = useState("전체");
  const [selectedSort, setSelectedSort] = useState("newest");
  const [selectedPortfolio, setSelectedPortfolio] = useState<PortfolioItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 필터링 및 정렬 로직
  const filteredPortfolios = useMemo(() => {
    let filtered = [...portfolioData];

    // 검색 필터
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.client.toLowerCase().includes(query) ||
          item.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          item.summary.toLowerCase().includes(query)
      );
    }

    // 연도 필터
    if (selectedYear !== "전체") {
      filtered = filtered.filter((item) => item.year === parseInt(selectedYear));
    }

    // 카테고리 필터
    if (selectedCategory !== "전체") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    // 산업 필터
    if (selectedIndustry !== "전체") {
      filtered = filtered.filter((item) => item.industry === selectedIndustry);
    }

    // 정렬
    filtered.sort((a, b) => {
      switch (selectedSort) {
        case "newest":
          return b.year - a.year || b.id.localeCompare(a.id);
        case "oldest":
          return a.year - b.year || a.id.localeCompare(b.id);
        case "client-az":
          return a.client.localeCompare(b.client);
        case "client-za":
          return b.client.localeCompare(a.client);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedYear, selectedCategory, selectedIndustry, selectedSort]);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedYear("전체");
    setSelectedCategory("전체");
    setSelectedIndustry("전체");
    setSelectedSort("newest");
  };

  const handleCardClick = (portfolioItem: PortfolioItem) => {
    setSelectedPortfolio(portfolioItem);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full overflow-x-clip">
      {/* Hero */}
      <VideoHero
        line1="우리가 만든 결과물"
        line2=""
        subtitle="아이디어가 실행으로 이어진 순간들. 업종/목표에 따라 필터링해 빠르게 레퍼런스를 찾으세요."
        primaryCta={{
          label: "진단 요청",
          href: "/diagnosis",
        }}
      />

      {/* Filter Bar */}
      <PortfolioFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedIndustry={selectedIndustry}
        onIndustryChange={setSelectedIndustry}
        selectedSort={selectedSort}
        onSortChange={setSelectedSort}
        onReset={handleReset}
      />

      {/* Portfolio Grid */}
      <Section
        data-palette="light"
        data-theme="light"
        data-section="portfolio-grid"
        variant="default"
        divider="top"
        minHeight="auto"
        className="py-16 md:py-24"
      >
        <Container>
          {filteredPortfolios.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredPortfolios.map((portfolioItem, index) => (
                <MediaReveal
                  key={portfolioItem.id}
                  delay={index * 100}
                  intensity="medium"
                >
                  <PortfolioCard
                    portfolioItem={portfolioItem}
                    onClick={() => handleCardClick(portfolioItem)}
                  />
                </MediaReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 md:py-24">
              <p className="text-lg text-muted-foreground mb-6">
                조건에 맞는 포트폴리오가 없습니다. 필터를 초기화해보세요.
              </p>
              <Button
                variant="outline"
                size="lg"
                onClick={handleReset}
                className="rounded-lg h-12 px-8 text-base font-bold bg-transparent text-white border-white/30 hover:bg-white/10 hover:text-white"
              >
                필터 초기화
              </Button>
            </div>
          )}
        </Container>
      </Section>

      {/* CTA */}
      <Section
        data-palette="dark"
        data-theme="dark"
        data-section="portfolio-cta"
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

      {/* Detail Modal */}
      <PortfolioDetailModal
        portfolioItem={selectedPortfolio}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
}

