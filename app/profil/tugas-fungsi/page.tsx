import type { Metadata } from "next";
import PageHeader from "@/app/components/PageHeader";
import Card from "@/app/components/Card";

export const metadata: Metadata = {
  title: "Tugas dan Fungsi",
  description:
    "Tugas pokok dan fungsi operasional Balai Besar Pelatihan Sumber Daya Manusia Komunikasi dan Digital (BBLSDM Komdigi) Medan berdasarkan Peraturan Menteri Komdigi No. 3 Tahun 2026.",
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
   Data fungsi — Permen Komdigi No. 3/2026
   ────────────────────────────────────────── */
const fungsiList = [
  {
    code: "a",
    title: "Penyusunan Rencana, Program, dan Anggaran",
    icon: <IconClipboard />,
    items: [
      "Perumusan rencana strategis jangka menengah dan rencana kerja tahunan di bidang pelatihan SDM komunikasi dan digital wilayah kerja.",
      "Penyusunan target kinerja operasional dan indikator keberhasilan program pelatihan literasi maupun kecakapan digital.",
      "Perencanaan dan sinkronisasi alokasi anggaran operasional dan kegiatan balai secara akuntabel, transparan, dan efisien.",
      "Pelaksanaan koordinasi program kerja dengan instansi pembina di lingkungan Kementerian Komunikasi dan Digital serta pemerintah daerah.",
    ],
    spanFull: false,
  },
  {
    code: "b",
    title: "Pelatihan dan Pemberdayaan Talenta Digital",
    icon: <IconAcademic />,
    items: [
      "Penyelenggaraan pelatihan teknis dan vokasi bidang teknologi informasi, komunikasi, dan digital bagi angkatan kerja, profesional, serta masyarakat umum.",
      "Pelaksanaan pelatihan literasi digital dan pengembangan kompetensi kepemimpinan digital bagi Aparatur Sipil Negara (ASN) di wilayah kerja.",
      "Pemberdayaan talenta digital daerah dan fasilitasi integrasi lulusan pelatihan dengan ekosistem industri kreatif dan dunia usaha.",
      "Pengembangan metode instruksional adaptif berbasis tatap muka (offline), daring (online), dan pembelajaran hibrida (blended learning).",
    ],
    spanFull: false,
  },
  {
    code: "c",
    title: "Penjaminan Mutu Penyelenggaraan Pelatihan",
    icon: <IconShield />,
    items: [
      "Penerapan standar penjaminan mutu (Quality Assurance) dalam seluruh tahapan penyelenggaraan pelatihan dari perencanaan hingga evaluasi.",
      "Pelaksanaan monitoring dan pemantauan secara berkala terhadap kompetensi tenaga pengajar (instruktur dan widyaiswara) serta kesiapan sarana laboratorium.",
      "Pengembangan dan pengkajian kurikulum maupun modul pelatihan agar senantiasa selaras dengan dinamika teknologi terkini (seperti AI, Keamanan Siber, dan Cloud).",
      "Penyelenggaraan survei kepuasan peserta dan evaluasi dampak pasca-pelatihan (tracer study) guna perbaikan kualitas layanan secara berkelanjutan.",
    ],
    spanFull: false,
  },
  {
    code: "d",
    title: "Fasilitasi Sertifikasi Kompetensi Talenta Digital",
    icon: <IconUsers />,
    items: [
      "Penyelenggaraan fasilitas uji kompetensi keahlian bidang teknologi informasi dan komunikasi bekerja sama dengan Lembaga Sertifikasi Profesi (LSP).",
      "Fasilitasi perolehan sertifikasi kompetensi berstandar nasional (BNSP) maupun sertifikasi industri global bagi talenta digital daerah.",
      "Pelaksanaan asesmen dan verifikasi kesiapan kompetensi kerja sumber daya manusia di subsektor komunikasi dan teknologi digital.",
      "Penyediaan pusat pengujian (assessment center) berstandar industri untuk mendukung validasi keahlian tenaga kerja digital di wilayah Sumatera.",
    ],
    spanFull: false,
  },
  {
    code: "e",
    title: "Administrasi, Keuangan, Tata Usaha, dan Pelaporan",
    icon: <IconBuilding />,
    items: [
      "Pelaksanaan urusan keuangan, perpajakan, penerimaan negara bukan pajak (PNBP), serta pengelolaan dan pemeliharaan Barang Milik Negara (BMN).",
      "Pengelolaan manajemen sumber daya manusia internal, pembinaan kepegawaian, tata laksana organisasi, persuratan, dan kearsipan digital balai.",
      "Penyelenggaraan urusan rumah tangga, perlengkapan kantor, layanan kehumasan publik, protokoler, dan fasilitasi kerja sama antar-lembaga.",
      "Pengelolaan sistem data dan informasi internal, penerapan manajemen risiko korporat, kepatuhan internal, serta penyusunan evaluasi dan pelaporan kinerja (LAKIP/LAPTAH).",
    ],
    spanFull: true,
  },
];

export default function TugasFungsiPage() {
  return (
    <>
      <PageHeader
        title="Tugas dan Fungsi"
        subtitle="Deskripsi lengkap tugas pokok dan fungsi operasional di BBLSDM Komdigi Medan"
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Profil", href: "#" },
          { label: "Tugas dan Fungsi" },
        ]}
        className="pt-28 pb-[76px] sm:pt-32 sm:pb-[92px]"
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Dasar Hukum & Tugas Pokok Banner Box */}
        <div className="mb-12 bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
          <div className="grid gap-8 lg:grid-cols-12 items-start">
            <div className="lg:col-span-5 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy/10 text-navy text-xs font-bold uppercase tracking-wider">
                <span>Dasar Hukum</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-navy leading-snug">
                Peraturan Menteri Komunikasi dan Digital RI No. 3 Tahun 2026
              </h2>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                Tentang Organisasi dan Tata Kerja Unit Pelaksana Teknis Bidang Pengembangan Sumber Daya Manusia Komunikasi dan Digital.
              </p>
            </div>

            <div className="lg:col-span-7 lg:border-l lg:border-slate-200 lg:pl-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-accent/10 text-sky-primary text-xs font-bold uppercase tracking-wider">
                <span>Tugas Pokok Balai Besar</span>
              </div>
              <p className="text-base sm:text-lg font-semibold text-navy leading-relaxed">
                &ldquo;Balai Besar Pelatihan Sumber Daya Manusia Komunikasi dan Digital mempunyai tugas melaksanakan pelatihan di bidang komunikasi, informasi, dan digital.&rdquo;
              </p>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                Dalam melaksanakan tugas pokok tersebut, Balai Besar Pelatihan Sumber Daya Manusia Komunikasi dan Digital (BBLSDM Komdigi) Medan menyelenggarakan 5 (lima) fungsi operasional utama sebagai berikut:
              </p>
            </div>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {fungsiList.map((item) => (
            <div key={item.code} className={item.spanFull ? "md:col-span-2" : ""}>
              <Card
                title={item.title}
                icon={item.icon}
                badge={`Fungsi (${item.code})`}
                badgeColor="sky"
                className="h-full"
              >
                <ul className="space-y-2.5">
                  {item.items.map((desc, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-text-muted leading-relaxed"
                    >
                      <span className="shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-sky-accent" />
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
