import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CaseDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <>
      {/* Hero */}
      <Section className="pt-24 md:pt-32 lg:pt-40 border-b">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm text-[var(--brand-fg)]/50 mb-4 uppercase tracking-wide">
              사례 상세
            </p>
            <h1 className="text-balance mb-6">프로젝트: {params.slug}</h1>
            <p className="section-subtitle mb-8">
              이 페이지는 개별 사례의 상세 내용을 보여주는 동적 라우트입니다.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                variant="outline"
                className="rounded-lg border-2"
              >
                <Link href="/cases">목록으로</Link>
              </Button>
              <Button
                asChild
                className="bg-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/90 rounded-lg"
              >
                <Link href="/diagnosis">진단 요청하기</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Content Placeholder */}
      <Section>
        <Container>
          <div className="max-w-3xl space-y-12">
            <div>
              <h2 className="section-title mb-6">프로젝트 개요</h2>
              <p className="text-[var(--brand-fg)]/60 leading-relaxed">
                실제 프로젝트 내용이 들어갈 영역입니다.
              </p>
            </div>

            <div>
              <h2 className="section-title mb-6">해결 과제</h2>
              <p className="text-[var(--brand-fg)]/60 leading-relaxed">
                클라이언트가 직면한 문제와 목표가 들어갈 영역입니다.
              </p>
            </div>

            <div>
              <h2 className="section-title mb-6">접근 방법</h2>
              <p className="text-[var(--brand-fg)]/60 leading-relaxed">
                프로젝트 진행 과정과 방법론이 들어갈 영역입니다.
              </p>
            </div>

            <div>
              <h2 className="section-title mb-6">성과</h2>
              <p className="text-[var(--brand-fg)]/60 leading-relaxed">
                프로젝트의 결과와 성과 지표가 들어갈 영역입니다.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
