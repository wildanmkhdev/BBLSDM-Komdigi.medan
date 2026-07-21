"use client";

import React, { useState, useMemo } from "react";
import DocumentCard from "../../../components/DocumentCard";

const initialDocuments = [
  {
    title: "Laporan Akuntabilitas Kinerja Instansi Pemerintah (LAKIP) BBLSDM Komdigi Medan Tahun 2025",
    category: "LAKIP",
    publishDate: "15 Februari 2026",
    fileSize: "4.8 MB",
    fileFormat: "PDF",
    downloadUrl: "#",
    description: "Laporan pertanggungjawaban atas pencapaian kinerja sasaran strategis BBLSDM Komdigi Medan sepanjang tahun anggaran 2025, termasuk realisasi kinerja dan kendala yang dihadapi.",
  },
  {
    title: "Laporan Akuntabilitas Kinerja Instansi Pemerintah (LAKIP) BBLSDM Komdigi Medan Tahun 2024",
    category: "LAKIP",
    publishDate: "20 Februari 2025",
    fileSize: "4.2 MB",
    fileFormat: "PDF",
    downloadUrl: "#",
    description: "Evaluasi kinerja berkala tahun anggaran 2024 yang merinci indikator kinerja utama (IKU), indeks kepuasan masyarakat, serta akuntabilitas pengelolaan anggaran belanja negara.",
  },
  {
    title: "Laporan Akuntabilitas Kinerja Instansi Pemerintah (LAKIP) BBLSDM Komdigi Medan Tahun 2023",
    category: "LAKIP",
    publishDate: "18 Februari 2024",
    fileSize: "3.9 MB",
    fileFormat: "PDF",
    downloadUrl: "#",
    description: "Dokumen akuntabilitas kinerja instansi tahun 2023 yang memuat pengukuran indikator kinerja kegiatan pelatihan digital masyarakat dan aparatur pemerintah daerah.",
  },
  {
    title: "Laporan Akuntabilitas Kinerja Instansi Pemerintah (LAKIP) BBLSDM Komdigi Medan Tahun 2022",
    category: "LAKIP",
    publishDate: "22 Februari 2023",
    fileSize: "3.5 MB",
    fileFormat: "PDF",
    downloadUrl: "#",
    description: "Laporan kinerja tahun 2022 yang merangkum program pengembangan SDM industri kreatif digital dan kolaborasi sertifikasi bidang teknologi informasi.",
  },
  {
    title: "Laporan Akuntabilitas Kinerja Instansi Pemerintah (LAKIP) BBLSDM Komdigi Medan Tahun 2021",
    category: "LAKIP",
    publishDate: "25 Februari 2022",
    fileSize: "3.1 MB",
    fileFormat: "PDF",
    downloadUrl: "#",
    description: "Laporan akuntabilitas tahunan untuk mengukur efektivitas dan efisiensi program kerja akselerasi transformasi digital di wilayah kerja Sumatera Utara.",
  },
];

export default function LakipPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("Semua");

  const filteredDocs = useMemo(() => {
    return initialDocuments.filter((doc) => {
      const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (doc.description && doc.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const docYear = doc.publishDate.split(" ").pop() || "";
      // Adjust because publish date year is year of publication (e.g. published in 2026 for year 2025 LAKIP)
      // Let's match based on title text as well to make it intuitive
      const matchesYear = selectedYear === "Semua" || doc.title.includes(selectedYear);

      return matchesSearch && matchesYear;
    });
  }, [searchQuery, selectedYear]);

  return (
    <main className="flex-1 bg-[#f8f9fa] dark:bg-zinc-950 min-h-screen">
      {/* Header section with rich aesthetics */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#0a2540] via-[#0f345c] to-[#0a2540] py-16 px-6 text-white shadow-md">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,212,255,0.15),transparent)] pointer-events-none" />
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-400">
            <span>Publikasi</span>
            <span>/</span>
            <span className="text-gray-300">LAKIP</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-sky-100 to-sky-300 bg-clip-text text-transparent">
            LAKIP BBLSDM Komdigi Medan
          </h1>
          <p className="text-sm md:text-base text-gray-300 max-w-3xl leading-relaxed">
            Laporan Akuntabilitas Kinerja Instansi Pemerintah (LAKIP) merupakan wujud pertanggungjawaban tertulis BBLSDM Komdigi Medan dalam mencapai target strategis nasional.
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
              placeholder="Cari dokumen LAKIP..."
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
            <span className="text-xs font-bold text-gray-500 uppercase dark:text-zinc-400">Tahun Kinerja:</span>
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
              <option value="2021">2021</option>
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
              className="mx-auto h-12 w-12 text-gray-300 dark:text-zinc-700 mb-4 animate-pulse"
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
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">Dokumen Tidak Ditemukan</h3>
            <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">Coba gunakan kata kunci atau filter tahun lainnya.</p>
          </div>
        )}
      </section>
    </main>
  );
}
