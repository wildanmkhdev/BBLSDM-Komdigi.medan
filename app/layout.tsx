import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: {
    default: "BBLSDM Komdigi Medan",
    template: "%s — BBLSDM Komdigi Medan",
  },
  description:
    "Website resmi Balai Besar Litbang Sumber Daya Manusia, Kementerian Komunikasi dan Digital, Wilayah Medan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans text-text-dark bg-body">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
