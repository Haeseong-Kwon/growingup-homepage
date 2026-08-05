"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { CAPABILITY_GLYPHS } from "@/components/home/autopilot-glyphs";

const AUTOPILOT_URL = "https://www.autopilot.it.kr/";

interface Capability {
  title: string;
  latin: string;
  description: string;
}

/** 오토파일럿 공식 사이트에 공개된 기능 정의를 그대로 따릅니다. */
const CAPABILITIES: Capability[] = [
  {
    title: "시장 진단",
    latin: "Market",
    description: "경쟁 구도와 검색 수요를 분석해 진입 여부를 리포트로 판단합니다.",
  },
  {
    title: "추적 세팅",
    latin: "Tracking",
    description: "GTM·GA4·Meta Pixel 설치 상태를 진단하고 SEO 스코어를 매깁니다.",
  },
  {
    title: "GTM 자동 설치",
    latin: "Install",
    description: "컨테이너를 생성해 쇼핑몰에 스니펫을 직접 주입합니다.",
  },
  {
    title: "히트맵 분석",
    latin: "Heatmap",
    description: "방문자의 클릭과 스크롤 심도를 익명으로 수집해 시각화합니다.",
  },
  {
    title: "상세페이지 진단",
    latin: "Detail page",
    description: "메시지·차별점·신뢰·설득구조·검색노출 5축으로 분석합니다.",
  },
  {
    title: "데이터 퍼포먼스",
    latin: "Performance",
    description: "종합 진단·기여도·KPI 달성률을 내고 다음 액션을 처방합니다.",
  },
];

const FACES = CAPABILITIES.length;
/** 정육각 프리즘: 한 면당 60°. */
const STEP = 360 / FACES;
/** 외접 반지름 = (면 높이 / 2) / tan(30°). 면이 서로 정확히 맞물리는 유일한 값. */
const RADIUS = "calc(var(--face-h) * 0.8660254)";
const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * 면마다 "멈춤 → 회전"을 반복하도록 스크럽 구간을 만듭니다. 등속으로 300°를
 * 돌리면 각 면이 정면에 머무는 순간이 없어 읽히지 않습니다.
 */
function buildScrub() {
  const input: number[] = [];
  const output: number[] = [];

  for (let i = 0; i < FACES; i += 1) {
    const base = i / FACES;
    input.push(base, base + 0.58 / FACES);
    output.push(-i * STEP, -i * STEP);
  }
  input.push(1);
  output.push(-(FACES - 1) * STEP);

  return { input, output };
}

const SCRUB = buildScrub();

function FaceCard({ capability, index }: { capability: Capability; index: number }) {
  const Glyph = CAPABILITY_GLYPHS[index];

  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden border border-dashed border-[var(--rule)] bg-[var(--ink-soft)] p-6 md:p-8">
      {/* 기능별 라인 그래픽. currentColor라 면이 물러날 때 함께 어두워집니다. */}
      <Glyph
        aria-hidden
        className="pointer-events-none absolute right-5 top-1/2 h-[clamp(88px,11vw,148px)] w-[clamp(88px,11vw,148px)] -translate-y-1/2 text-white/30 md:right-8"
      />

      <div className="relative flex items-start justify-between gap-4">
        <span className="t-label text-white/45">
          {String(index + 1).padStart(2, "0")} / {capability.latin}
        </span>
        <span className="t-label text-white/35">Autopilot</span>
      </div>

      {/* 글리프 폭만큼 비워 둡니다 — 좁은 카드에서 본문이 그래픽 위로 흘러갑니다. */}
      <div className="relative pr-[clamp(100px,12vw,168px)]">
        <h3 className="text-[clamp(26px,2.8vw,52px)] font-semibold leading-none tracking-[-0.03em] text-white">
          {capability.title}
        </h3>
        <p className="mt-3 t-body text-white/60">{capability.description}</p>
      </div>
    </div>
  );
}

/**
 * 프리즘의 한 면. 정면에서 멀어진 각도만큼 잉크로 덮어 어둡게 만듭니다 — 이게
 * 없으면 뒤로 물러난 면의 글자가 정면 카드 위아래에 유령처럼 겹쳐 읽힙니다.
 */
function PrismFace({
  capability,
  index,
  rotateX,
}: {
  capability: Capability;
  index: number;
  rotateX: MotionValue<number>;
}) {
  const shade = useTransform(rotateX, (deg) => {
    const angle = (((deg + index * STEP) % 360) + 360) % 360;
    const away = Math.min(angle, 360 - angle); // 0 = 정면, 180 = 정반대
    return Math.min(0.92, (away / STEP) * 0.74);
  });

  return (
    <div
      className="absolute inset-0"
      style={{
        transform: `rotateX(${index * STEP}deg) translateZ(${RADIUS})`,
        backfaceVisibility: "hidden",
      }}
    >
      <FaceCard capability={capability} index={index} />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[var(--ink)]"
        style={{ opacity: shade }}
      />
    </div>
  );
}

/**
 * AOP와 공동 개발한 오토파일럿을 소개하는 섹션. 여섯 개 기능이 정육각 프리즘의
 * 각 면에 붙어 있고, 섹션이 핀 고정된 동안 스크롤이 프리즘을 X축으로 돌립니다.
 * 크로스페이드가 아니라 실제 3D 변환(preserve-3d + translateZ)이라 면과 면
 * 사이의 모서리가 회전 내내 살아 있습니다.
 *
 * 좁은 화면과 reduced-motion에서는 회전 없이 카드 그리드로 떨어집니다.
 */
export function AutopilotSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [canPin, setCanPin] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const measure = () => {
      setCanPin(
        window.matchMedia("(min-width: 1024px)").matches && !prefersReducedMotion
      );
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [prefersReducedMotion]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const rawRotate = useTransform(scrollYProgress, SCRUB.input, SCRUB.output);
  const rotateX = useSpring(rawRotate, {
    stiffness: 78,
    damping: 22,
    mass: 0.5,
    restDelta: 0.01,
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    // +0.21은 회전 구간의 중간점. 이게 없으면 프리즘이 이미 다음 면을 보여주는
    // 동안에도 왼쪽 목록은 직전 면을 짚고 있습니다.
    const i = Math.floor(value * FACES + 0.21);
    setActive(Math.min(FACES - 1, Math.max(0, i)));
  });

  /** 제품 썸네일 자체가 플랫폼으로 가는 링크입니다. */
  const cta = (
    <a
      href={AUTOPILOT_URL}
      target="_blank"
      rel="noreferrer noopener"
      className="group img-gray flex items-center gap-5 border border-dashed border-[var(--rule)] p-3 transition-colors duration-500 hover:border-white/70"
    >
      <span className="relative block aspect-video w-[clamp(120px,12vw,176px)] shrink-0 overflow-hidden bg-[var(--ink-soft)]">
        <Image
          src="/autopilot-thumbnail.png"
          alt="오토파일럿 플랫폼 홈 화면"
          fill
          sizes="176px"
          className="object-cover object-top transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
        />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block t-label text-white/45">autopilot.it.kr</span>
        <span className="mt-1 flex items-center gap-2 text-[15px] font-semibold uppercase text-white">
          Autopilot 열어보기
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </span>
      </span>
    </a>
  );

  const copy = (
    <div>
      <p className="t-label text-white/45">(Product — Autopilot)</p>
      <MaskReveal
        as="h2"
        lines={["AOP와 함께 만든", "AI 마케팅 실행 시스템"]}
        // t-display는 반폭 컬럼에서 세 줄로 흘러 오른쪽 프리즘과 높이가 어긋납니다.
        className="mt-3 text-[clamp(30px,3.6vw,62px)] font-semibold leading-[0.98] tracking-[-0.03em] text-white"
      />
      <p className="mt-5 max-w-[44ch] t-lead text-white/70">
        감으로 하던 마케팅을 자동 운항으로. 제품 하나만 넣으면 시장 판단, 추적 세팅,
        상세페이지 진단, 데이터 퍼포먼스가 한 흐름으로 이어집니다.
      </p>
      <p className="mt-3 max-w-[44ch] t-body text-white/50">
        그로잉업이 현장에서 검증한 마케팅 실행 방법론을 협력사 AOP와 함께 제품으로
        옮겼습니다.
      </p>
      <div className="mt-7">{cta}</div>
    </div>
  );

  /** 회전과 동기화되는 인덱스. 지금 정면에 있는 면을 왼쪽에서도 짚어 줍니다. */
  const index = (
    <ol className="mt-8 border-t border-dashed border-[var(--rule)]">
      {CAPABILITIES.map((capability, i) => (
        <li
          key={capability.title}
          className="flex items-baseline gap-4 border-b border-dashed border-[var(--rule)] py-2"
        >
          <span
            className="t-label transition-colors duration-500"
            style={{ color: i === active ? "#fff" : "rgba(255,255,255,0.35)" }}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <span
            className="t-body transition-all duration-500"
            style={{
              color: i === active ? "#fff" : "rgba(255,255,255,0.4)",
              transform: i === active ? "translateX(6px)" : "none",
            }}
          >
            {capability.title}
          </span>
          <span className="ml-auto t-label text-white/25">{capability.latin}</span>
        </li>
      ))}
    </ol>
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--ink)] text-white"
      // 면 하나당 약 0.8 뷰포트: 멈춤과 회전이 모두 읽힐 만큼의 스크롤 거리.
      style={canPin ? { height: `${100 + (FACES - 1) * 80}svh` } : undefined}
    >
      {canPin ? (
        <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden pt-[var(--header-h)]">
          <div className="grid w-full grid-cols-2 items-center gap-16 rail">
            <div>
              {copy}
              {index}
            </div>

            {/* 스테이지: perspective는 회전하지 않는 래퍼에 둡니다. 변환된
                엘리먼트는 자체 컨테이닝 블록을 만들어 자식의 3D를 평면화합니다. */}
            <div
              className="relative"
              style={
                {
                  "--face-h": "clamp(200px, 20vw, 300px)",
                  perspective: "1500px",
                } as React.CSSProperties
              }
            >
              <motion.div
                className="relative mx-auto h-[var(--face-h)] w-full max-w-[560px] [transform-style:preserve-3d]"
                style={{ rotateX }}
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, margin: "-15% 0px -15% 0px" }}
                transition={{ duration: 1, ease: EASE }}
              >
                {CAPABILITIES.map((capability, i) => (
                  <PrismFace
                    key={capability.title}
                    capability={capability}
                    index={i}
                    rotateX={rotateX}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-[12vh] rail">
          {copy}
          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {CAPABILITIES.map((capability, i) => (
              <motion.li
                key={capability.title}
                className="h-full"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
                transition={{ duration: 0.85, ease: EASE, delay: i * 0.06 }}
              >
                <FaceCard capability={capability} index={i} />
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
