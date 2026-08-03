import React from "react";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Autentikasi — BBLSDM Komdigi Medan",
  description: "Halaman Masuk dan Pendaftaran Akun",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} h-full antialiased`}>
      <body className="min-h-full flex bg-slate-900 text-slate-900 font-sans w-full">
        <main className="w-full flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
