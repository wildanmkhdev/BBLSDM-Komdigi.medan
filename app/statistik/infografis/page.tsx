"use client";

import React, { useState, useMemo } from "react";

interface InfografisItem {
  id: string;
  title: string;
  category: string;
  date: string;
  src: string;
  fileSize: string;
  desc: string;
  tags: string[];
}

const infografisData: InfografisItem[] = [
  {
    id: "1",
    title: "Peta Akselerasi Literasi & Talenta Digital Provinsi Sumatera Utara 2025",
    category: "Pendidikan & Talenta",
    date: "14 November 2025",
    src: "/infografis_talenta_digital.png",
    fileSize: "1.4 MB",
    desc: "Infografis ini merangkum data penetrasi pengguna internet, tingkat literasi digital berdasarkan wilayah kabupaten/kota, serta sebaran pendaftaran dan kelulusan program Digital Talent Scholarship (DTS) di Sumatera Utara.",
    tags: ["Literasi Digital", "DTS", "Sumatera Utara", "Statistik"],
  },
  {
    id: "2",
    title: "Indeks Kepuasan Masyarakat & Evaluasi Mutu Pelayanan Publik BBLSDM 2025",
    category: "Pelayanan Publik",
    date: "10 Februari 2026",
    src: "/infografis_indeks_kepuasan.png",
    fileSize: "1.2 MB",
    desc: "Infografis hasil survei kepuasan masyarakat terhadap kemudahan pendaftaran, kualitas pengajar/fasilitator, kenyamanan fasilitas lab komputer, serta keandalan sistem sertifikasi BBLSDM Komdigi Medan.",
    tags: ["IKM", "Pelayanan Publik", "Medan", "Survei"],
  },
];

export default function InfografisPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [activeModalItem, setActiveModalItem] = useState<InfografisItem | null>(null);

  const filteredInfografis = useMemo(() => {
    return infografisData.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === "Semua" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="bg-white">
      {/* Header section (Pola app/profil) */}
      <section className="bg-slate-50 border-b border-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold tracking-widest bg-sky-500/10 text-[#0284c7] uppercase">
            Galeri Data Visual
          </div>
          <h1 className="text-3xl font-extrabold text-[#0b1b3d] sm:text-4xl">
            Galeri Infografis Data
          </h1>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto">
            Koleksi media visual infografis yang menyajikan data statistik, ringkasan hasil kajian, serta laporan kinerja BBLSDM Komdigi Medan dalam format ringkas dan informatif.
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
                placeholder="Cari infografis..."
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
                <option value="Pendidikan &amp; Talenta">Pendidikan &amp; Talenta</option>
                <option value="Pelayanan Publik">Pelayanan Publik</option>
              </select>
            </div>
          </div>

          {/* Infographics Grid */}
          {filteredInfografis.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredInfografis.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveModalItem(item)}
                  className="group cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  {/* Visual Cover */}
                  <div className="relative h-64 w-full overflow-hidden bg-slate-100 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.src}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#0b1b3d]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="rounded-lg bg-[#0284c7] px-4 py-2 text-xs font-bold text-white shadow-md transform scale-90 group-hover:scale-100 transition-transform duration-300">
                        Perbesar &amp; Detail
                      </span>
                    </div>
                  </div>

                  {/* Content details */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-semibold text-[#0284c7]">{item.category}</span>
                      <span>{item.date}</span>
                    </div>

                    <h3 className="text-base font-bold text-[#0b1b3d] line-clamp-1 group-hover:text-[#0284c7] transition-colors duration-300">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {item.desc}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {item.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="inline-block rounded bg-slate-100 border border-slate-200 px-2 py-0.5 text-[9px] font-semibold text-slate-600"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
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
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <h3 className="text-sm font-bold text-slate-800">Infografis Tidak Ditemukan</h3>
              <p className="text-xs text-slate-500 mt-1">Coba bersihkan filter pencarian atau cari kata kunci lain.</p>
            </div>
          )}
        </div>
      </section>

      {/* Modal Zoom View */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-fade-in">
          <div
            className="relative flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors focus:outline-none"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image Preview Left */}
            <div className="md:w-1/2 bg-slate-900 flex items-center justify-center min-h-[300px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeModalItem.src}
                alt={activeModalItem.title}
                className="max-h-[500px] w-auto max-w-full object-contain"
              />
            </div>

            {/* Details Right */}
            <div className="md:w-1/2 p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="inline-flex items-center rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-semibold text-[#0b1b3d]">
                  {activeModalItem.category}
                </span>

                <h2 className="text-xl font-bold text-[#0b1b3d] leading-tight">
                  {activeModalItem.title}
                </h2>

                <div className="text-xs text-slate-500 flex items-center gap-4">
                  <span>Diterbitkan: {activeModalItem.date}</span>
                  <span>Ukuran: {activeModalItem.fileSize}</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {activeModalItem.desc}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 border-t border-slate-100 pt-6">
                <a
                  href={activeModalItem.src}
                  download
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#0284c7] px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#0284c7]/90 focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:ring-offset-2"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Unduh Gambar Resolusi Tinggi
                </a>
                <button
                  onClick={() => setActiveModalItem(null)}
                  className="px-4 py-2.5 border border-slate-200 text-xs font-bold text-slate-600 rounded-lg hover:bg-slate-50 focus:outline-none"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
