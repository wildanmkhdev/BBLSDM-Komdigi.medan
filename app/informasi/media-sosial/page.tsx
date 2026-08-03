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
    url: "https://www.tiktok.com/@balaibesarmedan/video/7659724322054901013?is_from_webapp=1&sender_device=pc&web_id=7666823655733593620",
    caption: "BBLSDM Komdigi Medan menerima kunjungan kerja Wakil Menteri KOMDIGI RI, Bapak Nezar Patria. Diikuti dengan prosesi adat penyambutan kain Ulos, agenda dilanjutkan dengan paparan profil balai oleh Kepala BBLSDM Komdigi Medan ibu Dr. Christiany Juditha."
  },
];

// Cukup paste link YouTube di sini
const youtubeVideo = {
  url: "https://youtu.be/XHXhPBs5spo?si=1Z9vRYb1Lx7UF4Xz",
  title: "Seminar Hasil Digital Government Communication Talent Lab",
  desc: "DGC-TLab 2026 resmi menutup rangkaian kegiatannya! Mulai dari presentasi hasil assessment, penyerahan rekomendasi strategis kepada 4 OPD, apresiasi peserta dan kelompok terbaik, hingga Graduation Ceremony yang penuh haru untuk 19 peserta magang. Terima kasih atas semangat, kolaborasi, dan dedikasi seluruh peserta dalam mewujudkan komunikasi pemerintahan yang lebih adaptif, responsif, dan berdampak bagi masyarakat! "
};

// ---------------------------------------------------------
// HELPER FUNCTIONS (Mengubah Link Biasa Menjadi Link Embed)
// ---------------------------------------------------------
const getInstagramEmbedUrl = (url: string) => {
  try {
    const urlObj = new URL(url);
    // Hapus query params (seperti ?igsh=...) dan pastikan diakhiri slash, lalu tambah embed
    let pathname = urlObj.pathname;
    if (!pathname.endsWith('/')) pathname += '/';
    return `https://www.instagram.com${pathname}embed/`;
  } catch (e) {
    return url; // Fallback jika format salah
  }
};

const getTiktokEmbedUrl = (url: string) => {
  try {
    const match = url.match(/video\/(\d+)/);
    return match && match[1] ? `https://www.tiktok.com/embed/v2/${match[1]}` : url;
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

export default function MediaSosialPage() {
  return (
    <div className="bg-white">
      <PageHeader
        title="Media Sosial"
        subtitle="Terhubung dengan kami melalui platform media sosial untuk mendapatkan informasi terbaru seputar kegiatan, pelatihan, dan literasi digital."
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Informasi", href: "#" },
          { label: "Media Sosial" },
        ]}
      />

      <section className="py-16 md:py-20 bg-slate-50/50 min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b1b3d] tracking-tight mb-3">
              Update Terbaru
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Ikuti berbagai kanal media sosial resmi BBLSDM Komdigi Medan untuk mengetahui lebih dekat aktivitas dan pengumuman penting kami.
            </p>
          </div>

          {/* Combined Grid untuk Instagram & TikTok */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm mb-10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 border-b border-slate-100 pb-4">
               <h3 className="text-lg font-bold text-[#0b1b3d]">Postingan Instagram & TikTok</h3>
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
                 {/* Render Instagram Posts */}
                 {instagramPosts.map((post, index) => (
                   <div key={`ig-${index}`} className="group bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                     <div className="w-full bg-slate-50 relative h-[420px] overflow-hidden border-b border-slate-100">
                       <iframe 
                         src={getInstagramEmbedUrl(post.url)} 
                         className="w-full h-full absolute top-0 left-0" 
                         frameBorder="0" 
                         scrolling="no" 
                         allowTransparency={true}
                       ></iframe>
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

                 {/* Render TikTok Posts */}
                 {tiktokPosts.map((post, index) => (
                   <div key={`tk-${index}`} className="group bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                     <div className="w-full bg-slate-50 relative h-[420px] overflow-hidden border-b border-slate-100">
                       <iframe 
                         src={getTiktokEmbedUrl(post.url)} 
                         className="w-full h-full absolute top-0 left-0" 
                         frameBorder="0" 
                         allowFullScreen 
                         scrolling="no" 
                         allow="encrypted-media"
                       ></iframe>
                     </div>
                     <div className="p-4 flex flex-col flex-grow">
                       <p className="text-xs sm:text-sm text-slate-600 line-clamp-5 leading-relaxed font-medium mb-3 flex-grow">
                         {post.caption}
                       </p>
                       <a 
                         href={post.url} 
                         target="_blank" 
                         rel="noopener noreferrer" 
                         className="inline-flex items-center gap-1 text-xs font-bold text-slate-800 hover:text-black transition-colors group-hover:underline mt-auto"
                       >
                         Buka di TikTok →
                       </a>
                     </div>
                   </div>
                 ))}
            </div>
          </div>

          {/* YouTube Full Width */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative z-10 w-full flex flex-col">
             <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                <h3 className="text-lg font-bold text-[#0b1b3d]">Video Terbaru</h3>
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
                      className="w-full h-full"
                      src={getYoutubeEmbedUrl(youtubeVideo.url)} 
                      title="YouTube video player" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      referrerPolicy="strict-origin-when-cross-origin" 
                      allowFullScreen>
                    </iframe>
                 </div>
                 
                 <div className="lg:col-span-1 flex flex-col justify-center">
                    <h4 className="text-lg md:text-xl font-bold text-[#0b1b3d] mb-3 leading-snug">
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
