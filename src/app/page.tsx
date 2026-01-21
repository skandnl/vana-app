"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sprout, Leaf, TreeDeciduous, TreePalm, CheckCircle2, ChevronRight, X, Coins, Bean } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { HIRING_GUIDES } from "@/lib/data/hiring-guides";

const STAGES = [
  {
    id: "pre-seed",
    label: "Pre-seed",
    icon: Sprout,
    description: "팀 빌딩. 공동 창업자 및 초기 멤버 찾기.",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
  {
    id: "angel",
    label: "Angel",
    icon: Leaf,
    description: "시장 조사. 문제 정의 및 고객 인터뷰.",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
  },
  {
    id: "seed",
    label: "Seed",
    icon: TreeDeciduous,
    description: "MVP 개발. 가설 검증 및 PMF 찾기.",
    color: "text-green-400",
    bg: "bg-green-400/10",
    border: "border-green-400/20",
  },
  {
    id: "pre-a",
    label: "Pre-A",
    icon: TreePalm,
    description: "정식 출시. 초기 유저 확보 및 지표 관리.",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/20",
  },
];

export default function LandingPage() {
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-green-50/30 to-green-100/50 text-foreground flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">

      {/* Header with Login */}
      <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50">
        <div className="text-xl font-bold tracking-tighter flex items-center gap-2">
          ORIRI
          <img src="/comes-logo.png" alt="Oriri Logo" className="w-8 h-8 object-contain" />
        </div>
        <div className="flex items-center gap-4">
          <Link href="/services" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            서비스
          </Link>
          <button className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50 shadow-sm hover:bg-white hover:shadow-md transition-all text-sm font-medium">
            <svg viewBox="0 0 24 24" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Google 로그인
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-2xl text-center space-y-8 z-10 mt-24"
      >


        <div className="relative">
          <h1 className="text-8xl md:text-9xl font-black tracking-tighter text-foreground pb-4 flex items-center justify-center gap-4">
            ORIRI
            <img src="/comes-logo.png" alt="Oriri Logo" className="w-24 h-24 md:w-32 md:h-32 object-contain -ml-2" />
          </h1>
        </div>

        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 backdrop-blur-md border border-white/60 shadow-sm text-green-700 text-sm font-semibold mb-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Bean className="w-4 h-4 fill-transparent stroke-[2.5]" />
          <span className="tracking-wide text-foreground/80">Seed부터 Unicorn까지, 팀 성장의 모든 것</span>
        </motion.div>

        <div className="pt-8 pb-4">
          <span className="text-lg text-muted-foreground font-medium bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm">
            지금 어떤 성장 단계에 있으신가요?
          </span>
        </div>
      </motion.div>

      {/* Startup Stage Infographic */}
      <div className="w-full max-w-4xl mb-12 relative z-10 hidden md:block">
        <div className="relative flex justify-between items-center px-12">
          {/* Connecting Line */}
          <div className="absolute left-12 right-12 top-1/2 h-1 bg-gradient-to-r from-green-200 via-emerald-400 to-teal-600 transform -translate-y-1/2 -z-10 rounded-full" />

          {STAGES.map((stage, i) => (
            <div key={stage.id} className="flex flex-col items-center bg-white/80 backdrop-blur rounded-xl p-3 border border-green-100 shadow-sm hover:scale-110 transition-transform cursor-default">
              <div className={cn("w-3 h-3 rounded-full mb-2 ring-4 ring-white",
                i === 0 ? "bg-green-300" :
                  i === 1 ? "bg-green-400" :
                    i === 2 ? "bg-emerald-500" : "bg-teal-600"
              )} />
              <span className="text-xs font-bold text-foreground/70">{stage.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stage Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl z-10 px-4">
        {STAGES.map((stage, index) => {
          // @ts-ignore
          const guide = HIRING_GUIDES[stage.id];

          return (
            <Dialog key={stage.id}>
              <DialogTrigger asChild>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  onHoverStart={() => setHoveredStage(stage.id)}
                  onHoverEnd={() => setHoveredStage(null)}
                  className={cn(
                    "relative h-[280px] p-6 rounded-[2rem] border border-white/40 transition-all duration-500 cursor-pointer overflow-hidden",
                    "bg-white/40 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:bg-white/60 hover:scale-[1.02] text-left",
                    "group-hover:border-green-400/30"
                  )}
                >
                  {/* Gradient Splash on Hover */}
                  <div className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br",
                    stage.id === 'pre-seed' && "from-green-400 to-transparent",
                    stage.id === 'angel' && "from-emerald-400 to-transparent",
                    stage.id === 'seed' && "from-teal-400 to-transparent",
                    stage.id === 'pre-a' && "from-cyan-400 to-transparent",
                  )} />

                  <div className="relative flex flex-col h-full justify-between z-10">
                    <div className="space-y-5">
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:rotate-6 bg-white",
                        "text-green-600"
                      )}>
                        <stage.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-foreground group-hover:text-green-700 transition-colors tracking-tight">
                          {stage.label}
                        </h3>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-sm text-foreground/70 font-medium leading-relaxed">
                        {stage.description}
                      </p>

                      <div className="flex items-center text-green-700 font-bold text-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        자세히 보기 <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </DialogTrigger>

              <DialogContent className="max-w-2xl bg-white/95 backdrop-blur-xl border-green-100 shadow-2xl rounded-3xl p-0 overflow-hidden font-taebaek">
                <div className="p-8 pb-0">
                  <DialogHeader className="mb-6 relative">
                    <DialogTitle className="text-3xl font-black font-jamsil flex items-center gap-3">
                      <div className="p-2 bg-green-50 rounded-xl">
                        <stage.icon className="w-8 h-8 text-green-600" />
                      </div>
                      {guide.title}
                    </DialogTitle>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {/* Investment Scale Badge */}
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-700 text-sm font-bold">
                        <Coins className="w-4 h-4 fill-yellow-400/20" />
                        <span>투자 규모: {guide.investmentScale}</span>
                      </div>
                    </div>
                    <DialogDescription className="text-lg text-foreground/80 mt-4 font-medium">
                      {guide.strategy}
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid md:grid-cols-2 gap-8 py-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="flex items-center gap-2 font-bold text-green-700 mb-2 font-jamsil">
                          <CheckCircle2 className="w-4 h-4" /> 주요 채용 포지션
                        </h4>
                        <ul className="space-y-2">
                          {guide.typicalRoles?.map((role: string, i: number) => (
                            <li key={i} className="text-sm bg-slate-50 px-3 py-2 rounded-lg border border-slate-100 font-medium text-slate-700">
                              {role}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="flex items-center gap-2 font-bold text-orange-600 mb-2 font-jamsil">
                          <X className="w-4 h-4" /> 주요 챌린지
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed bg-orange-50/50 p-3 rounded-lg">
                          {guide.challenges}
                        </p>
                      </div>
                    </div>

                    <div className="bg-green-50/50 p-6 rounded-2xl border border-green-100/50 flex flex-col justify-between">
                      <div>
                        <h4 className="text-lg font-bold text-green-800 mb-4 font-jamsil">Oriri Solution</h4>
                        <p className="text-sm text-green-900/80 leading-7">
                          {guide.solution}
                        </p>
                      </div>
                      <div className="mt-8">
                        <Link href={`/talent/request?stage=${stage.id}`}>
                          <Button className="w-full h-12 text-lg font-bold bg-green-600 hover:bg-green-700 shadow-lg shadow-green-200 font-jamsil focus-visible:ring-green-600 focus-visible:ring-offset-green-100">
                            인재찾기 <ChevronRight className="w-5 h-5 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-50 p-4 text-center text-xs text-muted-foreground border-t">
                  AI가 {guide.keywords.join(", ")} 중심의 매칭을 도와드립니다.
                </div>
              </DialogContent>
            </Dialog>
          )
        })}
      </div>

      {/* Footer / Decorative */}
      <div className="absolute bottom-10 text-[10px] text-muted-foreground/40 font-mono tracking-[0.2em] uppercase">
        Comes Talent Systems • v0.2.0 • Designed for Builders
      </div>
    </div>
  );
}
