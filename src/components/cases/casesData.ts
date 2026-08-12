export interface CaseItem {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  result: string;
  image?: string;
}

/** 회사 포트폴리오(2023–2026)의 SELECTED WORKS 기준. 수치는 원문 표기를 따릅니다. */
export const casesData: CaseItem[] = [
  {
    slug: "great-portable",
    category: "리테일 · 가전",
    title: "Great 포터블 스크린",
    excerpt:
      "24인치 안드로이드 태블릿을 그대로 팔면 삼성·애플과 경쟁하는 구조. ‘포터블 스크린’이라는 신규 카테고리로 재정의하고 캠핑·차박 수요를 겨냥해 이마트·트레이더스에 단독 진입했습니다.",
    result: "사전예약 1시간 · 1,400대 완판",
  },
  {
    slug: "glasho-franchise",
    category: "F&B · 프랜차이즈",
    title: "글라쇼",
    excerpt:
      "브랜드 인지도 0% 상태에서 초기 런칭 마케팅 전담. B2C 인지도와 B2B 가맹 리드를 동시에 만들어야 하는 프랜차이즈 특유의 이중 퍼널을 설계했습니다.",
    result: "전국 가맹 20개점",
  },
  {
    slug: "wadiz-ebook",
    category: "크라우드펀딩 · 자사 IP",
    title: "와디즈 전자책 시리즈",
    excerpt:
      "문화체육관광부 출판사를 직접 등록하고 기획·제작·출판·펀딩 전 과정을 자체 수행했습니다. 클라이언트 사례가 아니라 우리 제품이었습니다.",
    result: "누적 크라우드펀딩 10억원+",
  },
  {
    slug: "autopilot-aop",
    category: "프로덕트 · B2B",
    title: "Autopilot with AOP",
    excerpt:
      "현장에서 검증한 마케팅 실행 방법론을 협력사 AOP와 공동 기획·개발해 제품으로 옮겼습니다. 시장 진단부터 데이터 퍼포먼스까지 6개 모듈.",
    result: "6개 모듈 AI 마케팅 실행 시스템",
  },
];

export const categories = [
  "전체",
  "리테일 · 가전",
  "F&B · 프랜차이즈",
  "크라우드펀딩 · 자사 IP",
  "프로덕트 · B2B",
];
