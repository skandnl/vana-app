"use client";

import { use, useState, useEffect } from "react";
import { ArrowLeft, CheckCircle, Mail, MessageSquare, Star, Clock, User, Briefcase, Code, MapPin, Send, Target, Layout, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// Mock Data adapted for Persona Sheet
const MOCK_PROFILES: Record<string, any> = {
    "c1": {
        name: "김민지",
        role: "Frontend Engineer",
        quote: "사용자 경험을 최우선으로 생각하며, 빠르게 변화하는 초기 스타트업의 역동성을 즐깁니다.", // New field
        match: 94,
        source: "사람인",
        skills: [
            { name: "React / Next.js", level: 90 },
            { name: "TypeScript", level: 85 },
            { name: "Tailwind CSS", level: 95 },
            { name: "UI/UX Design", level: 70 }
        ],
        attributes: [
            { label: "경력", value: "3년" },
            { label: "위치", value: "서울, 강남" },
            { label: "학력", value: "홍익대 시각디자인" },
            { label: "유형", value: "Active Seeker" }
        ],
        goals: [ // Analysis split into points
            "Pre-B 단계 스타트업의 빠른 호흡에 적응 가능",
            "디자인 시스템 구축 및 UI 컴포넌트 라이브러리화 경험 보유",
            "기획 단계부터 주도적으로 참여하는 것을 선호함"
        ],
        timeline: [
            { time: "2일 전", icon: User, content: "사람인 지원 접수" },
            { time: "1일 전", icon: Zap, content: "Vana AI 1차 분석 완료 (94%)" },
            { time: "오늘", icon: Mail, content: "인터뷰 제안 대기 중" },
        ]
    },
    "c4": { // Adding fallback for others if needed, using generic structure
        name: "사라 첸",
        role: "Senior Engineer",
        quote: "확장 가능한 시스템 아키텍처 설계와 오픈소스 기여에 열정을 가지고 있습니다.",
        match: 98,
        source: "GitHub",
        skills: [
            { name: "System Design", level: 95 },
            { name: "Rust", level: 80 },
            { name: "Node.js", level: 90 },
            { name: "React", level: 60 }
        ],
        attributes: [
            { label: "경력", value: "6년" },
            { label: "위치", value: "싱가포르 (Remote)" },
            { label: "학력", value: "NUS CS" },
            { label: "유형", value: "Passive Candidate" }
        ],
        goals: [
            "글로벌 규모의 트래픽을 처리하는 백엔드 시스템 설계",
            "오픈소스 커뮤니티와의 지속적인 교류 및 기여",
            "비동기 커뮤니케이션 기반의 리모트 워크 선호"
        ],
        timeline: [
            { time: "3시간 전", icon: Search, content: "GitHub 활동 감지 (Vana Agent)" },
            { time: "2시간 전", icon: Mail, content: "콜드 메일 발송 (Open Rate: 45%)" },
            { time: "30분 전", icon: MessageSquare, content: "긍정적 회신 수신" },
        ]
    }
};

// Fallback Icon component
function Search(props: any) { return <User {...props} /> }

export default function CandidatePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [candidate, setCandidate] = useState<any>(null);
    const [emailStatus, setEmailStatus] = useState<"idle" | "drafting" | "sent">("idle");

    useEffect(() => {
        setCandidate(MOCK_PROFILES[id] || MOCK_PROFILES["c1"]);
    }, [id]);

    if (!candidate) return <div className="p-10 flex justify-center text-muted-foreground">프로필 로딩 중...</div>;

    const handleSendInterviewRequest = () => {
        setEmailStatus("drafting");
        setTimeout(() => {
            setEmailStatus("sent");
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-50/50 p-8 flex justify-center font-sans">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-6xl w-full bg-background shadow-lg rounded-[2rem] overflow-hidden border border-border/40"
            >
                {/* Header Section */}
                <header className="p-8 border-b border-border bg-white relative">
                    <Link href="/dashboard" className="absolute top-8 right-8">
                        <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                        </Button>
                    </Link>

                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                        {/* Avatar Placeholder */}
                        <div className="w-32 h-32 rounded-full bg-slate-100 flex items-center justify-center text-4xl font-bold text-slate-300 border-4 border-white shadow-sm shrink-0">
                            {candidate.name[0]}
                        </div>

                        <div className="space-y-4 max-w-2xl">
                            <div>
                                <h1 className="text-4xl font-extrabold tracking-tight text-foreground flex items-center gap-4">
                                    {candidate.name}
                                    <span className="text-3xl font-light text-muted-foreground">/ {candidate.role}</span>
                                </h1>
                                <p className="text-primary font-medium text-lg mt-1 flex items-center gap-2">
                                    <Star className="w-4 h-4 fill-primary" />
                                    AI Match Score: {candidate.match}%
                                </p>
                            </div>

                            <blockquote className="text-xl text-muted-foreground italic font-light border-l-4 border-primary/30 pl-4 py-1">
                                "{candidate.quote}"
                            </blockquote>
                        </div>
                    </div>
                </header>

                {/* 3-Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 border-b border-border">
                    {/* Left Col: Goals (AI Analysis) */}
                    <div className="md:col-span-4 p-8 border-b md:border-b-0 md:border-r border-border bg-slate-50/30">
                        <h3 className="uppercase text-xs font-bold text-muted-foreground tracking-widest mb-6">GOALS & NEEDS</h3>
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <h4 className="font-semibold text-lg flex items-center gap-2">
                                    <Target className="w-5 h-5 text-primary" />
                                    AI 분석 리포트
                                </h4>
                                <ul className="space-y-3">
                                    {candidate.goals.map((goal: string, i: number) => (
                                        <li key={i} className="text-sm text-foreground/80 leading-relaxed bg-white p-3 rounded-lg border border-border/50 shadow-sm">
                                            {goal}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Middle Col: Attributes & Org Profile */}
                    <div className="md:col-span-4 p-8 border-b md:border-b-0 md:border-r border-border">
                        <h3 className="uppercase text-xs font-bold text-muted-foreground tracking-widest mb-6">ATTRIBUTES</h3>
                        <div className="bg-slate-50 rounded-xl p-6 border border-border/50 space-y-4">
                            {candidate.attributes.map((attr: any, i: number) => (
                                <div key={i} className="flex justify-between items-center pb-3 border-b border-dashed border-border last:border-0 last:pb-0">
                                    <span className="text-sm font-medium text-muted-foreground">{attr.label}</span>
                                    <span className="text-sm font-bold text-foreground">{attr.value}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8">
                            <h3 className="uppercase text-xs font-bold text-muted-foreground tracking-widest mb-4">SOURCE</h3>
                            <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl border border-primary/10">
                                <div className="p-2 bg-white rounded-full shadow-sm">
                                    <Briefcase className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="font-bold text-foreground">{candidate.source}</p>
                                    <p className="text-xs text-muted-foreground">검증된 소스</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Col: Tasks (Skills) */}
                    <div className="md:col-span-4 p-8 bg-slate-50/30">
                        <h3 className="uppercase text-xs font-bold text-muted-foreground tracking-widest mb-6">SKILLS & TASKS</h3>
                        <div className="space-y-5">
                            {candidate.skills.map((skill: any, i: number) => (
                                <div key={i}>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm font-semibold">{skill.name}</span>
                                        <span className="text-xs font-medium text-muted-foreground">{skill.level}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${skill.level}%` }}
                                            transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                                            className="h-full bg-primary"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-8 border-t border-border">
                            <Button
                                onClick={handleSendInterviewRequest}
                                disabled={emailStatus !== 'idle'}
                                className={cn(
                                    "w-full h-12 text-lg font-bold shadow-lg transition-all",
                                    emailStatus === 'sent' ? "bg-green-500 hover:bg-green-600" : "bg-primary hover:bg-primary/90"
                                )}
                            >
                                {emailStatus === 'idle' && (
                                    <>
                                        AI Mail 인터뷰 시작하기 <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
                                    </>
                                )}
                                {emailStatus === 'drafting' && "AI 에이전트 준비 중..."}
                                {emailStatus === 'sent' && "인터뷰 요청 완료!"}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Bottom: Timeline (Typical Day) */}
                <footer className="p-8 bg-slate-100/50">
                    <h3 className="uppercase text-xs font-bold text-muted-foreground tracking-widest mb-6">AGENT ACTIVITY TIMELINE</h3>
                    <div className="relative pt-4">
                        {/* Timeline Line */}
                        <div className="absolute top-8 left-0 right-0 h-1 bg-border/50 hidden md:block" />

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {candidate.timeline.map((event: any, i: number) => (
                                <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                                    <div className="w-16 h-16 rounded-2xl bg-white border-2 border-border shadow-sm flex items-center justify-center mb-4 group-hover:border-primary group-hover:scale-110 transition-all duration-300">
                                        <event.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </div>
                                    <div className="w-0.5 h-8 bg-border md:hidden mx-auto my-2" />
                                    <h4 className="font-bold text-sm">{event.time}</h4>
                                    <p className="text-xs text-muted-foreground mt-1 px-4">{event.content}</p>
                                </div>
                            ))}

                            {/* Future Step Placeholder */}
                            <div className="relative z-10 flex flex-col items-center text-center opacity-40">
                                <div className="w-16 h-16 rounded-2xl bg-slate-50 border-2 border-dashed border-border flex items-center justify-center mb-4">
                                    <CheckCircle className="w-6 h-6 text-muted-foreground" />
                                </div>
                                <h4 className="font-bold text-sm">Next Step</h4>
                                <p className="text-xs text-muted-foreground mt-1">커피챗(Coffee Chat) 제안</p>
                            </div>
                        </div>
                    </div>
                </footer>
            </motion.div>
        </div>
    );
}
