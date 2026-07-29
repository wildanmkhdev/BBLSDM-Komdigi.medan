"use client";

import dynamic from "next/dynamic";
import { useState, useMemo } from "react";
import PageHeader from "@/app/components/PageHeader";
import type { WilayahData } from "@/app/components/WilayahMap";
import {
  Search,
  X,
  Filter,
  Globe2,
  Map as MapIcon,
  Sparkles,
} from "lucide-react";

/* ─── Data provinsi lengkap + koordinat & zone ─── */
interface WilayahDataWithZone extends WilayahData {
  zone: "Sumut" | "Sumsel" | "Kepulauan";
}

const wilayahList: WilayahDataWithZone[] = [
  {
    provinsi: "Sumatera Utara",
    kota: "Medan",
    alamat: "Jl. Ngalengko No.1, Perintis, Kec. Medan Tim., Kota Medan, Sumatera Utara 20236",
    telepon: "(6261) 4525438",
    website: "https://bpsdm.sumutprov.go.id/",
    lat: 3.6009495823832425,
    lng: 98.68844747553271,
    zone: "Sumut",
  },
  {
    provinsi: "Aceh",
    kota: "Banda Aceh",
    alamat: "Jl.T.Panglima Nyak Makam No 8 Lampineng, Kota Banda Aceh",
    telepon: "(0651) 7552564",
    website: "https://bpsdm.acehprov.go.id/",
    lat: 5.565880257598649,
    lng: 95.34320790954617,
    zone: "Sumut",
  },
  {
    provinsi: "Sumatera Barat",
    kota: "Padang",
    alamat: "Jl. Raya Indarung Km.12, Padang Besi, Kota Padang",
    telepon: "(0751) 700-000",
    website: "https://bpsdm.sumbarprov.go.id/",
    lat: -0.9523763757062634,
    lng: 100.4746055607255,
    zone: "Sumut",
  },
  {
    provinsi: "Riau",
    kota: "Pekanbaru",
    alamat: "Jl. Ronggowarsito No. 14 Kota Pekanbaru Provinsi Riau",
    telepon: "(0761) 28997",
    website: "https://bpsdm.riau.go.id/bpsdm/",
    lat: 0.5132641380276376,
    lng: 101.4548773206545,
    zone: "Sumut",
  },
  {
    provinsi: "Kepulauan Riau",
    kota: "Tanjung Pinang",
    alamat: "Pusat Pemerintahan Provinsi Kepulauan Riau, Gedung Sultan Mahmud Riayat Syah (Gedung D Lantai 1) Dompak, Bukit Bestari, Kota Tanjung Pinang, Provinsi Kepulauan Riau",
    telepon: "(0771) 318-000",
    website: "https://bpsdm.kepriprov.go.id/",
    lat: 0.8779441030781603,
    lng: 104.445111,
    zone: "Kepulauan",
  },
  {
    provinsi: "Jambi",
    kota: "Jambi",
    alamat: "Jl. H. Agus Salim, Paal Lima, Kec. Kota Baru, Kota Jambi, Jambi 36129",
    telepon: "(0741) 668-000",
    website: "https://bpsdm.jambiprov.go.id/",
    lat: -1.6325329066632042,
    lng: 103.61102988203443,
    zone: "Sumsel",
  },
  {
    provinsi: "Sumatera Selatan",
    kota: "Palembang",
    alamat: "Jl. Kapten A. Rivai No. 7, Palembang 30129",
    telepon: "(0711) 350-000",
    website: "https://diskominfo.sumselprov.go.id",
    lat: -2.9761,
    lng: 104.7754,
    zone: "Sumsel",
  },
  {
    provinsi: "Bengkulu",
    kota: "Bengkulu",
    alamat: "Jl. Pembangunan No. 16, Bengkulu 38225",
    telepon: "(0736) 346-000",
    website: "https://diskominfo.bengkuluprov.go.id",
    lat: -3.8004,
    lng: 102.2655,
    zone: "Sumsel",
  },
  {
    provinsi: "Lampung",
    kota: "Bandar Lampung",
    alamat: "Jl. Wolter Monginsidi No. 69, Bandar Lampung 35215",
    telepon: "(0721) 481-000",
    website: "https://diskominfo.lampungprov.go.id",
    lat: -5.3971,
    lng: 105.2668,
    zone: "Sumsel",
  },
  {
    provinsi: "Bangka Belitung",
    kota: "Pangkal Pinang",
    alamat: "Jl. Pulau Bangka, Air Itam - Pangkalpinang 33148",
    telepon: "(0717) 439-426",
    website: "https://bkpsdmd.babelprov.go.id/",
    lat: -2.1615079465906897,
    lng: 106.16814326298616,
    zone: "Kepulauan",
  },
  {
    provinsi: "Kalimantan Barat",
    kota: "Pontianak",
    alamat: "Jl. Moh. Sohor, Akcaya, Kec. Pontianak Sel., Kota Pontianak, Kalimantan Barat 78121",
    telepon: "(0561) 732-078",
    website: "https://bpsdm.kalbarprov.go.id/",
    lat: -0.042695250302419545,
    lng: 109.33099193970436,
    zone: "Kepulauan",
  },
];

const zoneFilters = [
  { id: "all", label: "Semua Wilayah" },
  { id: "Sumut", label: "Sumatera Bagian Utara" },
  { id: "Sumsel", label: "Sumatera Bagian Selatan" },
  { id: "Kepulauan", label: "Kepulauan" },
];

export default function WilayahKerjaPage() {
  const [selected, setSelected] = useState<WilayahDataWithZone>(wilayahList[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeZone, setActiveZone] = useState("all");
  const [viewMode, setViewMode] = useState<"3d" | "2d">("3d");

  /* Dynamic import for 3D Globe */
  const Globe3DComponent = useMemo(
    () =>
      dynamic(() => import("@/app/components/Globe3D"), {
        ssr: false,
        loading: () => (
          <div className="w-full h-full min-h-[580px] lg:min-h-[720px] bg-[#070e20] flex items-center justify-center rounded-3xl border border-[#38bdf8]/30">
            <div className="flex flex-col items-center gap-3 text-white">
              <div className="w-8 h-8 border-2 border-[#38bdf8] border-t-transparent rounded-full animate-spin" />
              <p className="text-xs text-slate-300 font-medium">Memuat WebGL 3D Globe Interaktif…</p>
            </div>
          </div>
        ),
      }),
    []
  );

  /* Dynamic import for 2D Leaflet Map */
  const Map2DComponent = useMemo(
    () =>
      dynamic(() => import("@/app/components/WilayahMap"), {
        ssr: false,
        loading: () => (
          <div className="w-full h-full min-h-[580px] lg:min-h-[720px] bg-slate-100 flex items-center justify-center rounded-3xl border border-slate-200">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-[#0284c7] border-t-transparent rounded-full animate-spin" />
              <p className="text-xs text-slate-500 font-medium">Memuat Peta 2D…</p>
            </div>
          </div>
        ),
      }),
    []
  );

  /* Filtered list based on search and zone */
  const filteredWilayah = useMemo(() => {
    return wilayahList.filter((w) => {
      const matchesSearch =
        w.provinsi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.kota.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.alamat.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesZone = activeZone === "all" || w.zone === activeZone;
      return matchesSearch && matchesZone;
    });
  }, [searchQuery, activeZone]);

  return (
    <>
      <PageHeader
        title="Wilayah Kerja"
        subtitle="Direktori kantor BBLSDM Komdigi di setiap provinsi wilayah kerja beserta informasi kontak pada Web3 3D Globe interaktif"
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Profil", href: "#" },
          { label: "Wilayah Kerja" },
        ]}
        className="pt-28 pb-[76px] sm:pt-32 sm:pb-[92px]"
      />

      <section className="bg-slate-950 py-10 text-white min-h-screen">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          
          {/* Header Controls: Search, View Switcher & Region Filter Chips */}
          <div className="bg-[#0b1b3d]/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 mb-6 border border-[#38bdf8]/20 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* View Mode Switcher */}
            <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10 shrink-0">
              <button
                onClick={() => setViewMode("3d")}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
                  viewMode === "3d"
                    ? "bg-[#0284c7] text-white shadow-lg shadow-[#0284c7]/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Globe2 className="w-3.5 h-3.5" />
                <span>🌐 Web3 3D Globe</span>
              </button>
              <button
                onClick={() => setViewMode("2d")}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
                  viewMode === "2d"
                    ? "bg-[#0284c7] text-white shadow-lg shadow-[#0284c7]/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span>🗺️ Peta 2D</span>
              </button>
            </div>

            {/* Live Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari provinsi, kota, atau alamat..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2 bg-white/5 hover:bg-white/10 focus:bg-black/60 text-xs text-white rounded-xl border border-white/10 focus:border-[#38bdf8] focus:ring-2 focus:ring-[#38bdf8]/20 outline-none transition-all duration-200 placeholder:text-slate-500 font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5 rounded-full"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Filter Zone Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              <Filter className="w-3.5 h-3.5 text-slate-400 mr-1 shrink-0" />
              {zoneFilters.map((chip) => {
                const isActive = activeZone === chip.id;
                return (
                  <button
                    key={chip.id}
                    onClick={() => setActiveZone(chip.id)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-200 shrink-0 ${
                      isActive
                        ? "bg-[#38bdf8] text-slate-950 font-bold shadow-md"
                        : "bg-white/5 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    {chip.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Large Hero 3D WebGL Globe Container */}
          <div className="relative w-full h-[580px] lg:h-[720px] rounded-3xl overflow-hidden shadow-2xl">
            {viewMode === "3d" ? (
              <Globe3DComponent
                wilayahList={filteredWilayah}
                selected={selected}
                onSelect={(w) => setSelected(w as WilayahDataWithZone)}
              />
            ) : (
              <Map2DComponent
                wilayahList={filteredWilayah}
                selected={selected}
                onSelect={(w) => setSelected(w as WilayahDataWithZone)}
              />
            )}
          </div>

          {/* Horizontal Quick Province Selector Bar */}
          <div className="mt-6 bg-[#0b1b3d]/90 backdrop-blur-md rounded-2xl p-4 border border-[#38bdf8]/20 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>PILIH PROVINSI LOKASI KANTOR ({filteredWilayah.length})</span>
              </p>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {filteredWilayah.map((w) => {
                const isActive = selected?.provinsi === w.provinsi;
                return (
                  <button
                    key={w.provinsi}
                    onClick={() => setSelected(w)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 shrink-0 border ${
                      isActive
                        ? "bg-[#0284c7] text-white border-[#38bdf8] shadow-lg shadow-[#0284c7]/40"
                        : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isActive ? "bg-[#38bdf8] shadow-[0_0_8px_#38bdf8]" : "bg-slate-500"
                      }`}
                    />
                    <span>{w.provinsi}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Note */}
          <div className="flex items-center gap-2.5 mt-6 px-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] shrink-0 animate-ping" />
            <p className="text-xs text-slate-400 font-mono">
              Data wilayah kerja BBLSDM Komdigi • Powered by WebGL 3D Globe (cobe) & OpenStreetMap.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
