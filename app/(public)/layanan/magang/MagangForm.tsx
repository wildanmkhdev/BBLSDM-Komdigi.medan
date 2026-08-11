"use client";

import { useState, type FormEvent } from "react";
import { submitPendaftaranMagang } from "@/actions/magang";
import { uploadFile } from "@/actions/media";

interface Step {
  step: number;
  title: string;
  description: string;
}

export default function MagangForm({
  steps,
  isOpen,
  userEmail = "",
  userName = "",
}: {
  steps: Step[];
  isOpen: boolean;
  userEmail?: string;
  userName?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [proposalId, setProposalId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    nama: userName,
    email: userEmail,
    telepon: "",
    institusi: "",
    jurusan: "",
    semester: "",
    periode: "",
    motivasi: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!proposalId) {
      setError("Wajib mengunggah Surat Pengantar (PDF) dari Kampus/Sekolah.");
      setLoading(false);
      return;
    }

    const res = await submitPendaftaranMagang({
      fullName: formData.nama,
      email: formData.email,
      phone: formData.telepon,
      institution: formData.institusi,
      major: formData.jurusan,
      semester: formData.semester,
      periode: formData.periode,
      motivation: formData.motivasi,
      proposalId,
    });

    if (res.success) {
      setSubmitted(true);
    } else {
      setError("Gagal mengirim formulir. Lengkapi isian Anda dengan benar.");
    }
    setLoading(false);
  }

  return (
    <>
      {/* Interactive Stepper Visual Header */}
      <section className="bg-slate-50 border-b border-slate-100 pt-6 pb-12 sm:pt-8 sm:pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="inline-flex px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-sky-50 text-[#0284c7] border border-sky-100 font-sans">
              Tahap 1 Dari 5: Pengisian Berkas Pendaftaran
            </span>
            <h2 className="text-2xl font-extrabold text-[#0b1b3d]">
              Alur Pendaftaran &amp; Seleksi Magang
            </h2>
          </div>

          <div className="relative">
            {/* Horizontal Connecting Line */}
            <div className="hidden md:block absolute top-7 left-10 right-10 h-0.5 bg-slate-200" />
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {steps.map((s, idx) => {
                const isActive = idx === 0;
                return (
                  <div key={s.step} className="flex flex-col items-center text-center space-y-3 relative group">
                    
                    {/* Step Circle */}
                    <div className={`relative z-10 w-14 h-14 rounded-full flex items-center justify-center font-bold text-base transition-all duration-300 shadow-xs font-sans ${
                      isActive ? "bg-[#0284c7] text-white ring-4 ring-sky-100" : "bg-white text-slate-400 border border-slate-200"
                    }`}>
                      {s.step}
                    </div>
                    
                    {/* Title & Description */}
                    <div className="space-y-1">
                      <h4 className={`text-xs font-bold uppercase tracking-wider font-sans ${
                        isActive ? "text-[#0284c7]" : "text-slate-400"
                      }`}>
                        {s.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 leading-normal max-w-[150px] mx-auto">
                        {s.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-2xl mx-auto">
          
          {!isOpen ? (
            <div className="bg-amber-50 rounded-2xl border border-amber-200 p-8 text-center text-amber-800">
              <svg className="w-12 h-12 mx-auto text-amber-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
              </svg>
              <h3 className="font-bold text-lg">Pendaftaran Magang Ditutup</h3>
              <p className="text-sm mt-1">Saat ini pendaftaran magang di BBLSDM Komdigi Medan sedang ditutup sementara.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 sm:p-8">
                <h2 className="text-xl font-bold text-navy mb-1">
                  Formulir Pendaftaran Magang
                </h2>
                <p className="text-sm text-text-muted mb-8">
                  Isi semua field yang wajib (*) untuk mendaftar program magang.
                </p>

                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
                    {error}
                  </div>
                )}

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-navy mb-2">
                      Pendaftaran Berhasil Dikirim!
                    </h3>
                    <p className="text-text-muted mb-6">
                      Terima kasih, {formData.nama}. Data Anda telah tersimpan di sistem kami. Kami akan menghubungi Anda melalui email <strong>{formData.email}</strong> setelah verifikasi berkas selesai.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          nama: "",
                          email: "",
                          telepon: "",
                          institusi: "",
                          jurusan: "",
                          semester: "",
                          periode: "",
                          motivasi: "",
                        });
                      }}
                      className="px-6 py-2.5 bg-sky-primary hover:bg-sky-dark text-white text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer"
                    >
                      Daftar Lagi
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Nama */}
                    <div>
                      <label htmlFor="nama" className="block text-sm font-medium text-navy mb-1.5">
                        Nama Lengkap *
                      </label>
                      <input
                        id="nama"
                        name="nama"
                        type="text"
                        required
                        readOnly
                        value={formData.nama}
                        onChange={handleChange}
                        placeholder="Nama Lengkap"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm bg-slate-50 text-slate-500 outline-none cursor-not-allowed"
                      />
                    </div>

                    {/* Email + Telepon */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-navy mb-1.5">
                          Email *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          readOnly
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="nama@email.com"
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm bg-slate-50 text-slate-500 outline-none cursor-not-allowed"
                        />
                      </div>
                      <div>
                        <label htmlFor="telepon" className="block text-sm font-medium text-navy mb-1.5">
                          Nomor Telepon *
                        </label>
                        <input
                          id="telepon"
                          name="telepon"
                          type="tel"
                          required
                          value={formData.telepon}
                          onChange={handleChange}
                          placeholder="08xxxxxxxxxx"
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:border-sky-accent focus:ring-2 focus:ring-sky-accent/20 outline-none transition-all duration-200"
                        />
                      </div>
                    </div>

                    {/* Institusi + Jurusan */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="institusi" className="block text-sm font-medium text-navy mb-1.5">
                          Institusi / Perguruan Tinggi *
                        </label>
                        <input
                          id="institusi"
                          name="institusi"
                          type="text"
                          required
                          value={formData.institusi}
                          onChange={handleChange}
                          placeholder="Nama universitas"
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:border-sky-accent focus:ring-2 focus:ring-sky-accent/20 outline-none transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label htmlFor="jurusan" className="block text-sm font-medium text-navy mb-1.5">
                          Jurusan / Program Studi *
                        </label>
                        <input
                          id="jurusan"
                          name="jurusan"
                          type="text"
                          required
                          value={formData.jurusan}
                          onChange={handleChange}
                          placeholder="Contoh: Teknik Informatika"
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:border-sky-accent focus:ring-2 focus:ring-sky-accent/20 outline-none transition-all duration-200"
                        />
                      </div>
                    </div>

                    {/* Semester + Periode */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="semester" className="block text-sm font-medium text-navy mb-1.5">
                          Semester Saat Ini *
                        </label>
                        <select
                          id="semester"
                          name="semester"
                          required
                          value={formData.semester}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:border-sky-accent focus:ring-2 focus:ring-sky-accent/20 outline-none transition-all duration-200 bg-white"
                        >
                          <option value="">Pilih semester</option>
                          <option value="5">Semester 5</option>
                          <option value="6">Semester 6</option>
                          <option value="7">Semester 7</option>
                          <option value="8">Semester 8</option>
                          <option value="9+">Semester 9+</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="periode" className="block text-sm font-medium text-navy mb-1.5">
                          Periode Magang *
                        </label>
                        <select
                          id="periode"
                          name="periode"
                          required
                          value={formData.periode}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:border-sky-accent focus:ring-2 focus:ring-sky-accent/20 outline-none transition-all duration-200 bg-white"
                        >
                          <option value="">Pilih periode</option>
                          <option value="agustus-oktober-2026">Agustus — Oktober 2026</option>
                          <option value="november-januari-2027">November 2026 — Januari 2027</option>
                          <option value="februari-april-2027">Februari — April 2027</option>
                        </select>
                      </div>
                    </div>

                    {/* Surat Pengantar Kampus */}
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5 font-sans">
                        Surat Pengantar Kampus/Sekolah (PDF) *
                      </label>
                      <div className="flex items-center gap-4 border border-gray-200 rounded-lg p-3 bg-slate-50/50">
                        <input
                          type="file"
                          accept="application/pdf"
                          required
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;

                            setUploading(true);
                            setError(null);

                            const fData = new FormData();
                            fData.append("file", file);
                            fData.append("altText", `Surat Pengantar ${userName}`);

                            const res = await uploadFile(fData);
                            if (res.success && res.media) {
                              setProposalId(res.media.id);
                            } else {
                              setError(res.error || "Gagal mengunggah Surat Pengantar. Pastikan file berupa PDF.");
                            }
                            setUploading(false);
                          }}
                          className="text-xs text-slate-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-sky-50 file:text-[#0284c7] hover:file:bg-sky-100 cursor-pointer"
                        />
                        {uploading && <span className="text-xs text-[#0284c7] animate-pulse">Mengunggah PDF...</span>}
                        {proposalId && <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 font-sans">✓ Terunggah</span>}
                      </div>
                    </div>

                    {/* Motivasi */}
                    <div>
                      <label htmlFor="motivasi" className="block text-sm font-medium text-navy mb-1.5">
                        Motivasi Magang *
                      </label>
                      <textarea
                        id="motivasi"
                        name="motivasi"
                        required
                        rows={4}
                        value={formData.motivasi}
                        onChange={handleChange}
                        placeholder="Ceritakan motivasi Anda mengikuti program magang di BBLSDM Komdigi Medan..."
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:border-sky-accent focus:ring-2 focus:ring-sky-accent/20 outline-none transition-all duration-200 resize-none font-sans text-slate-900"
                      />
                    </div>

                    {/* Note */}
                    <div className="bg-sky-accent/5 rounded-lg p-4 border border-sky-accent/10">
                      <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-sky-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                        </svg>
                        <p className="text-xs text-text-muted leading-relaxed">
                          Pastikan surat pengantar dari institusi dan transkrip nilai sudah disiapkan. Dokumen asli akan diminta pada saat proses verifikasi kelengkapan berkas oleh admin.
                        </p>
                      </div>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 bg-sky-primary hover:bg-sky-dark text-white font-semibold rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md cursor-pointer disabled:opacity-50"
                    >
                      {loading ? "Mengirim..." : "Kirim Pendaftaran"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
