"use client";

import React, { useState } from "react";

export default function KontakPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Umum",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate network submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "Umum", message: "" });
    }, 1500);
  };

  return (
    <main className="flex-1 bg-[#f8f9fa] dark:bg-zinc-950 min-h-screen">
      {/* Header section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#0a2540] via-[#0f345c] to-[#0a2540] py-16 px-6 text-white shadow-md">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,212,255,0.15),transparent)] pointer-events-none" />
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-400">
            <span>Beranda</span>
            <span>/</span>
            <span className="text-gray-300">Kontak</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-sky-100 to-sky-300 bg-clip-text text-transparent">
            Hubungi Kami
          </h1>
          <p className="text-sm md:text-base text-gray-300 max-w-3xl leading-relaxed">
            Punya pertanyaan mengenai program pelatihan, pengajuan magang, atau riset publikasi kami? Sampaikan pesan Anda secara langsung melalui formulir di bawah ini.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-6xl mx-auto py-12 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
          
          {/* Info Card - Left (takes 2 cols on lg) */}
          <div className="lg:col-span-2 relative overflow-hidden rounded-2xl bg-[#0a2540] text-white p-8 shadow-xl flex flex-col justify-between space-y-8">
            <div className="absolute top-0 right-0 h-32 w-32 bg-[radial-gradient(circle_at_top_right,rgba(0,212,255,0.25),transparent)] pointer-events-none" />
            
            <div className="space-y-6">
              <h2 className="text-xl font-bold border-b border-gray-700/60 pb-3">
                Informasi Kantor
              </h2>
              
              {/* Address */}
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[#00d4ff]">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Alamat Utama</h3>
                  <p className="text-xs text-gray-200 leading-relaxed">
                    Jl. Tombak No. 24, Sidorejo Hilir, Kec. Medan Tembung, Kota Medan, Sumatera Utara 20222
                  </p>
                </div>
              </div>

              {/* Call/Fax */}
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[#00d4ff]">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Telepon & Email</h3>
                  <p className="text-xs text-gray-200">
                    +62 (61) 7322-123<br />
                    bblsdm.medan@komdigi.go.id
                  </p>
                </div>
              </div>

              {/* Work Hours */}
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[#00d4ff]">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Jam Operasional</h3>
                  <p className="text-xs text-gray-200">
                    Senin - Jumat: 08:00 - 16:30 WIB<br />
                    Sabtu, Minggu & Hari Libur: Tutup
                  </p>
                </div>
              </div>
            </div>

            {/* Styled Map Mockup */}
            <div className="rounded-xl overflow-hidden bg-white/5 border border-white/10 p-2 flex flex-col space-y-2">
              <div className="flex justify-between items-center px-1 text-[10px] text-gray-400">
                <span className="font-bold">Peta Lokasi Kantor</span>
                <span className="text-[#00d4ff]">Buka di Maps ↗</span>
              </div>
              {/* Custom graphic layout instead of heavy iframe */}
              <div className="h-28 rounded-lg bg-[#0f345c] relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.1),transparent)]" />
                {/* SVG mock map lanes */}
                <svg className="absolute inset-0 h-full w-full opacity-20" fill="none">
                  <path d="M 0,20 Q 30,10 80,40 T 200,30 T 400,60" stroke="#fff" strokeWidth="2" />
                  <path d="M 50,0 Q 80,80 120,120 T 150,200" stroke="#fff" strokeWidth="1.5" />
                  <path d="M 0,90 Q 150,70 300,100" stroke="#fff" strokeWidth="3" />
                </svg>
                {/* Red Pin indicator */}
                <div className="relative z-10 flex flex-col items-center animate-bounce">
                  <div className="h-6 w-6 rounded-full bg-red-500 border-2 border-white flex items-center justify-center shadow-lg">
                    <span className="h-2 w-2 rounded-full bg-white" />
                  </div>
                  <div className="h-2 w-0.5 bg-red-500" />
                </div>
                <div className="absolute bottom-2 left-2 z-10 bg-black/60 px-2 py-0.5 rounded text-[8px] font-bold">
                  BBLSDM Komdigi Medan
                </div>
              </div>
            </div>
          </div>

          {/* Form Card - Right (takes 3 cols on lg) */}
          <div className="lg:col-span-3 relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-md dark:border-zinc-800 dark:bg-zinc-900">
            {/* Left accent vertical line */}
            <div className="absolute top-0 left-0 h-full w-[4px] bg-[#00d4ff]" />

            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4 animate-scale-up">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300">
                  <svg className="h-8 w-8 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-[#0a2540] dark:text-white">Pesan Terkirim!</h2>
                <p className="text-xs text-gray-500 max-w-sm leading-relaxed dark:text-zinc-400">
                  Terima kasih atas pesan Anda. Tim Humas BBLSDM Komdigi Medan akan segera meninjau dan merespons pesan Anda dalam kurun waktu 1-2 hari kerja.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 inline-flex items-center gap-1 text-xs font-bold text-[#00d4ff] hover:text-[#00b8e6] focus:outline-none"
                >
                  Kirim Pesan Lainnya
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-[#0a2540] dark:text-white mb-1">
                    Kirim Pesan Langsung
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-zinc-400">
                    Lengkapi kolom formulir di bawah ini dengan informasi yang valid.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-400">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Masukkan nama Anda"
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-400">
                      Alamat Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="nama@domain.com"
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
                    />
                  </div>
                </div>

                {/* Subject Type field */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-400">
                    Topik Pertanyaan / Keperluan
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00d4ff] dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
                  >
                    <option value="Umum">Pertanyaan Umum (Informasi / Galeri)</option>
                    <option value="Pelatihan">Program Pelatihan & Sertifikasi</option>
                    <option value="Magang">Pengajuan Kerja Praktik / Magang</option>
                    <option value="Kerjasama">Riset, Penelitian & Kerja Sama</option>
                  </select>
                </div>

                {/* Message field */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-400">
                    Isi Pesan
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tuliskan pesan Anda secara mendetail di sini..."
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent dark:bg-zinc-800 dark:border-zinc-700 dark:text-white resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#00d4ff] py-3 text-xs font-bold text-[#0a2540] shadow-sm transition-all duration-300 hover:bg-[#00b8e6] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:ring-offset-2 active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#0a2540]" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Kirim Pesan
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
