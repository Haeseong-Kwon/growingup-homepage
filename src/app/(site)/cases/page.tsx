"use client";

import { useState } from "react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { ArchiveGrid, ArchiveItem } from "@/components/ui/archive-grid";
import { Badge } from "@/components/ui/badge";

// 더미 데이터
const dummyCases: ArchiveItem[] = [
  {
    id: "1",
    title: "디지털 전환 프로젝트 A",
    excerpt: "레거시 시스템을 현대적인 플랫폼으로 전환한 사례입니다.",
    category: "디지털 전환",
    date: "2026.01",
    href: "/cases/case-a",
  },
  {
    id: "2",
    title: "브랜드 리뉴얼 프로젝트 B",
    excerpt: "브랜드 아이덴티티 전면 개편을 통한 시장 재진입 사례입니다.",
    category: "브랜딩",
    date: "2025.12",
    href: "/cases/case-b",
  },
  {
    id: "3",
    title: "고객 경험 개선 프로젝트 C",
    excerpt: "사용자 리서치 기반 UX 혁신 사례입니다.",
    category: "UX/UI",
    date: "2025.11",
    href: "/cases/case-c",
  },
];

const categories = ["전체", "디지털 전환", "브랜딩", "UX/UI", "전략"];

export default function CasesPage() {
  const [selectedCategory, setSelectedCategory] = useState("전체");

  return (
    <>
      {/* Hero */}
      <Section className="pt-24 md:pt-32 lg:pt-40 border-b">
        <Container>
          <h1 className="text-balance mb-6">사례</h1>
          <p className="section-subtitle">
            다양한 산업 분야의 성공 사례를 확인하세요.
          </p>
        </Container>
      </Section>

      {/* Filter & Grid */}
      <Section>
        <Container>
          <div className="flex flex-wrap gap-2 mb-10 lg:mb-12">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`cursor-pointer rounded-full px-4 py-2 text-sm transition-all ${
                  selectedCategory === category
                    ? "bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-primary)]/90"
                    : "border hover:bg-[var(--brand-primary)]/10 hover:border-[var(--brand-primary)]"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>

          <ArchiveGrid items={dummyCases} />
        </Container>
      </Section>
    </>
  );
}
