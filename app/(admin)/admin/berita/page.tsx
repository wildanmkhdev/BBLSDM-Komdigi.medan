import React from "react";
import Link from "next/link";
import { getNewsArticles, deleteNewsArticle } from "@/actions/berita";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function AdminBeritaPage() {
  const articles = await getNewsArticles();

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manajemen Berita &amp; Rilis</h1>
          <p className="text-sm text-slate-500">Buat rilis berita, pengumuman, dan publikasi resmi untuk website utama.</p>
        </div>
        <Link
          href="/admin/berita/tulis"
          className="inline-flex items-center px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-lg shadow-sm transition"
        >
          Tulis Berita
        </Link>
      </div>

      {/* Table grid list */}
      {articles.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-400 text-sm">
          Belum ada artikel berita yang dipublikasikan.
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                <th className="px-4 py-3">Cover</th>
                <th className="px-4 py-3">Judul Berita</th>
                <th className="px-4 py-3">Kategori</th>
                <th className="px-4 py-3">Pembaca (Views)</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Tanggal Dibuat</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {articles.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition">
                  <td className="px-4 py-3">
                    <div className="relative w-16 h-10 bg-slate-100 rounded overflow-hidden border border-slate-200">
                      {item.thumbnail ? (
                        <Image src={item.thumbnail.publicUrl} alt={item.title} fill sizes="64px" className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[8px] text-slate-400 bg-slate-50">NO COVER</div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-slate-900 truncate max-w-md" title={item.title}>
                      {item.title}
                    </div>
                    {item.isFeatured && (
                      <span className="inline-block mt-1 px-1.5 py-0.5 bg-rose-100 text-rose-800 text-[8px] font-bold rounded uppercase tracking-wider">
                        Sorotan (Featured)
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {item.kategori?.name || "Berita"}
                  </td>
                  <td className="px-4 py-3 text-slate-500 font-semibold">
                    {item.viewCount} kali
                  </td>
                  <td className="px-4 py-3">
                    {item.status === "PUBLISHED" && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 font-sans">
                        Tayang
                      </span>
                    )}
                    {item.status === "DRAFT" && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-slate-100 text-slate-600 border border-slate-200 font-sans">
                        Draft
                      </span>
                    )}
                    {item.status === "REVIEW" && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-50 text-amber-700 border border-amber-200 font-sans">
                        Peninjauan
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-400 font-sans">
                    {new Date(item.createdAt).toLocaleDateString("id-ID")}
                  </td>
                  <td className="px-4 py-3 text-right space-x-1.5">
                    <Link
                      href={`/admin/berita/edit/${item.id}`}
                      className="text-[10px] font-bold text-slate-600 hover:underline inline-block align-middle"
                    >
                      Edit
                    </Link>
                    <form action={async () => {
                      "use server";
                      await deleteNewsArticle(item.id);
                    }} className="inline-block align-middle">
                      <button type="submit" className="text-[10px] font-bold text-red-600 hover:underline cursor-pointer">
                        Hapus
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
