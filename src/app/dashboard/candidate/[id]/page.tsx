"use client";

import { use } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, FileCode, GitCommit, GitPullRequest, TrendingUp } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CandidatePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    // Mock data based on ID
    const candidate = {
        id: id,
        name: `James Doe ${id}`,
        role: "시니어 백엔드 엔지니어",
        matchScore: 90 + parseInt(id),
        valkyrieSummary: "복잡한 아키텍처 리팩토링을 통해 분산 시스템에 대한 탁월한 이해도를 증명했습니다. 오픈소스 프로젝트에서 높은 커밋 대비 영향력 비율을 보여줍니다.",
        topSkills: ["Python", "Django", "PostgreSQL", "System Design"],
        metrics: {
            commits: 1243,
            impactScore: "상위 1%",
            prMerges: 142
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex items-center gap-4">
                <Link href="/dashboard">
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary/80">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-4xl font-bold tracking-tight">{candidate.name}</h1>
                    <p className="text-muted-foreground text-lg">{candidate.role}</p>
                </div>
                <div className="ml-auto">
                    <div className="px-5 py-2 rounded-full bg-green-500/20 text-green-400 font-bold border border-green-500/20 text-lg shadow-sm">
                        {candidate.matchScore}% 일치
                    </div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Main Analysis */}
                <Card className="md:col-span-2 border-0 shadow-lg bg-secondary/20 backdrop-blur-xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-2xl">
                            <SparklesIcon className="h-6 w-6 text-blue-500" />
                            Valkyrie 분석 리포트
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <p className="text-xl leading-relaxed font-light text-foreground/90">
                            "{candidate.valkyrieSummary}"
                        </p>

                        <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 space-y-3">
                            <div className="flex items-center gap-2 font-semibold text-lg text-indigo-400">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="m9 12 2 2 4-4" /></svg>
                                AI 성향 분석 (INTJ - 전략가형)
                            </div>
                            <p className="text-base text-muted-foreground leading-relaxed">
                                AI와의 이메일 대화 분석 결과, 논리적이고 체계적인 사고를 선호합니다.
                                문제 해결 시 <strong>"왜(Why)"</strong>를 중요하게 생각하며, 팀 내에서 기술적 방향성을 제시하는 역할을 선호합니다.
                                반복적인 업무보다는 창의적이고 복잡한 아키텍처 설계에 강한 동기를 느낍니다.
                            </p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 pt-4">
                            <div className="p-6 rounded-2xl bg-background/40 border border-white/5 space-y-3">
                                <div className="flex items-center gap-2 font-semibold text-lg text-blue-400">
                                    <FileCode className="h-5 w-5" /> 코드 품질
                                </div>
                                <p className="text-base text-muted-foreground leading-relaxed">
                                    테스트 커버리지 94%의 자기 문서화된 코드를 지속적으로 작성합니다.
                                    2023년 레거시 모듈 리팩토링으로 기술 부채를 약 40% 감소시켰습니다.
                                </p>
                            </div>
                            <div className="p-6 rounded-2xl bg-background/40 border border-white/5 space-y-3">
                                <div className="flex items-center gap-2 font-semibold text-lg text-purple-400">
                                    <GitPullRequest className="h-5 w-5" /> 아키텍처 영향력
                                </div>
                                <p className="text-base text-muted-foreground leading-relaxed">
                                    "Alpha 프로젝트"에서 동기식 REST API를 이벤트 기반 아키텍처로 전환하느 것을 주도했습니다.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Sidebar Stats */}
                <div className="space-y-6">
                    <Card className="border-0 shadow-lg bg-secondary/20 backdrop-blur-xl">
                        <CardHeader>
                            <CardTitle className="text-xl">영향력 지표</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex justify-between items-center p-3 rounded-xl bg-background/30 hover:bg-background/40 transition-colors">
                                <div className="flex items-center gap-3 text-base text-muted-foreground">
                                    <TrendingUp className="h-5 w-5" /> 임팩트 점수
                                </div>
                                <div className="font-bold text-blue-400 text-lg">{candidate.metrics.impactScore}</div>
                            </div>
                            <div className="flex justify-between items-center p-3 rounded-xl bg-background/30 hover:bg-background/40 transition-colors">
                                <div className="flex items-center gap-3 text-base text-muted-foreground">
                                    <GitCommit className="h-5 w-5" /> 총 커밋
                                </div>
                                <div className="font-bold text-lg">{candidate.metrics.commits}</div>
                            </div>
                            <div className="flex justify-between items-center p-3 rounded-xl bg-background/30 hover:bg-background/40 transition-colors">
                                <div className="flex items-center gap-3 text-base text-muted-foreground">
                                    <GitPullRequest className="h-5 w-5" /> PR 병합
                                </div>
                                <div className="font-bold text-lg">{candidate.metrics.prMerges}</div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg bg-secondary/20 backdrop-blur-xl">
                        <CardHeader>
                            <CardTitle className="text-xl">핵심 역량</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {candidate.topSkills.map(skill => (
                                    <div key={skill} className="px-3 py-1.5 rounded-lg bg-background/50 text-foreground text-sm font-medium border border-white/10">
                                        {skill}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Button size="lg" className="w-full h-14 text-lg rounded-xl shadow-lg bg-blue-600 hover:bg-blue-700">
                        인터뷰 요청하기
                    </Button>
                </div>
            </div>
        </div>
    );
}

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        </svg>
    );
}
