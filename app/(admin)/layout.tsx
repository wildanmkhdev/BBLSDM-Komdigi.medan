import React from "react";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";
import { auth, signOut } from "@/auth";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Image from "next/image";


import SidebarNav from "./admin/SidebarNav";
import NextTopLoader from "nextjs-toploader";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Admin CMS — BBLSDM Komdigi Medan",
  description: "Panel Administrasi Content Management System",
};

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const userName = session?.user?.name || session?.user?.email || "Admin User";
  const userRole = session?.user?.role || "ADMIN";

  return (
    <html lang="id" className={`${plusJakartaSans.variable} h-full antialiased`}>
      <body className="min-h-full flex bg-[#f8fafc] text-slate-900 font-sans w-full">
        <NextTopLoader
          color="#0284c7"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #0284c7,0 0 5px #0284c7"
        />
        {/* Sidebar */}
        <aside className="w-64 bg-[#0b1b3d] text-white flex flex-col shrink-0 shadow-xl border-r border-[#0b1b3d]/10">
          <div className="h-16 flex items-center justify-center border-b border-white/10 bg-[#0b1b3d] px-6">
            <Image src="/logo komdigi.png" alt="Logo Komdigi" width={180} height={44} className="h-11 w-auto object-contain transition-transform duration-200 hover:scale-105" priority />
          </div>
          <SidebarNav userRole={session?.user?.role} />
          <div className="p-4 border-t border-white/10 text-[10px] text-slate-400 font-medium tracking-wide">
            Logged in as: <span className="text-white block mt-0.5">{userName}</span>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
          {/* Topbar / Header */}
          <header className="h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10 shadow-xs">
            {/* Left Side: Navigation Info & Status */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <span className="hover:text-slate-600 transition-colors">Dashboard</span>
                <svg className="w-3 h-3 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-[#0b1b3d] font-bold">Home</span>
              </div>
              <span className="h-4 w-px bg-slate-200" />
              <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-100/80 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">System Online</span>
              </div>
            </div>

            {/* Right Side: Notifications stub, User Card, and Logout */}
            <div className="flex items-center space-x-6">
              {/* Notifications Icon Stub */}
              <button className="text-slate-400 hover:text-slate-600 relative p-1.5 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer" title="Notifikasi">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#0284c7] rounded-full ring-2 ring-white" />
              </button>

              {/* User Profile Card */}
              <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
                {/* Avatar Initials Bubble */}
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0b1b3d] to-[#1e3a8a] text-white font-extrabold flex items-center justify-center text-sm shadow-sm border border-white/10 select-none">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-800 leading-tight">
                    {userName}
                  </span>
                  <span className="text-[9px] font-bold text-[#0284c7] bg-sky-50 border border-sky-100 rounded-md px-1.5 py-0.5 leading-none uppercase mt-1 w-fit">
                    {userRole}
                  </span>
                </div>
              </div>

              {/* Logout Button */}
              <form action={async () => {
                "use server";
                await signOut({ redirectTo: "/login" });
              }}>
                <button type="submit" className="flex items-center gap-1.5 px-3.5 py-1.5 bg-red-50 hover:bg-red-100 border border-red-100 text-red-600 hover:text-red-700 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer font-sans">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Keluar
                </button>
              </form>
            </div>
          </header>

          {/* Content Page */}
          <main className="flex-1 p-8 overflow-y-auto">
            {children}
          </main>
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

