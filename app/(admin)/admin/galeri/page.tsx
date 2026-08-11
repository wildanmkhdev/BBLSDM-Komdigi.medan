import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  getGaleriAlbums,
  deleteGaleriAlbum,
  toggleGaleriPublish,
} from "@/actions/galeri";

export const dynamic = "force-dynamic";

export default async function AdminGaleriPage() {
  const albums = await getGaleriAlbums();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manajemen Galeri</h1>
          <p className="text-sm text-slate-500">
            Kelola album foto dengan multi-photo viewer di halaman publik.
          </p>
        </div>
        <Link
          href="/admin/galeri/tambah"
          className="inline-flex items-center px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-lg shadow-sm transition"
        >
          + Tambah Album
        </Link>
      </div>

      {albums.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-400 text-sm">
          Belum ada album galeri. Klik <strong>Tambah Album</strong> untuk mulai.
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                <th className="px-4 py-3">Cover</th>
                <th className="px-4 py-3">Judul Album</th>
                <th className="px-4 py-3">Kategori</th>
                <th className="px-4 py-3">Jumlah Foto</th>
                <th className="px-4 py-3">Tanggal Kegiatan</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {albums.map((album) => (
                <tr key={album.id} className="hover:bg-slate-50/50 transition">
                  {/* Cover */}
                  <td className="px-4 py-3">
                    <div className="relative w-16 h-10 bg-slate-100 rounded overflow-hidden border border-slate-200">
                      {album.coverPhoto ? (
                        <Image
                          src={album.coverPhoto.publicUrl}
                          alt={album.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[8px] text-slate-400 bg-slate-50">
                          NO COVER
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Judul */}
                  <td className="px-4 py-3">
                    <div className="font-semibold text-slate-900 truncate max-w-xs" title={album.title}>
                      {album.title}
                    </div>
                  </td>

                  {/* Kategori */}
                  <td className="px-4 py-3 text-slate-600">{album.category}</td>

                  {/* Jumlah Foto — ditampilkan sebagai badge "N Foto" di card galeri */}
                  <td className="px-4 py-3">
                    <span className="font-semibold text-slate-700">{album.photos.length}</span>
                    <span className="text-slate-400 ml-1">foto</span>
                  </td>

                  {/* Tanggal Kegiatan */}
                  <td className="px-4 py-3 text-slate-500">
                    {album.eventDate
                      ? new Date(album.eventDate).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : <span className="text-slate-300">—</span>}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    {album.isPublished ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Tayang
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        Draft
                      </span>
                    )}
                  </td>

                  {/* Aksi */}
                  <td className="px-4 py-3 text-right space-x-2">
                    <form
                      action={async () => {
                        "use server";
                        await toggleGaleriPublish(album.id, !album.isPublished);
                      }}
                      className="inline"
                    >
                      <button type="submit" className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer">
                        {album.isPublished ? "Nonaktifkan" : "Tayangkan"}
                      </button>
                    </form>

                    <Link
                      href={`/admin/galeri/edit/${album.id}`}
                      className="text-[10px] font-bold text-slate-600 hover:underline"
                    >
                      Edit
                    </Link>

                    <Link
                      href={`/admin/galeri/foto/${album.id}`}
                      className="text-[10px] font-bold text-indigo-600 hover:underline"
                    >
                      Kelola Foto
                    </Link>

                    <form
                      action={async () => {
                        "use server";
                        await deleteGaleriAlbum(album.id);
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
