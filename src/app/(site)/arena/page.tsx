import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ArenaPage() {
  const projects = [
    {
      title: "프로젝트 Alpha",
      description: "디지털 마케팅 캠페인 진행 중",
      status: "진행 중",
      progress: 65,
    },
    {
      title: "프로젝트 Beta",
      description: "브랜드 리뉴얼 컨셉 개발",
      status: "진행 중",
      progress: 40,
    },
  ];

  const missions = [
    { title: "시장 조사 완료", status: "완료", date: "2026.01.20" },
    { title: "경쟁사 분석 리포트 작성", status: "진행중", date: "2026.01.22" },
    { title: "고객 인터뷰 진행", status: "대기", date: "2026.01.25" },
    { title: "프로토타입 개발", status: "대기", date: "2026.01.28" },
    { title: "사용자 테스트 실시", status: "대기", date: "2026.02.01" },
  ];

  return (
    <>
      {/* Hero */}
      <Section className="pt-24 md:pt-32 lg:pt-40 border-b">
        <Container>
          <h1 className="text-balance mb-6">아레나</h1>
          <p className="section-subtitle">
            진행 중인 프로젝트와 미션을 확인하세요.
          </p>
        </Container>
      </Section>

      {/* Active Projects */}
      <Section title="진행 중인 프로젝트" className="border-b">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="border hover:border-[var(--brand-primary)]/30 transition-all"
              >
                <CardHeader className="p-6 md:p-8">
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-xl md:text-2xl font-medium tracking-tight">
                      {project.title}
                    </CardTitle>
                    <span className="text-xs px-3 py-1 rounded-full bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]">
                      {project.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="px-6 md:px-8 pb-6 md:pb-8 space-y-5">
                  <p className="text-sm text-[var(--brand-fg)]/60 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--brand-fg)]/70">진행률</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <div className="h-2 bg-[var(--brand-muted-light)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[var(--brand-primary)] transition-all rounded-full"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Missions - 라인 기반 리스트 */}
      <Section title="미션 리스트">
        <Container>
          <div className="max-w-4xl">
            <div className="border rounded-xl overflow-hidden">
              {missions.map((mission, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-5 md:p-6 hover:bg-[var(--brand-muted-light)]/50 transition-colors ${
                    index !== missions.length - 1 ? "border-b" : ""
                  }`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        mission.status === "완료"
                          ? "bg-[var(--brand-secondary)]"
                          : mission.status === "진행중"
                          ? "bg-[var(--brand-primary)]"
                          : "bg-[var(--brand-muted)]"
                      }`}
                    />
                    <span className="text-sm md:text-base font-medium">
                      {mission.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-[var(--brand-fg)]/50">
                      {mission.date}
                    </span>
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        mission.status === "완료"
                          ? "bg-[var(--brand-secondary)]/10 text-[var(--brand-secondary)]"
                          : mission.status === "진행중"
                          ? "bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]"
                          : "bg-[var(--brand-muted-light)] text-[var(--brand-fg)]/50"
                      }`}
                    >
                      {mission.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
