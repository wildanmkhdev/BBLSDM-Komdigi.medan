import type { Metadata } from "next";
import PageHeader from "@/app/components/PageHeader";
import Card from "@/app/components/Card";

export const metadata: Metadata = {
  title: "Tugas dan Fungsi",
  description:
    "Deskripsi tugas dan fungsi jabatan di BBLSDM Kementerian Komunikasi dan Digital Wilayah Medan.",
};

/* ──────────────────────────────────────────
   Icon helpers (inline SVG — no extra deps)
   ────────────────────────────────────────── */
function IconBuilding() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  );
}

function IconClipboard() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
    </svg>
  );
}

function IconCog() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function IconAcademic() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

/* ──────────────────────────────────────────
   Data jabatan — komprehensif
   ────────────────────────────────────────── */
const jabatanList = [
  {
    title: "Kepala Balai Besar",
    icon: <IconBuilding />,
    fungsi: [
      "Memimpin dan mengoordinasikan seluruh kegiatan operasional BBLSDM Komdigi Medan",
      "Menetapkan kebijakan teknis dan administratif balai besar sesuai peraturan perundang-undangan",
      "Menjalin kerja sama dengan instansi pemerintah, dunia usaha, dan masyarakat di bidang komunikasi dan digital",
      "Melakukan pembinaan dan pengawasan terhadap pelaksanaan tugas seluruh unit kerja",
      "Bertanggung jawab atas pencapaian target kinerja dan indikator strategis balai besar",
    ],
  },
  {
    title: "Kepala Bagian Tata Usaha",
    icon: <IconClipboard />,
    fungsi: [
      "Mengoordinasikan penyusunan rencana kerja, anggaran, dan laporan kegiatan balai besar",
      "Melaksanakan urusan kepegawaian, keuangan, perlengkapan, dan rumah tangga",
      "Mengelola administrasi surat-menyurat, kearsipan, dan dokumentasi kelembagaan",
      "Menyusun Laporan Kinerja Instansi Pemerintah (LAKIP) dan Laporan Tahunan (LAPTAH)",
      "Melaksanakan pengelolaan barang milik negara dan pengadaan barang/jasa",
    ],
  },
  {
    title: "Kepala Bidang Pelatihan",
    icon: <IconAcademic />,
    fungsi: [
      "Menyusun program dan kurikulum pelatihan di bidang komunikasi dan teknologi digital",
      "Mengoordinasikan pelaksanaan pelatihan teknis, manajerial, dan fungsional",
      "Melakukan evaluasi efektivitas pelatihan dan pengembangan modul pembelajaran",
      "Menjalin kerja sama dengan lembaga pelatihan dalam dan luar negeri",
      "Mengelola database peserta pelatihan dan sertifikasi kompetensi",
      "Mengembangkan metode pembelajaran berbasis teknologi (e-learning, blended learning)",
    ],
  },
  {
    title: "Kepala Bidang Sertifikasi dan Standardisasi",
    icon: <IconShield />,
    fungsi: [
      "Menyusun standar kompetensi di bidang komunikasi dan informatika",
      "Menyelenggarakan uji kompetensi dan sertifikasi profesional",
      "Mengelola Lembaga Sertifikasi Profesi (LSP) di lingkungan balai besar",
      "Melakukan asesmen kompetensi terhadap tenaga kerja di bidang TIK",
      "Mengembangkan dan memelihara Skema Sertifikasi Kompetensi Nasional",
      "Memantau mutu dan relevansi standar kompetensi dengan kebutuhan industri",
    ],
  },
  {
    title: "Kepala Bidang Pengembangan SDM",
    icon: <IconUsers />,
    fungsi: [
      "Menyusun strategi pengembangan sumber daya manusia di bidang komunikasi dan digital",
      "Mengoordinasikan program magang, beasiswa, dan pertukaran tenaga ahli",
      "Melakukan analisis kebutuhan kompetensi SDM sektor komunikasi dan digital",
      "Mengembangkan program talent management dan career development",
      "Memfasilitasi kegiatan knowledge sharing dan community of practice",
      "Mengelola program pembinaan ASN di bidang literasi digital",
    ],
  },
  {
    title: "Kepala Bidang Penelitian dan Pengembangan",
    icon: <IconCog />,
    fungsi: [
      "Merencanakan dan melaksanakan kegiatan penelitian di bidang komunikasi dan informatika",
      "Menyusun kajian kebijakan, studi kelayakan, dan analisis dampak teknologi digital",
      "Mengelola publikasi ilmiah, jurnal, dan buku putih",
      "Membangun kerja sama riset dengan perguruan tinggi dan lembaga penelitian",
      "Mengembangkan inovasi teknologi dan model implementasi digitalisasi daerah",
      "Memantau tren teknologi komunikasi global dan merumuskan rekomendasi kebijakan",
    ],
  },
];

export default function TugasFungsiPage() {
  return (
    <>
      <PageHeader
        title="Tugas dan Fungsi"
        subtitle="Deskripsi lengkap tugas pokok dan fungsi setiap jabatan di BBLSDM Komdigi Medan"
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Profil", href: "#" },
          { label: "Tugas dan Fungsi" },
        ]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Intro */}
        <div className="max-w-3xl mb-12">
          <p className="text-text-muted leading-relaxed">
            Balai Besar Litbang Sumber Daya Manusia (BBLSDM) Kementerian
            Komunikasi dan Digital Wilayah Medan memiliki tugas melaksanakan
            pengembangan sumber daya manusia di bidang komunikasi dan informatika
            melalui pelatihan, sertifikasi, penelitian, dan pengembangan
            kompetensi. Berikut adalah uraian tugas dan fungsi masing-masing
            jabatan struktural.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {jabatanList.map((jabatan) => (
            <Card
              key={jabatan.title}
              title={jabatan.title}
              icon={jabatan.icon}
            >
              <ul className="space-y-2">
                {jabatan.fungsi.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-sm text-text-muted leading-relaxed"
                  >
                    <span className="shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-sky-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
