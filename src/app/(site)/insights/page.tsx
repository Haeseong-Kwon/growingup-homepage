"use client";

import { useState } from "react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { ArchiveGrid, ArchiveItem } from "@/components/ui/archive-grid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

// 더미 데이터
const dummyInsights: ArchiveItem[] = [
  {
    id: "1",
    title: "2026 디지털 트렌드 리포트",
    excerpt: "새해를 맞이하여 주목해야 할 디지털 트렌드를 정리했습니다.",
    category: "트렌드",
    date: "2026.01.15",
    href: "/insights/insight-1",
  },
  {
    id: "2",
    title: "데이터 기반 의사결정의 중요성",
    excerpt: "비즈니스 성장을 위한 데이터 활용 전략을 소개합니다.",
    category: "전략",
    date: "2026.01.10",
    href: "/insights/insight-2",
  },
  {
    id: "3",
    title: "브랜드 경험의 미래",
    excerpt: "고객 경험 중심의 브랜드 전략에 대해 다룹니다.",
    category: "브랜딩",
    date: "2026.01.05",
    href: "/insights/insight-3",
  },
];

export default function InsightsPage() {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);

  return (
    <>
      {/* Hero */}
      <Section className="pt-24 md:pt-32 lg:pt-40 border-b">
        <Container>
          <h1 className="text-balance mb-6">인사이트</h1>
          <p className="section-subtitle">
            비즈니스 성장에 필요한 인사이트와 트렌드를 공유합니다.
          </p>
        </Container>
      </Section>

      {/* Newsletter Subscription */}
      <Section className="border-b bg-gradient-to-br from-[var(--brand-bg)] to-[var(--brand-muted-light)]">
        <Container>
          <div className="max-w-2xl mx-auto border rounded-2xl p-8 md:p-10 bg-white/50 backdrop-blur-sm">
            <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-3">
              인사이트 구독하기
            </h3>
            <p className="text-[var(--brand-fg)]/60 mb-8 leading-relaxed">
              최신 인사이트를 이메일로 받아보세요.
            </p>
            <div className="space-y-5">
              <Input
                type="email"
                placeholder="이메일 주소"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-lg"
              />
              <div className="flex items-start gap-3">
                <Checkbox
                  id="terms"
                  checked={agreed}
                  onCheckedChange={(checked) => setAgreed(checked as boolean)}
                  className="mt-0.5"
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-[var(--brand-fg)]/60 cursor-pointer leading-relaxed"
                >
                  개인정보 수집 및 이용에 동의합니다.
                </label>
              </div>
              <Button
                className="w-full h-12 rounded-lg bg-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/90"
                disabled={!email || !agreed}
              >
                구독하기
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Insights Grid */}
      <Section>
        <Container>
          <ArchiveGrid items={dummyInsights} />
        </Container>
      </Section>
    </>
  );
}
