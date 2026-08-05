import { HeroScene } from "@/components/home/hero-scene";
import { ManifestoSection } from "@/components/home/manifesto-section";
import { PillarsSection } from "@/components/home/pillars-section";
import { WorksSection, type WorkItem } from "@/components/home/works-section";
import { ProcessSection, type ProcessStep } from "@/components/home/process-section";
import { PartnersSection } from "@/components/home/partners-section";
import { FaqContactSection, type FaqItem } from "@/components/home/faq-contact-section";

// 포트폴리오 케이스 + 진행 중인 프로젝트를 하나의 가로 릴로 묶어 노출
const works: WorkItem[] = [
  {
    category: "전자제품",
    title: "Great 포터블 스크린",
    summary: "무명 브랜드 30만원대 제품, 기존 마케팅 채널 포화 상태에서 신규 진입 필요",
    result: "4주 만에 3,500대 완판",
    href: "/portfolio/great-portable-screen",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&h=1200&fit=crop",
  },
  {
    category: "프랜차이즈",
    title: "글라소",
    summary: "브랜드 인지도 0%, 가맹점 모집 광고 예산 제한, B2B 리드 확보 어려움",
    result: "3개월 내 20개 점포 계약",
    href: "/portfolio/glaso",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=900&h=1200&fit=crop",
  },
  {
    category: "크라우드펀딩",
    title: "와디즈 GPT 전자책",
    summary: "신규 카테고리(AI 전자책), 레퍼런스 부재, 3주라는 짧은 펀딩 기간",
    result: "3주 만에 4억 펀딩 달성",
    href: "/portfolio/wadiz-gpt-ebook",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=900&h=1200&fit=crop",
  },
  {
    category: "브랜딩",
    title: "브랜드 리뉴얼 프로젝트",
    summary: "디지털 시대에 맞는 새로운 브랜드 아이덴티티 구축",
    href: "/projects/1",
    image: "https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=900&h=1200&fit=crop",
  },
  {
    category: "마케팅",
    title: "마케팅 캠페인 최적화",
    summary: "데이터 기반 캠페인 성과 개선 및 ROI 향상",
    href: "/projects/2",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=1200&fit=crop",
  },
  {
    category: "UX/UI",
    title: "고객 경험 혁신",
    summary: "사용자 중심의 디지털 경험 설계 및 구현",
    href: "/projects/3",
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=900&h=1200&fit=crop",
  },
  {
    category: "콘텐츠",
    title: "콘텐츠 전략 수립",
    summary: "브랜드 스토리텔링을 통한 고객 소통 강화",
    href: "/projects/4",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=900&h=1200&fit=crop",
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
        line1="런칭을 기획서가 아닌"
        line2="매출과 데이터로 증명합니다"
        subtitle="데이터 기반의 정확한 진단으로 비즈니스의 본질적인 성장을 만듭니다."
        primaryCta={{ label: "진행 중인 프로젝트", href: "/projects" }}
        secondaryCta={{ label: "마케팅 제안 요청", href: "/proposal" }}
      />

      <ManifestoSection />
      <PillarsSection />
      <WorksSection items={works} />
      <ProcessSection steps={processSteps} />
      <PartnersSection />
      <FaqContactSection items={faqItems} />
    </div>
  );
}
