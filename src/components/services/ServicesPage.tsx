"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { MediaReveal } from "@/components/motion/media-reveal";
import { VideoHero } from "@/components/hero/video-hero";
import { ServiceCard } from "./ServiceCard";
import { servicesData } from "./servicesData";

export function ServicesPage() {
  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero */}
      <VideoHero
        title="목표에 맞는 런칭 파트너십"
        subtitle="빠른 검증이 필요한지, 체계적인 시스템 구축이 필요한지에 따라 최적의 협업 방식을 선택하세요."
        primaryCta={{
          label: "진단 요청",
          href: "/diagnosis",
        }}
      />

      {/* Services Grid */}
      <Section
        data-palette="light"
        data-theme="light"
        data-section="services-grid"
        variant="default"
        divider="top"
        minHeight="auto"
        className="py-16 md:py-24"
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <MediaReveal intensity="medium">
              <div id="sprint" className="scroll-mt-[calc(var(--header-h)+48px)]">
                <ServiceCard service={servicesData[0]} />
              </div>
            </MediaReveal>
            <MediaReveal intensity="medium" delay={100}>
              <div id="partner" className="scroll-mt-[calc(var(--header-h)+48px)]">
                <ServiceCard service={servicesData[1]} />
              </div>
            </MediaReveal>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section
        data-palette="dark"
        data-theme="dark"
        data-section="services-cta"
        theme="dark"
        variant="default"
        divider="top"
        bleed={true}
        minHeight="auto"
        className="py-16 md:py-24"
      >
        <Container>
          <MediaReveal intensity="subtle">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-6 text-balance text-white">
                어떤 서비스가 맞는지 모르겠다면?
              </h2>
              <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed">
                3분 진단으로 현재 상태를 파악하고 맞춤 추천을 받으세요.
              </p>
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

