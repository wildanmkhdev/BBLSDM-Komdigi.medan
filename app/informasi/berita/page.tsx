"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
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
    title: "Wamenkomdigi Nezar Patria Dorong BBLSDM Komdigi Medan Cetak Developer & Talenta Digital Unggul",
    category: "Kunjungan Kerja",
    date: "04 Juli 2026",
    image: "/gambar1.jpeg",
    author: "Pey HS / Humas Komdigi",
    snippet: "Wakil Menteri Komunikasi dan Digital RI Nezar Patria melakukan kunjungan kerja ke BBLSDM Komdigi Medan. Beliau menegaskan pengembangan talenta digital merupakan pilar utama Renstra Kementerian Komdigi 2025-2029 'Terhubung, Tumbuh, dan Terjaga' agar Indonesia tidak hanya menjadi pasar melainkan pencipta teknologi.",
    content: "Wakil Menteri Komunikasi dan Digital RI Nezar Patria melakukan kunjungan kerja resmi ke Balai Besar Pelatihan Sumber Daya Manusia Komunikasi dan Digital (BBLSDM Komdigi) Medan di Tembung, Kota Medan, Sumatera Utara. Dalam arahannya, beliau menegaskan bahwa pengembangan talenta digital merupakan pilar utama Rencana Strategis Kementerian Komunikasi dan Digital 2025-2029 dengan visi 'Terhubung, Tumbuh, dan Terjaga'. Langkah ini diambil agar Indonesia tidak hanya menjadi konsumen dan pasar teknologi dunia, melainkan bertransformasi menjadi pencipta serta pengembang inovasi teknologi nasional yang berdaya saing global.",
  },
  {
    id: "2",
    title: "Penandatanganan Komitmen Strategis Penguatan SDM Digital Wilayah Sumatera",
    category: "Kegiatan UPT",
    date: "04 Juli 2026",
    image: "/gambar2.jpeg",
    author: "Tim Humas BBLSDM",
    snippet: "Wamenkomdigi Nezar Patria didampingi Plt. Kepala BBLSDM Komdigi Medan Dr. Christiany Juditha merumuskan langkah taktis penguatan kapasitas digital di 8 provinsi wilayah kerja BBLSDM Medan.",
    content: "Dalam rangkaian kunjungan kerjanya, Wamenkomdigi Nezar Patria didampingi oleh Plt. Kepala BBLSDM Komdigi Medan Dr. Christiany Juditha melakukan penandatanganan dan perumusan komitmen strategis. Langkah taktis ini bertujuan untuk mempercepat penguatan kapasitas serta pemerataan SDM digital di 8 provinsi wilayah kerja BBLSDM Medan, meliputi seluruh kawasan Sumatera mulai dari Aceh hingga Lampung. Sinergi ini mencakup perluasan program vokasi digital yang tepat sasaran sesuai kebutuhan industri digital saat ini.",
  },
  {
    id: "3",
    title: "Rapat Koordinasi Strategis BBLSDM Komdigi Medan bersama Wamenkomdigi RI",
    category: "Rapat Koordinasi",
    date: "04 Juli 2026",
    image: "/gambar3.jpeg",
    author: "Pey HS / Humas Komdigi",
    snippet: "Pembahasan capaian program Digital Talent Scholarship (DTS) dan perluasan kerja sama dengan pemerintah daerah serta perguruan tinggi di Sumatera.",
    content: "Rapat koordinasi strategis diselenggarakan bersama jajaran pimpinan dan pegawai BBLSDM Komdigi Medan. Pertemuan ini secara khusus membahas evaluasi capaian program Digital Talent Scholarship (DTS) tahun berjalan, sekaligus merancang strategi perluasan kolaborasi serta kemitraan dengan pemerintah daerah dan berbagai perguruan tinggi di seluruh wilayah Sumatera. Dengan adanya koordinasi yang erat ini, ditargetkan penyerapan peserta pelatihan dan dampak positif bagi ekosistem digital daerah dapat meningkat signifikan.",
  },
  {
    id: "4",
    title: "Evaluasi Kinerja & Sinergi Program Pelatihan SDM Komdigi Medan 2026",
    category: "Pengumuman",
    date: "04 Juli 2026",
    image: "/gambar4.jpeg",
    author: "Tim Humas BBLSDM",
    snippet: "Jajaran pejabat dan pegawai BBLSDM Komdigi Medan berdiskusi langsung mengenai optimalisasi DIPA dan peningkatan kualitas layanan pelatihan kecerdasan artifisial dan digital marketing.",
    content: "Jajaran pejabat struktural, fungsional, dan seluruh pegawai BBLSDM Komdigi Medan mengikuti sesi dialog dan evaluasi kinerja bersama Wakil Menteri Komunikasi dan Digital RI. Diskusi difokuskan pada optimalisasi pemanfaatan anggaran DIPA serta peningkatan standar kualitas instruktur dan kurikulum layanan pelatihan, khususnya pada bidang-bidang terdepan seperti Kecerdasan Artifisial (AI), Keamanan Siber, dan Digital Marketing untuk mencetak talenta unggul di Sumatera Utara.",
  },
  {
    id: "5",
    title: "Sinergi Jajaran ASN BBLSDM Komdigi Medan dalam Transformasi Digital Vokasi",
    category: "Kegiatan UPT",
    date: "04 Juli 2026",
    image: "/gambar5.jpeg",
    author: "Tim Humas BBLSDM",
    snippet: "Suasana keakraban dan diskusi jajaran ASN BBLSDM Komdigi Medan mengenai peningkatan standar layanan pelatihan masyarakat.",
    content: "Jajaran Aparatur Sipil Negara (ASN) BBLSDM Komdigi Medan menunjukkan sinergi dan komitmen tinggi dalam mendukung transformasi layanan digital vokasi. Dalam sesi pengarahan ini, seluruh tim menyatukan visi untuk terus meningkatkan kualitas pelayanan publik, memastikan setiap program pelatihan yang diselenggarakan memberikan dampak nyata dan berkelanjutan bagi peningkatan kompetensi masyarakat digital di wilayah Sumatera.",
  },
  {
    id: "6",
    title: "Pembukaan Program Vokasi Digital Talent Scholarship (DTS) Batch 2 Tahun 2026",
    category: "Pelatihan & UMKM",
    date: "02 Juli 2026",
    image: "/gambar6.jpeg",
    author: "Panitia DTS BBLSDM",
    snippet: "Pendaftaran kelas baru Digital Talent Scholarship bagi mahasiswa, pencari kerja, dan pelaku UMKM di seluruh wilayah Sumatera telah resmi dibuka.",
    content: "Balai Besar Pelatihan Sumber Daya Manusia Komunikasi dan Digital (BBLSDM Komdigi) Medan resmi membuka pendaftaran program Digital Talent Scholarship (DTS) Batch 2 Tahun 2026. Pelatihan vokasi intensif ini disediakan secara gratis dan mencakup skema Fresh Graduate Academy (FGA), Vocational School Graduate Academy (VSGA), serta Digital Entrepreneurship Academy (DEA) bagi pelaku UMKM untuk mempercepat digitalisasi ekonomi nasional.",
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
                <option value="Kunjungan Kerja">Kunjungan Kerja</option>
                <option value="Kegiatan UPT">Kegiatan UPT</option>
                <option value="Rapat Koordinasi">Rapat Koordinasi</option>
                <option value="Pengumuman">Pengumuman</option>
                <option value="Pelatihan &amp; UMKM">Pelatihan &amp; UMKM</option>
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
                  className="group relative cursor-pointer bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="relative h-48 bg-slate-100 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#0b1b3d]/40 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-3 right-3 z-10">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/90 text-[#0284c7] backdrop-blur-sm shadow-sm border border-slate-100">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-2.5 grow flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-medium text-slate-400">
                        <span>{item.date}</span>
                        <span className="text-slate-500 font-semibold truncate max-w-30">{item.author}</span>
                      </div>

                      <h3 className="text-[15px] font-bold text-[#0b1b3d] line-clamp-2 leading-snug group-hover:text-[#0284c7] transition-colors duration-200">
                        {item.title}
                      </h3>

                      <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                        {item.snippet}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-3 border-t border-slate-100/80 text-xs font-bold text-[#0284c7] flex items-center justify-between group-hover:text-[#0b1b3d] transition-colors">
                    <span>Baca Selengkapnya</span>
                    <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
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
                <span className="inline-flex items-center rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-bold text-[#0284c7] uppercase border border-sky-100">
                  {activeModalItem.category}
                </span>
                <h2 className="text-xl font-extrabold text-[#0b1b3d] leading-tight">
                  {activeModalItem.title}
                </h2>
                <p className="text-xs text-slate-400 font-semibold">
                  Oleh: {activeModalItem.author} | {activeModalItem.date}
                </p>
              </div>

              <button
                onClick={() => setActiveModalItem(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center font-bold text-sm shrink-0"
              >
                ✕
              </button>
            </div>

            <div className="relative w-full h-64 sm:h-72 rounded-xl overflow-hidden bg-slate-100 border border-slate-100 shadow-inner">
              <Image
                src={activeModalItem.image}
                alt={activeModalItem.title}
                fill
                className="object-cover"
              />
            </div>

            <hr className="border-slate-100" />

            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4">
              <p>{activeModalItem.content}</p>
            </div>

            <div className="pt-4 border-t border-slate-100 text-right">
              <button
                onClick={() => setActiveModalItem(null)}
                className="px-5 py-2.5 text-xs font-bold text-white bg-[#0b1b3d] rounded-lg hover:bg-[#0284c7] transition-colors shadow-sm"
              >
                Tutup Artikel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
