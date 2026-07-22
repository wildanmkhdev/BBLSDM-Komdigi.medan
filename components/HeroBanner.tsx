"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Aksi Nyata Pemberantasan Judi Online di Indonesia",
      subtitle: "Kementerian Komunikasi dan Digital RI secara konsisten memutus akses situs judi online demi menjaga keamanan ruang digital.",
      desc: "Upaya kolaboratif lintas sektor untuk menciptakan ekosistem internet yang bersih, produktif, dan aman bagi seluruh lapisan masyarakat.",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1600&auto=format&fit=crop",
      ctaText: "Aduan Konten",
      ctaLink: "/kontak",
      accentBadge: "SIARAN PERS"
    },
    {
      title: "Penyusunan Pedoman Etika Kecerdasan Artifisial (AI)",
      subtitle: "Kementerian Komdigi merumuskan regulasi pemanfaatan teknologi AI untuk mendorong inovasi nasional yang bertanggung jawab.",
      desc: "Menyelaraskan perkembangan teknologi dengan perlindungan data pribadi dan keandalan sistem kecerdasan buatan.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop",
      ctaText: "Lihat Regulasi",
      ctaLink: "/publikasi/penelitian",
      accentBadge: "KEBIJAKAN PUBLIK"
    },
    {
      title: "Pendaftaran Digital Talent Scholarship Kembali Dibuka",
      subtitle: "BBLSDM Komdigi Medan menyelenggarakan program pelatihan IT intensif bersertifikasi standar nasional untuk masyarakat.",
      desc: "Membekali talenta muda Indonesia dengan keahlian digital masa depan di bidang Data Science, Cyber Security, dan AI.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop",
      ctaText: "Daftar Sekarang",
      ctaLink: "/layanan/pelatihan",
      accentBadge: "PROGRAM UTAMA"
    }
  ];

  // Auto play slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // 4 popular news items for the overlay
  const popularNews = [
    {
      badge: "Pendaftaran",
      title: "Digital Talent Scholarship 2026 Dibuka",
      href: "/layanan/pelatihan",
    },
    {
      badge: "Kegiatan",
      title: "Hasil Pelatihan TIK Aparatur Desa Tahap I",
      href: "/informasi/berita",
    },
    {
      badge: "Magang",
      title: "Penerimaan Mahasiswa Magang Gelombang II",
      href: "/layanan/magang",
    },
    {
      badge: "Riset",
      title: "Rilis Buku Putih Indikator TIK Sumatra Utara",
      href: "/publikasi/buku-putih",
    },
  ];

  return (
    <section className="relative w-full min-h-[100vh] flex flex-col justify-between bg-slate-950 font-sans">
      
      {/* Sliding Background Images (Clean, realistic photos) */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out ${
              idx === currentSlide ? "opacity-50 scale-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url('${slide.image}')` }}
          />
        ))}
      </div>

      {/* Clean Soft Overlay - Blends seamlessly into the next slate-50 section at the bottom */}
      <div className="absolute inset-0 z-1 bg-gradient-to-b from-slate-950/30 via-slate-950/80 to-[#f8fafc] pointer-events-none" />
      <div className="absolute inset-0 z-1 bg-gradient-to-r from-slate-950/60 via-transparent to-transparent pointer-events-none" />

      {/* Main Content Area */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 flex-grow flex items-center pt-28">
        <div className="w-full">
          <div className="max-w-3xl space-y-4">
            
            {/* Main Title (Clean, bold, high legibility) */}
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl leading-[1.15] transition-all duration-300">
              {slides[currentSlide].title}
            </h1>
            
            {/* Subtitle / Description */}
            <div className="space-y-2">
              <p className="text-base text-slate-200 sm:text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
                {slides[currentSlide].subtitle}
              </p>
              <p className="text-sm text-slate-350 max-w-xl hidden sm:block">
                {slides[currentSlide].desc}
              </p>
            </div>
            
            {/* Call to Actions (CTA) */}
            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <Link
                href={slides[currentSlide].ctaLink}
                className="inline-flex items-center justify-center px-6 py-2.5 rounded text-xs font-bold tracking-wide uppercase transition-colors bg-[#0284c7] text-white hover:bg-sky-600 active:scale-[0.98]"
              >
                {slides[currentSlide].ctaText}
              </Link>
              
              <Link
                href="/layanan/magang"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded text-xs font-bold tracking-wide uppercase transition-colors bg-slate-800 border border-slate-700 text-white hover:bg-slate-700 active:scale-[0.98]"
              >
                Pengajuan Magang
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Indicators (Dots) */}
      <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2.5">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              idx === currentSlide ? "bg-yellow-400 scale-125" : "bg-white/30 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Overlay "Berita Populer" at bottom-left */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20 pb-16 mt-8">
        <div className="border-t border-slate-200/20 pt-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
              <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Berita Populer</h2>
            </div>
            
            {/* Desktop Quick Nav Arrows */}
            <div className="hidden sm:flex gap-1.5">
              <button 
                onClick={prevSlide}
                className="p-1 rounded bg-slate-200/50 border border-slate-300 text-slate-700 hover:bg-slate-300 transition-colors"
                aria-label="Previous Slide"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={nextSlide}
                className="p-1 rounded bg-slate-200/50 border border-slate-300 text-slate-700 hover:bg-slate-300 transition-colors"
                aria-label="Next Slide"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularNews.map((news, idx) => (
              <Link
                key={idx}
                href={news.href}
                className="group relative block p-3.5 rounded bg-white/70 backdrop-blur-sm border border-slate-200 hover:bg-white hover:border-slate-300 shadow-sm transition-all duration-300"
              >
                <span className="inline-block text-[9px] font-bold text-[#0284c7] mb-1">
                  {news.badge}
                </span>
                
                <h3 className="text-xs font-bold text-slate-800 group-hover:text-[#0284c7] transition-colors duration-200 line-clamp-2 leading-relaxed">
                  {news.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
