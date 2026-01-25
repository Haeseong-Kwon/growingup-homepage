import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";

export default function CookiesPage() {
  return (
    <>
      {/* Hero */}
      <Section className="pt-24 md:pt-32">
        <Container>
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-6">
            쿠키 정책
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
            <h2>쿠키란 무엇인가요?</h2>
            <p>
              쿠키는 웹사이트를 방문할 때 귀하의 컴퓨터나 모바일 기기에 저장되는
              작은 텍스트 파일입니다. 쿠키를 통해 웹사이트는 귀하의 방문 기록을
              일정 기간 동안 &ldquo;기억&rdquo;할 수 있습니다.
            </p>

            <h2>우리는 어떤 쿠키를 사용하나요?</h2>
            
            <h3>1. 필수 쿠키</h3>
            <p>
              이 쿠키는 웹사이트가 작동하는 데 필수적이며 시스템에서 끌 수
              없습니다. 일반적으로 개인정보 보호 기본 설정, 로그인 또는 양식
              작성과 같은 서비스 요청에 해당하는 귀하의 작업에 대한 응답으로만
              설정됩니다.
            </p>

            <h3>2. 성능 쿠키</h3>
            <p>
              이 쿠키를 사용하면 방문 수와 트래픽 소스를 계산하여 사이트의 성능을
              측정하고 개선할 수 있습니다. 가장 인기 있거나 인기가 없는 페이지를
              파악하고 방문자가 사이트를 어떻게 이동하는지 확인하는 데 도움이
              됩니다.
            </p>

            <h3>3. 기능 쿠키</h3>
            <p>
              이 쿠키는 향상된 기능과 개인화를 제공합니다. 이러한 쿠키는 당사
              또는 페이지에 서비스를 추가한 제3자 제공업체가 설정할 수 있습니다.
            </p>

            <h2>쿠키 관리 방법</h2>
            <p>
              대부분의 웹 브라우저는 쿠키를 자동으로 허용하지만, 귀하는 브라우저
              설정을 통해 쿠키를 차단하거나 삭제할 수 있습니다. 단, 쿠키를
              비활성화하면 사이트의 일부 기능을 사용하지 못할 수 있습니다.
            </p>

            <h2>연락처</h2>
            <p>
              쿠키 정책에 대한 질문이나 우려 사항이 있으시면 언제든지
              문의해주시기 바랍니다.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}

