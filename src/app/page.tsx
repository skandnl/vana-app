"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sprout, Leaf, TreeDeciduous, TreePalm } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

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
    <div className="min-h-screen bg-mesh-gradient text-foreground flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">

      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-300/20 rounded-full blur-[100px] pointer-events-none mix-blend-multiply animate-blob" />
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-300/20 rounded-full blur-[100px] pointer-events-none mix-blend-multiply animate-blob animation-delay-2000" />
      <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] bg-pink-300/20 rounded-full blur-[100px] pointer-events-none mix-blend-multiply animate-blob animation-delay-4000" />

      {/* Header with Login */}
      <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50">
        <div className="text-xl font-bold tracking-tighter">VANA</div>
        <div className="flex items-center gap-4">
          <Link href="/services" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            채용 프로세스
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
        className="max-w-2xl text-center space-y-8 z-10"
      >
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 backdrop-blur-md border border-white/60 shadow-sm text-primary text-sm font-semibold mb-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Sprout className="w-4 h-4 fill-primary/20" />
          <span className="tracking-wide text-foreground/80">Seed부터 Unicorn까지, 팀 성장의 모든 것</span>
        </motion.div>

        <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-liquid-glass pb-4">
          VANA
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-lg mx-auto leading-relaxed font-light">
          세상을 바꿀 <span className="text-foreground font-semibold">빌더(Builder)</span>들을 위한<br />AI 인재 매칭 엔진.
          <br />
          <br />
          <span className="text-lg">지금 어떤 성장 단계에 있으신가요?</span>
        </p>
      </motion.div>

      {/* Stage Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl mt-20 z-10 px-4">
        {STAGES.map((stage, index) => (
          <Link
            key={stage.id}
            href={`/talent/request?stage=${stage.id}`}
            className="group"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              onHoverStart={() => setHoveredStage(stage.id)}
              onHoverEnd={() => setHoveredStage(null)}
              className={cn(
                "relative h-[280px] p-6 rounded-[2rem] border border-white/40 transition-all duration-500 cursor-pointer overflow-hidden",
                "bg-white/40 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:bg-white/60 hover:scale-[1.02]",
                "group-hover:border-primary/30"
              )}
            >
              {/* Gradient Splash on Hover */}
              <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br",
                stage.id === 'pre-seed' && "from-orange-400 to-transparent",
                stage.id === 'seed' && "from-green-400 to-transparent",
                stage.id === 'late-seed' && "from-emerald-400 to-transparent",
                stage.id === 'pre-a' && "from-blue-400 to-transparent",
              )} />

              <div className="relative flex flex-col h-full justify-between z-10">
                <div className="space-y-5">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:rotate-6 bg-white",
                    stage.color
                  )}>
                    <stage.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors tracking-tight">
                      {stage.label}
                    </h3>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground/80 font-medium leading-relaxed">
                    {stage.description}
                  </p>

                  <div className="flex items-center text-primary font-bold text-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    선택하기 <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Footer / Decorative */}
      <div className="absolute bottom-10 text-[10px] text-muted-foreground/40 font-mono tracking-[0.2em] uppercase">
        Vana Talent Systems • v0.2.0 • Designed for Builders
      </div>
    </div>
  );
}
