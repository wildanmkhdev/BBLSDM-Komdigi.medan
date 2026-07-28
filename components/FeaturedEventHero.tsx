import Link from "next/link";
import Image from "next/image";

export default function FeaturedEventHero() {
  return (
    <section className="relative w-full overflow-hidden bg-slate-950 text-white my-12">
      {/* Background Image with dark gradient overlay matching NASA reference style */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/kunker-nezar/kunker-nezar-3.jpeg"
          alt="Rapat Koordinasi Strategis Wamenkomdigi Nezar Patria di BBLSDM Komdigi Medan"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/45" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 flex flex-col justify-center min-h-[480px]">
        <div className="max-w-2xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest bg-red-600/90 text-white uppercase shadow-sm">
            Kunjungan Kerja &amp; Program Utama
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Percepat Talenta Digital, Wamenkomdigi Pimpin Rapat Koordinasi BBLSDM Medan
          </h2>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
            Wakil Menteri Komunikasi dan Digital (Wamenkomdigi) Nezar Patria menegaskan bahwa pengembangan talenta digital merupakan pilar utama Renstra Kementerian Komdigi 2025–2029 bertajuk &quot;Terhubung, Tumbuh, dan Terjaga&quot; guna mencetak pengembang dan inovator teknologi mandiri di Indonesia.
          </p>

          <div className="pt-4">
            <Link
              href="/informasi/berita"
              className="inline-flex items-center gap-3 text-base sm:text-lg font-bold text-white hover:text-slate-200 transition-colors group"
            >
              <span>Baca Rilis Selengkapnya</span>
              <span className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-md">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
