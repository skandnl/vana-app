"use client";

import { motion } from "framer-motion";
import { User, Globe, Building2, ChevronRight, Zap, Star, Github, Linkedin, Mail } from "lucide-react";
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
    outer: [
        {
            id: "c4",
            name: "사라 첸",
            role: "Senior Engineer",
            match: 98,
            source: "GitHub",
            skills: ["System Design", "Rust", "React"],
            exp: "6년",
        },
        {
            id: "c5",
            name: "데이비드 김",
            role: "Product Engineer",
            match: 92,
            source: "LinkedIn",
            skills: ["Product", "React Native", "Growth"],
            exp: "5년",
        },
        {
            id: "c6",
            name: "알렉스 박",
            role: "AI Engineer",
            match: 91,
            source: "Indent",
            skills: ["Python", "PyTorch", "FastAPI"],
            exp: "4년",
        },
    ],
};

function CandidateCard({ candidate, type, index }: { candidate: any; type: "inner" | "outer"; index: number }) {
    return (
        <Link href={`/talent/report/${candidate.id}`}>
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
            >
                <Card className="hover:bg-accent/5 transition-all cursor-pointer border-border/50 group">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg",
                                type === "inner" ? "bg-primary/20 text-primary" : "bg-purple-500/20 text-purple-400"
                            )}>
                                {candidate.name[0]}
                            </div>
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
                                <div className="flex items-center gap-1 font-bold text-primary">
                                    <Zap className="w-3 h-3 fill-primary" />
                                    {candidate.match}%
                                </div>
                                <div className="text-xs text-muted-foreground hidden md:block">
                                    {candidate.skills.slice(0, 2).join(", ")}
                                </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-colors" />
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </Link>
    );
}

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-background p-6 space-y-8">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">인재 대시보드</h1>
                    <p className="text-muted-foreground">Vana가 관리하는 인재 파이프라인입니다.</p>
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
                        <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400">3명 신규 발견</span>
                    </div>

                    <div className="space-y-3">
                        {CANDIDATES.outer.map((c, i) => (
                            <CandidateCard key={c.id} candidate={c} type="outer" index={i} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
