"use client";

import React, { useState } from "react";
import PageHeader from "@/app/components/PageHeader";

/* ──────────────────────────────────────────
   Icon Helpers
   ────────────────────────────────────────── */
function IconSearch() {
  return (
    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg className="w-4 h-4 shrink-0 text-sky-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg className="w-4 h-4 shrink-0 text-sky-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg className="w-4 h-4 shrink-0 text-sky-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  );
}

function IconMapPin() {
  return (
    <svg className="w-4 h-4 shrink-0 text-sky-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

function IconCheckCircle() {
  return (
    <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function IconX() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function IconBookOpen() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18c-2.305 0-4.408.867-6 2.292m0-14.25v14.25" />
    </svg>
  );
}

export interface PelatihanItem {
  id: string;
  title: string;
  category: "komunikasi" | "pemasaran" | "cyber" | "data" | "cloud";
  categoryLabel: string;
  description: string;
  jadwal: string;
  durasi: string;
  kuota: number;
  terisi: number;
  status: "Dibuka" | "Penuh" | "Segera Dibuka";
  level: "Dasar" | "Menengah" | "Lanjutan";
  metode: string;
  lokasi: string;
  silabus: string[];
  persyaratan: string[];
}

interface PelatihanListProps {
  initialPelatihan: PelatihanItem[];
}

const categoryTabs = [
  { id: "semua", label: "Semua Kategori" },
  { id: "komunikasi", label: "Komunikasi Digital" },
  { id: "pemasaran", label: "Pemasaran Digital" },
  { id: "cyber", label: "Cyber Security" },
  { id: "data", label: "Data & AI" },
  { id: "cloud", label: "Cloud & DevOps" },
];

export default function PelatihanList({ initialPelatihan }: PelatihanListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("semua");
  const [activeStatus, setActiveStatus] = useState("semua");
  const [selectedPelatihan, setSelectedPelatihan] = useState<PelatihanItem | null>(null);

  // Filtering logic
  const filteredList = initialPelatihan.filter((p) => {
    const matchCategory = activeCategory === "semua" || p.category === activeCategory;
    const matchStatus = activeStatus === "semua" || p.status === activeStatus;
    const matchSearch =
      searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchStatus && matchSearch;
  });

  const totalKuota = initialPelatihan.reduce((s, p) => s + p.kuota, 0);
  const totalTerdaftar = initialPelatihan.reduce((s, p) => s + p.terisi, 0);
  const totalDibuka = initialPelatihan.filter((p) => p.status === "Dibuka").length;

  return (
    <>
      <PageHeader
        title="Pelatihan"
        subtitle="Jadwal program pelatihan kompetensi digital semester II tahun 2026"
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Layanan", href: "#" },
          { label: "Pelatihan" },
        ]}
        className="pt-28 pb-19 sm:pt-32 sm:pb-23"
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* Banner Pengantar & Highlight Stats */}
        <div className="bg-linear-to-r from-navy via-navy-light to-navy rounded-2xl p-6 sm:p-8 text-white shadow-xl mb-10 relative overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          
          <div className="relative z-10 grid lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-accent/20 text-sky-accent text-xs font-semibold uppercase tracking-wider border border-sky-accent/30">
                <span>Program APBN Kementerian Komdigi</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold leading-snug">
                Pelatihan Kompetensi Digital Gratis &amp; Bersertifikat Resmi
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Tingkatkan kecakapan teknis Anda melalui program pelatihan tatap muka di BBLSDM Komdigi Medan. Dibiayai penuh oleh APBN tanpa dipungut biaya apapun.
              </p>
            </div>

            <div className="lg:col-span-5 grid grid-cols-3 gap-3">
              <button
                onClick={() => { setActiveStatus("semua"); setActiveCategory("semua"); }}
                className={`p-3.5 rounded-xl border text-center transition-all duration-200 ${
                  activeStatus === "semua" && activeCategory === "semua"
                    ? "bg-white/15 border-sky-accent text-white shadow-lg"
                    : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                }`}
              >
                <p className="text-xl sm:text-2xl font-bold text-white leading-none">{initialPelatihan.length}</p>
                <p className="text-[11px] text-slate-300 mt-1">Total Program</p>
              </button>

              <button
                onClick={() => { setActiveStatus("Dibuka"); }}
                className={`p-3.5 rounded-xl border text-center transition-all duration-200 ${
                  activeStatus === "Dibuka"
                    ? "bg-sky-accent/25 border-sky-accent text-white shadow-lg"
                    : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                }`}
              >
                <p className="text-xl sm:text-2xl font-bold text-sky-accent leading-none">{totalDibuka}</p>
                <p className="text-[11px] text-slate-300 mt-1">Masih Dibuka</p>
              </button>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-center">
                <p className="text-xl sm:text-2xl font-bold text-amber-400 leading-none">{totalTerdaftar}/{totalKuota}</p>
                <p className="text-[11px] text-slate-300 mt-1">Peserta</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar Interaktif */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <IconSearch />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama pelatihan atau kata kunci..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-navy placeholder:text-slate-400 focus:border-sky-accent focus:ring-2 focus:ring-sky-accent/20 outline-none transition-all duration-200 bg-slate-50/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-navy"
                >
                  <IconX />
                </button>
              )}
            </div>

            {/* Status Filter Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 shrink-0">
              <span className="text-xs font-semibold text-text-muted shrink-0 mr-1">Status:</span>
              {[
                { id: "semua", label: "Semua" },
                { id: "Dibuka", label: "Dibuka" },
                { id: "Penuh", label: "Penuh" },
                { id: "Segera Dibuka", label: "Segera Dibuka" },
              ].map((st) => (
                <button
                  key={st.id}
                  onClick={() => setActiveStatus(st.label)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                    activeStatus === st.label || (st.id === "semua" && activeStatus === "semua")
                      ? "bg-navy text-white shadow-sm"
                      : "bg-slate-100 text-text-muted hover:bg-slate-200 hover:text-navy"
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto border-t border-slate-100 pt-4 pb-1">
            {categoryTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  activeCategory === tab.id
                    ? "bg-sky-primary text-white shadow-md shadow-sky-primary/20 scale-[0.98]"
                    : "bg-slate-50 text-navy hover:bg-slate-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Pelatihan Grid List */}
        {filteredList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredList.map((pelatihan) => {
              const registeredPct =
                pelatihan.kuota > 0
                  ? Math.min(Math.round((pelatihan.terisi / pelatihan.kuota) * 100), 100)
                  : 0;

              return (
                <div
                  key={pelatihan.id}
                  className="flex flex-col bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden group"
                >
                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                      {/* Tags Bar */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold text-sky-primary uppercase bg-sky-primary/10 px-2.5 py-1 rounded-md border border-sky-primary/20">
                          {pelatihan.categoryLabel}
                        </span>
                        
                        {/* Status Chip */}
                        {pelatihan.status === "Dibuka" && (
                          <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full font-sans uppercase">
                            Dibuka
                          </span>
                        )}
                        {pelatihan.status === "Penuh" && (
                          <span className="text-[9px] font-bold text-rose-600 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded-full font-sans uppercase">
                            Penuh
                          </span>
                        )}
                        {pelatihan.status === "Segera Dibuka" && (
                          <span className="text-[9px] font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full font-sans uppercase">
                            Segera
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-base sm:text-lg font-bold text-navy group-hover:text-slate-700 transition-colors duration-200 line-clamp-2 leading-snug">
                        {pelatihan.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-text-muted line-clamp-3 leading-relaxed">
                        {pelatihan.description}
                      </p>

                      {/* Metadata Grid */}
                      <div className="space-y-2.5 pt-3 border-t border-slate-100">
                        <div className="flex items-center gap-2.5 text-xs text-navy font-semibold">
                          <IconCalendar />
                          <span className="truncate">{pelatihan.jadwal}</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-xs text-navy font-medium">
                          <IconClock />
                          <span>{pelatihan.durasi}</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-xs text-navy font-medium">
                          <IconMapPin />
                          <span className="truncate">{pelatihan.lokasi}</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress & Register Action Button */}
                    <div className="mt-6 space-y-4">
                      {/* Progress register bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] font-semibold">
                          <span className="text-text-muted">Pendaftar Terisi</span>
                          <span className="text-navy">{pelatihan.terisi} / {pelatihan.kuota} ({registeredPct}%)</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              registeredPct >= 100
                                ? "bg-rose-500"
                                : registeredPct >= 80
                                ? "bg-amber-400"
                                : "bg-sky-primary"
                            }`}
                            style={{ width: `${registeredPct}%` }}
                          />
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setSelectedPelatihan(pelatihan)}
                          className="w-full py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-xs font-semibold text-navy transition bg-white"
                        >
                          Detail Silabus
                        </button>
                        <a
                          href="https://dts.kominfo.go.id"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-full py-2.5 rounded-xl text-xs font-bold text-center transition flex items-center justify-center ${
                            pelatihan.status === "Dibuka"
                              ? "bg-navy hover:bg-[#0284c7] text-white shadow-sm"
                              : "bg-slate-100 text-slate-400 pointer-events-none"
                          }`}
                        >
                          {pelatihan.status === "Penuh" ? "Kuota Penuh" : "Daftar Sekarang"}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-xs">
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
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
            <h3 className="text-sm font-bold text-slate-800">Pelatihan Tidak Ditemukan</h3>
            <p className="text-xs text-slate-500 mt-1">Coba gunakan kata kunci pencarian atau filter status yang lain.</p>
          </div>
        )}
      </section>

      {/* Modal Detail Silabus & Persyaratan */}
      {selectedPelatihan && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setSelectedPelatihan(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-sky-primary/10 text-sky-primary text-xs font-bold uppercase tracking-wide">
                  {selectedPelatihan.categoryLabel}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-navy leading-tight">
                  {selectedPelatihan.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedPelatihan(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center text-sm shrink-0 font-bold"
              >
                ✕
              </button>
            </div>

            <hr className="border-slate-100" />

            {/* Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Deskripsi Singkat</h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {selectedPelatihan.description}
              </p>
            </div>

            {/* Silabus */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <IconBookOpen />
                <span>Materi Silabus Pembelajaran</span>
              </h4>
              <div className="grid sm:grid-cols-2 gap-2.5 bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                {selectedPelatihan.silabus.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                    <IconCheckCircle />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Persyaratan */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Persyaratan Peserta Pelatihan</span>
              </h4>
              <div className="space-y-2.5 px-2">
                {selectedPelatihan.persyaratan.map((req, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 font-medium">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-[#0b1b3d] text-[10px] font-extrabold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="pt-0.5">{req}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-text-muted font-medium">
                Metode Pelatihan: <strong className="text-navy">{selectedPelatihan.metode}</strong> ({selectedPelatihan.lokasi})
              </span>
              <div className="flex gap-2 w-full sm:w-auto shrink-0">
                <button
                  onClick={() => setSelectedPelatihan(null)}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50"
                >
                  Tutup Detail
                </button>
                <a
                  href="https://dts.kominfo.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full sm:w-auto text-center px-6 py-2.5 rounded-xl text-xs font-bold text-white transition ${
                    selectedPelatihan.status === "Dibuka"
                      ? "bg-navy hover:bg-[#0284c7] shadow-sm"
                      : "bg-slate-200 text-slate-400 pointer-events-none"
                  }`}
                >
                  {selectedPelatihan.status === "Penuh" ? "Kuota Penuh" : "Daftar Sekarang"}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
