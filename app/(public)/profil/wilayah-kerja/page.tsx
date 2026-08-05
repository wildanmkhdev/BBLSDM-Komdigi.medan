"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import PageHeader from "@/app/components/PageHeader";
import type { WilayahData, WilayahViewMode } from "@/app/components/WilayahMap";

/* ─── Data 8 provinsi wilayah kerja BBLSDM Komdigi Medan ─── */
const wilayahList: WilayahData[] = [
  {
    provinsi: "Sumatera Utara",
    kota: "Medan",
    alamat: "Jl. Ngalengko No.1, Perintis, Kec. Medan Tim., Kota Medan, Sumatera Utara 20236",
    telepon: "(6261) 4525438",
    website: "https://diskominfo.sumutprov.go.id/",
    lat: 3.6009495823832425,
    lng: 98.68844747553271,
  },
  {
    provinsi: "Aceh",
    kota: "Banda Aceh",
    alamat: "Jl.T.Panglima Nyak Makam No 8 Lampineng, Kota Banda Aceh",
    telepon: "(0651) 7552564",
    website: "https://diskominfo.acehprov.go.id/",
    lat: 5.565880257598649,
    lng: 95.34320790954617,
  },
  {
    provinsi: "Sumatera Barat",
    kota: "Padang",
    alamat: "Jl. Raya Indarung Km.12, Padang Besi, Kota Padang",
    telepon: "-------",
    website: "https://diskominfo.sumbarprov.go.id/",
    lat: -0.9523763757062634,
    lng: 100.4746055607255,
  },
  {
    provinsi: "Riau",
    kota: "Pekanbaru",
    alamat: "Jl. Ronggowarsito No. 14 Kota Pekanbaru Provinsi Riau",
    telepon: "(0761) 28997",
    website: "https://diskominfotik.riau.go.id/",
    lat: 0.5132641380276376,
    lng: 101.4548773206545,
  },
  {
    provinsi: "Kepulauan Riau",
    kota: "Tanjung Pinang",
    alamat: "Pusat Pemerintahan Provinsi Kepulauan Riau, Gedung Sultan Mahmud Riayat Syah (Gedung D Lantai 1) Dompak, Bukit Bestari, Kota Tanjung Pinang",
    telepon: "-------",
    website: "https://diskominfo.kepriprov.go.id/",
    lat: 0.8779441030781603,
    lng: 104.445111,
  },
  {
    provinsi: "Jambi",
    kota: "Jambi",
    alamat: "Jl. H. Agus Salim, Paal Lima, Kec. Kota Baru, Kota Jambi, Jambi 36129",
    telepon: "-------",
    website: "https://diskominfo.jambiprov.go.id/",
    lat: -1.6325329066632042,
    lng: 103.61102988203443,
  },
  {
    provinsi: "Sumatera Selatan",
    kota: "Palembang",
    alamat: "Jl. Kapten A. Rivai No.23, 19 Ilir, Kec. Bukit Kecil, Kota Palembang, Sumatera Selatan",
    telepon: "-------",
    website: "https://diskominfo.sumselprov.go.id/",
    lat: -2.9909,
    lng: 104.7564,
  },
  {
    provinsi: "Bangka Belitung",
    kota: "Pangkal Pinang",
    alamat: "Jl. Pulau Bangka, Air Itam - Pangkalpinang 33148",
    telepon: "(0717) 439-426",
    website: "https://diskominfo.babelprov.go.id/",
    lat: -2.1615079465906897,
    lng: 106.16814326298616,
  },
];

/* ─── Icons ─── */
function IconMapPin({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={`shrink-0 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}
function IconPhone() {
  return (
    <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}
function IconGlobe() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  );
}
function IconChevronRight() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}
function IconLayer() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
    </svg>
  );
}

/* ─── Dynamic import — SSR off (Leaflet) ─── */
const MapComponent = dynamic(() => import("@/app/components/WilayahMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[420px] bg-slate-100 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-[#0284c7] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-slate-500">Memuat peta…</p>
      </div>
    </div>
  ),
});

export default function WilayahKerjaPage() {
  const [viewMode, setViewMode] = useState<WilayahViewMode>("default");
  const [selected, setSelected] = useState<WilayahData | null>(null);

  /* When user clicks a province marker/button */
  function handleSelectProvince(w: WilayahData) {
    setSelected(w);
    setViewMode("province");
  }

  /* Switch to regional view */
  function handleRegionalView() {
    setSelected(null);
    setViewMode("regional");
  }

  /* Reset everything */
  function handleReset() {
    setSelected(null);
    setViewMode("default");
  }

  /* Badge text based on mode */
  const badgeLabel =
    viewMode === "regional"
      ? "Regional Sumatera"
      : viewMode === "province" && selected
      ? selected.provinsi
      : "Peta Interaktif";

  const badgeSub =
    viewMode === "regional"
      ? "Wilayah Kerja BBLSDM"
      : viewMode === "province" && selected
      ? `${selected.kota} — Klik untuk detail`
      : "Lihat detail per wilayah kerja BBLSDM";

  return (
    <>
      <PageHeader
        title="Wilayah Kerja"
        subtitle="Direktori kantor BBLSDM Komdigi di setiap provinsi wilayah kerja beserta informasi kontak dan tautan website resmi"
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Profil", href: "#" },
          { label: "Wilayah Kerja" },
        ]}
        className="pt-28 pb-19 sm:pt-32 sm:pb-23"
      />

      <section className="bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-0 rounded-2xl overflow-hidden border border-slate-200 shadow-lg">

            {/* ─── Left: Map (65%) ─── */}
            <div className="relative lg:w-[65%] h-[420px] lg:h-[600px]">
              <MapComponent
                wilayahList={wilayahList}
                selected={selected}
                viewMode={viewMode}
                onSelect={handleSelectProvince}
              />

              {/* Dynamic info badge — top left */}
              <div className="absolute top-3 left-3 z-10 bg-white/95 backdrop-blur-sm border border-slate-200 rounded-lg px-3 py-2 shadow-md max-w-[250px]">
                {viewMode === "regional" && (
                  <span className="inline-block w-2 h-2 rounded-full bg-[#0284c7] mr-1.5 mb-0.5 animate-pulse" />
                )}
                <p className="text-[9px] font-bold text-[#0284c7] uppercase tracking-[0.18em] mb-0.5 inline">
                  {badgeLabel}
                </p>
                <p className="text-[11px] text-slate-600 font-medium leading-snug mt-0.5">
                  {badgeSub}
                </p>
              </div>

              {/* Reset button — shown when not in default mode */}
              {viewMode !== "default" && (
                <button
                  onClick={handleReset}
                  className="absolute top-3 right-3 z-10 bg-white/95 backdrop-blur-sm border border-slate-200 rounded-lg px-3 py-2 shadow-md text-[11px] font-semibold text-slate-500 hover:text-[#0284c7] transition-colors flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Reset Peta
                </button>
              )}

              {/* Regional mode overlay label — center-bottom of map */}
              {viewMode === "regional" && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-[#0b1b3d]/90 backdrop-blur-sm text-white rounded-full px-4 py-1.5 text-[10px] font-bold tracking-widest uppercase shadow-lg border border-[#0284c7]/30 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse shrink-0" />
                  Wilayah Kerja — Regional Sumatera
                </div>
              )}
            </div>

            {/* ─── Right: Sidebar (35%) — dark navy ─── */}
            <div className="lg:w-[35%] flex flex-col bg-[#0b1b3d] border-t lg:border-t-0 lg:border-l border-[#1e3a6e]">

              {/* ── SIDEBAR HEADER — changes per mode ── */}
              <div className="px-5 pt-4 pb-3 border-b border-[#1e3a6e] shrink-0">
                {viewMode === "regional" ? (
                  <>
                    <p className="text-[9px] font-bold tracking-[0.22em] text-[#38bdf8] uppercase mb-1">
                      Wilayah Kerja
                    </p>
                    <p className="text-sm font-extrabold text-white leading-tight">
                      Regional Sumatera Bagian Utara &amp; Tengah
                    </p>
                  </>
                ) : viewMode === "province" && selected ? (
                  <>
                    <p className="text-[9px] font-bold tracking-[0.22em] text-[#38bdf8] uppercase mb-1">
                      Provinsi Terpilih
                    </p>
                    <p className="text-sm font-extrabold text-white leading-tight">{selected.provinsi}</p>
                  </>
                ) : (
                  <>
                    <p className="text-[9px] font-bold tracking-[0.22em] text-[#38bdf8] uppercase mb-1">
                      Pilih Wilayah Kerja
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium">
                      Klik provinsi atau marker peta untuk detail
                    </p>
                  </>
                )}
              </div>

              {/* ── DETAIL PANEL ── */}

              {/* Regional summary panel */}
              {viewMode === "regional" && (
                <div className="px-5 py-4 border-b border-[#1e3a6e] shrink-0 bg-[#0f2147]">
                  {/* Summary stats */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[
                      { label: "Provinsi", value: "8" },
                      { label: "Pulau Utama", value: "3" },
                      { label: "Wilayah", value: "1" },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-[#0284c7]/10 border border-[#0284c7]/20 rounded-lg px-2 py-2 text-center">
                        <p className="text-lg font-extrabold text-white leading-none">{stat.value}</p>
                        <p className="text-[9px] text-slate-400 mt-0.5 font-medium">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-400 leading-relaxed mb-3">
                    BBLSDM Komdigi Medan mengelola pengembangan SDM digital di{" "}
                    <span className="text-white font-semibold">8 provinsi</span> wilayah Sumatera, meliputi seluruh pulau Sumatera, Kepulauan Riau, dan Bangka Belitung.
                  </p>
                  {/* "Lihat per Provinsi" hint */}
                  <p className="text-[10px] text-[#38bdf8] font-semibold flex items-center gap-1.5">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Klik provinsi di daftar bawah untuk detail
                  </p>
                </div>
              )}

              {/* Province detail panel */}
              {viewMode === "province" && selected && (
                <div className="px-5 py-4 border-b border-[#1e3a6e] shrink-0 bg-[#0f2147]">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-400 mt-0.5">{selected.kota}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#0284c7] flex items-center justify-center shrink-0">
                      <IconMapPin className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                  <div className="space-y-2.5 mb-4">
                    <div className="flex items-start gap-2.5">
                      <span className="text-[#38bdf8] mt-0.5"><IconMapPin className="w-3.5 h-3.5" /></span>
                      <p className="text-[11px] text-slate-300 leading-relaxed">{selected.alamat}</p>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-[#38bdf8]"><IconPhone /></span>
                      <p className="text-[11px] text-slate-300">{selected.telepon}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <a
                      href={selected.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2 bg-[#0284c7] hover:bg-[#0369a1] text-white text-[11px] font-bold rounded-lg transition-colors duration-200"
                    >
                      <IconGlobe />
                      Kunjungi Website Resmi
                    </a>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${selected.lat},${selected.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2 bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold rounded-lg transition-colors duration-200 border border-white/10"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      Buka di Google Maps
                    </a>
                  </div>
                </div>
              )}

              {/* Default empty state — with "Lihat Regional" CTA */}
              {viewMode === "default" && (
                <div className="px-5 py-5 border-b border-[#1e3a6e] shrink-0 bg-[#0f2147]/40">
                  {/* Regional CTA card — the primary trigger */}
                  <button
                    onClick={handleRegionalView}
                    className="w-full flex items-center gap-3 bg-gradient-to-r from-[#0284c7]/20 to-[#0ea5e9]/10 hover:from-[#0284c7]/30 hover:to-[#0ea5e9]/20 border border-[#0284c7]/30 hover:border-[#0284c7]/60 rounded-xl px-4 py-3.5 text-left transition-all duration-200 group mb-3"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#0284c7]/20 group-hover:bg-[#0284c7]/30 flex items-center justify-center shrink-0 transition-colors">
                      <IconLayer />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-white group-hover:text-[#38bdf8] transition-colors leading-tight">
                        Tampilkan Regional Sumatera
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        8 provinsi wilayah kerja sekaligus
                      </p>
                    </div>
                    <svg className="w-4 h-4 text-slate-600 group-hover:text-[#38bdf8] transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <p className="text-[10px] text-slate-500 text-center">
                    — atau pilih provinsi dari daftar di bawah —
                  </p>
                </div>
              )}

              {/* ── PROVINCE LIST ── */}
              <div
                className="flex-1 overflow-y-auto divide-y divide-[#1e3a6e]"
                style={{ maxHeight: viewMode === "default" ? "320px" : "260px" }}
              >
                {/* List header */}
                <div className="px-5 py-2.5 sticky top-0 bg-[#0b1b3d] border-b border-[#1e3a6e] z-10">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                    Semua Wilayah Kerja — {wilayahList.length} Provinsi
                  </p>
                </div>

                {wilayahList.map((w) => {
                  // All are "active" in regional mode; only selected is active in province mode
                  const isActive =
                    viewMode === "regional" ||
                    (viewMode === "province" && selected?.provinsi === w.provinsi);

                  return (
                    <button
                      key={w.provinsi}
                      onClick={() => handleSelectProvince(w)}
                      className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-all duration-150 ${
                        isActive
                          ? "bg-[#0284c7]/15 border-l-2 border-[#0284c7]"
                          : "hover:bg-white/5 border-l-2 border-transparent"
                      }`}
                    >
                      {/* Dot */}
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 transition-colors duration-150 ${
                          isActive ? "bg-[#38bdf8]" : "bg-slate-600"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-semibold leading-tight truncate transition-colors ${
                          isActive ? "text-white" : "text-slate-300"
                        }`}>
                          {w.provinsi}
                        </p>
                        <p className={`text-[10px] mt-0.5 transition-colors ${
                          isActive ? "text-slate-400" : "text-slate-600"
                        }`}>
                          {w.kota}
                        </p>
                      </div>
                      <span className={`transition-colors duration-150 ${
                        isActive ? "text-[#38bdf8]" : "text-slate-600"
                      }`}>
                        <IconChevronRight />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom note */}
          <div className="flex items-center gap-3 mt-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7] shrink-0" />
            <p className="text-xs text-slate-400">
              Data wilayah kerja berdasarkan Keputusan Menteri Komunikasi dan Digital tentang Penetapan Wilayah Kerja BBLSDM. Peta menggunakan OpenStreetMap.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}