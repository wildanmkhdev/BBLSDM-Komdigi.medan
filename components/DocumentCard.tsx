import React from "react";

interface DocumentCardProps {
  title: string;
  category: string;
  publishDate: string;
  fileSize: string;
  fileFormat: string;
  downloadUrl: string;
  description?: string;
  coverUrl?: string;
}

export default function DocumentCard({
  title,
  category,
  publishDate,
  fileSize,
  fileFormat,
  downloadUrl,
  description,
  coverUrl,
}: DocumentCardProps) {
  // Ekstrak tahun dari judul atau tanggal rilis jika tersedia
  const yearMatch = title.match(/\b(202\d)\b/) || publishDate.match(/\b(202\d)\b/);
  const documentYear = yearMatch ? yearMatch[1] : "2025";

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-xl">
      
      {/* 1. BAGIAN ATAS: Thumbnail Cover Halaman Depan Laporan */}
      <div className="relative mb-5 overflow-hidden rounded-xl bg-slate-100 p-4 pt-5 pb-5 border border-slate-200/60 flex items-center justify-center min-h-[260px] shadow-inner group-hover:bg-slate-50 transition-colors duration-300">
        
        {/* Soft Ambient Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0284c7]/5 via-transparent to-slate-900/5 opacity-60"></div>

        {/* Cover Preview Image Container (Portrait A4 Aspect Ratio 3:4) */}
        <div className="relative w-44 aspect-[3/4] rounded-md overflow-hidden bg-white shadow-[0_8px_20px_-6px_rgba(11,27,61,0.25)] border-l-[3px] border-l-slate-400/80 border border-slate-200/90 transition-transform duration-500 ease-out group-hover:scale-[1.03] group-hover:shadow-[0_14px_28px_-6px_rgba(2,132,199,0.3)]">
          
          {coverUrl ? (
            <img
              src={coverUrl}
              alt={`Cover ${title}`}
              className="h-full w-full object-cover"
            />
          ) : (
            /* Mock Cover Halaman Depan Laporan A4 */
            <div className="h-full w-full flex flex-col justify-between p-3.5 bg-gradient-to-br from-[#0b1b3d] via-[#102a5c] to-[#0284c7] text-white relative overflow-hidden select-none">
              
              {/* Decorative Geometric Patterns */}
              <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-[#0284c7]/30 blur-md"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#38bdf8]/10 rounded-full blur-xl"></div>
              <div className="absolute top-1/2 -left-8 w-20 h-20 bg-white/5 rounded-full blur-md"></div>

              {/* Cover Header */}
              <div className="relative z-10 space-y-1">
                <div className="flex items-center gap-1.5 border-b border-white/20 pb-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#38bdf8] shrink-0"></div>
                  <span className="text-[7.5px] font-black uppercase tracking-wider text-slate-200 leading-none">
                    BPLSDMP Komdigi Medan
                  </span>
                </div>
                <div className="text-[7px] text-slate-300 font-medium tracking-wide">
                  REPUBLIK INDONESIA
                </div>
              </div>

              {/* Cover Title Preview */}
              <div className="relative z-10 my-auto py-2">
                <span className="inline-block px-1.5 py-0.5 rounded text-[6.5px] font-extrabold uppercase bg-[#0284c7] text-white mb-1 tracking-wider shadow-sm">
                  {category}
                </span>
                <h4 className="text-[9.5px] font-black leading-tight text-white line-clamp-3 tracking-tight">
                  {title}
                </h4>
                <div className="w-6 h-0.5 bg-[#38bdf8] rounded-full mt-1.5"></div>
              </div>

              {/* Cover Footer / Year */}
              <div className="relative z-10 pt-1.5 border-t border-white/20 flex items-center justify-between">
                <span className="text-[7px] text-slate-300 font-semibold uppercase">Laporan Resmi</span>
                <span className="text-[8.5px] font-black text-[#38bdf8] bg-white/10 px-1.5 py-0.5 rounded">{documentYear}</span>
              </div>

              {/* Spine Book Effect overlay on left */}
              <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-r from-black/30 to-transparent"></div>
            </div>
          )}
        </div>
      </div>

      {/* 2. BAGIAN TENGAH: Label Kategori, Tanggal, Judul, & Deskripsi */}
      <div className="flex flex-col flex-grow">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="inline-flex items-center rounded-md bg-sky-50 px-2.5 py-1 text-[11px] font-extrabold text-[#0284c7] uppercase tracking-wide">
            {category}
          </span>
          <span className="text-[11px] font-medium text-slate-400">
            {publishDate}
          </span>
        </div>

        <h3 className="text-sm font-extrabold text-[#0b1b3d] line-clamp-2 leading-snug group-hover:text-[#0284c7] transition-colors duration-300 mb-2">
          {title}
        </h3>

        {description && (
          <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* 3. BAGIAN BAWAH: Format File, Ukuran File, & Tombol Unduh */}
      <div className="mt-auto border-t border-slate-100 pt-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center rounded bg-red-100 px-2 py-0.5 text-[10px] font-black text-red-700 uppercase tracking-wider">
            {fileFormat}
          </span>
          <span className="text-xs font-semibold text-slate-500">
            {fileSize}
          </span>
        </div>

        <a
          href={downloadUrl}
          download
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#0284c7] px-3.5 py-2 text-xs font-bold text-white shadow-sm transition-all duration-300 hover:bg-[#0b1b3d] hover:shadow-md active:scale-95 shrink-0"
        >
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Unduh
        </a>
      </div>

    </div>
  );
}

