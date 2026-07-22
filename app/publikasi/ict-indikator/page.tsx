"use client";

import React, { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DocumentCard from "@/components/DocumentCard";

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
              Publikasi Riset TIK
            </div>
            <h1 className="text-3xl font-extrabold text-[#0b1b3d] sm:text-4xl">
              ICT Indikator & Survei TIK
            </h1>
            <p className="text-sm text-slate-500 max-w-2xl mx-auto">
              Data statistik resmi, indeks literasi digital, dan laporan pemetaan infrastruktur teknologi komunikasi di wilayah Provinsi Sumatera Utara dan sekitarnya.
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
                  placeholder="Cari indikator & survei..."
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
                <span className="text-xs font-bold text-slate-500 uppercase">Kategori:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
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
                <h3 className="text-sm font-bold text-slate-800">Dokumen Tidak Ditemukan</h3>
                <p className="text-xs text-slate-500 mt-1">Silakan cari kembali dengan parameter berbeda.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

