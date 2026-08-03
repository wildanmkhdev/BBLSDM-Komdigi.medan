import type { Metadata } from "next";
import PageHeader from "@/app/components/PageHeader";
import TugasFungsiContent from "./TugasFungsiContent";

export const metadata: Metadata = {
  title: "Tugas dan Fungsi",
  description:
    "Tugas pokok dan fungsi operasional Balai Besar Pelatihan Sumber Daya Manusia Komunikasi dan Digital (BBLSDM Komdigi) Medan berdasarkan Peraturan Menteri Komdigi No. 3 Tahun 2026.",
};

export default function TugasFungsiPage() {
  return (
    <div className="bg-white min-h-screen">
      <PageHeader
        title="Tugas dan Fungsi"
        subtitle="Deskripsi lengkap tugas pokok dan fungsi operasional di BBLSDM Komdigi Medan"
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Profil", href: "#" },
          { label: "Tugas dan Fungsi" },
        ]}
        className="pt-28 pb-19 sm:pt-32 sm:pb-23"
      />
      <TugasFungsiContent />
    </div>
  );
}
