import React from "react";
import Link from "next/link";
import { getPelatihanList, deletePelatihan } from "@/features/pelatihan/actions";
import { STATUS_LABELS, LEVEL_LABELS } from "@/validations/pelatihan";

export const dynamic = "force-dynamic";

export default async function AdminPelatihanPage() {
  const list = await getPelatihanList();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manajemen Pelatihan</h1>
          <p className="text-sm text-slate-500">
            Kelola program pelatihan dengan jadwal, kuota, silabus, dan persyaratan peserta.
          </p>
        </div>
        <Link
          href="/admin/pelatihan/tambah"
          className="inline-flex items-center px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-lg shadow-sm transition"
        >
          + Tambah Pelatihan
        </Link>
      </div>

      {list.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-400 text-sm">
          Belum ada program pelatihan. Klik <strong>Tambah Pelatihan</strong> untuk mulai.
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                <th className="px-4 py-3">Nama Pelatihan</th>
                <th className="px-4 py-3">Kategori</th>
                <th className="px-4 py-3">Jadwal</th>
                <th className="px-4 py-3">Peserta</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Level</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {list.map((item) => {
                const pct =
                  item.kuota > 0
                    ? Math.min(Math.round((item.terisi / item.kuota) * 100), 100)
                    : 0;

                return (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition">
                    {/* Nama */}
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-900 truncate max-w-xs" title={item.title}>
                        {item.title}
                      </div>
                      <div className="text-slate-400 mt-0.5">{item.metode} • {item.durasi}</div>
                    </td>

                    {/* Kategori */}
                    <td className="px-4 py-3 text-slate-600">{item.categoryLabel}</td>

                    {/* Jadwal — format teks bebas sesuai UI */}
                    <td className="px-4 py-3 text-slate-600">{item.jadwal}</td>

                    {/* Peserta + Progress Bar */}
                    <td className="px-4 py-3">
                      <div className="text-slate-700 font-semibold">
                        {item.terisi} / {item.kuota}
                      </div>
                      <div className="w-20 h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            pct >= 100 ? "bg-red-500" : "bg-sky-500"
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      {item.status === "OPEN" && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {STATUS_LABELS.OPEN}
                        </span>
                      )}
                      {item.status === "FULL" && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-red-50 text-red-700 border border-red-200">
                          {STATUS_LABELS.FULL}
                        </span>
                      )}
                      {item.status === "SEGERA_DIBUKA" && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          {STATUS_LABELS.SEGERA_DIBUKA}
                        </span>
                      )}
                    </td>

                    {/* Level */}
                    <td className="px-4 py-3 text-slate-500">
                      {LEVEL_LABELS[item.level] || item.level}
                    </td>

                    {/* Aksi */}
                    <td className="px-4 py-3 text-right space-x-2">
                      <Link
                        href={`/admin/pelatihan/edit/${item.id}`}
                        className="text-[10px] font-bold text-slate-600 hover:underline"
                      >
                        Edit
                      </Link>
                      <form
                        action={async () => {
                          "use server";
                          await deletePelatihan(item.id);
                        }}
                        className="inline"
                      >
                        <button type="submit" className="text-[10px] font-bold text-red-600 hover:underline cursor-pointer">
                          Hapus
                        </button>
                      </form>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
