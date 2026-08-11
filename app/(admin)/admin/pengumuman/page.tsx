import React from "react";
import Link from "next/link";
import { getPengumumanList, deletePengumuman, togglePengumumanPublish } from "@/actions/pengumuman";

export const dynamic = "force-dynamic";

export default async function AdminPengumumanPage() {
  const list = await getPengumumanList();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manajemen Pengumuman</h1>
          <p className="text-sm text-slate-500">
            Kelola pengumuman instansi dengan lampiran PDF yang bisa diunduh publik.
          </p>
        </div>
        <Link
          href="/admin/pengumuman/tambah"
          className="inline-flex items-center px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-lg shadow-sm transition"
        >
          + Tambah Pengumuman
        </Link>
      </div>

      {list.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-400 text-sm">
          Belum ada pengumuman. Klik <strong>Tambah Pengumuman</strong> untuk mulai.
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                <th className="px-4 py-3">Judul</th>
                <th className="px-4 py-3">Kategori</th>
                <th className="px-4 py-3">Prioritas</th>
                <th className="px-4 py-3">Lampiran</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Tanggal</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {list.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition">
                  {/* Judul */}
                  <td className="px-4 py-3">
                    <div className="font-semibold text-slate-900 truncate max-w-xs" title={item.title}>
                      {item.title}
                    </div>
                  </td>

                  {/* Kategori */}
                  <td className="px-4 py-3 text-slate-600">{item.category}</td>

                  {/* Prioritas */}
                  <td className="px-4 py-3">
                    {item.priority === "HIGH" ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-red-50 text-red-700 border border-red-200">
                        Prioritas Tinggi
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                        Normal
                      </span>
                    )}
                  </td>

                  {/* Lampiran */}
                  <td className="px-4 py-3 text-slate-500">
                    {item.attachment ? (
                      <a
                        href={item.attachment.publicUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        PDF ({(Number(item.attachment.fileSize) / 1024).toFixed(0)} KB)
                      </a>
                    ) : (
                      <span className="text-slate-300">—</span>
                    )}
                  </td>

                  {/* Status Publish */}
                  <td className="px-4 py-3">
                    {item.isPublished ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Tayang
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        Draft
                      </span>
                    )}
                  </td>

                  {/* Tanggal */}
                  <td className="px-4 py-3 text-slate-400">
                    {new Date(item.createdAt).toLocaleDateString("id-ID")}
                  </td>

                  {/* Aksi */}
                  <td className="px-4 py-3 text-right space-x-2">
                    <form
                      action={async () => {
                        "use server";
                        await togglePengumumanPublish(item.id, !item.isPublished);
                      }}
                      className="inline"
                    >
                      <button
                        type="submit"
                        className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer"
                      >
                        {item.isPublished ? "Nonaktifkan" : "Tayangkan"}
                      </button>
                    </form>

                    <Link
                      href={`/admin/pengumuman/edit/${item.id}`}
                      className="text-[10px] font-bold text-slate-600 hover:underline"
                    >
                      Edit
                    </Link>

                    <form
                      action={async () => {
                        "use server";
                        await deletePengumuman(item.id);
                      }}
                      className="inline"
                    >
                      <button
                        type="submit"
                        className="text-[10px] font-bold text-red-600 hover:underline cursor-pointer"
                      >
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
