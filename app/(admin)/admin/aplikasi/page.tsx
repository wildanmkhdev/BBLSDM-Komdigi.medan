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
          Belum ada aplikasi yang didaftarkan.
        </div>
      ) : (
        /* Card Grid Layout (4-5 columns) */
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-5">
          {apps.map((app) => (
            <div
              key={app.id}
              className={`relative group ${!app.isActive ? "opacity-60" : ""}`}
            >
              {/* Main Card (Clickable Link) */}
              <a
                href={app.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-3 bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 hover:bg-slate-50/50 transition-all duration-200 w-full aspect-square relative cursor-pointer"
              >
                {/* Logo Container (occupies 70% of the square card size) */}
                <div className="relative w-[70%] aspect-square bg-slate-50 rounded-xl overflow-hidden border border-slate-100 flex items-center justify-center shadow-2xs transition-transform duration-200 group-hover:scale-105">
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

                {/* Name */}
                <h3 className="mt-2 font-bold text-[10px] sm:text-xs text-slate-800 text-center line-clamp-1 w-full px-1 leading-tight">
                  {app.name}
                </h3>
              </a>

              {/* Admin Actions (Overlaid on Hover, top-right) */}
              {!isReadOnly && (
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                  <Link
                    href={`/admin/aplikasi/edit/${app.id}`}
                    className="p-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-500 hover:text-slate-800 shadow-2xs transition duration-150"
                    title="Edit"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </Link>

                  <form
                    action={async () => {
                      "use server";
                      await deleteAplikasi(app.id);
                    }}
                    className="inline"
                  >
                    <button
                      type="submit"
                      className="p-1.5 bg-white hover:bg-red-50 border border-slate-200 hover:border-red-200 rounded-lg text-slate-500 hover:text-red-600 shadow-2xs transition duration-150 cursor-pointer"
                      title="Hapus"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </form>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
