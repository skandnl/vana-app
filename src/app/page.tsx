import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Zap } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center items-center text-center pt-32 pb-16 px-4 space-y-8 bg-gradient-to-b from-background via-background to-secondary/5">
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors focus:outline-none border-primary/20 bg-primary/10 text-primary backdrop-blur-md">
            스케일업을 위한 HR 자동화 솔루션
          </div>
          <h1 className="text-5xl sm:text-7xl font-semibold tracking-tight lg:text-8xl leading-none">
            모든 경계의 인재를
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              자동으로 연결합니다
            </span>
          </h1>
          <p className="mx-auto max-w-3xl text-muted-foreground text-xl sm:text-2xl leading-relaxed font-light">
            직접 지원한 <strong>Inner Boundary</strong>부터 숨겨진 <strong>Outer Boundary</strong> 인재까지.<br className="hidden sm:block" />
            리크루팅부터 면접 전까지의 모든 프로세스를 자동화하세요.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-8">
          <Link href="/dashboard">
            <Button size="lg" className="h-14 px-8 text-lg gap-2 rounded-full font-medium">
              무료로 시작하기 <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/about">
            <Button size="lg" variant="secondary" className="h-14 px-8 text-lg rounded-full font-medium bg-secondary/50 backdrop-blur-sm hover:bg-secondary/70">
              서비스 소개
            </Button>
          </Link>
        </div>
      </section>

      {/* Value Prop Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center space-y-4 p-8 rounded-3xl bg-secondary/30 backdrop-blur-md border border-white/5 hover:bg-secondary/40 transition-colors">
              <div className="p-4 rounded-full bg-blue-500/10 text-blue-500 mb-2">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-semibold">HR 프로세스 자동화</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                공고 게시부터 메일 발송, 응답 수집까지. 한정된 인력으로 인한 채용의 병목 현상을 기술로 해결합니다.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 p-8 rounded-3xl bg-secondary/30 backdrop-blur-md border border-white/5 hover:bg-secondary/40 transition-colors">
              <div className="p-4 rounded-full bg-blue-500/10 text-blue-500 mb-2">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-semibold">Inner & Outer 풀 통합</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                42 SEOUL, SW마에스트로 등 검증된 교육기관 및 커뮤니티와 협력하여 비숙련 청년부터 전문 인력까지 모두 연결합니다.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 p-8 rounded-3xl bg-secondary/30 backdrop-blur-md border border-white/5 hover:bg-secondary/40 transition-colors">
              <div className="p-4 rounded-full bg-blue-500/10 text-blue-500 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold">AI 인터뷰 & 스크리닝</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                AI가 이메일 대화를 통해 자기소개서 너머의 정보를 수집하고, 성향(MBTI)까지 분석하여 최적의 후보자를 리포트합니다.
              </p>
            </div>
          </div>
        </div>
      </section>
      <footer className="py-12 text-center text-muted-foreground text-sm">
        <p>© 2026 Vana Inc. All rights reserved.</p>
      </footer>
    </main>
  );
}
