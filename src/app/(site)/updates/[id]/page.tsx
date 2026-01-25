import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UpdateDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <>
      {/* Hero */}
      <Section className="pt-24 md:pt-32">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm text-muted-foreground mb-4">업데이트 상세</p>
            <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-6">
              업데이트 #{params.id}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              이 페이지는 개별 업데이트의 상세 내용을 보여주는 동적 라우트입니다.
            </p>
            <Button asChild variant="outline">
              <Link href="/updates">목록으로</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* Content Placeholder */}
      <Section>
        <Container>
          <div className="max-w-3xl prose prose-neutral">
            <h2>업데이트 내용</h2>
            <p>실제 업데이트 내용이 들어갈 영역입니다.</p>
            <p>
              이곳에는 마크다운이나 리치 텍스트 에디터로 작성된 콘텐츠가 표시됩니다.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}

