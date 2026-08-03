import React from "react";
import Link from "next/link";
import {
  getSocialMediaPosts,
  deleteSocialMediaPost,
  toggleSocialMediaPostStatus,
} from "@/features/sosialMedia/actions";

export const dynamic = "force-dynamic";

export default async function AdminMediaSosialPage() {
  const posts = await getSocialMediaPosts();

  // Color mappings for badges
  const platformColors = {
    INSTAGRAM: "bg-pink-50 text-pink-700 border-pink-200",
    TIKTOK: "bg-slate-100 text-slate-800 border-slate-300",
    YOUTUBE: "bg-red-50 text-red-700 border-red-200",
  } as const;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Manajemen Media Sosial</h1>
          <p className="text-sm text-slate-500">
            Kelola link postingan Instagram, TikTok, dan YouTube untuk ditampilkan pada halaman publik.
          </p>
        </div>
        <Link
          href="/admin/media-sosial/tambah"
          className="inline-flex items-center px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-lg shadow-sm transition cursor-pointer"
        >
          + Tambah Postingan
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-400 text-sm">
          Belum ada postingan media sosial. Klik <strong>Tambah Postingan</strong> untuk mulai.
        </div>
      ) : (
        /* Card Grid Layout */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between hover:shadow-md transition duration-200"
            >
              <div className="space-y-4">
                {/* Top Header: Platform & Status */}
                <div className="flex items-start justify-between">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide border ${
                      platformColors[post.platform as keyof typeof platformColors] || ""
                    }`}
                  >
                    {post.platform}
                  </span>

                  {post.isActive ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Tampil
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                      Sembunyi
                    </span>
                  )}
                </div>

                {/* Content: Title (YouTube) & Description/Caption */}
                <div className="space-y-2">
                  {post.platform === "YOUTUBE" && post.title && (
                    <h3 className="font-bold text-sm text-slate-900 leading-snug line-clamp-1">
                      {post.title}
                    </h3>
                  )}
                  {post.caption ? (
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-4">
                      {post.caption}
                    </p>
                  ) : (
                    <p className="text-xs text-slate-400 italic">Tanpa caption/deskripsi</p>
                  )}
                </div>

                {/* URL Link */}
                <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-500">
                  <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline truncate"
                  >
                    {post.url}
                  </a>
                </div>
              </div>

              {/* Bottom: Action Row */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <form
                  action={async () => {
                    "use server";
                    await toggleSocialMediaPostStatus(post.id, !post.isActive);
                  }}
                >
                  <button
                    type="submit"
                    className="text-[10px] font-bold text-blue-600 hover:text-blue-800 transition cursor-pointer"
                  >
                    {post.isActive ? "Sembunyikan" : "Tampilkan"}
                  </button>
                </form>

                <div className="flex items-center gap-3">
                  <Link
                    href={`/admin/media-sosial/edit/${post.id}`}
                    className="text-[10px] font-bold text-slate-600 hover:text-slate-900 transition"
                  >
                    Edit
                  </Link>

                  <form
                    action={async () => {
                      "use server";
                      await deleteSocialMediaPost(post.id);
                    }}
                  >
                    <button
                      type="submit"
                      className="text-[10px] font-bold text-red-600 hover:text-red-800 transition cursor-pointer"
                    >
                      Hapus
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
