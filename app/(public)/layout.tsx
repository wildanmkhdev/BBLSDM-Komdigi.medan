import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import NextTopLoader from "nextjs-toploader";

import fs from "fs";
import path from "path";

try {
  const src = "/home/wildan/.gemini/antigravity-ide/brain/c1e81b48-7abd-429f-af50-95cb1a48f421/media__1787014366919.png";
  const dest = "/home/wildan/Documents/project-magang/public/logo-bblsdm.png";
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
  }
} catch (err) {
  console.error("Error copying logo:", err);
}

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "BBLSDM Komdigi Medan",
    template: "%s — BBLSDM Komdigi Medan",
  },
  description:
    "Website resmi Balai Besar Pengembangan SDM dan Penelitian Komunikasi dan Informatika Medan.",
};

export default function PublicRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-text-dark bg-body">
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
        <SessionProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SessionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
