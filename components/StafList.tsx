"use client";

import React, { useState } from "react";

interface StafMember {
  id: string;
  name: string;
  role: string;
  level: "kepala" | "subbag" | "ketua-tim" | "anggota";
  division: string;
  email: string;
  phone: string;
  nip: string;
  avatarBg: string; // Gradient color class
  tugas: string[];
}

const stafData: StafMember[] = [
  {
    id: "1",
    name: "Dr. Ir. H. Ginanjar Prabowo, M.T.",
    role: "Kepala BBLSDM Komdigi Medan",
    level: "kepala",
    division: "Pimpinan Tinggi",
    email: "ginanjar.prabowo@komdigi.go.id",
    phone: "+62 811-3444-555 (Ext. 101)",
    nip: "197408121999031002",
    avatarBg: "from-blue-600 to-indigo-700",
    tugas: [
      "Memimpin, mengarahkan, dan mengoordinasikan seluruh program kerja BBLSDM Komdigi Medan.",
      "Menetapkan sasaran kinerja instansi selaras dengan rencana strategis Kementerian Komunikasi dan Digital.",
      "Membangun hubungan kemitraan strategis dengan institusi eksternal di tingkat nasional maupun internasional.",
      "Melaporkan capaian kinerja instansi secara berkala kepada Kepala Badan litbang SDM Komdigi."
    ]
  },
  {
    id: "2",
    name: "Ratna Sari, S.E., M.Si.",
    role: "Kepala Subbagian Umum",
    level: "subbag",
    division: "Subbagian Umum",
    email: "ratna.sari@komdigi.go.id",
    phone: "+62 812-7777-881 (Ext. 102)",
    nip: "198005142005012003",
    avatarBg: "from-teal-500 to-cyan-600",
    tugas: [
      "Mengelola urusan administrasi persuratan, kearsipan, dan rumah tangga kantor.",
      "Melaksanakan pengelolaan kepegawaian meliputi mutasi, pelatihan internal, dan penilaian kinerja staf.",
      "Menyusun perencanaan anggaran, evaluasi, dan laporan pertanggungjawaban keuangan kantor.",
      "Melakukan pemeliharaan sarana prasarana serta inventarisasi barang milik negara (BMN)."
    ]
  },
  {
    id: "3",
    name: "Dwi Wahyudi, S.Kom., M.Eng.",
    role: "Ketua Tim Kerja Pelatihan dan Sertifikasi",
    level: "ketua-tim",
    division: "Tim Kerja Pelatihan & Sertifikasi",
    email: "dwi.wahyudi@komdigi.go.id",
    phone: "+62 813-8888-992 (Ext. 201)",
    nip: "198511202009041001",
    avatarBg: "from-violet-500 to-purple-600",
    tugas: [
      "Merencanakan kurikulum dan program pelatihan kompetensi bidang TIK dan Digital.",
      "Menyelenggarakan sertifikasi keahlian TIK berbasis SKKNI untuk masyarakat umum dan aparatur negara.",
      "Melakukan evaluasi efektivitas pelatihan serta mengukur indeks kepuasan peserta.",
      "Mengoordinasikan instruktur, asesor, dan penyediaan lab sertifikasi."
    ]
  },
  {
    id: "4",
    name: "Siti Rahmawati, S.Sos., M.I.Kom.",
    role: "Ketua Tim Kerja Publikasi, Promosi, dan Kerja Sama",
    level: "ketua-tim",
    division: "Tim Kerja Publikasi & Kerja Sama",
    email: "siti.rahma@komdigi.go.id",
    phone: "+62 811-9999-443 (Ext. 202)",
    nip: "198704022010122002",
    avatarBg: "from-orange-400 to-red-500",
    tugas: [
      "Menyusun strategi publikasi resmi instansi melalui media sosial, website, dan pers.",
      "Menyelenggarakan promosi program pelatihan dan kajian strategis BBLSDM Komdigi Medan.",
      "Menjajaki dan memformulasikan kerja sama dengan pemerintah daerah, akademisi, dan dunia industri.",
      "Mengelola hubungan masyarakat (Humas) dan layanan informasi publik (PPID)."
    ]
  },
  {
    id: "5",
    name: "Ahmad Faisal, M.Sc., Ph.D.",
    role: "Ketua Tim Kerja Riset, Kajian, dan Statistisi",
    level: "ketua-tim",
    division: "Tim Kerja Riset & Kajian",
    email: "ahmad.faisal@komdigi.go.id",
    phone: "+62 812-4444-112 (Ext. 203)",
    nip: "198302192008011003",
    avatarBg: "from-emerald-500 to-green-600",
    tugas: [
      "Merumuskan metodologi riset dan kajian kebutuhan SDM digital nasional.",
      "Melakukan pengumpulan, pengolahan, dan analisis data statistik kinerja instansi.",
      "Menyusun Buku Putih (White Paper) dan jurnal ilmiah publikasi riset berkala.",
      "Menyediakan data kinerja instansi dalam bentuk visualisasi interaktif dan infografis."
    ]
  }
];

export default function StafList() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getBadgeStyles = (level: string) => {
    switch (level) {
      case "kepala":
        return "bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-200 border-blue-200";
      case "subbag":
        return "bg-teal-100 text-teal-900 dark:bg-teal-950 dark:text-teal-200 border-teal-200";
      case "ketua-tim":
        return "bg-purple-100 text-purple-900 dark:bg-purple-950 dark:text-purple-200 border-purple-200";
      default:
        return "bg-gray-100 text-gray-900 dark:bg-zinc-800 dark:text-zinc-200 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {stafData.map((staf) => {
        const isExpanded = expandedId === staf.id;
        return (
          <div
            key={staf.id}
            className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
          >
            {/* Left accent color indicator based on hierarchy level */}
            <div className={`absolute top-0 left-0 h-full w-[4px] bg-card-accent`} />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pl-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Visual Avatar with initials */}
                <div
                  className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${staf.avatarBg} text-xl font-bold text-white shadow-inner`}
                >
                  {staf.name
                    .split(" ")
                    .filter((n) => !n.includes(".") && n.length > 0)
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-bold text-card-header dark:text-white">
                      {staf.name}
                    </h3>
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${getBadgeStyles(
                        staf.level
                      )}`}
                    >
                      {staf.level === "kepala"
                        ? "Pimpinan"
                        : staf.level === "subbag"
                        ? "Eselon IV"
                        : "Ketua Tim"}
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-sky-600 dark:text-sky-400">
                    {staf.role}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-zinc-400">
                    NIP. {staf.nip} | {staf.division}
                  </p>
                </div>
              </div>

              {/* Contact details */}
              <div className="flex flex-col justify-center gap-2 border-t border-dashed border-gray-100 pt-4 md:border-t-0 md:pt-0 text-xs text-gray-600 dark:border-zinc-800 dark:text-zinc-300">
                <div className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 text-card-icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{staf.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 text-card-icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>{staf.phone}</span>
                </div>
              </div>
            </div>

            {/* Toggleable detail list for job descriptions */}
            <div className="mt-4 flex justify-end pl-2">
              <button
                onClick={() => toggleExpand(staf.id)}
                className="inline-flex items-center gap-1 text-xs font-bold text-card-header hover:text-sky-600 focus:outline-none dark:text-zinc-200 dark:hover:text-sky-400"
              >
                <span>{isExpanded ? "Sembunyikan Tugas & Fungsi" : "Lihat Tugas & Fungsi"}</span>
                <svg
                  className={`h-4 w-4 transform transition-transform duration-300 ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {isExpanded && (
              <div className="mt-4 border-t border-gray-100 pt-4 pl-2 dark:border-zinc-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 dark:text-zinc-400">
                  Rincian Tugas & Fungsi Jabatan:
                </h4>
                <ul className="list-inside list-decimal space-y-1.5 text-xs text-gray-700 leading-relaxed dark:text-zinc-300">
                  {staf.tugas.map((t, idx) => (
                    <li key={idx} className="marker:font-semibold">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
