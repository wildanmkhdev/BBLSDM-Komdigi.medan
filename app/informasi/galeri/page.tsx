"use client";

import { useState } from "react";
import PageHeader from "@/app/components/PageHeader";

/* ──────────────────────────────────────────
   Dummy galeri data
   ────────────────────────────────────────── */
const galeriCategories = [
  "Semua",
  "Pelatihan",
  "Sertifikasi",
  "Kunjungan",
  "Seminar",
  "Kegiatan Internal",
];

const galeriList = [
  {
    id: 1,
    title: "Pelatihan Digital Marketing UMKM — Juli 2026",
    category: "Pelatihan",
    date: "18 Juli 2026",
  },
  {
    id: 2,
    title: "Penandatanganan MoU dengan USU",
    category: "Kunjungan",
    date: "15 Juli 2026",
  },
  {
    id: 3,
    title: "Workshop Keamanan Siber ASN Sumatera",
    category: "Seminar",
    date: "12 Juli 2026",
  },
  {
    id: 4,
    title: "Ujian Sertifikasi Kompetensi Digital Batch 4",
    category: "Sertifikasi",
    date: "10 Juli 2026",
  },
  {
    id: 5,
    title: "Upacara Hari Bhakti Postel Ke-81",
    category: "Kegiatan Internal",
    date: "8 Juli 2026",
  },
  {
    id: 6,
    title: "Pelatihan Cloud Computing Angkatan I",
    category: "Pelatihan",
    date: "5 Juli 2026",
  },
  {
    id: 7,
    title: "Kunjungan Kerja Komisi I DPR RI",
    category: "Kunjungan",
    date: "1 Juli 2026",
  },
  {
    id: 8,
    title: "Seminar Nasional Regulasi Telekomunikasi",
    category: "Seminar",
    date: "28 Juni 2026",
  },
  {
    id: 9,
    title: "Pelatihan Data Science untuk ASN",
    category: "Pelatihan",
    date: "25 Juni 2026",
  },
  {
    id: 10,
    title: "Sertifikasi IoT (Internet of Things) Batch 2",
    category: "Sertifikasi",
    date: "22 Juni 2026",
  },
  {
    id: 11,
    title: "Olahraga Bersama & Team Building",
    category: "Kegiatan Internal",
    date: "20 Juni 2026",
  },
  {
    id: 12,
    title: "Pelatihan UI/UX Design Fundamental",
    category: "Pelatihan",
    date: "18 Juni 2026",
  },
];

// Gradient combos for placeholder images
const gradients = [
  "from-navy/20 to-sky-accent/20",
  "from-sky-accent/20 to-gold/20",
  "from-navy/15 to-navy/30",
  "from-gold/20 to-marun/10",
  "from-sky-accent/15 to-navy/20",
  "from-navy/25 to-sky-accent/10",
];

export default function GaleriPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "Semua"
      ? galeriList
      : galeriList.filter((g) => g.category === activeCategory);

  return (
    <>
      <PageHeader
        title="Galeri Dokumentasi"
        subtitle="Dokumentasi kegiatan operasional dan acara di BBLSDM Komdigi Medan"
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Informasi", href: "#" },
          { label: "Galeri" },
        ]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {galeriCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-sky-primary text-white shadow-md"
                  : "bg-offwhite text-text-muted hover:bg-sky-accent/10 hover:text-sky-primary border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setLightboxIndex(i)}
              className="group relative rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300 hover:-translate-y-0.5 text-left"
            >
              {/* Image placeholder */}
              <div
                className={`aspect-square bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center`}
              >
                <div className="text-center p-4">
                  <svg
                    className="w-10 h-10 text-navy/30 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a2.25 2.25 0 002.25-2.25V5.25a2.25 2.25 0 00-2.25-2.25H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
                    />
                  </svg>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                  </svg>
                </div>
              </div>

              {/* Info */}
              <div className="p-3.5">
                <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sky-accent/10 text-sky-700 mb-1.5">
                  {item.category}
                </span>
                <h3 className="text-sm font-semibold text-navy line-clamp-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-text-muted mt-1">{item.date}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <svg className="w-16 h-16 text-text-light mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a2.25 2.25 0 002.25-2.25V5.25a2.25 2.25 0 00-2.25-2.25H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
            </svg>
            <p className="text-text-muted">Belum ada foto untuk kategori ini.</p>
          </div>
        )}
      </section>

      {/* Lightbox modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/90 shadow flex items-center justify-center hover:bg-white transition-colors"
            >
              <svg className="w-4 h-4 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image */}
            <div
              className={`aspect-video bg-gradient-to-br ${gradients[lightboxIndex % gradients.length]} flex items-center justify-center`}
            >
              <svg className="w-20 h-20 text-navy/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a2.25 2.25 0 002.25-2.25V5.25a2.25 2.25 0 00-2.25-2.25H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
              </svg>
            </div>

            {/* Info */}
            <div className="p-6">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-accent/10 text-sky-700 mb-2">
                {filtered[lightboxIndex]?.category}
              </span>
              <h3 className="text-lg font-bold text-navy">
                {filtered[lightboxIndex]?.title}
              </h3>
              <p className="text-sm text-text-muted mt-1">
                {filtered[lightboxIndex]?.date}
              </p>
            </div>

            {/* Nav arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-3 pointer-events-none">
              {lightboxIndex > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(lightboxIndex - 1);
                  }}
                  className="pointer-events-auto w-10 h-10 rounded-full bg-white/90 shadow flex items-center justify-center hover:bg-white transition-colors"
                >
                  <svg className="w-5 h-5 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
              )}
              {lightboxIndex < filtered.length - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(lightboxIndex + 1);
                  }}
                  className="pointer-events-auto w-10 h-10 rounded-full bg-white/90 shadow flex items-center justify-center hover:bg-white ml-auto transition-colors"
                >
                  <svg className="w-5 h-5 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
