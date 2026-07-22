"use client";

import React, { useState, useMemo } from "react";

interface BeritaItem {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  snippet: string;
  content: string;
  author: string;
}

const beritaData: BeritaItem[] = [
  {
    id: "1",
    title: "BBLSDM Komdigi Medan Gelar Pelatihan Digital Marketing & E-Commerce untuk UMKM",
    category: "Pelatihan & UMKM",
    date: "18 Juli 2026",
    image: "/images/berita/berita-1.jpg",
    author: "Tim Humas BBLSDM",
    snippet: "Sebanyak 150 pelaku UMKM di Sumatera Utara mengikuti pelatihan digital marketing intensif yang diselenggarakan BBLSDM Komdigi Medan.",
    content: "Balai Besar Pengembangan SDM dan Penelitian Komunikasi dan Informatika (BBLSDM Komdigi) Medan menggelar pelatihan Digital Marketing dan E-Commerce bagi para pelaku Usaha Mikro, Kecil, dan Menengah (UMKM) se-Sumatera Utara. Kegiatan ini bertujuan mempercepat transformasi digital sektor riil dan meningkatkan daya saing produk lokal di ranah pasar nasional maupun global.",
  },
  {
    id: "2",
    title: "Kerja Sama Strategis dengan Perguruan Tinggi dalam Pengembangan Riset AI & Keamanan Siber",
    category: "Kerja Sama & Riset",
    date: "15 Juli 2026",
    image: "/images/berita/berita-2.jpg",
    author: "Tim Peneliti",
    snippet: "BBLSDM Komdigi Medan menandatangani Nota Kesepahaman (MoU) dengan konsorsium perguruan tinggi negeri di Sumatera.",
    content: "Guna memperkuat ekosistem kecerdasan buatan (Artificial Intelligence) dan keamanan siber di sektor publik, BBLSDM Komdigi Medan resmi menandatangani Nota Kesepahaman (MoU) dengan konsorsium universitas nasional. Kerjasama mencakup riset kebijakan publik, pertukaran tenaga ahli, dan pengembangan kurikulum vokasi digital.",
  },
  {
    id: "3",
    title: "Workshop Keamanan Siber & Perlindungan Data Pribadi bagi ASN Regional Sumatera",
    category: "Keamanan Siber",
    date: "12 Juli 2026",
    image: "/images/berita/berita-3.jpg",
    author: "Siber BBLSDM",
    snippet: "Diikuti 200 ASN dari berbagai instansi daerah, workshop membahas arsitektur manajemen insiden dan kepatuhan UU PDP.",
    content: "Dalam upaya memperkuat pertahanan infrastruktur informasi pemerintah daerah, BBLSDM Komdigi Medan mengadakan Workshop Keamanan Siber bagi Aparatur Sipil Negara (ASN). Materi mencakup pencegahan kebocoran data, pemetikan ancaman malware, dan implementasi Sistem Manajemen Keamanan Informasi.",
  },
];

export default function BeritaPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [activeModalItem, setActiveModalItem] = useState<BeritaItem | null>(null);

  const filteredBerita = useMemo(() => {
    return beritaData.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.snippet.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === "Semua" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="bg-white">
      {/* Header Banner (Pola Standard app/profil) */}
      <section className="bg-slate-50 border-b border-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold tracking-widest bg-[#0284c7]/10 text-[#0284c7] uppercase">
            Kabar Instansi
          </div>
          <h1 className="text-3xl font-extrabold text-[#0b1b3d] sm:text-4xl">
            Berita &amp; Artikel Terkini
          </h1>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Informasi liputan kegiatan resmi, kemitraan strategis, dan perkembangan program akselerasi SDM digital oleh BBLSDM Komdigi Medan.
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
                placeholder="Cari berita..."
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
                <option value="Pelatihan &amp; UMKM">Pelatihan &amp; UMKM</option>
                <option value="Kerja Sama &amp; Riset">Kerja Sama &amp; Riset</option>
                <option value="Keamanan Siber">Keamanan Siber</option>
              </select>
            </div>
          </div>

          {/* News Grid */}
          {filteredBerita.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredBerita.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveModalItem(item)}
                  className="group cursor-pointer bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="relative h-48 bg-slate-100 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1b3d]/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    {/* Visual Card Cover */}
                    <div className="w-full h-full bg-[#0b1b3d] flex items-center justify-center p-6 text-center text-white font-bold text-sm">
                      📰 {item.category}
                    </div>
                  </div>

                  <div className="p-5 space-y-2 flex-grow">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="font-bold text-[#0284c7]">{item.category}</span>
                      <span>{item.date}</span>
                    </div>

                    <h3 className="text-sm font-bold text-[#0b1b3d] line-clamp-2 leading-snug group-hover:text-[#0284c7] transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                      {item.snippet}
                    </p>
                  </div>

                  <div className="px-5 pb-5 pt-2 border-t border-slate-100 text-[11px] font-bold text-[#0284c7] flex items-center justify-between">
                    <span>Baca Selengkapnya</span>
                    <span>→</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-sm font-bold text-slate-800">Berita Tidak Ditemukan</h3>
              <p className="text-xs text-slate-500 mt-1">Coba gunakan kueri atau filter lain.</p>
            </div>
          )}
        </div>
      </section>

      {/* Modal Detail View */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div
            className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="inline-flex items-center rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-bold text-[#0284c7] uppercase">
                  {activeModalItem.category}
                </span>
                <h2 className="text-xl font-extrabold text-[#0b1b3d]">
                  {activeModalItem.title}
                </h2>
                <p className="text-xs text-slate-400 font-semibold">
                  Oleh: {activeModalItem.author} | {activeModalItem.date}
                </p>
              </div>

              <button
                onClick={() => setActiveModalItem(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <hr className="border-slate-100" />

            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4">
              <p>{activeModalItem.content}</p>
            </div>

            <div className="pt-4 border-t border-slate-100 text-right">
              <button
                onClick={() => setActiveModalItem(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50"
              >
                Tutup Artikels
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
