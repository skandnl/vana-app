import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";

export default function TalentResponsePage() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            {/* Reusing Navbar for simplicity, though real talent view might be different */}

            <div className="flex-1 flex items-center justify-center p-4">
                <Card className="max-w-md w-full">
                    <CardHeader>
                        <div className="flex items-center gap-2 text-primary mb-2">
                            <span className="text-xs font-bold uppercase tracking-wider border border-primary px-2 py-0.5 rounded-full">
                                Vana Scouting Request
                            </span>
                        </div>
                        <CardTitle className="text-2xl">Project Alpha</CardTitle>
                        <CardDescription>
                            We noticed your impressive work on distributed message queues. We'd like to discuss a Lead Backend role.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-4 rounded-lg bg-secondary/20 border text-sm">
                            <p className="font-semibold mb-1">Role Details</p>
                            <p className="text-muted-foreground">Lead Backend Engineer • $150k - $220k • Remote</p>
                        </div>
                        <p className="text-sm">
                            "We are looking for someone who has deep expertise in event-driven architectures. Your contribution to [Repo Name] caught our eye."
                        </p>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                        <Link href="/" className="flex-1">
                            <Button variant="outline" className="w-full">
                                <X className="mr-2 h-4 w-4" /> 거절하기
                            </Button>
                        </Link>
                        <Link href="/" className="flex-1">
                            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-lg">
                                <SparklesIcon className="mr-2 h-4 w-4" /> AI 인터뷰 시작하기
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        </svg>
    );
}
