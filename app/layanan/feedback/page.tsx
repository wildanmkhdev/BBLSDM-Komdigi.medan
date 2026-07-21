"use client";

import { useState, type FormEvent } from "react";
import PageHeader from "@/app/components/PageHeader";
import Card from "@/app/components/Card";

/* ──────────────────────────────────────────
   Dummy existing feedback
   ────────────────────────────────────────── */
const existingFeedback = [
  {
    id: 1,
    nama: "Ahmad Rizki",
    subjek: "Pelatihan Sangat Bermanfaat",
    pesan:
      "Pelatihan Digital Marketing yang saya ikuti sangat bermanfaat. Materi yang diberikan up-to-date dan instruktur sangat kompeten. Terima kasih BBLSDM!",
    rating: 5,
    tanggal: "15 Juli 2026",
  },
  {
    id: 2,
    nama: "Siti Nurhaliza",
    subjek: "Proses Magang yang Lancar",
    pesan:
      "Proses pendaftaran magang sangat mudah dan tim BBLSDM sangat responsif. Pengalaman magang di sini memberikan insight yang luar biasa.",
    rating: 5,
    tanggal: "12 Juli 2026",
  },
  {
    id: 3,
    nama: "Budi Santoso",
    subjek: "Saran untuk Website",
    pesan:
      "Website sudah bagus, tapi akan lebih baik jika ditambahkan fitur tracking status pendaftaran pelatihan secara real-time.",
    rating: 4,
    tanggal: "10 Juli 2026",
  },
  {
    id: 4,
    nama: "Diana Putri",
    subjek: "Fasilitas Pelatihan",
    pesan:
      "Fasilitas ruang pelatihan nyaman dan lengkap. Namun, koneksi internet di lab komputer kadang lambat saat sesi praktik.",
    rating: 3,
    tanggal: "8 Juli 2026",
  },
  {
    id: 5,
    nama: "Fajar Hidayat",
    subjek: "Sertifikasi Kompetensi",
    pesan:
      "Program sertifikasi kompetensi digital sangat membantu karir saya. Sertifikat dari BBLSDM diakui oleh banyak perusahaan.",
    rating: 5,
    tanggal: "5 Juli 2026",
  },
  {
    id: 6,
    nama: "Lestari Wulandari",
    subjek: "Acara Seminar yang Inspiratif",
    pesan:
      "Seminar nasional regulasi telekomunikasi sangat informatif. Berharap ada lebih banyak event seperti ini yang terbuka untuk umum.",
    rating: 4,
    tanggal: "1 Juli 2026",
  },
];

/* ──────────────────────────────────────────
   Star Rating component
   ────────────────────────────────────────── */
function StarRating({
  value,
  onChange,
  readOnly = false,
}: {
  value: number;
  onChange?: (v: number) => void;
  readOnly?: boolean;
}) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => !readOnly && setHover(star)}
          onMouseLeave={() => !readOnly && setHover(0)}
          className={`text-xl transition-colors duration-150 ${readOnly ? "cursor-default" : "cursor-pointer"}`}
        >
          <svg
            className={`w-5 h-5 ${
              (hover || value) >= star ? "text-gold fill-gold" : "text-gray-200 fill-gray-200"
            }`}
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </button>
      ))}
    </div>
  );
}

export default function FeedbackPage() {
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    subjek: "",
    pesan: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (rating === 0) return;
    setSubmitted(true);
  }

  // Stats from dummy data
  const avgRating = (
    existingFeedback.reduce((sum, f) => sum + f.rating, 0) /
    existingFeedback.length
  ).toFixed(1);

  return (
    <>
      <PageHeader
        title="Feedback"
        subtitle="Berikan masukan dan saran untuk membantu kami meningkatkan layanan"
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Layanan", href: "#" },
          { label: "Feedback" },
        ]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Form — 3 cols */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-sky-accent to-sky-primary" />

              <div className="p-6 sm:p-8">
                <h2 className="text-xl font-bold text-navy mb-1">
                  Kirim Feedback
                </h2>
                <p className="text-sm text-text-muted mb-8">
                  Masukan Anda sangat berharga bagi kami untuk terus berbenah.
                </p>

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-navy mb-2">
                      Feedback Terkirim!
                    </h3>
                    <p className="text-text-muted mb-6">
                      Terima kasih atas masukan Anda, {formData.nama}. Kami akan
                      meninjau dan merespons secepatnya.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setRating(0);
                        setFormData({ nama: "", email: "", subjek: "", pesan: "" });
                      }}
                      className="px-6 py-2.5 bg-sky-primary hover:bg-sky-dark text-white text-sm font-medium rounded-lg transition-colors duration-200"
                    >
                      Kirim Feedback Lain
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Rating */}
                    <div>
                      <label className="block text-sm font-medium text-navy mb-2">
                        Rating Layanan *
                      </label>
                      <StarRating value={rating} onChange={setRating} />
                      {rating === 0 && (
                        <p className="text-xs text-text-light mt-1">
                          Klik bintang untuk memberi rating
                        </p>
                      )}
                    </div>

                    {/* Nama + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="fb-nama" className="block text-sm font-medium text-navy mb-1.5">
                          Nama *
                        </label>
                        <input
                          id="fb-nama"
                          name="nama"
                          type="text"
                          required
                          value={formData.nama}
                          onChange={handleChange}
                          placeholder="Nama Anda"
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:border-sky-accent focus:ring-2 focus:ring-sky-accent/20 outline-none transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label htmlFor="fb-email" className="block text-sm font-medium text-navy mb-1.5">
                          Email *
                        </label>
                        <input
                          id="fb-email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="nama@email.com"
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:border-sky-accent focus:ring-2 focus:ring-sky-accent/20 outline-none transition-all duration-200"
                        />
                      </div>
                    </div>

                    {/* Subjek */}
                    <div>
                      <label htmlFor="fb-subjek" className="block text-sm font-medium text-navy mb-1.5">
                        Subjek *
                      </label>
                      <input
                        id="fb-subjek"
                        name="subjek"
                        type="text"
                        required
                        value={formData.subjek}
                        onChange={handleChange}
                        placeholder="Contoh: Saran untuk Pelatihan"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:border-sky-accent focus:ring-2 focus:ring-sky-accent/20 outline-none transition-all duration-200"
                      />
                    </div>

                    {/* Pesan */}
                    <div>
                      <label htmlFor="fb-pesan" className="block text-sm font-medium text-navy mb-1.5">
                        Pesan *
                      </label>
                      <textarea
                        id="fb-pesan"
                        name="pesan"
                        required
                        rows={5}
                        value={formData.pesan}
                        onChange={handleChange}
                        placeholder="Tuliskan masukan, saran, atau kritik Anda..."
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:border-sky-accent focus:ring-2 focus:ring-sky-accent/20 outline-none transition-all duration-200 resize-none"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full py-3 bg-sky-primary hover:bg-sky-dark text-white font-semibold rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                    >
                      Kirim Feedback
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar — 2 cols */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats card */}
            <div className="bg-gradient-to-br from-navy to-navy-light rounded-2xl p-6 text-white">
              <h3 className="font-semibold text-lg mb-4">Ringkasan Feedback</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold">{avgRating}</p>
                  <StarRating value={Math.round(Number(avgRating))} readOnly />
                  <p className="text-xs text-white/60 mt-1">Rating Rata-rata</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold">{existingFeedback.length}</p>
                  <p className="text-xs text-white/60 mt-1">Total Feedback</p>
                </div>
              </div>
            </div>

            {/* Recent feedback */}
            <div>
              <h3 className="font-semibold text-navy text-lg mb-4">
                Feedback Terbaru
              </h3>
              <div className="space-y-4">
                {existingFeedback.slice(0, 4).map((fb) => (
                  <Card key={fb.id} title={fb.subjek}>
                    <div className="flex items-center gap-2 mb-2">
                      <StarRating value={fb.rating} readOnly />
                      <span className="text-xs text-text-light">{fb.tanggal}</span>
                    </div>
                    <p className="text-sm text-text-muted leading-relaxed line-clamp-3">
                      {fb.pesan}
                    </p>
                    <p className="text-xs text-text-light mt-2">— {fb.nama}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
