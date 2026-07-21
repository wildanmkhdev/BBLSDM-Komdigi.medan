"use client";

import React, { useState, useMemo } from "react";
import DocumentCard from "../../../components/DocumentCard";

const initialDocuments = [
  {
    title: "Laporan Hasil Pengukuran ICT Indikator Provinsi Sumatera Utara 2025",
    category: "ICT Indikator",
    publishDate: "10 November 2025",
    fileSize: "3.5 MB",
    fileFormat: "PDF",
    downloadUrl: "#",
    description: "Statistik penetrasi internet, kepemilikan perangkat digital, tingkat literasi, serta adopsi layanan digital pemerintah di 33 kabupaten/kota Provinsi Sumatera Utara tahun 2025.",
  },
  {
    title: "Profil Literasi Digital Regional: Wilayah Sumatera Bagian Utara 2024",
    category: "Literasi Digital",
    publishDate: "14 Desember 2024",
    fileSize: "4.1 MB",
    fileFormat: "PDF",
    downloadUrl: "#",
    description: "Kajian mendalam mengenai pilar indeks literasi digital (digital skills, digital safety, digital ethics, digital culture) pada wilayah kerja Sumatera Bagian Utara.",
  },
  {
    title: "Kajian ICT Indikator Kota Medan: Kesiapan Smart City 2024",
    category: "ICT Indikator",
    publishDate: "28 Agustus 2024",
    fileSize: "2.9 MB",
    fileFormat: "PDF",
    downloadUrl: "#",
    description: "Analisis kesiapan infrastruktur TIK, adopsi aplikasi cerdas oleh warga, serta indeks kepuasan layanan publik digital di Kota Medan.",
  },
  {
    title: "Survei Penggunaan TIK Sektor Usaha Kecil dan Menengah (UKM) Sumatera Utara 2023",
    category: "Survei TIK",
    publishDate: "05 November 2023",
    fileSize: "3.8 MB",
    fileFormat: "PDF",
    downloadUrl: "#",
    description: "Hasil survei komprehensif adopsi e-commerce, kesiapan logistik digital, dan literasi teknologi pelaku usaha mikro, kecil, dan menengah.",
  },
  {
    title: "Laporan Hasil Pengukuran ICT Indikator Provinsi Sumatera Utara 2023",
    category: "ICT Indikator",
    publishDate: "12 Oktober 2023",
    fileSize: "3.2 MB",
    fileFormat: "PDF",
    downloadUrl: "#",
    description: "Pengukuran tahunan indeks kesenjangan digital regional, aksesibilitas telekomunikasi pedesaan, serta pola konsumsi media digital oleh masyarakat.",
  },
];

export default function IctIndikatorPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const filteredDocs = useMemo(() => {
    return initialDocuments.filter((doc) => {
      const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (doc.description && doc.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === "Semua" || doc.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <main className="flex-1 bg-[#f8f9fa] dark:bg-zinc-950 min-h-screen">
      {/* Header section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#0a2540] via-[#0f345c] to-[#0a2540] py-16 px-6 text-white shadow-md">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,212,255,0.15),transparent)] pointer-events-none" />
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-400">
            <span>Publikasi</span>
            <span>/</span>
            <span className="text-gray-300">ICT Indikator</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-sky-100 to-sky-300 bg-clip-text text-transparent">
            ICT Indikator & Survei TIK
          </h1>
          <p className="text-sm md:text-base text-gray-300 max-w-3xl leading-relaxed">
            Data statistik resmi, indeks literasi digital, dan laporan pemetaan infrastruktur teknologi komunikasi di wilayah Provinsi Sumatera Utara dan sekitarnya.
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
              placeholder="Cari indikator & survei..."
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
            <span className="text-xs font-bold text-gray-500 uppercase dark:text-zinc-400">Kategori:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#00d4ff] dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
            >
              <option value="Semua">Semua Kategori</option>
              <option value="ICT Indikator">ICT Indikator</option>
              <option value="Literasi Digital">Literasi Digital</option>
              <option value="Survei TIK">Survei TIK</option>
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
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">Dokumen Tidak Ditemukan</h3>
            <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">Silakan cari kembali dengan parameter berbeda.</p>
          </div>
        )}
      </section>
    </main>
  );
}
