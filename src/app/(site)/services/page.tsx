import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ServicesPage() {
  const services = [
    {
      title: "비즈니스 진단",
      description: "현재 비즈니스의 상태를 정확히 진단하고 개선점을 도출합니다.",
      features: ["시장 분석", "경쟁사 분석", "내부 역량 평가"],
    },
    {
      title: "전략 수립",
      description: "데이터 기반의 실행 가능한 전략을 수립합니다.",
      features: ["목표 설정", "로드맵 구축", "KPI 정의"],
    },
    {
      title: "실행 지원",
      description: "전략의 성공적인 실행을 위한 전 과정을 지원합니다.",
      features: ["프로젝트 관리", "리소스 배분", "성과 측정"],
    },
  ];

  return (
    <>
      {/* Hero */}
      <Section className="pt-24 md:pt-32 lg:pt-40 border-b">
        <Container>
          <h1 className="text-balance mb-6">서비스</h1>
          <p className="section-subtitle">
            체계적인 프로세스로 비즈니스의 성공을 지원합니다.
          </p>
        </Container>
      </Section>

      {/* Services Grid */}
      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => (
              <Card
                key={index}
                className="border hover:border-[var(--brand-primary)]/30 transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader className="p-6 md:p-8">
                  <CardTitle className="text-xl md:text-2xl font-medium tracking-tight">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 md:px-8 pb-6 md:pb-8 space-y-6">
                  <p className="text-[var(--brand-fg)]/60 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2.5">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-[var(--brand-fg)]/70 flex items-center gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-[var(--brand-primary)]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
