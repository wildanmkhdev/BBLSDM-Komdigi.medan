"use client";

import Link from "next/link";

export default function HeroBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-[#071329] py-24 sm:py-32 md:py-40">
      {/* Background Graphic Patterns & Glow Effects */}
      <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30" 
           style={{ backgroundImage: "radial-gradient(circle at 70% 30%, rgba(2, 132, 199, 0.4) 0%, transparent 60%)" }} />
      
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#991b1b]/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
      
      {/* Digital Grid overlay effect */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-3xl space-y-6">
          
          {/* Badge accent */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 uppercase animate-pulse">
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
            Transformasi Digital Nasional
          </div>
          
          {/* Main Title with high impact */}
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl leading-[1.15]">
            Membangun <span className="text-[#0284c7]">SDM Unggul</span> & <span className="text-yellow-400">Riset Digital</span> Terpercaya
          </h1>
          
          {/* Long Subtitle / Description */}
          <p className="text-base text-slate-300 sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl">
            Balai Besar Pengembangan Sumber Daya Manusia dan Penelitian Komunikasi dan Informatika (BBLSDM Komdigi) Kota Medan.
          </p>

          <p className="text-sm text-slate-400 max-w-xl">
            Mewujudkan masyarakat digital Indonesia yang kompeten, cerdas, inklusif, dan siap menghadapi tantangan industri masa depan.
          </p>
          
          {/* Call to Actions (CTA) */}
          <div className="pt-4 flex flex-wrap gap-4">
            <Link
              href="/layanan/pelatihan"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-bold tracking-wide uppercase transition-all duration-200 bg-[#0284c7] text-white hover:bg-sky-500 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-sky-500/20 border border-transparent"
            >
              Cari Pelatihan
            </Link>
            
            <Link
              href="/layanan/magang"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-bold tracking-wide uppercase transition-all duration-200 bg-[#991b1b] text-white hover:bg-red-800 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-red-800/20 border border-transparent"
            >
              Pengajuan Magang
            </Link>
          </div>
          
        </div>
      </div>
    </section>
  );
}
