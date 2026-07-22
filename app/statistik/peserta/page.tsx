"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface PesertaData {
  totalTrained: number;
  passingRate: number;
  certRate: number;
  satisfaction: number;
  themes: { name: string; count: number }[];
  occupations: { name: string; percentage: number; color: string }[];
}

const dataByYear: Record<string, PesertaData> = {
  "2025": {
    totalTrained: 5420,
    passingRate: 95.2,
    certRate: 88.5,
    satisfaction: 91.2,
    themes: [
      { name: "Digital Marketing & E-Commerce", count: 1850 },
      { name: "Programming & Web Development", count: 1240 },
      { name: "Cybersecurity & Networking", count: 980 },
      { name: "Data Analytics & AI", count: 750 },
      { name: "Office Productivity", count: 600 }
    ],
    occupations: [
      { name: "Mahasiswa / Pelajar", percentage: 40, color: "#0284c7" },
      { name: "Pekerja Swasta", percentage: 30, color: "#0b1b3d" },
      { name: "Wirausaha / UMKM", percentage: 18, color: "#8b5cf6" },
      { name: "PNS / ASN", percentage: 12, color: "#f59e0b" }
    ]
  },
  "2024": {
    totalTrained: 4610,
    passingRate: 94.6,
    certRate: 87.1,
    satisfaction: 89.8,
    themes: [
      { name: "Digital Marketing & E-Commerce", count: 1620 },
      { name: "Programming & Web Development", count: 1080 },
      { name: "Cybersecurity & Networking", count: 810 },
      { name: "Data Analytics & AI", count: 620 },
      { name: "Office Productivity", count: 480 }
    ],
    occupations: [
      { name: "Mahasiswa / Pelajar", percentage: 42, color: "#0284c7" },
      { name: "Pekerja Swasta", percentage: 28, color: "#0b1b3d" },
      { name: "Wirausaha / UMKM", percentage: 20, color: "#8b5cf6" },
      { name: "PNS / ASN", percentage: 10, color: "#f59e0b" }
    ]
  },
  "2023": {
    totalTrained: 3840,
    passingRate: 93.8,
    certRate: 85.4,
    satisfaction: 88.5,
    themes: [
      { name: "Digital Marketing & E-Commerce", count: 1350 },
      { name: "Programming & Web Development", count: 910 },
      { name: "Cybersecurity & Networking", count: 680 },
      { name: "Data Analytics & AI", count: 500 },
      { name: "Office Productivity", count: 400 }
    ],
    occupations: [
      { name: "Mahasiswa / Pelajar", percentage: 45, color: "#0284c7" },
      { name: "Pekerja Swasta", percentage: 25, color: "#0b1b3d" },
      { name: "Wirausaha / UMKM", percentage: 22, color: "#8b5cf6" },
      { name: "PNS / ASN", percentage: 8, color: "#f59e0b" }
    ]
  }
};

// Growth data over the years (line chart)
const growthData = [
  { year: "2021", count: 1800 },
  { year: "2022", count: 2900 },
  { year: "2023", count: 3840 },
  { year: "2024", count: 4610 },
  { year: "2025", count: 5420 }
];

export default function StatistikPesertaPage() {
  const [selectedYear, setSelectedYear] = useState<string>("2025");
  const [hoveredThemeIdx, setHoveredThemeIdx] = useState<number | null>(null);
  const [hoveredOccIdx, setHoveredOccIdx] = useState<number | null>(null);
  const [hoveredGrowthIdx, setHoveredGrowthIdx] = useState<number | null>(null);

  const currentYearData = dataByYear[selectedYear] || dataByYear["2025"];

  // SVG Line Chart Constants (Growth)
  const growthChartWidth = 500;
  const growthChartHeight = 180;
  const growthPadding = 40;
  const maxGrowthCount = 6000;

  // Calculate points for the growth line
  const growthPoints = growthData.map((d, i) => {
    const x = growthPadding + (i * (growthChartWidth - 2 * growthPadding)) / (growthData.length - 1);
    const y = growthChartHeight - growthPadding - (d.count / maxGrowthCount) * (growthChartHeight - 2 * growthPadding);
    return { x, y, ...d };
  });

  const linePath = growthPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

  // Pie/Donut Chart variables
  let accumulatedAngle = 0;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow bg-white">
        {/* Header section (Pola app/profil) */}
        <section className="bg-slate-50 border-b border-slate-100 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold tracking-widest bg-sky-500/10 text-[#0284c7] uppercase">
              Statistik Peserta
            </div>
            <h1 className="text-3xl font-extrabold text-[#0b1b3d] sm:text-4xl">
              Statistik Peserta & Alumni Pelatihan
            </h1>
            <p className="text-sm text-slate-500 max-w-2xl mx-auto">
              Data statistik pertumbuhan jumlah peserta pelatihan digital nasional, kategori bidang pelatihan terfavorit, serta profil latar belakang demografis peserta.
            </p>
            <div className="w-12 h-1 bg-[#0284c7] mx-auto rounded-full mt-4"></div>
          </div>
        </section>

        {/* Main Content Area */}
        <section className="py-12 bg-slate-50/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
            {/* Year Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-800">Pilih Tahun Data:</span>
                <div className="inline-flex rounded-lg border border-slate-200 p-1 bg-slate-50">
                  {Object.keys(dataByYear).map((y) => (
                    <button
                      key={y}
                      onClick={() => setSelectedYear(y)}
                      className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all duration-300 ${
                        selectedYear === y
                          ? "bg-[#0b1b3d] text-white shadow-sm"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-xs text-slate-500 font-medium">
                Menampilkan data kompilasi pelatihan digital wilayah kerja Medan.
              </p>
            </div>

            {/* Dashboard KPI cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Card 1 */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-[#38bdf8] transition-all duration-300">
                <div className="absolute top-0 left-0 h-1 w-full bg-[#0284c7]" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Terlatih</span>
                <p className="text-2xl font-black text-[#0b1b3d] mt-1">
                  {currentYearData.totalTrained.toLocaleString("id-ID")}{" "}
                  <span className="text-xs font-semibold text-slate-500">Orang</span>
                </p>
                <span className="text-[10px] font-semibold text-emerald-600 mt-2 block">
                  Aktif + Alumni Terdaftar
                </span>
              </div>
              {/* Card 2 */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-[#38bdf8] transition-all duration-300">
                <div className="absolute top-0 left-0 h-1 w-full bg-[#0b1b3d]" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tingkat Kelulusan</span>
                <p className="text-2xl font-black text-[#0b1b3d] mt-1">
                  {currentYearData.passingRate}%
                </p>
                <span className="text-[10px] font-semibold text-emerald-600 mt-2 block">
                  Menyelesaikan Seluruh Sesi
                </span>
              </div>
              {/* Card 3 */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-[#38bdf8] transition-all duration-300">
                <div className="absolute top-0 left-0 h-1 w-full bg-purple-500" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tingkat Sertifikasi</span>
                <p className="text-2xl font-black text-[#0b1b3d] mt-1">
                  {currentYearData.certRate}%
                </p>
                <span className="text-[10px] font-semibold text-emerald-600 mt-2 block">
                  Lulus Uji Asesmen Kompetensi
                </span>
              </div>
              {/* Card 4 */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-[#38bdf8] transition-all duration-300">
                <div className="absolute top-0 left-0 h-1 w-full bg-amber-500" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Indeks Kepuasan</span>
                <p className="text-2xl font-black text-[#0b1b3d] mt-1">
                  {currentYearData.satisfaction}%
                </p>
                <span className="text-[10px] font-semibold text-emerald-600 mt-2 block">
                  Umpan Balik Positif
                </span>
              </div>
            </div>

            {/* Dynamic Visualization Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Horizontal Bar Chart: Training Themes */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h2 className="text-sm font-extrabold text-[#0b1b3d] mb-1">
                  Distribusi Bidang Pelatihan Terpopuler
                </h2>
                <p className="text-xs text-slate-500 mb-6">
                  Jumlah peserta yang mengikuti program per-kategori pelatihan utama.
                </p>

                <div className="space-y-4">
                  {currentYearData.themes.map((t, idx) => {
                    const maxCount = Math.max(...currentYearData.themes.map((item) => item.count));
                    const percentage = Math.round((t.count / maxCount) * 100);
                    const isHovered = hoveredThemeIdx === idx;

                    return (
                      <div
                        key={idx}
                        onMouseEnter={() => setHoveredThemeIdx(idx)}
                        onMouseLeave={() => setHoveredThemeIdx(null)}
                        className="space-y-1.5 transition-opacity duration-300 cursor-pointer"
                      >
                        <div className="flex justify-between text-xs font-bold text-slate-700">
                          <span className={isHovered ? "text-[#0284c7]" : ""}>{t.name}</span>
                          <span>{t.count.toLocaleString("id-ID")} Orang</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isHovered ? "bg-sky-400" : "bg-[#0284c7]"
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Donut Chart: Occupations */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <h2 className="text-sm font-extrabold text-[#0b1b3d] mb-1">
                    Latar Belakang Profil Pekerjaan Peserta
                  </h2>
                  <p className="text-xs text-slate-500 mb-4">
                    Proporsi kepesertaan berdasarkan latar belakang pekerjaan dan status sosial.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-around gap-6">
                  {/* Interactive Donut SVG */}
                  <div className="relative h-40 w-40 shrink-0">
                    <svg viewBox="0 0 100 100" className="h-full w-full transform -rotate-90">
                      {currentYearData.occupations.map((occ, idx) => {
                        const radius = 35;
                        const circumference = 2 * Math.PI * radius;
                        const strokeDasharray = `${(occ.percentage / 100) * circumference} ${circumference}`;
                        const strokeDashoffset = -accumulatedAngle;
                        accumulatedAngle += (occ.percentage / 100) * circumference;

                        const isHovered = hoveredOccIdx === idx;

                        return (
                          <circle
                            key={idx}
                            cx="50"
                            cy="50"
                            r={radius}
                            fill="transparent"
                            stroke={occ.color}
                            strokeWidth={isHovered ? "18" : "14"}
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={strokeDashoffset}
                            className="transition-all duration-300 cursor-pointer"
                            onMouseEnter={() => setHoveredOccIdx(idx)}
                            onMouseLeave={() => setHoveredOccIdx(null)}
                          />
                        );
                      })}
                    </svg>

                    {/* Inside circle summary */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-transparent pointer-events-none">
                      {hoveredOccIdx !== null ? (
                        <>
                          <span className="text-[10px] font-bold text-slate-400 uppercase">
                            {currentYearData.occupations[hoveredOccIdx].name.split(" ")[0]}
                          </span>
                          <span className="text-lg font-black text-[#0b1b3d]">
                            {currentYearData.occupations[hoveredOccIdx].percentage}%
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="text-[9px] font-bold text-slate-400 uppercase">Demografi</span>
                          <span className="text-xs font-black text-[#0b1b3d]">Peserta</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Legend with Interactive Hovers */}
                  <div className="space-y-2">
                    {currentYearData.occupations.map((occ, idx) => (
                      <div
                        key={idx}
                        onMouseEnter={() => setHoveredOccIdx(idx)}
                        onMouseLeave={() => setHoveredOccIdx(null)}
                        className={`flex items-center gap-2 px-2 py-1 rounded-lg cursor-pointer transition-all duration-300 ${
                          hoveredOccIdx === idx ? "bg-slate-50 scale-105" : ""
                        }`}
                      >
                        <span
                          className="h-3 w-3 rounded-full shrink-0"
                          style={{ backgroundColor: occ.color }}
                        />
                        <div className="text-xs">
                          <span className="font-semibold text-slate-700">
                            {occ.name}
                          </span>
                          <span className="font-bold text-slate-400 ml-1.5">{occ.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Growth Trend (Line Chart) */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div>
                <h2 className="text-sm font-extrabold text-[#0b1b3d] mb-1">
                  Tren Pertumbuhan Jumlah Alumni Pelatihan (2021 - 2025)
                </h2>
                <p className="text-xs text-slate-500 mb-6">
                  Grafik pertumbuhan kumulatif jumlah masyarakat terlatih per tahun.
                </p>
              </div>

              <div className="relative w-full overflow-x-auto select-none pt-4">
                <svg
                  viewBox={`0 0 ${growthChartWidth} ${growthChartHeight}`}
                  className="w-full h-auto min-w-[500px]"
                >
                  {/* Grid Lines */}
                  {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                    const val = Math.round(maxGrowthCount * ratio);
                    const y = growthChartHeight - growthPadding - ratio * (growthChartHeight - 2 * growthPadding);
                    return (
                      <g key={i} className="opacity-40">
                        <line
                          x1={growthPadding}
                          y1={y}
                          x2={growthChartWidth - growthPadding}
                          y2={y}
                          stroke="#e2e8f0"
                          strokeWidth="1"
                        />
                        <text
                          x={growthPadding - 10}
                          y={y + 4}
                          textAnchor="end"
                          className="text-[9px] font-semibold fill-slate-500"
                        >
                          {val}
                        </text>
                      </g>
                    );
                  })}

                  {/* Line path with gradient/accent color */}
                  <path
                    d={linePath}
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Area under the line path */}
                  <path
                    d={`${linePath} L ${growthPoints[growthPoints.length - 1].x} ${growthChartHeight - growthPadding} L ${growthPoints[0].x} ${growthChartHeight - growthPadding} Z`}
                    fill="url(#area-gradient)"
                    className="opacity-15"
                  />

                  {/* SVG Definitions */}
                  <defs>
                    <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0284c7" />
                      <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Hover nodes & Tooltips */}
                  {growthPoints.map((p, idx) => {
                    const isHovered = hoveredGrowthIdx === idx;
                    return (
                      <g key={idx}>
                        {/* Invisible larger hover zone circle */}
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r="16"
                          fill="transparent"
                          className="cursor-pointer"
                          onMouseEnter={() => setHoveredGrowthIdx(idx)}
                          onMouseLeave={() => setHoveredGrowthIdx(null)}
                        />

                        {/* Visible outer circle node */}
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r={isHovered ? "7" : "4.5"}
                          fill="#ffffff"
                          stroke="#0284c7"
                          strokeWidth="2.5"
                          className="transition-all duration-300 pointer-events-none"
                        />

                        {/* Year text on X-axis */}
                        <text
                          x={p.x}
                          y={growthChartHeight - growthPadding + 20}
                          textAnchor="middle"
                          className="text-[10px] font-bold fill-slate-600"
                        >
                          {p.year}
                        </text>

                        {/* Pop-up text on hover */}
                        {isHovered && (
                          <g className="pointer-events-none">
                            <rect
                              x={p.x - 45}
                              y={p.y - 36}
                              width="90"
                              height="26"
                              fill="#0b1b3d"
                              rx="4"
                            />
                            <text
                              x={p.x}
                              y={p.y - 19}
                              textAnchor="middle"
                              fill="#ffffff"
                              className="text-[9.5px] font-extrabold"
                            >
                              {p.count.toLocaleString("id-ID")} Orang
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

