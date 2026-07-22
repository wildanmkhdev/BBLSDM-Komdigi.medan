import PublicationDocumentList, { DocumentItem } from "@/components/PublicationDocumentList";

export default function BukuPutihPage() {
  const documents: DocumentItem[] = [
    {
      id: "buku-putih-2024",
      title: "Buku Putih Strategi Pengembangan Talenta Digital Sumatera 2025-2030",
      category: "Buku Putih / Policy Paper",
      year: "2024",
      fileSize: "6.7 MB",
      fileFormat: "PDF",
      publishDate: "12 Desember 2024",
      description:
        "Panduan rekomendasi strategis dan peta jalan (roadmap) pemenuhan kebutuhan 9 juta talenta digital nasional untuk wilayah regional Sumatera.",
    },
    {
      id: "buku-putih-2023",
      title: "Buku Putih Standarisasi Kurikulum Diklat Vokasi TIK Berbasis SKKNI",
      category: "Buku Putih / Policy Paper",
      year: "2023",
      fileSize: "5.1 MB",
      fileFormat: "PDF",
      publishDate: "08 November 2023",
      description:
        "Rujukan acuan kurikulum sertifikasi standar BNSP dan Kerangka Kualifikasi Nasional Indonesia pada jenjang teknisi TIK.",
    },
    {
      id: "buku-putih-2022",
      title: "Buku Putih Peta Kebutuhan Keterampilan Industri Teknologi 4.0",
      category: "Buku Putih / Policy Paper",
      year: "2022",
      fileSize: "4.8 MB",
      fileFormat: "PDF",
      publishDate: "15 Oktober 2022",
      description:
        "Hasil analisis kesenjangan supply-demand industri digital terhadap lulusan perguruan tinggi dan vokasi daerah.",
    },
  ];

  return (
    <PublicationDocumentList
      categoryTitle="Buku Putih (White Paper) Komdigi Medan"
      categoryBadge="Publikasi Kebijakan"
      subtitle="Daftar Dokumen Buku Putih"
      description="Dokumen arah kebijakan strategis dan rekomendasi resmi yang menjadi rujukan pembangunan sumber daya manusia serta infrastruktur digital regional."
      documents={documents}
    />
  );
}
