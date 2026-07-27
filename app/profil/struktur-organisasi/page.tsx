"use client";

import Image from "next/image";

interface StaffMember {
  name: string;
  role: string;
  avatar: string;
}

export default function StrukturOrganisasi() {
  const pimpinan: StaffMember[] = [
    {
      name: "Dr. Christiany Juditha S.Sos., M.A.",
      role: "Kepala BBPSDMP KOMINFO MEDAN",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop",
    },
    {
      name: "Yusrizal, S.Kom., M.Eng",
      role: "Kepala Bagian Umum",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop",
    },
  ];

  const staffRow1: StaffMember[] = [
    {
      name: "Ahirinna, S.I.Kom.",
      role: "Fasilitator Kemitraan",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Ghio Vani Debrian Soares, S.Pd.",
      role: "Petugas Standarisasi dan Sertifikasi",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Jarudo Damanik, S.Kom.",
      role: "Analis Perencanaan, Evaluasi dan Pelaporan",
      avatar: "https://images.unsplash.com/photo-1500048993953-d23a436266cf?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Frans Hendra Suryanta Sembiring, ST., M.SM.",
      role: "Pranata Humas Ahli Muda",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Darliandra, S.Stat.",
      role: "Penyusun Bahan Informasi dan Publikasi",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Widia Apri Putri, S.Tr.Kom",
      role: "Petugas Standarisasi dan Sertifikasi",
      avatar: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=200&auto=format&fit=crop",
    },
  ];

  const staffRow2: StaffMember[] = [
    {
      name: "Jesty Meliana Sibarani, S.Akun.",
      role: "Penata Laporan Keuangan",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "M. Fikri Ihsan, SE.",
      role: "Administrasi Keuangan",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Michael Hariara Simanjuntak, S.Akun.",
      role: "Penata Laporan Keuangan",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Safrayuda Andrean, SE.",
      role: "Analis Penjamin Mutu",
      avatar: "https://images.unsplash.com/photo-1489980508314-941910ded1f4?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Ahmad Rozy, S.Kom., M.Kom.",
      role: "Analis Perencanaan dan Evaluasi Pelaporan",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Gusmila Zulidar, SE.",
      role: "Petugas Standarisasi dan Sertifikasi",
      avatar: "https://images.unsplash.com/photo-1594744803329-e58b31de215f?q=80&w=200&auto=format&fit=crop",
    },
  ];

  const staffRow3: StaffMember[] = [
    {
      name: "Prini Zunita, S.Sos., M.S.P.",
      role: "Analis SDM Aparatur",
      avatar: "https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Achmad Ofanny S. Torong, S.E.",
      role: "Penyusun Rencana Kebutuhan Rumah Tangga & Perlengkapan",
      avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Erwin Antonius Manurung, S.T.",
      role: "Analis Data Ilmiah",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Budiman, S.Sos.",
      role: "Analis Data Ilmiah Ahli Madya",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Meilinia Diakonia Ginting, S.Kom.",
      role: "Analis Data Ilmiah",
      avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Ade Gita Ellena Br. Tarigan, S.I.Kom.",
      role: "Penyusun Bahan Informasi & Publikasi",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Ronald Rato Mangapu Limbong, SE.",
      role: "Analis Penjamin Mutu",
      avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Delvi Windrayani, S.I.Kom.",
      role: "Penyusun Bahan Informasi & Publikasi",
      avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=200&auto=format&fit=crop",
    },
  ];

  const staffRow4: StaffMember[] = [
    {
      name: "Fachri Auliansyah, S.Kom.",
      role: "Standarisasi Informatika",
      avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Eki Yoan Meydora, S.I.Kom.",
      role: "Penyusun Bahan Informasi & Publikasi",
      avatar: "https://images.unsplash.com/photo-1594744803329-e58b31de215f?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Idawati Pandia, S.Sos.",
      role: "Fasilitator Kemitraan",
      avatar: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Arif Rahman, S.Kom.",
      role: "Fasilitator Kemitraan",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "M. Prakoso Prabhaswara, S.Tr.Kom.",
      role: "Ahli Pertama - Instruktur",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Alex Siregar, S.Kom",
      role: "Ahli Pertama - Pranata Komputer",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      <main className="flex-grow">
        {/* Header Section */}
        <section className="bg-white border-b border-slate-200/60 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold tracking-widest bg-[#0284c7]/10 text-[#0284c7] uppercase">
              Bagan Organisasi Resmi
            </div>
            <h1 className="text-3xl font-extrabold text-[#0b1b3d] sm:text-4xl">
              Struktur Organisasi BBLSDM Komdigi Medan
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto">
              Susunan lengkap pimpinan, pejabat administrasi, serta kelompok fungsional pelaksana di lingkungan balai.
            </p>
            <div className="w-12 h-1 bg-[#0284c7] mx-auto rounded-full mt-4"></div>
          </div>
        </section>

        {/* ============================================================
           BAGAN STRUKTUR DINDING (ORGANIZATIONAL BOARD LAYOUT)
           ============================================================ */}
        <section className="py-20 bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50/60 border-t border-slate-200/40 relative overflow-hidden">
          {/* Abstract Grid Overlay representing office board */}
          <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          <div className="mx-auto max-w-[95rem] px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
            
            {/* Top Board Commitments Slogan (as shown in printed photo) */}
            <div className="w-full flex justify-between items-start mb-6">
              <div className="border-l-4 border-[#0284c7] pl-4 max-w-sm">
                <span className="block text-[10px] font-bold text-[#0284c7] uppercase tracking-widest mb-1">
                  Zona Integritas
                </span>
                <p className="text-xs font-extrabold text-[#0b1b3d] leading-relaxed">
                  1. Wilayah Bebas Korupsi (WBK)<br />
                  2. Birokrasi Bersih dan Melayani (WBBM)
                </p>
              </div>
              <div className="text-right hidden sm:block">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  BBLSDM Komdigi Medan
                </span>
              </div>
            </div>

            {/* 1. Baris Pimpinan (Dr. Christiany & Yusrizal) */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-16 mb-16 relative">
              {/* Kepala */}
              <div className="flex flex-col items-center group">
                <div className="relative w-44 h-56 rounded-t-2xl overflow-hidden bg-white border-t border-x border-slate-250 shadow-sm">
                  <Image
                    src={pimpinan[0].avatar}
                    alt={pimpinan[0].name}
                    fill
                    sizes="200px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="w-48 bg-[#0b1b3d] text-white py-3 px-2 rounded-xl border border-slate-700 shadow-md text-center min-h-[4.5rem] flex flex-col justify-center -mt-2.5 z-10">
                  <h4 className="text-[11px] font-extrabold leading-snug mb-1 text-white">
                    {pimpinan[0].name}
                  </h4>
                  <p className="text-[9px] text-yellow-400 font-bold uppercase tracking-wider leading-tight">
                    {pimpinan[0].role}
                  </p>
                </div>
              </div>

              {/* Kabag */}
              <div className="flex flex-col items-center group">
                <div className="relative w-44 h-56 rounded-t-2xl overflow-hidden bg-white border-t border-x border-slate-250 shadow-sm">
                  <Image
                    src={pimpinan[1].avatar}
                    alt={pimpinan[1].name}
                    fill
                    sizes="200px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="w-48 bg-[#0b1b3d] text-white py-3 px-2 rounded-xl border border-slate-700 shadow-md text-center min-h-[4.5rem] flex flex-col justify-center -mt-2.5 z-10">
                  <h4 className="text-[11px] font-extrabold leading-snug mb-1 text-white">
                    {pimpinan[1].name}
                  </h4>
                  <p className="text-[9px] text-yellow-400 font-bold uppercase tracking-wider leading-tight">
                    {pimpinan[1].role}
                  </p>
                </div>
              </div>
            </div>

            {/* Separator / Staff Heading */}
            <div className="w-full text-center relative mb-8">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full border-t border-slate-200/60 max-w-4xl"></div>
              </div>
              <span className="relative inline-block bg-slate-50/10 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Kelompok Jabatan Fungsional
              </span>
            </div>

            {/* 2. Staff Row 1 (6-across) */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-12 gap-x-4 max-w-6xl mx-auto justify-items-center">
              {staffRow1.map((staf, idx) => (
                <div key={idx} className="flex flex-col items-center group">
                  <div className="relative w-36 h-44 rounded-t-xl overflow-hidden bg-white border-t border-x border-slate-200/80 shadow-sm">
                    <Image
                      src={staf.avatar}
                      alt={staf.name}
                      fill
                      sizes="150px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="w-40 bg-[#0b1b3d] text-white py-2.5 px-2 rounded-lg border border-slate-700 shadow-md text-center min-h-[4rem] flex flex-col justify-center -mt-2 z-10">
                    <h4 className="text-[10px] font-bold leading-tight mb-1 text-white line-clamp-2">
                      {staf.name}
                    </h4>
                    <p className="text-[8px] text-yellow-400 font-bold uppercase tracking-wider leading-tight min-h-[1.5rem] flex items-center justify-center">
                      {staf.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* 3. Staff Row 2 (6-across) */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-12 gap-x-4 max-w-6xl mx-auto justify-items-center">
              {staffRow2.map((staf, idx) => (
                <div key={idx} className="flex flex-col items-center group">
                  <div className="relative w-36 h-44 rounded-t-xl overflow-hidden bg-white border-t border-x border-slate-200/80 shadow-sm">
                    <Image
                      src={staf.avatar}
                      alt={staf.name}
                      fill
                      sizes="150px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="w-40 bg-[#0b1b3d] text-white py-2.5 px-2 rounded-lg border border-slate-700 shadow-md text-center min-h-[4rem] flex flex-col justify-center -mt-2 z-10">
                    <h4 className="text-[10px] font-bold leading-tight mb-1 text-white line-clamp-2">
                      {staf.name}
                    </h4>
                    <p className="text-[8px] text-yellow-400 font-bold uppercase tracking-wider leading-tight min-h-[1.5rem] flex items-center justify-center">
                      {staf.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* 4. Staff Row 3 (8-across - slightly smaller cards to fit 8 items beautifully) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-y-12 gap-x-3 max-w-7xl mx-auto justify-items-center">
              {staffRow3.map((staf, idx) => (
                <div key={idx} className="flex flex-col items-center group">
                  <div className="relative w-32 h-40 rounded-t-lg overflow-hidden bg-white border-t border-x border-slate-200/80 shadow-sm">
                    <Image
                      src={staf.avatar}
                      alt={staf.name}
                      fill
                      sizes="130px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="w-36 bg-[#0b1b3d] text-white py-2 px-1.5 rounded-md border border-slate-700 shadow-md text-center min-h-[3.75rem] flex flex-col justify-center -mt-2 z-10">
                    <h4 className="text-[9px] font-bold leading-tight mb-0.5 text-white line-clamp-2">
                      {staf.name}
                    </h4>
                    <p className="text-[7.5px] text-yellow-400 font-bold uppercase tracking-wider leading-tight min-h-[1.5rem] flex items-center justify-center">
                      {staf.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* 5. Staff Row 4 (6-across) */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-12 gap-x-4 max-w-6xl mx-auto justify-items-center">
              {staffRow4.map((staf, idx) => (
                <div key={idx} className="flex flex-col items-center group">
                  <div className="relative w-36 h-44 rounded-t-xl overflow-hidden bg-white border-t border-x border-slate-200/80 shadow-sm">
                    <Image
                      src={staf.avatar}
                      alt={staf.name}
                      fill
                      sizes="150px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="w-40 bg-[#0b1b3d] text-white py-2.5 px-2 rounded-lg border border-slate-700 shadow-md text-center min-h-[4rem] flex flex-col justify-center -mt-2 z-10">
                    <h4 className="text-[10px] font-bold leading-tight mb-1 text-white line-clamp-2">
                      {staf.name}
                    </h4>
                    <p className="text-[8px] text-yellow-400 font-bold uppercase tracking-wider leading-tight min-h-[1.5rem] flex items-center justify-center">
                      {staf.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      </main>
    </div>
  );
}
