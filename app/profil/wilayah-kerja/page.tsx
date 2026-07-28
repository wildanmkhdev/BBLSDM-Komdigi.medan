"use client";

import dynamic from "next/dynamic";
import { useState, useMemo } from "react";
import PageHeader from "@/app/components/PageHeader";
import type { WilayahData } from "@/app/components/WilayahMap";

/* ─── Data provinsi lengkap + koordinat ─── */
const wilayahList: WilayahData[] = [
  {
    provinsi: "Sumatera Utara",
    kota: "Medan",
    alamat: "Jl. Letjend. Djamin Ginting No. 1, Medan 20155",
    telepon: "(061) 821-0900 / 8221-0000",
    website: "https://sumut.kominfo.go.id",
    lat: 3.5896,
    lng: 98.6739,
  },
  {
    provinsi: "Aceh",
    kota: "Banda Aceh",
    alamat: "Jl. T. Nyak Arief No. 45, Banda Aceh 23114",
    telepon: "(0651) 635-000",
    website: "https://diskominfo.acehprov.go.id",
    lat: 5.5477,
    lng: 95.3231,
  },
  {
    provinsi: "Sumatera Barat",
    kota: "Padang",
    alamat: "Jl. Jendral. Sudirman No. 51, Padang 25171",
    telepon: "(0751) 700-000",
    website: "https://kominfo.sumbarprov.go.id",
    lat: -0.9492,
    lng: 100.3543,
  },
  {
    provinsi: "Riau",
    kota: "Pekanbaru",
    alamat: "Jl. Gajah Mada No. 200, Pekanbaru 28116",
    telepon: "(0761) 336-000",
    website: "https://diskominfo.riau.go.id",
    lat: 0.5335,
    lng: 101.4503,
  },
  {
    provinsi: "Kepulauan Riau",
    kota: "Tanjung Pinang",
    alamat: "Jl. D.I. Panjaitan No. 13, Tanjung Pinang 29124",
    telepon: "(0771) 318-000",
    website: "https://diskominfo.kepriprov.go.id",
    lat: 0.9190,
    lng: 104.4527,
  },
  {
    provinsi: "Jambi",
    kota: "Jambi",
    alamat: "Jl. A. Yani No. 1, Jambi 36122",
    telepon: "(0741) 668-000",
    website: "https://diskominfo.jambiprov.go.id",
    lat: -1.6101,
    lng: 103.6131,
  },
  {
    provinsi: "Sumatera Selatan",
    kota: "Palembang",
    alamat: "Jl. Kapten A. Rivai No. 7, Palembang 30129",
    telepon: "(0711) 350-000",
    website: "https://diskominfo.sumselprov.go.id",
    lat: -2.9761,
    lng: 104.7754,
  },
  {
    provinsi: "Bengkulu",
    kota: "Bengkulu",
    alamat: "Jl. Pembangunan No. 16, Bengkulu 38225",
    telepon: "(0736) 346-000",
    website: "https://diskominfo.bengkuluprov.go.id",
    lat: -3.8004,
    lng: 102.2655,
  },
  {
    provinsi: "Lampung",
    kota: "Bandar Lampung",
    alamat: "Jl. Wolter Monginsidi No. 69, Bandar Lampung 35215",
    telepon: "(0721) 481-000",
    website: "https://diskominfo.lampungprov.go.id",
    lat: -5.3971,
    lng: 105.2668,
  },
  {
    provinsi: "Bangka Belitung",
    kota: "Pangkal Pinang",
    alamat: "Jl. Merdeka No. 5, Pangkal Pinang 33149",
    telepon: "(0717) 423-000",
    website: "https://diskominfo.babelprov.go.id",
    lat: -2.1337,
    lng: 106.1167,
  },
];

/* ─── Icons ─── */
function IconMapPin() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}
function IconPhone() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
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

export default function WilayahKerjaPage() {
  const [selected, setSelected] = useState<WilayahData>(wilayahList[0]);

  /* Dynamic import — disable SSR for Leaflet */
  const Map = useMemo(
    () =>
      dynamic(() => import("@/app/components/WilayahMap"), {
        ssr: false,
        loading: () => (
          <div className="w-full h-full min-h-[420px] bg-slate-100 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-[#0284c7] border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-slate-500">Memuat peta…</p>
            </div>
          </div>
        ),
      }),
    []
  );

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
        className="pt-28 pb-[76px] sm:pt-32 sm:pb-[92px]"
      />

      <section className="bg-white py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-0 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">

            {/* Left: Map (60%) */}
            <div className="relative lg:w-[60%] h-[380px] lg:h-[580px]">
              <Map
                wilayahList={wilayahList}
                selected={selected}
                onSelect={setSelected}
              />
              {/* Map overlay badge */}
              <div className="absolute top-3 left-3 z-[1000] bg-white/90 backdrop-blur-sm border border-slate-200 rounded-lg px-3 py-2 shadow-sm">
                <p className="text-[10px] font-bold text-[#0284c7] uppercase tracking-widest">Peta Interaktif</p>
                <p className="text-xs text-slate-500">Klik markeeer untuk detail</p>
              </div>
            </div>

            {/* Right: Sidebar (40%) */}
            <div className="lg:w-[40%] flex flex-col border-t lg:border-t-0 lg:border-l border-slate-200">

              {/* Selected detail panel */}
              {selected && (
                <div className="p-6 bg-[#0b1b3d] text-white flex-shrink-0">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div>
                      <p className="text-[10px] font-bold tracking-[0.2em] text-[#38bdf8] uppercase mb-1">
                        Provinsi Terpilih
                      </p>
                      <h2 className="text-xl font-extrabold text-white leading-snug">{selected.provinsi}</h2>
                      <p className="text-sm text-slate-300 mt-0.5">{selected.kota}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#0284c7] flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                  </div>

                  {/* Info rows */}
                  <div className="space-y-3 mb-5">
                    <div className="flex items-start gap-3">
                      <span className="text-[#38bdf8] mt-0.5"><IconMapPin /></span>
                      <p className="text-xs text-slate-300 leading-relaxed">{selected.alamat}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[#38bdf8]"><IconPhone /></span>
                      <p className="text-xs text-slate-300">{selected.telepon}</p>
                    </div>
                  </div>

                  {/* CTA button */}
                  <a
                    href={selected.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold rounded-lg transition-colors duration-200"
                  >
                    <IconGlobe />
                    Kunjungi Website Resmi
                  </a>
                </div>
              )}

              {/* Province list */}
              <div className="flex-1 overflow-y-auto divide-y divide-slate-100 max-h-[350px]">
                <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Semua Wilayah Kerja — {wilayahList.length} Provinsi
                  </p>
                </div>
                {wilayahList.map((w) => {
                  const isActive = selected?.provinsi === w.provinsi;
                  return (
                    <button
                      key={w.provinsi}
                      onClick={() => setSelected(w)}
                      className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors duration-150 ${
                        isActive
                          ? "bg-[#0284c7]/8 border-l-2 border-[#0284c7]"
                          : "hover:bg-slate-50 border-l-2 border-transparent"
                      }`}
                    >
                      {/* Dot */}
                      <span
                        className={`w-2 h-2 rounded-full flex-shrink-0 transition-colors duration-150 ${isActive ? "bg-[#0284c7]" : "bg-slate-200"
                          }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-bold leading-tight truncate ${isActive ? "text-[#0284c7]" : "text-[#0b1b3d]"}`}>
                          {w.provinsi}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{w.kota}</p>
                      </div>
                      <span className={`transition-colors duration-150 ${isActive ? "text-[#0284c7]" : "text-slate-300"}`}>
                        <IconChevronRight />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom note */}
          <div className="flex items-center gap-3 mt-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7] flex-shrink-0" />
            <p className="text-xs text-slate-400">
              Data wilayah kerja berdasarkan Keputusan Menteri Komunikasi dan Digital tentang Penetapan Wilayah Kerja BBLSDM. Peta menggunakan OpenStreetMap.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
