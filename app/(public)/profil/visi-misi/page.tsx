"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PageHeader from "@/app/components/PageHeader";
import {
  GraduationCap,
  FileSearch,
  Users,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

export default function VisiMisi() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const misiItems = [
    {
      num: "01",
      title: "Peningkatan Kualitas SDM Digital",
      desc: "Menyelenggarakan program pelatihan, sertifikasi profesi nasional, dan pembekalan literasi digital yang inklusif untuk menghasilkan talenta digital yang kompeten dan siap kerja.",
      tag: "Pengembangan Talenta",
      icon: GraduationCap,
      color: "from-blue-500 to-sky-400",
    },
    {
      num: "02",
      title: "Riset Kebijakan TIK Berkualitas",
      desc: "Melaksanakan penelitian, kajian ilmiah, serta survei komprehensif di bidang komunikasi dan teknologi informasi guna memberikan rekomendasi kebijakan publik berbasis bukti (evidence-based policy).",
      tag: "Riset & Analisis",
      icon: FileSearch,
      color: "from-[#0b1b3d] to-blue-600",
    },
    {
      num: "03",
      title: "Kemitraan Strategis Pentahelix",
      desc: "Membangun jejaring kolaborasi harmonis dengan instansi pemerintah daerah, pelaku industri teknologi, universitas/akademisi, komunitas digital, dan media massa di wilayah regional.",
      tag: "Kolaborasi Publik",
      icon: Users,
      color: "from-sky-500 to-indigo-600",
    },
    {
      num: "04",
      title: "Tata Kelola Pemerintahan Bersih",
      desc: "Menerapkan prinsip tata pamong perkantoran modern yang transparan, akuntabel, efisien, dan berbasis Sistem Pemerintahan Berbasis Elektronik (SPBE) guna pelayanan publik prima.",
      tag: "Good Governance",
      icon: ShieldCheck,
      color: "from-emerald-500 to-teal-600",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="grow">

        {/* Page Header Banner */}
        <PageHeader
          title="Visi dan Misi"
          subtitle="Landasan filosofis dan pedoman aksi strategis BBLSDM Komdigi Medan dalam mempercepat agenda transformasi masyarakat digital"
          breadcrumbs={[
            { label: "Beranda", href: "/" },
            { label: "Profil", href: "#" },
            { label: "Visi dan Misi" },
          ]}
          className="pt-28 pb-19 sm:pt-32 sm:pb-23"
        />

        {/* Vision Statement (Highlight container — UNSTOUCHED) */}
        <section className="py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden bg-linear-to-r from-[#0b1b3d] to-[#122e66] text-white rounded-2xl shadow-xl p-8 sm:p-12 md:p-16 border-l-8 border-[#38bdf8]">
              
              {/* Abs grid pattern */}
              <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-size-[16px_16px]" />
              
              <div className="relative z-10 max-w-3xl space-y-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 uppercase">
                  Visi Instansi
                </span>
                
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight text-white tracking-tight">
                  “Mewujudkan Sumber Daya Maanusia Bidang Komunikasi dan Informatika yang Unggul, Inovatif, dan Berkarakter di Wilayah Kerja Sumatera Utara dan Sekitarnya.”
                </h2>
                
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                  Dirumuskan sejalan dengan peta jalan transformasi digital kementerian untuk mengintegrasikan potensi regional ke dalam arus pertumbuhan ekonomi digital nasional yang merdeka dan berkepribadian.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section — Aceternity UI "Card Hover Effect" Component */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

            {/* Section Header */}
            <div className="mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-slate-100 pb-10">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#0284c7]" />
                  <p className="text-[11px] font-bold tracking-[0.2em] text-[#0284c7] uppercase">
                    Aksi Strategis Organisasi
                  </p>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b1b3d] leading-tight tracking-tight">
                  Misi Utama BBLSDM Komdigi
                </h2>
              </div>
              <p className="text-sm text-slate-500 max-w-xs leading-relaxed sm:text-right">
                Empat pilar aksi strategis yang dirancang untuk mewujudkan target transformasi digital nasional.
              </p>
            </div>

            {/* Aceternity UI Card Hover Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 relative">
              {misiItems.map((misi, idx) => {
                const IconComponent = misi.icon;

                return (
                  <div
                    key={misi.num}
                    className="relative group block p-2 h-full w-full"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <AnimatePresence>
                      {hoveredIndex === idx && (
                        <motion.span
                          className="absolute inset-0 h-full w-full bg-slate-100/80 dark:bg-[#0284c7]/5 block rounded-3xl"
                          layoutId="hoverBackground"
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: 1,
                            transition: { duration: 0.15 },
                          }}
                          exit={{
                            opacity: 0,
                            transition: { duration: 0.15, delay: 0.2 },
                          }}
                        />
                      )}
                    </AnimatePresence>

                    <div className="rounded-2xl h-full w-full p-8 overflow-hidden bg-white border border-slate-200/80 shadow-xs group-hover:border-[#0284c7]/40 group-hover:shadow-lg transition-all duration-300 relative z-20 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-[#0284c7]/10 group-hover:border-[#0284c7]/20 flex items-center justify-center transition-colors duration-300">
                            <IconComponent className="w-6 h-6 text-[#0b1b3d] group-hover:text-[#0284c7] transition-colors duration-300" />
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-600 group-hover:bg-[#0284c7]/10 group-hover:text-[#0284c7] transition-colors duration-300">
                              {misi.tag}
                            </span>
                            <span className="text-2xl font-black text-slate-200 group-hover:text-[#0284c7]/40 transition-colors duration-300 tabular-nums">
                              {misi.num}
                            </span>
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-[#0b1b3d] group-hover:text-[#0284c7] transition-colors duration-300 leading-snug tracking-tight mb-3">
                          {misi.title}
                        </h3>

                        <p className="text-sm text-slate-500 leading-relaxed font-normal">
                          {misi.desc}
                        </p>
                      </div>

                      <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-400 group-hover:text-[#0284c7] transition-colors duration-300">
                        <span>Pilar Misi #{misi.num}</span>
                        <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-14 pt-8 border-t border-slate-100 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#0284c7] shrink-0" />
              <p className="text-xs text-slate-400 leading-relaxed">
                Seluruh misi ini dijabarkan dalam Rencana Strategis (Renstra) BBLSDM Komdigi Medan dan dilaksanakan secara terukur sesuai Indikator Kinerja Utama (IKU) instansi.
              </p>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
}
