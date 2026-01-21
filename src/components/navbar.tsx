import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
    return (
        <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 fixed w-full top-0 z-50">
            <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-8">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-xl font-bold tracking-tight text-primary">
                            COMES
                        </span>
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/login">
                        <Button variant="ghost" size="sm" className="hidden sm:flex">
                            로그인
                        </Button>
                    </Link>
                    <Link href="/dashboard">
                        <Button size="sm">시작하기</Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
