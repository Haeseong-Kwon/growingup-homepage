import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";

export default function AuthPage() {
  return (
    <Section className="pt-24 md:pt-32">
      <Container>
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-medium tracking-tight mb-6">
            인증
          </h1>
          <p className="text-muted-foreground mb-8">
            로그인 및 회원가입 기능은 추후 구현 예정입니다.
          </p>
        </div>
      </Container>
    </Section>
  );
}

