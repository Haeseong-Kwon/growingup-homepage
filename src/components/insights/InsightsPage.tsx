"use client";

import { useState, useMemo } from "react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { MediaReveal } from "@/components/motion/media-reveal";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LeadMagnetCard } from "./LeadMagnetCard";
import { SearchAndTags } from "./SearchAndTags";
import { UpdatesList } from "./UpdatesList";
import { updatesData, UpdateItem } from "./insightsData";

export function InsightsPage() {
  const [activeTab, setActiveTab] = useState("업데이트");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState("전체");

  // 필터링된 업데이트
  const filteredUpdates = useMemo(() => {
    let filtered: UpdateItem[] = [...updatesData];

    // 태그 필터
    if (activeTag !== "전체") {
      filtered = filtered.filter((update) =>
        update.badges.includes(activeTag)
      );
    }

    // 검색 필터
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (update) =>
          update.title.toLowerCase().includes(query) ||
          (update.excerpt && update.excerpt.toLowerCase().includes(query))
      );
    }

    // pinned 항목을 먼저 정렬
    return filtered.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return 0;
    });
  }, [searchQuery, activeTag]);

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero */}
      <Section
        data-palette="light"
        data-theme="light"
        data-section="insights-hero"
        variant="default"
        divider="none"
        minHeight="auto"
        className="pt-24 md:pt-32"
      >
        <Container>
          <MediaReveal intensity="subtle">
            <div className="max-w-4xl mx-auto">
              <div className="text-sm md:text-base font-medium text-[var(--brand-primary)] mb-2 uppercase tracking-wide">
                인사이트
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 text-balance">
                트렌드와 실행 기록
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
                마케팅 업계 주요 이슈와 우리의 실행 과정을 공유합니다.
                <br className="hidden sm:block" />
                정보 수집과 학습, 그리고 투명한 공유.
              </p>
            </div>
          </MediaReveal>
        </Container>
      </Section>

      {/* Tabs */}
      <Section
        data-palette="light"
        data-theme="light"
        data-section="insights-tabs"
        variant="default"
        divider="top"
        minHeight="auto"
        className="py-10 sm:py-12"
      >
        <Container>
          <div className="w-full">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full max-w-md mx-auto"
            >
              <TabsList variant="line" className="w-full">
                <TabsTrigger value="업데이트" className="flex-1">
                  업데이트
                </TabsTrigger>
                <TabsTrigger value="트렌드" className="flex-1">
                  트렌드
                </TabsTrigger>
              </TabsList>

              {/* 업데이트 탭 */}
              <TabsContent value="업데이트" className="mt-12 space-y-10 sm:space-y-12">
                {/* 리드마그넷 카드 */}
                <MediaReveal intensity="subtle">
                  <LeadMagnetCard />
                </MediaReveal>

                {/* 검색 + 태그 필터 */}
                <MediaReveal intensity="subtle">
                  <SearchAndTags
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    activeTag={activeTag}
                    onTagChange={setActiveTag}
                  />
                </MediaReveal>

                {/* 업데이트 리스트 */}
                <MediaReveal intensity="medium">
                  <UpdatesList updates={filteredUpdates} />
                </MediaReveal>
              </TabsContent>

              {/* 트렌드 탭 */}
              <TabsContent value="트렌드" className="mt-12">
                <MediaReveal intensity="subtle">
                  <div className="text-center py-16 md:py-24">
                    <p className="text-lg text-[var(--brand-fg)]/60">
                      준비 중입니다
                    </p>
                  </div>
                </MediaReveal>
              </TabsContent>
            </Tabs>
          </div>
        </Container>
      </Section>
    </div>
  );
}

