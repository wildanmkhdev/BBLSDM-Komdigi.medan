"use client";

import React, { useState, useMemo } from "react";
import PageHeader from "@/app/components/PageHeader";

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
    title: "Kunker Wamenkomdigi Nezar Patria ke BBLSDM Komdigi Medan Sumatera Utara",
    category: "Kunjungan Kerja",
    date: "04 Juli 2026",
    image: "/kunker-nezar/kunker-nezar-1.jpeg",
    author: "Pey HS / Humas Komdigi",
    snippet: "Wakil Menteri Komunikasi dan Digital (Wamenkomdigi) Nezar Patria meninjau kesiapan sarana prasarana dan berdialog langsung dengan pegawai BBLSDM Komdigi Medan.",
    content: "Wakil Menteri Komunikasi dan Digital (Wamenkomdigi) Nezar Patria melakukan kunjungan kerja resmi ke Balai Besar Pelatihan Sumber Daya Manusia Komunikasi dan Digital (BBLSDM Komdigi) Medan di Tembung, Kota Medan, Sumatera Utara. Kunjungan ini bertujuan untuk memetakan kebutuhan pelatihan digital vokasi serta memberikan pengarahan langsung mengenai strategi percepatan talenta digital berkualitas di wilayah Sumatera Utara dan 8 provinsi wilayah kerja BBLSDM Medan.",
  },
  {
    id: "2",
    title: "Dialog Interaktif Wamenkomdigi bersama Pegawai BBLSDM Komdigi Medan",
    category: "Kegiatan Instansi",
    date: "04 Juli 2026",
    image: "/kunker-nezar/kunker-nezar-2.jpeg",
    author: "Pey HS / Humas Komdigi",
    snippet: "Wamenkomdigi Nezar Patria berdialog interaktif mengenai penguatan SDM unggul dan transformasi layanan pelatihan digital.",
    content: "Dalam sesi dialog interaktif bersama jajaran pegawai Kantor BBLSDM Komdigi Medan, Wamenkomdigi Nezar Patria menyampaikan apresiasi tinggi atas dedikasi aparatur sipil negara dalam menyelenggarakan berbagai pelatihan teknologi informasi. Beliau mengingatkan pentingnya adaptasi terhadap perkembangan kecerdasan buatan (AI) dan keamanan siber demi menjaga kedaulatan digital nasional.",
  },
  {
    id: "3",
    title: "Penyambutan Kunjungan Kerja oleh Kepala BBPSDMP / BBLSDM Komdigi Medan",
    category: "Penyambutan & Sinergi",
    date: "04 Juli 2026",
    image: "/kunker-nezar/kunker-nezar-3.jpeg",
    author: "Pey HS / Humas Komdigi",
    snippet: "Plt. Kepala BBLSDM Komdigi Medan Dr. Christiany Juditha menyambut kunjungan Wamenkomdigi Nezar Patria.",
    content: "Kedatangan Wakil Menteri Komunikasi dan Digital Nezar Patria disambut secara hangat oleh Kepala Balai Besar Pengembangan Sumber Daya Manusia dan Penelitian Komunikasi dan Informatika (BBPSDMP / BBLSDM Komdigi) Medan, Dr. Christiany Juditha. Rangkaian acara diisi dengan paparan program kerja strategis 2026 dan peninjauan fasilitas laboratorium komputer instansi.",
  },
  {
    id: "4",
    title: "Penguatan Program Pelatihan Digital Marketing & Sertifikasi BNSP 2026",
    category: "Pelatihan & UMKM",
    date: "04 Juli 2026",
    image: "/kunker-nezar/kunker-nezar-4.jpeg",
    author: "Tim Humas BBLSDM",
    snippet: "BBLSDM Komdigi Medan menyiapkan program sertifikasi berbasis kompetensi untuk ribuan peserta pelatihan.",
    content: "Melanjutkan pengarahan Wamenkomdigi, BBLSDM Komdigi Medan berkomitmen memperluas jangkauan pelatihan Digital Talent Scholarship (DTS) dan sertifikasi kompetensi profesi BNSP. Program ini dirancang untuk membekali generasi muda dan pelaku UMKM Sumatera dengan keahlian praktis di dunia industri digital.",
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
      <PageHeader
        title="Berita & Artikel Terkini"
        subtitle="Informasi liputan kegiatan resmi, kemitraan strategis, dan perkembangan program akselerasi SDM digital oleh BBLSDM Komdigi Medan."
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Informasi", href: "#" },
          { label: "Berita" },
        ]}
      />

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
