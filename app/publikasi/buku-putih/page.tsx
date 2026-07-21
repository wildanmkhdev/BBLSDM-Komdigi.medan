"use client";

import React, { useState, useMemo } from "react";
import DocumentCard from "../../../components/DocumentCard";

const initialDocuments = [
  {
    title: "Buku Putih: Akselerasi Ekosistem Digital Startup di Provinsi Sumatera Utara 2025",
    category: "Buku Putih",
    publishDate: "05 Desember 2025",
    fileSize: "5.2 MB",
    fileFormat: "PDF",
    downloadUrl: "#",
    description: "Dokumen rujukan strategis untuk pemerintah daerah, inkubator bisnis, dan institusi pendidikan mengenai potensi, tantangan modal, serta peta jalan pengembangan startup digital lokal.",
  },
  {
    title: "Buku Putih: Strategi Transformasi Digital Birokrasi dan Layanan Publik Regional 2024",
    category: "Buku Putih",
    publishDate: "18 Juni 2024",
    fileSize: "4.6 MB",
    fileFormat: "PDF",
    downloadUrl: "#",
    description: "Panduan praktis pelaksanaan Sistem Pemerintahan Berbasis Elektronik (SPBE), standardisasi keamanan data pemerintah, dan peningkatan literasi ASN daerah.",
  },
  {
    title: "Buku Putih: Arah Pengembangan SDM Digital Indonesia Menyongsong Generasi Emas 2030 (Edisi 2023)",
    category: "Buku Putih",
    publishDate: "20 November 2023",
    fileSize: "4.0 MB",
    fileFormat: "PDF",
    downloadUrl: "#",
    description: "Kajian kolaboratif proyeksi kebutuhan talenta digital tingkat lanjut (AI, Data Science, IoT, Cloud Computing) dan sinkronisasi kebutuhan kurikulum pendidikan tinggi nasional.",
  },
  {
    title: "Buku Putih: Peta Jalan Pengembangan Talenta Digital Sektor Industri Kreatif 2022",
    category: "Buku Putih",
    publishDate: "15 Agustus 2022",
    fileSize: "3.8 MB",
    fileFormat: "PDF",
    downloadUrl: "#",
    description: "Analisis potensi ekonomi kreatif digital, kompetensi animator, desainer game, kreator konten, dan perumusan strategi peningkatan keahlian kerja di era industri 4.0.",
  },
];

export default function BukuPutihPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("Semua");

  const filteredDocs = useMemo(() => {
    return initialDocuments.filter((doc) => {
      const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (doc.description && doc.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesYear = selectedYear === "Semua" || doc.title.includes(selectedYear);

      return matchesSearch && matchesYear;
    });
  }, [searchQuery, selectedYear]);

  return (
    <main className="flex-1 bg-[#f8f9fa] dark:bg-zinc-950 min-h-screen">
      {/* Header section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#0a2540] via-[#0f345c] to-[#0a2540] py-16 px-6 text-white shadow-md">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,212,255,0.15),transparent)] pointer-events-none" />
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-400">
            <span>Publikasi</span>
            <span>/</span>
            <span className="text-gray-300">Buku Putih</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-sky-100 to-sky-300 bg-clip-text text-transparent">
            Buku Putih (White Paper)
          </h1>
          <p className="text-sm md:text-base text-gray-300 max-w-3xl leading-relaxed">
            Akses rekomendasi strategis, rancangan kebijakan transformasi teknologi, dan kajian visioner pengembangan SDM digital yang diterbitkan resmi oleh BBLSDM Komdigi Medan.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-6xl mx-auto py-12 px-6">
        {/* Search & Filter Bar */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-zinc-900 p-4 rounded-xl border border-gray-100 dark:border-zinc-800 shadow-sm">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Cari buku putih..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent bg-gray-50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
            />
            <svg
              className="absolute left-3.5 top-3 h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto shrink-0 justify-end">
            <span className="text-xs font-bold text-gray-500 uppercase dark:text-zinc-400">Tahun Rilis:</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#00d4ff] dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
            >
              <option value="Semua">Semua Tahun</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </div>
        </div>

        {/* Documents Grid */}
        {filteredDocs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocs.map((doc, index) => (
              <DocumentCard key={index} {...doc} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-xl border border-gray-100 dark:border-zinc-800 shadow-sm">
            <svg
              className="mx-auto h-12 w-12 text-gray-300 dark:text-zinc-700 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">Buku Putih Tidak Ditemukan</h3>
            <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">Coba gunakan kueri lain untuk mencari dokumen.</p>
          </div>
        )}
      </section>
    </main>
  );
}
