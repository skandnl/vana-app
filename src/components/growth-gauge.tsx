"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GrowthGaugeProps {
    score: number;
    size?: number;
    strokeWidth?: number;
    label?: string;
}

export function GrowthScoreGauge({ score, size = 200, strokeWidth = 15, label = "Growth Readiness" }: GrowthGaugeProps) {
    const radius = size / 2;
    const normalizedScore = Math.min(100, Math.max(0, score));
    const circumference = 2 * Math.PI * (radius - strokeWidth);
    const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;

    // Color logic
    let color = "text-red-500";
    let grade = "C-";
    if (score >= 90) { color = "text-blue-600"; grade = "S"; }
    else if (score >= 80) { color = "text-green-500"; grade = "A"; }
    else if (score >= 70) { color = "text-yellow-500"; grade = "B"; }
    else if (score >= 60) { color = "text-orange-500"; grade = "C"; }

    return (
        <div className="relative flex flex-col items-center justify-center p-4">
            <svg width={size} height={size} className="transform -rotate-90">
                {/* Background Ring */}
                <circle
                    cx={radius}
                    cy={radius}
                    r={radius - strokeWidth}
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    className="text-muted/20"
                />

                {/* Progress Ring */}
                <motion.circle
                    cx={radius}
                    cy={radius}
                    r={radius - strokeWidth}
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    strokeLinecap="round"
                    className={cn(color)}
                />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs text-muted-foreground font-taebaek uppercase tracking-wider">{label}</span>
                <div className="flex items-baseline">
                    <motion.span
                        className={cn("text-5xl font-bold font-jamsil", color)}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        {score}
                    </motion.span>
                    <span className="text-sm text-muted-foreground ml-1">/100</span>
                </div>
                <Badge className={cn("mt-2 px-3 py-0.5 text-xs font-bold", color.replace("text-", "bg-").replace("600", "100").replace("500", "100"), color)}>
                    Grade {grade}
                </Badge>
            </div>
        </div>
    );
}

import { Badge } from "@/components/ui/badge";
