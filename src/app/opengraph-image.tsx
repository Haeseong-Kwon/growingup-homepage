import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "GrowingUp - 런칭을 매출과 데이터로 증명합니다";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0E0E0E",
          color: "#FFFFFF",
          padding: "64px",
          fontFamily:
            "Pretendard, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          <span>GROWING UP</span>
          <span style={{ color: "rgba(255,255,255,0.56)" }}>SEOUL, KR</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 86,
              lineHeight: 1.08,
              fontWeight: 800,
              letterSpacing: "-0.045em",
            }}
          >
            <span>런칭을 기획서가 아닌</span>
            <span>매출과 데이터로 증명합니다</span>
          </div>
          <p
            style={{
              width: 680,
              margin: 0,
              color: "rgba(255,255,255,0.68)",
              fontSize: 28,
              lineHeight: 1.42,
              fontWeight: 500,
            }}
          >
            데이터 기반의 정확한 진단과 실행 루프로 비즈니스의 본질적인 성장을
            만듭니다.
          </p>
        </div>

        <div
          style={{
            height: 1,
            width: "100%",
            background: "rgba(255,255,255,0.38)",
          }}
        />
      </div>
    ),
    size
  );
}
