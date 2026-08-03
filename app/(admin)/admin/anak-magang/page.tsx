import React from "react";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminAnakMagangPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const searchQuery = q || "";

  // Query accepted interns (status: ACCEPTED)
  const interns = await prisma.pendaftaranMagang.findMany({
    where: {
      status: "ACCEPTED",
      OR: searchQuery
        ? [
            { fullName: { contains: searchQuery, mode: "insensitive" } },
            { institution: { contains: searchQuery, mode: "insensitive" } },
            { major: { contains: searchQuery, mode: "insensitive" } },
          ]
        : undefined,
    },
    include: {
      cv: true,
      proposal: true,
      suratBalasan: true,
    },
    orderBy: { periodStart: "desc" },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Manajemen Data Anak Magang</h1>
          <p className="text-sm text-slate-500">
            Daftar roster mahasiswa/siswa magang aktif yang telah diterima (Status: Diterima).
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <form method="GET" action="/admin/anak-magang" className="flex gap-2">
          <input
            type="text"
            name="q"
            defaultValue={searchQuery}
            placeholder="Cari berdasarkan nama, sekolah/universitas, atau jurusan..."
            className="flex-1 px-4 py-2 border border-slate-200 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-slate-900 text-slate-900"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-xs font-semibold shadow transition cursor-pointer"
          >
            Cari
          </button>
          {searchQuery && (
            <a
              href="/admin/anak-magang"
              className="px-4 py-2 border border-slate-200 text-slate-700 rounded-md text-xs font-semibold hover:bg-slate-50 transition flex items-center justify-center"
            >
              Reset
            </a>
          )}
        </form>
      </div>

      {/* Intern Roster List */}
      {interns.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-400 text-sm">
          {searchQuery ? "Pencarian tidak ditemukan." : "Belum ada anak magang aktif yang terdaftar."}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                <th className="px-4 py-3">Nama Mahasiswa</th>
                <th className="px-4 py-3">Asal Institusi &amp; Prodi</th>
                <th className="px-4 py-3">Periode Magang</th>
                <th className="px-4 py-3">Kontak</th>
                <th className="px-4 py-3">Berkas Dokumen</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {interns.map((intern) => (
                <tr key={intern.id} className="hover:bg-slate-50/50 transition">
                  {/* Name */}
                  <td className="px-4 py-3 font-semibold text-slate-900">
                    {intern.fullName}
                  </td>

                  {/* Institution */}
                  <td className="px-4 py-3 text-slate-600">
                    <div className="font-medium text-slate-800">{intern.institution}</div>
                    <div className="text-[10px] text-slate-400">{intern.major || "Semua Jurusan"} ({intern.faculty || "Tidak ada fakultas"})</div>
                  </td>

                  {/* Period */}
                  <td className="px-4 py-3 text-slate-500 font-medium">
                    {new Date(intern.periodStart).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    —{" "}
                    {new Date(intern.periodEnd).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  {/* Contact */}
                  <td className="px-4 py-3 text-slate-600">
                    <div>{intern.email}</div>
                    <div className="text-[10px] text-slate-400">{intern.phone}</div>
                  </td>

                  {/* Documents */}
                  <td className="px-4 py-3 space-y-1">
                    {intern.cv && (
                      <a
                        href={intern.cv.publicUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:underline block"
                      >
                        📄 Curriculum Vitae (PDF)
                      </a>
                    )}
                    {intern.proposal && (
                      <a
                        href={intern.proposal.publicUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 hover:underline block"
                      >
                        📄 Surat Pengantar (PDF)
                      </a>
                    )}
                    {!intern.cv && !intern.proposal && (
                      <span className="text-[10px] text-slate-400 italic">Tidak ada dokumen</span>
                    )}
                  </td>

                  {/* Action */}
                  <td className="px-4 py-3 text-right">
                    <form
                      action={async () => {
                        "use server";
                        await prisma.pendaftaranMagang.update({
                          where: { id: intern.id },
                          data: { status: "PENDING", currentStep: 4 },
                        });
                        revalidatePath("/admin/anak-magang");
                        revalidatePath("/admin/magang");
                        redirect("/admin/anak-magang");
                      }}
                    >
                      <button
                        type="submit"
                        className="text-[10px] font-bold text-amber-600 hover:text-amber-800 hover:underline cursor-pointer"
                      >
                        Kembalikan ke Seleksi
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
