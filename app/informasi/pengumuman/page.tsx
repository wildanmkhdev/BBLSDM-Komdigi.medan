"use client";

import React, { useState, useMemo } from "react";

interface PengumumanItem {
  id: string;
  title: string;
  category: string;
  date: string;
  fileSize?: string;
  fileFormat?: string;
  downloadUrl?: string;
  priority: "high" | "normal";
  content: string;
}

const pengumumanData: PengumumanItem[] = [
  {
    id: "1",
    title: "Jadwal Pelaksanaan Ujian Sertifikasi Kompetensi Digital Periode Juli 2026",
    category: "Sertifikasi",
    date: "20 Juli 2026",
    fileSize: "1.2 MB",
    fileFormat: "PDF",
    downloadUrl: "#",
    priority: "high",
    content: "Ujian sertifikasi kompetensi digital periode Juli 2026 akan dilaksanakan pada tanggal 25-27 Juli 2026 di Laboratorium Komputer BBLSDM Komdigi Medan. Peserta terdaftar wajib hadir 30 menit sebelum jadwal sesi ujian dengan membawa kartu identitas resmi.",
  },
  {
    title: "Pengumuman Hasil Seleksi Administrasi Peserta Magang Gelombang II 2026",
    id: "2",
    category: "Rekrutmen & Magang",
    date: "18 Juli 2026",
    fileSize: "850 KB",
    fileFormat: "PDF",
    downloadUrl: "#",
    priority: "normal",
    content: "Hasil seleksi administrasi program magang industri mahasiswa semester gasal TA 2026/2027 telah diterbitkan. Bagi calon peserta yang dinyatakan Lolos, dimohon mengikuti pengarahan teknis secara daring pada 22 Juli 2026.",
  },
  {
    id: "3",
    title: "Penyesuaian Jam Pelayanan Operasional Publik & Sekretariat BBLSDM Medan",
    category: "Layanan Publik",
    date: "15 Juli 2026",
    fileSize: "500 KB",
    fileFormat: "PDF",
    downloadUrl: "#",
    priority: "high",
    content: "Sehubungan dengan agenda pemeliharaan jaringan dan audit internal, jam layanan tatap muka sekretariat BBLSDM Komdigi Medan mengalami penyesuaian khusus. Pelayanan surat-menyurat dan konsultasi online tetap beroperasi normal.",
  },
  {
    id: "4",
    title: "Pembukaan Pendaftaran Pelatihan Digital Entrepreneurship Academy (DEA) Batch 4",
    category: "Pelatihan",
    date: "12 Juli 2026",
    fileSize: "2.1 MB",
    fileFormat: "PDF",
    downloadUrl: "#",
    priority: "normal",
    content: "BBLSDM Komdigi Medan membuka pendaftaran pelatihan Digital Entrepreneurship Academy (DEA) bagi pelaku UMKM di wilayah Sumatera Utara dan sekitarnya. Pelatihan tidak dipungut biaya (gratis). Kuota terbatas untuk 200 peserta.",
  },
  {
    id: "5",
    title: "Pengumuman Pemenang Call for Research Proposal Kolaborasi Riset TIK 2026",
    category: "Riset & Kebijakan",
    date: "08 Juli 2026",
    fileSize: "1.5 MB",
    fileFormat: "PDF",
    downloadUrl: "#",
    priority: "normal",
    content: "Selamat kepada 10 proposal riset akademisi dan peneliti perguruan tinggi mitra yang berhasil lolos pendanaan program Kolaborasi Riset Komunikasi & TIK BBLSDM Komdigi Medan Tahun Anggaran 2026.",
  },
];

export default function PengumumanPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [activeModalItem, setActiveModalItem] = useState<PengumumanItem | null>(null);

  const filteredPengumuman = useMemo(() => {
    return pengumumanData.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === "Semua" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="bg-white">
      {/* Header Banner (Pola Standard app/profil) */}
      <section className="bg-slate-50 border-b border-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold tracking-widest bg-[#0284c7]/10 text-[#0284c7] uppercase">
            Informasi Resmi
          </div>
          <h1 className="text-3xl font-extrabold text-[#0b1b3d] sm:text-4xl">
            Pengumuman Instansi
          </h1>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Dapatkan informasi terkini seputar jadwal ujian sertifikasi, pengumuman hasil kelulusan, penyesuaian jam layanan, dan agenda resmi BBLSDM Komdigi Medan.
          </p>
          <div className="w-12 h-1 bg-[#0284c7] mx-auto rounded-full mt-4"></div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 bg-slate-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Search & Filter Bar */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Cari pengumuman..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:border-transparent bg-slate-50 text-slate-800"
              />
              <svg
                className="absolute left-3.5 top-3 h-4 w-4 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto shrink-0 justify-end">
              <span className="text-xs font-bold text-slate-500 uppercase">Kategori:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
              >
                <option value="Semua">Semua Kategori</option>
                <option value="Sertifikasi">Sertifikasi</option>
                <option value="Rekrutmen &amp; Magang">Rekrutmen &amp; Magang</option>
                <option value="Layanan Publik">Layanan Publik</option>
                <option value="Pelatihan">Pelatihan</option>
                <option value="Riset &amp; Kebijakan">Riset &amp; Kebijakan</option>
              </select>
            </div>
          </div>

          {/* Cards List */}
          {filteredPengumuman.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPengumuman.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden flex flex-col justify-between"
                >
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                      item.priority === "high" ? "bg-amber-500" : "bg-[#0284c7]"
                    }`}
                  ></div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center rounded-full bg-sky-50 px-2.5 py-0.5 text-[10px] font-bold text-[#0284c7] uppercase">
                        {item.category}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {item.date}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#0b1b3d] leading-snug group-hover:text-[#0284c7] transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {item.content}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => setActiveModalItem(item)}
                      className="text-xs font-bold text-[#0284c7] hover:underline flex items-center gap-1"
                    >
                      <span>Baca Pengumuman Lengkap</span>
                      <span>→</span>
                    </button>
                    {item.fileSize && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                        📄 {item.fileFormat} ({item.fileSize})
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl border border-slate-200 shadow-sm">
              <svg
                className="mx-auto h-12 w-12 text-slate-300 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3h7.5M6 20.25h12a2.25 2.25 0 002.25-2.25V8.25a2.25 2.25 0 00-2.25-2.25H12"
                />
              </svg>
              <h3 className="text-sm font-bold text-slate-800">Pengumuman Tidak Ditemukan</h3>
              <p className="text-xs text-slate-500 mt-1">Coba gunakan kueri atau filter kategori lain.</p>
            </div>
          )}
        </div>
      </section>

      {/* Modal Detail View */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div
            className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`absolute left-0 top-0 bottom-0 w-2 ${
                activeModalItem.priority === "high" ? "bg-amber-500" : "bg-[#0284c7]"
              }`}
            ></div>

            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="inline-flex items-center rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-bold text-[#0284c7] uppercase">
                  {activeModalItem.category}
                </span>
                <h2 className="text-xl font-extrabold text-[#0b1b3d]">
                  {activeModalItem.title}
                </h2>
                <p className="text-xs text-slate-400 font-semibold">
                  Diterbitkan pada: {activeModalItem.date}
                </p>
              </div>

              <button
                onClick={() => setActiveModalItem(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <hr className="border-slate-100" />

            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4">
              <p>{activeModalItem.content}</p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              {activeModalItem.downloadUrl && (
                <a
                  href={activeModalItem.downloadUrl}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#0284c7] text-white text-xs font-bold hover:bg-[#0284c7]/90 transition-colors"
                >
                  <span>Unduh Lampiran Resmi ({activeModalItem.fileFormat})</span>
                </a>
              )}
              <button
                onClick={() => setActiveModalItem(null)}
                className="w-full sm:w-auto px-4 py-2 text-xs font-bold text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50"
              >
                Tutup Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
