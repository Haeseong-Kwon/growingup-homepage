"use client";

import { useState } from "react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  return (
    <>
      {/* Hero */}
      <Section className="pt-24 md:pt-32 lg:pt-40 border-b">
        <Container>
          <h1 className="text-balance mb-6">문의하기</h1>
          <p className="section-subtitle">
            궁금하신 점이 있으시면 언제든지 연락주세요.
          </p>
        </Container>
      </Section>

      {/* Contact Info & Form */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Contact Info */}
            <div className="space-y-10">
              <div>
                <h3 className="text-xl md:text-2xl font-medium tracking-tight mb-5">
                  연락처
                </h3>
                <div className="space-y-3 text-[var(--brand-fg)]/60 leading-relaxed">
                  <p>이메일: contact@growingup.com</p>
                  <p>전화: 02-1234-5678</p>
                  <p>주소: 서울특별시 강남구</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-medium tracking-tight mb-5">
                  운영 시간
                </h3>
                <div className="space-y-2 text-[var(--brand-fg)]/60 leading-relaxed">
                  <p>평일: 09:00 - 18:00</p>
                  <p>주말 및 공휴일: 휴무</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    이름 *
                  </label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="이름을 입력하세요"
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

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    제목 *
                  </label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="문의 제목"
                    className="h-12 rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    내용 *
                  </label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="문의 내용을 입력하세요"
                    rows={6}
                    className="rounded-lg"
                  />
                </div>

                <Button
                  className="w-full h-12 rounded-lg bg-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/90"
                  size="lg"
                  type="button"
                >
                  문의 보내기
                </Button>
              </form>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
