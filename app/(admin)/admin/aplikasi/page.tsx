import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getAplikasiList, deleteAplikasi, toggleAplikasiStatus } from "@/features/aplikasi/actions";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

export default async function AdminAplikasiPage() {
  const session = await auth();
  const isReadOnly = session?.user?.role === "PEGAWAI";
  const apps = await getAplikasiList();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Manajemen Katalog Aplikasi</h1>
          <p className="text-sm text-slate-500">
            Kelola daftar aplikasi internal/eksternal yang disediakan BBLSDM untuk katalog publik.
          </p>
        </div>
        {!isReadOnly && (
          <Link
            href="/admin/aplikasi/tambah"
            className="inline-flex items-center px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-lg shadow-sm transition cursor-pointer"
          >
            + Tambah Aplikasi
          </Link>
        )}
      </div>

      {apps.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-400 text-sm">
          Belum ada aplikasi yang didaftarkan. Klik <strong>Tambah Aplikasi</strong> untuk mulai.
        </div>
      ) : (
        /* Card Grid Layout */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between hover:shadow-md transition duration-200"
            >
              <div className="space-y-4">
                {/* Top: Logo & Status Badge */}
                <div className="flex items-start justify-between">
                  <div className="relative w-12 h-12 bg-slate-50 rounded-lg overflow-hidden border border-slate-200 flex items-center justify-center shrink-0">
                    {app.logo ? (
                      <Image
                        src={app.logo.publicUrl}
                        alt={app.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-[10px] font-bold text-slate-400">LOGO</span>
                    )}
                  </div>

                  {app.isActive ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Aktif
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                      Nonaktif
                    </span>
                  )}
                </div>

                {/* Middle: Name & Description */}
                <div className="space-y-1.5">
                  <h3 className="font-bold text-sm text-slate-900 leading-snug line-clamp-1">
                    {app.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-medium">slug: {app.slug}</p>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {app.description}
                  </p>
                </div>

                {/* URL Info */}
                {app.url ? (
                  <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-500">
                    <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    <a
                      href={app.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline truncate"
                    >
                      {app.url}
                    </a>
                  </div>
                ) : (
                  <div className="pt-2 border-t border-slate-100 text-xs text-slate-300 italic">
                    Belum ada link/URL
                  </div>
                )}
              </div>

              {/* Bottom: Action Buttons */}
              {!isReadOnly && (
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <form
                    action={async () => {
                      "use server";
                      await toggleAplikasiStatus(app.id, !app.isActive);
                    }}
                  >
                    <button
                      type="submit"
                      className="text-[10px] font-bold text-blue-600 hover:text-blue-800 transition cursor-pointer"
                    >
                      {app.isActive ? "Nonaktifkan" : "Aktifkan"}
                    </button>
                  </form>

                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/aplikasi/edit/${app.id}`}
                      className="text-[10px] font-bold text-slate-600 hover:text-slate-900 transition"
                    >
                      Edit
                    </Link>

                    <form
                      action={async () => {
                        "use server";
                        await deleteAplikasi(app.id);
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
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
