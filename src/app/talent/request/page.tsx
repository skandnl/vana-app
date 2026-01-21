"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sprout, Loader2, Search, Database, Globe, ListChecks, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { HIRING_GUIDES } from "@/lib/data/hiring-guides";

function TalentRequestContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const rawStage = searchParams.get("stage") || "seed";
    // Ensure accurate type matching
    const stageKey = (Object.keys(HIRING_GUIDES).includes(rawStage) ? rawStage : "seed") as keyof typeof HIRING_GUIDES;
    const guide = HIRING_GUIDES[stageKey];

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loadingStep, setLoadingStep] = useState(0);
    const [selectedFocus, setSelectedFocus] = useState<string[]>([]);

    const loadingMessages = [
        { text: "Vana 에이전트 초기화 중...", icon: Sprout },
        { text: "작성하신 주요 업무(Duties) 분석 중...", icon: ListChecks },
        { text: `${guide.keywords[0]} 및 ${guide.keywords[1]} 역량 검증 체크리스트 생성 중...`, icon: ListChecks },
        { text: "내부 인재 풀 스캔 중 (지원자)...", icon: Database },
        { text: "외부 인재 풀 탐색 중 (LinkedIn, GitHub, etc)...", icon: Globe },
        { text: "문화적 적합성 및 핏 분석 중...", icon: Search },
        { text: "최종 후보자 리포트 생성 중...", icon: Loader2 },
    ];

    useEffect(() => {
        if (isSubmitting) {
            const interval = setInterval(() => {
                setLoadingStep((prev) => {
                    if (prev >= loadingMessages.length - 1) {
                        clearInterval(interval);
                        router.push("/dashboard");
                        return prev;
                    }
                    return prev + 1;
                });
            }, 1500);
            return () => clearInterval(interval);
        }
    }, [isSubmitting, router]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />

            <AnimatePresence mode="wait">
                {!isSubmitting ? (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="w-full max-w-5xl z-10"
                    >
                        <div className="mb-8 text-center space-y-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                                <span className="capitalize">{rawStage.replace("-", " ")} Stage</span>
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight">어떤 인재가 필요하신가요?</h1>
                            <p className="text-muted-foreground">
                                Vana가 {guide.title}에 맞는 최적의 채용 프로세스를 설계합니다.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {/* Left: Hiring Guide Sidebar */}
                            <Card className="md:col-span-1 border-primary/20 bg-primary/5 h-fit sticky top-6 shadow-sm">
                                <CardHeader className="pb-3 border-b border-primary/10 bg-primary/10 rounded-t-xl">
                                    <div className="flex items-center gap-2 text-primary mb-1">
                                        <Lightbulb className="w-4 h-4" />
                                        <span className="font-bold text-sm tracking-wide">STAGE GUIDE</span>
                                    </div>
                                    <CardTitle className="text-lg leading-tight">{guide.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6 pt-6">
                                    <div>
                                        <p className="font-semibold text-sm mb-2 text-foreground/80">💡 핵심 키워드</p>
                                        <div className="flex flex-wrap gap-2">
                                            {guide.keywords.map(k => (
                                                <span key={k} className="px-2.5 py-1 bg-background border border-border/60 rounded-md text-xs font-medium text-muted-foreground shadow-sm">
                                                    #{k}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm mb-2 text-foreground/80">🚀 채용 전략</p>
                                        <p className="text-muted-foreground leading-relaxed text-xs bg-background/50 p-3 rounded-lg border border-border/40">
                                            {guide.strategy}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Right: Input Form */}
                            <Card className="md:col-span-2 border-border/50 bg-card/50 backdrop-blur-sm shadow-xl">
                                <CardContent className="pt-6">
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="role">채용 직군</Label>
                                                <Input id="role" placeholder="예: 초기 엔지니어, PO" required className="bg-background/80 border-input/60" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="experience">경력 (연차)</Label>
                                                <Input id="experience" placeholder="예: 3년 이상" className="bg-background/80 border-input/60" />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="duties">주요 업무 및 해결 과제 (Key Duties) <span className="text-primary">*</span></Label>
                                            <Textarea
                                                id="duties"
                                                placeholder={`예:\n${guide.description}`}
                                                required
                                                className="bg-background/80 border-input/60 min-h-[120px] text-sm leading-relaxed"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="skills">필수 역량</Label>
                                            <Input id="skills" placeholder="예: 기획력, 시장 분석 능력, 빠른 실행력 등" required className="bg-background/80 border-input/60" />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="salary">예산 범위</Label>
                                                <Input id="salary" placeholder="5,000 ~ 8,000만원" className="bg-background/80 border-input/60" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="culture">조직 문화 / 선호 성향</Label>
                                                <Input id="culture" placeholder="예: 빠른 실행력, 자기주도적 성향" className="bg-background/80 border-input/60" />
                                            </div>
                                        </div>

                                        <div className="space-y-3 pt-2">
                                            <div className="flex items-center justify-between">
                                                <Label>AI 면접 중점 사항 (Interview Focus)</Label>
                                                <div className="flex items-center gap-2">
                                                    <Label htmlFor="blind-screening" className="text-xs text-muted-foreground font-normal cursor-pointer">Blind Screening (Bias Reduction)</Label>
                                                    <input type="checkbox" id="blind-screening" className="accent-primary" />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3">
                                                {["문제 해결력", "기술적 깊이", "러닝 커브", "커뮤니케이션"].map((focus) => (
                                                    <div
                                                        key={focus}
                                                        onClick={() => {
                                                            const newSelection = selectedFocus.includes(focus)
                                                                ? selectedFocus.filter(f => f !== focus)
                                                                : [...selectedFocus, focus];
                                                            setSelectedFocus(newSelection);
                                                        }}
                                                        className={cn(
                                                            "flex items-center gap-2 p-3 rounded-lg border transition-all cursor-pointer group",
                                                            selectedFocus.includes(focus)
                                                                ? "bg-primary/10 border-primary shadow-sm"
                                                                : "border-input/60 bg-background/50 hover:bg-primary/5 hover:border-primary/30"
                                                        )}
                                                    >
                                                        <div className={cn(
                                                            "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                                                            selectedFocus.includes(focus) ? "bg-primary border-primary" : "border-muted-foreground"
                                                        )}>
                                                            {selectedFocus.includes(focus) && <span className="text-white text-xs font-bold">✓</span>}
                                                        </div>
                                                        <span className={cn(
                                                            "text-sm transition-colors",
                                                            selectedFocus.includes(focus) ? "text-primary font-semibold" : "text-foreground group-hover:text-primary"
                                                        )}>{focus}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="pt-2">
                                            <Button type="submit" className="w-full text-lg py-7 font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all bg-gradient-to-r from-primary to-purple-600 hover:scale-[1.01]">
                                                AI 체크리스트 생성 및 소싱 시작
                                            </Button>
                                            <p className="text-center text-xs text-muted-foreground mt-3">
                                                Vana AI가 {guide.title}에 맞춰 전 과정을 자동화합니다.
                                            </p>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center text-center space-y-8 z-10 p-8 max-w-md w-full"
                    >
                        <div className="relative w-24 h-24 flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin" />
                            <div className="absolute inset-3 rounded-full border-r-2 border-primary/50 animate-spin -reverse" />
                            <Sprout className="w-8 h-8 text-primary animate-pulse" />
                        </div>

                        <div className="space-y-2 w-full">
                            <h3 className="text-2xl font-bold">{loadingMessages[loadingStep].text}</h3>
                            <p className="text-muted-foreground text-sm">
                                {guide.title}에 최적화된 인재를 찾고 있습니다...
                            </p>
                        </div>

                        <div className="w-full bg-secondary h-1 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-primary"
                                initial={{ width: "0%" }}
                                animate={{ width: `${((loadingStep + 1) / loadingMessages.length) * 100}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function TalentRequestPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <TalentRequestContent />
        </Suspense>
    );
}
