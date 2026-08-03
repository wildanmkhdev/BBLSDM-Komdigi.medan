import React from "react";
import prisma from "@/lib/prisma";
import { getMagangApplications, getMagangInfo } from "@/features/magang/actions";
import { redirect } from "next/navigation";
import ProcedureEditor from "./ProcedureEditor";
import ApplicationsManager from "./ApplicationsManager";

export const dynamic = "force-dynamic";

export default async function AdminMagangPage() {
  const applications = await getMagangApplications();
  const info = await getMagangInfo();

  return (
    <div className="space-y-10">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manajemen Pendaftaran Magang</h1>
          <p className="text-sm text-slate-500">Kelola berkas pengajuan mahasiswa dan sesuaikan info alur magang publik.</p>
        </div>
      </div>

      {/* Grid: Settings + Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (1/3): Info & Settings */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6 self-start">
          <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-3">Pengaturan Info Magang</h3>
          
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
          }} className="space-y-4">
            
            {/* Status */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Status Pendaftaran Publik</label>
              <select
                name="isOpen"
                defaultValue={info?.isOpen ? "true" : "false"}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-md text-xs bg-white"
              >
                <option value="true">Buka (Menerima Pengajuan)</option>
                <option value="false">Tutup (Penangguhan Sementara)</option>
              </select>
            </div>

            {/* Deskripsi */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Deskripsi Halaman Publik</label>
              <textarea
                name="description"
                rows={3}
                defaultValue={info?.description || ""}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>

            {/* Persyaratan */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Syarat &amp; Ketentuan</label>
              <textarea
                name="requirements"
                rows={4}
                defaultValue={info?.requirements || ""}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>

            {/* Prosedur Editor */}
            <ProcedureEditor initialProcedure={info?.procedure || "[]"} />

            <button
              type="submit"
              className="w-full py-2 bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold rounded-md shadow transition cursor-pointer"
            >
              Simpan Pengaturan
            </button>
          </form>
        </div>

        {/* Right Column (2/3): Applications List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900">Pengajuan Masuk ({applications.length})</h3>
          </div>
          <ApplicationsManager initialApplications={applications} />
        </div>

      </div>

    </div>
  );
}
