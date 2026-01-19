import { Navbar } from "@/components/navbar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="container mx-auto py-24 px-4 md:px-8 max-w-7xl">
                {children}
            </div>
        </div>
    );
}
