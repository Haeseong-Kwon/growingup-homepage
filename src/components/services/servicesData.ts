export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  suitableFor: string;
  includes: string[];
  excludes: string[];
  collaboration: string;
  requiredResources: string;
  successCriteria: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: "sprint",
    title: "Launch Sprint",
    description: "빠른 검증이 필요한 팀을 위한 집중 실행 프로그램",
    suitableFor: "신제품 출시 임박, MVP 검증, 캠페인 테스트가 필요한 경우",
    includes: [
      "타겟 정의 및 포지셔닝 수립",
      "핵심 메시지 도출",
      "숏폼 콘텐츠 3~5종 제작",
      "채널 믹스 설계 및 집행",
      "주간 성과 리포트",
    ],
    excludes: [
      "대규모 미디어 바잉",
      "리테일 입점 지원",
      "장기 리텐션 설계",
    ],
    collaboration: "킥오프 → 주 2회 싱크업 → 결과 리뷰",
    requiredResources: "의사결정자 참여, 제품 정보, 24시간 내 피드백",
    successCriteria: "인지도, 트래픽, 초기 전환율",
  },
  {
    id: "partner",
    title: "Launch Partner",
    description: "체계적인 런칭 시스템 구축이 필요한 팀을 위한 풀 서비스",
    suitableFor: "신규 브랜드 런칭, 시장 확장, 리테일 입점 목표가 있는 경우",
    includes: [
      "전체 Marketing OS 프레임워크 적용",
      "3C/4P/STP 분석",
      "미디어믹스 전략 및 예산 배분",
      "숏폼 콘텐츠 10종 이상 제작",
      "채널 믹스 설계 및 풀스케일 집행",
      "리테일 입점 전략 및 제안서",
      "주간 리포트 + 월간 인사이트 리뷰",
    ],
    excludes: [
      "오프라인 이벤트 운영",
      "인하우스 팀 교육",
    ],
    collaboration: "킥오프 워크숍 → 주 1회 정기 미팅 → 월간 전략 리뷰 → 클로징",
    requiredResources: "의사결정자 참여, 제품 정보, 브랜드 자산, 주 5시간 내부 리소스",
    successCriteria: "인지도, 트래픽, 전환율, 매출, ROAS, CAC",
  },
];

