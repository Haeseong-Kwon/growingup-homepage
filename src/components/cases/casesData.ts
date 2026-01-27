export interface CaseItem {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  result: string;
  image?: string;
}

export const casesData: CaseItem[] = [
  {
    slug: "great-portable",
    category: "전자제품",
    title: "Great 포터블 스크린",
    excerpt: "무명 브랜드 30만원대 제품, 기존 마케팅 채널 포화 상태에서 신규 진입 필요",
    result: "4주 만에 3,500대 완판",
  },
  {
    slug: "glasho-franchise",
    category: "프랜차이즈",
    title: "글라쇼",
    excerpt: "브랜드 인지도 0%, 가맹점 모집 광고 예산 제한, B2B 리드 확보 어려움",
    result: "3개월 내 20개 점포 계약",
  },
  {
    slug: "wadiz-ebook",
    category: "크라우드펀딩",
    title: "와디즈 GPT 전자책",
    excerpt: "신규 카테고리(AI 전자책), 레퍼런스 부재, 3주라는 짧은 펀딩 기간",
    result: "3주 만에 4억 펀딩 달성",
  },
];

export const categories = ["전체", "전자제품", "프랜차이즈", "크라우드펀딩"];

