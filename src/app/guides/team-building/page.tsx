"use client";

import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, User, Zap, ShieldCheck, Target, Lightbulb, TrendingUp, BookOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function TeamBuildingGuidePage() {
    return (
        <div className="min-h-screen bg-slate-50/50 font-sans text-slate-800">
            <div className="max-w-4xl mx-auto p-6 md:p-12">
                <header className="mb-12">
                    <Link href="/">
                        <Button variant="ghost" className="text-muted-foreground hover:text-foreground pl-0 mb-6">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                        </Button>
                    </Link>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200 px-3 py-1 text-sm">
                            Founder's Guide
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                            초기 스타트업을 위한<br />
                            전략적 팀 빌딩 가이드
                        </h1>
                        <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
                            투자를 유치하신 것을 진심으로 축하드립니다!<br />
                            성장 속도에 대한 책임을 완수하기 위한 팀 빌딩 전략을 제안합니다.
                        </p>
                    </motion.div>
                </header>

                <main className="space-y-16">
                    {/* Section 1: Complementary Team */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-bold flex items-center gap-2 border-b pb-4 border-slate-200">
                            <User className="w-6 h-6 text-green-600" />
                            1. 리더의 성향별 '상보적' 팀 구성
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            조직의 생존을 위해서는 <strong>자신의 약점을 메워줄 사람</strong>을 찾아야 합니다.
                        </p>

                        <div className="grid gap-4 md:grid-cols-3">
                            <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                <CardHeader>
                                    <CardTitle className="text-lg font-bold text-slate-900">비저너리형 (Visionary)</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-sm text-slate-500">아이디어가 넘치고 에너지가 좋으나 디테일과 실행력이 부족함.</p>
                                    <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                                        <span className="text-xs font-bold text-green-700 block mb-1">First Hire</span>
                                        <p className="text-sm font-semibold text-slate-800">Operator</p>
                                        <p className="text-xs text-slate-600 mt-1">비전을 실행 가능한 태스크로 쪼개는 사람.</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                <CardHeader>
                                    <CardTitle className="text-lg font-bold text-slate-900">테크니컬형 (Technical)</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-sm text-slate-500">기술적 완성도는 높으나 시장 적합성(PMF) 확인이나 영업에 약함.</p>
                                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                                        <span className="text-xs font-bold text-blue-700 block mb-1">First Hire</span>
                                        <p className="text-sm font-semibold text-slate-800">Growth Hacker</p>
                                        <p className="text-xs text-slate-600 mt-1">지표 기반으로 마케팅/영업을 추진할 사람.</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                <CardHeader>
                                    <CardTitle className="text-lg font-bold text-slate-900">관리자형 (Managerial)</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-sm text-slate-500">운영과 리스크 관리에 강하나 초기 폭발적인 추진력이 약함.</p>
                                    <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
                                        <span className="text-xs font-bold text-purple-700 block mb-1">First Hire</span>
                                        <p className="text-sm font-semibold text-slate-800">Maker</p>
                                        <p className="text-xs text-slate-600 mt-1">빠르게 프로토타입을 만들어 시장 반응을 볼 사람.</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </section>

                    {/* Section 2: Strategy by Mission */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-bold flex items-center gap-2 border-b pb-4 border-slate-200">
                            <Target className="w-6 h-6 text-green-600" />
                            2. 팀의 미션 성격에 따른 채용 전략
                        </h2>

                        <div className="space-y-4">
                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6">
                                <div className="md:w-1/3 space-y-2">
                                    <Badge variant="outline" className="text-green-600 border-green-200">New Market</Badge>
                                    <h3 className="text-xl font-bold">시장 창출형</h3>
                                    <p className="text-sm text-slate-500">세상에 없던 가치를 제안하고 문화를 만듦.</p>
                                </div>
                                <div className="md:w-2/3 space-y-4 border-l pl-0 md:pl-6 border-slate-100">
                                    <div>
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Target Talent</span>
                                        <p className="font-medium mt-1">전략적 사고를 하는 제너럴리스트</p>
                                        <p className="text-sm text-slate-600">모호함을 즐기고 피봇(Pivot)에 유연한 인재.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6">
                                <div className="md:w-1/3 space-y-2">
                                    <Badge variant="outline" className="text-blue-600 border-blue-200">Deep Tech</Badge>
                                    <h3 className="text-xl font-bold">기술 혁신형</h3>
                                    <p className="text-sm text-slate-500">압도적인 기술 격차로 진입 장벽 구축.</p>
                                </div>
                                <div className="md:w-2/3 space-y-4 border-l pl-0 md:pl-6 border-slate-100">
                                    <div>
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Target Talent</span>
                                        <p className="font-medium mt-1">특정 분야 딥 스페셜리스트</p>
                                        <p className="text-sm text-slate-600">연구 성과를 제품화할 엔지니어링 역량 최우선.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6">
                                <div className="md:w-1/3 space-y-2">
                                    <Badge variant="outline" className="text-purple-600 border-purple-200">Efficiency</Badge>
                                    <h3 className="text-xl font-bold">운영 효율형</h3>
                                    <p className="text-sm text-slate-500">비효율 개선 및 빠른 점유율 확장.</p>
                                </div>
                                <div className="md:w-2/3 space-y-4 border-l pl-0 md:pl-6 border-slate-100">
                                    <div>
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Target Talent</span>
                                        <p className="font-medium mt-1">실행력 중심 오퍼레이셔널 인재</p>
                                        <p className="text-sm text-slate-600">숫자와 지표에 밝고 자동화를 추구하는 성향.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Rules of Thumb */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-bold flex items-center gap-2 border-b pb-4 border-slate-200">
                            <BookOpen className="w-6 h-6 text-green-600" />
                            3. 초기 팀 빌딩 3대 원칙
                        </h2>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="space-y-3">
                                <h3 className="font-bold text-lg flex items-center gap-2">
                                    <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                    Culture Add
                                </h3>
                                <p className="text-sm text-slate-600 leading-relaxed bg-slate-100 p-4 rounded-lg">
                                    단순한 'Fit'을 넘어, 우리 문화를 <strong>어떻게 더 풍성하게 만들 것인가?</strong>를 고민하세요. 다양성이 결여되면 '확증 편향'에 빠집니다.
                                </p>
                            </div>
                            <div className="space-y-3">
                                <h3 className="font-bold text-lg flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4 text-blue-500 fill-blue-500" />
                                    Full-time vs Out
                                </h3>
                                <p className="text-sm text-slate-600 leading-relaxed bg-slate-100 p-4 rounded-lg">
                                    <strong>핵심 역량(Core)</strong>은 반드시 내부 인력으로, 디자인/회계 등 비핵심 역량은 외주로 유연성을 확보하세요.
                                </p>
                            </div>
                            <div className="space-y-3">
                                <h3 className="font-bold text-lg flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4 text-red-500 fill-red-500" />
                                    보상 설계
                                </h3>
                                <p className="text-sm text-slate-600 leading-relaxed bg-slate-100 p-4 rounded-lg">
                                    초기 멤버는 '동료'입니다. 현금이 부족하다면 <strong>스톡옵션(Equity)</strong>으로 비전을 공유하고 주인의식을 심어주세요.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 4: Checklist */}
                    <section className="bg-slate-900 text-slate-100 p-8 rounded-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

                        <div className="relative z-10 space-y-6">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                <CheckCircle2 className="w-6 h-6 text-green-400" />
                                리더를 위한 실전 체크리스트
                            </h2>
                            <div className="space-y-4">
                                <div className="flex gap-4 items-start">
                                    <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-400 shrink-0">1</div>
                                    <p className="font-medium text-lg text-slate-200">"나는 이 사람에게 나의 의사결정권 중 어디까지 위임할 수 있는가?"</p>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-400 shrink-0">2</div>
                                    <p className="font-medium text-lg text-slate-200">"이 사람이 우리 회사의 '최악의 순간'에도 남아있을 이유가 있는가?"</p>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-400 shrink-0">3</div>
                                    <p className="font-medium text-lg text-slate-200">"이 사람의 역량이 현재 팀원들의 평균치를 높여주는가?"</p>
                                </div>
                            </div>

                            <div className="pt-6 mt-6 border-t border-slate-800">
                                <div className="flex gap-4 items-start bg-slate-800/50 p-4 rounded-xl">
                                    <User className="w-10 h-10 text-green-400 bg-green-900/30 p-2 rounded-full" />
                                    <div>
                                        <p className="font-bold text-green-400 text-sm mb-1">HR 전문가의 한마디</p>
                                        <p className="text-slate-300 italic text-sm leading-relaxed">
                                            "초기 10명의 직원이 회사의 DNA를 결정합니다. 90점짜리 인재가 없다고 해서 70점짜리 인재와 타협하지 마세요. 그 타협이 나중에 조직 전체를 평범하게 만듭니다."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="flex justify-center pt-8">
                        <Link href="/consulting/book">
                            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 shadow-xl shadow-green-200/50">
                                전문가와 함께 팀 빌딩 전략 세우기
                            </Button>
                        </Link>
                    </div>
                </main>
            </div>
        </div>
    );
}
