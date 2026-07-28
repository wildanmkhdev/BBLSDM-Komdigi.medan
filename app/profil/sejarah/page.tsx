"use client";

import Image from "next/image";
import PageHeader from "@/app/components/PageHeader";

export default function Sejarah() {
  const timelineMilestones = [
    {
      year: "1945 - 1999",
      title: "Departemen Penerangan RI",
      desc: "Awal mula institusi komunikasi negara berakar dari Departemen Penerangan yang didirikan pada 19 Agustus 1945 sebagai wadah penyebaran informasi nasional dan penyiaran publik.",
    },
    {
      year: "2001 - 2009",
      title: "Kementerian Komunikasi dan Informasi (Depkominfo)",
      desc: "Pembentukan Kementerian Negara Komunikasi dan Informasi yang menggabungkan Lembaga Informasi Nasional (LIN) dan Dirjen Pos dan Telekomunikasi menjadi Departemen Komunikasi dan Informatika (Depkominfo).",
    },
    {
      year: "2017",
      title: "Transformasi BBPSDMP Kominfo Medan",
      desc: "Berdasarkan Permenkominfo No. 19/2017, balai regional bertransformasi menjadi Balai Besar Pengembangan Sumber Daya Manusia dan Penelitian (BBPSDMP) Kominfo Medan yang menaungi 8 provinsi wilayah kerja di Sumatera.",
    },
    {
      year: "2024 - 2026",
      title: "Era Kementerian Komunikasi dan Digital (Komdigi)",
      desc: "Nomenklatur kementerian resmi berubah menjadi Kementerian Komunikasi dan Digital RI (Komdigi) untuk mempercepat transformasi digital, AI, siber, dan literasi digital, serta perubahan unit menjadi BBLSDM Komdigi Medan.",
    },
  ];

  const historicalPhotos = [
    {
      title: "Kunjungan Kerja Wamenkomdigi Nezar Patria",
      year: "2026",
      image: "/kunker-nezar/kunker-nezar-5.jpeg",
      description: "Tinjauan kerja dan pengarahan pimpinan kementerian di Balai Besar Pelatihan Sumber Daya Manusia Komunikasi dan Digital (BBLSDM Komdigi) Medan.",
    },
    {
      title: "Paparan Program Vokasi Digital Talent 2026",
      year: "2026",
      image: "/kunker-nezar/kunker-nezar-6.jpeg",
      description: "Evaluasi capaian program Digital Talent Scholarship (DTS) dan penyusunan modul pelatihan kecerdasan buatan bagi talenta muda Sumatera.",
    },
    {
      title: "Penguatan Sertifikasi Profesi Digital",
      year: "2026",
      image: "/kunker-nezar/kunker-nezar-7.jpeg",
      description: "Kordinasi pembinaan karir dan kesiapan asesor lisensi BNSP dalam mendukung pengujian sertifikasi bidang IT & komunikasi.",
    },
    {
      title: "Diskusi Pengembangan Kurikulum TIK",
      year: "2026",
      image: "/kunker-nezar/kunker-nezar-8.jpeg",
      description: "Sesi dialog mengenai integrasi materi AI, Cloud Computing, dan Cyber Security untuk aparatur daerah dan masyarakat umum.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-grow">
        {/* Banner Header */}
        <PageHeader
          title="Sejarah"
          subtitle="Perjalanan dedikasi dalam melatih keahlian digital bangsa dan menyediakan data riset TIK berkualitas tinggi di Pulau Sumatera"
          breadcrumbs={[
            { label: "Beranda", href: "/" },
            { label: "Profil", href: "#" },
            { label: "Sejarah" },
          ]}
        />

        {/* Narrative & Timeline Section */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <article className="prose prose-slate max-w-none text-slate-700 leading-relaxed font-sans text-sm sm:text-base space-y-6">
              <p className="font-medium text-lg text-[#0b1b3d] leading-relaxed">
                Berdiri di jantung kota Medan, Balai Besar Pengembangan Sumber Daya Manusia dan Penelitian Komunikasi dan Informatika (BBLSDM Komdigi) Medan telah melewati berbagai fase transformasi struktural penting untuk merespons laju teknologi informasi globaal.
              </p>
              <p>
                Sebagai Unit Pelaksana Teknis (UPT) di bawah Badan Pengembangan Sumber Daya Manusia Kementerian Komunikasi dan Digital Republik Indonesia, BBLSDM Komdigi Medan memiliki peranan strategis dalam memandu ekosistem digital nasional khususnya di wilayah Sumatera Utara, Aceh, Sumatera Barat, Riau, dan Kepulauan Riau.
              </p>
              <p>
                Melalui penggabungan fungsi pelatihan keahlian (diklat) serta penelitian (riset) komunikasi informatika, instansi secara berkelanjutan menyalurkan kontribusi nyata baik berupa penyiapan talenta digital kompeten (melalui sertifikasi nasional) maupun penyusunan rekomendasi kebijakan publik berbasis data riset ilmiah.
              </p>
            </article>

            {/* Chronological Timeline */}
            <div className="mt-20 space-y-12 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:w-0.5 before:bg-slate-200">
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
        </section>

        {/* Historical Photo Gallery Grid */}
        <section className="py-20 bg-slate-50 border-t border-slate-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
              <h2 className="text-xs font-bold tracking-widest text-[#0284c7] uppercase">Dokumentasi Visual</h2>
              <p className="text-2xl font-extrabold text-[#0b1b3d] sm:text-3xl">Galeri Sejarah Instansi</p>
              <div className="w-12 h-0.5 bg-[#0284c7] mx-auto rounded-full mt-3"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {historicalPhotos.map((photo, i) => (
                <div
                  key={i}
                  className="group bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div className="h-44 relative bg-slate-900 overflow-hidden">
                    <Image
                      src={photo.image}
                      alt={photo.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 text-[10px] font-bold bg-black/60 text-white px-2 py-0.5 rounded backdrop-blur-sm border border-white/10 uppercase tracking-wider z-10">
                      {photo.year}
                    </div>
                  </div>
                  
                  <div className="p-5 flex-grow flex flex-col justify-between space-y-3">
                    <div className="space-y-1">
                      <h3 className="text-xs font-bold text-[#0b1b3d] leading-snug group-hover:text-[#0284c7] transition-colors">
                        {photo.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {photo.description}
                      </p>
                    </div>
                    <div className="border-t border-slate-100 pt-3 text-[10px] font-bold text-[#0284c7] uppercase tracking-wide">
                      Dokumentasi Komdigi Medan
                    </div>
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
