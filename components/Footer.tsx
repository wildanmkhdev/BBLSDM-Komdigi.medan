"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0b1b3d] text-white font-sans">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Branding / Logo */}
          <div className="lg:col-span-4 flex flex-col items-start space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo%20komdigi.png"
                alt="Logo Komdigi"
                className="w-12 h-12 object-contain shrink-0 brightness-0 invert"
              />
              <div>
                <h3 className="text-base font-extrabold tracking-wider uppercase leading-tight">KOMDIGI</h3>
                <p className="text-[10px] text-sky-200 font-semibold tracking-wide">BBLSDM KOTA MEDAN</p>
              </div>
            </div>
            <p className="text-xs text-sky-100 max-w-sm leading-relaxed">
              Balai Besar Pengembangan Sumber Daya Manusia dan Penelitian Komunikasi dan Informatika Medan.
            </p>
          </div>

          {/* Right Columns: Links (3 columns mapped from original footer) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Column 1: Profil & Informasi */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2">
                Profil &amp; Informasi
              </h4>
              <ul className="space-y-2.5 text-xs text-sky-100/90">
                <li>
                  <Link href="/profil/sejarah" className="hover:text-white hover:underline transition-all">
                    Sejarah Instansi
                  </Link>
                </li>
                <li>
                  <Link href="/profil/visi-misi" className="hover:text-white hover:underline transition-all">
                    Visi &amp; Misi
                  </Link>
                </li>
                <li>
                  <Link href="/profil/struktur-organisasi" className="hover:text-white hover:underline transition-all">
                    Struktur Organisasi
                  </Link>
                </li>
                <li>
                  <Link href="/profil/tugas-fungsi" className="hover:text-white hover:underline transition-all">
                    Tugas &amp; Fungsi
                  </Link>
                </li>
                <li>
                  <Link href="/profil/wilayah-kerja" className="hover:text-white hover:underline transition-all">
                    Wilayah Kerja
                  </Link>
                </li>
                <li>
                  <Link href="/informasi/berita" className="hover:text-white hover:underline transition-all">
                    Berita &amp; Artikel
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Layanan & Publikasi */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2">
                Layanan &amp; Publikasi
              </h4>
              <ul className="space-y-2.5 text-xs text-sky-100/90">
                <li>
                  <Link href="/layanan/pelatihan" className="hover:text-white hover:underline transition-all">
                    Layanan Pelatihan
                  </Link>
                </li>
                <li>
                  <Link href="/layanan/magang" className="hover:text-white hover:underline transition-all">
                    Pengajuan Magang
                  </Link>
                </li>
                <li>
                  <Link href="/publikasi/lakip" className="hover:text-white hover:underline transition-all">
                    Laporan Kinerja (LAKIP)
                  </Link>
                </li>
                <li>
                  <Link href="/publikasi/laptah" className="hover:text-white hover:underline transition-all">
                    Laporan Tahunan (LAPTAH)
                  </Link>
                </li>
                <li>
                  <Link href="/publikasi/ict-indikator" className="hover:text-white hover:underline transition-all">
                    ICT Indikator
                  </Link>
                </li>
                <li>
                  <Link href="/publikasi/buku-putih" className="hover:text-white hover:underline transition-all">
                    Buku Putih Penelitian
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Tautan / Bantuan */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2">
                Bantuan &amp; Tautan
              </h4>
              <ul className="space-y-2.5 text-xs text-sky-100/90">
                <li>
                  <Link href="/layanan/faq" className="hover:text-white hover:underline transition-all">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/layanan/feedback" className="hover:text-white hover:underline transition-all">
                    Feedback Comment
                  </Link>
                </li>
                <li>
                  <Link href="/kontak" className="hover:text-white hover:underline transition-all">
                    Hubungi Kami
                  </Link>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Divider line */}
        <div className="mt-12 mb-8 border-t border-white/10"></div>

        {/* Contact info & Social links row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-xs text-sky-100">
          {/* Address with building icon */}
          <div className="flex items-start gap-3 max-w-sm">
            <svg className="w-5 h-5 shrink-0 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span>Jl. Tombak No. 24, Sidorejo Hilir, Kec. Medan Tembung, Kota Medan, Sumatera Utara 20222</span>
          </div>

          {/* Contact Numbers and Email */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>(061) 7367375</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>bblsdm.medan@komdigi.go.id</span>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 items-center">
            {/* Facebook */}
            <a href="#" className="hover:scale-110 transition-transform">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" className="hover:scale-110 transition-transform">
              <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            {/* YouTube */}
            <a href="#" className="hover:scale-110 transition-transform">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.517 3.5 12 3.5 12 3.5s-7.517 0-9.388.555A3.002 3.002 0 0 0 .5 6.163C0 8.07 0 12 0 12s0 3.93.5 5.837a3.002 3.002 0 0 0 2.112 2.108c1.87.556 9.388.556 9.388.556s7.518 0 9.389-.556a3.003 3.003 0 0 0 2.11-2.108c.5-1.907.5-5.837.5-5.837s0-3.93-.5-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            {/* X (formerly Twitter) */}
            <a href="#" className="hover:scale-110 transition-transform">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            {/* TikTok */}
            <a href="#" className="hover:scale-110 transition-transform">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.94-1.74-.22-.2-.42-.43-.61-.67-.02 3.48-.01 6.96-.02 10.43-.1 2.2-1.12 4.33-2.9 5.6-2.02 1.48-4.79 1.86-7.14 1.03-2.61-.9-4.59-3.41-4.77-6.2-.24-3.46 2.37-6.72 5.81-7.1 1.05-.13 2.11.04 3.1.5v4.07c-1.1-.56-2.43-.57-3.5-.01-1.39.73-2.12 2.4-1.68 3.95.4 1.48 1.9 2.51 3.43 2.38 1.66-.05 3.01-1.52 3.01-3.18V.02z"/>
              </svg>
            </a>
          </div>
        </div>

      </div>

      {/* Dark Copyright Strip at Bottom */}
      <div className="bg-[#050c1c] py-5 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sky-200/70">
          <div>
            Kementerian Komunikasi dan Digital RI. Hak Cipta dilindungi Undang-undang.
          </div>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white transition-colors">Kebijakan Privasi</Link>
            <span>|</span>
            <Link href="#" className="hover:text-white transition-colors">Peta Situs</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
