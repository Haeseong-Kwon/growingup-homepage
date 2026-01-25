import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { KpiBadge } from "@/components/ui/kpi-badge";

export default function CapabilitiesPage() {
  const capabilities = [
    {
      title: "전략 컨설팅",
      description: "비즈니스 목표 달성을 위한 체계적인 전략을 수립합니다.",
    },
    {
      title: "브랜드 개발",
      description: "차별화된 브랜드 아이덴티티를 구축합니다.",
    },
    {
      title: "디지털 경험",
      description: "사용자 중심의 디지털 경험을 설계합니다.",
    },
    {
      title: "데이터 분석",
      description: "데이터 기반의 인사이트를 도출합니다.",
    },
  ];

  return (
    <>
      {/* Hero */}
      <Section className="pt-24 md:pt-32 lg:pt-40 border-b">
        <Container>
          <h1 className="text-balance mb-6">역량</h1>
          <p className="section-subtitle">
            다년간의 경험과 전문성으로 최상의 솔루션을 제공합니다.
          </p>
        </Container>
      </Section>

      {/* Capabilities Grid */}
      <Section>
        <Container>
          <div className="grid gap-12 md:gap-16 md:grid-cols-2">
            {capabilities.map((capability, index) => (
              <div key={index} className="space-y-4 group">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight group-hover:text-[var(--brand-primary)] transition-colors">
                  {capability.title}
                </h3>
                <p className="text-[var(--brand-fg)]/60 leading-relaxed text-base md:text-lg">
                  {capability.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Stats */}
      <Section className="border-t">
        <Container>
          <div className="flex flex-wrap gap-3 md:gap-4">
            <KpiBadge value="15+" label="전문 분야" variant="primary" />
            <KpiBadge value="100+" label="전문가" variant="secondary" />
            <KpiBadge value="20+" label="파트너십" variant="hot" />
          </div>
        </Container>
      </Section>
    </>
  );
}
