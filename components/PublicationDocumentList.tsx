"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

export interface DocumentItem {
  id: string;
  title: string;
  category: string;
  year: string;
  fileSize: string;
  fileFormat: "PDF" | "XLSX" | "DOCX";
  publishDate: string;
  description: string;
  downloadUrl?: string;
}

interface PublicationDocumentListProps {
  categoryTitle: string;
  categoryBadge: string;
  subtitle: string;
  description: string;
  documents: DocumentItem[];
  availableYears?: string[];
}

export default function PublicationDocumentList({
  categoryTitle,
  categoryBadge,
  subtitle,
  description,
  documents,
  availableYears = ["Semua Tahun", "2025", "2024", "2023", "2022"],
}: PublicationDocumentListProps) {
  const [selectedYear, setSelectedYear] = useState<string>("Semua Tahun");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredDocs = documents.filter((doc) => {
    const matchesYear = selectedYear === "Semua Tahun" || doc.year === selectedYear;
    const matchesQuery =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesYear && matchesQuery;
  });

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Navbar />

      <main className="flex-grow bg-white">
        {/* Header Section */}
        <section className="bg-slate-50 border-b border-slate-100 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold tracking-widest bg-[#0284c7]/10 text-[#0284c7] uppercase">
              {categoryBadge}
            </div>
            <h1 className="text-3xl font-extrabold text-[#0b1b3d] sm:text-4xl">
              {categoryTitle}
            </h1>
            <p className="text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
            <div className="w-12 h-1 bg-[#0284c7] mx-auto rounded-full mt-4"></div>
          </div>
        </section>

        {/* Filter & Search Bar */}
        <section className="py-8 bg-white border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
              
              {/* Year Filter Buttons */}
              <div className="flex items-center gap-1.5 flex-wrap w-full sm:w-auto">
                <span className="text-xs font-bold text-slate-500 mr-2 uppercase tracking-wider">
                  Tahun:
                </span>
                {availableYears.map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setSelectedYear(yr)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      selectedYear === yr
                        ? "bg-[#0b1b3d] text-white shadow-sm"
                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {yr}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  placeholder="Cari nama dokumen..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0284c7] text-slate-800"
                />
                <svg
                  className="w-4 h-4 absolute left-3 top-2.5 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

            </div>
          </div>
        </section>

        {/* Document Cards List */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-bold text-[#0b1b3d]">
                {subtitle} ({filteredDocs.length})
              </h2>
              <span className="text-xs text-slate-400">
                Menampilkan dokumen terverifikasi resmi
              </span>
            </div>

            {filteredDocs.length === 0 ? (
              <div className="text-center py-16 bg-slate-50 border border-dashed border-slate-200 rounded-2xl">
                <svg
                  className="w-12 h-12 text-slate-300 mx-auto mb-3"
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
                <p className="text-sm font-semibold text-slate-600">
                  Tidak ada dokumen yang sesuai filter
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Coba ubah kata kunci pencarian atau filter tahun.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDocs.map((doc) => (
                  <div
                    key={doc.id}
                    className="group bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-all relative overflow-hidden"
                  >
                    {/* Vertical Accent Bar (Design Rule STYLES.md §3.3) */}
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#38bdf8]"></div>

                    <div className="space-y-4">
                      {/* Badge Header */}
                      <div className="flex items-center justify-between text-[10px] font-bold">
                        <span className="inline-block px-2.5 py-0.5 rounded bg-sky-50 text-[#0284c7] border border-sky-100 uppercase tracking-wider">
                          {doc.category}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                          {doc.year}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-sm font-extrabold text-[#0b1b3d] leading-snug group-hover:text-[#0284c7] transition-colors line-clamp-2">
                        {doc.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                        {doc.description}
                      </p>
                    </div>

                    {/* Footer Info & Action */}
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-400">
                        <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 uppercase">
                          {doc.fileFormat}
                        </span>
                        <span>•</span>
                        <span>{doc.fileSize}</span>
                      </div>

                      <a
                        href={doc.downloadUrl || "#"}
                        onClick={(e) => {
                          if (!doc.downloadUrl || doc.downloadUrl === "#") {
                            e.preventDefault();
                            alert(`Mengunduh file: ${doc.title}`);
                          }
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#0284c7] text-white hover:bg-[#0284c7]/90 transition-colors shadow-sm"
                      >
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                        <span>Unduh PDF</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
