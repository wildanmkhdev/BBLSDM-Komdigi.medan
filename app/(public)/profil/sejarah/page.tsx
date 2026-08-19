"use client";

import Image from "next/image";
import PageHeader from "@/app/components/PageHeader";

export default function Sejarah() {
  const timelineMilestones = [
    {
      year: "1950-an",
      title: "Balai Penelitian Pers dan Pendapat Umum (BP3U)",
      desc: "Awal mula institusi berakar dari BP3U yang bertugas mengkaji dinamika komunikasi massa dan pers di Indonesia.",
    },
    {
      year: "2000-an",
      title: "Balai Besar Pengkajian dan Pengembangan Komunikasi dan Informatika (BBPPKI) Medan",
      desc: "Lembaga bertransformasi menjadi BBPPKI dengan fokus pada kegiatan pengkajian dan pengembangan sektor komunikasi regional.",
    },
    {
      year: "2017",
      title: "Balai Besar Pengembangan Sumber Daya Manusia dan Penelitian (BBPSDMP) Kominfo Medan",
      desc: "Berdasarkan Permenkominfo No. 19/2017, fungsi lembaga diperluas untuk mencakup pengembangan SDM bidang teknologi informasi dan komunikasi.",
    },
    {
      year: "2024 - Sekarang",
      title: "Balai Besar Pelatihan Sumber Daya Manusia Komunikasi dan Digital (BBLSDM Komdigi) Medan",
      desc: "Berubah sejalan dengan nomenklatur Kementerian Komunikasi dan Digital (Komdigi), lembaga ini kini berfokus secara penuh pada mencetak talenta digital kompeten melalui pelatihan dan sertifikasi.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="grow">
        {/* Banner Header */}
        <PageHeader
          title="Sejarah"
          subtitle="Perjalanan dedikasi dalam melatih keahlian digital bangsa dan menyediakan data riset TIK berkualitas tinggi di Pulau Sumatera"
          breadcrumbs={[
            { label: "Beranda", href: "/" },
            { label: "Profil", href: "#" },
            { label: "Sejarah" },
          ]}
          className="pt-28 pb-19 sm:pt-32 sm:pb-23"
        />

        {/* Narrative & Timeline Section */}
        <section className="py-20 bg-slate-50/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Text Narrative */}
              <div className="lg:col-span-7 space-y-6">
                <article className="prose prose-slate max-w-none text-slate-700 leading-relaxed font-sans text-sm sm:text-base space-y-6">
                  <p className="font-semibold text-lg sm:text-xl text-[#0b1b3d] leading-relaxed">
                    Balai Besar Pelatihan Sumber Daya Manusia Komunikasi dan Digital (BBLSDM Komdigi) Medan memiliki sejarah panjang yang berakar dari dinamika kelembagaan di bidang komunikasi dan informatika di Indonesia.
                  </p>
                  <p className="text-slate-600">
                    Lembaga ini awalnya dikenal sebagai Balai Penelitian Pers dan Pendapat Umum (BP3U), yang eksistensinya telah tercatat sejak tahun 1950-an. Seiring dengan perubahan struktur pemerintahan dan departemen terkait, instansi ini terus bertransformasi mengadaptasi tuntutan zaman.
                  </p>
                  <p className="text-slate-600">
                    Berbasis di jantung kota Medan, BBLSDM Komdigi Medan kini melayani wilayah kerja yang luas di pulau Sumatera, dan berperan strategis sebagai wadah utama dalam menyelenggarakan pelatihan, vokasi, dan pengujian sertifikasi untuk menghasilkan talenta digital yang berdaya saing global.
                  </p>
                </article>
              </div>

              {/* Featured Image */}
              <div className="lg:col-span-5">
                <div className="relative group rounded-2xl overflow-hidden border border-slate-200 bg-white p-3 shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-white">
                    <Image
                      src="/sejarah komdigi.png"
                      alt="Gedung BBLSDM Komdigi Medan 3D Model"
                      fill
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                      priority
                    />
                  </div>
                  <div className="mt-3 text-center border-t border-slate-100 pt-3">
                    <p className="text-xs font-bold text-[#0b1b3d]">Gedung BBLSDM Komdigi Medan</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Model 3D Representasi Digital Instansi</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chronological Timeline */}
            <div className="max-w-4xl mx-auto mt-28">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0b1b3d] text-center mb-16 relative pb-4 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-12 after:h-1 after:bg-[#0284c7] after:rounded">
                Garis Waktu Perjalanan Instansi
              </h2>
              <div className="space-y-12 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:w-0.5 before:bg-slate-200">
                {timelineMilestones.map((milestone, idx) => (
                  <div key={idx} className="relative flex flex-col sm:flex-row items-start sm:justify-between group">
                    <div className="absolute left-4 sm:left-1/2 w-4 h-4 bg-[#0284c7] rounded-full border-4 border-white shadow -translate-x-1.5 mt-1 z-10 group-hover:scale-125 transition-transform"></div>

                    <div className={`pl-10 sm:pl-0 w-full sm:w-[45%] ${idx % 2 === 0 ? "sm:order-1 sm:text-right" : "sm:order-3 sm:text-left"}`}>
                      <span className="inline-block px-3 py-1 rounded-md text-xs font-extrabold bg-[#0b1b3d] text-white tracking-wider mb-2">
                        {milestone.year}
                      </span>
                      <h3 className="text-base font-bold text-[#0b1b3d]">{milestone.title}</h3>
                    </div>

                    <div className="hidden sm:block w-[8%] sm:order-2"></div>

                    <div className={`pl-10 sm:pl-0 w-full sm:w-[45%] ${idx % 2 === 0 ? "sm:order-3 sm:text-left" : "sm:order-1 sm:text-right"}`}>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2 sm:mt-0">
                        {milestone.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
