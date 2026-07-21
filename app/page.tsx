import Image from "next/image";

export default function Home() {
  // Service list for the card section
  const services = [
    {
      title: "Program Pelatihan & Sertifikasi",
      desc: "Kembangkan kompetensi digital Anda melalui pelatihan tersertifikasi nasional seperti Digital Talent Scholarship.",
      href: "/layanan/pelatihan",
      badge: "Hot",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      title: "Pengajuan Program Magang",
      desc: "Alur pendaftaran praktis bagi mahasiswa & siswa SMK untuk magang industri di lingkungan BBLSDM Komdigi Medan.",
      href: "/layanan/magang",
      badge: "Baru",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      title: "FAQ & Pusat Bantuan",
      desc: "Jawaban atas pertanyaan umum seputar program pelatihan, alur magang, publikasi riset, dan layanan kantor.",
      href: "/layanan/faq",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  // News list for alternating background section
  const news = [
    {
      title: "BBLSDM Komdigi Medan Gelar Pelatihan TIK bagi Aparatur Desa",
      date: "18 Juli 2026",
      category: "Berita",
      desc: "Upaya percepatan digitalisasi pelayanan publik pedesaan melalui pembekalan literasi data dan manajemen web desa.",
      href: "/informasi/berita",
    },
    {
      title: "Penerimaan Mahasiswa Magang Mandiri Gelombang II Dibuka",
      date: "10 Juli 2026",
      category: "Pengumuman",
      desc: "Kesempatan bagi mahasiswa aktif program studi Informatika, Komunikasi, dan Administrasi Publik untuk bergabung.",
      href: "/informasi/pengumuman",
    },
    {
      title: "Laporan Hasil Survey Indeks Kepuasan Masyarakat Triwulan II",
      date: "01 Juli 2026",
      category: "Pengumuman",
      desc: "Rilis resmi skor kepuasan layanan publik BBLSDM Komdigi Medan menunjukkan peningkatan ke angka 92.5%.",
      href: "/informasi/pengumuman",
    },
  ];

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h2>halo</h2>
    </div>
  );
}
