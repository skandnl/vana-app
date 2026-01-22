"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sprout, Loader2, Search, Database, Globe, ListChecks, Lightbulb, Users, ArrowRight, BrainCircuit, CheckCircle2, X, Crown, AlertTriangle, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { HIRING_GUIDES } from "@/lib/data/hiring-guides";
import { TALENT_REQUEST_SCHEMA } from "@/lib/schemas";
import { z } from "zod";

// --- Types ---

type MBTI = "INTJ" | "INTP" | "ENTJ" | "ENTP" | "INFJ" | "INFP" | "ENFJ" | "ENFP" | "ISTJ" | "ISFJ" | "ESTJ" | "ESFJ" | "ISTP" | "ISFP" | "ESTP" | "ESFP";

interface TeamMember {
    id: string;
    name: string;
    role: string;
    mbti: MBTI | "";
    isLeader: boolean;
}

interface RequestState {
    // Step 1: Team & Goal
    teamMembers: TeamMember[];
    teamGoal: string;

    // Step 2: Role Details & Strategy
    strategy: "clone" | "complement";
    role: string;
    experience: string;
    duties: string;
    skills: string; // Comma separated
    salary: string;
    culture: string;

    // Step 3: Interview Config
    interviewFocus: string[];
    customQuestions: string[];
}

interface TeamAnalysisResult {
    dominantTraits: string[];
    deficiencies: string[];
    dnaDescription: string;
    deficiencyDescription: string;
    recommendedPersona: string;
    simulation: {
        score: number;
        scenario: string;
    };
}

const MBTI_OPTIONS: MBTI[] = [
    "ISTJ", "ISFJ", "INFJ", "INTJ",
    "ISTP", "ISFP", "INFP", "INTP",
    "ESTP", "ESFP", "ENFP", "ENTP",
    "ESTJ", "ESFJ", "ENFJ", "ENTJ"
];

// --- Advanced Analysis Logic ---

function calculateTeamDNA(members: TeamMember[]): { scores: Record<string, number>, analysis: TeamAnalysisResult, recommendedMBTI: string } {
    let scores = { EI: 0, SN: 0, TF: 0, JP: 0 };
    let leaderFound = false;

    const leader = members.find(m => m.isLeader);
    const others = members.filter(m => !m.isLeader);

    const getVec = (mbti: string) => {
        if (!mbti) return { EI: 0, SN: 0, TF: 0, JP: 0 };
        return {
            EI: mbti.includes('E') ? 1 : -1,
            SN: mbti.includes('S') ? 1 : -1,
            TF: mbti.includes('T') ? 1 : -1,
            JP: mbti.includes('J') ? 1 : -1
        };
    };

    let leaderVec = { EI: 0, SN: 0, TF: 0, JP: 0 };
    if (leader && leader.mbti) {
        leaderVec = getVec(leader.mbti);
        leaderFound = true;
    }

    let othersVec = { EI: 0, SN: 0, TF: 0, JP: 0 };
    let validOthers = 0;
    others.forEach(m => {
        if (m.mbti) {
            const v = getVec(m.mbti);
            othersVec.EI += v.EI;
            othersVec.SN += v.SN;
            othersVec.TF += v.TF;
            othersVec.JP += v.JP;
            validOthers++;
        }
    });

    if (validOthers > 0) {
        othersVec.EI /= validOthers;
        othersVec.SN /= validOthers;
        othersVec.TF /= validOthers;
        othersVec.JP /= validOthers;
    }

    if (leaderFound && validOthers > 0) {
        scores.EI = (leaderVec.EI + othersVec.EI) / 2;
        scores.SN = (leaderVec.SN + othersVec.SN) / 2;
        scores.TF = (leaderVec.TF + othersVec.TF) / 2;
        scores.JP = (leaderVec.JP + othersVec.JP) / 2;
    } else if (leaderFound) {
        scores = leaderVec;
    } else {
        scores = othersVec;
    }

    const dominantTraits: string[] = [];
    const deficiencies: string[] = [];

    if (scores.EI > 0.3) dominantTraits.push("E (외향)"); else if (scores.EI < -0.3) dominantTraits.push("I (내향)");
    if (scores.SN > 0.3) dominantTraits.push("S (감각)"); else if (scores.SN < -0.3) dominantTraits.push("N (직관)");
    if (scores.TF > 0.3) dominantTraits.push("T (사고)"); else if (scores.TF < -0.3) dominantTraits.push("F (감정)");
    if (scores.JP > 0.3) dominantTraits.push("J (판단)"); else if (scores.JP < -0.3) dominantTraits.push("P (인식)");

    if (scores.EI > 0.5) deficiencies.push("I (신중함)"); else if (scores.EI < -0.5) deficiencies.push("E (에너지)");
    if (scores.SN > 0.5) deficiencies.push("N (상상력)"); else if (scores.SN < -0.5) deficiencies.push("S (실행력)");
    if (scores.TF > 0.5) deficiencies.push("F (공감)"); else if (scores.TF < -0.5) deficiencies.push("T (논리)");
    if (scores.JP > 0.5) deficiencies.push("P (유연성)"); else if (scores.JP < -0.5) deficiencies.push("J (체계)");

    let dnaDesc = "균형 잡힌 팀입니다.";
    if (scores.SN < -0.3 && scores.TF > 0.3) dnaDesc = "전형적인 '혁신가' 조직 (NT): 논리적이고 비전 중심적입니다.";
    else if (scores.SN > 0.3 && scores.JP > 0.3) dnaDesc = "전형적인 '관리자' 조직 (SJ): 체계적이고 안정적입니다.";
    else if (scores.SN < -0.3 && scores.TF < -0.3) dnaDesc = "이상적인 '열정가' 조직 (NF): 의미와 관계를 중시합니다.";
    else if (scores.SN > 0.3 && scores.JP < -0.3) dnaDesc = "자유로운 '활동가' 조직 (SP): 임기응변에 강합니다.";

    let defDesc = "특별한 결핍이 발견되지 않았습니다.";
    if (deficiencies.includes("S (실행력)")) defDesc = "아이디어는 넘치지만, 구체적인 실행과 디테일(S)이 부족할 수 있습니다.";
    else if (deficiencies.includes("F (공감)")) defDesc = "업무 효율은 높지만, 팀 케어와 심리적 유대감(F)이 부족한 건조한 조직일 수 있습니다.";
    else if (deficiencies.includes("J (체계)")) defDesc = "유연하지만, 마감 준수나 체계적인 프로세스(J)가 약할 수 있습니다.";
    else if (deficiencies.includes("N (상상력)")) defDesc = "현실적이지만, 장기적인 비전이나 새로운 시도(N)가 부족할 수 있습니다.";

    const recStr = [
        scores.EI > 0 ? "E" : "I",
        scores.SN > 0 ? "S" : "N",
        scores.TF > 0 ? "T" : "F",
        scores.JP > 0 ? "J" : "P"
    ].join("");

    return {
        scores,
        recommendedMBTI: recStr,
        analysis: {
            dominantTraits,
            deficiencies,
            dnaDescription: dnaDesc,
            deficiencyDescription: defDesc,
            recommendedPersona: "",
            simulation: { score: 0, scenario: "" }
        }
    };
}

function getRecommendation(baseMBTI: string, strategy: "clone" | "complement"): { persona: string, reason: string, conflict: string, score: number } {
    const traits = {
        E: "열정적 소통가", I: "신중한 분석가",
        S: "꼼꼼한 실행가", N: "창의적 전략가",
        T: "논리적 해결사", F: "따뜻한 중재자",
        J: "체계적 계획가", P: "유연한 모험가"
    };

    if (strategy === "clone") {
        return {
            persona: `${baseMBTI} (${traits[baseMBTI[0] as keyof typeof traits]} + ${traits[baseMBTI[1] as keyof typeof traits]})`,
            reason: "기존 팀의 업무 방식과 속도에 가장 빠르게 적응하며 단기 성과를 극대화할 수 있습니다.",
            conflict: "유사한 성향으로 인해 사각지대를 놓칠 위험(집단 사고)이 있습니다.",
            score: 92
        };
    } else {
        const invert = (char: string) => {
            if (char === 'E') return 'I'; if (char === 'I') return 'E';
            if (char === 'S') return 'N'; if (char === 'N') return 'S';
            if (char === 'T') return 'F'; if (char === 'F') return 'T';
            if (char === 'J') return 'P'; if (char === 'P') return 'J';
            return char;
        };
        const compMBTI = baseMBTI.split('').map(invert).join('');
        return {
            persona: `${compMBTI} (${traits[compMBTI[0] as keyof typeof traits]} + ${traits[compMBTI[1] as keyof typeof traits]})`,
            reason: "팀의 부족한 관점을 보완하여 균형을 맞추고 창의적인 문제 해결을 돕습니다.",
            conflict: "초기 의사소통 비용이 발생할 수 있으며, 업무 스타일 차이로 인한 조율이 필요합니다.",
            score: 85
        };
    }
}

function generateMockQuestions(role: string, goal: string, strategy: string): string[] {
    const coreQuestions = [
        `우리 팀은 현재 "${goal}" 목표를 가지고 있습니다. 이 목표 달성에 본인이 어떻게 기여할 수 있다고 생각하시나요?`,
        `${role} 직무 수행 중 가장 도전적이었던 경험과 그것을 극복한 구체적인 사례를 말씀해 주세요.`
    ];

    if (strategy === "clone") {
        coreQuestions.push("기존 팀의 속도와 문화에 빠르게 녹아들기 위해 어떤 노력을 하시나요?");
    } else {
        coreQuestions.push("기존 팀원들과 다른 의견이 있을 때, 이를 설득하거나 조율하는 본인만의 방식은 무엇인가요?");
    }

    return coreQuestions;
}

// --- Component ---

function TalentRequestWizard() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const rawStage = searchParams.get("stage") || "seed";
    const stageKey = (Object.keys(HIRING_GUIDES).includes(rawStage) ? rawStage : "seed") as keyof typeof HIRING_GUIDES;
    const guide = HIRING_GUIDES[stageKey];

    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loadingStep, setLoadingStep] = useState(0);

    const [formData, setFormData] = useState<RequestState>({
        teamMembers: [{ id: "1", name: "", role: "Founder", mbti: "", isLeader: true }],
        teamGoal: "",
        strategy: "complement",
        role: "",
        experience: "",
        duties: "",
        skills: "",
        salary: "",
        culture: "",
        interviewFocus: [],
        customQuestions: []
    });

    const [analysis, setAnalysis] = useState<ReturnType<typeof getRecommendation> & { deficiencyDesc: string, dnaDesc: string } | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        const { recommendedMBTI, analysis: rawAnalysis } = calculateTeamDNA(formData.teamMembers);
        const rec = getRecommendation(recommendedMBTI, formData.strategy);
        setAnalysis({
            ...rec,
            deficiencyDesc: rawAnalysis.deficiencyDescription,
            dnaDesc: rawAnalysis.dnaDescription
        });
    }, [formData.teamMembers, formData.strategy]);


    const loadingMessages = [
        { text: "리더 및 팀 DNA 정밀 분석 중...", icon: Users },
        { text: "팀핏(Team Fit) 진단 및 결핍 요소 확인...", icon: AlertTriangle },
        { text: `전략(${formData.strategy === 'clone' ? '안정성' : '혁신'}) 기반 최적 페르소나 매칭 중...`, icon: BrainCircuit },
        { text: `"${formData.role}" 직무 맞춤형 검증 질문 생성 중...`, icon: Lightbulb },
        { text: "내/외부 인재 풀 스캔 및 시뮬레이션...", icon: Database },
        { text: "최종 후보자 리포트 생성 완료!", icon: CheckCircle2 },
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
            }, 1200);
            return () => clearInterval(interval);
        }
    }, [isSubmitting, router, loadingMessages.length]);

    const handleAddMember = () => {
        setFormData(prev => ({
            ...prev,
            teamMembers: [...prev.teamMembers, { id: Math.random().toString(), name: "", role: "", mbti: "", isLeader: false }]
        }));
    };

    const handleRemoveMember = (id: string) => {
        if (formData.teamMembers.length <= 1) return;
        setFormData(prev => ({
            ...prev,
            teamMembers: prev.teamMembers.filter(m => m.id !== id)
        }));
    };

    const updateMember = (id: string, field: keyof TeamMember, value: any) => {
        setFormData(prev => ({
            ...prev,
            teamMembers: prev.teamMembers.map(m => {
                if (m.id === id) {
                    if (field === 'isLeader' && value === true) {
                        return { ...m, isLeader: true };
                    }
                    return { ...m, [field]: value };
                }
                if (field === 'isLeader' && value === true) {
                    return { ...m, isLeader: false };
                }
                return m;
            })
        }));
    };

    const validateStep = (currentStep: number) => {
        try {
            if (currentStep === 1) {
                // Validate Step 1 Partial
                TALENT_REQUEST_SCHEMA.pick({ teamMembers: true, teamGoal: true }).parse(formData);
            } else if (currentStep === 2) {
                // Validate Step 2 Partial
                TALENT_REQUEST_SCHEMA.pick({ role: true, experience: true }).parse(formData);
            }
            setErrors({});
            return true;
        } catch (error) {
            console.error("Validation Error:", error);
            if (error instanceof z.ZodError) {
                const newErrors: Record<string, string> = {};
                // ZodError has .issues typically, checking both for safety
                const issues = error.issues || (error as any).errors;

                if (Array.isArray(issues)) {
                    issues.forEach((err: any) => {
                        const path = err.path.join(".");
                        newErrors[path] = err.message;
                    });
                }
                setErrors(newErrors);
            }
            return false;
        }
    };

    const nextStep = () => {
        if (!validateStep(step)) return;

        if (step === 2 && formData.customQuestions.length === 0) {
            setFormData(prev => ({
                ...prev,
                customQuestions: generateMockQuestions(prev.role || "지원자", prev.teamGoal || "성장", prev.strategy)
            }));
        }
        setStep(prev => prev + 1);
    };

    const prevStep = () => setStep(prev => prev - 1);

    const handleSubmit = () => {
        if (!validateStep(step)) return;
        setIsSubmitting(true);
    };

    const Stepper = () => (
        <div className="w-full max-w-3xl mx-auto mb-10">
            <div className="relative flex justify-between items-center">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-secondary -z-10 rounded-full">
                    <motion.div
                        className="h-full bg-primary rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: `${(step - 1) * 50}%` }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                </div>

                {[1, 2, 3].map((s) => (
                    <div key={s} className="flex flex-col items-center gap-2 bg-background px-2">
                        <motion.div
                            className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center border-2 text-sm font-bold transition-colors",
                                s <= step ? "bg-primary border-primary text-primary-foreground" : "bg-background border-muted-foreground/30 text-muted-foreground"
                            )}
                            animate={{ scale: s === step ? 1.1 : 1 }}
                        >
                            {s < step ? <CheckCircle2 className="w-6 h-6" /> : s}
                        </motion.div>
                        <span className={cn(
                            "text-xs font-jamsil whitespace-nowrap transition-colors",
                            s <= step ? "text-primary" : "text-muted-foreground"
                        )}>
                            {s === 1 && "Start Analysis"}
                            {s === 2 && "Setup Strategy"}
                            {s === 3 && "Start Matching"}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderStep1 = () => (
        <div className="space-y-6">
            <div className="space-y-2 text-center md:text-left">
                <h2 className="text-2xl font-jamsil text-primary">1. 현상 분석: 조직 컬러 맵핑</h2>
                <p className="text-muted-foreground font-taebaek">
                    리더와 팀원의 MBTI를 입력해주세요. <span className="text-primary font-bold">리더의 성향</span>은 조직 문화의 50%를 결정합니다.
                </p>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <Label className="text-base font-jamsil">팀 멤버 구성</Label>
                    <Button variant="outline" size="sm" onClick={handleAddMember} type="button" className="font-taebaek">+ 멤버 추가</Button>
                </div>

                <div className="space-y-3">
                    {formData.teamMembers.map((member, idx) => (
                        <div key={member.id} className={cn("flex gap-3 items-start animate-in fade-in slide-in-from-top-2 duration-300 p-3 rounded-lg border", member.isLeader ? "bg-primary/5 border-primary/30" : "bg-card border-border/50")}>
                            <div className="pt-3">
                                <button
                                    type="button"
                                    onClick={() => updateMember(member.id, 'isLeader', true)}
                                    title="리더 지정"
                                    className={cn("p-1 rounded-full transition-colors", member.isLeader ? "text-yellow-500 bg-yellow-500/10" : "text-muted-foreground/30 hover:text-yellow-500/50")}
                                >
                                    <Crown className="w-5 h-5 fill-current" />
                                </button>
                            </div>
                            <div className="flex-1 space-y-1">
                                <Label className="text-xs text-muted-foreground font-taebaek">이름/직책 {member.isLeader && <Badge variant="secondary" className="text-[10px] ml-1 h-4 px-1">LEADER</Badge>}</Label>
                                <Input
                                    placeholder={member.isLeader ? "예: 홍길동 (CEO)" : "예: 팀원 A"}
                                    value={member.name}
                                    onChange={(e) => updateMember(member.id, "name", e.target.value)}
                                    className={cn("bg-background/50 font-taebaek", errors[`teamMembers.${idx}.name`] && "border-red-500")}
                                />
                                {errors[`teamMembers.${idx}.name`] && <p className="text-[10px] text-red-500 mt-1">{errors[`teamMembers.${idx}.name`]}</p>}
                            </div>
                            <div className="w-[120px] space-y-1">
                                <Label className="text-xs text-muted-foreground font-taebaek">MBTI</Label>
                                <select
                                    value={member.mbti}
                                    onChange={(e) => updateMember(member.id, "mbti", e.target.value as MBTI)}
                                    className={cn(
                                        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-taebaek",
                                        errors[`teamMembers.${idx}.mbti`] && "border-red-500"
                                    )}
                                >
                                    <option value="" disabled>선택</option>
                                    {MBTI_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                            </div>
                            {formData.teamMembers.length > 1 && (
                                <Button variant="ghost" size="icon" className="mt-6 text-muted-foreground hover:text-red-500" onClick={() => handleRemoveMember(member.id)}>
                                    <X className="w-4 h-4" />
                                </Button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-border/50">
                <Label htmlFor="team-goal" className="text-base font-jamsil">현재 팀의 최우선 목표</Label>
                <Textarea
                    id="team-goal"
                    placeholder="예: 3개월 내 MVP 출시, 또는 안정적인 운영 시스템 구축"
                    value={formData.teamGoal}
                    onChange={(e) => setFormData(prev => ({ ...prev, teamGoal: e.target.value }))}
                    className={cn("min-h-[100px] bg-background/50 font-taebaek", errors.teamGoal && "border-red-500")}
                />
                {errors.teamGoal && <p className="text-xs text-red-500 mt-1">{errors.teamGoal}</p>}
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-6">
            <div className="space-y-2 text-center md:text-left">
                <h2 className="text-2xl font-jamsil text-primary">2. 팀핏 진단 & 전략 수립</h2>
                <p className="text-muted-foreground font-taebaek">팀의 강점을 기반으로 부족한 부분을 진단하고 채용 전략을 결정합니다.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-900/50 border border-border p-4 rounded-xl space-y-4">
                    <div className="flex items-center gap-2 border-b pb-2 border-border/50">
                        <Users className="w-4 h-4 text-blue-500" />
                        <h3 className="font-bold text-sm font-jamsil text-foreground/80">Team DNA</h3>
                    </div>
                    <div>
                        <p className="font-bold text-lg text-primary mb-1 font-jamsil">{analysis?.dnaDesc}</p>
                        <p className="text-xs text-muted-foreground font-taebaek">리더 성향 50% 가중 반영됨</p>
                    </div>
                </div>

                <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 p-4 rounded-xl space-y-4">
                    <div className="flex items-center gap-2 border-b pb-2 border-red-200/50">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        <h3 className="font-bold text-sm font-jamsil text-red-700 dark:text-red-400">팀핏 진단 (Blind Spots)</h3>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-red-800 dark:text-red-300 leading-relaxed font-taebaek">
                            "{analysis?.deficiencyDesc}"
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-3 pt-2">
                <Label className="text-base font-jamsil">채용 알고리즘 전략 선택</Label>
                <div className="grid grid-cols-2 gap-4">
                    <div
                        onClick={() => setFormData(p => ({ ...p, strategy: 'clone' }))}
                        className={cn(
                            "cursor-pointer p-4 rounded-xl border-2 transition-all flex flex-col gap-2",
                            formData.strategy === 'clone' ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                        )}
                    >
                        <div className="flex items-center justify-between">
                            <span className="font-bold flex items-center gap-2 font-jamsil"><ShieldCheck className="w-4 h-4" /> 안정성 (Clone)</span>
                            {formData.strategy === 'clone' && <CheckCircle2 className="w-4 h-4 text-primary" />}
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed font-taebaek">
                            리더 및 핵심 인재와 유사한 성향을 추천합니다.<br />
                            <span className="text-primary font-medium">효과: 빠른 적응, 소통 비용 최소화</span>
                        </p>
                    </div>

                    <div
                        onClick={() => setFormData(p => ({ ...p, strategy: 'complement' }))}
                        className={cn(
                            "cursor-pointer p-4 rounded-xl border-2 transition-all flex flex-col gap-2",
                            formData.strategy === 'complement' ? "border-purple-500 bg-purple-500/5" : "border-border hover:border-purple-500/50"
                        )}
                    >
                        <div className="flex items-center justify-between">
                            <span className="font-bold flex items-center gap-2 font-jamsil"><Zap className="w-4 h-4" /> 혁신 (Complement)</span>
                            {formData.strategy === 'complement' && <CheckCircle2 className="w-4 h-4 text-purple-500" />}
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed font-taebaek">
                            팀의 결핍을 보완하는 반대 성향을 추천합니다.<br />
                            <span className="text-purple-500 font-medium">효과: 집단 사고 방지, 균형 확보</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-background to-secondary/30 border rounded-xl flex items-center justify-between">
                <div>
                    <Label className="text-xs text-muted-foreground font-taebaek">추천 프로필 (Recommended)</Label>
                    <div className="text-xl font-bold flex items-center gap-2 font-jamsil">
                        {analysis?.persona}
                    </div>
                </div>
                <div className="text-right">
                    <Label className="text-xs text-muted-foreground font-taebaek">매칭 점수</Label>
                    <div className="text-xl font-bold text-primary font-jamsil">{analysis?.score}점</div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 pt-2">
                <div className="space-y-2">
                    <Label htmlFor="role" className="font-jamsil">채용 직군 <span className="text-red-500">*</span></Label>
                    <Input id="role"
                        placeholder="예: 그로스 마케터"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className={cn("font-taebaek", errors.role && "border-red-500")}
                    />
                    {errors.role && <p className="text-xs text-red-500">{errors.role}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="experience" className="font-jamsil">경력 요건</Label>
                    <Input
                        id="experience"
                        placeholder="예: 3~5년차"
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        className={cn("font-taebaek", errors.experience && "border-red-500")}
                    />
                    {errors.experience && <p className="text-xs text-red-500">{errors.experience}</p>}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="duties" className="font-jamsil">주요 업무 (Key Responsibilities)</Label>
                <Textarea
                    id="duties"
                    placeholder="예: 사용자 데이터 분석 및 실험 설계"
                    className="min-h-[80px] font-taebaek"
                    value={formData.duties}
                    onChange={(e) => setFormData({ ...formData, duties: e.target.value })}
                />
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="space-y-6">
            <div className="space-y-2 text-center md:text-left">
                <h2 className="text-2xl font-bold font-jamsil text-primary">3. 팀 시뮬레이션 & 인터뷰 설계</h2>
                <p className="text-muted-foreground font-taebaek">예상되는 시너지만 갈등 요소를 확인하고 인터뷰 질문을 확정합니다.</p>
            </div>

            <div className="bg-background border rounded-xl overflow-hidden">
                <div className="bg-secondary/50 p-4 border-b flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Badge>{analysis?.persona.split(' ')[0]}</Badge>
                        <span className="font-bold text-sm font-jamsil">후보자 입사 시 예상 시나리오</span>
                    </div>
                </div>
                <div className="p-5 grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <h4 className="font-bold text-sm text-blue-600 font-jamsil">👍 기대 시너지</h4>
                        <p className="text-sm text-foreground/80 leading-relaxed bg-blue-50 dark:bg-blue-900/10 p-3 rounded-lg font-taebaek">
                            {analysis?.reason}
                        </p>
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-bold text-sm text-orange-600 font-jamsil">⚠️ 예상 갈등 (Conflict)</h4>
                        <p className="text-sm text-foreground/80 leading-relaxed bg-orange-50 dark:bg-orange-900/10 p-3 rounded-lg font-taebaek">
                            {analysis?.conflict}
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-5 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="bg-background text-primary border-primary/30">AI Interview Questions</Badge>
                </div>

                <div className="space-y-3">
                    {formData.customQuestions.map((q, idx) => (
                        <div key={idx} className="flex gap-3 bg-background/60 p-3 rounded-lg border border-border/50">
                            <span className="text-xs font-bold text-muted-foreground flex items-center justify-center w-5 h-5 rounded-full bg-secondary shrink-0 font-jamsil">
                                Q{idx + 1}
                            </span>
                            <p className="text-sm text-foreground/90 leading-relaxed font-medium font-taebaek">{q}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-3">
                <Label className="font-jamsil">평가 중점 사항</Label>
                <div className="flex flex-wrap gap-2">
                    {["직무 적합성", "문화적 적합성", "협업 스타일", "문제 해결력"].map((item) => (
                        <Badge
                            key={item}
                            variant={formData.interviewFocus.includes(item) ? "default" : "outline"}
                            className="cursor-pointer py-1.5 px-3 hover:bg-primary/20 transition-colors font-taebaek"
                            onClick={() => {
                                setFormData(prev => ({
                                    ...prev,
                                    interviewFocus: prev.interviewFocus.includes(item)
                                        ? prev.interviewFocus.filter(f => f !== item)
                                        : [...prev.interviewFocus, item]
                                }));
                            }}
                        >
                            {formData.interviewFocus.includes(item) && <CheckCircle2 className="w-3 h-3 mr-1" />}
                            {item}
                        </Badge>
                    ))}
                </div>
            </div>
        </div>
    );

    if (isSubmitting) {
        return (
            <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 relative overflow-hidden font-taebaek">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center space-y-8 z-10 p-8 max-w-md w-full"
                >
                    <div className="relative w-24 h-24 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin" />
                        <div className="absolute inset-3 rounded-full border-r-2 border-primary/50 animate-spin -reverse" />
                        <motion.div
                            key={loadingStep}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-primary"
                        >
                            {(() => {
                                const Icon = loadingMessages[loadingStep].icon;
                                return Icon && <Icon className="w-8 h-8" />;
                            })()}
                        </motion.div>
                    </div>

                    <div className="space-y-2 w-full">
                        <h3 className="text-xl font-bold animate-pulse font-jamsil">{loadingMessages[loadingStep].text}</h3>
                        <p className="text-muted-foreground text-sm font-taebaek">
                            잠시만 기다려주세요, Comes가 최적의 매칭을 진행 중입니다.
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
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 relative overflow-hidden font-taebaek">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-4xl z-10"
            >
                <div className="mb-8 flex flex-col items-center text-center space-y-6">
                    <div className="space-y-2">
                        <Badge variant="secondary" className="mb-2 font-jamsil">{guide.title}</Badge>
                        <h1 className="text-3xl font-bold tracking-tight font-jamsil">AI 인재 매칭 프로세스</h1>
                    </div>

                    <Stepper />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    <div className="hidden md:block md:col-span-4 lg:col-span-3 space-y-4">
                        <Card className="border-primary/20 bg-primary/5 sticky top-6">
                            <CardHeader className="pb-3 border-b border-primary/10">
                                <div className="flex items-center gap-2 text-primary">
                                    <Lightbulb className="w-4 h-4" />
                                    <span className="font-bold text-xs tracking-wide font-jamsil">HIRING GUIDE</span>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-4 space-y-4">
                                <p className="text-sm font-medium leading-relaxed text-foreground/90 font-taebaek">
                                    {guide.description}
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                    {guide.keywords.map(k => (
                                        <Badge key={k} variant="outline" className="text-[10px] bg-background font-taebaek">#{k}</Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="md:col-span-8 lg:col-span-9 border-border/50 bg-card/50 backdrop-blur-sm shadow-xl">
                        <CardContent className="p-6 md:p-8">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={step}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {step === 1 && renderStep1()}
                                    {step === 2 && renderStep2()}
                                    {step === 3 && renderStep3()}
                                </motion.div>
                            </AnimatePresence>

                            <div className="flex justify-between items-center mt-8 pt-6 border-t border-border/40">
                                <Button
                                    variant="ghost"
                                    onClick={prevStep}
                                    disabled={step === 1}
                                    className={cn("font-jamsil", step === 1 ? "invisible" : "")}
                                >
                                    이전
                                </Button>

                                {step < 3 ? (
                                    <Button onClick={nextStep} className="bg-primary text-primary-foreground font-jamsil">
                                        다음 단계 <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={handleSubmit}
                                        className="bg-gradient-to-r from-primary to-purple-600 hover:shadow-lg hover:from-primary/90 hover:to-purple-600/90 text-white px-8 font-jamsil"
                                    >
                                        매칭 시작하기 <Sprout className="w-4 h-4 ml-2" />
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </motion.div>
        </div>
    );
}

export default function TalentRequestPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>}>
            <TalentRequestWizard />
        </Suspense>
    );
}
