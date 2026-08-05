import HeroBanner from "@/components/HeroBanner";
import FeaturedEventHero from "@/components/FeaturedEventHero";
import KomdigiStorySection from "@/components/KomdigiStorySection";
import HomeContactForm from "@/components/HomeContactForm";
import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { Banner, Media, Berita, KategoriBerita } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function Home() {
  // 1. Fetch active banners from DB
  let dbBanners: (Banner & { image: Media | null })[] = [];
  try {
    dbBanners = await prisma.banner.findMany({
      where: { isActive: true },
      include: { image: true },
      orderBy: { orderIndex: "asc" },
    });
  } catch (e) {
    console.error("Error fetching banners:", e);
  }

  // 2. Fetch popular news for Hero overlay
  let dbPopularNews: (Berita & { thumbnail: Media | null; kategori: KategoriBerita | null })[] = [];
  try {
    dbPopularNews = await prisma.berita.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { viewCount: "desc" },
      take: 4,
      include: { thumbnail: true, kategori: true },
    });
  } catch (e) {
    console.error("Error fetching popular news:", e);
  }

  // 3. Fetch latest news list for news section
  let dbNewsList: (Berita & { thumbnail: Media | null; kategori: KategoriBerita | null })[] = [];
  try {
    dbNewsList = await prisma.berita.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      take: 4,
      include: { thumbnail: true, kategori: true },
    });
  } catch (e) {
    console.error("Error fetching latest news:", e);
  }

  // Fallback news list if DB is empty
  const defaultNewsList = [
    {
      title: "Wamenkomdigi Nezar Patria Dorong BBLSDM Komdigi Medan Cetak Developer & Talenta Digital Unggul",
      date: "04 Juli 2026",
      category: "Kunjungan Kerja",
      desc: "Wakil Menteri Komunikasi dan Digital RI Nezar Patria melakukan kunjungan kerja ke BBLSDM Komdigi Medan. Beliau menegaskan pengembangan talenta digital merupakan pilar utama Renstra Kementerian Komdigi 2025-2029 'Terhubung, Tumbuh, dan Terjaga' agar Indonesia tidak hanya menjadi pasar melainkan pencipta teknologi.",
      image: "/kunker-nezar/kunker-nezar-1.jpeg",
      href: "/informasi/berita",
    },
    {
      title: "Penandatanganan Komitmen Strategis Penguatan SDM Digital Wilayah Sumatera",
      date: "04 Juli 2026",
      category: "Kegiatan UPT",
      desc: "Wamenkomdigi Nezar Patria didampingi Plt. Kepala BBLSDM Komdigi Medan Dr. Christiany Juditha merumuskan langkah taktis penguatan kapasitas digital di 8 provinsi wilayah kerja BBLSDM Medan.",
      image: "/kunker-nezar/kunker-nezar-2.jpeg",
      href: "/informasi/berita",
    },
    {
      title: "Rapat Koordinasi Strategis BBLSDM Komdigi Medan bersama Wamenkomdigi RI",
      date: "04 Juli 2026",
      category: "Rapat Koordinasi",
      desc: "Pembahasan capaian program Digital Talent Scholarship (DTS) dan perluasan kerja sama dengan pemerintah daerah serta perguruan tinggi di Sumatera.",
      image: "/kunker-nezar/kunker-nezar-3.jpeg",
      href: "/informasi/berita",
    },
    {
      title: "Evaluasi Kinerja & Sinergi Program Pelatihan SDM Komdigi Medan 2026",
      date: "04 Juli 2026",
      category: "Pengumuman",
      desc: "Jajaran pejabat dan pegawai BBLSDM Komdigi Medan berdiskusi langsung mengenai optimalisasi DIPA dan peningkatan kualitas layanan pelatihan kecerdasan artifisial dan digital marketing.",
      image: "/kunker-nezar/kunker-nezar-4.jpeg",
      href: "/layanan/pelatihan",
    },
  ];

  const newsList = dbNewsList.length > 0
    ? (dbNewsList as Array<{ title: string; publishedAt?: Date; excerpt?: string; summary?: string; kategori?: { name?: string }; thumbnail?: { publicUrl?: string } }>).map((n) => ({
        title: n.title,
        date: n.publishedAt ? new Date(n.publishedAt).toLocaleDateString("id-ID") : "Baru saja",
        category: n.kategori?.name || "Berita",
        desc: n.excerpt || "",
        image: n.thumbnail?.publicUrl || "/logo komdigi.png",
        href: `/informasi/berita`,
      }))
    : defaultNewsList;

  return (
    <>
      <main className="flex-grow">
        {/* Hero Sections */}
        <HeroBanner
          initialSlides={dbBanners}
          popularNewsList={dbPopularNews.map((n) => ({
            ...n,
            viewCount: Number(n.viewCount),
          }))}
        />

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
                    <Image
                      src={newsList[0].image}
                      alt={newsList[0].title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
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
                    <Link href={item.href} className="group block shrink-0 w-full sm:w-28 aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 relative">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 112px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
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

        {/* Featured Event / Activity Hero Section (NASA Style Banner) */}
        <div>
          <FeaturedEventHero />
        </div>

        {/* Story / Image Of The Day Section (NASA Style Image Feature) */}
        <div>
          <KomdigiStorySection />
        </div>

        {/* Contact Section */}
        <section id="kontak" className="py-24 bg-white relative overflow-hidden border-t border-slate-200/60">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-50/50 via-white to-white -z-10 pointer-events-none"></div>
          
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">

              <h3 className="text-3xl font-extrabold text-[#0b1b3d] sm:text-4xl tracking-tight">Hubungi Kami</h3>
              <p className="mt-4 text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
                Punya pertanyaan seputar program pelatihan, magang, atau kerja sama? Tim BBLSDM Komdigi Medan siap membantu Anda dengan layanan yang cepat dan responsif.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              
              {/* Contact Info (Left Column) */}
              <div className="lg:col-span-5 space-y-8 h-full">
                <div className="bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-100 shadow-sm h-full">
                   <h4 className="text-xl font-bold text-[#0b1b3d] mb-8 border-b border-slate-200/80 pb-4">Informasi Kontak</h4>
                   
                   <div className="space-y-8">
                     <a 
                       href="https://maps.google.com/?q=BBLSDM+Komdigi+Medan+Jl.+Tombak+No.+24+Medan" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       title="Buka lokasi kantor di Google Maps"
                       className="flex items-start gap-4 group hover:opacity-95 transition-opacity block"
                     >
                       <div className="shrink-0 p-3.5 bg-sky-100 rounded-2xl text-[#0284c7] shadow-sm group-hover:bg-[#0284c7] group-hover:text-white transition-colors">
                         <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                           <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                         </svg>
                       </div>
                       <div>
                         <p className="text-sm font-bold text-slate-900 mb-1.5 group-hover:text-[#0284c7] transition-colors flex items-center gap-1.5">
                           Alamat Kantor
                           <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0284c7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                             <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                           </svg>
                         </p>
                         <p className="text-sm text-slate-600 leading-relaxed group-hover:underline">
                           Jl. Tombak No. 24, Sidorejo Hilir, Kec. Medan Tembung, Kota Medan, Sumatera Utara 20222
                         </p>
                       </div>
                     </a>

                     <div className="flex items-start gap-4">
                       <div className="shrink-0 p-3.5 bg-emerald-100 rounded-2xl text-emerald-600 shadow-sm">
                         <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                         </svg>
                       </div>
                       <div>
                         <p className="text-sm font-bold text-slate-900 mb-1.5">Telepon</p>
                         <p className="text-sm text-slate-600">(061) 7367375</p>
                       </div>
                     </div>

                     <div className="flex items-start gap-4">
                       <div className="shrink-0 p-3.5 bg-indigo-100 rounded-2xl text-indigo-600 shadow-sm">
                         <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                         </svg>
                       </div>
                       <div>
                         <p className="text-sm font-bold text-slate-900 mb-1.5">Email Resmi</p>
                         <p className="text-sm text-slate-600">bblsdm.medan@komdigi.go.id</p>
                       </div>
                     </div>
                   </div>
                </div>
              </div>
              {/* Contact Form */}
              <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-100 shadow-sm">
                <HomeContactForm />
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
