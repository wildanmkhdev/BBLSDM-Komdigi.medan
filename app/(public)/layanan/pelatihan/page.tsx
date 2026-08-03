import React from "react";
import prisma from "@/lib/prisma";
import PelatihanList, { type PelatihanItem } from "./PelatihanList";

import { Pelatihan } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function PelatihanPage() {
  let dbPelatihan: Pelatihan[] = [];
  try {
    dbPelatihan = await prisma.pelatihan.findMany({
      orderBy: [{ status: "asc" }, { createdAt: "desc" }],
    });
  } catch (error) {
    console.error("Error fetching pelatihan:", error);
  }

  const list: PelatihanItem[] = dbPelatihan.map((p) => {
    // Map status enum DB ke label UI
    const statusMap = {
      OPEN: "Dibuka",
      FULL: "Penuh",
      SEGERA_DIBUKA: "Segera Dibuka",
    } as const;

    // Map level enum DB ke label UI
    const levelMap = {
      DASAR: "Dasar",
      MENENGAH: "Menengah",
      LANJUTAN: "Lanjutan",
    } as const;

    return {
      id: p.id,
      title: p.title,
      category: p.categorySlug as "komunikasi" | "pemasaran" | "cyber" | "data" | "cloud",
      categoryLabel: p.categoryLabel,
      description: p.description,
      jadwal: p.jadwal,
      durasi: p.durasi,
      kuota: p.kuota,
      terisi: p.terisi,
      status: statusMap[p.status as keyof typeof statusMap] || "Segera Dibuka",
      level: levelMap[p.level as keyof typeof levelMap] || "Dasar",
      metode: p.metode,
      lokasi: p.lokasi,
      silabus: Array.isArray(p.silabus) ? (p.silabus as string[]) : [],
      persyaratan: Array.isArray(p.persyaratan) ? (p.persyaratan as string[]) : [],
    };
  });

<<<<<<< HEAD
  const totalKuota = pelatihanList.reduce((s, p) => s + p.kuota, 0);
  const totalTerdaftar = pelatihanList.reduce((s, p) => s + p.terisi, 0);
  const totalDibuka = pelatihanList.filter((p) => p.status === "Dibuka").length;

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
                  activeStatus === "semua"
                    ? "bg-white/15 border-sky-accent text-white shadow-lg"
                    : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                }`}
              >
                <p className="text-xl sm:text-2xl font-bold text-white leading-none">{pelatihanList.length}</p>
                <p className="text-[11px] text-slate-300 mt-1">Total Program</p>
              </button>

              <button
                onClick={() => setActiveStatus("Dibuka")}
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
                  onClick={() => setActiveStatus(st.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                    activeStatus === st.id
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
          <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100 no-scrollbar">
            {categoryTabs.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                  activeCategory === cat.id
                    ? "bg-sky-primary text-white shadow-sm"
                    : "bg-slate-50 text-text-muted hover:bg-sky-accent/10 hover:text-sky-primary border border-slate-200/60"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Card Grid dengan Hover Akses Kiri Interaktif */}
        {filteredList.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200/80 shadow-sm">
            <p className="text-navy font-semibold text-base mb-1">Tidak ada pelatihan yang cocok</p>
            <p className="text-xs text-text-muted mb-4">Coba sesuaikan kata kunci pencarian atau filter kategori Anda.</p>
            <button
              onClick={() => { setSearchQuery(""); setActiveCategory("semua"); setActiveStatus("semua"); }}
              className="px-4 py-2 bg-sky-primary text-white text-xs font-medium rounded-lg hover:bg-sky-dark transition-colors"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredList.map((p) => {
              const pct = Math.min(Math.round((p.terisi / p.kuota) * 100), 100);
              
              // Status Pill styling
              const statusBadges = {
                Dibuka: "bg-emerald-50 text-emerald-700 border-emerald-200",
                Penuh: "bg-rose-50 text-rose-700 border-rose-200",
                "Segera Dibuka": "bg-amber-50 text-amber-700 border-amber-200",
              };

              const levelBadges = {
                Dasar: "bg-sky-50 text-sky-700 border-sky-200",
                Menengah: "bg-indigo-50 text-indigo-700 border-indigo-200",
                Lanjutan: "bg-purple-50 text-purple-700 border-purple-200",
              };

              return (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col overflow-hidden cursor-pointer"
                >
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Top Badges */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-sky-primary bg-sky-accent/10 px-2.5 py-0.5 rounded-md">
                          {p.categoryLabel}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${statusBadges[p.status]}`}>
                            {p.status}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${levelBadges[p.level]}`}>
                            {p.level}
                          </span>
                        </div>
                      </div>

                      {/* Judul Pelatihan */}
                      <h3 className="text-base font-bold text-navy leading-snug mb-2">
                        {p.title}
                      </h3>

                      {/* Deskripsi */}
                      <p className="text-xs text-text-muted leading-relaxed line-clamp-3 mb-5">
                        {p.description}
                      </p>

                      {/* Detail Rincian List */}
                      <div className="space-y-2 text-xs text-text-muted mb-5 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-2.5">
                          <IconCalendar />
                          <span className="font-medium text-navy">{p.jadwal}</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <IconClock />
                          <span>{p.durasi} ({p.metode})</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <IconMapPin />
                          <span className="truncate">{p.lokasi}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      {/* Progress Bar Kuota */}
                      <div className="mb-5">
                        <div className="flex justify-between items-center text-xs mb-1.5">
                          <span className="flex items-center gap-1 font-medium text-navy">
                            <IconUsers /> {p.terisi} / {p.kuota} Peserta
                          </span>
                          <span className="font-semibold text-sky-primary">{pct}%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/50">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              p.terisi >= p.kuota
                                ? "bg-marun"
                                : "bg-linear-to-r from-sky-primary to-sky-accent"
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setSelectedPelatihan(p)}
                          className="w-full py-2.5 px-3 rounded-xl border border-slate-200 hover:border-sky-accent hover:bg-sky-accent/5 text-navy hover:text-sky-primary text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5"
                        >
                          <IconBookOpen />
                          <span>Silabus</span>
                        </button>

                        <button
                          disabled={p.status !== "Dibuka"}
                          className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 shadow-sm ${
                            p.status === "Penuh"
                              ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                              : p.status === "Segera Dibuka"
                                ? "bg-amber-50 text-amber-700 cursor-not-allowed border border-amber-200"
                                : "bg-sky-primary hover:bg-sky-dark text-white hover:shadow-md active:scale-95"
                          }`}
                        >
                          {p.status === "Penuh"
                            ? "Kuota Penuh"
                            : p.status === "Segera Dibuka"
                              ? "Segera Dibuka"
                              : "Daftar Now"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Informasi Tambahan */}
        <div className="mt-14 bg-linear-to-br from-slate-50 via-white to-slate-50/80 rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-sky-accent/15 flex items-center justify-center text-sky-primary">
              <IconBookOpen />
            </div>
            <div>
              <h3 className="text-base font-bold text-navy">Ketentuan &amp; Informasi Pendaftaran</h3>
              <p className="text-xs text-text-muted">Harap perhatikan petunjuk teknis sebelum melakukan pendaftaran pelatihan</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 pt-2">
            {[
              { title: "Sertifikasi Resmi", desc: "Sertifikat diterbitkan secara digital oleh Kementerian Komunikasi dan Digital RI setelah memenuhi kriteria kelulusan." },
              { title: "Perangkat Praktik", desc: "Peserta diwajibkan membawa laptop pribadi yang telah terpasang software sesuai kebutuhan materi kelas." },
              { title: "Batas Kuota Sistem", desc: "Pendaftaran akan otomatis ditutup apabila kuota peserta kelas telah terpenuhi 100%." },
              { title: "Konfirmasi &amp; Tiket", desc: "Undangan dan lembar konfirmasi kelas dikirim melalui email terdaftar H-3 sebelum jadwal dimulai." },
            ].map((info, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200/60 shadow-2xs">
                <IconCheckCircle />
                <div>
                  <h4 className="text-xs font-bold text-navy mb-0.5">{info.title}</h4>
                  <p className="text-xs text-text-muted leading-relaxed">{info.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Modal Dialog Detail & Silabus Pelatihan */}
      {selectedPelatihan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/60 backdrop-blur-xs transition-all duration-300 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 relative overflow-hidden">
            {/* Header Modal */}
            <div className="bg-linear-to-r from-navy to-navy-light p-6 text-white relative">
              <button
                onClick={() => setSelectedPelatihan(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <IconX />
              </button>
              <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-sky-accent/20 text-sky-accent px-2.5 py-0.5 rounded mb-2">
                {selectedPelatihan.categoryLabel}
              </span>
              <h3 className="text-lg font-bold text-white leading-snug pr-6">
                {selectedPelatihan.title}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Level: {selectedPelatihan.level} • {selectedPelatihan.durasi}
              </p>
            </div>

            {/* Content Modal */}
            <div className="p-6 space-y-5">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-navy mb-2">Deskripsi Program</h4>
                <p className="text-xs text-text-muted leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {selectedPelatihan.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-navy mb-2">Silabus Pembelajaran</h4>
                <div className="space-y-2">
                  {selectedPelatihan.silabus.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-navy">
                      <IconCheckCircle />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-navy mb-2">Persyaratan Peserta</h4>
                <ul className="space-y-1.5">
                  {selectedPelatihan.persyaratan.map((req, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-text-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-accent shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] text-text-muted">Status Pendaftaran:</p>
                  <p className="text-xs font-bold text-navy">{selectedPelatihan.status} ({selectedPelatihan.terisi}/{selectedPelatihan.kuota} Kuota)</p>
                </div>
                <button
                  disabled={selectedPelatihan.status !== "Dibuka"}
                  onClick={() => {
                    alert(`Pendaftaran untuk ${selectedPelatihan.title} berhasil dibuka.`);
                    setSelectedPelatihan(null);
                  }}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                    selectedPelatihan.status === "Dibuka"
                      ? "bg-sky-primary hover:bg-sky-dark text-white"
                      : "bg-slate-100 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  {selectedPelatihan.status === "Dibuka" ? "Daftar Sekarang" : selectedPelatihan.status}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
=======
  return <PelatihanList initialPelatihan={list} />;
>>>>>>> 3353f44519777e53525d7009f50cd6d71b15aef3
}
