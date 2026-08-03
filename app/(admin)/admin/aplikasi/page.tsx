import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getAplikasiList, deleteAplikasi, toggleAplikasiStatus } from "@/features/aplikasi/actions";

export const dynamic = "force-dynamic";

export default async function AdminAplikasiPage() {
  const apps = await getAplikasiList();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manajemen Katalog Aplikasi</h1>
          <p className="text-sm text-slate-500">
            Kelola daftar aplikasi internal/eksternal yang disediakan BBLSDM untuk katalog publik.
          </p>
        </div>
        <Link
          href="/admin/aplikasi/tambah"
          className="inline-flex items-center px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-lg shadow-sm transition"
        >
          + Tambah Aplikasi
        </Link>
      </div>

      {apps.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-400 text-sm">
          Belum ada aplikasi yang didaftarkan. Klik <strong>Tambah Aplikasi</strong> untuk mulai.
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                <th className="px-4 py-3">Logo</th>
                <th className="px-4 py-3">Nama Aplikasi</th>
                <th className="px-4 py-3">Deskripsi Singkat</th>
                <th className="px-4 py-3">Link Aplikasi</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {apps.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/50 transition">
                  {/* Logo */}
                  <td className="px-4 py-3">
                    <div className="relative w-10 h-10 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                      {app.logo ? (
                        <Image
                          src={app.logo.publicUrl}
                          alt={app.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[8px] text-slate-400 bg-slate-50">
                          NO LOGO
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Nama */}
                  <td className="px-4 py-3">
                    <div className="font-semibold text-slate-900" title={app.name}>
                      {app.name}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">slug: {app.slug}</div>
                  </td>

                  {/* Deskripsi */}
                  <td className="px-4 py-3">
                    <div className="text-slate-600 truncate max-w-xs" title={app.description}>
                      {app.description}
                    </div>
                  </td>

                  {/* URL */}
                  <td className="px-4 py-3 text-slate-500">
                    {app.url ? (
                      <a
                        href={app.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline truncate max-w-xs inline-block"
                      >
                        {app.url}
                      </a>
                    ) : (
                      <span className="text-slate-300">—</span>
                    )}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    {app.isActive ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Aktif
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        Nonaktif
                      </span>
                    )}
                  </td>

                  {/* Aksi */}
                  <td className="px-4 py-3 text-right space-x-2">
                    <form
                      action={async () => {
                        "use server";
                        await toggleAplikasiStatus(app.id, !app.isActive);
                      }}
                      className="inline"
                    >
                      <button type="submit" className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer">
                        {app.isActive ? "Nonaktifkan" : "Aktifkan"}
                      </button>
                    </form>

                    <Link
                      href={`/admin/aplikasi/edit/${app.id}`}
                      className="text-[10px] font-bold text-slate-600 hover:underline"
                    >
                      Edit
                    </Link>

                    <form
                      action={async () => {
                        "use server";
                        await deleteAplikasi(app.id);
                      }}
                      className="inline"
                    >
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
