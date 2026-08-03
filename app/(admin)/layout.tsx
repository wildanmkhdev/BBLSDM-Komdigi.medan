import React from "react";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";
import { auth, signOut } from "@/auth";

import SidebarNav from "./admin/SidebarNav";

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

  return (
    <html lang="id" className={`${plusJakartaSans.variable} h-full antialiased`}>
      <body className="min-h-full flex bg-[#f8fafc] text-slate-900 font-sans w-full">
        {/* Sidebar */}
        <aside className="w-64 bg-[#0b1b3d] text-white flex flex-col shrink-0 shadow-xl border-r border-[#0b1b3d]/10">
          <div className="h-16 flex items-center justify-between px-6 border-b border-white/10">
            <span className="font-extrabold text-sm tracking-wider uppercase text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse inline-block" />
              CMS BBLSDM
            </span>
          </div>
          <SidebarNav userRole={session?.user?.role} />
          <div className="p-4 border-t border-white/10 text-[10px] text-slate-400 font-medium tracking-wide">
            Logged in as: <span className="text-white block mt-0.5">{session?.user?.name || session?.user?.email}</span>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
          {/* Topbar Stub */}
          <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
            <div className="flex items-center space-x-2 text-sm text-slate-500">
              <span>Dashboard</span>
              <span>/</span>
              <span className="font-semibold text-slate-900">Home</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">{session?.user?.name || session?.user?.email || "Admin User"}</span>
              <form action={async () => {
                "use server";
                await signOut({ redirectTo: "/login" });
              }}>
                <button type="submit" className="text-xs font-semibold text-red-600 hover:text-red-800 cursor-pointer font-sans">
                  Sign out
                </button>
              </form>
            </div>
          </header>

          {/* Content Page */}
          <main className="flex-1 p-8 overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
