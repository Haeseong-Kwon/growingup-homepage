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

export const portfolioData: PortfolioItem[] = [
  {
    id: "1",
    title: "디지털 헬스케어 플랫폼 런칭",
    client: "헬스케어테크",
    year: 2025,
    industry: "Healthcare",
    category: "Brand Launch",
    tags: ["디지털 전환", "헬스케어", "플랫폼"],
    summary: "의료진과 환자를 연결하는 디지털 헬스케어 플랫폼의 브랜드 런칭 및 마케팅 전략 수립",
    goals: [
      "의료진 가입 500명 달성",
      "월간 활성 사용자 10,000명 확보",
      "브랜드 인지도 30% 향상"
    ],
    kpis: [
      "의료진 가입 520명 (목표 대비 104%)",
      "MAU 12,500명 (목표 대비 125%)",
      "브랜드 인지도 35% (목표 대비 117%)"
    ],
    awards: [
      { year: 2025, award: "디지털 혁신 어워드", category: "헬스케어 부문" }
    ]
  },
  {
    id: "2",
    title: "프리미엄 뷰티 브랜드 글로벌 진출",
    client: "뷰티코리아",
    year: 2025,
    industry: "Beauty",
    category: "Brand Launch",
    tags: ["글로벌", "뷰티", "프리미엄"],
    summary: "국내 프리미엄 뷰티 브랜드의 아시아 시장 진출을 위한 브랜드 포지셔닝 및 마케팅 캠페인",
    goals: [
      "아시아 3개국 진출",
      "첫 해 매출 50억원 달성",
      "SNS 팔로워 100만명 확보"
    ],
    kpis: [
      "5개국 진출 (목표 대비 167%)",
      "매출 65억원 (목표 대비 130%)",
      "SNS 팔로워 120만명 (목표 대비 120%)"
    ],
    awards: [
      { year: 2025, award: "글로벌 브랜드 어워드", category: "뷰티 부문" },
      { year: 2025, award: "마케팅 혁신상", category: "글로벌 마케팅" }
    ]
  },
  {
    id: "3",
    title: "SaaS B2B 플랫폼 성장 가속화",
    client: "비즈니스솔루션",
    year: 2024,
    industry: "SaaS",
    category: "Performance",
    tags: ["B2B", "SaaS", "성장"],
    summary: "B2B SaaS 플랫폼의 유료 전환율 향상 및 고객 획득 비용 최적화를 위한 성과 마케팅",
    goals: [
      "유료 전환율 15% 달성",
      "CAC 30% 감소",
      "월간 신규 고객 200명 확보"
    ],
    kpis: [
      "유료 전환율 18% (목표 대비 120%)",
      "CAC 35% 감소 (목표 대비 117%)",
      "월간 신규 고객 250명 (목표 대비 125%)"
    ]
  },
  {
    id: "4",
    title: "F&B 신규 브랜드 런칭 캠페인",
    client: "푸드앤드링크",
    year: 2024,
    industry: "F&B",
    category: "Brand Launch",
    tags: ["F&B", "런칭", "캠페인"],
    summary: "건강한 식음료 브랜드의 타겟 고객층 확보를 위한 통합 마케팅 캠페인",
    goals: [
      "런칭 3개월 내 매출 10억원",
      "온라인 주문 5,000건",
      "재구매율 40% 달성"
    ],
    kpis: [
      "3개월 매출 13억원 (목표 대비 130%)",
      "온라인 주문 6,500건 (목표 대비 130%)",
      "재구매율 45% (목표 대비 113%)"
    ]
  },
  {
    id: "5",
    title: "라이프스타일 브랜드 콘텐츠 전략",
    client: "라이프스타일코",
    year: 2024,
    industry: "Lifestyle",
    category: "Content",
    tags: ["콘텐츠", "라이프스타일", "소셜"],
    summary: "라이프스타일 브랜드의 브랜드 스토리텔링을 통한 고객 커뮤니케이션 강화",
    goals: [
      "월간 콘텐츠 조회수 500만",
      "브랜드 언급량 200% 증가",
      "커뮤니티 멤버 10,000명"
    ],
    kpis: [
      "월간 조회수 650만 (목표 대비 130%)",
      "언급량 250% 증가 (목표 대비 125%)",
      "커뮤니티 멤버 12,000명 (목표 대비 120%)"
    ]
  },
  {
    id: "6",
    title: "리테일 체인 디지털 전환",
    client: "리테일그룹",
    year: 2024,
    industry: "Retail",
    category: "Retail",
    tags: ["리테일", "디지털 전환", "오프라인"],
    summary: "오프라인 리테일 체인의 온라인 통합 및 고객 경험 개선 프로젝트",
    goals: [
      "온라인 매출 비중 30% 달성",
      "고객 만족도 4.5점 이상",
      "모바일 앱 다운로드 50만"
    ],
    kpis: [
      "온라인 매출 비중 35% (목표 대비 117%)",
      "고객 만족도 4.7점 (목표 대비 104%)",
      "앱 다운로드 65만 (목표 대비 130%)"
    ]
  },
  {
    id: "7",
    title: "B2B 제조업 마케팅 자동화",
    client: "제조기업",
    year: 2023,
    industry: "SaaS",
    category: "B2B",
    tags: ["B2B", "자동화", "제조업"],
    summary: "B2B 제조업체의 리드 생성 및 영업 프로세스 자동화를 위한 마케팅 인프라 구축",
    goals: [
      "월간 리드 500건 생성",
      "리드 전환율 10% 달성",
      "영업 사이클 20% 단축"
    ],
    kpis: [
      "월간 리드 600건 (목표 대비 120%)",
      "리드 전환율 12% (목표 대비 120%)",
      "영업 사이클 25% 단축 (목표 대비 125%)"
    ]
  },
  {
    id: "8",
    title: "프리미엄 커피 브랜드 확장",
    client: "커피컴퍼니",
    year: 2023,
    industry: "F&B",
    category: "Brand Launch",
    tags: ["F&B", "커피", "프리미엄"],
    summary: "프리미엄 커피 브랜드의 신규 지역 진출 및 브랜드 포지셔닝 강화",
    goals: [
      "신규 지역 5개 도시 진출",
      "매출 30억원 달성",
      "브랜드 인지도 1위 달성"
    ],
    kpis: [
      "7개 도시 진출 (목표 대비 140%)",
      "매출 38억원 (목표 대비 127%)",
      "브랜드 인지도 1위 달성"
    ],
    awards: [
      { year: 2023, award: "F&B 브랜드 어워드", category: "커피 부문" }
    ]
  },
  {
    id: "9",
    title: "헬스케어 앱 성장 마케팅",
    client: "헬스케어스타트업",
    year: 2023,
    industry: "Healthcare",
    category: "Performance",
    tags: ["헬스케어", "앱", "성장"],
    summary: "헬스케어 모바일 앱의 사용자 획득 및 활성화를 위한 성과 마케팅 캠페인",
    goals: [
      "월간 신규 사용자 50,000명",
      "DAU/MAU 비율 30% 달성",
      "앱스토어 평점 4.5점 이상"
    ],
    kpis: [
      "월간 신규 사용자 65,000명 (목표 대비 130%)",
      "DAU/MAU 비율 35% (목표 대비 117%)",
      "앱스토어 평점 4.7점 (목표 대비 104%)"
    ]
  },
  {
    id: "10",
    title: "뷰티 브랜드 커뮤니티 구축",
    client: "뷰티브랜드",
    year: 2023,
    industry: "Beauty",
    category: "Community",
    tags: ["뷰티", "커뮤니티", "소셜"],
    summary: "뷰티 브랜드의 고객 커뮤니티 형성 및 브랜드 로열티 강화 프로젝트",
    goals: [
      "커뮤니티 멤버 50,000명",
      "월간 UGC 1,000건",
      "브랜드 추천도 80%"
    ],
    kpis: [
      "커뮤니티 멤버 65,000명 (목표 대비 130%)",
      "월간 UGC 1,300건 (목표 대비 130%)",
      "브랜드 추천도 85% (목표 대비 106%)"
    ]
  },
  {
    id: "11",
    title: "SaaS 플랫폼 글로벌 진출",
    client: "테크스타트업",
    year: 2023,
    industry: "SaaS",
    category: "Brand Launch",
    tags: ["SaaS", "글로벌", "스타트업"],
    summary: "SaaS 플랫폼의 글로벌 시장 진출을 위한 브랜드 전략 및 마케팅 캠페인",
    goals: [
      "해외 시장 3개국 진출",
      "글로벌 사용자 10,000명",
      "해외 매출 비중 40%"
    ],
    kpis: [
      "5개국 진출 (목표 대비 167%)",
      "글로벌 사용자 15,000명 (목표 대비 150%)",
      "해외 매출 비중 45% (목표 대비 113%)"
    ],
    awards: [
      { year: 2023, award: "스타트업 어워드", category: "글로벌 진출 부문" }
    ]
  },
  {
    id: "12",
    title: "리테일 브랜드 오프라인 경험 혁신",
    client: "리테일브랜드",
    year: 2023,
    industry: "Retail",
    category: "Retail",
    tags: ["리테일", "오프라인", "경험"],
    summary: "오프라인 매장의 고객 경험 혁신을 통한 매출 증대 및 브랜드 차별화",
    goals: [
      "매장당 매출 20% 증가",
      "고객 재방문율 50%",
      "NPS 60점 이상"
    ],
    kpis: [
      "매장당 매출 25% 증가 (목표 대비 125%)",
      "고객 재방문율 55% (목표 대비 110%)",
      "NPS 65점 (목표 대비 108%)"
    ]
  }
];

export const portfolioYears = [2026, 2025, 2024, 2023];
export const portfolioCategories = [
  "전체",
  "Brand Launch",
  "Performance",
  "Content",
  "Retail",
  "B2B",
  "Community"
];
export const portfolioIndustries = [
  "전체",
  "F&B",
  "Beauty",
  "Healthcare",
  "SaaS",
  "Retail",
  "Lifestyle"
];
export const sortOptions = [
  { value: "newest", label: "최신순" },
  { value: "oldest", label: "오래된순" },
  { value: "client-az", label: "클라이언트 A-Z" },
  { value: "client-za", label: "클라이언트 Z-A" }
];

