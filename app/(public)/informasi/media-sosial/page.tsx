"use client";

import React from "react";
import PageHeader from "@/app/components/PageHeader";

// ---------------------------------------------------------
// TEMPAT MEMASUKKAN LINK POSTINGAN (SANGAT MUDAH DIUBAH)
// ---------------------------------------------------------

// Cukup paste link (URL) dari Instagram langsung di sini beserta captionnya
const instagramPosts = [
  {
    url: "https://www.instagram.com/reel/DbX5xkJIA3V/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    caption: "Temukan informasi menarik dan bermanfaat yang tersimpan di balik foto ini. Simak selengkapnya hingga akhir."
  },
  {
    url: "https://www.instagram.com/reel/DbR60-TImnU/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    caption: "BBLSDM Komdigi Medan berkomitmen menghadirkan pelayanan yang bersih, transparan, dan akuntabel."
  }
];

// Cukup paste link video TikTok di sini beserta captionnya
const tiktokPosts = [
  {
    url: "https://www.tiktok.com/@balaibesarmedan/video/7659724322054901013?is_from_webapp=1&sender_device=pc",
    caption: "BBLSDM Komdigi Medan menerima kunjungan kerja Wakil Menteri KOMDIGI RI, Bapak Nezar Patria. Diikuti dengan prosesi adat penyambutan kain Ulos, agenda dilanjutkan dengan paparan profil balai oleh Kepala BBLSDM Komdigi Medan ibu Dr. Christiany Juditha."
  }
];

// Cukup paste link YouTube di sini
const youtubeVideo = {
  url: "https://youtu.be/XHXhPBs5spo?si=1Z9vRYb1Lx7UF4Xz",
  title: "Seminar Hasil Digital Government Communication Talent Lab",
  desc: "DGC-TLab 2026 resmi menutup rangkaian kegiatannya! Mulai dari presentasi hasil assessment, penyerahan rekomendasi strategis kepada 4 OPD, apresiasi peserta dan kelompok terbaik, hingga Graduation Ceremony yang penuh haru untuk 19 peserta magang. Terima kasih atas semangat, kolaborasi, dan dedikasi seluruh peserta dalam mewujudkan komunikasi pemerintahan yang lebih adaptif, responsif, dan berdampak bagi masyarakat!"
};

// ---------------------------------------------------------
// HELPER FUNCTIONS (Mengubah Link Biasa Menjadi Link Embed)
// ---------------------------------------------------------
const getInstagramEmbedUrl = (url: string) => {
  try {
    const urlObj = new URL(url);
    let pathname = urlObj.pathname;
    if (!pathname.endsWith('/')) pathname += '/';
    return `https://www.instagram.com${pathname}embed/`;
  } catch (e) {
    return url;
  }
};

const getYoutubeEmbedUrl = (url: string) => {
  try {
    const urlObj = new URL(url);
    const videoId = urlObj.searchParams.get("v") || urlObj.pathname.split("/").pop();
    return `https://www.youtube.com/embed/${videoId}`;
  } catch (e) {
    return url;
  }
};

// ---------------------------------------------------------
// TikTokPostCard
// Header kustom menyesuaikan tampilan card Instagram:
//   - Ukuran container & border sama
//   - Avatar 32×32, rounded-lg (bukan circle)
//   - Font username text-xs font-bold, sub-teks text-[10px]
//   - Tombol biru #0095f6, px-3 py-1, rounded-md, text-xs font-bold
// Area video: bg-slate-50, h-[420px] — identik dengan Instagram card
// Footer: p-4, text-xs/sm, font-medium — identik dengan Instagram card
// ---------------------------------------------------------
function TikTokPostCard({ url, caption, index }: { url: string; caption: string; index: number }) {
  const videoIdMatch = url.match(/video\/(\d+)/);
  const videoId = videoIdMatch ? videoIdMatch[1] : "";
  const cleanUrl = url.split("?")[0];

  return (
    <div className="group bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      {/* Area video – rasio dan tinggi h-[420px] persis sama dengan Instagram card */}
      <div className="w-full bg-slate-50 relative h-[420px] overflow-hidden border-b border-slate-100">
        {videoId ? (
          <iframe
            src={`https://www.tiktok.com/player/v1/${videoId}?autoplay=0&loop=0`}
            className="absolute top-0 left-0 w-full h-full border-0"
            title={`TikTok video ${index + 1}`}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-50">
            <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center">
              <svg className="w-6 h-6 text-slate-400 fill-current" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.34 22a6.33 6.33 0 0 0 6.33-6.33V9.05a8.16 8.16 0 0 0 4.69 1.48V7.08a4.85 4.85 0 0 1-.77-.39z" />
              </svg>
            </div>
            <p className="text-xs text-slate-500 font-medium">Video tidak tersedia</p>
          </div>
        )}
      </div>

      {/* Footer – padding, font, dan warna identik dengan Instagram card */}
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-xs sm:text-sm text-slate-600 line-clamp-5 leading-relaxed font-medium mb-3 flex-grow">
          {caption}
        </p>
        <a
          href={cleanUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-bold text-slate-800 hover:text-black transition-colors group-hover:underline mt-auto"
        >
          Tonton di TikTok →
        </a>
      </div>
    </div>
  );
}

export default function MediaSosialPage() {
  return (
    <div className="bg-white">
      <PageHeader
        title="Media Sosial"
        subtitle="Terhubung dengan kami melalui platform media sosial untuk mendapatkan informasi terbaru seputar kegiatan, pelatihan, dan literasi digital."
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Informasi", href: "#" },
          { label: "Media Sosial" }
        ]}
      />

      <section className="py-16 md:py-20 bg-slate-50/50 min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b1d3d] tracking-tight mb-3">Update Terbaru</h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Ikuti berbagai kanal media sosial resmi BBLSDM Komdigi Medan untuk mengetahui lebih dekat aktivitas dan pengumuman penting kami.
            </p>
          </div>

          {/* Grid Instagram & TikTok */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm mb-10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-[#0b1d3d]">Postingan Instagram & TikTok</h3>
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com/balaibesarmedan?igsh=MTJuYWNpYnAzeXF4dQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 border border-slate-200 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50 hover:text-pink-600 transition-colors"
                >
                  Profil IG
                </a>
                <a
                  href="https://www.tiktok.com/@balaibesarmedan?_r=1&_t=ZS-98SGq81aLv0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 border border-slate-200 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50 hover:text-black transition-colors"
                >
                  Profil TikTok
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {/* Instagram cards – struktur asli (iframe langsung, header dari embed Instagram) */}
              {instagramPosts.map((post, index) => (
                <div key={`ig-${index}`} className="group bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                  <div className="w-full bg-slate-50 relative h-[420px] overflow-hidden border-b border-slate-100">
                    <iframe
                      src={getInstagramEmbedUrl(post.url)}
                      className="absolute top-0 left-0 w-full h-full border-0 overflow-hidden"
                      title={`Instagram post ${index + 1}`}
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-5 leading-relaxed font-medium mb-3 flex-grow">
                      {post.caption}
                    </p>
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-slate-800 hover:text-pink-600 transition-colors group-hover:underline mt-auto"
                    >
                      Buka di Instagram →
                    </a>
                  </div>
                </div>
              ))}

              {/* TikTok cards */}
              {tiktokPosts.map((post, index) => (
                <TikTokPostCard key={`tk-${index}`} url={post.url} caption={post.caption} index={index} />
              ))}

            </div>
          </div>

          {/* YouTube Section */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative z-10 w-full flex flex-col">
            <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-[#0b1d3d]">Video Terbaru</h3>
              <a
                href="https://youtube.com/@bblsdm_komdigimedan?si=iSNG8GYjdTWfakuX"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex px-4 py-1.5 border border-slate-200 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50 hover:text-red-600 transition-colors"
              >
                Kanal YouTube
              </a>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              <div className="lg:col-span-2 relative aspect-video w-full rounded-xl overflow-hidden bg-slate-900 shadow-inner border border-slate-100">
                <iframe
                  className="w-full h-full border-0"
                  src={getYoutubeEmbedUrl(youtubeVideo.url)}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              <div className="lg:col-span-1 flex flex-col justify-center">
                <h4 className="text-lg md:text-xl font-bold text-[#0b1d3d] mb-3 leading-snug">
                  {youtubeVideo.title}
                </h4>
                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                  {youtubeVideo.desc}
                </p>
                <a
                  href={youtubeVideo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors shadow-sm w-full sm:w-auto"
                >
                  Buka di YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
