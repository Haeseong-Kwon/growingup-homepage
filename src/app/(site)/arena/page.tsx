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
    <Card
      className="h-full border-2 hover:border-white/40 transition-all cursor-pointer group min-w-0 bg-white/5 border-white/10"
      onClick={onClick}
    >
      <CardHeader className="pb-4 min-w-0">
        <div className="flex items-start justify-between gap-4 mb-3 min-w-0">
          <CardTitle className="text-xl md:text-2xl font-bold leading-tight break-words flex-1 min-w-0 text-white">
            {campaign.title}
          </CardTitle>
          <div className="flex flex-col gap-2 shrink-0 min-w-0">
            <Badge
              variant="outline"
              className="bg-[var(--brand-primary)]/20 text-[var(--brand-primary)] border-[var(--brand-primary)]/30 whitespace-nowrap"
            >
              종료
            </Badge>
            <Badge
              variant="secondary"
              className="bg-[var(--brand-secondary)]/20 text-[var(--brand-secondary)] whitespace-nowrap"
            >
              {campaign.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 min-w-0">
        <div className="flex items-center gap-2 text-sm text-white/70 min-w-0">
          <Calendar className="w-4 h-4 shrink-0" />
          <span className="break-words min-w-0">{campaign.date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-white/70 min-w-0">
          <Target className="w-4 h-4 shrink-0" />
          <span className="break-words min-w-0">{campaign.objective}</span>
        </div>
        <div className="space-y-2 min-w-0">
          <div className="flex justify-between text-sm">
            <span className="text-white/70">진행률</span>
            <span className="font-medium text-white">{campaign.progress}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--brand-primary)] transition-all rounded-full"
              style={{ width: `${campaign.progress}%` }}
            />
          </div>
        </div>
        <p className="text-sm text-white/70 leading-relaxed line-clamp-2 break-words min-w-0">
          {campaign.description}
        </p>
        <Button
          variant="ghost"
          className="w-full justify-between hover:bg-white/10 text-white group-hover:text-[var(--brand-primary)] min-w-0"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          <span className="min-w-0">상세 보기</span>
          <ChevronRight className="w-4 h-4 shrink-0" />
        </Button>
      </CardContent>
    </Card>
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
    <Card
      className="h-full border-2 hover:border-white/40 transition-all cursor-pointer min-w-0 bg-white/5 border-white/10"
      onClick={onClick}
    >
      <CardHeader className="pb-3 min-w-0">
        <div className="flex items-start justify-between gap-3 mb-2 min-w-0">
          <CardTitle className="text-lg md:text-xl font-bold leading-tight break-words flex-1 min-w-0 text-white">
            {mission.title}
          </CardTitle>
          <Badge
            variant="outline"
            className="bg-[var(--brand-primary)]/20 text-[var(--brand-primary)] border-[var(--brand-primary)]/30 shrink-0 whitespace-nowrap"
          >
            참여 가능
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 min-w-0">
        <div className="flex items-center gap-4 flex-wrap min-w-0">
          <div className="flex items-center gap-1 shrink-0">
            {Array.from({ length: mission.stars }).map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-[var(--brand-primary)] text-[var(--brand-primary)] shrink-0"
              />
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-sm text-white/70 shrink-0">
            <Clock className="w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap">반나절</span>
          </div>
        </div>
        <p className="text-sm text-white/70 leading-relaxed break-words min-w-0">
          {mission.deliver}
        </p>
      </CardContent>
    </Card>
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
        line1="실전 레퍼런스를 만드는 곳"
        line2=""
        subtitle="반나절 단위 미션 기반 협업 프로그램. 고정 근무 없이, 포트폴리오에 바로 넣을 수 있는 결과물을 만듭니다."
      />

      {/* 추가 정보 카드 */}
      <Section
        data-palette="dark"
        data-theme="dark"
        data-section="arena-info"
        variant="ink"
        divider="none"
        minHeight="auto"
        className="py-8 bg-black"
      >
        <Container>
          <div className="max-w-4xl min-w-0">
            <div className="space-y-3">
              <MediaReveal intensity="subtle" delay={0}>
                <Card className="border-2 bg-white/5 border-white/10 min-w-0">
                  <CardContent className="p-4 md:p-6 min-w-0">
                    <p className="text-sm text-white/70 leading-relaxed break-words min-w-0">
                      • 기여자 크레딧 표기는 참여자 선택
                    </p>
                  </CardContent>
                </Card>
              </MediaReveal>
              <MediaReveal intensity="subtle" delay={100}>
                <Card className="border-2 bg-white/5 border-white/10 min-w-0">
                  <CardContent className="p-4 md:p-6 min-w-0">
                    <p className="text-sm text-white/70 leading-relaxed break-words min-w-0">
                      • 상위 기여자는 유료 전환 트랙 우선 제안 가능
                    </p>
                  </CardContent>
                </Card>
              </MediaReveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* 2) 초대코드 바 */}
      <section className="py-8 border-b border-white/10 bg-black">
        <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm md:text-base text-white/70 min-w-0">
              초대코드가 있으신가요?
            </p>

            <div className="w-full md:w-auto md:max-w-[520px] flex flex-col sm:flex-row gap-3 min-w-0">
              <Input
                type="text"
                placeholder="초대코드 입력"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleInviteSubmit();
                  }
                }}
                className="w-full sm:flex-1 min-w-0 bg-white/5 border-white/10 text-white placeholder:text-white/30"
              />
              <Button onClick={handleInviteSubmit} className="w-full sm:w-auto shrink-0 bg-white text-black hover:bg-white/90">
                확인
              </Button>
            </div>
          </div>
          {inviteMessage && (
            <div
              className={cn(
                "mt-3 text-sm min-w-0",
                inviteMessage.includes("확인되었습니다")
                  ? "text-[var(--brand-primary)]"
                  : "text-destructive"
              )}
            >
              {inviteMessage}
            </div>
          )}
        </div>
      </section>

      {/* 3) 진행 중인 캠페인 섹션 */}
      <section className="py-16 md:py-24 bg-black border-t border-white/10">
        <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <MediaReveal intensity="subtle">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 md:mb-12 min-w-0 text-white">
              진행 중인 캠페인
            </h2>
          </MediaReveal>

          <div className="grid gap-8 lg:grid-cols-12 items-start">
            {/* LEFT: 캠페인 리스트 */}
            <div className="lg:col-span-8 min-w-0">
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 items-stretch auto-rows-fr">
                {campaigns.map((campaign, index) => (
                  <MediaReveal key={campaign.id} delay={index * 100} intensity="medium">
                    <div className="min-w-0 h-full">
                      <CampaignCard
                        campaign={campaign}
                        onClick={handleCampaignClick}
                      />
                    </div>
                  </MediaReveal>
                ))}
              </div>
            </div>

            {/* RIGHT: 신청 CTA */}
            <aside className="lg:col-span-4 min-w-0">
              <MediaReveal intensity="medium" delay={200}>
                <div className="rounded-2xl bg-[var(--brand-primary)]/20 text-white p-6 md:p-7 shadow-sm border border-[var(--brand-primary)]/30">
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-white min-w-0">
                    참여하고 싶으신가요?
                  </h3>
                  <p className="text-sm md:text-base text-white/90 leading-relaxed mb-4 break-words min-w-0">
                    포트폴리오와 함께 신청해 주세요. 검토 후 연락드립니다.
                  </p>
                  <Button
                    asChild
                    variant="secondary"
                    className="w-full bg-white text-[var(--brand-primary)] hover:bg-white/90"
                  >
                    <Link href="/auth" className="min-w-0">
                      <LogIn className="w-4 h-4" />
                      로그인하고 신청하기
                    </Link>
                  </Button>
                </div>
              </MediaReveal>
            </aside>
          </div>
        </div>
      </section>

      {/* 4) 진행 현황 + 미션 보드 섹션 */}
      <Section
        data-palette="dark"
        data-theme="dark"
        data-section="progress-missions"
        variant="ink"
        divider="top"
        minHeight="auto"
      >
        <Container>
          <div className="space-y-12 min-w-0">
            {/* 진행 현황 */}
            <div className="min-w-0">
              <MediaReveal intensity="subtle">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8 min-w-0 text-white">
                  진행 현황
                </h2>
              </MediaReveal>
              <div className="space-y-4">
                {timelineItems.map((item, index) => (
                  <MediaReveal key={index} delay={index * 100} intensity="medium">
                    <Card
                      className="border-2 bg-white/5 border-white/10 p-4 md:p-6 min-w-0"
                    >
                      <div className="flex flex-col sm:flex-row gap-4 min-w-0">
                        <Badge
                          variant="outline"
                          className="w-fit bg-[var(--brand-primary)]/20 text-[var(--brand-primary)] border-[var(--brand-primary)]/30 shrink-0"
                        >
                          {item.date}
                        </Badge>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-lg md:text-xl font-bold mb-2 break-words min-w-0 text-white">
                            {item.title}
                          </h4>
                          <p className="text-sm text-white/70 leading-relaxed break-words min-w-0">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </MediaReveal>
                ))}
              </div>
            </div>

            {/* 미션 보드 */}
            <div className="min-w-0">
              <MediaReveal intensity="subtle">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 min-w-0 text-white">
                  미션 보드
                </h2>
              </MediaReveal>
              <MediaReveal intensity="subtle" delay={100}>
                <p className="text-base md:text-lg text-white/70 mb-6 md:mb-8 leading-relaxed break-words min-w-0">
                  반나절 단위 실전 과제. 완료 시 포트폴리오에 바로 활용
                  가능합니다.
                </p>
              </MediaReveal>
              <div className="grid md:grid-cols-2 gap-4">
                {missions.map((mission, index) => (
                  <MediaReveal key={mission.id} delay={index * 100} intensity="medium">
                    <div className="min-w-0">
                      <MissionCard
                        mission={mission}
                        onClick={handleMissionClick}
                      />
                    </div>
                  </MediaReveal>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
