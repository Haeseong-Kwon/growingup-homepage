/**
 * 협력사 — 함께 프로젝트를 실행하는 파트너사.
 *
 * 회사명 외의 정보는 확인된 자료가 없어 의도적으로 비워 두었습니다.
 * 소개 문구·업종·링크가 확정되면 여기에 필드를 추가하세요.
 */
export interface Partner {
  /** 국문 표기 */
  name: string;
  /** 영문/약칭 표기 */
  latin: string;
}

export const PARTNERS: Partner[] = [
  { name: "에이오피", latin: "AOP" },
  { name: "인스펙", latin: "INSPEC" },
  { name: "온엑스", latin: "ON-AX" },
  { name: "애녹스", latin: "ANOCS" },
];

/**
 * 티커에 흐르는 이름들. 협력사(featured)와 기존 사이트에 이미 공개된
 * 프로젝트 브랜드만 사용합니다 — 확인되지 않은 고객사는 넣지 않습니다.
 */
export const TICKER_NAMES = [
  ...PARTNERS.map((partner) => ({ name: `${partner.latin} ${partner.name}`, featured: true })),
  { name: "Great 포터블 스크린" },
  { name: "글라쇼" },
  { name: "와디즈 전자책 시리즈" },
  { name: "Autopilot" },
];
