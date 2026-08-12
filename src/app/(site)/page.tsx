import { HeroScene } from "@/components/home/hero-scene";
import { ManifestoSection } from "@/components/home/manifesto-section";
import { StatementBand } from "@/components/home/statement-band";
import { PillarsSection } from "@/components/home/pillars-section";
import { WorksSection, type WorkItem } from "@/components/home/works-section";
import { HistorySection } from "@/components/home/history-section";
import { ProcessSection, type ProcessStep } from "@/components/home/process-section";
import { DeliverablesSection } from "@/components/home/deliverables-section";
import { EngagementsSection } from "@/components/home/engagements-section";
import { PartnersSection } from "@/components/home/partners-section";
import { AutopilotSection } from "@/components/home/autopilot-section";
import { UpdatesSection } from "@/components/home/updates-section";
import { FaqContactSection, type FaqItem } from "@/components/home/faq-contact-section";

// 포트폴리오의 SELECTED WORKS 네 건을 하나의 가로 릴로 묶어 노출
const works: WorkItem[] = [
  {
    category: "리테일 · 가전",
    title: "Great 포터블 스크린",
    summary:
      "24인치 안드로이드 태블릿을 ‘포터블 스크린’으로 재정의해 이마트·트레이더스 단독 출시. 브랜드 런칭 마케팅 전반 전담",
    result: "사전예약 1시간 · 1,400대 완판",
    href: "/cases/great-portable",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&h=1200&fit=crop",
  },
  {
    category: "F&B · 프랜차이즈",
    title: "글라쇼",
    summary:
      "인지도 0%에서 시작한 프리미엄 수제 아이스크림 프랜차이즈. B2C 인지도와 B2B 가맹 리드를 동시에 만드는 이중 퍼널 설계",
    result: "전국 가맹 20개점",
    href: "/cases/glasho-franchise",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=900&h=1200&fit=crop",
  },
  {
    category: "크라우드펀딩 · 자사 IP",
    title: "와디즈 전자책 시리즈",
    summary:
      "출판사 직접 등록 후 기획·제작·출판·펀딩 전 과정을 자체 수행. 클라이언트 사례가 아니라 우리 제품이었습니다",
    result: "누적 크라우드펀딩 10억원+",
    href: "/cases/wadiz-ebook",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=900&h=1200&fit=crop",
  },
  {
    category: "프로덕트 · B2B",
    title: "Autopilot with AOP",
    summary:
      "현장에서 검증한 마케팅 실행 방법론을 협력사 AOP와 함께 제품으로. 사람이 하던 판단을 제품이 반복합니다",
    result: "6개 모듈 AI 마케팅 실행 시스템",
    href: "/cases/autopilot-aop",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=1200&fit=crop",
  },
];

// 프로세스 스텝 (GrowingUp Marketing OS)
const processSteps: ProcessStep[] = [
  {
    title: "시장조사",
    description: "경쟁 환경, 타겟 분석, 기회 영역 도출",
    outputs: "3C 분석, 타겟 페르소나, 포지셔닝 맵",
  },
  {
    title: "전략 수립",
    description: "채널 믹스, 메시지, KPI 설계",
    outputs: "전략 문서, 크리에이티브 브리프, 예산 배분표",
  },
  {
    title: "실행",
    description: "콘텐츠 제작, 미디어 바잉, 채널 운영",
    outputs: "콘텐츠 패키지, 진행 리포트, 성과 대시보드",
  },
  {
    title: "인력 매칭",
    description: "전문 인력 연결, 역할 분담, 협업 체계",
    outputs: "파트너 리스트, SOP 문서, 커뮤니케이션 가이드",
  },
  {
    title: "피드백 학습",
    description: "성과 분석, 가설 검증, 다음 실험 설계",
    outputs: "인사이트 리포트, 학습 DB, 넥스트 액션 플랜",
  },
];

const faqItems: FaqItem[] = [
  {
    question: "외주 참여는 어떻게 신청하나요?",
    answer: "홈페이지의 '외주 파트너 등록' 메뉴에서 신청서를 작성하시면 됩니다. 검토 후 연락드리겠습니다.",
  },
  {
    question: "마케팅 제안은 어떤 방식으로 진행되나요?",
    answer: "프로젝트 목표와 예산을 공유해주시면 맞춤형 제안서를 작성해드립니다. 제안 요청 페이지에서 신청하실 수 있습니다.",
  },
  {
    question: "프로젝트 진행 기간은 얼마나 걸리나요?",
    answer: "프로젝트 규모와 범위에 따라 다르지만, 일반적으로 4주~12주 정도 소요됩니다. 정확한 일정은 프로젝트 킥오프 미팅에서 확정됩니다.",
  },
  {
    question: "정산은 언제 이루어지나요?",
    answer: "프로젝트 단계별 마일스톤 완료 시 정산이 이루어집니다. 계약서에 명시된 조건에 따라 진행됩니다.",
  },
];

export default function HomePage() {
  return (
    <div className="relative bg-[var(--ink)]">
      <HeroScene
        intro
        line1="런칭을 기획서가 아닌"
        line2="매출과 데이터로 증명합니다"
        subtitle="데이터 기반의 정확한 진단으로 비즈니스의 본질적인 성장을 만듭니다."
        primaryCta={{ label: "진행 중인 프로젝트", href: "/projects" }}
        secondaryCta={{ label: "마케팅 제안 요청", href: "/proposal" }}
      />

      <ManifestoSection />
      <StatementBand />
      <PillarsSection />
      <WorksSection items={works} />
      <HistorySection />
      <ProcessSection steps={processSteps} />
      <DeliverablesSection />
      <EngagementsSection />
      <PartnersSection />
      <AutopilotSection />
      <UpdatesSection />
      <FaqContactSection items={faqItems} />
    </div>
  );
}
