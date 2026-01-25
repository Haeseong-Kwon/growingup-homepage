/**
 * 섹션별 색상 팔레트 정의
 * 블렌딩 기반 컬러 엔진에서 사용
 */

export type PaletteName = "light" | "dark" | "brand";

export interface Palette {
  bg: string;
  fg: string;
  surface: string;
  border: string;
}

export const PALETTES: Record<PaletteName, Palette> = {
  light: {
    bg: "#ffffff",
    fg: "#0b0b0c",
    surface: "#ffffff",
    border: "rgba(0,0,0,0.08)",
  },
  dark: {
    bg: "#07080a",
    fg: "#ffffff",
    surface: "rgba(255,255,255,0.08)",
    border: "rgba(255,255,255,0.16)",
  },
  brand: {
    // 그로윙업 포인트 색상 (primary 기반 단색)
    bg: "#575ECF",
    fg: "#ffffff",
    surface: "rgba(255,255,255,0.10)",
    border: "rgba(255,255,255,0.18)",
  },
};

/**
 * 팔레트 이름이 유효한지 확인
 */
export function isValidPalette(name: string): name is PaletteName {
  return name in PALETTES;
}

/**
 * 기본 팔레트 (fallback)
 */
export const DEFAULT_PALETTE: Palette = PALETTES.light;

