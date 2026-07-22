import PublicationDocumentList, { DocumentItem } from "@/components/PublicationDocumentList";

export default function LaptahPage() {
  const documents: DocumentItem[] = [
    {
      id: "laptah-2024",
      title: "Laporan Tahunan (LAPTAH) BBLSDM Komdigi Medan Tahun 2024",
      category: "Laporan Tahunan",
      year: "2024",
      fileSize: "8.5 MB",
      fileFormat: "PDF",
      publishDate: "10 Februari 2025",
      description:
        "Rangkuman komprehensif seluruh aktivitas, inovasi program Digital Talent Scholarship (DTS), kemitraan daerah, serta capaian strategis instansi selama tahun 2024.",
    },
    {
      id: "laptah-2023",
      title: "Laporan Tahunan (LAPTAH) BBLSDM Komdigi Medan Tahun 2023",
      category: "Laporan Tahunan",
      year: "2023",
      fileSize: "7.9 MB",
      fileFormat: "PDF",
      publishDate: "15 Februari 2024",
      description:
        "Laporan riwayat kegiatan pelatihan vokasi digital, riset kebijakan komunikasi, dan pengembangan sarana prasarana laboratorium balai.",
    },
    {
      id: "laptah-2022",
      title: "Laporan Tahunan (LAPTAH) BBLSDM Komdigi Medan Tahun 2022",
      category: "Laporan Tahunan",
      year: "2022",
      fileSize: "7.1 MB",
      fileFormat: "PDF",
      publishDate: "12 Februari 2023",
      description:
        "Dokumentasi tahunan perjalan program diklat aparatur dan masyarakat umum di 5 provinsi wilayah kerja balai besar.",
    },
  ];

  return (
    <PublicationDocumentList
      categoryTitle="Laporan Tahunan (LAPTAH)"
      categoryBadge="Publikasi Resmi"
      subtitle="Daftar Dokumen LAPTAH"
      description="Laporan Tahunan menyajikan kilas balik komprehensif mengenai seluruh kegiatan, milestone strategis, dan dampak pemanfaatan program pelatihan serta riset bagi masyarakat."
      documents={documents}
    />
  );
}
