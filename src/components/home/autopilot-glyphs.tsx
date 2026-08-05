/**
 * 오토파일럿 기능별 라인 글리프. 프리즘 면과 모바일 카드에서 공통으로 씁니다.
 *
 * 사이트의 점선 괘선 문법에 맞춘 1px 선화이고, 색은 전부 `currentColor`라
 * 부모의 투명도만 조절하면 면이 뒤로 물러날 때 함께 어두워집니다.
 */

const BASE = {
  viewBox: "0 0 120 120",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** 시장 진단 — 레이더. 동심원 위에 경쟁 신호가 찍힙니다. */
function MarketGlyph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...BASE} {...props}>
      <circle cx="60" cy="60" r="46" strokeDasharray="3 4" />
      <circle cx="60" cy="60" r="30" strokeDasharray="3 4" />
      <circle cx="60" cy="60" r="14" />
      <path d="M60 60 L60 14 M60 60 L98 82" />
      <circle cx="84" cy="40" r="3" fill="currentColor" stroke="none" />
      <circle cx="38" cy="82" r="2" fill="currentColor" stroke="none" />
      <circle cx="90" cy="72" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** 추적 세팅 — GTM·GA4·Pixel 세 태그가 한 줄로 연결되고 마지막에 체크. */
function TrackingGlyph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...BASE} {...props}>
      <path d="M22 34h34v18H22z M22 51h34v18H22z" strokeDasharray="3 4" />
      <rect x="22" y="26" width="36" height="20" rx="2" />
      <rect x="22" y="52" width="36" height="20" rx="2" />
      <rect x="22" y="78" width="36" height="20" rx="2" />
      <path d="M58 36h20v52h-8 M58 62h12 M58 88h20" />
      <circle cx="92" cy="62" r="14" />
      <path d="M86 62l4 4 8-9" />
    </svg>
  );
}

/** GTM 자동 설치 — 컨테이너 안으로 스니펫이 주입됩니다. */
function InstallGlyph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...BASE} {...props}>
      <rect x="18" y="40" width="52" height="52" rx="2" strokeDasharray="3 4" />
      <path d="M18 54h52" />
      <path d="M28 47h4 M38 47h4" />
      <path d="M96 20v34a8 8 0 01-8 8H50" />
      <path d="M58 56l-8 6 8 6" />
      <path d="M30 72l-6 6 6 6 M46 72l6 6-6 6 M40 70l-4 20" />
    </svg>
  );
}

/** 히트맵 분석 — 클릭 밀도가 높은 칸일수록 채워집니다. */
function HeatmapGlyph(props: React.SVGProps<SVGSVGElement>) {
  const cells = [
    [0, 0, 0.1], [1, 0, 0.2], [2, 0, 0.1], [3, 0, 0],
    [0, 1, 0.25], [1, 1, 0.75], [2, 1, 0.5], [3, 1, 0.15],
    [0, 2, 0.3], [1, 2, 0.95], [2, 2, 0.6], [3, 2, 0.2],
    [0, 3, 0.1], [1, 3, 0.35], [2, 3, 0.25], [3, 3, 0.05],
  ];

  return (
    <svg {...BASE} {...props}>
      {cells.map(([col, row, density]) => (
        <rect
          key={`${col}-${row}`}
          x={20 + col * 21}
          y={20 + row * 21}
          width="19"
          height="19"
          fill="currentColor"
          fillOpacity={density}
        />
      ))}
      <rect x="20" y="20" width="82" height="82" strokeDasharray="3 4" />
      <path d="M66 62l16 22-6 1 3 9-4 1-3-9-5 4z" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** 상세페이지 진단 — 페이지를 훑는 스캔선과 5축 점수 막대. */
function DetailGlyph(props: React.SVGProps<SVGSVGElement>) {
  const bars = [30, 22, 34, 18, 27];

  return (
    <svg {...BASE} {...props}>
      <rect x="20" y="16" width="46" height="88" rx="2" strokeDasharray="3 4" />
      <path d="M28 28h30 M28 38h22 M28 62h30 M28 70h18" />
      <rect x="28" y="46" width="30" height="10" fill="currentColor" fillOpacity="0.2" />
      <path d="M14 58h58" strokeWidth="1.5" />
      {bars.map((height, i) => (
        <path key={i} d={`M${78 + i * 8} 96v-${height}`} strokeWidth="2" />
      ))}
      <path d="M74 100h40" strokeDasharray="3 4" />
    </svg>
  );
}

/** 데이터 퍼포먼스 — 누적 성과 위로 추세선이 올라갑니다. */
function PerformanceGlyph(props: React.SVGProps<SVGSVGElement>) {
  const bars = [
    [24, 22], [42, 34], [60, 28], [78, 48], [96, 62],
  ];

  return (
    <svg {...BASE} {...props}>
      <path d="M14 100h96 M14 100V14" strokeDasharray="3 4" />
      {bars.map(([x, height]) => (
        <rect
          key={x}
          x={x - 6}
          y={100 - height}
          width="12"
          height={height}
          fill="currentColor"
          fillOpacity="0.14"
        />
      ))}
      <path d="M24 82L42 68 60 72 78 48 96 30" strokeWidth="1.5" />
      <path d="M84 26h14v14" />
      <circle cx="96" cy="30" r="3" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** 기능 순서와 1:1로 대응합니다 — CAPABILITIES와 인덱스를 맞춰 두세요. */
export const CAPABILITY_GLYPHS = [
  MarketGlyph,
  TrackingGlyph,
  InstallGlyph,
  HeatmapGlyph,
  DetailGlyph,
  PerformanceGlyph,
];
