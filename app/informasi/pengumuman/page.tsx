import type { Metadata } from "next";
import PageHeader from "@/app/components/PageHeader";
import Card from "@/app/components/Card";

export const metadata: Metadata = {
  title: "Pengumuman",
  description:
    "Pengumuman resmi dari BBLSDM Kementerian Komunikasi dan Digital Wilayah Medan.",
};

/* ──────────────────────────────────────────
   Dummy pengumuman data
   ────────────────────────────────────────── */
const pengumumanList = [
  {
    id: 1,
    title: "Jadwal Ujian Sertifikasi Kompetensi Digital Periode Juli 2026",
    description:
      "Ujian sertifikasi kompetensi digital periode Juli 2026 akan dilaksanakan pada tanggal 25-27 Juli 2026. Peserta yang telah terdaftar wajib melakukan konfirmasi kehadiran.",
    date: "20 Juli 2026",
    badge: "Pengumuman",
    priority: "high",
  },
  {
    id: 2,
    title: "Libur Nasional dan Cuti Bersama Hari Raya Idul Adha 1447 H",
    description:
      "Sehubungan dengan Hari Raya Idul Adha, kantor BBLSDM Komdigi Medan libur pada tanggal 7-10 Juni 2026. Pelayanan kembali normal pada 11 Juni 2026.",
    date: "18 Juli 2026",
    badge: "Pengumuman",
    priority: "normal",
  },
  {
    id: 3,
    title: "Perubahan Jam Layanan Selama Bulan Ramadhan 1447 H",
    description:
      "Selama bulan Ramadhan, jam pelayanan kantor berubah menjadi pukul 08.00-15.00 WIB. Pelayanan online tetap tersedia 24 jam.",
    date: "15 Juli 2026",
    badge: "Penting",
    priority: "high",
  },
  {
    id: 4,
    title: "Pembukaan Pendaftaran Pelatihan Cloud Computing Angkatan II",
    description:
      "Pendaftaran pelatihan Cloud Computing angkatan II tahun 2026 telah dibuka untuk ASN dan umum. Kuota terbatas, segera daftarkan diri Anda.",
    date: "12 Juli 2026",
    badge: "Pengumuman",
    priority: "normal",
  },
  {
    id: 5,
    title: "Pengumuman Hasil Seleksi Peserta Magang Periode Agustus 2026",
    description:
      "Hasil seleksi peserta magang periode Agustus 2026 telah diumumkan. Peserta yang dinyatakan lolos silakan melengkapi berkas administrasi.",
    date: "10 Juli 2026",
    badge: "Pengumuman",
    priority: "normal",
  },
  {
    id: 6,
    title: "Maintenance Sistem Informasi — 22 Juli 2026",
    description:
      "Sistem informasi BBLSDM akan mengalami pemeliharaan terjadwal pada tanggal 22 Juli 2026 pukul 22.00-04.00 WIB. Akses sementara tidak tersedia.",
    date: "8 Juli 2026",
    badge: "Maintenance",
    priority: "high",
  },
  {
    id: 7,
    title: "Undangan Seminar Nasional Literasi Digital 2026",
    description:
      "BBLSDM Komdigi Medan mengundang seluruh stakeholder untuk menghadiri Seminar Nasional Literasi Digital pada tanggal 5 Agustus 2026.",
    date: "5 Juli 2026",
    badge: "Pengumuman",
    priority: "normal",
  },
  {
    id: 8,
    title: "Perpanjangan Batas Waktu Pengumpulan Proposal Penelitian",
    description:
      "Batas waktu pengumpulan proposal penelitian kolaboratif BBLSDM-Perguruan Tinggi diperpanjang hingga 31 Juli 2026.",
    date: "1 Juli 2026",
    badge: "Pengumuman",
    priority: "normal",
  },
];

function PriorityIcon({ priority }: { priority: string }) {
  if (priority === "high") {
    return (
      <svg className="w-4 h-4 text-marun" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    );
  }
  return (
    <svg className="w-4 h-4 text-sky-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
  );
}

export default function PengumumanPage() {
  return (
    <>
      <PageHeader
        title="Pengumuman"
        subtitle="Pengumuman resmi dan informasi penting dari BBLSDM Komdigi Medan"
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Informasi", href: "#" },
          { label: "Pengumuman" },
        ]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pengumumanList.map((item) => (
            <Card
              key={item.id}
              title={item.title}
              description={item.description}
              date={item.date}
              badge={item.badge}
              badgeColor={item.priority === "high" ? "marun" : "gold"}
              icon={<PriorityIcon priority={item.priority} />}
            >
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-sky-primary hover:gap-2.5 transition-all duration-200 cursor-pointer">
                Lihat detail
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
