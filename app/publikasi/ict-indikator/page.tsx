import PublicationDocumentList, { DocumentItem } from "@/components/PublicationDocumentList";

export default function IctIndikatorPage() {
  const documents: DocumentItem[] = [
    {
      id: "ict-2024",
      title: "Indikator TIK Regional Sumatera Utara & Aceh Tahun 2024",
      category: "Statistik TIK",
      year: "2024",
      fileSize: "5.4 MB",
      fileFormat: "PDF",
      publishDate: "05 Desember 2024",
      description:
        "Buku data indikator utama aksesibilitas internet, kepemilikan perangkat digital, serta indeks literasi digital masyarakat di provinsi wilayah kerja BBLSDM Komdigi Medan.",
    },
    {
      id: "ict-2023",
      title: "Laporan Survey Indeks Kesiapan Digital UMKM Regional 2023",
      category: "Statistik TIK",
      year: "2023",
      fileSize: "4.9 MB",
      fileFormat: "PDF",
      publishDate: "10 November 2023",
      description:
        "Hasil pemetaan tingkat adopsi teknologi e-commerce dan literasi keamanan siber pada sektor Usaha Mikro, Kecil, dan Menengah (UMKM).",
    },
    {
      id: "ict-2022",
      title: "Indikator Penetrasi Broadband & Keterampilan Digital 2022",
      category: "Statistik TIK",
      year: "2022",
      fileSize: "4.1 MB",
      fileFormat: "PDF",
      publishDate: "22 November 2022",
      description:
        "Analisis ketersediaan infrastruktur jaringan seluler dan kesenjangan talenta digital di daerah 3T Sumatera.",
    },
  ];

  return (
    <PublicationDocumentList
      categoryTitle="ICT Indikator & Data TIK Regional"
      categoryBadge="Publikasi Data"
      subtitle="Dokumen Indikator TIK"
      description="Kumpulan laporan riset kuantitatif dan publikasi statistik indikator Teknologi Informasi dan Komunikasi (TIK) regional sebagai bahan rujukan pengambil kebijakan dan akademisi."
      documents={documents}
    />
  );
}
