import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";

export default function PrivacyPage() {
  return (
    <>
      {/* Hero */}
      <Section className="pt-24 md:pt-32 lg:pt-40 border-b">
        <Container>
          <h1 className="text-balance mb-6">개인정보처리방침</h1>
          <p className="text-[var(--brand-fg)]/50 text-sm">
            최종 수정일: 2026년 1월 24일
          </p>
        </Container>
      </Section>

      {/* Content */}
      <Section>
        <Container>
          <div className="max-w-3xl mx-auto prose prose-neutral prose-headings:font-medium prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-p:text-[var(--brand-fg)]/60 prose-p:leading-relaxed">
            <h2>1. 개인정보의 수집 및 이용 목적</h2>
            <p>
              회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는
              개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이
              변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를 이행할
              예정입니다.
            </p>

            <h2>2. 개인정보의 처리 및 보유 기간</h2>
            <p>
              회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터
              개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서
              개인정보를 처리·보유합니다.
            </p>

            <h2>3. 개인정보의 제3자 제공</h2>
            <p>
              회사는 정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조
              및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
            </p>

            <h2>4. 개인정보처리의 위탁</h2>
            <p>
              회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보
              처리업무를 위탁하고 있습니다.
            </p>

            <h2>5. 정보주체의 권리·의무 및 행사방법</h2>
            <p>
              정보주체는 회사에 대해 언제든지 개인정보
              열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.
            </p>

            <h2>6. 개인정보 보호책임자</h2>
            <p>
              회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보
              처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와
              같이 개인정보 보호책임자를 지정하고 있습니다.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
