import React from "react";
import PageHeader from "@/app/components/PageHeader";
import MagangForm from "./MagangForm";
import MagangStatusTracker from "./MagangStatusTracker";
import { getMagangInfo } from "@/features/magang/actions";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";

interface Step {
  step: number;
  title: string;
  description: string;
}

export const dynamic = "force-dynamic";

export default async function MagangPage() {
  const session = await auth();
  const info = await getMagangInfo();
  
  // Parse procedure steps JSON
  let steps: Step[] = [];
  if (info && info.procedure) {
    try {
      steps = JSON.parse(info.procedure);
    } catch (e) {
      console.error("Failed to parse steps JSON:", e);
    }
  }

  // Fallback default steps if parsing failed or record was empty
  if (steps.length === 0) {
    steps = [
      { step: 1, title: "Isi Formulir", description: "Lengkapi formulir pendaftaran magang online di bawah ini." },
      { step: 2, title: "Verifikasi Berkas", description: "Tim kami akan memverifikasi kelengkapan dan keabsahan berkas Anda." },
      { step: 3, title: "Seleksi", description: "Proses seleksi administrasi dan/atau wawancara jika diperlukan." },
      { step: 4, title: "Pengumuman", description: "Hasil seleksi diumumkan melalui email dan website resmi." },
      { step: 5, title: "Mulai Magang", description: "Lapor diri ke kantor BBLSDM sesuai jadwal yang ditentukan." }
    ];
  }

  // Check if user has an existing application
  let application = null;
  if (session?.user?.email) {
    application = await prisma.pendaftaranMagang.findFirst({
      where: { email: session.user.email },
      orderBy: { createdAt: "desc" },
      include: {
        proposal: true,
        suratBalasan: true,
      }
    });
  }

  const isOpen = info?.isOpen ?? true;

  return (
    <>
      <PageHeader
        title="Pengajuan Magang"
        subtitle={info?.description || "Program magang di BBLSDM Komdigi Medan — kesempatan belajar langsung di bidang komunikasi dan digital"}
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Layanan", href: "#" },
          { label: "Pengajuan Magang" },
        ]}
        className="pt-28 pb-[76px] sm:pt-32 sm:pb-[92px]"
      />

      {application ? (
        /* If already applied, render the Tracker (always show progress even if closed) */
        <MagangStatusTracker steps={steps} application={application as unknown as Parameters<typeof MagangStatusTracker>[0]["application"]} />
      ) : !isOpen ? (
        /* If closed and has no active application */
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="bg-amber-50 rounded-2xl border border-amber-200 p-8 text-center text-amber-850 max-w-xl mx-auto">
            <svg className="w-12 h-12 mx-auto text-amber-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
            </svg>
            <h3 className="font-bold text-lg font-sans">Pendaftaran Magang Ditutup</h3>
            <p className="text-sm mt-1 font-sans">Saat ini pendaftaran magang di BBLSDM Komdigi Medan sedang ditutup sementara.</p>
          </div>
        </section>
      ) : !session ? (
        /* If open but not logged in (guests) */
        <div className="space-y-12 pt-0 pb-8 sm:pb-12">
          {/* Stepper Information Section */}
          <section className="bg-slate-50 border-y border-slate-100 pt-6 pb-12 sm:pt-8 sm:pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-extrabold text-[#0b1b3d]">
                  Alur Pendaftaran &amp; Seleksi Magang
                </h2>
                <p className="text-sm text-slate-500 max-w-lg mx-auto">
                  Pelajari 5 tahapan prosedur pelaksanaan program magang di BBLSDM Komdigi Medan berikut ini.
                </p>
              </div>

              <div className="relative">
                {/* Horizontal Connecting Line */}
                <div className="hidden md:block absolute top-7 left-10 right-10 h-0.5 bg-slate-200" />
                
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  {steps.map((s) => (
                    <div key={s.step} className="flex flex-col items-center text-center space-y-3 relative group">
                      
                      {/* Step Circle */}
                      <div className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center font-bold text-base bg-white text-[#0284c7] border border-sky-200 shadow-xs font-sans">
                        {s.step}
                      </div>
                      
                      {/* Title & Description */}
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-sans">
                          {s.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 leading-normal max-w-[150px] mx-auto">
                          {s.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Login / Register Required Box */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 text-center max-w-xl mx-auto space-y-6 shadow-sm">
              <div className="w-16 h-16 bg-sky-50 text-[#0284c7] border border-sky-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-extrabold text-xl text-[#0b1b3d]">Mulai Pengajuan Magang</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-sans">
                  Silakan buat akun pendaftaran baru atau masuk menggunakan akun Anda untuk mulai mengisi formulir pendaftaran online dan memantau status seleksi berkas.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 font-sans">
                <Link
                  href="/register?callbackUrl=/layanan/magang"
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#0284c7] hover:bg-[#0b1b3d] text-white text-xs font-bold uppercase rounded-lg tracking-wider shadow-sm transition"
                >
                  Daftar Akun Baru
                </Link>
                <Link
                  href="/login?callbackUrl=/layanan/magang"
                  className="w-full sm:w-auto px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase rounded-lg tracking-wider transition"
                >
                  Masuk ke Akun Saya
                </Link>
              </div>
            </div>
          </section>
        </div>
      ) : (
        /* If open and logged in */
        <MagangForm
          steps={steps}
          isOpen={true}
          userEmail={session.user?.email || ""}
          userName={session.user?.name || ""}
        />
      )}
    </>
  );
}
