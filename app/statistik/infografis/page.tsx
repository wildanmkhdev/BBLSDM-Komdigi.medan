"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

interface InfographicItem {
  id: string;
  title: string;
  category: string;
  date: string;
  dimensions: string;
  description: string;
  gradient: string;
  highlights: string[];
}

export default function InfografisPage() {
  const infographics: InfographicItem[] = [
    {
      id: "info-1",
      title: "Peta Jalan Talenta Digital Sumatera 2025",
      category: "Infografis Kinerja",
      date: "15 Januari 2025",
      dimensions: "1080 x 1350 px",
      description: "Visualisasi 4 pilar utama pengembangan kecakapan digital masyarakat, aparatur, dan pelaku UMKM regional.",
      gradient: "from-blue-900 via-sky-900 to-indigo-950",
      highlights: ["4.820 Alumni DTS", "5 Provinsi Sasaran", "42 Kabupaten/Kota"],
    },
    {
      id: "info-2",
      title: "Panduan Literasi Keamanan Siber & Etika AI",
      category: "Edukasi Publik",
      date: "10 Desember 2024",
      dimensions: "1080 x 1920 px",
      description: "Infografis panduan praktis melindungi data pribadi dari serangan phishing dan pemanfaatan Etika Kecerdasan Buatan.",
      gradient: "from-sky-900 via-blue-950 to-slate-900",
      highlights: ["Tips Keamanan Sederhana", "Protokol Password 2FA", "Etika AI"],
    },
    {
      id: "info-3",
      title: "Indeks Penetrasi Internet & Riset TIK Daerah 2024",
      category: "Hasil Riset",
      date: "28 November 2024",
      dimensions: "1200 x 630 px",
      description: "Rangkuman visual indikator kepemilikan gadget, akses jaringan seluler 4G/5G, dan tingkat literasi digital.",
      gradient: "from-indigo-950 via-blue-900 to-cyan-950",
      highlights: ["Data 5 Provinsi", "Indeks Kesiapan TIK", "Komposisi Demografi"],
    },
    {
      id: "info-4",
      title: "Alur Pengajuan Sertifikasi Profesi BNSP di BBLSDM",
      category: "Panduan Layanan",
      date: "05 Oktober 2024",
      dimensions: "1080 x 1080 px",
      description: "Tahapan pendaftaran diklat, uji kompetensi asesor, hingga pencetakan sertifikat profesi nasional resmi.",
      gradient: "from-blue-950 via-slate-900 to-[#0b1b3d]",
      highlights: ["3 Langkah Mudah", "Sistem Gratis", "Berstandar BNSP"],
    },
  ];

  const [selectedInfographic, setSelectedInfographic] = useState<InfographicItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");

  const categories = ["Semua", "Infografis Kinerja", "Edukasi Publik", "Hasil Riset", "Panduan Layanan"];

  const filteredInfographics = selectedCategory === "Semua"
    ? infographics
    : infographics.filter((i) => i.category === selectedCategory);

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Navbar />

      <main className="flex-grow bg-white">
        {/* Header Section */}
        <section className="bg-slate-50 border-b border-slate-100 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold tracking-widest bg-[#0284c7]/10 text-[#0284c7] uppercase">
              Galeri Visual
            </div>
            <h1 className="text-3xl font-extrabold text-[#0b1b3d] sm:text-4xl">
              Infografis Data & Layanan
            </h1>
            <p className="text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Kumpulan poster dan ringkasan visual mengenai statistik kinerja, edukasi publik, alur layanan, serta hasil riset BBLSDM Komdigi Medan.
            </p>
            <div className="w-12 h-1 bg-[#0284c7] mx-auto rounded-full mt-4"></div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-6 bg-white border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <span className="text-xs font-bold text-slate-500 mr-2 uppercase tracking-wider shrink-0">
                Kategori:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? "bg-[#0b1b3d] text-white shadow-sm"
                      : "bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Infographics Grid */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredInfographics.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all relative"
                >
                  {/* Left Accent Bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#38bdf8] z-10"></div>

                  {/* Graphic Poster Header Mockup */}
                  <div
                    className={`h-56 bg-gradient-to-br ${item.gradient} p-6 flex flex-col justify-between text-white relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,#fff_1px,transparent_1px)] bg-[size:16px_16px]"></div>
                    
                    <div className="flex items-center justify-between z-10">
                      <span className="text-[9px] font-extrabold uppercase tracking-wider bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10">
                        {item.category}
                      </span>
                      <span className="text-[10px] opacity-75">{item.date}</span>
                    </div>

                    <div className="z-10 space-y-2">
                      <h3 className="text-sm font-extrabold leading-snug line-clamp-2">
                        {item.title}
                      </h3>
                      <div className="flex flex-wrap gap-1">
                        {item.highlights.map((h, i) => (
                          <span
                            key={i}
                            className="text-[9px] font-medium bg-white/20 px-1.5 py-0.5 rounded backdrop-blur-sm"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Info & Action Body */}
                  <div className="p-5 space-y-4 flex-grow flex flex-col justify-between">
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => setSelectedInfographic(item)}
                        className="text-xs font-bold text-[#0284c7] hover:underline"
                      >
                        Pratinjau Infografis
                      </button>

                      <button
                        onClick={() => alert(`Mengunduh Infografis: ${item.title}`)}
                        className="p-1.5 rounded-lg bg-sky-50 text-[#0284c7] hover:bg-[#0284c7] hover:text-white transition-colors"
                        title="Unduh Infografis HD"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modal Preview Component */}
        {selectedInfographic && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-6 relative overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#0284c7]"></div>

              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0284c7] bg-sky-50 px-2 py-0.5 rounded">
                    {selectedInfographic.category}
                  </span>
                  <h3 className="text-lg font-extrabold text-[#0b1b3d] mt-1">
                    {selectedInfographic.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedInfographic(null)}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  ✕
                </button>
              </div>

              {/* Poster Representation */}
              <div
                className={`h-64 rounded-xl bg-gradient-to-br ${selectedInfographic.gradient} text-white p-6 flex flex-col justify-between relative overflow-hidden shadow-inner`}
              >
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_center,#fff_1px,transparent_1px)] bg-[size:12px_12px]"></div>
                <span className="text-xs font-bold text-yellow-400">
                  HD Resolution • {selectedInfographic.dimensions}
                </span>
                <div className="space-y-2 z-10">
                  <h4 className="text-base font-black">
                    {selectedInfographic.title}
                  </h4>
                  <p className="text-xs opacity-90 leading-relaxed">
                    {selectedInfographic.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
                <span>Diterbitkan: {selectedInfographic.date}</span>
                <button
                  onClick={() => {
                    alert(`Mengunduh: ${selectedInfographic.title}`);
                    setSelectedInfographic(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-[#0284c7] text-white font-bold hover:bg-[#0284c7]/90 transition-colors shadow"
                >
                  Unduh Gambar HD
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
