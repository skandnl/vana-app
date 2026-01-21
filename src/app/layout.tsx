import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google"; // Added Outfit
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" }); // Added Outfit config

export const metadata: Metadata = {
  title: "Comes | AI-Powered Tech Scouting",
  description: "The future of elite talent scouting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.variable, outfit.variable, "antialiased font-sans")}>{children}</body>
    </html>
  );
}
