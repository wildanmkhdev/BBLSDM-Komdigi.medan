"use client";

import { useState, FormEvent } from "react";

export default function KontakPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Pertanyaan Umum",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "Pertanyaan Umum",
        message: "",
      });
    }, 4000);
  };

  return (
    <div className="bg-white">
      {/* Banner Header */}
      <section className="bg-slate-50 border-b border-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold tracking-widest bg-[#0284c7]/10 text-[#0284c7] uppercase">
            Hubungi Kami
          </div>
          <h1 className="text-3xl font-extrabold text-[#0b1b3d] sm:text-4xl">
            Kontak BBLSDM Komdigi Medan
          </h1>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Layanan informasi resmi, konsultasi diklat vokasi digital, pengajuan riset, dan kanal komunikasi publik.
          </p>
          <div className="w-12 h-1 bg-[#0284c7] mx-auto rounded-full mt-4"></div>
        </div>
      </section>

      {/* Contact Content Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Left Column: Form Card */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-10 relative overflow-hidden space-y-6 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl">

              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#0284c7]">
                  Kanal Pengaduan &amp; Layanan Informasi
                </span>
                <h2 className="text-2xl font-extrabold text-[#0b1b3d]">
                  Kirim Pesan atau Pertanyaan
                </h2>
                <p className="text-xs text-slate-500">
                  Silakan lengkapi formulir di bawah ini. Tim sekretariat akan merespons pesan Anda dalam jam kerja operasional.
                </p>
              </div>

              <hr className="border-slate-100" />

              {submitted ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-lg font-bold">
                    ✓
                  </div>
                  <h3 className="text-sm font-bold text-emerald-900">
                    Pesan Anda Berhasil Terkirim!
                  </h3>
                  <p className="text-xs text-emerald-700">
                    Terima kasih atas masukan/pertanyaan Anda. Nomor tiket konfirmasi telah dikirimkan ke email Anda.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">
                        Nama Lengkap <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Masukkan nama Anda"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:bg-white text-slate-800"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">
                        Alamat Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="contoh@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:bg-white text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">
                        Nomor WhatsApp / Telepon
                      </label>
                      <input
                        type="tel"
                        placeholder="0812xxxx"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:bg-white text-slate-800"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">
                        Kategori Topik
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:bg-white text-slate-800"
                      >
                        <option value="Pertanyaan Umum">Pertanyaan Umum</option>
                        <option value="Info Pelatihan DTS">Info Pelatihan DTS</option>
                        <option value="Pengajuan Magang">Pengajuan Magang</option>
                        <option value="Kerja Sama Riset">Kerja Sama Riset</option>
                        <option value="Layanan Publik">Layanan Publik</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700">
                      Isi Pesan <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tuliskan rincian pesan atau pertanyaan Anda di sini..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:bg-white text-slate-800 resize-y"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-xs font-extrabold bg-[#0284c7] text-white hover:bg-[#0284c7]/90 transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <span>Kirim Pesan Sekarang</span>
                  </button>
                </form>
              )}
            </div>

            {/* Right Column: Contact Info */}
            <div className="lg:col-span-5 space-y-6">

              {/* Office Address Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#0284c7] flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-[#0b1b3d]">Alamat Kantor Utama</h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">
                      Jl. Tombak No. 31, Kel. Nangka, Kec. Medan Barat, Kota Medan, Sumatera Utara 20115
                    </p>
                  </div>
                </div>
              </div>

              {/* Telephone Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#0284c7] flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-[#0b1b3d]">Telepon &amp; Sekretariat</h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">(061) 7362800 / 7362801</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Jam Layanan: Senin – Jumat (08:00 – 16:00 WIB)</p>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#0284c7] flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-[#0b1b3d]">Email Resmi Portal</h3>
                    <p className="text-xs text-[#0284c7] font-semibold mt-1">bblsdm_medan@komdigi.go.id</p>
                  </div>
                </div>
              </div>

              {/* Satellite Map — Google Maps embed dengan layer satelit */}
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
                <div className="px-4 pt-4 pb-2 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0b1b3d] flex items-center gap-1.5">
                    <span className="inline-block w-2 h-2 rounded-full bg-[#0284c7]"></span>
                    Peta Satelit Lokasi Kantor
                  </span>
                  <a
                    href="https://www.google.com/maps/place/Jl.+Tombak+No.31,+Nangka,+Kec.+Medan+Barat,+Kota+Medan,+Sumatera+Utara+20115/@3.5897,98.6637,17z"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] font-bold text-[#0284c7] hover:underline flex items-center gap-1"
                  >
                    Buka Maps →
                  </a>
                </div>
                {/* Google Maps iframe dengan parameter layer satelit (t=k) */}
                <div className="relative h-52 w-full overflow-hidden">
                  <iframe
                    title="Peta Satelit BBLSDM Komdigi Medan"
                    src="https://maps.google.com/maps?q=Jl.+Tombak+No.31+Medan+Barat+Sumatera+Utara&t=k&z=17&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />

                  {/* Animated Electric Blue Location Marker Pin (Bounce Animation) */}
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center pb-8">
                    <div className="flex flex-col items-center animate-bounce">
                      <div className="relative filter drop-shadow-[0_4px_8px_rgba(2,132,199,0.6)]">
                        <svg className="w-9 h-9 text-[#0284c7] fill-current stroke-white stroke-[0.8]" viewBox="0 0 24 24">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                      </div>
                      <div className="w-3.5 h-1 bg-black/60 rounded-full blur-[1px] -mt-1"></div>
                    </div>
                  </div>

                  {/* Overlay label */}
                  <div className="absolute bottom-2 left-2 bg-[#0b1b3d]/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-md backdrop-blur-sm flex items-center gap-1.5 border border-sky-500/30 shadow-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0284c7]"></span>
                    </span>
                    <span>BBLSDM Komdigi Medan</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
