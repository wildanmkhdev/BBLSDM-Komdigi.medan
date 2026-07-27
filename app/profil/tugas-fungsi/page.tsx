"use client";

import { useState } from "react";

/* ─────────────────────────────────────────────
   DATA — berdasarkan Permenkomdigi No. 3/2026
   ───────────────────────────────────────────── */
const fungsiList = [
  {
    id: "rencana",
    num: "a",
    title: "Penyusunan Rencana, Program, dan Anggaran",
    subtitle: "Perencanaan strategis & pengelolaan anggaran lembaga",
    color: "#0284c7",
    poin: [
      "Menyusun rencana kerja tahunan dan rencana strategis (Renstra) balai besar sesuai kebijakan kementerian",
      "Menyusun dan mengelola anggaran program pelatihan serta kegiatan operasional lembaga",
      "Mengoordinasikan penyusunan dokumen perencanaan dan penganggaran secara akuntabel",
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c.966 0 1.813.65 2.07 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
      </svg>
    ),
  },
  {
    id: "pelatihan",
    num: "b",
    title: "Pelaksanaan Pelatihan & Pemberdayaan Talenta",
    subtitle: "Pelatihan komunikasi, informasi, dan digital bagi SDM",
    color: "#0b1b3d",
    poin: [
      "Menyelenggarakan program pelatihan teknis dan manajerial di bidang komunikasi, informasi, dan digital",
      "Melaksanakan program pemberdayaan talenta digital untuk ASN, pelaku industri, dan masyarakat",
      "Mengembangkan metode pembelajaran inovatif termasuk e-learning dan blended learning",
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    id: "mutu",
    num: "c",
    title: "Pelaksanaan Penjaminan Mutu Pelatihan",
    subtitle: "Standar kualitas & evaluasi penyelenggaraan pelatihan",
    color: "#0ea5e9",
    poin: [
      "Menetapkan dan memantau standar mutu penyelenggaraan pelatihan secara berkala",
      "Melaksanakan evaluasi dan penilaian efektivitas program pelatihan yang diselenggarakan",
      "Menindaklanjuti hasil evaluasi untuk perbaikan berkelanjutan kualitas pelatihan",
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    id: "sertifikasi",
    num: "d",
    title: "Fasilitasi Sertifikasi Kompetensi Talenta",
    subtitle: "Uji kompetensi & sertifikasi profesional bidang komunikasi & digital",
    color: "#0284c7",
    poin: [
      "Memfasilitasi pelaksanaan uji kompetensi bagi talenta komunikasi dan digital",
      "Berkoordinasi dengan Lembaga Sertifikasi Profesi (LSP) untuk penyelenggaraan sertifikasi nasional",
      "Mengelola database peserta sertifikasi dan memastikan validitas sertifikat yang diterbitkan",
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    id: "administrasi",
    num: "e",
    title: "Pelaksanaan Urusan Administrasi & Tata Kelola",
    subtitle: "Keuangan, SDM, kearsipan, kehumasan & pelaporan kinerja",
    color: "#0b1b3d",
    poin: [
      "Mengelola urusan keuangan, sumber daya manusia, persuratan, tata usaha, dan kearsipan lembaga",
      "Melaksanakan fungsi kehumasan, kerja sama, serta pengelolaan sistem data dan informasi",
      "Menyelenggarakan manajemen risiko, kepatuhan internal, serta penyusunan evaluasi dan pelaporan kinerja",
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

/* ─────────────────────────────────────────────
   ACCORDION ITEM
   ───────────────────────────────────────────── */
function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: (typeof fungsiList)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`group border-b border-slate-100 transition-colors duration-200 ${isOpen ? "bg-slate-50/60" : "bg-white hover:bg-slate-50/40"}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-6 py-7 px-6 sm:px-10 text-left"
        aria-expanded={isOpen}
      >
        <span
          className="flex-shrink-0 text-4xl sm:text-5xl font-black leading-none select-none uppercase transition-colors duration-200"
          style={{ color: isOpen ? item.color : "#e2e8f0" }}
        >
          {item.num}
        </span>
        <span
          className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200"
          style={{ backgroundColor: isOpen ? `${item.color}15` : "#f1f5f9", color: isOpen ? item.color : "#94a3b8" }}
        >
          {item.icon}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-base sm:text-lg font-bold text-[#0b1b3d] leading-snug">{item.title}</p>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{item.subtitle}</p>
        </div>
        <svg
          className={`flex-shrink-0 w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-6 sm:px-10 pb-8">
          <div className="border-l-2 pl-6 sm:pl-8 ml-[calc(2.5rem+1.5rem+2.5rem+1.5rem)] space-y-3" style={{ borderColor: `${item.color}40` }}>
            {item.poin.map((p, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                <p className="text-sm text-slate-600 leading-relaxed">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────── */
export default function TugasFungsiPage() {
  const [openId, setOpenId] = useState<string | null>("pelatihan");
  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-grow">

        {/* ─── Header ─── */}
        <section className="bg-slate-50 border-b border-slate-100 py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 pb-10 border-b border-slate-200">
              <div className="space-y-2">
                <p className="text-[11px] font-bold tracking-[0.2em] text-[#0284c7] uppercase">Profil Lembaga</p>
                <h1 className="text-3xl sm:text-4xl font-black text-[#0b1b3d] leading-tight">Tugas &amp; Fungsi</h1>
                <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
                  Berdasarkan Peraturan Menteri Komunikasi dan Digital Republik Indonesia Nomor 3 Tahun 2026.
                </p>
              </div>
              <div className="flex items-center gap-6 flex-shrink-0">
                <div className="text-center">
                  <p className="text-2xl font-black text-[#0b1b3d]">1</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mt-0.5">Tugas Pokok</p>
                </div>
                <div className="w-px h-8 bg-slate-200" />
                <div className="text-center">
                  <p className="text-2xl font-black text-[#0b1b3d]">5</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mt-0.5">Fungsi Utama</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Tugas Pokok Highlight ─── */}
        <section className="bg-white pt-10 pb-2">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-2xl overflow-hidden bg-[#0b1b3d] px-8 sm:px-12 py-9">
              <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#0284c7] flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] font-bold tracking-[0.2em] text-[#38bdf8] uppercase mb-1">Tugas Pokok</p>
                  <p className="text-base sm:text-lg font-bold text-white leading-relaxed">
                    Melaksanakan pelatihan di bidang{" "}
                    <span className="text-[#38bdf8]">komunikasi, informasi, dan digital</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Fungsi Accordion ─── */}
        <section className="py-6 bg-white">
          <div className="mx-auto max-w-6xl px-0 sm:px-6 lg:px-8">
            <div className="hidden sm:flex items-center gap-3 px-10 py-5 border-b border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Klik fungsi untuk melihat penjabaran
              </span>
            </div>
            <div className="divide-y divide-slate-100 border-b border-slate-100">
              {fungsiList.map((item) => (
                <AccordionItem key={item.id} item={item} isOpen={openId === item.id} onToggle={() => toggle(item.id)} />
              ))}
            </div>
            <div className="flex items-center gap-3 px-6 sm:px-10 py-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7] flex-shrink-0" />
              <p className="text-xs text-slate-400 leading-relaxed">
                Berdasarkan Peraturan Menteri Komunikasi dan Digital Republik Indonesia Nomor 3 Tahun 2026 tentang Organisasi dan Tata Kerja Unit Pelaksana Teknis Bidang Pengembangan Sumber Daya Manusia Komunikasi dan Digital.
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
