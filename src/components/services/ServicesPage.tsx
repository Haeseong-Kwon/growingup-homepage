"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { MediaReveal } from "@/components/motion/media-reveal";
import { VideoHero } from "@/components/hero/video-hero";
import { SplitTextReveal } from "@/components/motion/split-text-reveal";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { servicesData } from "./servicesData";

export function ServicesPage() {
  const [activeService, setActiveService] = useState<string | null>(null);

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero */}
      <VideoHero
        line1="목표에 맞는"
        line2="런칭 파트너십"
        subtitle="빠른 검증이 필요한지, 체계적인 시스템 구축이 필요한지에 따라 최적의 협업 방식을 선택하세요."
        primaryCta={{
          label: "진단 요청",
          href: "/diagnosis",
        }}
      />

      {/* Services List - Cheil Style Big Menu */}
      <Section
        data-palette="light"
        data-theme="light"
        data-section="services-list"
        variant="default"
        divider="top"
        minHeight="auto"
        className="py-16 md:py-24"
      >
        <Container>
          <div className="mb-20 md:mb-32">
            <SplitTextReveal
              text="Our Services"
              as="h2"
              className="text-6xl md:text-8xl font-black tracking-tighter mb-8 text-[var(--brand-fg)]"
            />
            <p className="text-xl md:text-2xl text-[var(--brand-fg)]/60 max-w-2xl leading-relaxed">
              비즈니스 단계와 목표에 최적화된 두 가지 핵심 솔루션을 제안합니다.
            </p>
          </div>

          <div className="flex flex-col border-t border-[var(--brand-fg)]">
            {servicesData.map((service, index) => (
              <div
                key={service.id}
                className="group border-b border-[var(--brand-fg)] py-12 md:py-20 transition-all duration-500 ease-out"
                onMouseEnter={() => setActiveService(service.id)}
              >
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 transition-all duration-500">
                  {/* Left: Title & Tag */}
                  <div className="lg:w-1/3">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-sm font-bold uppercase tracking-widest text-[var(--brand-primary)]">
                        0{index + 1}
                      </span>
                      <span className="px-3 py-1 rounded-full border border-[var(--brand-fg)]/20 text-xs font-bold text-[var(--brand-fg)]/60">
                        {service.id === "sprint" ? "Short-term" : "Long-term"}
                      </span>
                    </div>
                    <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-[var(--brand-fg)] group-hover:text-[var(--brand-primary)] transition-colors duration-300 mb-6">
                      {service.title}
                    </h3>
                    <p className="text-lg text-[var(--brand-fg)]/60 leading-relaxed max-w-sm mb-8">
                      {service.description}
                    </p>

                    <Button
                      asChild
                      variant="outline"
                      className="rounded-full h-12 px-8 border-[var(--brand-fg)]/20 hover:bg-[var(--brand-fg)] hover:text-white transition-all group-hover:pl-10"
                    >
                      <Link href={`/diagnosis?service=${service.id}`}>
                        Start {service.title} <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </div>

                  {/* Right: Details (Visible on hover/always visible but styled) */}
                  <div className="lg:w-2/3 grid md:grid-cols-2 gap-8 lg:gap-12 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                    <div>
                      <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-[var(--brand-primary)]" />
                        Includes
                      </h4>
                      <ul className="space-y-3">
                        {service.includes.map((item, i) => (
                          <li key={i} className="text-[var(--brand-fg)]/70 text-base border-b border-[var(--brand-fg)]/10 pb-2">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-8">
                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-wide text-[var(--brand-fg)]/50 mb-3">Suitable For</h4>
                        <p className="text-lg font-medium text-[var(--brand-fg)] leading-relaxed">
                          {service.suitableFor}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-wide text-[var(--brand-fg)]/50 mb-3">Success Criteria</h4>
                        <p className="text-lg font-medium text-[var(--brand-fg)] leading-relaxed">
                          {service.successCriteria}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section
        data-palette="dark"
        data-theme="dark"
        data-section="services-cta"
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
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight mb-8 text-balance text-white">
                어떤 서비스가 맞는지<br />모르겠다면?
              </h2>
              <p className="text-lg md:text-xl text-white/70 mb-12 leading-relaxed">
                3분 진단으로 현재 상태를 파악하고 맞춤 추천을 받으세요.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-white text-[var(--brand-primary)] hover:bg-white/90 rounded-full h-14 px-10 text-lg font-bold transition-transform hover:scale-105"
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
