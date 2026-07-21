"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0b1b3d] text-white border-t-4 border-yellow-500 font-sans">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Agency branding & contact info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo%20komdigi.png"
                alt="Logo Komdigi"
                className="w-10 h-10 object-contain shrink-0"
              />
              <div>
                <h3 className="text-sm font-bold tracking-wider uppercase">BBLSDM KOMDIGI</h3>
                <p className="text-[10px] text-slate-300 font-medium">KEMENTERIAN KOMUNIKASI & DIGITAL RI</p>
              </div>
            </div>
            
            <p className="text-xs text-slate-300 leading-relaxed">
              Balai Besar Pengembangan Sumber Daya Manusia dan Penelitian Komunikasi dan Informatika Medan.
            </p>
            
            <div className="pt-2 space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Jl. Tombak No. 24, Sidorejo Hilir, Kec. Medan Tembung, Kota Medan, Sumatera Utara 20222</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-sky-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>(061) 7367375</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-sky-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>bblsdm.medan@komdigi.go.id</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-sky-400 border-b border-white/10 pb-2">
              Profil & Informasi
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link href="/profil/sejarah" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                  <span className="text-[10px] text-yellow-500">▶</span> Sejarah Instansi
                </Link>
              </li>
              <li>
                <Link href="/profil/visi-misi" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                  <span className="text-[10px] text-yellow-500">▶</span> Visi & Misi
                </Link>
              </li>
              <li>
                <Link href="/profil/struktur-organisasi" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                  <span className="text-[10px] text-yellow-500">▶</span> Struktur Organisasi
                </Link>
              </li>
              <li>
                <Link href="/profil/tugas-fungsi" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                  <span className="text-[10px] text-yellow-500">▶</span> Tugas dan Fungsi
                </Link>
              </li>
              <li>
                <Link href="/profil/wilayah-kerja" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                  <span className="text-[10px] text-yellow-500">▶</span> Wilayah Kerja
                </Link>
              </li>
              <li>
                <Link href="/informasi/berita" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                  <span className="text-[10px] text-yellow-500">▶</span> Berita & Artikel
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Publikasi */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-sky-400 border-b border-white/10 pb-2">
              Layanan & Publikasi
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link href="/layanan/pelatihan" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                  <span className="text-[10px] text-sky-400">■</span> Layanan Pelatihan
                </Link>
              </li>
              <li>
                <Link href="/layanan/magang" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                  <span className="text-[10px] text-sky-400">■</span> Pengajuan Magang
                </Link>
              </li>
              <li>
                <Link href="/publikasi/lakip" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                  <span className="text-[10px] text-sky-400">■</span> Laporan Kinerja (LAKIP)
                </Link>
              </li>
              <li>
                <Link href="/publikasi/laptah" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                  <span className="text-[10px] text-sky-400">■</span> Laporan Tahunan (LAPTAH)
                </Link>
              </li>
              <li>
                <Link href="/publikasi/ict-indikator" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                  <span className="text-[10px] text-sky-400">■</span> ICT Indikator
                </Link>
              </li>
              <li>
                <Link href="/publikasi/buku-putih" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                  <span className="text-[10px] text-sky-400">■</span> Buku Putih Penelitian
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Operational Hours & Location */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-sky-400 border-b border-white/10 pb-2">
              Jam Operasional
            </h4>
            <div className="text-xs text-slate-300 space-y-2.5">
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span>Senin - Kamis</span>
                <span className="font-semibold text-white">08:00 - 16:30 WIB</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span>Jumat</span>
                <span className="font-semibold text-white">08:00 - 17:00 WIB</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span>Sabtu - Minggu</span>
                <span className="text-red-400 font-semibold">Tutup</span>
              </div>
              
              <div className="pt-2">
                <span className="block text-[10px] text-slate-400 uppercase tracking-wider mb-1">Status Kredibilitas</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/20 text-sky-400 border border-sky-500/30">
                  Instansi Terverifikasi
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider accent line */}
        <div className="my-8 border-t border-slate-700/50"></div>

        {/* Bottom footer bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} BBLSDM Komdigi Medan. Hak Cipta Dilindungi Undang-Undang.
          </div>
          <div className="flex gap-4">
            <Link href="/layanan/faq" className="hover:text-white transition-colors">FAQ</Link>
            <span>•</span>
            <Link href="/layanan/feedback" className="hover:text-white transition-colors">Feedback</Link>
            <span>•</span>
            <Link href="/kontak" className="hover:text-white transition-colors">Hubungi Kami</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
