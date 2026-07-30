import React from "react";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";
import { auth, signOut } from "@/auth";

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
      <body className="min-h-full flex bg-slate-50 text-slate-900 font-sans w-full">
        {/* Sidebar Stub */}
        <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col shrink-0">
          <div className="h-16 flex items-center px-6 border-b border-slate-800 font-bold text-lg tracking-wider text-cyan-400">
            CMS BBLSDM
          </div>
          <nav className="flex-1 px-4 py-6 space-y-1">
            <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Core</div>
            <a href="/admin" className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-slate-800 text-white">
              Dashboard
            </a>
            <a href="/admin/media" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition">
              Media Library
            </a>
            <a href="/admin/banner" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition">
              Banner Slider
            </a>
            <div className="pt-4 px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Editorial</div>
            <a href="/admin/berita" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition">
              Berita
            </a>
            <a href="/admin/staf" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition">
              Direktori Staf
            </a>
            <a href="/admin/magang" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition">
              Inbox Magang
            </a>
          </nav>
          <div className="p-4 border-t border-slate-800 text-xs text-slate-400">
            Logged in as Admin
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
