"use client";

import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  // Service list for the card section
  // Hoax Clarification list (taken from UPT Medan and official Komdigi style)
  const hoaxList = [
    {
      title: "Surat Undangan Pelatihan Mengatasnamakan UPT BBLSDM Komdigi Medan Meminta Biaya Akomodasi Agen Perjalanan",
      date: "21 Juli 2026",
      status: "HOAKS",
      fact: "Seluruh program pelatihan resmi (seperti GTA, DTS) dibiayai penuh oleh DIPA Kementerian Komunikasi dan Digital RI. Peserta tidak dipungut biaya apa pun termasuk biaya reservasi agen perjalanan resmi.",
    },
    {
      title: "Akun WhatsApp Palsu Menggunakan Profil Kepala BBLSDM Komdigi Medan Menawarkan Insentif Bantuan Modal Usaha",
      date: "18 Juli 2026",
      status: "HOAKS",
      fact: "BBLSDM Komdigi Medan tidak memiliki program penyaluran modal usaha mandiri secara langsung, dan pejabat instansi tidak pernah menghubungi masyarakat menggunakan akun chat pribadi WhatsApp untuk menawarkan insentif keuangan.",
    },
    {
      title: "Penawaran Program Lowongan Kerja Magang Berbayar Administrasi Kantor BBLSDM Komdigi Medan",
      date: "12 Juli 2026",
      status: "HOAKS",
      fact: "Penerimaan program magang industri/PKL di lingkungan BBLSDM Komdigi Medan bersifat gratis. Pengajuan resmi hanya dilakukan melalui surat rekomendasi sekolah/kampus dan portal resmi bpsdm.komdigi.go.id.",
    },
  ];

  // News list with UPT Medan contents and real-looking images (official Komdigi style)
  const newsList = [
    {
      title: "BBLSDM Komdigi Medan Tingkatkan Kompetensi Digital Aparatur Sipil Negara (ASN) Provinsi Sumatra Utara",
      date: "20 Juli 2026",
      category: "Berita Utama",
      desc: "Balai Besar Pengembangan Sumber Daya Manusia dan Penelitian Komunikasi dan Informatika (BBLSDM Komdigi) Medan menyelenggarakan bimbingan teknis peningkatan kompetensi literasi digital bagi ratusan ASN di Sumatera Utara guna mendukung perluasan Sistem Pemerintahan Berbasis Elektronik (SPBE).",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop",
      href: "/informasi/berita",
    },
    {
      title: "Pelatihan Digital Entrepreneurship Academy (DEA) Sukses Digelar di Kabupaten Karo",
      date: "18 Juli 2026",
      category: "Kegiatan UPT",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
      href: "/informasi/berita",
    },
    {
      title: "Rilis Hasil Riset Indeks Masyarakat Digital Indonesia (IMDI) Wilayah Sumatera Utara 2026",
      date: "15 Juli 2026",
      category: "Rilis Riset",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
      href: "/publikasi/penelitian",
    },
    {
      title: "Penerimaan Mahasiswa Magang Industri Gelombang Ke-II BBLSDM Komdigi Medan",
      date: "10 Juli 2026",
      category: "Pengumuman",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
      href: "/layanan/magang",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <HeroBanner />

        {/* Hoax Clarification / Isu Hangat Section (Clean Official Komdigi Style) */}
       

        {/* News & Announcements (Official Komdigi Layout) */}
        <section className="py-20 bg-slate-50 border-b border-slate-200/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
            {/* Header section similar to komdigi.go.id */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-200">
              <div className="space-y-1">
                <h2 className="text-xs font-bold tracking-widest text-[#0284c7] uppercase">Kilas Informasi</h2>
                <p className="text-2xl font-extrabold tracking-tight text-[#0b1b3d] sm:text-3xl">
                  Berita Terkini &amp; Pengumuman
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Link
                  href="/informasi/berita"
                  className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#0284c7] hover:underline"
                >
                  Lihat Semua Berita 
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Layout Grid: Large article on the left (7/12 cols), 3 list articles on the right (5/12 cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Featured Main News (Index 0) */}
              <div className="lg:col-span-7 flex flex-col space-y-4">
                <Link href={newsList[0].href} className="group block overflow-hidden rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-[16/9] w-full overflow-hidden bg-slate-100 relative">
                    <img
                      src={newsList[0].image}
                      alt={newsList[0].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-sky-50 text-[#0284c7] border border-sky-100">
                        {newsList[0].category}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">{newsList[0].date}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-[#0b1b3d] group-hover:text-[#0284c7] transition-colors leading-snug">
                      {newsList[0].title}
                    </h3>
                    
                    <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
                      {newsList[0].desc}
                    </p>
                    
                    <div className="pt-2 flex items-center text-xs font-bold text-[#0284c7] group-hover:underline">
                      Baca Selengkapnya
                      <svg className="w-3.5 h-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Right Column: List of 3 smaller horizontal news (Indices 1, 2, 3) */}
              <div className="lg:col-span-5 flex flex-col space-y-6">
                {newsList.slice(1).map((item, idx) => (
                  <div 
                    key={idx} 
                    className="flex flex-col sm:flex-row gap-4 border-b border-slate-200/60 pb-6 last:border-0 last:pb-0"
                  >
                    {/* Small Image */}
                    <Link href={item.href} className="group block shrink-0 w-full sm:w-28 aspect-[4/3] rounded-lg overflow-hidden bg-slate-100">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                    
                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between py-0.5">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                            {item.category}
                          </span>
                          <span className="text-[10px] text-slate-400">•</span>
                          <span className="text-[10px] text-slate-400 font-medium">{item.date}</span>
                        </div>
                        <h4 className="text-sm font-bold text-[#0b1b3d] hover:text-[#0284c7] leading-snug transition-colors line-clamp-2">
                          <Link href={item.href}>{item.title}</Link>
                        </h4>
                      </div>
                      
                      <div className="mt-2">
                        <Link href={item.href} className="inline-flex items-center text-[11px] font-bold text-[#0284c7] hover:underline">
                          Selengkapnya
                          <svg className="w-3 h-3 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* Quick Stats Section */}
       
      </main>

      <Footer />
    </div>
  );
}
