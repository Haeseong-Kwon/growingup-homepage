import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";

export default function TermsPage() {
  return (
    <>
      {/* Hero */}
      <Section className="pt-24 md:pt-32">
        <Container>
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-6">
            이용약관
          </h1>
          <p className="text-muted-foreground">
            최종 수정일: 2026년 1월 24일
          </p>
        </Container>
      </Section>

      {/* Content */}
      <Section>
        <Container>
          <div className="max-w-3xl prose prose-neutral">
            <h2>제1조 (목적)</h2>
            <p>
              본 약관은 회사가 제공하는 서비스의 이용과 관련하여 회사와 회원
              간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로
              합니다.
            </p>

            <h2>제2조 (정의)</h2>
            <p>
              1. &ldquo;서비스&rdquo;란 회사가 제공하는 모든 서비스 및 기능을 의미합니다.
            </p>
            <p>
              2. &ldquo;회원&rdquo;이란 본 약관에 동의하고 회사와 이용계약을 체결하여
              서비스를 이용하는 자를 말합니다.
            </p>

            <h2>제3조 (약관의 효력 및 변경)</h2>
            <p>
              1. 본 약관은 서비스를 이용하고자 하는 모든 회원에 대하여 그 효력을
              발생합니다.
            </p>
            <p>
              2. 회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 본 약관을
              변경할 수 있습니다.
            </p>

            <h2>제4조 (서비스의 제공)</h2>
            <p>
              회사는 회원에게 아래와 같은 서비스를 제공합니다.
            </p>

            <h2>제5조 (서비스의 중단)</h2>
            <p>
              회사는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신두절
              또는 운영상 상당한 이유가 있는 경우 서비스의 제공을 일시적으로
              중단할 수 있습니다.
            </p>

            <h2>제6조 (회원의 의무)</h2>
            <p>
              회원은 관계 법령, 본 약관의 규정, 이용안내 및 서비스와 관련하여
              공지한 주의사항 등을 준수하여야 합니다.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}

