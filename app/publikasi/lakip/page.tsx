import PublicationDocumentList, { DocumentItem } from "@/components/PublicationDocumentList";

export default function LakipPage() {
  const documents: DocumentItem[] = [
    {
      id: "lakip-2024",
      title: "Laporan Akuntabilitas Kinerja Instansi Pemerintah (LAKIP) Tahun 2024",
      category: "Laporan Kinerja",
      year: "2024",
      fileSize: "4.2 MB",
      fileFormat: "PDF",
      publishDate: "25 Januari 2025",
      description:
        "Laporan evaluasi pencapaian sasaran strategis, Indikator Kinerja Utama (IKU), serta realisasi penggunaan anggaran DIPA BBLSDM Komdigi Medan Tahun 2024.",
    },
    {
      id: "lakip-2023",
      title: "Laporan Akuntabilitas Kinerja Instansi Pemerintah (LAKIP) Tahun 2023",
      category: "Laporan Kinerja",
      year: "2023",
      fileSize: "3.8 MB",
      fileFormat: "PDF",
      publishDate: "20 Januari 2024",
      description:
        "Dokumen akuntabilitas kinerja balai dalam penyelenggaraan diklat SDM digital dan program riset komunikasi regional Sumatera.",
    },
    {
      id: "lakip-2022",
      title: "Laporan Akuntabilitas Kinerja Instansi Pemerintah (LAKIP) Tahun 2022",
      category: "Laporan Kaporan",
      year: "2022",
      fileSize: "3.5 MB",
      fileFormat: "PDF",
      publishDate: "18 Januari 2023",
      description:
        "Rincian capaian kinerja tahunan balai dalam pencapaian target sertifikasi profesi dan survei tingkat kepuasan layanan publik.",
    },
  ];

  return (
    <PublicationDocumentList
      categoryTitle="Publikasi LAKIP BBLSDM Komdigi Medan"
      categoryBadge="Publikasi Akuntabilitas"
      subtitle="Daftar Dokumen LAKIP"
      description="Laporan Akuntabilitas Kinerja Instansi Pemerintah (LAKIP) merupakan wujud pertanggungjawaban pelaksanaan tugas, fungsi, dan pengelolaan anggaran BBLSDM Komdigi Medan secara transparan dan akuntabel."
      documents={documents}
    />
  );
}
