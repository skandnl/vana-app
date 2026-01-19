"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const handleAnalyze = (e: React.FormEvent) => {
        e.preventDefault();
        setIsAnalyzing(true);
        // Simulate AI delay
        setTimeout(() => {
            setIsAnalyzing(false);
            setShowResults(true);
        }, 2000);
    };

    return (
        <div className="space-y-12">
            <div className="flex flex-col space-y-3 text-center sm:text-left">
                <h1 className="text-4xl font-semibold tracking-tight">인재 스카우트</h1>
                <p className="text-muted-foreground text-lg">
                    요구사항을 정의하면 Valkyrie가 상위 1%의 적합한 인재를 찾아드립니다.
                </p>
            </div>

            {!showResults ? (
                <div className="max-w-2xl mx-auto sm:mx-0">
                    <Card className="border-0 shadow-2xl bg-secondary/20 backdrop-blur-xl">
                        <CardHeader>
                            <CardTitle className="text-2xl">새로운 포지션 등록</CardTitle>
                            <CardDescription className="text-base">
                                찾으시는 직무와 기술 스택을 입력해주세요. Valkyrie가 GitHub과 영향력 지표를 분석합니다.
                            </CardDescription>
                        </CardHeader>
                        <form onSubmit={handleAnalyze}>
                            <CardContent className="space-y-6">
                                <div className="space-y-3">
                                    <Label htmlFor="role" className="text-base">직무명</Label>
                                    <Input id="role" placeholder="예: 시니어 백엔드 엔지니어" required className="h-12 text-lg bg-background/50 border-white/10 focus:ring-blue-500" />
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="stack" className="text-base">기술 스택 (쉼표로 구분)</Label>
                                    <Input id="stack" placeholder="예: Python, Django, PostgreSQL, AWS" required className="h-12 text-lg bg-background/50 border-white/10 focus:ring-blue-500" />
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="experience" className="text-base">경력 연차</Label>
                                    <Input id="experience" placeholder="예: 5년 이상" required className="h-12 text-lg bg-background/50 border-white/10 focus:ring-blue-500" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" size="lg" className="w-full h-12 text-lg rounded-xl" disabled={isAnalyzing}>
                                    {isAnalyzing ? (
                                        <>
                                            <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                                            Valkyrie 분석 중...
                                        </>
                                    ) : (
                                        <>
                                            <Search className="mr-2 h-5 w-5" />
                                            인재 찾기
                                        </>
                                    )}
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            ) : (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-semibold">Valkyrie 매칭 결과</h2>
                        <Button variant="outline" onClick={() => setShowResults(false)} className="rounded-full">새로운 검색</Button>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {/* Mock Results */}
                        {[1, 2, 3].map((i) => (
                            <Card key={i} className="group hover:scale-[1.02] transition-all duration-300 border-0 shadow-lg bg-secondary/20 backdrop-blur-md cursor-pointer overflow-hidden">
                                <CardHeader className="pb-3">
                                    <div className="flex justify-between items-start">
                                        <div className="flex gap-3">
                                            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                                JD
                                            </div>
                                            <div className="flex flex-col">
                                                <CardTitle className="text-xl">James Doe {i}</CardTitle>
                                                <CardDescription className="text-base flex items-center gap-2">
                                                    {i === 1 ? (
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                                            Outer (발굴)
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                                            Inner (지원)
                                                        </span>
                                                    )}
                                                    <span className="text-muted-foreground text-xs">• {i === 1 ? "42 SEOUL" : i === 2 ? "SSAFY" : "사람인"}</span>
                                                </CardDescription>
                                            </div>
                                        </div>
                                        <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-bold border border-green-500/20">
                                            9{8 - i}% 일치
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-2 p-2 rounded-lg bg-background/30">
                                            <Sparkles className="h-4 w-4 text-yellow-400" />
                                            <span className="font-medium text-foreground/80">Django 상위 1% 기여자</span>
                                        </div>
                                        <div className="flex items-center gap-2 p-2 rounded-lg bg-background/30">
                                            <ArrowRight className="h-4 w-4" />
                                            <span>대규모 이벤트 시스템 아키텍처 설계</span>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Link href={`/dashboard/candidate/${i}`} className="w-full">
                                        <Button className="w-full rounded-xl bg-white/10 hover:bg-white/20 text-white border-0" size="lg">리포트 보기</Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
