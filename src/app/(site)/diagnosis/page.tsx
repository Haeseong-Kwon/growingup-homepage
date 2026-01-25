"use client";

import { useState } from "react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function DiagnosisPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });

  return (
    <>
      {/* Hero */}
      <Section className="pt-24 md:pt-32 lg:pt-40 border-b">
        <Container>
          <h1 className="text-balance mb-6">진단 요청</h1>
          <p className="section-subtitle">
            비즈니스의 현재 상태를 진단하고 성장 방향을 제시합니다.
          </p>
        </Container>
      </Section>

      {/* Form */}
      <Section>
        <Container>
          <div className="max-w-2xl mx-auto">
            <form className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    이름 *
                  </label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="홍길동"
                    className="h-12 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    이메일 *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="example@email.com"
                    className="h-12 rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium">
                  회사명 *
                </label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="회사명을 입력하세요"
                  className="h-12 rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="service" className="text-sm font-medium">
                  관심 서비스 *
                </label>
                <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                  <SelectTrigger className="h-12 rounded-lg">
                    <SelectValue placeholder="서비스를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="strategy">전략 컨설팅</SelectItem>
                    <SelectItem value="branding">브랜드 개발</SelectItem>
                    <SelectItem value="digital">디지털 경험</SelectItem>
                    <SelectItem value="data">데이터 분석</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  상세 내용 *
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="진단 요청 내용을 자세히 입력해주세요"
                  rows={6}
                  className="rounded-lg"
                />
              </div>

              <Button
                className="w-full h-12 rounded-lg bg-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/90 text-base"
                size="lg"
                type="button"
              >
                진단 요청 제출
              </Button>
            </form>
          </div>
        </Container>
      </Section>
    </>
  );
}
