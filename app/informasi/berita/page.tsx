import type { Metadata } from "next";
import PageHeader from "@/app/components/PageHeader";
import Card from "@/app/components/Card";

export const metadata: Metadata = {
  title: "Berita",
  description:
    "Berita terbaru dari BBLSDM Kementerian Komunikasi dan Digital Wilayah Medan.",
};

/* ──────────────────────────────────────────
   Dummy berita data
   ────────────────────────────────────────── */
const beritaList = [
  {
    id: 1,
    title: "BBLSDM Komdigi Medan Gelar Pelatihan Digital Marketing untuk UMKM",
    description:
      "Sebanyak 150 pelaku UMKM di Sumatera Utara mengikuti pelatihan digital marketing yang diselenggarakan BBLSDM Komdigi Medan selama 3 hari penuh.",
    date: "18 Juli 2026",
    badge: "Baru",
    image: "/images/berita/berita-1.jpg",
  },
  {
    id: 2,
    title: "Kerja Sama dengan Universitas Sumatera Utara dalam Pengembangan AI",
    description:
      "BBLSDM Komdigi Medan menandatangani MoU dengan USU untuk pengembangan riset kecerdasan buatan dan machine learning di sektor publik.",
    date: "15 Juli 2026",
    badge: "Baru",
    image: "/images/berita/berita-2.jpg",
  },
  {
    id: 3,
    title: "Workshop Keamanan Siber untuk ASN Wilayah Sumatera",
    description:
      "Diikuti 200 ASN dari 10 provinsi, workshop ini membahas best practice keamanan siber dan perlindungan data pribadi di instansi pemerintah.",
    date: "12 Juli 2026",
    image: "/images/berita/berita-3.jpg",
  },
  {
    id: 4,
    title: "Sertifikasi Kompetensi Digital Batch Ke-5 Tahun 2026",
    description:
      "Pendaftaran sertifikasi kompetensi digital batch ke-5 telah dibuka. Program ini menargetkan 500 peserta dari kalangan profesional TIK.",
    date: "10 Juli 2026",
    image: "/images/berita/berita-4.jpg",
  },
  {
    id: 5,
    title: "BBLSDM Raih Penghargaan Instansi Terbaik dalam Transformasi Digital",
    description:
      "Penghargaan diberikan oleh Kementerian PAN-RB atas keberhasilan BBLSDM Komdigi Medan dalam menerapkan transformasi digital di sektor pemerintahan.",
    date: "8 Juli 2026",
    image: "/images/berita/berita-5.jpg",
  },
  {
    id: 6,
    title: "Program Literasi Digital Menjangkau 50 Desa di Sumatera Utara",
    description:
      "Melalui program Literasi Digital Nasional, BBLSDM telah memberikan pelatihan dasar digital kepada warga di 50 desa terpencil.",
    date: "5 Juli 2026",
    image: "/images/berita/berita-6.jpg",
  },
  {
    id: 7,
    title: "Seminar Nasional Regulasi Telekomunikasi dan Frekuensi Radio",
    description:
      "Seminar menghadirkan pakar dari ITU dan Kominfo untuk membahas arah kebijakan spektrum frekuensi dan teknologi 5G di Indonesia.",
    date: "1 Juli 2026",
    image: "/images/berita/berita-7.jpg",
  },
  {
    id: 8,
    title: "Pendaftaran Magang Semester Gasal 2026/2027 Telah Dibuka",
    description:
      "BBLSDM Komdigi Medan membuka kesempatan magang bagi mahasiswa semester 5 ke atas dari seluruh perguruan tinggi di Indonesia.",
    date: "28 Juni 2026",
    image: "/images/berita/berita-8.jpg",
  },
  {
    id: 9,
    title: "Kunjungan Kerja Komisi I DPR RI ke BBLSDM Medan",
    description:
      "Anggota Komisi I DPR RI melakukan kunjungan kerja untuk meninjau program pengembangan SDM digital di wilayah Sumatera.",
    date: "25 Juni 2026",
    image: "/images/berita/berita-9.jpg",
  },
];

export default function BeritaPage() {
  return (
    <>
      <PageHeader
        title="Berita"
        subtitle="Informasi terkini mengenai kegiatan dan program BBLSDM Komdigi Medan"
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Informasi", href: "#" },
          { label: "Berita" },
        ]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Featured article (first berita) */}
        <div className="mb-12">
          <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 grid md:grid-cols-2">
            {/* Image */}
            <div className="aspect-video md:aspect-auto bg-gradient-to-br from-navy/10 via-sky-accent/10 to-navy/5 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-16 h-16 rounded-2xl bg-sky-accent/20 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-sky-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                  </svg>
                </div>
                <p className="text-sm text-text-muted">Berita Utama</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gold/15 text-amber-700">
                  {beritaList[0].badge}
                </span>
                <span className="text-xs text-text-muted">{beritaList[0].date}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-navy leading-snug mb-3 group-hover:text-sky-primary transition-colors">
                {beritaList[0].title}
              </h2>
              <p className="text-text-muted leading-relaxed mb-4">
                {beritaList[0].description}
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-sky-primary group-hover:gap-2.5 transition-all duration-200">
                Baca selengkapnya
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {beritaList.slice(1).map((berita) => (
            <Card
              key={berita.id}
              title={berita.title}
              description={berita.description}
              date={berita.date}
              badge={berita.badge}
              badgeColor="gold"
              image={berita.image}
            >
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-sky-primary hover:gap-2.5 transition-all duration-200">
                Baca selengkapnya
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
