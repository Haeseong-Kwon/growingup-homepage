/**
 * 연혁 — 회사 포트폴리오(2023–2026)의 HISTORY 섹션을 그대로 옮긴 것입니다.
 * 문구와 수치는 포트폴리오 원문 기준이며, 임의로 각색하지 않습니다.
 */

export type HistoryCategory = "회사" | "콘텐츠" | "F&B" | "리테일" | "SaaS";

export interface HistoryFact {
  label: string;
  value: string;
}

export interface HistoryEntry {
  /** 시점 표기 — 원문 그대로 (연·월·일 혼재) */
  when: string;
  category: HistoryCategory;
  title: string;
  body: string;
  /** 그 해의 전환점을 한 줄로 짚는 문장 */
  highlight?: string;
  facts?: HistoryFact[];
  /** 마일스톤 — 타임라인에서 채워진 점으로 표시됩니다. */
  key?: boolean;
}

export interface HistoryYear {
  year: string;
  /** 그 해를 요약하는 라틴 라벨 */
  label: string;
  entries: HistoryEntry[];
}

export const HISTORY: HistoryYear[] = [
  {
    year: "2023",
    label: "Founding · Own IP",
    entries: [
      {
        when: "2023.02",
        category: "회사",
        title: "그로윙업 주식회사 설립",
        body: "고려대학교 창업스튜디오에서 법인을 설립했습니다. 대행이 아니라 우리 제품을 만들어 파는 것에서 출발했습니다.",
        key: true,
      },
      {
        when: "2023.03",
        category: "콘텐츠",
        title: "첫 자체 IP 「GPT 초고수는 이렇게 씁니다」 와디즈 런칭",
        body: "ChatGPT 수익화 활용 비법서. 기획·집필·상세페이지·펀딩 운영까지 전 과정을 자체 수행했습니다.",
        highlight: "첫 번째 0 → 1. 우리 돈으로 먼저 검증했습니다.",
        key: true,
      },
      {
        when: "2023",
        category: "콘텐츠",
        title: "문화체육관광부 출판사 등록",
        body: "신고번호 251002023000020. 콘텐츠를 직접 제작하고 유통하는 구조를 확보했습니다.",
      },
      {
        when: "2023.10",
        category: "콘텐츠",
        title: "「개발자 없어도 성공하는 〈노코드〉의 비밀」 런칭",
        body: "본편 종료 후 앵콜 → 2차 앵콜 → 추가 회차 → 와디즈 스토어 상시 판매로 이어졌습니다.",
        highlight: "반복 가능성 검증 — 한 번의 운이 아니었습니다.",
        key: true,
      },
    ],
  },
  {
    year: "2024",
    label: "Offline · Franchise",
    entries: [
      {
        when: "2024.03",
        category: "콘텐츠",
        title: "「연 4억대 매출 기업이 알려주는 제2의 두뇌 활용법」 런칭",
        body: "자체 IP 포트폴리오를 4종 이상으로 확립했습니다.",
        facts: [{ label: "누적 크라우드펀딩", value: "10억원+" }],
      },
      {
        when: "2024",
        category: "F&B",
        title: "글라쇼 — 프리미엄 수제 아이스크림 초기 런칭 마케팅",
        body: "브랜드 인지도 0% 상태에서 초기 런칭 마케팅을 담당했습니다. B2C 인지도와 B2B 가맹 리드를 동시에 만들어야 하는 프랜차이즈 특유의 이중 퍼널을 설계했습니다.",
        highlight: "두 번째 0 → 1. 온라인을 넘어 오프라인 유통으로.",
        facts: [{ label: "전국 가맹점", value: "20개점" }],
        key: true,
      },
    ],
  },
  {
    year: "2025",
    label: "Retail · Scale",
    entries: [
      {
        when: "2025.07",
        category: "리테일",
        title: "Great 포터블 스크린 마케팅 전담 시작",
        body: "무명 제품의 브랜드 런칭 마케팅 전반을 맡았습니다. 제품은 24인치 안드로이드 태블릿이었고, 그대로 팔면 삼성·애플과 경쟁해야 하는 구조였습니다.",
        highlight: "세 번째 0 → 1. 아이템을 다시 정의하는 것에서 시작했습니다.",
      },
      {
        when: "2025.09.11",
        category: "리테일",
        title: "이마트 · 트레이더스 단독 출시",
        body: "‘포터블 스크린’이라는 신규 카테고리로 재정의하고, 100만원대 LG 스탠바이미의 대안으로 포지셔닝했습니다. 캠핑·차박 수요를 겨냥해 가전 매대와 캠핑 코너에 동시 진입했습니다.",
        facts: [
          { label: "전국 언론 보도", value: "20건+" },
          { label: "판매가", value: "499,000원" },
        ],
        key: true,
      },
      {
        when: "2025.11.27 — 12.10",
        category: "리테일",
        title: "이마트 창립 32주년 ‘고래잇 페스타’ 주력 상품 선정",
        body: "연중 최대 규모 행사의 디지털 카테고리 대표 상품으로 편성됐습니다.",
      },
      {
        when: "2025.12.01",
        category: "리테일",
        title: "사전예약 1시간 이내 1,400대 완판",
        body: "이마트 앱 ‘디지털그랩’ 사전예약이 1시간이 채 되지 않아 마감됐고, 2차 사전예약에는 대기자가 몰렸습니다. 이후 전국 오프라인 매장이 품절되었습니다.",
        facts: [
          { label: "1차 사전예약", value: "1시간 · 1,400대" },
          { label: "2차 대기자", value: "15,000명" },
        ],
        key: true,
      },
      {
        when: "2025.12",
        category: "SaaS",
        title: "협력사 AOP와 Autopilot 공동 개발 착수",
        body: "현장에서 검증한 마케팅 실행 방법론을 AI 제품으로 옮기는 작업을 시작했습니다.",
      },
    ],
  },
  {
    year: "2026",
    label: "Ecosystem · Product",
    entries: [
      {
        when: "2025.12 — 2026",
        category: "리테일",
        title: "전용 액세서리 시장 형성 — 하나의 카테고리가 되다",
        body: "힐링쉴드가 이 제품만을 위한 보호필름 3종을 출시했고, 카멜마운트·엔산마운트가 ‘이마트 포터블 스크린 거치대’를 내놓았습니다. 전용가방은 별도 SKU로 판매되고 있습니다.",
        highlight:
          "다른 회사가 돈을 들여 액세서리를 만든다는 것 — 인지도가 만들어졌다는 가장 정확한 증거입니다.",
        key: true,
      },
      {
        when: "2026.01",
        category: "리테일",
        title: "대중 인지도 확립",
        body: "가격 인하 시 차액 환불 사례가 경제지에 인용될 만큼 널리 알려진 제품이 되었습니다. 출시 11개월이 지난 시점까지 소비자 리뷰가 끊이지 않고 생산되고 있습니다.",
        facts: [
          { label: "블로그 리뷰", value: "130건+" },
          { label: "리뷰 지속 기간", value: "11개월" },
        ],
      },
      {
        when: "2026",
        category: "SaaS",
        title: "Autopilot 출시 — 노하우의 제품화",
        body: "시장 진단, 추적 세팅, GTM 자동 설치, 히트맵, 상세페이지 진단, 데이터 퍼포먼스까지 6개 모듈. 컨설팅으로 먼저 검증했기 때문에 제품이 될 수 있었습니다.",
        highlight: "네 번째 0 → 1. 사람이 하던 판단을 시스템이 반복합니다.",
        key: true,
      },
      {
        when: "2026",
        category: "회사",
        title: "Marketing OS 체계화 · 케이스 DB 구축",
        body: "4개 산업에서 축적한 실행 데이터를 재사용 가능한 프레임워크와 산출물 템플릿으로 정리하고 있습니다.",
      },
    ],
  },
];

/** 연혁 도입부에 놓는 4개 카테고리 요약 — 포트폴리오의 FOUR CATEGORIES와 동일. */
export interface CategoryArc {
  year: string;
  field: string;
  subject: string;
  detail: string;
}

export const CATEGORY_ARC: CategoryArc[] = [
  { year: "2023", field: "콘텐츠", subject: "전자책 IP 4종+", detail: "출판사 직접 등록 · 와디즈 자체 펀딩" },
  { year: "2024", field: "F&B", subject: "글라쇼", detail: "프랜차이즈 초기 런칭 · 가맹 20개점" },
  { year: "2025", field: "리테일", subject: "Great 포터블 스크린", detail: "이마트 단독 출시 · 사전예약 완판" },
  { year: "2026", field: "SaaS", subject: "Autopilot", detail: "AOP 공동 개발 · AI 마케팅 실행 시스템" },
];
