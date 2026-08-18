"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  updateApplicationStep,
  updateApplicationStatusDetailed,
  linkSuratBalasan,
  unlinkSuratBalasan,
} from "@/actions/magang";
import { uploadFile } from "@/actions/media";

interface MediaRecord {
  id: string;
  originalName: string;
  publicUrl: string;
}

interface Application {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  institution: string;
  faculty: string | null;
  major: string | null;
  periodStart: Date | string;
  periodEnd: Date | string;
  currentStep: number;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "CANCELLED";
  rejectionReason: string | null;
  proposal: MediaRecord | null;
  suratBalasan: MediaRecord | null;
}

interface ApplicationsManagerProps {
  initialApplications: any[];
}

const STEP_NAMES = ["Form", "Verifikasi", "Seleksi", "Pengumuman", "Magang"];

export default function ApplicationsManager({ initialApplications }: ApplicationsManagerProps) {
  const router = useRouter();
  const [isPendingTransition, startTransition] = useTransition();
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"ALL" | "PENDING" | "ACCEPTED" | "REJECTED">("ALL");

  // Detail modal state
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

  // Rejection modal state
  const [rejectingAppId, setRejectingAppId] = useState<string | null>(null);
  const [rejectionOption, setRejectionOption] = useState("Berkas tidak sesuai kriteria");
  const [customReason, setCustomReason] = useState("");

  // Uploading state
  const [uploadingAppId, setUploadingAppId] = useState<string | null>(null);
  const [submittingAppId, setSubmittingAppId] = useState<string | null>(null);

  const selectedApp = applications.find((app) => app.id === selectedAppId);

  // Filter application list
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.fullName.toLowerCase().includes(search.toLowerCase()) ||
      app.institution.toLowerCase().includes(search.toLowerCase()) ||
      (app.major && app.major.toLowerCase().includes(search.toLowerCase()));

    if (filter === "ALL") return matchesSearch;
    return app.status === filter && matchesSearch;
  });

  const handleUpdateStep = async (appId: string, nextStep: number) => {
    setSubmittingAppId(appId);
    const res = await updateApplicationStep(appId, nextStep);
    if (res.success) {
      setApplications((prev) =>
        prev.map((app) => {
          if (app.id === appId) {
            let nextStatus = app.status;
            if (nextStep === 5) {
              nextStatus = "ACCEPTED";
            } else if (nextStep < 5 && app.status === "ACCEPTED") {
              nextStatus = "PENDING";
            }
            return {
              ...app,
              currentStep: nextStep,
              status: nextStatus,
            };
          }
          return app;
        })
      );
      startTransition(() => {
        router.refresh();
      });
    } else {
      alert(res.error || "Gagal merubah step");
    }
    setSubmittingAppId(null);
  };

  const handleAccept = async (appId: string) => {
    setSubmittingAppId(appId);
    const res = await updateApplicationStatusDetailed(appId, "ACCEPTED");
    if (res.success) {
      setApplications((prev) =>
        prev.map((app) => {
          if (app.id === appId) {
            return {
              ...app,
              status: "ACCEPTED",
              currentStep: 5,
              rejectionReason: null,
            };
          }
          return app;
        })
      );
      startTransition(() => {
        router.refresh();
      });
    } else {
      alert(res.error || "Gagal menerima pengajuan");
    }
    setSubmittingAppId(null);
  };

  const handleOpenRejectModal = (appId: string) => {
    setRejectingAppId(appId);
    setRejectionOption("Berkas tidak sesuai kriteria");
    setCustomReason("");
  };

  const handleConfirmReject = async () => {
    if (!rejectingAppId) return;
    const finalReason =
      rejectionOption === "Lainnya" ? customReason.trim() : rejectionOption;

    if (rejectionOption === "Lainnya" && !finalReason) {
      alert("Alasan penolakan kustom wajib diisi.");
      return;
    }

    const appId = rejectingAppId;
    setRejectingAppId(null);
    setSubmittingAppId(appId);

    const res = await updateApplicationStatusDetailed(appId, "REJECTED", finalReason);
    if (res.success) {
      setApplications((prev) =>
        prev.map((app) => {
          if (app.id === appId) {
            return {
              ...app,
              status: "REJECTED",
              currentStep: 4,
              rejectionReason: finalReason,
            };
          }
          return app;
        })
      );
      startTransition(() => {
        router.refresh();
      });
    } else {
      alert(res.error || "Gagal menolak pengajuan");
    }
    setSubmittingAppId(null);
  };

  const handleReset = async (appId: string) => {
    setSubmittingAppId(appId);
    const res = await updateApplicationStatusDetailed(appId, "PENDING");
    if (res.success) {
      setApplications((prev) =>
        prev.map((app) => {
          if (app.id === appId) {
            return {
              ...app,
              status: "PENDING",
              currentStep: 1,
              rejectionReason: null,
            };
          }
          return app;
        })
      );
      startTransition(() => {
        router.refresh();
      });
    } else {
      alert(res.error || "Gagal mereset status");
    }
    setSubmittingAppId(null);
  };

  const handleFileUpload = async (appId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAppId(appId);
    const fData = new FormData();
    fData.append("file", file);
    fData.append("altText", `Surat Balasan Magang`);

    const uploadRes = await uploadFile(fData);
    if (uploadRes.success && uploadRes.media) {
      const linkRes = await linkSuratBalasan(appId, uploadRes.media.id);
      if (linkRes.success) {
        setApplications((prev) =>
          prev.map((app) => {
            if (app.id === appId) {
              return {
                ...app,
                suratBalasan: {
                  id: uploadRes.media!.id,
                  originalName: uploadRes.media!.originalName,
                  publicUrl: uploadRes.media!.publicUrl,
                },
                currentStep: 4,
                status: "ACCEPTED",
              };
            }
            return app;
          })
        );
        startTransition(() => {
          router.refresh();
        });
      } else {
        alert(linkRes.error || "Gagal menghubungkan dokumen surat balasan");
      }
    } else {
      alert(uploadRes.error || "Gagal mengunggah file. Pastikan tipe file berupa PDF.");
    }
    setUploadingAppId(null);
  };

  const handleDeleteSuratBalasan = async (appId: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus surat balasan ini?")) return;

    setSubmittingAppId(appId);
    const res = await unlinkSuratBalasan(appId);
    if (res.success) {
      setApplications((prev) =>
        prev.map((app) => {
          if (app.id === appId) {
            return {
              ...app,
              suratBalasan: null,
            };
          }
          return app;
        })
      );
      startTransition(() => {
        router.refresh();
      });
    } else {
      alert(res.error || "Gagal menghapus surat balasan");
    }
    setSubmittingAppId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header, Search & Filter */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 font-sans">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Cari mahasiswa, institusi, atau prodi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {[
            { key: "ALL", label: `Semua (${applications.length})` },
            { key: "PENDING", label: `Menunggu (${applications.filter(a => a.status === "PENDING").length})` },
            { key: "ACCEPTED", label: `Diterima (${applications.filter(a => a.status === "ACCEPTED").length})` },
            { key: "REJECTED", label: `Ditolak (${applications.filter(a => a.status === "REJECTED").length})` },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                filter === tab.key
                  ? "bg-slate-950 text-white shadow-xs"
                  : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Applications Table Layout */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden font-sans">
        <div className="overflow-x-auto">
          {filteredApplications.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-sm">
              {search ? "Tidak ada hasil pencarian yang cocok." : "Belum ada berkas pendaftaran magang."}
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="px-6 py-4">Nama Mahasiswa</th>
                  <th className="px-6 py-4">Kampus &amp; Jurusan</th>
                  <th className="px-6 py-4">Periode Magang</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredApplications.map((app) => (
                  <tr
                    key={app.id}
                    onClick={() => setSelectedAppId(app.id)}
                    className={`hover:bg-slate-50/80 transition-colors cursor-pointer group ${
                      app.status === "ACCEPTED"
                        ? "bg-emerald-50/5"
                        : app.status === "REJECTED"
                        ? "bg-red-50/5"
                        : ""
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900 group-hover:text-[#0284c7] transition-colors">
                        {app.fullName}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {app.email} • {app.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-800">{app.institution}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {app.major || "-"} ({app.faculty || "-"})
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-700">
                      {new Date(app.periodStart).toLocaleDateString("id-ID", { month: "short", year: "numeric" })} —{" "}
                      {new Date(app.periodEnd).toLocaleDateString("id-ID", { month: "short", year: "numeric" })}
                    </td>
                    <td className="px-6 py-4">
                      {app.status === "ACCEPTED" && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          Diterima
                        </span>
                      )}
                      {app.status === "PENDING" && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                          Menunggu
                        </span>
                      )}
                      {app.status === "REJECTED" && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800 border border-red-200">
                          Ditolak
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedAppId(app.id);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-950 hover:text-white rounded-md text-[10px] font-bold text-slate-700 transition cursor-pointer shadow-2xs"
                      >
                        Detail Alur
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-40 overflow-y-auto font-sans">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 space-y-6 relative my-8">
            {/* Modal Close Button */}
            <button
              onClick={() => setSelectedAppId(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Header */}
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Detail Pendaftar Magang</span>
              <h2 className="text-xl font-bold text-slate-950 mt-1">{selectedApp.fullName}</h2>
              <p className="text-xs text-slate-500 mt-1">{selectedApp.institution} — {selectedApp.major} ({selectedApp.faculty})</p>
            </div>

            {/* Contact Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-xs">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">Email</span>
                <span className="font-medium text-slate-800 flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {selectedApp.email}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">Telepon</span>
                <span className="font-medium text-slate-800 flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {selectedApp.phone}
                </span>
              </div>
            </div>

            {/* Stepper Progress Section */}
            <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">Progres Langkah Penyeleksian</span>
                <span className="text-[10px] bg-sky-50 text-[#0284c7] font-bold px-2 py-0.5 rounded border border-sky-100 font-sans">
                  Step {selectedApp.currentStep} dari 5: {STEP_NAMES[selectedApp.currentStep - 1]}
                </span>
              </div>
              
              {/* Progress Line and Circles */}
              <div className="relative px-2 pt-2 pb-6">
                <div className="absolute top-5 left-8 right-8 h-0.5 bg-slate-200 -z-0" />
                <div
                  className="absolute top-5 left-8 h-0.5 bg-[#0284c7] transition-all duration-300 -z-0"
                  style={{ width: `${((Math.min(selectedApp.currentStep, 5) - 1) / 4) * 100}%` }}
                />

                <div className="flex justify-between relative z-10">
                  {STEP_NAMES.map((name, idx) => {
                    const stepNum = idx + 1;
                    const isCompleted = selectedApp.currentStep > stepNum;
                    const isActive = selectedApp.currentStep === stepNum;
                    
                    return (
                      <div key={idx} className="flex flex-col items-center group relative">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 border-2 ${
                            isCompleted
                              ? "bg-emerald-500 border-emerald-500 text-white"
                              : isActive
                              ? "bg-white border-[#0284c7] text-[#0284c7] ring-4 ring-sky-50"
                              : "bg-white border-slate-300 text-slate-400"
                          }`}
                        >
                          {isCompleted ? (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            stepNum
                          )}
                        </div>
                        <span
                          className={`absolute top-9 text-[9px] font-bold uppercase tracking-wider font-sans whitespace-nowrap transition ${
                            isActive
                              ? "text-[#0284c7]"
                              : isCompleted
                              ? "text-emerald-600"
                              : "text-slate-400"
                          }`}
                        >
                          {name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Info and Documents Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-slate-100 pt-5 text-xs">
              {/* Period & Rejection Details */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Periode Magang</span>
                  <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {new Date(selectedApp.periodStart).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })} —{" "}
                    {new Date(selectedApp.periodEnd).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Status Seleksi</span>
                  <div>
                    {selectedApp.status === "ACCEPTED" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        Diterima
                      </span>
                    )}
                    {selectedApp.status === "PENDING" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                        Menunggu Verifikasi/Seleksi
                      </span>
                    )}
                    {selectedApp.status === "REJECTED" && (
                      <div className="space-y-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800 border border-red-200">
                          Ditolak
                        </span>
                        {selectedApp.rejectionReason && (
                          <div className="text-xs text-red-700 bg-red-50 p-2.5 rounded-lg border border-red-100 leading-relaxed">
                            <strong>Alasan Penolakan:</strong> {selectedApp.rejectionReason}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Dokumen Lampiran</span>
                  <div className="flex flex-col gap-2.5">
                    {/* Proposal */}
                    {selectedApp.proposal ? (
                      <a
                        href={selectedApp.proposal.publicUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0284c7] hover:underline"
                      >
                        <svg className="w-4 h-4 text-[#0284c7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Surat Pengantar Kampus (PDF)
                      </a>
                    ) : (
                      <span className="text-xs text-slate-400">Tidak ada Surat Pengantar</span>
                    )}

                    {/* Surat Balasan */}
                    {selectedApp.suratBalasan ? (
                      <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-100 px-2.5 py-1.5 rounded-lg w-fit">
                        <a
                          href={selectedApp.suratBalasan.publicUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-bold hover:underline"
                        >
                          <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Surat Balasan.pdf
                        </a>
                        <button
                          type="button"
                          onClick={() => handleDeleteSuratBalasan(selectedApp.id)}
                          className="text-red-500 hover:text-red-700 transition cursor-pointer"
                          title="Hapus Surat Balasan"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ) : uploadingAppId === selectedApp.id ? (
                      <span className="text-xs text-sky-600 animate-pulse font-semibold">Mengunggah PDF...</span>
                    ) : (
                      <div className="flex items-center gap-2">
                        <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 transition cursor-pointer shadow-2xs">
                          <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                          Unggah Surat Balasan (PDF)
                          <input
                            type="file"
                            accept="application/pdf"
                            className="hidden"
                            onChange={(e) => handleFileUpload(selectedApp.id, e)}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Stepper Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-5 border-t border-slate-100 text-xs">
              {/* Step Setter */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Ubah Step:</span>
                <select
                  value={selectedApp.currentStep}
                  onChange={(e) => handleUpdateStep(selectedApp.id, Number(e.target.value))}
                  className="text-xs font-semibold bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 outline-none focus:ring-1 focus:ring-slate-900 cursor-pointer shadow-2xs"
                >
                  {STEP_NAMES.map((name, idx) => (
                    <option key={idx + 1} value={idx + 1}>
                      Step {idx + 1}: {name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {selectedApp.status === "PENDING" ? (
                  <>
                    <button
                      type="button"
                      onClick={() => handleAccept(selectedApp.id)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition shadow-xs cursor-pointer flex items-center gap-1"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Terima
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenRejectModal(selectedApp.id)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition shadow-xs cursor-pointer flex items-center gap-1"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Tolak
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleReset(selectedApp.id)}
                    className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 rounded-lg text-xs font-bold transition shadow-2xs cursor-pointer flex items-center gap-1"
                  >
                    <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 6.5" />
                    </svg>
                    Reset ke Menunggu
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rejection Reason Modal */}
      {rejectingAppId && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in font-sans">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              Tentukan Alasan Penolakan Pengajuan
            </h3>
            
            <div className="space-y-3 text-xs">
              <label className="block font-semibold text-slate-700">Pilih Alasan:</label>
              {[
                "Berkas tidak sesuai kriteria",
                "Kapasitas kuota periode penuh",
                "Dokumen persyaratan tidak lengkap/jelas",
                "Lainnya",
              ].map((reason) => (
                <label key={reason} className="flex items-center gap-2 p-2 border border-slate-150 rounded-lg bg-slate-50/50 hover:bg-slate-50 cursor-pointer transition">
                  <input
                    type="radio"
                    name="rejectionOption"
                    value={reason}
                    checked={rejectionOption === reason}
                    onChange={(e) => setRejectionOption(e.target.value)}
                    className="accent-slate-900 w-3.5 h-3.5 cursor-pointer"
                  />
                  <span className="text-xs font-medium text-slate-800">{reason}</span>
                </label>
              ))}

              {rejectionOption === "Lainnya" && (
                <div className="space-y-1 pt-1.5">
                  <label className="block font-semibold text-slate-700">Alasan Kustom:</label>
                  <textarea
                    rows={3}
                    placeholder="Masukkan alasan penolakan..."
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 text-xs">
              <button
                type="button"
                onClick={() => setRejectingAppId(null)}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-lg font-bold text-slate-600 transition cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmReject}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition shadow-xs cursor-pointer"
              >
                Tolak Pengajuan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
