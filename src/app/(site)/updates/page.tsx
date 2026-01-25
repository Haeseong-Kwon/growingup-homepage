import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const dummyUpdates = [
  {
    id: "1",
    title: "새로운 서비스 출시",
    date: "2026.01.20",
    excerpt: "고객 경험을 개선하는 새로운 서비스가 출시되었습니다.",
  },
  {
    id: "2",
    title: "팀 확장 소식",
    date: "2026.01.15",
    excerpt: "더 나은 서비스를 위해 팀을 확장했습니다.",
  },
  {
    id: "3",
    title: "파트너십 체결",
    date: "2026.01.10",
    excerpt: "글로벌 파트너사와 협력 관계를 맺었습니다.",
  },
];

export default function UpdatesPage() {
  return (
    <>
      {/* Hero */}
      <Section className="pt-24 md:pt-32 lg:pt-40 border-b">
        <Container>
          <h1 className="text-balance mb-6">업데이트</h1>
          <p className="section-subtitle">
            최신 소식과 업데이트를 확인하세요.
          </p>
        </Container>
      </Section>

      {/* Updates List */}
      <Section>
        <Container>
          <div className="max-w-3xl mx-auto space-y-6">
            {dummyUpdates.map((update) => (
              <Link key={update.id} href={`/updates/${update.id}`}>
                <Card className="border hover:border-[var(--brand-primary)]/30 transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="p-6 md:p-8">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <CardTitle className="text-xl md:text-2xl font-medium tracking-tight flex-1">
                        {update.title}
                      </CardTitle>
                      <span className="text-sm text-[var(--brand-fg)]/50 whitespace-nowrap">
                        {update.date}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="px-6 md:px-8 pb-6 md:pb-8">
                    <p className="text-[var(--brand-fg)]/60 leading-relaxed">
                      {update.excerpt}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
