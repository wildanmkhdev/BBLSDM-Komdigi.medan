"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import PageHeader from "@/app/components/PageHeader";

export interface GaleriItem {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  images: string[];
  desc: string;
}

interface GaleriListProps {
  initialGaleri: GaleriItem[];
}

export default function GaleriList({ initialGaleri }: GaleriListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [activeModalItem, setActiveModalItem] = useState<GaleriItem | null>(null);
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);

  const filteredGaleri = useMemo(() => {
    return initialGaleri.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "Semua" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [initialGaleri, searchQuery, selectedCategory]);

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
                  onClick={() => {
                    setActiveModalItem(item);
                    setSelectedImgIndex(0);
                  }}
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
                    <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5">
                      <span className="text-[10px] font-bold bg-black/60 text-white px-2 py-0.5 rounded backdrop-blur-sm border border-white/20">
                        {item.images.length} Foto
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-1.5 grow">
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span className="font-bold text-[#0284c7]">{item.category}</span>
                      <span>{item.date}</span>
                    </div>

                    <h3 className="text-xs font-bold text-[#0b1b3d] line-clamp-2 leading-snug group-hover:text-[#0284c7] transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <div className="px-4 pb-4 pt-2 border-t border-slate-100 text-[10px] font-bold text-[#0284c7] flex items-center justify-between group-hover:text-[#0b1b3d] transition-colors">
                    <span>Lihat Dokumentasi Kegiatan</span>
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

      {/* Modal Detail View with Multi-Photo Gallery */}
      {activeModalItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          onClick={() => setActiveModalItem(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-2xl max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700 uppercase">
                    {activeModalItem.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#0b1b3d] bg-sky-50 border border-sky-100 px-2.5 py-0.5 rounded-full">
                    {activeModalItem.date}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold text-[#0b1b3d] leading-tight pt-0.5">
                  {activeModalItem.title}
                </h2>
              </div>

              <button
                onClick={() => setActiveModalItem(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center font-bold text-sm shrink-0"
              >
                ✕
              </button>
            </div>

            {/* Gallery Multi-Photo Viewer */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
                <span>Dokumentasi Kegiatan ({selectedImgIndex + 1} dari {activeModalItem.images.length} Foto):</span>
                <span className="text-slate-400">Klik panah atau thumbnail untuk melihat foto lain</span>
              </div>

              {/* Main Photo Display */}
              <div className="relative aspect-16/10 sm:aspect-video w-full rounded-xl overflow-hidden bg-slate-900 shadow-md group">
                <Image
                  src={activeModalItem.images[selectedImgIndex] || activeModalItem.image}
                  alt={`${activeModalItem.title} - Foto ${selectedImgIndex + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="object-cover transition-all duration-300"
                />

                {/* Left/Right Navigation Arrows */}
                {activeModalItem.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImgIndex((prev) => 
                          prev === 0 ? activeModalItem.images.length - 1 : prev - 1
                        );
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center font-bold text-lg backdrop-blur-xs opacity-80 group-hover:opacity-100 transition-opacity"
                      title="Foto Sebelumnya"
                    >
                      ‹
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImgIndex((prev) => 
                          prev === activeModalItem.images.length - 1 ? 0 : prev + 1
                        );
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center font-bold text-lg backdrop-blur-xs opacity-80 group-hover:opacity-100 transition-opacity"
                      title="Foto Berikutnya"
                    >
                      ›
                    </button>
                  </>
                )}

                {/* Counter Badge */}
                <div className="absolute bottom-3 right-3 z-10">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-black/60 text-white backdrop-blur-sm border border-white/20 shadow-xs">
                    Foto {selectedImgIndex + 1} / {activeModalItem.images.length}
                  </span>
                </div>
              </div>

              {/* Thumbnails Selector Strip */}
              {activeModalItem.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2.5 pt-1">
                  {activeModalItem.images.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImgIndex(idx)}
                      className={`relative aspect-16/10 rounded-lg overflow-hidden bg-slate-100 transition-all ${
                        selectedImgIndex === idx
                          ? "ring-2 ring-[#0b1b3d] ring-offset-2 scale-[0.98] opacity-100 shadow-sm"
                          : "opacity-60 hover:opacity-90 border border-slate-200"
                      }`}
                    >
                      <Image
                        src={imgUrl}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        sizes="150px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Deskripsi Kegiatan beserta Tanggalnya */}
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-2.5">
                <span className="text-xs font-bold text-[#0b1b3d] uppercase tracking-wider flex items-center gap-1.5">
                  <span>Deskripsi Kegiatan</span>
                </span>
                <span className="text-xs font-bold text-slate-600">
                  Tanggal: {activeModalItem.date}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {activeModalItem.desc}
              </p>
            </div>

            {/* Footer Modal */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-end">
              <button
                onClick={() => setActiveModalItem(null)}
                className="w-full sm:w-auto px-6 py-2 text-xs font-semibold text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Tutup Galeri
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
