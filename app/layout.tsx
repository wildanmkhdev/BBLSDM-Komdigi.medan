import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BBLSDM Komdigi Medan — Portal Resmi",
  description: "Balai Besar Pengembangan Sumber Daya Manusia dan Penelitian Komunikasi dan Informatika Medan. Menyelenggarakan pelatihan, sertifikasi, penelitian komunikasi dan informatika.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-body text-nav-text-default">
        {children}
      </body>
    </html>
  );
}

