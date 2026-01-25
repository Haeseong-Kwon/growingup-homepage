import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";

export default function AdminPage() {
  return (
    <Section className="pt-24 md:pt-32">
      <Container>
        <div className="max-w-4xl">
          <h1 className="text-3xl md:text-5xl font-medium tracking-tight mb-6">
            관리자
          </h1>
          <p className="text-muted-foreground mb-8">
            관리자 대시보드는 추후 구현 예정입니다.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-6 border border-border rounded-lg">
              <h3 className="text-lg font-medium mb-2">콘텐츠 관리</h3>
              <p className="text-sm text-muted-foreground">
                사례, 인사이트 등 콘텐츠를 관리합니다.
              </p>
            </div>
            <div className="p-6 border border-border rounded-lg">
              <h3 className="text-lg font-medium mb-2">사용자 관리</h3>
              <p className="text-sm text-muted-foreground">
                사용자 정보를 조회하고 관리합니다.
              </p>
            </div>
            <div className="p-6 border border-border rounded-lg">
              <h3 className="text-lg font-medium mb-2">진단 요청 관리</h3>
              <p className="text-sm text-muted-foreground">
                진단 요청을 확인하고 처리합니다.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

