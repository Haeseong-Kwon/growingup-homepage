export interface PortfolioAward {
  year: number;
  award: string;
  category: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  year: number;
  industry: string;
  category: string;
  tags: string[];
  thumbnailUrl?: string;
  summary: string;
  goals: string[];
  kpis: string[];
  awards?: PortfolioAward[];
}

/**
 * 회사 포트폴리오(2023–2026)의 SELECTED WORKS.
 *
 * goals에는 프로젝트가 풀어야 했던 과제를, kpis에는 공개 자료·자사 집계로
 * 확인 가능한 결과만 적습니다. 확인되지 않은 수치는 넣지 않습니다.
 */
export const portfolioData: PortfolioItem[] = [
  {
    id: "great-portable",
    title: "Great 포터블 스크린 — 이마트 · 트레이더스 단독 출시",
    client: "Great",
    year: 2025,
    industry: "리테일",
    category: "Brand Launch",
    tags: ["아이템 재정의", "리테일 입점", "가전"],
    summary:
      "24인치 안드로이드 태블릿을 그대로 팔면 삼성·애플과 경쟁해야 하는 구조였습니다. ‘포터블 스크린’이라는 신규 카테고리로 재정의하고, 100만원대 LG 스탠바이미의 대안으로 포지셔닝해 캠핑·차박 수요를 겨냥했습니다. 브랜드 런칭 마케팅 전반을 전담했습니다.",
    goals: [
      "무명 제품의 카테고리 재정의 및 포지셔닝",
      "가전 매대와 캠핑 코너 동시 진입",
      "사전예약 완판을 통한 초기 수요 증명",
    ],
    kpis: [
      "2025.09.11 이마트·트레이더스 단독 출시 — 전국 언론 20건+ 보도",
      "2025.12.01 이마트 앱 디지털그랩 사전예약 1시간 이내 1,400대 완판",
      "2차 사전예약 대기자 15,000명 · 전국 오프라인 품절",
      "서드파티 액세서리 시장 형성 (보호필름 3종, 거치대, 전용가방 별도 SKU)",
      "출시 후 11개월 연속 소비자 리뷰 생산 (네이버 블로그 130건+)",
    ],
  },
  {
    id: "glasho-franchise",
    title: "글라쇼 — 프리미엄 수제 아이스크림 초기 런칭 마케팅",
    client: "(주)하신",
    year: 2024,
    industry: "F&B",
    category: "Brand Launch",
    tags: ["프랜차이즈", "이중 퍼널", "F&B"],
    summary:
      "브랜드 인지도 0% 상태에서 초기 런칭 마케팅을 담당했습니다. B2C 인지도와 B2B 가맹 리드를 동시에 만들어야 하는 프랜차이즈 특유의 이중 퍼널을 설계했습니다.",
    goals: [
      "인지도 0%에서 브랜드 인지 확보",
      "B2C 수요와 B2B 가맹 리드의 동시 확보",
      "가맹 확장이 가능한 런칭 구조 설계",
    ],
    kpis: ["전국 가맹점 20개 규모로 확장 (공정위 정보공개서 공시 기준)"],
  },
  {
    id: "wadiz-ebook",
    title: "자체 IP 런칭 — 와디즈 전자책 시리즈",
    client: "그로윙업 (자사 프로젝트)",
    year: 2023,
    industry: "콘텐츠",
    category: "Content",
    tags: ["자사 IP", "크라우드펀딩", "출판"],
    summary:
      "기획·제작·출판·펀딩 전 과정을 자체 수행했습니다. 문화체육관광부 출판사를 직접 등록해 콘텐츠를 만들고 유통하는 구조를 확보했습니다. 클라이언트 사례가 아니라 우리 제품이었습니다.",
    goals: [
      "자체 IP로 0 → 1을 우리 돈으로 먼저 검증",
      "일회성이 아닌 반복 가능한 런칭 구조 확인",
      "콘텐츠 제작·유통 구조의 내재화",
    ],
    kpis: [
      "문화체육관광부 출판사 등록 (신고번호 251002023000020)",
      "「GPT 초고수는 이렇게 씁니다」(2023.03) 런칭",
      "〈노코드〉의 비밀(2023.10) — 앵콜 → 2차 앵콜 → 추가 회차 → 와디즈 스토어 상시 판매 전환",
      "「제2의 두뇌 활용법」(2024.03) 런칭 — 자체 전자책 IP 4종 이상",
      "누적 크라우드펀딩 10억원+ (자사 집계)",
    ],
  },
  {
    id: "autopilot-aop",
    title: "Autopilot with AOP — AI 마케팅 실행 시스템",
    client: "AOP (협력사)",
    year: 2026,
    industry: "SaaS",
    category: "B2B",
    tags: ["SaaS", "마케팅 자동화", "공동 개발"],
    summary:
      "현장에서 검증한 마케팅 실행 방법론을 협력사 AOP와 공동 기획·개발해 제품으로 옮겼습니다. 사람이 하던 판단을 제품이 반복합니다.",
    goals: [
      "컨설팅으로 검증한 실행 방법론의 제품화",
      "시장 진단부터 성과 측정까지 하나의 흐름으로 연결",
      "반복 가능한 판단 기준의 시스템화",
    ],
    kpis: [
      "01 Market — 경쟁 구도·검색 수요 분석 후 진입 여부 리포트",
      "02 Tracking — GTM·GA4·Meta Pixel 설치 진단 및 SEO 스코어",
      "03 Install — GTM 컨테이너 생성 및 쇼핑몰 스니펫 주입",
      "04 Heatmap — 클릭·스크롤 심도 익명 수집 및 시각화",
      "05 Detail page — 메시지·차별점·신뢰·설득구조·검색노출 5축 분석",
      "06 Performance — 종합 진단·기여도·KPI 달성률 및 액션 처방",
    ],
  },
];

export const portfolioYears = [2026, 2025, 2024, 2023];
export const portfolioCategories = ["전체", "Brand Launch", "Content", "B2B"];
export const portfolioIndustries = ["전체", "리테일", "F&B", "콘텐츠", "SaaS"];
export const sortOptions = [
  { value: "newest", label: "최신순" },
  { value: "oldest", label: "오래된순" },
  { value: "client-az", label: "클라이언트 A-Z" },
  { value: "client-za", label: "클라이언트 Z-A" }
];
