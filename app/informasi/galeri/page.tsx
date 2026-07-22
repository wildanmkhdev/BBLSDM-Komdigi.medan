"use client";

import React, { useState, useMemo } from "react";

interface GaleriItem {
  id: string;
  title: string;
  category: string;
  date: string;
  desc: string;
}

const galeriData: GaleriItem[] = [
  {
    id: "1",
    title: "Pelaksanaan Diklat Vokasi Digital Marketing untuk UMKM",
    category: "Pelatihan",
    date: "18 Juli 2026",
    desc: "Dokumentasi pelatihan tatap muka serta praktik pembuatan konten promosi digital bagi pelaku usaha mikro dan kecil.",
  },
  {
    id: "2",
    title: "Penandatanganan Nota Kesepahaman (MoU) Riset TIK dengan USU",
    category: "Kunjungan & MoU",
    date: "15 Juli 2026",
    desc: "Seremonial kerja sama riset kebijakan dan pengembangan talenta digital antara BBLSDM Komdigi Medan dan Universitas Sumatera Utara.",
  },
  {
    id: "3",
    title: "Workshop Keamanan Siber & Tata Kelola SPBE bagi ASN",
    category: "Seminar & Workshop",
    date: "12 Juli 2026",
    desc: "Suasana diskusi panel peserta workshop keamanan siber dari perwakilan dinas komunikasi dan informatika se-Sumatera.",
  },
  {
    id: "4",
    title: "Ujian Sertifikasi Kompetensi Profesi Komputer & Jaringan (BNSP)",
    category: "Sertifikasi",
    date: "10 Juli 2026",
    desc: "Proses pengujian langsung oleh asesor lisensi BNSP di laboratorium jaringan BBLSDM Komdigi Medan.",
  },
];

export default function GaleriPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [activeModalItem, setActiveModalItem] = useState<GaleriItem | null>(null);

  const filteredGaleri = useMemo(() => {
    return galeriData.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === "Semua" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="bg-white">
      {/* Banner Header (Pola Standard app/profil) */}
      <section className="bg-slate-50 border-b border-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold tracking-widest bg-[#0284c7]/10 text-[#0284c7] uppercase">
            Dokumentasi Visual
          </div>
          <h1 className="text-3xl font-extrabold text-[#0b1b3d] sm:text-4xl">
            Galeri Kegiatan Instansi
          </h1>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Kumpulan dokumentasi foto dan liputan visual ragam aktivitas diklat, ujian sertifikasi, seminar nasional, serta kemitraan BBLSDM Komdigi Medan.
          </p>
          <div className="w-12 h-1 bg-[#0284c7] mx-auto rounded-full mt-4"></div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 bg-slate-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Search & Filter Bar */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Cari dokumentasi..."
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
                <option value="Pelatihan">Pelatihan</option>
                <option value="Kunjungan &amp; MoU">Kunjungan &amp; MoU</option>
                <option value="Seminar &amp; Workshop">Seminar &amp; Workshop</option>
                <option value="Sertifikasi">Sertifikasi</option>
              </select>
            </div>
          </div>

          {/* Gallery Grid */}
          {filteredGaleri.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredGaleri.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveModalItem(item)}
                  className="group cursor-pointer bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="h-44 bg-[#0b1b3d] relative flex items-center justify-center p-4 text-center text-white">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:10px_10px]"></div>
                    <span className="text-xs font-bold uppercase tracking-wider relative z-10">
                      📷 {item.category}
                    </span>
                  </div>

                  <div className="p-4 space-y-1.5 flex-grow">
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span className="font-bold text-[#0284c7]">{item.category}</span>
                      <span>{item.date}</span>
                    </div>

                    <h3 className="text-xs font-bold text-[#0b1b3d] line-clamp-2 leading-snug group-hover:text-[#0284c7] transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <div className="px-4 pb-4 pt-2 border-t border-slate-100 text-[10px] font-bold text-[#0284c7] flex items-center justify-between">
                    <span>Lihat Foto Detail</span>
                    <span>→</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-sm font-bold text-slate-800">Dokumentasi Tidak Ditemukan</h3>
              <p className="text-xs text-slate-500 mt-1">Coba gunakan kueri atau filter lain.</p>
            </div>
          )}
        </div>
      </section>

      {/* Modal Detail View */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div
            className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-6 relative overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="inline-flex items-center rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-bold text-[#0284c7] uppercase">
                  {activeModalItem.category}
                </span>
                <h2 className="text-lg font-extrabold text-[#0b1b3d]">
                  {activeModalItem.title}
                </h2>
                <p className="text-xs text-slate-400 font-semibold">
                  Tanggal Kegiatan: {activeModalItem.date}
                </p>
              </div>

              <button
                onClick={() => setActiveModalItem(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="h-56 bg-[#0b1b3d] rounded-xl flex items-center justify-center text-white text-sm font-bold">
              📷 Preview Dokumentasi {activeModalItem.title}
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {activeModalItem.desc}
            </p>

            <div className="pt-4 border-t border-slate-100 text-right">
              <button
                onClick={() => setActiveModalItem(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
