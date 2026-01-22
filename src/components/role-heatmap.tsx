"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RoleBalanceProps {
    roles: {
        hacker: number;  // Tech/Eng
        hustler: number; // Biz/Sales
        hipster: number; // Design/Product
    };
}

export function RoleBalanceHeatmap({ roles }: RoleBalanceProps) {
    const total = roles.hacker + roles.hustler + roles.hipster || 1;

    const getPercent = (val: number) => Math.round((val / total) * 100);

    return (
        <div className="space-y-4 w-full">
            <div className="flex h-12 rounded-lg overflow-hidden border border-border/50 shadow-sm font-taebaek">
                {/* Hacker */}
                {roles.hacker > 0 && (
                    <div
                        style={{ width: `${getPercent(roles.hacker)}%` }}
                        className="bg-blue-500/10 hover:bg-blue-500/20 transition-colors flex flex-col items-center justify-center border-r last:border-r-0 border-blue-500/20 group relative cursor-pointer"
                    >
                        <span className="text-xs font-bold text-blue-700">Hacker</span>
                        <span className="text-[10px] text-blue-600/80">{getPercent(roles.hacker)}%</span>
                        <div className="absolute bottom-full mb-2 hidden group-hover:block bg-popover text-popover-foreground text-[10px] p-2 rounded shadow-lg border">
                            기술 구현 및 제품 개발 (Tech)
                        </div>
                    </div>
                )}

                {/* Hustler */}
                {roles.hustler > 0 && (
                    <div
                        style={{ width: `${getPercent(roles.hustler)}%` }}
                        className="bg-green-500/10 hover:bg-green-500/20 transition-colors flex flex-col items-center justify-center border-r last:border-r-0 border-green-500/20 group relative cursor-pointer"
                    >
                        <span className="text-xs font-bold text-green-700">Hustler</span>
                        <span className="text-[10px] text-green-600/80">{getPercent(roles.hustler)}%</span>
                        <div className="absolute bottom-full mb-2 hidden group-hover:block bg-popover text-popover-foreground text-[10px] p-2 rounded shadow-lg border">
                            비즈니스 모델 및 성장 (Biz)
                        </div>
                    </div>
                )}

                {/* Hipster */}
                {roles.hipster > 0 && (
                    <div
                        style={{ width: `${getPercent(roles.hipster)}%` }}
                        className="bg-pink-500/10 hover:bg-pink-500/20 transition-colors flex flex-col items-center justify-center group relative cursor-pointer"
                    >
                        <span className="text-xs font-bold text-pink-700">Hipster</span>
                        <span className="text-[10px] text-pink-600/80">{getPercent(roles.hipster)}%</span>
                        <div className="absolute bottom-full mb-2 hidden group-hover:block bg-popover text-popover-foreground text-[10px] p-2 rounded shadow-lg border">
                            사용자 경험 및 디자인 (Design/CX)
                        </div>
                    </div>
                )}
            </div>

            <div className="flex justify-between text-[10px] text-muted-foreground font-taebaek px-1">
                <span>The Golden Triangle: 균형 잡힌 3H (Hacker, Hustler, Hipster) 구조</span>
                {total < 3 && <span className="text-orange-500 font-bold">⚠️ 초기 팀 구성원이 부족합니다</span>}
            </div>
        </div>
    );
}
