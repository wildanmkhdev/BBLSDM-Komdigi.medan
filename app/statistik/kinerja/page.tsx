"use client";

import React, { useState } from "react";

interface MetricCategory {
  id: string;
  name: string;
  target: number;
  realization: number;
  unit: string;
  yearData: { year: string; value: number }[];
}

export default function StatistikKinerjaPage() {
  const metrics: MetricCategory[] = [
    {
      id: "iku-1",
      name: "Jumlah Peserta Pelatihan Vokasi Digital Tersertifikasi",
      target: 4500,
      realization: 4820,
      unit: "Peserta",
      yearData: [
        { year: "2021", value: 3100 },
        { year: "2022", value: 3800 },
        { year: "2023", value: 4250 },
        { year: "2024", value: 4820 },
      ],
    },
    {
      id: "iku-2",
      name: "Tingkat Kepuasan Layanan Diklat & Riset (IKM)",
      target: 88,
      realization: 93.4,
      unit: "Skala 100",
      yearData: [
        { year: "2021", value: 85.2 },
        { year: "2022", value: 88.6 },
        { year: "2023", value: 91.0 },
        { year: "2024", value: 93.4 },
      ],
    },
    {
      id: "iku-3",
      name: "Jumlah Naskah Kebijakan & Jurnal Riset Terpublikasi",
      target: 12,
      realization: 15,
      unit: "Dokumen",
      yearData: [
        { year: "2021", value: 8 },
        { year: "2022", value: 10 },
        { year: "2023", value: 13 },
        { year: "2024", value: 15 },
      ],
    },
    {
      id: "iku-4",
      name: "Persentase Serapan Anggaran DIPA Balai",
      target: 95,
      realization: 97.8,
      unit: "% Anggaran",
      yearData: [
        { year: "2021", value: 94.1 },
        { year: "2022", value: 96.0 },
        { year: "2023", value: 96.5 },
        { year: "2024", value: 97.8 },
      ],
    },
  ];

  const [selectedMetricId, setSelectedMetricId] = useState<string>("iku-1");
  const activeMetric = metrics.find((m) => m.id === selectedMetricId) || metrics[0];

  const achievementPercentage = Math.round(
    (activeMetric.realization / activeMetric.target) * 100
  );

  return (
    <div className="bg-white">
      {/* Banner Header */}
      <section className="bg-slate-50 border-b border-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold tracking-widest bg-[#0284c7]/10 text-[#0284c7] uppercase">
            Dashboard Statistik
          </div>
          <h1 className="text-3xl font-extrabold text-[#0b1b3d] sm:text-4xl">
            Statistik Kinerja Instansi
          </h1>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Visualisasi grafik interaktif pencapaian Indikator Kinerja Utama (IKU), efisiensi pelaksanaan program, dan realisasi target tahunan BBLSDM Komdigi Medan.
          </p>
          <div className="w-12 h-1 bg-[#0284c7] mx-auto rounded-full mt-4"></div>
        </div>
      </section>

      {/* Overview Metric Summary Cards */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((m) => {
              const isSelected = m.id === selectedMetricId;
              const pct = Math.round((m.realization / m.target) * 100);
              return (
                <div
                  key={m.id}
                  onClick={() => setSelectedMetricId(m.id)}
                  className={`cursor-pointer bg-white rounded-xl border p-5 shadow-sm transition-all relative overflow-hidden flex flex-col justify-between ${
                    isSelected
                      ? "border-[#0284c7] ring-2 ring-[#0284c7]/20 scale-[1.02]"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${isSelected ? "bg-[#0284c7]" : "bg-[#38bdf8]"}`}></div>
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">IKU Balai</span>
                    <h3 className="text-xs font-bold text-[#0b1b3d] leading-snug line-clamp-2">{m.name}</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-[#0b1b3d]">{m.realization}</span>
                      <span className="text-xs text-slate-500 font-semibold">{m.unit}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                    <div className="flex justify-between text-[10px] font-bold">
                      <span className="text-slate-400">Target: {m.target}</span>
                      <span className="text-[#0284c7]">{pct}% Tercapai</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#38bdf8] to-[#0284c7] rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Deep-Dive Visualizer Chart Section */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#0284c7]"></div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="inline-block text-[10px] font-bold text-[#0284c7] bg-sky-50 px-2.5 py-0.5 rounded border border-sky-100 uppercase tracking-widest">
                  Visualisasi Tren Kinerja
                </span>
                <h2 className="text-xl font-extrabold text-[#0b1b3d] mt-1">{activeMetric.name}</h2>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="text-right">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Capaian Target Total</span>
                  <span className="text-lg font-black text-[#0284c7]">{achievementPercentage}%</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#0b1b3d] text-[#fbbf24] flex items-center justify-center font-black text-xs shadow">✓</div>
              </div>
            </div>

            <hr className="border-slate-100" />

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#0b1b3d]">Pertumbuhan Nilai dari Tahun ke Tahun</span>
                <span className="text-xs text-slate-400">Satuan: {activeMetric.unit}</span>
              </div>

              <div className="h-64 flex items-end justify-between gap-4 sm:gap-8 pt-8 pb-2 px-4 bg-slate-50 rounded-xl border border-slate-200/80 relative">
                <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none opacity-20">
                  <div className="border-b border-slate-400 w-full"></div>
                  <div className="border-b border-slate-400 w-full"></div>
                  <div className="border-b border-slate-400 w-full"></div>
                  <div className="border-b border-slate-400 w-full"></div>
                </div>

                {activeMetric.yearData.map((d) => {
                  const maxVal = Math.max(...activeMetric.yearData.map((y) => y.value)) * 1.1;
                  const barHeightPct = Math.round((d.value / maxVal) * 100);
                  return (
                    <div key={d.year} className="flex-1 flex flex-col items-center gap-3 h-full justify-end group z-10">
                      <div className="opacity-90 group-hover:opacity-100 bg-[#0b1b3d] text-white text-[11px] font-bold px-2 py-1 rounded shadow transition-opacity">
                        {d.value} {activeMetric.unit}
                      </div>
                      <div className="w-full max-w-[64px] bg-slate-200 rounded-t-lg overflow-hidden flex items-end h-full">
                        <div
                          className="w-full bg-gradient-to-t from-[#0b1b3d] via-[#0284c7] to-[#38bdf8] rounded-t-lg transition-all duration-700 group-hover:brightness-110"
                          style={{ height: `${barHeightPct}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-bold text-slate-700">{d.year}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-4 bg-sky-50/60 rounded-xl border border-sky-100 flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#0284c7] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">i</div>
              <div className="text-xs text-slate-600 leading-relaxed">
                <span className="font-bold text-[#0b1b3d]">Catatan Analisis: </span>
                Kinerja BBLSDM Komdigi Medan menunjukkan tren kenaikan konsisten sebesar 12-15% per tahun. Seluruh target IKU telah melampaui ambang batas 100% dari penetapan kinerja awal.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
