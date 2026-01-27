/**
 * VideoHero가 있는 페이지 목록
 * 이 페이지들은 헤더가 투명하게 표시되고, VideoHero가 헤더 뒤로 올라갑니다.
 * 
 * 새로운 페이지를 추가하려면 이 배열에 경로를 추가하세요.
 */
export const PAGES_WITH_VIDEO_HERO = [
  "/",
  "/capabilities",
  "/arena",
  "/portfolio",
  "/services",
  "/cases",
  "/insights",
] as const;

/**
 * 경로가 VideoHero를 사용하는지 확인
 * @param pathname - 확인할 경로
 * @returns VideoHero를 사용하는지 여부
 */
export function hasVideoHero(pathname: string): boolean {
  return PAGES_WITH_VIDEO_HERO.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

