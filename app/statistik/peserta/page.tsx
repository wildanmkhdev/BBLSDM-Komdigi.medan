"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

interface AcademyData {
  name: string;
  code: string;
  totalParticipants: number;
  certified: number;
  percentageCertified: number;
  description: string;
}

interface ProvinceDistribution {
  province: string;
  count: number;
  share: number;
}

export default function StatistikPesertaPage() {
  const academies: AcademyData[] = [
    {
      name: "Fresh Graduate Academy (FGA)",
      code: "FGA",
      totalParticipants: 1850,
      certified: 1720,
      percentageCertified: 93,
      description: "Pelatihan intensif bidang Data Science, Web Development, Cloud Computing, dan AI untuk lulusan D3/S1.",
    },
    {
      name: "Vocational School Graduate Academy (VSGA)",
      code: "VSGA",
      totalParticipants: 1420,
      certified: 1350,
      percentageCertified: 95,
      description: "Sertifikasi keahlian terapan bidang teknisi jaringan, graphic design, dan junior mobile developer untuk SMK.",
    },
    {
      name: "Digital Entrepreneurship Academy (DEA)",
      code: "DEA",
      totalParticipants: 980,
      certified: 910,
      percentageCertified: 92,
      description: "Pelatihan kewirausahaan digital bagi pelaku UMKM lokal dalam peningkatkan omset melalui e-commerce.",
    },
    {
      name: "Government Transformation Academy (GTA)",
      code: "GTA",
      totalParticipants: 570,
      certified: 540,
      percentageCertified: 94,
      description: "Peningkatan kompetensi literasi digital, manajemen risiko siber, dan SPBE untuk Aparatur Sipil Negara (ASN).",
    },
  ];

  const provinces: ProvinceDistribution[] = [
    { province: "Sumatera Utara", count: 2450, share: 51 },
    { province: "Aceh", count: 960, share: 20 },
    { province: "Sumatera Barat", count: 680, share: 14 },
    { province: "Riau", count: 430, share: 9 },
    { province: "Kepulauan Riau", count: 300, share: 6 },
  ];

  const [activeAcademyCode, setActiveAcademyCode] = useState<string>("FGA");
  const activeAcademy = academies.find((a) => a.code === activeAcademyCode) || academies[0];

  const totalAllParticipants = academies.reduce((acc, curr) => acc + curr.totalParticipants, 0);
  const totalAllCertified = academies.reduce((acc, curr) => acc + curr.certified, 0);

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Navbar />

      <main className="flex-grow bg-white">
        {/* Banner Header */}
        <section className="bg-slate-50 border-b border-slate-100 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold tracking-widest bg-[#0284c7]/10 text-[#0284c7] uppercase">
              Statistik Pelatihan
            </div>
            <h1 className="text-3xl font-extrabold text-[#0b1b3d] sm:text-4xl">
              Statistik Peserta Pelatihan & Sertifikasi
            </h1>
            <p className="text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Data distribusi peserta program Digital Talent Scholarship (DTS), akademi diklat vokasi, serta tingkat kelulusan sertifikasi profesi BNSP.
            </p>
            <div className="w-12 h-1 bg-[#0284c7] mx-auto rounded-full mt-4"></div>
          </div>
        </section>

        {/* Global Summary Metric Cards */}
        <section className="py-12 bg-white border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              <div className="bg-[#0b1b3d] text-white rounded-2xl p-6 shadow-md relative overflow-hidden flex flex-col justify-between">
                <div className="absolute right-3 top-3 w-16 h-16 bg-[#0284c7]/20 rounded-full blur-xl"></div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#38bdf8]">
                    Total Alumni Diklat
                  </span>
                  <div className="text-3xl font-black mt-2">
                    {totalAllParticipants.toLocaleString()}
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Peserta terdaftar di seluruh akademi
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-slate-300">
                  Tahun Anggaran 2024
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#0284c7]"></div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Peserta Lulus Sertifikasi
                  </span>
                  <div className="text-3xl font-black text-[#0b1b3d] mt-2">
                    {totalAllCertified.toLocaleString()}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Memegang sertifikat BNSP / Internasional
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-[#0284c7]">
                  Rata-rata Kelulusan: {Math.round((totalAllCertified / totalAllParticipants) * 100)}%
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#fbbf24]"></div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Cakupan Wilayah kerja
                  </span>
                  <div className="text-3xl font-black text-[#0b1b3d] mt-2">
                    5 Provinsi
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Sumut, Aceh, Sumbar, Riau, Kepri
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                  Mitra Kabupaten/Kota: 42 Wilayah
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Interactive Breakdown by Academy */}
        <section className="py-16 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Academy Tabs & List (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <h2 className="text-lg font-bold text-[#0b1b3d]">
                  Pilih Akademi Pelatihan
                </h2>
                <div className="space-y-3">
                  {academies.map((ac) => {
                    const isSelected = ac.code === activeAcademyCode;
                    return (
                      <div
                        key={ac.code}
                        onClick={() => setActiveAcademyCode(ac.code)}
                        className={`cursor-pointer p-4 rounded-xl border transition-all relative overflow-hidden ${
                          isSelected
                            ? "bg-white border-[#0284c7] shadow-md ring-2 ring-[#0284c7]/20"
                            : "bg-white border-slate-200 hover:border-slate-300 shadow-sm"
                        }`}
                      >
                        <div
                          className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                            isSelected ? "bg-[#0284c7]" : "bg-[#38bdf8]"
                          }`}
                        ></div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#0b1b3d]">
                            {ac.name}
                          </span>
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-sky-50 text-[#0284c7] uppercase">
                            {ac.code}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-2 line-clamp-2">
                          {ac.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Detailed Interactive Chart Card (7 cols) */}
              <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-6 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#0284c7]"></div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0284c7] bg-sky-50 px-2 py-0.5 rounded">
                      Rincian Akademi
                    </span>
                    <span className="text-xs font-bold text-[#0b1b3d]">
                      Tingkat Kelulusan: {activeAcademy.percentageCertified}%
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-[#0b1b3d]">
                    {activeAcademy.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {activeAcademy.description}
                  </p>
                </div>

                <hr className="border-slate-100" />

                {/* Donut/Bar Interactive Graphic */}
                <div className="space-y-4">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#0b1b3d] block">
                    Perbandingan Pendaftar vs Lulus Sertifikasi
                  </span>

                  <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-slate-600">Total Peserta Terdaftar</span>
                        <span className="text-[#0b1b3d]">{activeAcademy.totalParticipants} Orang</span>
                      </div>
                      <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-[#0b1b3d] w-full rounded-full"></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-[#0284c7]">Peserta Lulus Sertifikasi (BNSP)</span>
                        <span className="text-[#0284c7]">{activeAcademy.certified} Orang</span>
                      </div>
                      <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#38bdf8] to-[#0284c7] rounded-full transition-all duration-500"
                          style={{
                            width: `${(activeAcademy.certified / activeAcademy.totalParticipants) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Regional Distribution Chart */}
                <div className="space-y-4 pt-2">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#0b1b3d] block">
                    Sebaran Peserta per Provinsi Wilayah Kerja
                  </span>

                  <div className="space-y-2.5">
                    {provinces.map((p) => (
                      <div key={p.province} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-700">{p.province}</span>
                          <span className="text-slate-500">{p.count} Peserta ({p.share}%)</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#0284c7] rounded-full"
                            style={{ width: `${p.share}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
