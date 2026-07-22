"use client";

import { useState, type FormEvent } from "react";
import PageHeader from "@/app/components/PageHeader";

export default function MagangPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
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

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  /* ──────────────────────────────────────────
     Alur pendaftaran steps
     ────────────────────────────────────────── */
  const steps = [
    {
      step: 1,
      title: "Isi Formulir",
      description: "Lengkapi formulir pendaftaran magang online di bawah ini.",
    },
    {
      step: 2,
      title: "Verifikasi Berkas",
      description: "Tim kami akan memverifikasi kelengkapan dan keabsahan berkas Anda.",
    },
    {
      step: 3,
      title: "Seleksi",
      description: "Proses seleksi administrasi dan/atau wawancara jika diperlukan.",
    },
    {
      step: 4,
      title: "Pengumuman",
      description: "Hasil seleksi diumumkan melalui email dan website resmi.",
    },
    {
      step: 5,
      title: "Mulai Magang",
      description: "Lapor diri ke kantor BBLSDM sesuai jadwal yang ditentukan.",
    },
  ];

  return (
    <>
      <PageHeader
        title="Pengajuan Magang"
        subtitle="Program magang di BBLSDM Komdigi Medan — kesempatan belajar langsung di bidang komunikasi dan digital"
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Layanan", href: "#" },
          { label: "Pengajuan Magang" },
        ]}
      />

      {/* Alur Pendaftaran */}
      <section className="bg-offwhite py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy mb-8 text-center">
            Alur Pendaftaran
          </h2>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gray-200" />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {steps.map((s) => (
                <div key={s.step} className="relative flex flex-col items-center text-center">
                  {/* Step circle */}
                  <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-navy to-sky-primary flex items-center justify-center text-white font-bold text-lg shadow-md mb-4">
                    {s.step}
                  </div>
                  <h3 className="font-semibold text-navy text-sm mb-1">
                    {s.title}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Card accent line */}
            <div className="h-1 bg-gradient-to-r from-sky-accent to-sky-primary" />

            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-bold text-navy mb-1">
                Formulir Pendaftaran Magang
              </h2>
              <p className="text-sm text-text-muted mb-8">
                Isi semua field yang wajib (*) untuk mendaftar program magang.
              </p>

              {submitted ? (
                /* Success state */
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
                    Terima kasih, {formData.nama}. Kami akan menghubungi Anda melalui email{" "}
                    <strong>{formData.email}</strong> untuk proses selanjutnya.
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
                    className="px-6 py-2.5 bg-sky-primary hover:bg-sky-dark text-white text-sm font-medium rounded-lg transition-colors duration-200"
                  >
                    Daftar Lagi
                  </button>
                </div>
              ) : (
                /* Form */
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
                      value={formData.nama}
                      onChange={handleChange}
                      placeholder="Masukkan nama lengkap"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:border-sky-accent focus:ring-2 focus:ring-sky-accent/20 outline-none transition-all duration-200"
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
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="nama@email.com"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:border-sky-accent focus:ring-2 focus:ring-sky-accent/20 outline-none transition-all duration-200"
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
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:border-sky-accent focus:ring-2 focus:ring-sky-accent/20 outline-none transition-all duration-200 resize-none"
                    />
                  </div>

                  {/* Note */}
                  <div className="bg-sky-accent/5 rounded-lg p-4 border border-sky-accent/10">
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-sky-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                      </svg>
                      <p className="text-xs text-text-muted leading-relaxed">
                        Pastikan surat pengantar dari institusi dan transkrip nilai sudah disiapkan. Dokumen akan diminta saat proses verifikasi berkas.
                      </p>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full py-3 bg-sky-primary hover:bg-sky-dark text-white font-semibold rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                  >
                    Kirim Pendaftaran
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
