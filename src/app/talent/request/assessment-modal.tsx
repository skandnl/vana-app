"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ArrowRight, ArrowLeft, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { ASSESSMENT_QUESTIONS, AssessmentQuestion } from "@/lib/data/assessment-questions";

interface AssessmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onComplete: (answers: Record<string, number>, memberId: string) => void;
    memberName: string;
    memberId: string;
    initialAnswers?: Record<string, number>;
}

export function AssessmentModal({ isOpen, onClose, onComplete, memberName, memberId, initialAnswers }: AssessmentModalProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>(initialAnswers || {});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const questions = ASSESSMENT_QUESTIONS;
    const totalSteps = questions.length;
    const progress = ((currentStep) / totalSteps) * 100;

    useEffect(() => {
        if (isOpen) {
            setAnswers(initialAnswers || {});
            setCurrentStep(0);
        }
    }, [isOpen]);

    const handleAnswer = (score: number) => {
        setAnswers(prev => ({ ...prev, [questions[currentStep].id]: score }));
        if (currentStep < totalSteps - 1) {
            setTimeout(() => setCurrentStep(prev => prev + 1), 250); // Auto-advance with slight delay for feedback
        }
    };

    const handleReview = () => {
        // Submit
        setIsSubmitting(true);
        // Simulate processing
        setTimeout(() => {
            onComplete(answers, memberId);
            setIsSubmitting(false);
            onClose();
        }, 500);
    };

    const currentQuestion = questions[currentStep];

    if (!currentQuestion) return null;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[600px] h-[500px] flex flex-col p-0 overflow-hidden bg-background">
                <div className="p-6 pb-2 border-b">
                    <div className="flex justify-between items-center mb-2">
                        <DialogTitle className="text-xl font-jamsil text-primary">
                            {memberName}님의 역량 진단
                        </DialogTitle>
                        <span className="text-sm font-bold text-muted-foreground font-taebaek">
                            {currentStep + 1} / {totalSteps}
                        </span>
                    </div>
                    <Progress value={((currentStep + 1) / totalSteps) * 100} className="h-2" />
                </div>

                <div className="flex-1 p-8 flex flex-col justify-center items-center relative overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="w-full max-w-md space-y-8 text-center"
                        >
                            <div className="space-y-4">
                                <span className={cn(
                                    "inline-block px-3 py-1 rounded-full text-xs font-bold font-taebaek uppercase tracking-wider",
                                    currentQuestion.category === 'safety' ? "bg-green-100 text-green-700" :
                                        currentQuestion.category === 'execution' ? "bg-blue-100 text-blue-700" :
                                            currentQuestion.category === 'grit' ? "bg-amber-100 text-amber-700" :
                                                currentQuestion.category === 'openness' ? "bg-purple-100 text-purple-700" :
                                                    currentQuestion.category === 'impact' ? "bg-rose-100 text-rose-700" :
                                                        "bg-secondary text-secondary-foreground"
                                )}>
                                    {currentQuestion.category.toUpperCase()}
                                </span>
                                <h3 className="text-xl md:text-2xl font-bold font-jamsil leading-relaxed break-keep">
                                    "{currentQuestion.text}"
                                </h3>
                            </div>

                            <div className="grid grid-cols-5 gap-2 pt-4">
                                {[1, 2, 3, 4, 5].map((score) => (
                                    <button
                                        key={score}
                                        onClick={() => handleAnswer(score)}
                                        className={cn(
                                            "flex flex-col items-center gap-2 group transition-all duration-200",
                                            answers[currentQuestion.id] === score ? "scale-110" : "hover:scale-105"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-12 h-12 rounded-full border-2 flex items-center justify-center text-lg font-bold transition-all",
                                            answers[currentQuestion.id] === score
                                                ? "bg-primary border-primary text-primary-foreground shadow-lg"
                                                : "bg-background border-muted hover:border-primary/50 text-muted-foreground"
                                        )}>
                                            {score}
                                        </div>
                                        <span className="text-[10px] text-muted-foreground font-taebaek opacity-80 group-hover:opacity-100">
                                            {score === 1 && "전혀 아님"}
                                            {score === 5 && "매우 그렇다"}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="p-6 border-t bg-secondary/10 flex justify-between items-center">
                    <Button
                        variant="ghost"
                        onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                        disabled={currentStep === 0}
                        className="font-taebaek text-muted-foreground"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> 이전
                    </Button>

                    <Button
                        onClick={currentStep === totalSteps - 1 ? handleReview : () => setCurrentStep(prev => Math.min(totalSteps - 1, prev + 1))}
                        disabled={!answers[currentQuestion.id]}
                        className="font-taebaek"
                    >
                        {currentStep === totalSteps - 1 ? (isSubmitting ? "분석 중..." : "진단 완료") : "다음 문항"}
                        {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2" />}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
