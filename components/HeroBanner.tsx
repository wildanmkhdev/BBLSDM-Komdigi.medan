"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      accentBadge: "SIARAN PERS",
      title: "Kemkomdigi Hormati Putusan MK, Siap Kaji Aturan Sisa Kuota Internet",
      subtitle: "Kementerian Komunikasi dan Digital menyambut baik putusan Mahkamah Konstitusi serta berkomitmen mengkaji regulasi sisa kuota data internet.",
      image: "/kunker-nezar/kunker-nezar-1.jpeg",
      ctaText: "Baca Selengkapnya",
      ctaLink: "/informasi/berita",
    },
    {
      accentBadge: "KUNJUNGAN KERJA",
      title: "Kunjungan Kerja Wamenkomdigi Nezar Patria ke BBLSDM Medan",
      subtitle: "Wakil Menteri Komunikasi dan Digital dorong percepatan talenta digital nasional di BBLSDM Komdigi Medan, Sumatera Utara.",
      image: "/kunker-nezar/kunker-nezar-2.jpeg",
      ctaText: "Baca Selengkapnya",
      ctaLink: "/informasi/berita",
    },
    {
      accentBadge: "PROGRAM UTAMA",
      title: "Perluasan Program Pelatihan Digital Talent Scholarship (DTS) 2026",
      subtitle: "BBLSDM Komdigi Medan menyiapkan kuota pelatihan dan sertifikasi gratis bagi masyarakat di 8 provinsi wilayah kerja.",
      image: "/kunker-nezar/kunker-nezar-3.jpeg",
      ctaText: "Baca Selengkapnya",
      ctaLink: "/layanan/pelatihan",
    }
  ];

  // Auto play slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // 4 popular news items for the transparent overlay
  const popularNews = [
    {
      category: "Siaran Pers",
      categoryColor: "text-orange-400",
      title: "Komdigi Tegaskan Kewajiban Penyedia Layanan Internet",
      time: "sebulan lalu",
      image: "/kunker-nezar/kunker-nezar-1.jpeg",
      href: "/informasi/berita",
    },
    {
      category: "Siaran Pers",
      categoryColor: "text-orange-400",
      title: "Permintaan Masukan Publik Terhadap Peraturan Menteri",
      time: "sebulan lalu",
      image: "/kunker-nezar/kunker-nezar-2.jpeg",
      href: "/informasi/berita",
    },
    {
      category: "Siaran Pers",
      categoryColor: "text-orange-400",
      title: "Dukung Pembelajaran di 178 Sekolah Wilayah 3T",
      time: "sebulan lalu",
      image: "/kunker-nezar/kunker-nezar-3.jpeg",
      href: "/informasi/berita",
    },
    {
      category: "Klarifikasi Hoaks",
      categoryColor: "text-red-500",
      title: "[HOAKS] Sensus Ekonomi 2026 Melalui Link Terlarang",
      time: "sebulan lalu",
      image: "/gambar1.jpeg",
      href: "/informasi/hoaks",
    },
  ];

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between bg-slate-950 font-sans overflow-hidden">
      
      {/* Sliding Background Images */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              idx === currentSlide ? "opacity-90 scale-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={idx === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Dark overlay gradients for text readability */}
      <div className="absolute inset-0 z-1 bg-gradient-to-t from-slate-950/60 via-slate-950/30 to-slate-950/10 pointer-events-none" />
      <div className="absolute inset-0 z-1 bg-gradient-to-r from-slate-950/60 via-slate-950/20 to-transparent pointer-events-none" />

      {/* Main Content Area */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 flex-grow flex items-center pt-28 pb-8">
        <div className="w-full">
          <div className="max-w-3xl space-y-4">
            
            {/* Category Badge */}
            <div>
              <span className="inline-block px-3 py-1 bg-[#ff7a59] text-white text-xs font-bold uppercase rounded-md tracking-wider shadow-md">
                {slides[currentSlide].accentBadge}
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight drop-shadow-lg transition-all duration-300">
              {slides[currentSlide].title}
            </h1>
            
            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-slate-200 font-medium leading-relaxed max-w-2xl drop-shadow">
              {slides[currentSlide].subtitle}
            </p>
            
            {/* CTA Link with Arrow Icon inside Circle */}
            <div className="pt-2">
              <Link
                href={slides[currentSlide].ctaLink}
                className="inline-flex items-center gap-3 text-white hover:text-sky-300 transition-colors group"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-full border border-white/80 group-hover:border-sky-300 group-hover:bg-white/10 transition-all shrink-0">
                  <svg
                    className="w-4 h-4 text-white group-hover:text-sky-300 transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </span>
                <span className="text-sm font-semibold tracking-wide">
                  {slides[currentSlide].ctaText}
                </span>
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* Navigation Indicators (Dots) on Right */}
      <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-2.5">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              idx === currentSlide ? "bg-white scale-125 ring-2 ring-white/50" : "bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Seamless "Berita Populer" section inside banner */}
      <div className="relative w-full z-20 pb-10 pt-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-white/90 tracking-wide">
              Berita populer
            </h2>
            
            {/* Slide arrows */}
            <div className="flex gap-2">
              <button 
                onClick={prevSlide}
                className="p-1.5 rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors border border-white/10"
                aria-label="Previous Slide"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={nextSlide}
                className="p-1.5 rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors border border-white/10"
                aria-label="Next Slide"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {popularNews.map((news, idx) => (
              <Link
                key={idx}
                href={news.href}
                className="group flex items-start gap-3 p-2.5 rounded-lg bg-black/20 hover:bg-black/40 transition-all duration-300"
              >
                {/* News Thumbnail Image */}
                <div className="relative w-20 sm:w-24 h-14 shrink-0 rounded overflow-hidden bg-slate-800">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    sizes="96px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* News Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-semibold text-white group-hover:text-sky-300 transition-colors line-clamp-2 leading-snug mb-1">
                    {news.title}
                  </h3>
                  
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-300">
                    <span className={`font-medium ${news.categoryColor}`}>
                      {news.category}
                    </span>
                    <span>•</span>
                    <span className="text-slate-400">{news.time}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

