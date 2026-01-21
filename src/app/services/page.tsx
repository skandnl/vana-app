"use client";

import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Bot, Users, LineChart, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ServicesPage() {
    const services = [
        {
            title: "AI Screening & Matching",
            description: "수천 명의 인재 풀에서 우리 팀의 DNA와 가장 잘 맞는 후보자를 3초 만에 찾아냅니다. 단순 키워드 매칭이 아닌, 맥락과 잠재력을 분석합니다.",
            icon: Bot,
            color: "text-primary",
            bg: "bg-primary/10"
        },
        {
            title: "AI Mail Interview",
            description: "Invenire가 후보자와 심층적인 이메일 대화를 나눕니다. 단순 문답이 아닌, 후보자의 생각과 경험을 깊이 있게 파악합니다.",
            icon: Users,
            color: "text-blue-500",
            bg: "bg-blue-500/10"
        },
        {
            title: "Smart Coffee Chat Matching",
            description: "AI 분석 결과를 바탕으로, 대표님이 가장 만나보고 싶은 인재를 골라 커피챗을 제안하세요. 불필요한 서류 검토 시간을 0으로 줄여드립니다.",
            icon: LineChart, // Keeping LineChart or could swap for another generic icon
            color: "text-purple-500",
            bg: "bg-purple-500/10"
        },
        {
            title: "Blind Bias Reduction",
            description: "학력, 나이, 성별 등 편견을 유발하는 요소를 배제하고 오직 실력과 핏(Fit)으로만 평가하는 공정한 채용 시스템을 제공합니다.",
            icon: ShieldCheck,
            color: "text-green-500",
            bg: "bg-green-500/10"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50/50 p-6 md:p-12 font-sans">
            <div className="max-w-6xl mx-auto">
                <header className="mb-12 flex items-center justify-between">
                    <Link href="/">
                        <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight">Oriri Services</h1>
                </header>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid md:grid-cols-2 gap-8"
                >
                    <div className="md:col-span-2 text-center mb-8 space-y-4">
                        <h2 className="text-4xl font-extrabold text-foreground">
                            채용의 미래를 경험하세요
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Oriri는 단순한 매칭 플랫폼이 아닙니다.<br />
                            스타트업의 성장을 가속화하는 올인원 채용 OS입니다.
                        </p>
                    </div>

                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-8 rounded-3xl border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className={`w-14 h-14 rounded-2xl ${service.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <service.icon className={`w-7 h-7 ${service.color}`} />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {service.description}
                            </p>

                            <ul className="mt-6 space-y-2">
                                <li className="flex items-center text-sm font-medium text-foreground/80">
                                    <CheckCircle2 className="w-4 h-4 text-primary mr-2" />
                                    검증된 알고리즘
                                </li>
                                <li className="flex items-center text-sm font-medium text-foreground/80">
                                    <CheckCircle2 className="w-4 h-4 text-primary mr-2" />
                                    즉시 도입 가능
                                </li>
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="mt-20 text-center bg-foreground text-background rounded-[2rem] p-12 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                    <div className="relative z-10 space-y-6">
                        <h2 className="text-3xl font-bold">지금 바로 시작해보세요</h2>
                        <p className="text-white/80 max-w-lg mx-auto">
                            초기 스타트업에게는 속도가 생명입니다. Oriri와 함께 3개월 걸릴 채용을 3일로 단축하세요.
                        </p>
                        <div className="pt-4">
                            <Link href="/">
                                <Button size="lg" className="bg-white text-foreground hover:bg-white/90 text-lg px-8 py-6 rounded-xl font-bold">
                                    무료로 시작하기
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
