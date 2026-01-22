"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, CheckCircle2, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Mock Data for Available Slots
const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const TIME_SLOTS = ["10:00", "11:00", "14:00", "15:00", "16:00"];

const MOCK_AVAILABILITY: Record<string, string[]> = {
    "Mon": ["10:00", "14:00"],
    "Tue": ["11:00", "15:00", "16:00"],
    "Wed": ["10:00", "11:00", "14:00", "15:00"],
    "Thu": ["10:00", "16:00"],
    "Fri": ["14:00", "15:00"],
};

export default function ConsultingBookingPage() {
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    const [clientName, setClientName] = useState("");

    const handleSlotClick = (day: string, time: string) => {
        setSelectedDay(day);
        setSelectedTime(time);
        setIsBookingOpen(true);
    };

    const handleConfirmBooking = () => {
        setIsBookingOpen(false);
        // Simulate API call
        setTimeout(() => {
            setIsSuccessOpen(true);
        }, 500);
    };

    return (
        <div className="min-h-screen bg-slate-50/50 p-6 md:p-12 font-sans">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <Link href="/">
                        <Button variant="ghost" className="text-muted-foreground hover:text-foreground pl-0 mb-4">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                        </Button>
                    </Link>
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">HR Expert Consultation</h1>
                        <p className="text-muted-foreground">
                            전문 HR 컨설턴트와의 1:1 미팅을 통해 초기 팀 빌딩 전략을 점검받으세요.
                        </p>
                    </div>
                </header>

                <Card className="border-border/50 shadow-sm bg-white top-card">
                    <CardContent className="p-8">
                        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
                            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                                <User className="w-8 h-8 text-green-600" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">송근영</h2>
                                <p className="text-sm text-green-600 font-medium">HR 해결사 (Senior Consultant)</p>
                                <p className="text-sm text-muted-foreground mt-1">Specialized in Pre-seed & Angel stage team building.</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-5 gap-4">
                            {WEEK_DAYS.map((day) => (
                                <div key={day} className="space-y-3">
                                    <div className="text-center font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-4">
                                        {day}
                                    </div>
                                    {TIME_SLOTS.map((time) => {
                                        const isAvailable = MOCK_AVAILABILITY[day]?.includes(time);
                                        return (
                                            <button
                                                key={`${day}-${time}`}
                                                disabled={!isAvailable}
                                                onClick={() => isAvailable && handleSlotClick(day, time)}
                                                className={cn(
                                                    "w-full py-2 px-3 rounded-lg text-sm font-medium transition-all border",
                                                    isAvailable
                                                        ? "bg-white border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 shadow-sm"
                                                        : "bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed"
                                                )}
                                            >
                                                {time}
                                            </button>
                                        )
                                    })}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Booking Dialog */}
                <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>예약 확인</DialogTitle>
                            <DialogDescription>
                                선택하신 일정으로 상담을 예약하시겠습니까?
                            </DialogDescription>
                        </DialogHeader>
                        <div className="py-4 space-y-4">
                            <div className="flex items-center gap-2 text-sm font-medium p-3 bg-slate-50 rounded-lg">
                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                <span>{selectedDay}요일</span>
                                <span className="text-gray-300">|</span>
                                <Clock className="w-4 h-4 text-muted-foreground" />
                                <span>{selectedTime}</span>
                            </div>
                            <div className="space-y-2">
                                <Label>예약자 성함</Label>
                                <Input
                                    placeholder="홍길동"
                                    value={clientName}
                                    onChange={(e) => setClientName(e.target.value)}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsBookingOpen(false)}>취소</Button>
                            <Button onClick={handleConfirmBooking} disabled={!clientName}>예약 확정</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Success Dialog */}
                <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
                    <DialogContent className="sm:max-w-md">
                        <div className="flex flex-col items-center justify-center space-y-4 py-6 text-center">
                            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
                                <CheckCircle2 className="w-6 h-6 text-green-600" />
                            </div>
                            <h2 className="text-xl font-bold">예약이 완료되었습니다!</h2>
                            <p className="text-sm text-muted-foreground max-w-[260px]">
                                입력하신 이메일로 일정 안내 메일이 발송되었습니다.
                            </p>
                            <Button className="w-full mt-4" onClick={() => {
                                setIsSuccessOpen(false);
                                setSelectedDay(null);
                                setSelectedTime(null);
                            }}>
                                확인
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>

            </div>
        </div>
    );
}
