/**
 * 안정화: 효과 제어 플래그
 * NEXT_PUBLIC_EFFECTS=0 이면 모든 고급 효과 비활성화
 */

export const EFFECTS_SAFE_MODE =
  process.env.NEXT_PUBLIC_EFFECTS === "0" ||
  typeof window !== "undefined" &&
  new URLSearchParams(window.location.search).get("safe") === "1";

/**
 * 안전 모드일 때 효과 비활성화
 */
export const shouldUseEffects = (): boolean => {
  return !EFFECTS_SAFE_MODE;
};

/**
 * backdrop-blur 사용 가능 여부
 * 안전 모드 또는 저사양 기기에서는 비활성화
 */
export const shouldUseBackdropBlur = (): boolean => {
  if (EFFECTS_SAFE_MODE) return false;
  
  // 모바일/저사양 기기 감지 (간단한 휴리스틱)
  if (typeof window !== "undefined") {
    const isMobile = window.innerWidth < 768;
    const isLowEnd = 
      // @ts-ignore
      navigator.hardwareConcurrency < 4 ||
      // @ts-ignore
      navigator.deviceMemory < 4;
    
    if (isMobile || isLowEnd) return false;
  }
  
  return true;
};

