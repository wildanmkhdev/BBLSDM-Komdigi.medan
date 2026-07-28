"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import PageHeader from "@/app/components/PageHeader";

interface GaleriItem {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  desc: string;
}

const galeriData: GaleriItem[] = [
  {
    id: "1",
    title: "Kunjungan Kerja Wamenkomdigi Nezar Patria ke BBLSDM Komdigi Medan",
    category: "Kunjungan Kerja",
    date: "04 Juli 2026",
    image: "/kunker-nezar/kunker-nezar-1.jpeg",
    desc: "Kunjungan Wamenkomdigi Nezar Patria di Balai Besar Pelatihan Sumber Daya Manusia Komunikasi dan Digital (BBLSDM Komdigi) Medan, Sabtu (04/07/2026). Foto: Pey HS/Komdigi",
  },
  {
    id: "2",
    title: "Dialog Wamenkomdigi Nezar Patria dengan Pegawai BBLSDM Komdigi Medan",
    category: "Kunjungan Kerja",
    date: "04 Juli 2026",
    image: "/kunker-nezar/kunker-nezar-2.jpeg",
    desc: "Sesi arahan dan dialog Wamenkomdigi Nezar Patria mengenai transformasi digital vokasi dan penguatan kapasitas pegawai di BBLSDM Komdigi Medan. Foto: Pey HS/Komdigi",
  },
  {
    id: "3",
    title: "Tinjauan Fasilitas Laboratorium Komputer BBLSDM Komdigi Medan",
    category: "Kunjungan Kerja",
    date: "04 Juli 2026",
    image: "/kunker-nezar/kunker-nezar-3.jpeg",
    desc: "Wamenkomdigi Nezar Patria meninjau infrastruktur laboratorium komputer dan ruang pelatihan siber di BBLSDM Komdigi Medan. Foto: Pey HS/Komdigi",
  },
  {
    id: "4",
    title: "Pengarahan Strategis Penguatan Talenta Digital Wilayah Sumatera",
    category: "Kunjungan Kerja",
    date: "04 Juli 2026",
    image: "/kunker-nezar/kunker-nezar-4.jpeg",
    desc: "Wamenkomdigi Nezar Patria saat berdialog dengan para pegawai Kantor Balai Besar Pelatihan Sumber Daya Manusia Komunikasi dan Digital (BBLSDM Komdigi) Medan di Tembung, Kota Medan, Sumatera Utara. Foto: Pey HS/Komdigi",
  },
  {
    id: "5",
    title: "Sinergi Jajaran ASN BBLSDM Komdigi Medan bersama Wamenkomdigi",
    category: "Kegiatan Instansi",
    date: "04 Juli 2026",
    image: "/kunker-nezar/kunker-nezar-5.jpeg",
    desc: "Suasana keakraban dan diskusi jajaran ASN BBLSDM Komdigi Medan bersama Wakil Menteri Komunikasi dan Digital. Foto: Pey HS/Komdigi",
  },
  {
    id: "6",
    title: "Paparan Program Vokasi Digital Talent Scholarship (DTS) 2026",
    category: "Pelatihan",
    date: "04 Juli 2026",
    image: "/kunker-nezar/kunker-nezar-6.jpeg",
    desc: "Diskusi pelaksanaan program DTS dan Digital Leadership Academy (DLA) untuk wilayah kerja 8 provinsi Sumatera. Foto: Pey HS/Komdigi",
  },
  {
    id: "7",
    title: "Kordinasi Pembinaan Karir dan Sertifikasi Profesi Digital",
    category: "Kegiatan Instansi",
    date: "04 Juli 2026",
    image: "/kunker-nezar/kunker-nezar-7.jpeg",
    desc: "Wamenkomdigi Nezar Patria menekankan standar kualitas instruktur dan asesor lisensi BNSP di BBLSDM Medan. Foto: Pey HS/Komdigi",
  },
  {
    id: "8",
    title: "Diskusi Pengembangan Kurikulum Kecerdasan Artifisial (AI)",
    category: "Pelatihan",
    date: "04 Juli 2026",
    image: "/kunker-nezar/kunker-nezar-8.jpeg",
    desc: "Pembahasan integrasi materi AI, Cloud Computing, dan Data Science dalam modul pelatihan masyarakat. Foto: Pey HS/Komdigi",
  },
  {
    id: "9",
    title: "Pemberian Pesan Kunci Wamenkomdigi untuk Aparatur BBLSDM Medan",
    category: "Kegiatan Instansi",
    date: "04 Juli 2026",
    image: "/kunker-nezar/kunker-nezar-9.jpeg",
    desc: "Pesan penting pimpinan kementerian agar BBLSDM Medan senantiasa berinovasi dalam melayani kebutuhan talenta digital daerah. Foto: Pey HS/Komdigi",
  },
  {
    id: "10",
    title: "Peninjauan Ruang Pelayanan Publik dan Registrasi Pelatihan",
    category: "Kunjungan Kerja",
    date: "04 Juli 2026",
    image: "/kunker-nezar/kunker-nezar-10.jpeg",
    desc: "Pemeriksaan fasilitas pendaftaran layanan publik dan helpdesk pelatihan BBLSDM Komdigi Medan. Foto: Pey HS/Komdigi",
  },
  {
    id: "11",
    title: "Tatap Muka bersama Tim Instruktur dan Asesor Komputer Medan",
    category: "Kegiatan Instansi",
    date: "04 Juli 2026",
    image: "/kunker-nezar/kunker-nezar-11.jpeg",
    desc: "Sesi foto bersama dan apresiasi untuk para pengajar dan tim teknis balai. Foto: Pey HS/Komdigi",
  },
  {
    id: "12",
    title: "Apresiasi Inovasi Layanan Publik Pelatihan Berbasis Inklusi",
    category: "Kegiatan Instansi",
    date: "04 Juli 2026",
    image: "/kunker-nezar/kunker-nezar-12.jpeg",
    desc: "Wamenkomdigi mendorong penyediaan sarana ramah disabilitas dan akses inklusif di lingkungan BBLSDM Medan. Foto: Pey HS/Komdigi",
  },
  {
    id: "13",
    title: "Penyambutan Resmi Wamenkomdigi oleh Kabalai Dr. Christiany Juditha",
    category: "Penyambutan & Sinergi",
    date: "04 Juli 2026",
    image: "/kunker-nezar/kunker-nezar-13.jpeg",
    desc: "Wamenkomdigi Nezar Patria disambut oleh Kepala Balai Besar Pengembangan Sumber Daya Manusia dan Penelitian Komunikasi dan Informatika (BBPSDMP / BBLSDM Komdigi) Medan, Dr. Christiany Juditha.",
  },
  {
    id: "14",
    title: "Foto Bersama Rangkaian Kunjungan Kerja Wamenkomdigi Nezar Patria",
    category: "Kunjungan Kerja",
    date: "04 Juli 2026",
    image: "/kunker-nezar/kunker-nezar-14.jpeg",
    desc: "Dokumentasi foto bersama Wamenkomdigi Nezar Patria dan seluruh jajaran keluarga besar BBLSDM Komdigi Medan di Tembung, Kota Medan. Foto: Pey HS/Komdigi",
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
      <PageHeader
        title="Galeri Kegiatan Instansi"
        subtitle="Dokumentasi foto dan liputan visual resmi Kunjungan Kerja Wamenkomdigi Nezar Patria, diklat vokasi, sertifikasi, serta aktivitas BBLSDM Komdigi Medan."
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Informasi", href: "#" },
          { label: "Galeri" },
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
                <option value="Kunjungan Kerja">Kunjungan Kerja</option>
                <option value="Kegiatan Instansi">Kegiatan Instansi</option>
                <option value="Penyambutan &amp; Sinergi">Penyambutan &amp; Sinergi</option>
                <option value="Pelatihan">Pelatihan</option>
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
                  <div className="h-48 relative overflow-hidden bg-slate-900">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 right-2.5 z-10">
                      <span className="text-[10px] font-bold bg-slate-900/80 text-white px-2 py-0.5 rounded backdrop-blur-sm border border-white/10 uppercase">
                        {item.category}
                      </span>
                    </div>
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
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setActiveModalItem(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-5 relative overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="inline-flex items-center rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-bold text-[#0284c7] uppercase">
                  {activeModalItem.category}
                </span>
                <h2 className="text-base sm:text-lg font-extrabold text-[#0b1b3d]">
                  {activeModalItem.title}
                </h2>
                <p className="text-xs text-slate-400 font-semibold">
                  Tanggal Kegiatan: {activeModalItem.date}
                </p>
              </div>

              <button
                onClick={() => setActiveModalItem(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center font-bold text-sm shrink-0"
              >
                ✕
              </button>
            </div>

            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-900 shadow-sm">
              <Image
                src={activeModalItem.image}
                alt={activeModalItem.title}
                fill
                sizes="(max-width: 768px) 100vw, 700px"
                className="object-cover"
              />
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
              {activeModalItem.desc}
            </p>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <a
                href={activeModalItem.image}
                download={activeModalItem.image.split("/").pop()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-[#0284c7] hover:bg-sky-600 rounded-md transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Unduh Gambar Resolusi Tinggi
              </a>

              <button
                onClick={() => setActiveModalItem(null)}
                className="px-4 py-1.5 text-xs font-bold text-slate-600 border border-slate-200 rounded-md hover:bg-slate-50"
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
