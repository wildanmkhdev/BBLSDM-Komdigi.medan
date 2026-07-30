import React from "react";

interface Step {
  step: number;
  title: string;
  description: string;
}

interface Application {
  id: string;
  fullName: string;
  email: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "CANCELLED";
  currentStep: number;
  rejectionReason: string | null;
  createdAt: Date;
  suratBalasan?: {
    id: string;
    publicUrl: string;
    originalName: string;
  } | null;
}

export default function MagangStatusTracker({
  steps,
  application,
}: {
  steps: Step[];
  application: Application;
}) {
  const status = application.status;

  // Determine current active step index (0-based)
  let currentStepIndex = application.currentStep - 1;
  if (status === "REJECTED") {
    currentStepIndex = 3; // Step 4 (Pengumuman - Ditolak) is active
  } else if (status === "ACCEPTED") {
    currentStepIndex = 4; // Step 5 (Mulai Magang) is active
  }

  const getStepStatus = (index: number) => {
    if (status === "REJECTED" && index === 3) return "REJECTED";
    if (status === "ACCEPTED" && index <= 3) return "COMPLETED";
    if (index < currentStepIndex) return "COMPLETED";
    if (index === currentStepIndex) return "ACTIVE";
    return "PENDING";
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      
      {/* Welcome Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-sky-50 text-[#0284c7] border border-sky-100 mb-2 font-sans">
            Status Pengajuan Magang
          </span>
          <h2 className="text-xl font-bold text-[#0b1b3d]">
            Halo, {application.fullName}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Terima kasih telah mengajukan magang di BBLSDM Komdigi Medan. Pengajuan Anda dikirim pada{" "}
            {new Date(application.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}.
          </p>
        </div>
        
        {/* Status Badge */}
        <div>
          {status === "PENDING" && (
            <span className="inline-flex items-center px-4 py-2 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 font-sans">
              Sedang Diproses
            </span>
          )}
          {status === "ACCEPTED" && (
            <span className="inline-flex items-center px-4 py-2 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 font-sans">
              Diterima Magang
            </span>
          )}
          {status === "REJECTED" && (
            <span className="inline-flex items-center px-4 py-2 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200 font-sans">
              Ditolak
            </span>
          )}
        </div>
      </div>

      {/* Stepper Visual */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-8">
        <h3 className="font-bold text-slate-900 text-base">Alur Perkembangan Seleksi</h3>
        
        <div className="relative">
          {/* Horizontal Connecting Line */}
          <div className="hidden md:block absolute top-7 left-10 right-10 h-0.5 bg-slate-100" />
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {steps.map((s, idx) => {
              const stepStatus = getStepStatus(idx);
              return (
                <div key={s.step} className="flex flex-col items-center text-center space-y-3 relative group">
                  
                  {/* Step Circle */}
                  <div className={`relative z-10 w-14 h-14 rounded-full flex items-center justify-center font-bold text-base transition-all duration-300 shadow-sm font-sans ${
                    stepStatus === "COMPLETED" ? "bg-emerald-600 text-white" :
                    stepStatus === "ACTIVE" ? "bg-[#0284c7] text-white ring-4 ring-sky-100" :
                    stepStatus === "REJECTED" ? "bg-red-600 text-white" :
                    "bg-slate-100 text-slate-400"
                  }`}>
                    {stepStatus === "COMPLETED" ? (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    ) : stepStatus === "REJECTED" ? (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      s.step
                    )}
                  </div>
                  
                  {/* Title & Description */}
                  <div className="space-y-1">
                    <h4 className={`text-xs font-bold uppercase tracking-wider font-sans ${
                      stepStatus === "COMPLETED" ? "text-emerald-700" :
                      stepStatus === "ACTIVE" ? "text-[#0284c7]" :
                      stepStatus === "REJECTED" ? "text-red-700" :
                      "text-slate-400"
                    }`}>
                      {s.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-normal max-w-[150px] mx-auto">
                      {stepStatus === "REJECTED" && idx === 3 ? "Berkas ditolak." : s.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Decision Details Alert Box */}
      {status === "REJECTED" && (
        <div className="bg-red-50 rounded-2xl border border-red-200 p-6 space-y-2">
          <h4 className="font-bold text-red-800 text-sm flex items-center gap-2">
            <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Informasi Penolakan Pengajuan
          </h4>
          <p className="text-xs text-red-700 leading-relaxed">
            Mohon maaf, pengajuan magang Anda belum dapat diterima dengan alasan berikut:
          </p>
          <div className="bg-white p-3 rounded-lg border border-red-100 text-xs font-semibold text-slate-700">
            &ldquo;{application.rejectionReason || "Berkas pendaftaran atau kapasitas kuota belum memenuhi syarat."}&rdquo;
          </div>
          <p className="text-[10px] text-red-600">
            Anda dapat mengajukan permohonan kembali pada periode berikutnya. Terima kasih atas ketertarikan Anda.
          </p>
        </div>
      )}

      {status === "ACCEPTED" && (
        <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-6 space-y-4">
          <div className="space-y-2">
            <h4 className="font-bold text-emerald-800 text-sm flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Selamat, Pengajuan Magang Anda Diterima!
            </h4>
            <p className="text-xs text-emerald-700 leading-relaxed">
              Langkah selanjutnya untuk memulai program magang Anda di BBLSDM Komdigi Medan:
            </p>
            <ul className="list-decimal pl-5 text-xs text-emerald-800 space-y-1 font-semibold font-sans">
              <li>Siapkan Surat Pengantar Resmi (dari Kampus/Sekolah) dan cetak dokumen Transkrip Nilai Anda.</li>
              <li>Laporkan diri ke kantor BBLSDM Komdigi Medan pada tanggal periode magang yang disetujui.</li>
              <li>Hubungi narahubung informasi pelatihan/magang kami untuk jadwal koordinasi teknis awal.</li>
            </ul>
          </div>

          {application.suratBalasan && (
            <div className="pt-3 border-t border-emerald-200/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h5 className="text-xs font-bold text-emerald-900 font-sans">Dokumen Surat Balasan Diterima Magang</h5>
                <p className="text-[10px] text-emerald-700 font-sans">Silakan unduh dokumen resmi surat balasan Anda di bawah ini.</p>
              </div>
              <a 
                href={application.suratBalasan.publicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors cursor-pointer w-full sm:w-auto font-sans"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Unduh Surat Balasan (PDF)
              </a>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
