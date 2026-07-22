"use client";

import React, { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DocumentCard from "@/components/DocumentCard";

const initialDocuments = [
  {
    title: "Studi Adopsi E-Government dan Kesiapan Layanan Publik Digital di Pedesaan Pulau Nias 2025",
    category: "Riset Sosial TIK",
    publishDate: "12 September 2025",
    fileSize: "4.5 MB",
    fileFormat: "PDF",
    downloadUrl: "#",
    description: "Penelitian empiris mengenai hambatan kultural, infrastruktur energi, dan tingkat adopsi layanan administrasi kependudukan digital di wilayah tertinggal Pulau Nias.",
  },
  {
    title: "Analisis Kesenjangan Keterampilan (Digital Skills Gap) Angkatan Kerja Muda Sumatera Utara 2024",
    category: "Riset SDM Digital",
    publishDate: "20 Mei 2024",
    fileSize: "3.8 MB",
    fileFormat: "PDF",
    downloadUrl: "#",
    description: "Pemetaan kebutuhan industri teknologi informasi regional dibandingkan kompetensi lulusan SMK/Perguruan Tinggi di Sumatera Utara, disertai rekomendasi kurikulum nasional.",
  },
  {
    title: "Studi Efektivitas Pelatihan Pemrograman Berbasis Sertifikasi SKKNI Terhadap Keterserapan Kerja 2024",
    category: "Riset Evaluasi",
    publishDate: "15 Maret 2024",
    fileSize: "2.7 MB",
    fileFormat: "PDF",
    downloadUrl: "#",
    description: "Evaluasi longitudinal terhadap 500 alumni program pelatihan BBLSDM Komdigi Medan untuk menganalisis durasi pencarian kerja pasca-sertifikasi kompetensi digital.",
  },
  {
    title: "Kajian Kesiapan Keamanan Siber (Cybersecurity Readiness) di Lingkungan Pemprov Sumatera Utara 2023",
    category: "Riset Kebijakan",
    publishDate: "10 November 2023",
    fileSize: "5.0 MB",
    fileFormat: "PDF",
    downloadUrl: "#",
    description: "Analisis tingkat kepatuhan terhadap standar keamanan siber, pemetaan kerentanan sistem informasi publik daerah, dan usulan arsitektur manajemen insiden.",
  },
  {
    title: "Kajian Pola Konsumsi Berita Online dan Kerentanan Penyebaran Disinformasi di Kalangan Remaja 2023",
    category: "Riset Media Publik",
    publishDate: "05 Juli 2023",
    fileSize: "3.2 MB",
    fileFormat: "PDF",
    downloadUrl: "#",
    description: "Studi kuantitatif mengenai perilaku verifikasi informasi, platform rujukan berita utama, dan kerentanan psikografis terhadap berita palsu pada pelajar sekolah menengah di Medan.",
  },
];

export default function PenelitianPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const filteredDocs = useMemo(() => {
    return initialDocuments.filter((doc) => {
      const matchesSearch =
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (doc.description && doc.description.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === "Semua" || doc.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow bg-white">
        {/* Header section (Pola app/profil) */}
        <section className="bg-slate-50 border-b border-slate-100 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold tracking-widest bg-sky-500/10 text-[#0284c7] uppercase">
              Jurnal & Riset Publik
            </div>
            <h1 className="text-3xl font-extrabold text-[#0b1b3d] sm:text-4xl">
              Publikasi Riset & Penelitian
            </h1>
            <p className="text-sm text-slate-500 max-w-2xl mx-auto">
              Kumpulan publikasi ilmiah, riset kebijakan digital, kajian sosial kemasyarakatan, serta studi evaluatif pelaksanaan pengembangan SDM oleh tim peneliti BBLSDM Komdigi Medan.
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
                  placeholder="Cari riset & jurnal..."
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
                <span className="text-xs font-bold text-slate-500 uppercase">Rumpun Riset:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                >
                  <option value="Semua">Semua Rumpun</option>
                  <option value="Riset Sosial TIK">Riset Sosial TIK</option>
                  <option value="Riset SDM Digital">Riset SDM Digital</option>
                  <option value="Riset Evaluasi">Riset Evaluasi</option>
                  <option value="Riset Kebijakan">Riset Kebijakan</option>
                  <option value="Riset Media Publik">Riset Media Publik</option>
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
                <h3 className="text-sm font-bold text-slate-800">Hasil Riset Tidak Ditemukan</h3>
                <p className="text-xs text-slate-500 mt-1">Coba gunakan istilah penelusuran yang lebih umum.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

