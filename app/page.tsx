"use client";

import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  // Service list for the card section
  const services = [
    {
      title: "Program Pelatihan & Sertifikasi",
      desc: "Kembangkan kompetensi digital Anda melalui pelatihan tersertifikasi nasional seperti Digital Talent Scholarship.",
      href: "/layanan/pelatihan",
      badge: "Hot",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      title: "Pengajuan Program Magang",
      desc: "Alur pendaftaran praktis bagi mahasiswa & siswa SMK untuk magang industri di lingkungan BBLSDM Komdigi Medan.",
      href: "/layanan/magang",
      badge: "Baru",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      title: "FAQ & Pusat Bantuan",
      desc: "Jawaban atas pertanyaan umum seputar program pelatihan, alur magang, publikasi riset, dan layanan kantor.",
      href: "/layanan/faq",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  // News list for alternating background section
  const news = [
    {
      title: "BBLSDM Komdigi Medan Gelar Pelatihan TIK bagi Aparatur Desa",
      date: "18 Juli 2026",
      category: "Berita",
      desc: "Upaya percepatan digitalisasi pelayanan publik pedesaan melalui pembekalan literasi data dan manajemen web desa.",
      href: "/informasi/berita",
    },
    {
      title: "Penerimaan Mahasiswa Magang Mandiri Gelombang II Dibuka",
      date: "10 Juli 2026",
      category: "Pengumuman",
      desc: "Kesempatan bagi mahasiswa aktif program studi Informatika, Komunikasi, dan Administrasi Publik untuk bergabung.",
      href: "/informasi/pengumuman",
    },
    {
      title: "Laporan Hasil Survey Indeks Kepuasan Masyarakat Triwulan II",
      date: "01 Juli 2026",
      category: "Pengumuman",
      desc: "Rilis resmi skor kepuasan layanan publik BBLSDM Komdigi Medan menunjukkan peningkatan ke angka 92.5%.",
      href: "/informasi/pengumuman",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <HeroBanner />

        {/* Services / Layanan Section */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <h2 className="text-xs font-bold tracking-widest text-[#0284c7] uppercase">Pusat Layanan Publik</h2>
              <p className="text-3xl font-extrabold tracking-tight text-[#0b1b3d] sm:text-4xl">
                Akses Layanan Utama Kami
              </p>
              <div className="w-16 h-1 bg-[#0284c7] mx-auto rounded-full mt-4"></div>
            </div>

            {/* Layout Grid Presisi */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((svc, i) => (
                <div
                  key={i}
                  className="relative group bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  {/* Accent vertical border left */}
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#38bdf8]"></div>
                  
                  <div className="p-8 space-y-4">
                    <div className="flex items-center justify-between">
                      {/* Icon */}
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-sky-50 text-[#0284c7] group-hover:bg-[#0284c7] group-hover:text-white transition-colors duration-300">
                        {svc.icon}
                      </div>
                      
                      {/* Highlight Badge */}
                      {svc.badge && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-yellow-400 text-slate-800 uppercase tracking-wide">
                          {svc.badge}
                        </span>
                      )}
                    </div>
                    
                    {/* Header Title */}
                    <h3 className="text-lg font-bold text-[#0b1b3d] group-hover:text-[#0284c7] transition-colors">
                      {svc.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {svc.desc}
                    </p>
                  </div>

                  {/* Footer Action Link */}
                  <div className="px-8 pb-8 pt-2">
                    <Link
                      href={svc.href}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#0284c7] hover:underline"
                    >
                      Selengkapnya 
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* News & Announcements (Alternating Bg) */}
        <section className="py-20 bg-slate-50 border-y border-slate-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div className="space-y-2">
                <h2 className="text-xs font-bold tracking-widest text-[#0284c7] uppercase">Informasi Terbaru</h2>
                <p className="text-2xl font-extrabold tracking-tight text-[#0b1b3d] sm:text-3xl">
                  Berita & Pengumuman Kantor
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Link
                  href="/informasi/berita"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-[#0284c7] hover:bg-sky-50 transition-colors border border-sky-200/60"
                >
                  Semua Berita
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Content List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {news.map((item, i) => (
                <article
                  key={i}
                  className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-2">
                      {/* Category Badge */}
                      <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        item.category === "Berita" 
                          ? "bg-sky-50 text-[#0284c7] border border-sky-100" 
                          : "bg-amber-50 text-amber-700 border border-amber-100"
                      }`}>
                        {item.category}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">{item.date}</span>
                    </div>

                    <h3 className="text-sm font-bold text-[#0b1b3d] leading-snug hover:text-[#0284c7] transition-colors line-clamp-2">
                      <Link href={item.href}>{item.title}</Link>
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="px-6 pb-6 pt-2">
                    <Link
                      href={item.href}
                      className="text-xs font-bold text-[#0b1b3d] hover:text-[#0284c7] flex items-center gap-1"
                    >
                      Baca Artikel
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Stats Section */}
        <section className="py-16 bg-[#0b1b3d] text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-yellow-400">12K+</div>
                <div className="text-xs font-bold uppercase tracking-widest text-slate-300">Trained Alumni</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-yellow-400">5+</div>
                <div className="text-xs font-bold uppercase tracking-widest text-slate-300">Provinsi Wilayah</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-yellow-400">45+</div>
                <div className="text-xs font-bold uppercase tracking-widest text-slate-300">Riset Publikasi</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-yellow-400">92.5%</div>
                <div className="text-xs font-bold uppercase tracking-widest text-slate-300">Indeks Kepuasan</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
