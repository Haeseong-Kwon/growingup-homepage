"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { VideoHero } from "@/components/hero/video-hero";
import { MediaReveal } from "@/components/motion/media-reveal";
import {
  Calendar,
  Target,
  ChevronRight,
  Clock,
  Star,
  LogIn,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

// 더미 데이터: 진행 중인 캠페인
const campaigns = [
  {
    id: 1,
    title: "신규 D2C 브랜드 런칭 캠페인",
    date: "2024.01.15 - 2024.03.15",
    objective: "첫 1,000 고객 확보 / 손익분기점 도달",
    progress: 45,
    description:
      "헬스케어 분야 신규 D2C 브랜드의 정식 런칭을 위한 종합 마케팅 캠페인. 포지셔닝부터 첫 1,000 고객 확보까지.",
    status: "진행중",
  },
  {
    id: 2,
    title: "SaaS 제품 한국 시장 진출",
    date: "2024.02.01 - 2024.04.30",
    objective: "월간 100건 B2B 리드 확보",
    progress: 20,
    description:
      "글로벌 SaaS 제품의 한국 시장 로컬라이징 및 B2B 리드 확보 캠페인.",
    status: "진행중",
  },
];

// 더미 데이터: 진행 현황 타임라인
const timelineItems = [
  {
    date: "2024.02.08",
    title: "Week 1: 시장 분석 착수",
    desc: "한국 SaaS 시장 현황 리서치 시작. 경쟁사 5개 벤치마킹.",
  },
  {
    date: "2024.01.29",
    title: "Week 2: 크리에이티브 시스템 구축",
    desc: "핵심 메시지 프레임워크 확정. 광고 소재 10종 제작 착수.",
  },
  {
    date: "2024.01.22",
    title: "Week 1: 킥오프 완료",
    desc: "브랜드 포지셔닝 워크숍 진행. 타겟 페르소나 3개 정의 완료.",
  },
];

// 더미 데이터: 미션 보드
const missions = [
  {
    id: 1,
    title: "인스타그램 릴스 3개 제작",
    stars: 3,
    deliver: "제출물: 릴스 영상 3개 (MP4)",
  },
  {
    id: 2,
    title: "랜딩페이지 히어로 섹션 디자인",
    stars: 3,
    deliver: "제출물: 피그마 파일",
  },
  {
    id: 3,
    title: "SNS 배너 5종 제작",
    stars: 3,
    deliver: "제출물: 배너 이미지 5종",
  },
  {
    id: 4,
    title: "블로그 리뷰 포스팅 작성",
    stars: 3,
    deliver: "제출물: 블로그 포스팅 초안",
  },
  {
    id: 5,
    title: "메타 광고 A/B 테스트 세팅",
    stars: 3,
    deliver: "제출물: 캠페인 세팅 스크린샷 + 구조표",
  },
  {
    id: 6,
    title: "한국 SaaS 시장 경쟁 분석",
    stars: 4,
    deliver: "제출물: 분석표 (스프레드시트)",
  },
  {
    id: 7,
    title: "경쟁사 광고 소재 분석",
    stars: 3,
    deliver: "제출물: 분석 리포트 (PDF/노션)",
  },
  {
    id: 8,
    title: "B2B 리드 확보 전략 초안",
    stars: 4,
    deliver: "제출물: 전략 문서 (PDF/노션)",
  },
];

// 캠페인 카드 컴포넌트
function CampaignCard({
  campaign,
  onClick,
}: {
  campaign: typeof campaigns[0];
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group h-full flex flex-col justify-between p-8 cursor-pointer transition-all duration-300",
        "bg-white border-2 border-[var(--brand-fg)] hover:bg-[var(--brand-fg)] hover:text-white"
      )}
    >
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4">
          <Badge
            variant="outline"
            className="rounded-none border-[var(--brand-fg)] text-[var(--brand-fg)] group-hover:border-white group-hover:text-white transition-colors"
          >
            {campaign.status}
          </Badge>
          <ArrowUpRight className="w-6 h-6 text-[var(--brand-fg)] opacity-0 group-hover:opacity-100 group-hover:stroke-white transition-all duration-300 -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0" />
        </div>

        <h3 className="text-2xl font-bold leading-tight group-hover:text-white transition-colors">
          {campaign.title}
        </h3>

        <div className="space-y-4 pt-4 border-t border-[var(--brand-fg)]/10 group-hover:border-white/20">
          <div className="flex justify-between items-center text-sm">
            <span className="opacity-60 group-hover:text-white/70">기간</span>
            <span className="font-bold group-hover:text-white">{campaign.date}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="opacity-60 group-hover:text-white/70">목표</span>
            <span className="font-bold group-hover:text-white">{campaign.objective}</span>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-[var(--brand-fg)]/10 group-hover:border-white/20">
        <div className="flex justify-between items-end mb-2">
          <span className="text-xs font-bold uppercase tracking-widest opacity-60 group-hover:text-white/70">Progress</span>
          <span className="text-xl font-black text-[var(--brand-primary)] group-hover:text-white">{campaign.progress}%</span>
        </div>
        <div className="h-2 w-full bg-[var(--brand-fg)]/10 group-hover:bg-white/20">
          <div
            className="h-full bg-[var(--brand-primary)] group-hover:bg-white transition-all duration-500"
            style={{ width: `${campaign.progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

// 미션 카드 컴포넌트
function MissionCard({
  mission,
  onClick,
}: {
  mission: typeof missions[0];
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group flex flex-col justify-between p-6 cursor-pointer transition-all duration-300 h-full",
        "bg-white border-2 border-[var(--brand-fg)] hover:bg-[var(--brand-fg)] hover:text-white",
        "text-[var(--brand-fg)]"
      )}
    >
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-1">
            {Array.from({ length: mission.stars }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[var(--brand-primary)] text-[var(--brand-primary)] group-hover:fill-white group-hover:text-white transition-colors" />
            ))}
          </div>
          <Badge className="rounded-none bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-primary)]/90 group-hover:bg-white group-hover:text-[var(--brand-fg)] transition-colors">
            참여 가능
          </Badge>
        </div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors leading-tight">
          {mission.title}
        </h3>
      </div>

      <div className="mt-6 pt-4 border-t border-[var(--brand-fg)]/10 group-hover:border-white/20">
        <p className="text-sm font-medium opacity-70 group-hover:text-white/80 transition-colors">
          {mission.deliver}
        </p>
      </div>
    </div>
  );
}

export default function ArenaPage() {
  const [inviteCode, setInviteCode] = useState("");
  const [inviteMessage, setInviteMessage] = useState("");

  const handleInviteSubmit = () => {
    if (!inviteCode.trim()) {
      setInviteMessage("초대코드를 입력해 주세요");
      setTimeout(() => setInviteMessage(""), 3000);
      return;
    }
    setInviteMessage("확인되었습니다(데모)");
    setTimeout(() => {
      setInviteMessage("");
      setInviteCode("");
    }, 3000);
  };

  const handleCampaignClick = () => {
    alert("준비 중");
  };

  const handleMissionClick = () => {
    alert("신청 기능은 준비 중");
  };

  return (
    <div className="w-full overflow-x-clip">
      {/* 1) Hero 섹션 */}
      <VideoHero
        line1="ARENA"
        line2="PROGRAM"
        subtitle="반나절 단위 미션 기반 협업 프로그램. 고정 근무 없이, 포트폴리오에 바로 넣을 수 있는 결과물을 만듭니다."
      />

      {/* 2) 초대코드 바 */}
      <section className="py-12 border-b-2 border-[var(--brand-fg)] bg-white">
        <Container>
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-[var(--brand-fg)] mb-2">INVITATION ONLY</h3>
              <p className="text-[var(--brand-fg)]/60">초대코드가 있으신가요? 코드를 입력하고 아레나에 입장하세요.</p>
            </div>

            <div className="w-full md:max-w-md flex flex-col sm:flex-row gap-0">
              <Input
                type="text"
                placeholder="ENTER CODE"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleInviteSubmit();
                }}
                className="h-14 bg-white border-2 border-[var(--brand-fg)] rounded-none text-lg px-6 focus-visible:ring-0 focus-visible:border-[var(--brand-primary)] z-10"
              />
              <Button
                onClick={handleInviteSubmit}
                className="h-14 px-8 bg-[var(--brand-fg)] text-white hover:bg-[var(--brand-primary)] rounded-none text-lg font-bold border-2 border-l-0 border-[var(--brand-fg)]"
              >
                ENTER
              </Button>
            </div>
          </div>
          {inviteMessage && (
            <div className={cn("mt-4 text-right font-bold", inviteMessage.includes("확인") ? "text-[var(--brand-primary)]" : "text-red-500")}>
              {inviteMessage}
            </div>
          )}
        </Container>
      </section>

      {/* 3) 진행 중인 캠페인 섹션 */}
      <Section className="py-20 md:py-32 bg-white">
        <Container>
          <div className="mb-16 md:mb-24">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-[var(--brand-fg)] mb-6">
              ACTIVE<br />CAMPAIGNS
            </h2>
            <p className="text-xl text-[var(--brand-fg)]/60 max-w-2xl">
              현재 진행 중인 실전 마케팅 캠페인에 참여하여<br className="hidden md:block" />
              당신의 실력을 증명하고 보상을 획득하세요.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t-2 border-l-2 border-[var(--brand-fg)]">
            {campaigns.map((campaign, index) => (
              <MediaReveal key={campaign.id} delay={index * 100} intensity="medium" className="col-span-1">
                <div className="border-r-2 border-b-2 border-[var(--brand-fg)] h-full">
                  <CampaignCard campaign={campaign} onClick={handleCampaignClick} />
                </div>
              </MediaReveal>
            ))}

            {/* CTA Card positioned as grid item */}
            <MediaReveal delay={200} intensity="medium" className="col-span-1 md:col-span-2 lg:col-span-1">
              <div className="h-full border-r-2 border-b-2 border-[var(--brand-fg)] bg-[var(--brand-fg)] p-8 md:p-12 flex flex-col justify-center text-white">
                <h3 className="text-3xl font-black mb-4 leading-tight">WANT TO<br />JOIN?</h3>
                <p className="text-white/70 mb-8 text-lg">
                  포트폴리오와 함께 신청해 주세요.<br />
                  검토 후 24시간 내에 연락드립니다.
                </p>
                <Button asChild className="h-14 bg-white text-[var(--brand-fg)] hover:bg-[var(--brand-primary)] hover:text-white rounded-none text-lg font-bold w-full transition-colors">
                  <Link href="/auth">
                    LOGIN TO APPLY
                  </Link>
                </Button>
              </div>
            </MediaReveal>
          </div>
        </Container>
      </Section>

      {/* 4) 미션 보드 섹션 */}
      <Section
        data-palette="dark"
        data-theme="dark"
        className="py-20 md:py-32 bg-[#050505] text-white"
        variant="ink"
      >
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-white">
                MISSION<br />BOARD
              </h2>
              <p className="text-xl text-white/60 max-w-xl">
                반나절이면 완료할 수 있는 마이크로 미션.<br className="hidden md:block" />
                완료 즉시 기여도를 인정받고 크레딧을 적립하세요.
              </p>
            </div>
            <div className="hidden md:block text-right">
              <div className="text-sm font-bold uppercase tracking-widest text-[var(--brand-primary)] mb-2">Live Status</div>
              <div className="text-4xl font-black">{missions.length} Missions Open</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {missions.map((mission, index) => (
              <MediaReveal key={mission.id} delay={index * 50} intensity="subtle">
                <MissionCard mission={mission} onClick={handleMissionClick} />
              </MediaReveal>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
