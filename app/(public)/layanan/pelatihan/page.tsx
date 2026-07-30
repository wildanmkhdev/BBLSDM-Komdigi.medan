"use client";

import { useState } from "react";
import PageHeader from "@/app/components/PageHeader";

/* ──────────────────────────────────────────
   Icon Helpers
   ────────────────────────────────────────── */
function IconSearch() {
  return (
    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg className="w-4 h-4 shrink-0 text-sky-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg className="w-4 h-4 shrink-0 text-sky-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg className="w-4 h-4 shrink-0 text-sky-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  );
}

function IconMapPin() {
  return (
    <svg className="w-4 h-4 shrink-0 text-sky-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

function IconCheckCircle() {
  return (
    <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function IconX() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function IconBookOpen() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18c-2.305 0-4.408.867-6 2.292m0-14.25v14.25" />
    </svg>
  );
}

/* ──────────────────────────────────────────
   Types & Data
   ────────────────────────────────────────── */
interface PelatihanItem {
  id: number;
  title: string;
  category: "komunikasi" | "pemasaran" | "cyber" | "data" | "cloud";
  categoryLabel: string;
  description: string;
  jadwal: string;
  durasi: string;
  kuota: number;
  terisi: number;
  status: "Dibuka" | "Penuh" | "Segera Dibuka";
  level: "Dasar" | "Menengah" | "Lanjutan";
  metode: string;
  lokasi: string;
  silabus: string[];
  persyaratan: string[];
}

const pelatihanList: PelatihanItem[] = [
  {
    id: 1,
    title: "Literasi Digital & Etika Komunikasi Publik",
    category: "komunikasi",
    categoryLabel: "Komunikasi Digital",
    description:
      "Pelatihan komprehensif bagi ASN dan pelayan publik dalam mengelola komunikasi publik resmi, keamanan akun instansi, hingga etika bermedia sosial.",
    jadwal: "28 Jul — 30 Jul 2026",
    durasi: "3 Hari (24 JP)",
    kuota: 60,
    terisi: 47,
    status: "Dibuka",
    level: "Dasar",
    metode: "Tatap Muka",
    lokasi: "Lab Komputer A, BBLSDM Komdigi Medan",
    silabus: [
      "Prinsip dasar keamanan akun & perlindungan data publik",
      "Etika komunikasi publik dan manajemen krisis di media sosial",
      "Pemanfaatan tools produktivitas cloud terenkripsi",
      "Praktik penyusunan konten informasi publik yang efektif",
    ],
    persyaratan: [
      "ASN / Perangkat Desa / Pegawai Layanan Publik",
      "Membawa laptop pribadi dengan browser versi terbaru",
      "Membawa surat tugas dari instansi pengutus",
    ],
  },
  {
    id: 2,
    title: "Digital Marketing & Social Media Strategy",
    category: "pemasaran",
    categoryLabel: "Pemasaran Digital",
    description:
      "Formulasi strategi pemasaran digital terintegrasi — mencakup riset audiens target, copywriting persuasif, iklan berbayar (Meta & Google Ads), serta analisis analitik.",
    jadwal: "4 Ags — 8 Ags 2026",
    durasi: "5 Hari (40 JP)",
    kuota: 50,
    terisi: 50,
    status: "Penuh",
    level: "Menengah",
    metode: "Tatap Muka",
    lokasi: "Lab Komputer B, BBLSDM Komdigi Medan",
    silabus: [
      "Digital Marketing Funnel & Audience Targeting Strategy",
      "Copywriting & Content Production untuk Media Sosial",
      "Pengenalan Google Ads & Meta Business Suite",
      "Analisis Performa Kampanye & ROI Marketing",
    ],
    persyaratan: [
      "Pelaku UMKM / Profesional Komunikasi / Umum",
      "Memiliki akun media sosial bisnis / aktif",
      "Membawa laptop dan perangkat smartphone",
    ],
  },
  {
    id: 3,
    title: "Keamanan Siber & Respons Insiden Siber",
    category: "cyber",
    categoryLabel: "Cyber Security",
    description:
      "Workshop teknis mengidentifikasi celah keamanan, mitigasi serangan malware/phishing, manajemen kredensial, serta prosedur incident response standar pemerintah.",
    jadwal: "11 Ags — 13 Ags 2026",
    durasi: "3 Hari (24 JP)",
    kuota: 45,
    terisi: 19,
    status: "Dibuka",
    level: "Dasar",
    metode: "Tatap Muka",
    lokasi: "Cyber Security Lab, BBLSDM Medan",
    silabus: [
      "Anatomi serangan siber modern (Phishing, Ransomware, Social Engineering)",
      "Penerapan audit keamanan password & Multi-Factor Authentication",
      "Pengenalan tools analisis trafik & deteksi anomali jaringan",
      "Prosedur standar penanganan dan pelaporan insiden keamanan siber",
    ],
    persyaratan: [
      "Pengelola IT / Pengelola Sistem Informasi Instansi",
      "Memahami dasar-dasar jaringan komputer",
      "Membawa laptop (RAM min. 8GB disarankan)",
    ],
  },
  {
    id: 4,
    title: "Analisis Data & Visualisasi dengan Python",
    category: "data",
    categoryLabel: "Data & AI",
    description:
      "Teknik pengolahan data mentah menggunakan Python (Pandas, Matplotlib, Seaborn) untuk menghasilkan dashboard interaktif pendukung keputusan strategis.",
    jadwal: "25 Ags — 29 Ags 2026",
    durasi: "5 Hari (40 JP)",
    kuota: 35,
    terisi: 8,
    status: "Dibuka",
    level: "Menengah",
    metode: "Tatap Muka",
    lokasi: "Lab Data Science BBLSDM Komdigi Medan",
    silabus: [
      "Pemrograman Dasar Python untuk Analisis Data",
      "Data Cleaning, Wrangling & Transformation dengan Pandas",
      "Exploratory Data Analysis (EDA) & Statistik Deskriptif",
      "Visualisasi Data Interaktif & Penyusunan Executive Dashboard",
    ],
    persyaratan: [
      "Staf Analis Data / Peneliti / Umum",
      "Memahami konsep dasar logika pemrograman atau spreadsheet",
      "Membawa laptop dengan Python/Jupyter Notebook terinstall",
    ],
  },
  {
    id: 5,
    title: "UI/UX Design & Prototyping Layanan Publik",
    category: "cloud",
    categoryLabel: "Desain Digital",
    description:
      "Metodologi User-Centered Design untuk merancang antarmuka aplikasi publik yang intuitif, inklusif, dan sesuai standar aksesibilitas digital.",
    jadwal: "8 Sep — 10 Sep 2026",
    durasi: "3 Hari (24 JP)",
    kuota: 40,
    terisi: 3,
    status: "Dibuka",
    level: "Dasar",
    metode: "Tatap Muka",
    lokasi: "Lab Multimedia BBLSDM Komdigi Medan",
    silabus: [
      "Prinsip dasar UI/UX Design & User Research Methodology",
      "Information Architecture & Wireframing",
      "High-Fidelity Prototyping menggunakan Figma",
      "Usability Testing & Evaluasi Aksesibilitas Antarmuka",
    ],
    persyaratan: [
      "Desainer Antarmuka / Pengembang Web / UMKM / Umum",
      "Memiliki akun Figma (Gratis)",
      "Membawa laptop dengan koneksi internet stabil",
    ],
  },
  {
    id: 6,
    title: "Cloud Architecture & DevOps Deployment",
    category: "cloud",
    categoryLabel: "Cloud & DevOps",
    description:
      "Arsitektur cloud e-government, kontainerisasi aplikasi dengan Docker, orkestrasi Kubernetes, serta implementasi CI/CD pipeline otomatis.",
    jadwal: "22 Sep — 26 Sep 2026",
    durasi: "5 Hari (40 JP)",
    kuota: 30,
    terisi: 0,
    status: "Segera Dibuka",
    level: "Lanjutan",
    metode: "Tatap Muka",
    lokasi: "Lab Infrastruktur BBLSDM Komdigi Medan",
    silabus: [
      "Dasar Cloud Infrastructure (AWS / GCP / Cloud Lokal)",
      "Containerization Aplikasi berbasis Docker & Docker Compose",
      "Konfigurasi CI/CD Pipeline untuk Otomasi Deployment",
      "Monitoring, Logging & Scaling Infrastruktur Cloud",
    ],
    persyaratan: [
      "DevOps Engineer / System Administrator / Developer",
      "Memahami perintah dasar Linux terminal & Command Line",
      "Membawa laptop dengan spesifikasi tinggi (RAM 16GB disarankan)",
    ],
  },
];

const categoryTabs = [
  { id: "semua", label: "Semua Kategori" },
  { id: "komunikasi", label: "Komunikasi Digital" },
  { id: "pemasaran", label: "Pemasaran Digital" },
  { id: "cyber", label: "Cyber Security" },
  { id: "data", label: "Data & AI" },
  { id: "cloud", label: "Cloud & DevOps" },
];

export default function PelatihanPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("semua");
  const [activeStatus, setActiveStatus] = useState("semua");
  const [selectedPelatihan, setSelectedPelatihan] = useState<PelatihanItem | null>(null);

  // Filtering logic
  const filteredList = pelatihanList.filter((p) => {
    const matchCategory = activeCategory === "semua" || p.category === activeCategory;
    const matchStatus = activeStatus === "semua" || p.status === activeStatus;
    const matchSearch =
      searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchStatus && matchSearch;
  });

  const totalKuota = pelatihanList.reduce((s, p) => s + p.kuota, 0);
  const totalTerdaftar = pelatihanList.reduce((s, p) => s + p.terisi, 0);
  const totalDibuka = pelatihanList.filter((p) => p.status === "Dibuka").length;

  return (
    <>
      <PageHeader
        title="Pelatihan"
        subtitle="Jadwal program pelatihan kompetensi digital semester II tahun 2026"
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Layanan", href: "#" },
          { label: "Pelatihan" },
        ]}
        className="pt-28 pb-19 sm:pt-32 sm:pb-23"
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* Banner Pengantar & Highlight Stats */}
        <div className="bg-linear-to-r from-navy via-navy-light to-navy rounded-2xl p-6 sm:p-8 text-white shadow-xl mb-10 relative overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          
          <div className="relative z-10 grid lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-accent/20 text-sky-accent text-xs font-semibold uppercase tracking-wider border border-sky-accent/30">
                <span>Program APBN Kementerian Komdigi</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold leading-snug">
                Pelatihan Kompetensi Digital Gratis &amp; Bersertifikat Resmi
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Tingkatkan kecakapan teknis Anda melalui program pelatihan tatap muka di BBLSDM Komdigi Medan. Dibiayai penuh oleh APBN tanpa dipungut biaya apapun.
              </p>
            </div>

            <div className="lg:col-span-5 grid grid-cols-3 gap-3">
              <button
                onClick={() => { setActiveStatus("semua"); setActiveCategory("semua"); }}
                className={`p-3.5 rounded-xl border text-center transition-all duration-200 ${
                  activeStatus === "semua"
                    ? "bg-white/15 border-sky-accent text-white shadow-lg"
                    : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                }`}
              >
                <p className="text-xl sm:text-2xl font-bold text-white leading-none">{pelatihanList.length}</p>
                <p className="text-[11px] text-slate-300 mt-1">Total Program</p>
              </button>

              <button
                onClick={() => setActiveStatus("Dibuka")}
                className={`p-3.5 rounded-xl border text-center transition-all duration-200 ${
                  activeStatus === "Dibuka"
                    ? "bg-sky-accent/25 border-sky-accent text-white shadow-lg"
                    : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                }`}
              >
                <p className="text-xl sm:text-2xl font-bold text-sky-accent leading-none">{totalDibuka}</p>
                <p className="text-[11px] text-slate-300 mt-1">Masih Dibuka</p>
              </button>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-center">
                <p className="text-xl sm:text-2xl font-bold text-amber-400 leading-none">{totalTerdaftar}/{totalKuota}</p>
                <p className="text-[11px] text-slate-300 mt-1">Peserta</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar Interaktif */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <IconSearch />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama pelatihan atau kata kunci..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-navy placeholder:text-slate-400 focus:border-sky-accent focus:ring-2 focus:ring-sky-accent/20 outline-none transition-all duration-200 bg-slate-50/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-navy"
                >
                  <IconX />
                </button>
              )}
            </div>

            {/* Status Filter Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 shrink-0">
              <span className="text-xs font-semibold text-text-muted shrink-0 mr-1">Status:</span>
              {[
                { id: "semua", label: "Semua" },
                { id: "Dibuka", label: "Dibuka" },
                { id: "Penuh", label: "Penuh" },
                { id: "Segera Dibuka", label: "Segera Dibuka" },
              ].map((st) => (
                <button
                  key={st.id}
                  onClick={() => setActiveStatus(st.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                    activeStatus === st.id
                      ? "bg-navy text-white shadow-sm"
                      : "bg-slate-100 text-text-muted hover:bg-slate-200 hover:text-navy"
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100 no-scrollbar">
            {categoryTabs.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                  activeCategory === cat.id
                    ? "bg-sky-primary text-white shadow-sm"
                    : "bg-slate-50 text-text-muted hover:bg-sky-accent/10 hover:text-sky-primary border border-slate-200/60"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Card Grid dengan Hover Akses Kiri Interaktif */}
        {filteredList.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200/80 shadow-sm">
            <p className="text-navy font-semibold text-base mb-1">Tidak ada pelatihan yang cocok</p>
            <p className="text-xs text-text-muted mb-4">Coba sesuaikan kata kunci pencarian atau filter kategori Anda.</p>
            <button
              onClick={() => { setSearchQuery(""); setActiveCategory("semua"); setActiveStatus("semua"); }}
              className="px-4 py-2 bg-sky-primary text-white text-xs font-medium rounded-lg hover:bg-sky-dark transition-colors"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredList.map((p) => {
              const pct = Math.min(Math.round((p.terisi / p.kuota) * 100), 100);
              
              // Status Pill styling
              const statusBadges = {
                Dibuka: "bg-emerald-50 text-emerald-700 border-emerald-200",
                Penuh: "bg-rose-50 text-rose-700 border-rose-200",
                "Segera Dibuka": "bg-amber-50 text-amber-700 border-amber-200",
              };

              const levelBadges = {
                Dasar: "bg-sky-50 text-sky-700 border-sky-200",
                Menengah: "bg-indigo-50 text-indigo-700 border-indigo-200",
                Lanjutan: "bg-purple-50 text-purple-700 border-purple-200",
              };

              return (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300 hover:-translate-y-1 transition-all duration-200 flex flex-col overflow-hidden"
                >
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Top Badges */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-sky-primary bg-sky-accent/10 px-2.5 py-0.5 rounded-md">
                          {p.categoryLabel}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${statusBadges[p.status]}`}>
                            {p.status}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${levelBadges[p.level]}`}>
                            {p.level}
                          </span>
                        </div>
                      </div>

                      {/* Judul Pelatihan */}
                      <h3 className="text-base font-bold text-navy leading-snug mb-2">
                        {p.title}
                      </h3>

                      {/* Deskripsi */}
                      <p className="text-xs text-text-muted leading-relaxed line-clamp-3 mb-5">
                        {p.description}
                      </p>

                      {/* Detail Rincian List */}
                      <div className="space-y-2 text-xs text-text-muted mb-5 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-2.5">
                          <IconCalendar />
                          <span className="font-medium text-navy">{p.jadwal}</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <IconClock />
                          <span>{p.durasi} ({p.metode})</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <IconMapPin />
                          <span className="truncate">{p.lokasi}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      {/* Progress Bar Kuota */}
                      <div className="mb-5">
                        <div className="flex justify-between items-center text-xs mb-1.5">
                          <span className="flex items-center gap-1 font-medium text-navy">
                            <IconUsers /> {p.terisi} / {p.kuota} Peserta
                          </span>
                          <span className="font-semibold text-sky-primary">{pct}%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/50">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              p.terisi >= p.kuota
                                ? "bg-marun"
                                : "bg-linear-to-r from-sky-primary to-sky-accent"
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setSelectedPelatihan(p)}
                          className="w-full py-2.5 px-3 rounded-xl border border-slate-200 hover:border-sky-accent hover:bg-sky-accent/5 text-navy hover:text-sky-primary text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5"
                        >
                          <IconBookOpen />
                          <span>Silabus</span>
                        </button>

                        <button
                          disabled={p.status !== "Dibuka"}
                          className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 shadow-sm ${
                            p.status === "Penuh"
                              ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                              : p.status === "Segera Dibuka"
                                ? "bg-amber-50 text-amber-700 cursor-not-allowed border border-amber-200"
                                : "bg-sky-primary hover:bg-sky-dark text-white hover:shadow-md active:scale-95"
                          }`}
                        >
                          {p.status === "Penuh"
                            ? "Kuota Penuh"
                            : p.status === "Segera Dibuka"
                              ? "Segera Dibuka"
                              : "Daftar Now"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Informasi Tambahan */}
        <div className="mt-14 bg-linear-to-br from-slate-50 via-white to-slate-50/80 rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-sky-accent/15 flex items-center justify-center text-sky-primary">
              <IconBookOpen />
            </div>
            <div>
              <h3 className="text-base font-bold text-navy">Ketentuan &amp; Informasi Pendaftaran</h3>
              <p className="text-xs text-text-muted">Harap perhatikan petunjuk teknis sebelum melakukan pendaftaran pelatihan</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 pt-2">
            {[
              { title: "Sertifikasi Resmi", desc: "Sertifikat diterbitkan secara digital oleh Kementerian Komunikasi dan Digital RI setelah memenuhi kriteria kelulusan." },
              { title: "Perangkat Praktik", desc: "Peserta diwajibkan membawa laptop pribadi yang telah terpasang software sesuai kebutuhan materi kelas." },
              { title: "Batas Kuota Sistem", desc: "Pendaftaran akan otomatis ditutup apabila kuota peserta kelas telah terpenuhi 100%." },
              { title: "Konfirmasi &amp; Tiket", desc: "Undangan dan lembar konfirmasi kelas dikirim melalui email terdaftar H-3 sebelum jadwal dimulai." },
            ].map((info, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200/60 shadow-2xs">
                <IconCheckCircle />
                <div>
                  <h4 className="text-xs font-bold text-navy mb-0.5">{info.title}</h4>
                  <p className="text-xs text-text-muted leading-relaxed">{info.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Modal Dialog Detail & Silabus Pelatihan */}
      {selectedPelatihan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/60 backdrop-blur-xs transition-all duration-300 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 relative overflow-hidden">
            {/* Header Modal */}
            <div className="bg-linear-to-r from-navy to-navy-light p-6 text-white relative">
              <button
                onClick={() => setSelectedPelatihan(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <IconX />
              </button>
              <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-sky-accent/20 text-sky-accent px-2.5 py-0.5 rounded mb-2">
                {selectedPelatihan.categoryLabel}
              </span>
              <h3 className="text-lg font-bold text-white leading-snug pr-6">
                {selectedPelatihan.title}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Level: {selectedPelatihan.level} • {selectedPelatihan.durasi}
              </p>
            </div>

            {/* Content Modal */}
            <div className="p-6 space-y-5">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-navy mb-2">Deskripsi Program</h4>
                <p className="text-xs text-text-muted leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {selectedPelatihan.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-navy mb-2">Silabus Pembelajaran</h4>
                <div className="space-y-2">
                  {selectedPelatihan.silabus.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-navy">
                      <IconCheckCircle />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-navy mb-2">Persyaratan Peserta</h4>
                <ul className="space-y-1.5">
                  {selectedPelatihan.persyaratan.map((req, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-text-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-accent shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] text-text-muted">Status Pendaftaran:</p>
                  <p className="text-xs font-bold text-navy">{selectedPelatihan.status} ({selectedPelatihan.terisi}/{selectedPelatihan.kuota} Kuota)</p>
                </div>
                <button
                  disabled={selectedPelatihan.status !== "Dibuka"}
                  onClick={() => {
                    alert(`Pendaftaran untuk ${selectedPelatihan.title} berhasil dibuka.`);
                    setSelectedPelatihan(null);
                  }}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                    selectedPelatihan.status === "Dibuka"
                      ? "bg-sky-primary hover:bg-sky-dark text-white"
                      : "bg-slate-100 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  {selectedPelatihan.status === "Dibuka" ? "Daftar Sekarang" : selectedPelatihan.status}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
