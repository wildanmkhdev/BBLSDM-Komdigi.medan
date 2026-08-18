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
    // Update logo aplikasi dengan membuat record Media terpisah (tidak berbagi dengan banner/berita)
    const appLogos = [
      { name: "Sistem Manajemen Gudang", url: "https://img.icons8.com/color/96/warehouse.png" },
      { name: "Sistem Manajemen Kepegawaian", url: "https://img.icons8.com/color/96/gender-neutral-user.png" },
      { name: "E-Office & Surat Menyurat", url: "https://img.icons8.com/color/96/opened-folder-key.png" },
      { name: "Portal Pengajuan Magang", url: "https://img.icons8.com/color/96/student-male.png" },
      { name: "Katalog Pelatihan TIK", url: "https://img.icons8.com/color/96/computer.png" },
      { name: "Sistem Monitoring Jaringan", url: "https://img.icons8.com/color/96/network.png" },
      { name: "Perpustakaan Digital Balai", url: "https://img.icons8.com/color/96/library.png" },
      { name: "Dashboard Statistik Kinerja", url: "https://img.icons8.com/color/96/analytics.png" },
      { name: "Sistem Pengaduan Masyarakat (DUMAS)", url: "https://img.icons8.com/color/96/megaphone.png" },
      { name: "Layanan Feedback Komentar", url: "https://img.icons8.com/color/96/speech-bubble.png" },
    ];

    for (const logo of appLogos) {
      const app = await prisma.aplikasi.findFirst({
        where: { name: { contains: logo.name, mode: "insensitive" } },
        include: { logo: true }
      });

      if (app) {
        // Jika logo sudah ada dan storageKey-nya bertipe logos/ (logo spesifik), aman di-update
        if (app.logo && app.logo.storageKey.startsWith("logos/")) {
          if (app.logo.publicUrl !== logo.url) {
            await prisma.media.update({
              where: { id: app.logo.id },
              data: { publicUrl: logo.url }
            });
          }
        } else {
          // Jika belum ada logo, atau logonya menunjuk ke record bersama (misal kunker-nezar)
          // Buat record Media baru khusus untuk logo aplikasi ini
          const newMedia = await prisma.media.create({
            data: {
              originalName: `${app.name}-logo.png`,
              storageKey: `logos/${app.slug}.png`,
              publicUrl: logo.url,
              mimeType: "image/png",
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
