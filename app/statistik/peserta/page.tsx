"use client";

import { useState } from "react";
import PageHeader from "@/app/components/PageHeader";

interface AcademyData {
  name: string;
  code: string;
  totalParticipants: number;
  certified: number;
  percentageCertified: number;
  description: string;
}

interface RegencyDistribution {
  name: string;
  count: number;
  share: number;
}

export default function StatistikPesertaPage() {
  const academies: AcademyData[] = [
    {
      name: "Fresh Graduate Academy (FGA)",
      code: "FGA",
      totalParticipants: 950,
      certified: 885,
      percentageCertified: 93,
      description: "Pelatihan intensif bidang Data Science, Web Development, Cloud Computing, dan AI untuk lulusan D3/S1 di Sumatera Utara.",
    },
    {
      name: "Vocational School Graduate Academy (VSGA)",
      code: "VSGA",
      totalParticipants: 740,
      certified: 700,
      percentageCertified: 95,
      description: "Sertifikasi keahlian terapan bidang teknisi jaringan, graphic design, dan junior mobile developer untuk lulusan SMK di Sumatera Utara.",
    },
    {
      name: "Digital Entrepreneurship Academy (DEA)",
      code: "DEA",
      totalParticipants: 520,
      certified: 480,
      percentageCertified: 92,
      description: "Pelatihan kewirausahaan digital bagi pelaku UMKM lokal Sumatera Utara dalam peningkatan omset melalui e-commerce.",
    },
    {
      name: "Government Transformation Academy (GTA)",
      code: "GTA",
      totalParticipants: 240,
      certified: 225,
      percentageCertified: 94,
      description: "Peningkatan kompetensi literasi digital, manajemen risiko siber, dan SPBE untuk Aparatur Sipil Negara (ASN) Pemda di Sumatera Utara.",
    },
  ];

  const regencies: RegencyDistribution[] = [
    { name: "Kota Medan", count: 850, share: 35 },
    { name: "Kab. Deli Serdang", count: 490, share: 20 },
    { name: "Kota Binjai", count: 320, share: 13 },
    { name: "Kota Pematangsiantar", count: 245, share: 10 },
    { name: "Kab. Simalungun", count: 196, share: 8 },
    { name: "Kab. Asahan", count: 172, share: 7 },
    { name: "Kab/Kota Lainnya (27 Wilayah Sumut)", count: 177, share: 7 },
  ];

  const [activeAcademyCode, setActiveAcademyCode] = useState<string>("FGA");
  const activeAcademy = academies.find((a) => a.code === activeAcademyCode) || academies[0];

  const totalAllParticipants = academies.reduce((acc, curr) => acc + curr.totalParticipants, 0);
  const totalAllCertified = academies.reduce((acc, curr) => acc + curr.certified, 0);

  return (
    <div className="bg-white">
      {/* Banner Header */}
      <PageHeader

        title="Statistik Peserta Pelatihan & Sertifikasi"

        title="Statistik Peserta Pelatihan & Sertifikasi - Sumatera Utara"
 
        subtitle="Data distribusi peserta program Digital Talent Scholarship (DTS), akademi diklat vokasi, serta tingkat kelulusan sertifikasi profesi BNSP khusus wilayah Provinsi Sumatera Utara."
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Statistik", href: "#" },
          { label: "Peserta Pelatihan" },
        ]}
      />

      {/* Global Summary Metric Cards */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-[#0b1b3d] text-white rounded-2xl p-6 shadow-md relative overflow-hidden flex flex-col justify-between transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
              <div className="absolute right-3 top-3 w-16 h-16 bg-[#0284c7]/20 rounded-full blur-xl"></div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#38bdf8]">Total Alumni Diklat Sumut</span>
                <div className="text-3xl font-black mt-2">{totalAllParticipants.toLocaleString("id-ID")}</div>
                <p className="text-xs text-slate-300 mt-1">Peserta terdaftar di seluruh akademi wilayah Sumut</p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-slate-300">Tahun Anggaran 2024</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Peserta Lulus Sertifikasi Sumut</span>
                <div className="text-3xl font-black text-[#0b1b3d] mt-2">{totalAllCertified.toLocaleString("id-ID")}</div>
                <p className="text-xs text-slate-500 mt-1">Memegang sertifikat BNSP / Internasional di Sumut</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-[#0284c7]">
                Rata-rata Kelulusan: {Math.round((totalAllCertified / totalAllParticipants) * 100)}%
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Cakupan Wilayah Kerja</span>
                <div className="text-3xl font-black text-[#0b1b3d] mt-2">33 Kab / Kota</div>
                <p className="text-xs text-slate-500 mt-1">10 Kota &amp; 23 Kabupaten di Provinsi Sumatera Utara</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">Cakupan 100% Wilayah Sumut</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Breakdown by Academy */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left Column: Academy Tabs */}
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-lg font-bold text-[#0b1b3d]">Pilih Akademi Pelatihan (Sumut)</h2>
              <div className="space-y-3">
                {academies.map((ac) => {
                  const isSelected = ac.code === activeAcademyCode;
                  return (
                    <div
                      key={ac.code}
                      onClick={() => setActiveAcademyCode(ac.code)}
                      className={`cursor-pointer p-4 rounded-xl border transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl relative overflow-hidden ${
                        isSelected
                          ? "bg-white border-[#0284c7] shadow-md ring-2 ring-[#0284c7]/20"
                          : "bg-white border-slate-200 hover:border-slate-300 shadow-sm"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#0b1b3d]">{ac.name}</span>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-sky-50 text-[#0284c7] uppercase">{ac.code}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-2 line-clamp-2">{ac.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Detail Chart */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-6 relative overflow-hidden transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl">

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0284c7] bg-sky-50 px-2 py-0.5 rounded">Rincian Akademi Sumut</span>
                  <span className="text-xs font-bold text-[#0b1b3d]">Tingkat Kelulusan: {activeAcademy.percentageCertified}%</span>
                </div>
                <h3 className="text-xl font-extrabold text-[#0b1b3d]">{activeAcademy.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{activeAcademy.description}</p>
              </div>

              <hr className="border-slate-100" />

              <div className="space-y-4">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#0b1b3d] block">Perbandingan Pendaftar vs Lulus Sertifikasi (Sumut)</span>
                <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-slate-600">Total Peserta Terdaftar</span>
                      <span className="text-[#0b1b3d]">{activeAcademy.totalParticipants.toLocaleString("id-ID")} Orang</span>
                    </div>
                    <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#0b1b3d] w-full rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-[#0284c7]">Peserta Lulus Sertifikasi (BNSP)</span>
                      <span className="text-[#0284c7]">{activeAcademy.certified.toLocaleString("id-ID")} Orang</span>
                    </div>
                    <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#38bdf8] to-[#0284c7] rounded-full transition-all duration-500"
                        style={{ width: `${(activeAcademy.certified / activeAcademy.totalParticipants) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#0b1b3d] block">Sebaran Peserta per Kabupaten/Kota di Sumatera Utara</span>
                <div className="space-y-2.5">
                  {regencies.map((r) => (
                    <div key={r.name} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-700">{r.name}</span>
                        <span className="text-slate-500">{r.count.toLocaleString("id-ID")} Peserta ({r.share}%)</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#0284c7] rounded-full" style={{ width: `${r.share}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

