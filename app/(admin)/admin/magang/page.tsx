import React from "react";
import prisma from "@/lib/prisma";
import { getMagangApplications, getMagangInfo } from "@/features/magang/actions";
import { redirect } from "next/navigation";
<<<<<<< HEAD
import fs from "fs";
import path from "path";
=======
import ProcedureEditor from "./ProcedureEditor";
import ApplicationsManager from "./ApplicationsManager";
>>>>>>> 3353f44519777e53525d7009f50cd6d71b15aef3

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
<<<<<<< HEAD
          <h3 className="font-bold text-sm text-slate-900">Pengajuan Masuk ({applications.length})</h3>

          {applications.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-400 text-sm">
              Belum ada berkas pendaftaran magang masuk.
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                    <th className="px-4 py-3">Mahasiswa</th>
                    <th className="px-4 py-3">Institusi &amp; Prodi</th>
                    <th className="px-4 py-3">Periode</th>
                    <th className="px-4 py-3">Progres Step</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/50 transition">
                      <td className="px-4 py-3">
                        <div className="font-semibold text-slate-900">{app.fullName}</div>
                        <div className="text-[10px] text-slate-400">{app.email} | {app.phone}</div>
                        {app.proposal ? (
                          <a 
                            href={app.proposal.publicUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center gap-1 mt-1 text-[9px] text-[#0284c7] hover:underline font-bold"
                          >
                            Surat Pengantar (PDF)
                          </a>
                        ) : (
                          <span className="text-[9px] text-slate-400 block mt-1">Belum ada Surat Pengantar</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        <div>{app.institution}</div>
                        <div className="text-[10px] text-slate-400">{app.major} ({app.faculty})</div>
                      </td>
                      <td className="px-4 py-3 text-slate-500">
                        {new Date(app.periodStart).toLocaleDateString("id-ID", { month: "short", year: "numeric" })} —{" "}
                        {new Date(app.periodEnd).toLocaleDateString("id-ID", { month: "short", year: "numeric" })}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded bg-sky-50 text-[#0284c7] font-bold border border-sky-100">
                          Step {app.currentStep} dari 5
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {app.status === "ACCEPTED" && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Diterima
                          </span>
                        )}
                        {app.status === "PENDING" && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                            Menunggu
                          </span>
                        )}
                        {app.status === "REJECTED" && (
                          <div className="space-y-1">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">
                              Ditolak
                            </span>
                            {app.rejectionReason && <p className="text-[9px] text-red-500 max-w-xs">{app.rejectionReason}</p>}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right space-x-1.5">
                        {/* Step selector setter */}
                        <form action={async (formData: FormData) => {
                          "use server";
                          const nextStep = Number(formData.get("step"));
                          let statusUpdate = app.status;

                          if (nextStep === 5) {
                            statusUpdate = "ACCEPTED";
                          } else if (nextStep < 5 && app.status === "ACCEPTED") {
                            statusUpdate = "PENDING";
                          }

                          await prisma.pendaftaranMagang.update({
                            where: { id: app.id },
                            data: { 
                              currentStep: nextStep,
                              status: statusUpdate
                            }
                          });
                          redirect("/admin/magang");
                        }} className="inline-flex items-center gap-1 mr-2">
                          <select 
                            name="step" 
                            defaultValue={app.currentStep} 
                            className="text-[10px] bg-white border border-slate-200 rounded px-1.5 py-0.5 font-semibold text-slate-800 outline-none"
                          >
                            <option value="1">Step 1: Form</option>
                            <option value="2">Step 2: Verifikasi</option>
                            <option value="3">Step 3: Seleksi</option>
                            <option value="4">Step 4: Pengumuman</option>
                            <option value="5">Step 5: Magang</option>
                          </select>
                          <button type="submit" className="text-[9px] bg-slate-950 text-white rounded px-1.5 py-0.5 hover:bg-slate-800 font-bold transition cursor-pointer">
                            Set
                          </button>
                        </form>

                        {app.status === "PENDING" && (
                          <>
                            <form action={async () => {
                              "use server";
                              await prisma.pendaftaranMagang.update({
                                where: { id: app.id },
                                data: { status: "ACCEPTED", currentStep: 5, reviewedAt: new Date() }
                              });
                              redirect("/admin/magang");
                            }} className="inline">
                              <button type="submit" className="text-[10px] font-bold text-emerald-600 hover:underline cursor-pointer">
                                Terima
                              </button>
                            </form>
                            <form action={async (formData: FormData) => {
                              "use server";
                              const reason = formData.get("reason") as string || "Berkas tidak sesuai kriteria";
                              await prisma.pendaftaranMagang.update({
                                where: { id: app.id },
                                data: { status: "REJECTED", rejectionReason: reason, currentStep: 4, reviewedAt: new Date() }
                              });
                              redirect("/admin/magang");
                            }} className="inline">
                              <input type="hidden" name="reason" value="Kapasitas kuota periode penuh" />
                              <button type="submit" className="text-[10px] font-bold text-red-600 hover:underline cursor-pointer">
                                Tolak
                              </button>
                            </form>
                          </>
                        )}
                        {app.status !== "PENDING" && (
                          <form action={async () => {
                            "use server";
                            await prisma.pendaftaranMagang.update({
                              where: { id: app.id },
                              data: { status: "PENDING", rejectionReason: null, currentStep: 1, reviewedAt: null }
                            });
                            redirect("/admin/magang");
                          }} className="inline">
                            <button type="submit" className="text-[10px] font-bold text-slate-500 hover:underline cursor-pointer">
                              Reset
                            </button>
                          </form>
                        )}
                        {/* Surat Balasan (PDF) Section */}
                        {app.suratBalasan ? (
                          <div className="mt-2 flex items-center justify-end gap-1.5 text-[10px]">
                            <span className="text-[9px] text-emerald-600 font-bold font-sans">Surat Balasan:</span>
                            <a 
                              href={app.suratBalasan.publicUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-[9px] text-[#0284c7] hover:underline font-bold"
                            >
                              Unduh PDF
                            </a>
                            <form action={async () => {
                              "use server";
                              await prisma.pendaftaranMagang.update({
                                  where: { id: app.id },
                                  data: { suratBalasanId: null }
                              });
                              redirect("/admin/magang");
                            }} className="inline">
                              <button type="submit" className="text-[9px] text-red-500 hover:underline cursor-pointer font-bold">
                                Hapus
                              </button>
                            </form>
                          </div>
                        ) : (
                          <form action={async (formData: FormData) => {
                            "use server";
                            const file = formData.get("file") as File;
                            if (file && file.size > 0) {
                              const buffer = Buffer.from(await file.arrayBuffer());
                              const filename = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
                              const uploadDir = path.join(process.cwd(), "public/uploads");
                              if (!fs.existsSync(uploadDir)) {
                                fs.mkdirSync(uploadDir, { recursive: true });
                              }
                              fs.writeFileSync(path.join(uploadDir, filename), buffer);
                              
                              const publicUrl = `/uploads/${filename}`;
                              
                              const media = await prisma.media.create({
                                data: {
                                  originalName: file.name,
                                  storageKey: filename,
                                  publicUrl,
                                  mimeType: file.type,
                                  fileSize: file.size,
                                  type: "DOCUMENT",
                                }
                              });

                              await prisma.pendaftaranMagang.update({
                                where: { id: app.id },
                                data: { 
                                  suratBalasanId: media.id,
                                  currentStep: 4,
                                  status: "ACCEPTED",
                                }
                              });
                            }
                            redirect("/admin/magang");
                          }} className="inline-flex items-center gap-1.5 mt-2 text-right justify-end w-full">
                            <span className="text-[9px] text-slate-400 font-bold font-sans">Surat Balasan:</span>
                            <input 
                              type="file" 
                              name="file" 
                              accept="application/pdf"
                              required 
                              className="text-[9px] text-slate-500 file:mr-1 file:py-0.5 file:px-1.5 file:rounded file:border-0 file:text-[9px] file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer w-32"
                            />
                            <button type="submit" className="text-[9px] bg-emerald-600 text-white rounded px-1.5 py-0.5 hover:bg-emerald-700 font-bold transition cursor-pointer">
                              Upload
                            </button>
                          </form>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
=======
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900">Pengajuan Masuk ({applications.length})</h3>
          </div>
          <ApplicationsManager initialApplications={applications} />
>>>>>>> 3353f44519777e53525d7009f50cd6d71b15aef3
        </div>

      </div>

    </div>
  );
}
