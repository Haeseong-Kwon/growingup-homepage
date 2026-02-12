"use client";

import { useState, useMemo } from "react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { MediaReveal } from "@/components/motion/media-reveal";
import { VideoHero } from "@/components/hero/video-hero";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SplitTextReveal } from "@/components/motion/split-text-reveal"; // Added
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
      {/* Hero - Video with Text */}
      <VideoHero
        line1="INSIGHTS"
        line2="& UPDATES"
        subtitle="마케팅 업계 주요 이슈와 우리의 실행 과정을 공유합니다."
      />

      {/* Main Content Area */}
      <Section
        data-palette="light"
        data-theme="light"
        data-section="insights-content"
        variant="default"
        divider="top"
        minHeight="auto"
        className="py-16 md:py-24"
      >
        <Container>
          {/* Removed duplicate header, moved subtitle to hero */}

          <div className="w-full">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="flex justify-center mb-8">
                <TabsList variant="line" className="w-full max-w-md">
                  <TabsTrigger value="업데이트" className="flex-1">
                    업데이트
                  </TabsTrigger>
                  <TabsTrigger value="트렌드" className="flex-1">
                    트렌드
                  </TabsTrigger>
                </TabsList>
              </div>

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

