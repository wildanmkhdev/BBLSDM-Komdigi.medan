import Link from "next/link";
import Image from "next/image";

export default function KomdigiStorySection() {
  return (
    <section className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column (5/12 cols): Story Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-1">
              <p className="text-[11px] font-bold tracking-[0.2em] text-slate-400 uppercase">
                DOKUMENTASI HARI INI
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0b1b3d] tracking-tight">
                Komdigi Dalam Lensa
              </h2>
            </div>

            <div className="space-y-3 pt-2">
              <h3 className="text-xl font-bold text-[#0b1b3d] leading-snug">
                Pelatihan Digital Entrepreneurship Academy (DEA) BBLSDM Komdigi Medan bagi Pelaku UMKM
              </h3>

              <p className="text-sm text-slate-500 leading-relaxed">
                Suasana kelas praktek pelatihan Digital Entrepreneurship Academy (DEA) yang diselenggarakan oleh BBLSDM Komdigi Medan. Para pelaku UMKM lokal diajarkan langsung teknik strategi pemasaran digital, pembuatan konten kreatif e-commerce, serta manajemen keuangan usaha berbasis aplikasi digital.
              </p>
            </div>

            <div className="pt-4">
              <Link
                href="/galeri"
                className="inline-flex items-center gap-2.5 text-sm font-bold text-[#0b1b3d] hover:text-[#0284c7] transition-colors group"
              >
                <span>Lihat Arsip Dokumentasi</span>
                <span className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-sm">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>

          {/* Right Column (7/12 cols): Image Container */}
          <div className="lg:col-span-7 space-y-3">
            <div className="bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-100 relative group">
              
              {/* Image Box */}
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop"
                  alt="Pelatihan Digital Entrepreneurship Academy BBLSDM Komdigi Medan"
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover group-hover:scale-103 transition-transform duration-500"
                />

                {/* Floating Download Button */}
                <button
                  aria-label="Unduh foto dokumentasi"
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#0284c7] hover:bg-[#0b1b3d] text-white flex items-center justify-center shadow-lg transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                </button>
              </div>

              {/* Bottom Right Link (View Full Page) */}
              <div className="pt-3 flex justify-end">
                <Link
                  href="/galeri"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#0b1b3d] hover:text-[#0284c7] transition-colors group"
                >
                  <span>Lihat Foto Penuh</span>
                  <span className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-xs">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
