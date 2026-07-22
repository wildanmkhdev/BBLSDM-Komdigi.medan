"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface KinerjaItem {
  name: string;
  target: number;
  realization: number;
  unit: string;
  desc: string;
}

const dataByYear: Record<string, KinerjaItem[]> = {
  "2025": [
    { name: "Indeks Kepuasan Masyarakat", target: 86, realization: 89.4, unit: "%", desc: "Tingkat kepuasan layanan publik terhadap program BBLSDM." },
    { name: "Peserta Sertifikasi Lulus", target: 2500, realization: 2780, unit: "Orang", desc: "Jumlah peserta yang berhasil lulus sertifikasi kompetensi SKKNI." },
    { name: "Realisasi Anggaran", target: 96, realization: 98.2, unit: "%", desc: "Persentase penyerapan anggaran belanja tahunan." },
    { name: "Kerja Sama Instansi", target: 12, realization: 16, unit: "Mitra", desc: "Kemitraan strategis dengan Pemda, industri, dan universitas." },
    { name: "Publikasi Hasil Riset", target: 8, realization: 10, unit: "Jurnal", desc: "Buku putih dan hasil riset yang dipublikasikan secara nasional." }
  ],
  "2024": [
    { name: "Indeks Kepuasan Masyarakat", target: 85, realization: 88.1, unit: "%", desc: "Tingkat kepuasan layanan publik terhadap program BBLSDM." },
    { name: "Peserta Sertifikasi Lulus", target: 2200, realization: 2410, unit: "Orang", desc: "Jumlah peserta yang berhasil lulus sertifikasi kompetensi SKKNI." },
    { name: "Realisasi Anggaran", target: 95, realization: 97.4, unit: "%", desc: "Persentase penyerapan anggaran belanja tahunan." },
    { name: "Kerja Sama Instansi", target: 10, realization: 14, unit: "Mitra", desc: "Kemitraan strategis dengan Pemda, industri, dan universitas." },
    { name: "Publikasi Hasil Riset", target: 6, realization: 8, unit: "Jurnal", desc: "Buku putih dan hasil riset yang dipublikasikan secara nasional." }
  ],
  "2023": [
    { name: "Indeks Kepuasan Masyarakat", target: 84, realization: 86.8, unit: "%", desc: "Tingkat kepuasan layanan publik terhadap program BBLSDM." },
    { name: "Peserta Sertifikasi Lulus", target: 2000, realization: 2150, unit: "Orang", desc: "Jumlah peserta yang berhasil lulus sertifikasi kompetensi SKKNI." },
    { name: "Realisasi Anggaran", target: 95, realization: 96.1, unit: "%", desc: "Persentase penyerapan anggaran belanja tahunan." },
    { name: "Kerja Sama Instansi", target: 8, realization: 11, unit: "Mitra", desc: "Kemitraan strategis dengan Pemda, industri, dan universitas." },
    { name: "Publikasi Hasil Riset", target: 5, realization: 7, unit: "Jurnal", desc: "Buku putih dan hasil riset yang dipublikasikan secara nasional." }
  ]
};

export default function StatistikKinerjaPage() {
  const [year, setYear] = useState<string>("2025");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const currentData = dataByYear[year] || [];

  // Chart configuration constants
  const chartHeight = 240;
  const barWidth = 32;
  const barGap = 40;
  const leftOffset = 60;
  const bottomOffset = 40;

  // Maximum value for scaling the chart
  const maxValue = Math.max(...currentData.map(d => Math.max(d.target, d.realization))) * 1.15;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow bg-white">
        {/* Header section (Pola app/profil) */}
        <section className="bg-slate-50 border-b border-slate-100 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold tracking-widest bg-sky-500/10 text-[#0284c7] uppercase">
              Statistik Kinerja
            </div>
            <h1 className="text-3xl font-extrabold text-[#0b1b3d] sm:text-4xl">
              Laporan Kinerja Instansi
            </h1>
            <p className="text-sm text-slate-500 max-w-2xl mx-auto">
              Visualisasi data pencapaian sasaran strategis, Indeks Kepuasan Masyarakat (IKM), penyerapan anggaran, dan target output pelaksanaan BBLSDM Komdigi Medan.
            </p>
            <div className="w-12 h-1 bg-[#0284c7] mx-auto rounded-full mt-4"></div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 bg-slate-50/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
            {/* Filter controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-800">Pilih Tahun Evaluasi:</span>
                <div className="inline-flex rounded-lg border border-slate-200 p-1 bg-slate-50">
                  {Object.keys(dataByYear).map((y) => (
                    <button
                      key={y}
                      onClick={() => setYear(y)}
                      className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all duration-300 ${
                        year === y
                          ? "bg-[#0b1b3d] text-white shadow-sm"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-sm bg-slate-300" />
                  <span>Target</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-sm bg-[#0284c7]" />
                  <span>Realisasi</span>
                </div>
              </div>
            </div>

            {/* Dynamic Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Chart Card (takes 2 cols on lg) */}
              <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <h2 className="text-base font-bold text-[#0b1b3d] mb-1">
                    Grafik Perbandingan Target vs Realisasi
                  </h2>
                  <p className="text-xs text-slate-500 mb-6">
                    Arahkan kursor pada batang grafik untuk melihat rincian capaian indikator.
                  </p>
                </div>

                {/* Custom Interactive SVG Chart */}
                <div className="relative w-full overflow-x-auto select-none pt-4">
                  <svg
                    viewBox={`0 0 ${leftOffset + currentData.length * (barWidth * 2 + barGap)} ${chartHeight + bottomOffset}`}
                    className="w-full h-auto min-w-[500px]"
                  >
                    {/* Grid lines & Y-axis labels */}
                    {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                      const val = Math.round(maxValue * ratio);
                      const y = chartHeight - ratio * chartHeight;
                      return (
                        <g key={i} className="opacity-40">
                          <line
                            x1={leftOffset}
                            y1={y}
                            x2="100%"
                            y2={y}
                            stroke="#e2e8f0"
                            strokeDasharray="4 4"
                            strokeWidth="1"
                          />
                          <text
                            x={leftOffset - 10}
                            y={y + 4}
                            textAnchor="end"
                            className="text-[10px] font-semibold fill-slate-500"
                          >
                            {val}
                          </text>
                        </g>
                      );
                    })}

                    {/* X Axis line */}
                    <line
                      x1={leftOffset}
                      y1={chartHeight}
                      x2="100%"
                      y2={chartHeight}
                      stroke="#e2e8f0"
                      strokeWidth="1.5"
                    />

                    {/* Bars & Labels */}
                    {currentData.map((d, idx) => {
                      const xBase = leftOffset + idx * (barWidth * 2 + barGap);
                      const targetHeight = (d.target / maxValue) * chartHeight;
                      const realHeight = (d.realization / maxValue) * chartHeight;

                      const targetY = chartHeight - targetHeight;
                      const realY = chartHeight - realHeight;

                      const isHovered = hoveredIdx === idx;

                      return (
                        <g
                          key={idx}
                          onMouseEnter={() => setHoveredIdx(idx)}
                          onMouseLeave={() => setHoveredIdx(null)}
                          className="cursor-pointer"
                        >
                          {/* Target Bar (Gray) */}
                          <rect
                            x={xBase}
                            y={targetY}
                            width={barWidth}
                            height={targetHeight}
                            fill={isHovered ? "#94a3b8" : "#cbd5e1"}
                            rx="4"
                            className="transition-all duration-300"
                          />

                          {/* Realization Bar (Blue) */}
                          <rect
                            x={xBase + barWidth + 4}
                            y={realY}
                            width={barWidth}
                            height={realHeight}
                            fill={isHovered ? "#0369a1" : "#0284c7"}
                            rx="4"
                            className="transition-all duration-300"
                          />

                          {/* X Axis Label */}
                          <text
                            x={xBase + barWidth + 2}
                            y={chartHeight + 20}
                            textAnchor="middle"
                            className="text-[9px] font-bold fill-slate-600"
                          >
                            {`Indikator ${idx + 1}`}
                          </text>

                          {/* Interactive Tooltip within SVG */}
                          {isHovered && (
                            <g>
                              <rect
                                x={xBase - 30}
                                y={Math.min(targetY, realY) - 50}
                                width={barWidth * 2 + 64}
                                height={42}
                                fill="#0b1b3d"
                                rx="6"
                                className="shadow-lg filter drop-shadow-md"
                              />
                              <text
                                x={xBase + barWidth + 2}
                                y={Math.min(targetY, realY) - 34}
                                textAnchor="middle"
                                fill="#ffffff"
                                className="text-[9px] font-bold"
                              >
                                Target: {d.target} {d.unit}
                              </text>
                              <text
                                x={xBase + barWidth + 2}
                                y={Math.min(targetY, realY) - 20}
                                textAnchor="middle"
                                fill="#38bdf8"
                                className="text-[9px] font-bold"
                              >
                                Realisasi: {d.realization} {d.unit}
                              </text>
                              {/* Indicator pointer triangle */}
                              <polygon
                                points={`${xBase + barWidth + 2},${Math.min(targetY, realY) - 8} ${xBase + barWidth - 3},${Math.min(targetY, realY) - 13} ${xBase + barWidth + 7},${Math.min(targetY, realY) - 13}`}
                                fill="#0b1b3d"
                              />
                            </g>
                          )}
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Chart Legend descriptions */}
                <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 md:grid-cols-5 gap-2">
                  {currentData.map((d, idx) => (
                    <div key={idx} className="text-center">
                      <span className="text-[10px] font-extrabold text-[#0b1b3d] bg-sky-50 px-2 py-0.5 rounded">
                        Indikator {idx + 1}
                      </span>
                      <p className="text-[9px] text-slate-500 mt-1 truncate" title={d.name}>
                        {d.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Metrics details list (takes 1 col on lg) */}
              <div className="space-y-6">
                {currentData.map((d, idx) => {
                  const achievement = Math.min(100, Math.round((d.realization / d.target) * 100));
                  const isExcellent = achievement >= 100;
                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => setHoveredIdx(idx)}
                      onMouseLeave={() => setHoveredIdx(null)}
                      className={`group relative overflow-hidden rounded-xl border p-4 bg-white shadow-sm transition-all duration-300 ${
                        hoveredIdx === idx
                          ? "border-[#38bdf8] -translate-y-1 shadow-md"
                          : "border-slate-200"
                      }`}
                    >
                      <div className="absolute top-0 left-0 h-full w-[4px] bg-[#38bdf8] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Indikator {idx + 1}
                          </span>
                          <h3 className="text-xs font-bold text-[#0b1b3d] leading-snug mt-0.5">
                            {d.name}
                          </h3>
                        </div>
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-bold ${
                            isExcellent
                              ? "bg-sky-100 text-[#0b1b3d]"
                              : "bg-amber-100 text-amber-900"
                          }`}
                        >
                          {achievement}% Capaian
                        </span>
                      </div>

                      <div className="mt-4 flex items-end justify-between">
                        <div>
                          <p className="text-[10px] text-slate-500">Realisasi</p>
                          <p className="text-lg font-black text-[#0b1b3d]">
                            {d.realization} <span className="text-xs font-semibold text-slate-500">{d.unit}</span>
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-slate-500">Target</p>
                          <p className="text-sm font-bold text-slate-600">
                            {d.target} {d.unit}
                          </p>
                        </div>
                      </div>

                      {/* Micro Progress Bar */}
                      <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5">
                        <div
                          className="bg-gradient-to-r from-sky-400 to-[#0284c7] h-1.5 rounded-full transition-all duration-1000"
                          style={{ width: `${achievement}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

