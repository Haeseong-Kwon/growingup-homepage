export interface UpdateItem {
  id: string;
  pinned: boolean;
  badges: string[];
  title: string;
  excerpt?: string;
  date: string;
  meta?: string;
  href: string;
}

export const updatesData: UpdateItem[] = [
  {
    id: "1",
    pinned: true,
    badges: ["Creative", "Media"],
    title: "운영 로그 v0.3 — 산출물 템플릿 정비",
    excerpt: "클라이언트 제공용 산출물 템플릿을 표준화하고 샘플을 공개했습니다.",
    date: "2025.12.20",
    meta: "5 Templates",
    href: "/updates/3bedf30a-339c-4d73-9316-faa2dad6f087",
  },
  {
    id: "2",
    pinned: false,
    badges: ["Product", "Creative"],
    title: "운영 로그 v0.2 — 첫 진단 흐름 검증",
    excerpt: "실제 사용자 테스트를 통해 진단 흐름의 유효성을 검증했습니다. 주요 개선점 도출.",
    date: "2025.12.13",
    meta: "+3 Testers",
    href: "/updates/479aafd4-ca4c-4161-869a-710554393894",
  },
  {
    id: "3",
    pinned: false,
    badges: ["Strategy", "System"],
    title: "운영 로그 v0.1 — 시스템 기반 마련",
    excerpt: "그로윙업 운영 체계의 첫 번째 버전을 구축했습니다. 진단 도구와 기본 프레임워크 설계 완료.",
    date: "2025.12.06",
    meta: "Foundation",
    href: "/updates/82e425af-38b6-4c4d-bbcd-396064f246ca",
  },
  {
    id: "4",
    pinned: false,
    badges: [],
    title: "Week 1: 시장 분석 착수",
    excerpt: "",
    date: "2024.02.08",
    meta: "",
    href: "/updates/185cd136-a021-440c-9aa9-20379110b31e",
  },
  {
    id: "5",
    pinned: false,
    badges: [],
    title: "Week 2: 크리에이티브 시스템 구축",
    date: "2024.01.29",
    href: "/updates/9e2c9182-b893-4ea9-aa57-8504ca766f75",
  },
  {
    id: "6",
    pinned: false,
    badges: [],
    title: "Week 1: 킥오프 완료",
    date: "2024.01.22",
    href: "/updates/28ab69c9-f82c-42fb-bc81-08604dd781ad",
  },
];

export const tags = ["전체", "Creative", "Media", "Product", "Strategy", "System"];

