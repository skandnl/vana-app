"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { User, Globe, Building2, ChevronRight, Zap, Star, Github, Linkedin, Mail, Clock } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const CANDIDATES = {
    inner: [
        {
            id: "c1",
            name: "김민지",
            role: "Frontend Engineer",
            match: 94,
            source: "사람인",
            skills: ["React", "TypeScript", "Next.js"],
            exp: "3년",
        },
        {
            id: "c2",
            name: "이웨이",
            role: "UX Designer",
            match: 88,
            source: "원티드",
            skills: ["Figma", "Prototyping", "HTML/CSS"],
            exp: "4년",
        },
        {
            id: "c3",
            name: "박지훈",
            role: "Fullstack Dev",
            match: 85,
            source: "로켓펀치",
            skills: ["Node.js", "React", "AWS"],
            exp: "2년",
        },
    ],
};


const INITIAL_OUTER_CANDIDATES = [
    { id: "c4", name: "사라 첸", role: "Senior Engineer", source: "GitHub", skills: ["System Design", "Rust", "React"], exp: "6년", profileImg: "" },
    { id: "c5", name: "데이비드 김", role: "Product Engineer", source: "LinkedIn", skills: ["Product", "React Native", "Growth"], exp: "5년", profileImg: "" },
    { id: "c6", name: "알렉스 박", role: "AI Engineer", source: "Indent", skills: ["PyTorch", "FastAPI", "MLOps"], exp: "4년", profileImg: "" },
    { id: "c7", name: "이수진", role: "Frontend Lead", source: "Wanted", skills: ["Vue.js", "Nuxt", "Team Lead"], exp: "7년", profileImg: "" },
    { id: "c8", name: "James Lee", role: "Backend Developer", source: "LinkedIn", skills: ["Java", "Spring Boot", "AWS"], exp: "5년", profileImg: "" },
    { id: "c21", name: "김철수", role: "C Developer", source: "42Seoul", skills: ["C", "C++", "Algorithms"], exp: "신입", profileImg: "" },
    { id: "c22", name: "이미영", role: "Fullstack", source: "42Gyeongsan", skills: ["JavaScript", "React", "Node.js"], exp: "신입", profileImg: "" },
    { id: "c23", name: "박준호", role: "Software Engineer", source: "SW Maestro", skills: ["Python", "Django", "AWS"], exp: "신입", profileImg: "" },
    { id: "c24", name: "최지우", role: "AI Researcher", source: "Naver Boostcamp", skills: ["PyTorch", "NLP", "HuggingFace"], exp: "신입", profileImg: "" },
    { id: "c25", name: "정민우", role: "Web Developer", source: "SeSAC", skills: ["Java", "Spring", "Oracle"], exp: "신입", profileImg: "" },
    { id: "c26", name: "강하늘", role: "App Developer", source: "K-Digital Training", skills: ["Flutter", "Dart", "Firebase"], exp: "신입", profileImg: "" },
    { id: "c27", name: "Codyssey User", role: "Game Client", source: "Codyssey", skills: ["Unity", "C#", "3D Math"], exp: "2년", profileImg: "" },
    { id: "c9", name: "박지수", role: "Data Analyst", source: "Kaggle", skills: ["Python", "SQL", "Tableau"], exp: "3년", profileImg: "" },
    { id: "c10", name: "김태영", role: "DevOps Engineer", source: "GitHub", skills: ["Docker", "Kubernetes", "Terraform"], exp: "6년", profileImg: "" },
    { id: "c11", name: "Sophie Choi", role: "UX Designer", source: "Behance", skills: ["Figma", "User Research", "Prototyping"], exp: "4년", profileImg: "" },
    { id: "c12", name: "정우성", role: "Product Manager", source: "LinkedIn", skills: ["Roadmap", "Jira", "Communication"], exp: "8년", profileImg: "" },
    { id: "c13", name: "Linda Kim", role: "Fullstack Dev", source: "RocketPunch", skills: ["Node.js", "React", "PostgreSQL"], exp: "3년", profileImg: "" },
    { id: "c14", name: "최민호", role: "Security Engineer", source: "GitHub", skills: ["Penetration Testing", "Network Security"], exp: "5년", profileImg: "" },
    { id: "c15", name: "Emma Watson", role: "Marketing Lead", source: "LinkedIn", skills: ["Brand Strategy", "Content Marketing"], exp: "6년", profileImg: "" },
    { id: "c16", name: "강동원", role: "Mobile Developer", source: "Wanted", skills: ["Flutter", "Dart", "Firebase"], exp: "4년", profileImg: "" },
    { id: "c17", name: "Lucas Jung", role: "Blockchain Dev", source: "GitHub", skills: ["Solidity", "Web3.js", "Ethereum"], exp: "3년", profileImg: "" },
    { id: "c18", name: "한지민", role: "HR Manager", source: "LinkedIn", skills: ["Recruiting", "Culture", "Onboarding"], exp: "7년", profileImg: "" },
    { id: "c19", name: "Daniel Park", role: "Sales Rep", source: "Wanted", skills: ["B2B Sales", "CRM", "Negotiation"], exp: "5년", profileImg: "" },
    { id: "c20", name: "Olivia Kim", role: "Graphic Designer", source: "Behance", skills: ["Adobe Suite", "Branding", "Illustration"], exp: "4년", profileImg: "" },
];


function CandidateCard({ candidate, type, index, isSelected, onToggle }: { candidate: any; type: "inner" | "outer"; index: number; isSelected?: boolean; onToggle?: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group"
            onClick={onToggle}
        >
            {type === 'outer' && (
                <div className={cn(
                    "absolute left-4 top-1/2 -translate-y-1/2 z-20 transition-all duration-200",
                    isSelected ? "opacity-100 scale-100" : "opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100"
                )}>
                    <div className={cn(
                        "w-5 h-5 rounded border flex items-center justify-center",
                        isSelected ? "bg-primary border-primary text-white" : "bg-white border-muted-foreground/30"
                    )}>
                        {isSelected && <Zap className="w-3 h-3 fill-current" />}
                    </div>
                </div>
            )}

            <Link href={`/talent/report/${candidate.id}`} className={cn("block transition-all", type === 'outer' && "pl-8")}>
                <Card className={cn(
                    "transition-all cursor-pointer border-border/50 hover:shadow-md",
                    isSelected ? "ring-2 ring-primary bg-primary/5" : "hover:bg-accent/5"
                )}>
                    <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            {candidate.profileImg ? (
                                <img
                                    src={candidate.profileImg}
                                    alt={candidate.name}
                                    className={cn(
                                        "w-10 h-10 rounded-full object-cover border",
                                        isSelected ? "border-primary" : "border-gray-200"
                                    )}
                                />
                            ) : (
                                <div className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-colors",
                                    type === "inner" ? "bg-primary/20 text-primary" : "bg-purple-500/20 text-purple-400",
                                    isSelected && "bg-primary text-primary-foreground"
                                )}>
                                    {candidate.name[0]}
                                </div>
                            )}
                            <div>
                                <h3 className="font-semibold group-hover:text-primary transition-colors">{candidate.name}</h3>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        {type === "inner" ? <Building2 className="w-3 h-3" /> : <Globe className="w-3 h-3" />}
                                        {candidate.source}
                                    </span>
                                    <span>•</span>
                                    <span>{candidate.exp}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex flex-col items-end">
                                {type === 'inner' ? (
                                    <div className="flex items-center gap-1 font-bold text-primary">
                                        <Zap className="w-3 h-3 fill-primary" />
                                        {candidate.match}%
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground bg-slate-100 px-2 py-1 rounded">
                                        분석 대기중
                                    </div>
                                )}
                                <div className="text-xs text-muted-foreground hidden md:block">
                                    {candidate.skills.slice(0, 2).join(", ")}
                                </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-colors" />
                        </div>
                    </CardContent>
                </Card>
            </Link>
        </motion.div>
    );
}

export default function DashboardPage() {
    const [outerCandidates, setOuterCandidates] = useState(INITIAL_OUTER_CANDIDATES);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    const toggleSelection = (id: string) => {
        const newSet = new Set(selectedIds);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setSelectedIds(newSet);
    };

    const selectAll = () => {
        if (selectedIds.size === outerCandidates.length) {
            setSelectedIds(new Set());
        } else {
            const allIds = new Set(outerCandidates.map(c => c.id));
            setSelectedIds(allIds);
        }
    };

    // Simulate sending outreach
    const handleSendOutreach = () => {
        // In a real app, this would perform an API call.
        // For now, we just clear selection and maybe show a toast (but we don't have toast installed yet).
        // We'll navigate to the first selected candidate's report to show the flow.
        const firstId = Array.from(selectedIds)[0];
        if (firstId) {
            window.location.href = `/talent/report/${firstId}?action=outreach`;
        }
    };

    return (
        <div className="min-h-screen bg-background p-6 space-y-8 pb-24">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">인재 대시보드</h1>
                    <p className="text-muted-foreground">Comes가 관리하는 인재 파이프라인입니다.</p>
                </div>
                <div className="flex gap-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-primary" /> 내부 인재 (지원자)</span>
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-purple-500" /> 외부 인재 (AI 소싱)</span>
                </div>
            </header>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Inner Boundary - Applicants */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <Building2 className="w-5 h-5 text-primary" />
                            내부 인재 풀
                            <span className="text-sm font-normal text-muted-foreground ml-2">(지원자)</span>
                        </h2>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">3명 대기중</span>
                    </div>

                    <div className="space-y-3">
                        {CANDIDATES.inner.map((c, i) => (
                            <CandidateCard key={c.id} candidate={c} type="inner" index={i} />
                        ))}
                    </div>
                </div>

                {/* Outer Boundary - Sourced */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <Globe className="w-5 h-5 text-purple-400" />
                            외부 인재 풀
                            <span className="text-sm font-normal text-muted-foreground ml-2">(소싱됨)</span>
                        </h2>
                        <div className="flex items-center gap-2">
                            <span onClick={selectAll} className="text-xs px-3 py-1 rounded-full bg-purple-100 text-purple-700 cursor-pointer hover:bg-purple-200 transition-colors font-medium select-none">
                                {selectedIds.size === outerCandidates.length ? "전체 해제" : "전체 선택"}
                            </span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400">{outerCandidates.length}명 대기중</span>
                        </div>
                    </div>

                    <div className="bg-purple-50/50 p-4 rounded-xl border border-purple-100 mb-4">
                        <div className="flex items-start gap-3">
                            <Zap className="w-5 h-5 text-purple-500 mt-0.5" />
                            <div>
                                <h3 className="text-sm font-bold text-purple-900">AI Sourcing Complete</h3>
                                <p className="text-xs text-purple-700/80 mt-1 leading-relaxed">
                                    설정하신 핵심 역량을 기반으로 {outerCandidates.length}명의 후보자를 찾았습니다.
                                    AI 이메일 인터뷰를 통해 팀 핏(Team Fit)을 검증해보세요.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                        {outerCandidates.map((c, i) => (
                            <CandidateCard
                                key={c.id}
                                candidate={c}
                                type="outer"
                                index={i}
                                isSelected={selectedIds.has(c.id)}
                                onToggle={() => toggleSelection(c.id)}
                            />
                        ))}
                        {outerCandidates.length === 0 && (
                            <div className="text-center py-10 text-muted-foreground/50">
                                생성된 인재 풀이 없습니다.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Floating Action Button for Outreach */}
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: selectedIds.size > 0 ? 0 : 100, opacity: selectedIds.size > 0 ? 1 : 0 }}
                className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
            >
                <div className="pointer-events-auto bg-foreground text-background px-6 py-4 rounded-full shadow-2xl flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                            {selectedIds.size}
                        </div>
                        <span className="font-medium">선택된 인재에게</span>
                    </div>
                    <div className="h-6 w-px bg-white/20" />
                    <button
                        onClick={handleSendOutreach}
                        className="flex items-center gap-2 text-primary-foreground font-bold hover:text-purple-300 transition-colors"
                    >
                        <Mail className="w-4 h-4" />
                        회사 소개 및 커피챗 제안 보내기
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
