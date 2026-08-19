"use client";

import React, { useState, useMemo } from "react";
import PageHeader from "@/app/components/PageHeader";

export interface PengumumanItem {
  id: string;
  title: string;
  category: string;
  date: string;
  fileSize?: string;
  fileFormat?: string;
  downloadUrl?: string;
  priority: "high" | "normal";
  content: string;
}

interface PengumumanListProps {
  initialPengumuman: PengumumanItem[];
}

export default function PengumumanList({ initialPengumuman }: PengumumanListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [activeModalItem, setActiveModalItem] = useState<PengumumanItem | null>(null);

  const filteredPengumuman = useMemo(() => {
    return initialPengumuman.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "Semua" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [initialPengumuman, searchQuery, selectedCategory]);

  return (
    <div className="bg-white">
      <PageHeader
        title="Pengumuman Instansi"
        subtitle="Dapatkan informasi terkini seputar jadwal ujian sertifikasi, pengumuman hasil kelulusan, penyesuaian jam layanan, dan agenda resmi BBLSDM Komdigi Medan."
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Informasi", href: "#" },
          { label: "Pengumuman" },
        ]}
      />

      {/* Content Section */}
      <section className="py-12 bg-slate-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Search & Filter Header */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <h2 className="text-xl font-bold text-[#0b1b3d]">Daftar Pengumuman &amp; Dokumen Resmi</h2>
              <p className="text-xs text-slate-500 mt-1">Menampilkan seluruh informasi publikasi sekretariat BBLSDM Komdigi Medan</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  placeholder="Cari judul atau isi surat..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b1b3d] bg-white text-slate-800 shadow-2xs"
                />
                <svg
                  className="absolute left-3 top-2.5 h-4 w-4 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0b1b3d] shadow-2xs"
              >
                <option value="Semua">Semua Kategori</option>
                <option value="Sertifikasi">Sertifikasi</option>
                <option value="Rekrutmen &amp; Magang">Rekrutmen &amp; Magang</option>
                <option value="Layanan Publik">Layanan Publik</option>
                <option value="Pelatihan">Pelatihan</option>
                <option value="Riset &amp; Kebijakan">Riset &amp; Kebijakan</option>
              </select>
            </div>
          </div>

          {/* Document Archive List Layout */}
          {filteredPengumuman.length > 0 ? (
            <div className="flex flex-col gap-4">
              {filteredPengumuman.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-7 hover:bg-slate-50/70 hover:shadow-md transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden"
                >
                  {/* Vertical Accent Bar (Design Rule STYLES.md §3.3) */}
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#0284c7]"></div>
                  <div className="space-y-2 flex-1 min-w-0 pr-4">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700">
                        {item.category}
                      </span>
                      <span className="text-xs text-slate-400">
                        {item.date}
                      </span>
                    </div>

                    <h3 
                      onClick={() => setActiveModalItem(item)}
                      className="text-base sm:text-lg font-bold text-[#0b1b3d] hover:text-[#0284c7] transition-colors cursor-pointer leading-snug"
                    >
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                      {item.content}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <button
                      onClick={() => setActiveModalItem(item)}
                      className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all shadow-2xs"
                    >
                      Baca Detail
                    </button>

                    <a
                      href={item.downloadUrl || "/dokumen-pengumuman.pdf"}
                      download={`Pengumuman_${item.id}_BBLSDM_Medan.pdf`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0b1b3d] hover:bg-[#0284c7] text-white text-xs font-semibold transition-colors shadow-sm"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span>Unduh PDF ({item.fileSize || "1.0 MB"})</span>
                    </a>
                  </div>
                </div>
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
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3h7.5M6 20.25h12a2.25 2.25 0 002.25-2.25V8.25a2.25 2.25 0 00-2.25-2.25H12"
                />
              </svg>
              <h3 className="text-sm font-bold text-slate-800">Pengumuman Tidak Ditemukan</h3>
              <p className="text-xs text-slate-500 mt-1">Coba gunakan kueri atau filter kategori lain.</p>
            </div>
          )}
        </div>
      </section>

      {/* Modal Detail View */}
      {activeModalItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setActiveModalItem(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700 uppercase">
                  {activeModalItem.category}
                </span>
                <h2 className="text-xl font-extrabold text-[#0b1b3d] leading-tight">
                  {activeModalItem.title}
                </h2>
                <p className="text-xs text-slate-400 font-medium">
                  Diterbitkan pada: {activeModalItem.date}
                </p>
              </div>

              <button
                onClick={() => setActiveModalItem(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center font-bold text-sm shrink-0"
              >
                ✕
              </button>
            </div>

            <hr className="border-slate-100" />

            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4">
              <p>{activeModalItem.content}</p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <a
                href={activeModalItem.downloadUrl || "/dokumen-pengumuman.pdf"}
                download={`Pengumuman_${activeModalItem.id}_BBLSDM_Medan.pdf`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#0b1b3d] hover:bg-[#0284c7] text-white text-xs font-semibold transition-colors shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3l-3 3-3-3m-6 3a9 9 0 1118 0 9 9 0 01-18 0z" />
                </svg>
                <span>Unduh Lampiran Resmi (PDF - {activeModalItem.fileSize || "1.0 MB"})</span>
              </a>
              <button
                onClick={() => setActiveModalItem(null)}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50"
              >
                Tutup Pengumuman
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
