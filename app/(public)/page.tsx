import HeroBanner from "@/components/HeroBanner";
import FeaturedEventHero from "@/components/FeaturedEventHero";
import KomdigiStorySection from "@/components/KomdigiStorySection";
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
    ? dbNewsList.map((n) => ({
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
        <HeroBanner initialSlides={dbBanners} popularNewsList={dbPopularNews} />

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
        <FeaturedEventHero />

        {/* Story / Image Of The Day Section (NASA Style Image Feature) */}
        <KomdigiStorySection />

        {/* Contact Section */}
        <section id="kontak" className="py-20 bg-slate-50 border-t border-slate-200/60">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold text-[#0b1b3d] text-center mb-8">Hubungi Kami</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Info */}
              <div className="space-y-4">
                <p className="text-base text-slate-700"><strong>Alamat:</strong> Jl. Tombak No. 24, Sidorejo Hilir, Kec. Medan Tembung, Kota Medan, Sumatera Utara 20222</p>
                <p className="text-base text-slate-700"><strong>Telepon:</strong> (061) 7367375</p>
                <p className="text-base text-slate-700"><strong>Email:</strong> bblsdm.medan@komdigi.go.id</p>
              </div>
              {/* Contact Form */}
              <form className="space-y-4" onSubmit={(e)=>{e.preventDefault(); alert('Pesan terkirim!');}}>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="name">Nama</label>
                  <input type="text" id="name" name="name" required className="w-full rounded-md border border-slate-300 p-2 focus:outline-none focus:ring-2 focus:ring-[#0284c7]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" required className="w-full rounded-md border border-slate-300 p-2 focus:outline-none focus:ring-2 focus:ring-[#0284c7]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="message">Pesan / Pertanyaan</label>
                  <textarea id="message" name="message" rows={4} required className="w-full rounded-md border border-slate-300 p-2 focus:outline-none focus:ring-2 focus:ring-[#0284c7]"></textarea>
                </div>
                <button type="submit" className="px-6 py-2 bg-[#0284c7] text-white rounded-md hover:bg-[#0b1b3d] transition-colors">Kirim</button>
              </form>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
