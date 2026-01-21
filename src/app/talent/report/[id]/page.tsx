"use client";

import { use, useState, useEffect } from "react";
import { ArrowLeft, CheckCircle, Mail, MessageSquare, Star, Clock, User, Briefcase, Code, MapPin, Send, Target, Layout, Zap, MessagesSquare, CheckCircle2, AlertTriangle, FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// Mock Data adapted for Persona Sheet
const MOCK_PROFILES: Record<string, any> = {
    "c1": {
        name: "김민지",
        role: "Frontend Engineer",
        quote: "사용자 경험을 최우선으로 생각하며, 빠르게 변화하는 초기 스타트업의 역동성을 즐깁니다.",
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
        goals: [
            "Pre-B 단계 스타트업의 빠른 호흡에 적응 가능",
            "디자인 시스템 구축 및 UI 컴포넌트 라이브러리화 경험 보유",
            "기획 단계부터 주도적으로 참여하는 것을 선호함"
        ],
        timeline: [
            { time: "2일 전", icon: User, content: "사람인 지원 접수" },
            { time: "1일 전", icon: Zap, content: "Comes AI 1차 분석 완료 (94%)" },
            { time: "오늘", icon: Mail, content: "인터뷰 제안 대기 중" },
        ]
    },
    "c4": {
        name: "사라 첸",
        role: "Senior Engineer",
        quote: "Rust와 Wasm을 활용한 고성능 웹 애플리케이션 구축에 관심이 많습니다.",
        match: 98,
        source: "GitHub",
        skills: [
            { name: "Rust", level: 95 },
            { name: "System Design", level: 90 },
            { name: "React", level: 85 },
            { name: "WebAssembly", level: 80 }
        ],
        attributes: [
            { label: "경력", value: "6년" },
            { label: "위치", value: "서울, 판교" },
            { label: "학력", value: "KAIST 전산학" },
            { label: "유형", value: "Passive Seeker" }
        ],
        goals: [
            "기술적 챌린지가 있는 환경 선호",
            "글로벌 서비스 경험 희망",
        ],
        timeline: [
            { time: "2일 전", icon: User, content: "GitHub 활동 분석 완료" },
            { time: "1일 전", icon: Zap, content: "Comes AI 매칭 (98%)" },
            { time: "오늘", icon: Mail, content: "아웃바운드 제안 대기" },
        ]
    },
    "c5": {
        name: "데이비드 김",
        role: "Product Engineer",
        quote: "비즈니스 임팩트를 만들어내는 제품 중심의 개발을 지향합니다.",
        match: 92,
        source: "LinkedIn",
        skills: [
            { name: "React Native", level: 90 },
            { name: "Product", level: 85 },
            { name: "Growth", level: 80 }
        ],
        attributes: [
            { label: "경력", value: "5년" },
            { label: "위치", value: "서울, 성수" },
            { label: "학력", value: "UC Berkeley CS" },
            { label: "유형", value: "Open to Work" }
        ],
        goals: [],
        timeline: []
    },
    "c6": {
        name: "알렉스 박",
        role: "AI Engineer",
        quote: "최신 논문을 구현하고 실제 서비스에 적용하는 것을 즐깁니다.",
        match: 91,
        source: "Indent",
        skills: [
            { name: "PyTorch", level: 95 },
            { name: "FastAPI", level: 85 },
            { name: "MLOps", level: 75 }
        ],
        attributes: [
            { label: "경력", value: "4년" },
            { label: "위치", value: "서울, 강남" },
            { label: "학력", value: "서울대 컴퓨터공학" },
            { label: "유형", value: "Passive Seeker" }
        ],
        goals: [],
        timeline: []
    }
};

// Mock Interview Data
const MOCK_INTERVIEW_QA = [
    {
        question: "스타트업 특성상 기획이 자주 변경될 수 있습니다. 이에 대해 어떻게 대처하시나요?",
        answer: "변경은 더 나은 제품을 만들기 위한 과정이라고 생각합니다. 다만, 잦은 변경으로 인한 비효율을 줄이기 위해 컴포넌트 단위의 유연한 설계를 지향하며, 기획 의도를 명확히 파악하려 노력합니다.",
        analysis: "긍정적: 유연성과 구조적 사고를 동시에 보유함."
    },
    {
        question: "우리 팀의 현재 목표는 '안정적인 MVP 출시'입니다. 본인의 강점으로 어떻게 기여할 수 있나요?",
        answer: "저는 빠르지만 깨지지 않는 코드를 작성하는 데 익숙합니다. Tailwind와 Headless UI를 활용해 퍼블리싱 시간을 단축하고, TypeScript로 런타임 에러를 최소화하여 일정 내 출시를 돕겠습니다.",
        analysis: "핵심 강점: 실무 도구 숙련도가 높고 목표 지향적임."
    }
];

export default function CandidatePage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams?: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const { id } = use(params);
    // Unwrap searchParams if it exists, though in recent Next.js it might be a promise. 
    // For simplicity handling both promise and direct object patterns if needed, but treating as Promise per Next.js 15 types is safer or just use client hook if strictly client component.
    // However, since this is "use client" component, we can use `useSearchParams` hook.

    const [candidate, setCandidate] = useState<any>(null);
    const [messages, setMessages] = useState<Array<{ role: 'ai' | 'candidate', text: string, timestamp: string }>>([]);
    const [interviewStatus, setInterviewStatus] = useState<"idle" | "waiting" | "completed">("idle");
    const [replyTime, setReplyTime] = useState<number>(0);

    // Chat Flow State
    const [chatStep, setChatStep] = useState<"intro" | "mbti" | "goals" | "done">("intro");
    const [isSimulating, setIsSimulating] = useState(false);

    useEffect(() => {
        // Initialize with correct ID
        const initialData = MOCK_PROFILES[id] || MOCK_PROFILES["c1"];
        setCandidate({
            ...initialData,
            // In outbound scenario, specific fields might be missing initially
            attributes: initialData.attributes, // We will simulate adding to this
        });

        // Check for outreach trigger (simple check via window if searchParams is complex to type in client component without hook)
        if (typeof window !== 'undefined' && window.location.search.includes('action=outreach')) {
            setInterviewStatus("waiting");
            setMessages([
                {
                    role: 'ai',
                    text: `안녕하세요 ${initialData.name}님, Comes의 AI 리크루터입니다.\n\n${initialData.source}에서 님의 프로필을 인상 깊게 보았습니다.\n현재 ${initialData.role} 포지션에 딱 맞는 분이라 생각되어 연락드립니다.\n\n저희 회사에 대해 간단히 소개를 드려도 될까요?`,
                    timestamp: '방금 전'
                }
            ]);
        }
    }, [id]);

    // Timer logic
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (interviewStatus === 'waiting') {
            interval = setInterval(() => {
                setReplyTime(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [interviewStatus]);

    const handleSendInterviewRequest = () => {
        setInterviewStatus("waiting");
        setMessages([
            {
                role: 'ai',
                text: `안녕하세요 ${candidate.name}님, Comes AI 리크루터입니다.\n\n${candidate.role} 포지션 지원 감사드립니다. 님께서 작성해주신 내용을 바탕으로, 팀 핏(Team Fit)을 더 깊이 이해하기 위해 몇 가지 질문을 드리고자 합니다.\n\n첫 번째 질문입니다.\n"${MOCK_INTERVIEW_QA[0].question}"`,
                timestamp: '방금 전'
            }
        ]);
        setChatStep("intro");
    };

    const handleSimulateReply = () => {
        setIsSimulating(true);

        // Determine response based on current step
        let replyText = "";
        let nextAiQuestion = "";
        let nextStep: typeof chatStep = chatStep;

        if (chatStep === "intro") {
            replyText = "안녕하세요! 연락 주셔서 감사합니다. 회사의 비전이 흥미롭네요. 더 자세한 이야기를 나눠보고 싶습니다.";
            nextAiQuestion = "관심 가져주셔서 감사합니다! \n\n본격적인 대화에 앞서, 님을 더 잘 이해하기 위해 몇 가지 질문을 드려도 될까요?\n\n프로필에 MBTI 정보가 없어서요, 혹시 MBTI가 어떻게 되시나요?";
            nextStep = "mbti";
        } else if (chatStep === "mbti") {
            replyText = "아, 저는 ENFP입니다! 새로운 사람을 만나는 걸 좋아하고 에너지가 넘치는 편이에요.";
            nextAiQuestion = "ENFP시군요! 저희 팀에도 ENFP 동료들이 많아 잘 맞으실 것 같아요.\n\n다음으로, 새로운 팀에서 이루고 싶은 단기적인 목표가 있으신가요?";
            nextStep = "goals";

            // SIDE EFFECT: REAL-TIME PROFILE UPDATE
            setTimeout(() => {
                setCandidate((prev: any) => ({
                    ...prev,
                    attributes: [...prev.attributes, { label: "MBTI", value: "ENFP", isNew: true }]
                }));
            }, 1000);

        } else if (chatStep === "goals") {
            replyText = "저는 1년 안에 팀을 리딩할 수 있는 역량을 기르고, 실제 프로덕트의 0 to 1 과정을 주도해보고 싶습니다.";
            nextAiQuestion = "";
            nextStep = "done";

            // SIDE EFFECT: REAL-TIME PROFILE UPDATE
            setTimeout(() => {
                setCandidate((prev: any) => ({
                    ...prev,
                    goals: [...prev.goals, "0 to 1 프로덕트 리딩 경험 희망"]
                }));
            }, 1000);
        }

        // 1. Post Candidate Reply
        setMessages(prev => [...prev, { role: 'candidate', text: replyText, timestamp: '방금 전' }]);

        // 2. AI Responds or Completes
        setTimeout(() => {
            if (nextStep === "done") {
                setInterviewStatus("completed");
            } else {
                setMessages(prev => [...prev, { role: 'ai', text: nextAiQuestion, timestamp: '방금 전' }]);
                setChatStep(nextStep);
            }
            setIsSimulating(false);
            setReplyTime(0);
        }, 1500); // AI typing delay
    };

    if (!candidate) return <div className="p-10 flex justify-center text-muted-foreground font-taebaek">프로필 로딩 중...</div>;

    return (
        <div className="min-h-screen bg-slate-50/50 p-6 md:p-8 flex justify-center font-taebaek">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-6xl w-full bg-background shadow-lg rounded-[2rem] overflow-hidden border border-border/40"
            >
                {/* Header Section */}
                <header className="p-8 border-b border-border bg-white relative">
                    <Link href="/dashboard" className="absolute top-8 right-8">
                        <Button variant="ghost" className="text-muted-foreground hover:text-foreground font-jamsil">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                        </Button>
                    </Link>

                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                        {/* Avatar Placeholder */}
                        <div className="w-32 h-32 rounded-full bg-slate-100 flex items-center justify-center text-4xl font-bold text-slate-300 border-4 border-white shadow-sm shrink-0 font-jamsil">
                            {candidate.name[0]}
                        </div>

                        <div className="space-y-4 max-w-2xl">
                            <div>
                                <h1 className="text-4xl font-extrabold tracking-tight text-foreground flex items-center gap-4 font-jamsil">
                                    {candidate.name}
                                    <span className="text-3xl font-light text-muted-foreground font-taebaek">/ {candidate.role}</span>
                                </h1>
                                <p className="text-primary font-medium text-lg mt-1 flex items-center gap-2 font-jamsil">
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

                {/* Main Content Area */}
                <div className="grid grid-cols-1 md:grid-cols-12 border-b border-border min-h-[600px]">

                    {/* Left Col: Goals (AI Analysis) - DYNAMICALLY UPDATES */}
                    <div className="md:col-span-4 p-8 border-b md:border-b-0 md:border-r border-border bg-slate-50/30 transition-all">
                        <h3 className="uppercase text-xs font-bold text-muted-foreground tracking-widest mb-6 font-jamsil">PROFILE & GOALS</h3>

                        {/* Attributes List (Dynamic) */}
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-border/50 mb-8">
                            <h4 className="font-bold text-sm mb-4 font-jamsil text-slate-700">핵심 정보</h4>
                            <div className="space-y-3">
                                {candidate.attributes.map((attr: any, i: number) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className={cn("flex justify-between text-sm items-center", attr.isNew && "bg-green-50 p-1 rounded -mx-1")}
                                    >
                                        <span className="text-muted-foreground text-xs font-medium uppercase tracking-wider">{attr.label}</span>
                                        <span className={cn("font-medium", attr.isNew && "text-green-700 font-bold")}>{attr.value}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-3">
                                <h4 className="font-semibold text-lg flex items-center gap-2 font-jamsil">
                                    <Target className="w-5 h-5 text-primary" />
                                    AI 분석 리포트
                                </h4>
                                <ul className="space-y-3">
                                    {candidate.goals.map((goal: string, i: number) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-sm text-foreground/80 leading-relaxed bg-white p-3 rounded-lg border border-border/50 shadow-sm flex items-start gap-2"
                                        >
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                            {goal}
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Right Col: AI Interview Interface */}
                    <div className="md:col-span-8 p-8 relative flex flex-col bg-slate-50/50">
                        <h3 className="uppercase text-xs font-bold text-primary tracking-widest mb-6 font-jamsil flex items-center gap-2">
                            <MessagesSquare className="w-4 h-4" /> AI INTERVIEW & OUTREACH
                        </h3>

                        {/* PHASE 1: IDLE */}
                        {interviewStatus === 'idle' && (
                            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
                                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                    <Mail className="w-10 h-10 text-primary" />
                                </div>
                                <div className="max-w-md space-y-2">
                                    <h2 className="text-2xl font-bold font-jamsil">AI 이메일 인터뷰 시작하기</h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        후보자에게 Comes AI가 생성한 맞춤형 질문지를 발송합니다.<br />
                                        답변이 도착하면 내용을 분석하여 최종 리포트를 생성합니다.
                                    </p>
                                </div>
                                <Button size="lg" onClick={handleSendInterviewRequest} className="font-jamsil shadow-xl hover:scale-105 transition-transform bg-primary text-primary-foreground px-8 py-6 text-lg rounded-full">
                                    <Send className="w-5 h-5 mr-2" /> 인터뷰 요청 메일 발송
                                </Button>
                            </div>
                        )}

                        {/* PHASE 2 & 3: CHAT INTERFACE & REPORT */}
                        {(interviewStatus === 'waiting' || interviewStatus === 'completed') && (
                            <div className="flex-1 flex flex-col space-y-8 h-full">
                                {/* Chat Messages Area */}
                                <div className="space-y-6 pr-4">
                                    <AnimatePresence mode="popLayout">
                                        {messages.map((msg, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                transition={{ duration: 0.4 }}
                                                className={cn(
                                                    "flex gap-4 max-w-2xl",
                                                    msg.role === 'ai' ? "ml-auto flex-row-reverse" : ""
                                                )}
                                            >
                                                <div className={cn(
                                                    "w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm border-2",
                                                    msg.role === 'ai' ? "bg-primary border-primary text-white" : "bg-white border-slate-200 text-slate-500"
                                                )}>
                                                    {msg.role === 'ai' ? <Zap className="w-5 h-5" /> : <User className="w-5 h-5" />}
                                                </div>
                                                <div className={cn(
                                                    "p-5 rounded-3xl shadow-sm border relative",
                                                    msg.role === 'ai'
                                                        ? "bg-primary text-primary-foreground rounded-tr-none border-primary"
                                                        : "bg-white text-foreground rounded-tl-none border-border"
                                                )}>
                                                    <div className="flex items-center gap-2 mb-2 opacity-80 text-xs font-bold uppercase tracking-wider">
                                                        {msg.role === 'ai' ? "Comes AI Recruiter" : candidate.name}
                                                        <span className="font-normal opacity-60 ml-1 normal-case">{msg.timestamp}</span>
                                                    </div>
                                                    <p className="whitespace-pre-wrap leading-relaxed">
                                                        {msg.text}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>

                                    {/* Waiting Indicator & Simulation Control */}
                                    {interviewStatus === 'waiting' && (
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="flex flex-col items-center justify-center py-8 space-y-4"
                                        >
                                            <div className="flex items-center gap-3 text-muted-foreground text-sm animate-pulse">
                                                <div className="flex gap-1">
                                                    <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                                    <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                                    <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                                </div>
                                                {isSimulating ? "답변 입력 중..." : `답변을 기다리고 있습니다... (${replyTime}s)`}
                                            </div>

                                            {/* Create a visual separation line */}
                                            <div className="w-full flex items-center gap-4 text-xs text-muted-foreground/50 py-2">
                                                <div className="h-px bg-border flex-1" />
                                                SIMULATION CONTROLS
                                                <div className="h-px bg-border flex-1" />
                                            </div>

                                            <Button
                                                variant="outline"
                                                size="sm"
                                                disabled={isSimulating}
                                                onClick={handleSimulateReply}
                                                className="bg-white/80 backdrop-blur border-orange-200 text-orange-600 hover:bg-orange-50 hover:text-orange-700 transition-colors shadow-sm"
                                            >
                                                <Zap className={cn("w-3 h-3 mr-2", isSimulating && "text-muted-foreground")} />
                                                {isSimulating ? "답변 생성 중..." : nextStepLabel(chatStep)}
                                            </Button>
                                        </motion.div>
                                    )}
                                </div>

                                {/* ANALYSIS REPORT (Displays after completed) */}
                                {interviewStatus === 'completed' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5, duration: 0.5 }}
                                        className="border-t border-border/60 pt-8 mt-4"
                                    >
                                        <div className="bg-green-50/80 border border-green-200 rounded-2xl p-6 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                                <Target className="w-24 h-24 text-green-800" />
                                            </div>

                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="p-2 bg-green-200 rounded-lg text-green-800">
                                                    <CheckCircle2 className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-green-900 font-jamsil text-lg">AI 답변 분석 및 업데이트 완료</h4>
                                                    <p className="text-sm text-green-800/80">인터뷰를 통해 부족한 프로필 정보를 모두 수집하고 검증했습니다.</p>
                                                </div>
                                            </div>
                                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none absolute top-6 right-6">Updated</Badge>
                                        </div>

                                        <div className="flex gap-4 pt-6 mt-8">
                                            <Button className="flex-1 h-12 text-lg font-jamsil bg-primary hover:bg-primary/90">
                                                커피챗 제안하기
                                            </Button>
                                            <Button variant="outline" className="flex-1 h-12 text-lg font-jamsil">
                                                보류하기
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

// Helper for button label
function nextStepLabel(step: string) {
    if (step === 'intro') return "후보자: 관심 있음 답변 보내기";
    if (step === 'mbti') return "후보자: MBTI (ENFP) 답변 보내기";
    if (step === 'goals') return "후보자: 커리어 목표 답변 보내기";
    return "다음 단계 진행";
}
