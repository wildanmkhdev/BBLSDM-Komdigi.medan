import React from "react";
import prisma from "@/lib/prisma";
import { getMagangInfo } from "@/actions/magang";
import { redirect } from "next/navigation";
import ProcedureEditor from "../ProcedureEditor";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function MagangPengaturanPage() {
  const info = await getMagangInfo();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Breadcrumbs / Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-slate-500 mb-1 flex items-center gap-1">
            <Link href="/admin/magang" className="hover:underline">Inbox Magang</Link>
            <span>/</span>
            <span>Pengaturan</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Pengaturan Info Magang</h1>
          <p className="text-sm text-slate-500">Sesuaikan status pendaftaran, persyaratan, dan alur pendaftaran untuk publik.</p>
        </div>
        <Link
          href="/admin/magang"
          className="inline-flex items-center gap-1.5 px-3 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-md shadow-xs transition"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali ke Inbox
        </Link>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <form action={async (formData: FormData) => {
          "use server";
          const isOpen = formData.get("isOpen") === "true";
          const description = formData.get("description") as string;
          const requirements = formData.get("requirements") as string;
          const procedure = formData.get("procedure") as string;

          await prisma.magangInfo.upsert({
            where: { id: 1 },
            update: { isOpen, description, requirements, procedure },
            create: { id: 1, isOpen, description, requirements, procedure }
          });
          
          redirect("/admin/magang");
        }} className="space-y-5">
          
          {/* Status */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Status Pendaftaran Publik</label>
            <select
              name="isOpen"
              defaultValue={info?.isOpen ? "true" : "false"}
              className="w-full max-w-xs px-3.5 py-2 border border-slate-250 rounded-lg text-xs bg-white font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900"
            >
              <option value="true">Buka (Menerima Pengajuan)</option>
              <option value="false">Tutup (Penangguhan Sementara)</option>
            </select>
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Deskripsi Halaman Publik</label>
            <textarea
              name="description"
              rows={4}
              defaultValue={info?.description || ""}
              className="w-full px-3.5 py-2.5 border border-slate-250 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
              placeholder="Deskripsi singkat mengenai program magang..."
            />
          </div>

          {/* Persyaratan */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Syarat &amp; Ketentuan</label>
            <textarea
              name="requirements"
              rows={5}
              defaultValue={info?.requirements || ""}
              className="w-full px-3.5 py-2.5 border border-slate-250 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
              placeholder="1. Syarat pertama&#10;2. Syarat kedua..."
            />
          </div>

          {/* Prosedur Editor */}
          <div className="border-t border-slate-100 pt-5">
            <ProcedureEditor initialProcedure={info?.procedure || "[]"} />
          </div>

          <div className="flex items-center justify-end gap-3 pt-5 border-t border-slate-100">
            <Link
              href="/admin/magang"
              className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg text-xs font-bold transition"
            >
              Batal
            </Link>
            <button
              type="submit"
              className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold rounded-lg shadow transition cursor-pointer"
            >
              Simpan Pengaturan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
