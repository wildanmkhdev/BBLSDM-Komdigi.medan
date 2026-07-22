"use client";

import React, { useState, useMemo } from "react";
import DocumentCard from "@/components/DocumentCard";

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
      const matchesSearch =
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (doc.description && doc.description.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesYear = selectedYear === "Semua" || doc.title.includes(selectedYear);

      return matchesSearch && matchesYear;
    });
  }, [searchQuery, selectedYear]);

  return (
    <div className="bg-white">
      {/* Header section (Pola app/profil) */}
      <section className="bg-slate-50 border-b border-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold tracking-widest bg-sky-500/10 text-[#0284c7] uppercase">
            Rekomendasi Strategis
          </div>
          <h1 className="text-3xl font-extrabold text-[#0b1b3d] sm:text-4xl">
            Buku Putih (White Paper)
          </h1>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto">
            Akses rekomendasi strategis, rancangan kebijakan transformasi teknologi, dan kajian visioner pengembangan SDM digital yang diterbitkan resmi oleh BBLSDM Komdigi Medan.
          </p>
          <div className="w-12 h-1 bg-[#0284c7] mx-auto rounded-full mt-4"></div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 bg-slate-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Search & Filter Bar */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Cari buku putih..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:border-transparent bg-slate-50 text-slate-800"
              />
              <svg
                className="absolute left-3.5 top-3 h-4 w-4 text-slate-400"
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
              <span className="text-xs font-bold text-slate-500 uppercase">Tahun Rilis:</span>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
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
            <div className="text-center py-16 bg-white rounded-xl border border-slate-200 shadow-sm">
              <svg
                className="mx-auto h-12 w-12 text-slate-300 mb-4"
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
              <h3 className="text-sm font-bold text-slate-800">Buku Putih Tidak Ditemukan</h3>
              <p className="text-xs text-slate-500 mt-1">Coba gunakan kueri lain untuk mencari dokumen.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
