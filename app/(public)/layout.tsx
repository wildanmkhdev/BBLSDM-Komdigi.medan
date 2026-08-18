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
import prisma from "@/lib/prisma";

try {
  const src = "/home/wildan/.gemini/antigravity-ide/brain/c1e81b48-7abd-429f-af50-95cb1a48f421/media__1787014366919.png";
  const dest = "/home/wildan/Documents/project-magang/public/logo-bblsdm.png";
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
  }
} catch (err) {
  console.error("Error copying logo:", err);
}

async function updateLogos() {
  try {
    const appLogos = [
      { name: "Sistem Manajemen Gudang", url: "https://api.iconify.design/lucide:boxes.svg?color=%230284c7" },
      { name: "Sistem Manajemen Kepegawaian", url: "https://api.iconify.design/lucide:users-round.svg?color=%230284c7" },
      { name: "E-Office & Surat Menyurat", url: "https://api.iconify.design/lucide:mail-open.svg?color=%230284c7" },
      { name: "Portal Pengajuan Magang", url: "https://api.iconify.design/lucide:graduation-cap.svg?color=%230284c7" },
      { name: "Katalog Pelatihan TIK", url: "https://api.iconify.design/lucide:monitor-play.svg?color=%230284c7" },
      { name: "Sistem Monitoring Jaringan", url: "https://api.iconify.design/lucide:network.svg?color=%230284c7" },
      { name: "Perpustakaan Digital Balai", url: "https://api.iconify.design/lucide:library.svg?color=%230284c7" },
      { name: "Dashboard Statistik Kinerja", url: "https://api.iconify.design/lucide:bar-chart-3.svg?color=%230284c7" },
      { name: "Sistem Pengaduan Masyarakat (DUMAS)", url: "https://api.iconify.design/lucide:megaphone.svg?color=%230284c7" },
      { name: "Layanan Feedback Komentar", url: "https://api.iconify.design/lucide:message-square-text.svg?color=%230284c7" },
    ];

    for (const logo of appLogos) {
      const app = await prisma.aplikasi.findFirst({
        where: { name: { contains: logo.name, mode: "insensitive" } },
        include: { logo: true }
      });

      if (app) {
        if (app.logo) {
          await prisma.media.update({
            where: { id: app.logo.id },
            data: { publicUrl: logo.url }
          });
        } else {
          const newMedia = await prisma.media.create({
            data: {
              originalName: `${app.name}-logo.svg`,
              storageKey: `logos/${app.slug}.svg`,
              publicUrl: logo.url,
              mimeType: "image/svg+xml",
              fileSize: BigInt(1000),
              type: "IMAGE"
            }
          });
          await prisma.aplikasi.update({
            where: { id: app.id },
            data: { logoId: newMedia.id }
          });
        }
      }
    }
  } catch (err) {
    console.error("Error updating logos:", err);
  }
}

updateLogos();

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
