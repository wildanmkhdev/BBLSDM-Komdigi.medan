import PublicationDocumentList, { DocumentItem } from "@/components/PublicationDocumentList";

export default function PenelitianPage() {
  const documents: DocumentItem[] = [
    {
      id: "penelitian-2024-1",
      title: "Jurnal Riset Komunikasi Digital: Analisis Dampak AI Terhadap Tenaga Kerja TIK",
      category: "Jurnal Riset",
      year: "2024",
      fileSize: "3.2 MB",
      fileFormat: "PDF",
      publishDate: "14 November 2024",
      description:
        "Studi empiris mengenai kesiapan angkatan kerja muda dalam merespons munculnya kecerdasan buatan generatif pada industri kreatif di Medan.",
    },
    {
      id: "penelitian-2024-2",
      title: "Kajian Efektivitas Program Pelatihan Vokasi Siber Bagi Aparatur Daerah",
      category: "Hasil Kajian",
      year: "2024",
      fileSize: "2.8 MB",
      fileFormat: "PDF",
      publishDate: "02 Agustus 2024",
      description:
        "Evaluasi komprehensif tingkat retensi ilmu dan implementasi protokol keamanan informasi pasca-diklat aparatur Pemprov Sumut.",
    },
    {
      id: "penelitian-2023",
      title: "Studi Pola Konsumsi Informasi Publik dan Pencegahan Hoaks di Media Sosial",
      category: "Jurnal Riset",
      year: "2023",
      fileSize: "3.6 MB",
      fileFormat: "PDF",
      publishDate: "19 Oktober 2023",
      description:
        "Penelitian riset lapangan mengenai dinamika literasi kritis masyarakat dalam menyaring narasi misinformasi.",
    },
  ];

  return (
    <PublicationDocumentList
      categoryTitle="Hasil Penelitian & Jurnal Riset Komunikasi"
      categoryBadge="Publikasi Akademis"
      subtitle="Daftar Jurnal & Hasil Research"
      description="Publikasi ilmiah, jurnal terakreditasi, serta dokumen hasil kajian kebijakan yang disusun oleh Tim Kelompok Jabatan Fungsional Peneliti BBLSDM Komdigi Medan."
      documents={documents}
    />
  );
}
