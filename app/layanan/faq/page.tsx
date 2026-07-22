"use client";

import { useState } from "react";
import PageHeader from "@/app/components/PageHeader";

/* ──────────────────────────────────────────
   FAQ Data
   ────────────────────────────────────────── */
const faqCategories = [
  { id: "umum", label: "Umum" },
  { id: "pelatihan", label: "Pelatihan" },
  { id: "sertifikasi", label: "Sertifikasi" },
  { id: "magang", label: "Magang" },
  { id: "layanan", label: "Layanan" },
];

const faqList = [
  {
    id: 1,
    category: "umum",
    question: "Apa itu BBLSDM Komdigi Medan?",
    answer:
      "BBLSDM Komdigi Medan (Balai Besar Litbang Sumber Daya Manusia Kementerian Komunikasi dan Digital) adalah unit pelaksana teknis yang bertugas melaksanakan pengembangan sumber daya manusia di bidang komunikasi dan informatika melalui pelatihan, sertifikasi, penelitian, dan pengembangan kompetensi di wilayah Sumatera.",
  },
  {
    id: 2,
    category: "umum",
    question: "Di mana lokasi kantor BBLSDM Komdigi Medan?",
    answer:
      "Kantor utama BBLSDM Komdigi Medan berlokasi di Jl. Letjend. Djamin Ginting No. 1, Medan 20155, Sumatera Utara. Kantor wilayah juga tersebar di 10 provinsi se-Sumatera.",
  },
  {
    id: 3,
    category: "umum",
    question: "Apa saja jam operasional kantor?",
    answer:
      "Jam operasional kantor BBLSDM Komdigi Medan adalah Senin-Jumat, pukul 08.00-16.00 WIB. Pelayanan online melalui website dan email tersedia 24 jam.",
  },
  {
    id: 4,
    category: "pelatihan",
    question: "Bagaimana cara mendaftar pelatihan?",
    answer:
      "Pendaftaran pelatihan dilakukan melalui halaman Pelatihan di website ini. Pilih program yang diminati, klik tombol 'Daftar Sekarang', dan isi formulir pendaftaran online. Anda akan menerima konfirmasi melalui email.",
  },
  {
    id: 5,
    category: "pelatihan",
    question: "Apakah pelatihan dikenakan biaya?",
    answer:
      "Sebagian besar pelatihan yang diselenggarakan BBLSDM Komdigi Medan tidak dikenakan biaya (gratis) untuk peserta dari instansi pemerintah. Untuk peserta umum, beberapa pelatihan mungkin dikenakan biaya administrasi yang akan diinformasikan saat pendaftaran.",
  },
  {
    id: 6,
    category: "pelatihan",
    question: "Apakah peserta mendapatkan sertifikat setelah pelatihan?",
    answer:
      "Ya, setiap peserta yang menyelesaikan pelatihan dan memenuhi syarat kelulusan akan mendapatkan sertifikat resmi dari BBLSDM Komdigi Medan. Sertifikat diterbitkan dalam format digital dan/atau cetak.",
  },
  {
    id: 7,
    category: "sertifikasi",
    question: "Apa perbedaan sertifikat pelatihan dengan sertifikasi kompetensi?",
    answer:
      "Sertifikat pelatihan diberikan setelah mengikuti program pelatihan tertentu. Sertifikasi kompetensi adalah pengakuan resmi terhadap kompetensi seseorang berdasarkan standar nasional, yang diperoleh melalui uji kompetensi oleh Lembaga Sertifikasi Profesi (LSP).",
  },
  {
    id: 8,
    category: "sertifikasi",
    question: "Bagaimana cara mengikuti ujian sertifikasi?",
    answer:
      "Jadwal ujian sertifikasi diumumkan melalui halaman Pengumuman. Calon peserta mendaftar online, menyerahkan portofolio/bukti kompetensi, dan mengikuti asesmen sesuai jadwal. Hasil ujian diumumkan dalam waktu 14 hari kerja.",
  },
  {
    id: 9,
    category: "magang",
    question: "Siapa saja yang bisa mendaftar magang?",
    answer:
      "Program magang terbuka untuk mahasiswa aktif semester 5 ke atas dari seluruh perguruan tinggi di Indonesia, baik negeri maupun swasta, dengan jurusan yang relevan dengan bidang komunikasi, informatika, dan teknologi digital.",
  },
  {
    id: 10,
    category: "magang",
    question: "Berapa lama durasi program magang?",
    answer:
      "Durasi program magang adalah 2-3 bulan per periode. Terdapat 3 periode magang dalam setahun: Agustus-Oktober, November-Januari, dan Februari-April.",
  },
  {
    id: 11,
    category: "magang",
    question: "Dokumen apa saja yang diperlukan untuk mendaftar magang?",
    answer:
      "Dokumen yang diperlukan: (1) Surat pengantar dari institusi/kampus, (2) Transkrip nilai terakhir, (3) CV/Resume, (4) KTP/Kartu identitas mahasiswa, (5) Pas foto terbaru. Dokumen diunggah saat proses verifikasi setelah formulir online disetujui.",
  },
  {
    id: 12,
    category: "layanan",
    question: "Bagaimana cara menghubungi BBLSDM Komdigi Medan?",
    answer:
      "Anda dapat menghubungi kami melalui telepon (061) 821-0000, email info@bblsdm-medan.go.id, atau mengisi formulir di halaman Kontak. Anda juga bisa memberikan masukan melalui halaman Feedback.",
  },
  {
    id: 13,
    category: "layanan",
    question: "Apakah ada layanan konsultasi teknis?",
    answer:
      "Ya, BBLSDM Komdigi Medan menyediakan layanan konsultasi teknis di bidang komunikasi dan informatika untuk instansi pemerintah daerah. Untuk konsultasi, silakan hubungi kami melalui email atau telepon untuk menjadwalkan sesi.",
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("umum");
  const [openId, setOpenId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = faqList.filter((faq) => {
    const matchCategory = faq.category === activeCategory;
    const matchSearch =
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <>
      <PageHeader
        title="Frequently Asked Questions"
        subtitle="Temukan jawaban atas pertanyaan yang sering diajukan tentang layanan BBLSDM Komdigi Medan"
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Layanan", href: "#" },
          { label: "FAQ" },
        ]}
      />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Search */}
        <div className="relative mb-8">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari pertanyaan..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-sky-accent focus:ring-2 focus:ring-sky-accent/20 outline-none transition-all duration-200"
          />
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {faqCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setOpenId(null);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat.id
                  ? "bg-navy text-white shadow-md"
                  : "bg-offwhite text-text-muted hover:bg-navy/5 hover:text-navy border border-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {filtered.map((faq) => (
            <div
              key={faq.id}
              className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
              >
                <span className="font-medium text-navy text-[15px] leading-snug">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-sky-accent shrink-0 transition-transform duration-300 ${
                    openId === faq.id ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openId === faq.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-5">
                  <div className="h-px bg-gray-100 mb-4" />
                  <p className="text-sm text-text-muted leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-text-light mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
            <p className="text-text-muted">Tidak ada pertanyaan yang cocok.</p>
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-12 bg-gradient-to-br from-navy to-navy-light rounded-2xl p-8 text-center text-white">
          <h3 className="text-xl font-bold mb-2">Masih ada pertanyaan?</h3>
          <p className="text-white/70 mb-6 text-sm">
            Hubungi kami langsung atau kirimkan masukan melalui halaman Feedback.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/kontak"
              className="px-6 py-2.5 bg-white text-navy font-medium text-sm rounded-lg hover:bg-white/90 transition-colors"
            >
              Hubungi Kami
            </a>
            <a
              href="/layanan/feedback"
              className="px-6 py-2.5 bg-sky-accent/20 text-white font-medium text-sm rounded-lg hover:bg-sky-accent/30 transition-colors"
            >
              Kirim Feedback
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
