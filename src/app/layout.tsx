import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nav-Mitra Platform",
  description: "Frictionless Innovation Procurement for Government",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-text-primary relative overflow-x-hidden selection:bg-gov-orange selection:text-white">
        {/* Aesthetic Background Orbs for Premium UI */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-200/40 mix-blend-multiply filter blur-[100px] opacity-70 animate-pulse"></div>
          <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-orange-200/40 mix-blend-multiply filter blur-[100px] opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-purple-200/30 mix-blend-multiply filter blur-[100px] opacity-70 animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>
        
        <Navbar />
        <main className="flex-1 flex flex-col z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
