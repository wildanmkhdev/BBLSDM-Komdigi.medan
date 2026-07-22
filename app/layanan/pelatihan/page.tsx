import type { Metadata } from "next";
import PageHeader from "@/app/components/PageHeader";
import Card from "@/app/components/Card";

export const metadata: Metadata = {
  title: "Pelatihan",
  description:
    "Program pelatihan di bidang komunikasi dan digital yang diselenggarakan BBLSDM Komdigi Medan.",
};

/* ──────────────────────────────────────────
   Icon helpers
   ────────────────────────────────────────── */
function IconCalendar() {
  return (
    <svg className="w-4 h-4 text-sky-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg className="w-4 h-4 text-sky-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
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

/* ──────────────────────────────────────────
   Pelatihan data
   ────────────────────────────────────────── */
const pelatihanList = [
  {
    id: 1,
    title: "Digital Marketing & Social Media Strategy",
    description:
      "Pelatihan intensif strategi pemasaran digital, content marketing, dan optimasi media sosial untuk pelaku usaha dan ASN.",
    jadwal: "25 Juli — 27 Juli 2026",
    kuota: 50,
    terisi: 38,
    status: "Dibuka",
    level: "Menengah",
  },
  {
    id: 2,
    title: "Cloud Computing & DevOps Fundamentals",
    description:
      "Pengenalan cloud infrastructure (AWS, GCP), containerization dengan Docker, dan CI/CD pipeline.",
    jadwal: "1 Agustus — 5 Agustus 2026",
    kuota: 40,
    terisi: 40,
    status: "Penuh",
    level: "Lanjutan",
  },
  {
    id: 3,
    title: "Keamanan Siber untuk ASN",
    description:
      "Workshop praktis keamanan jaringan, manajemen risiko, incident response, dan perlindungan data pribadi instansi.",
    jadwal: "10 Agustus — 12 Agustus 2026",
    kuota: 60,
    terisi: 22,
    status: "Dibuka",
    level: "Dasar",
  },
  {
    id: 4,
    title: "Data Science & Machine Learning",
    description:
      "Pelatihan analisis data dengan Python, visualisasi data, dan pengenalan algoritma machine learning untuk pengambilan keputusan.",
    jadwal: "18 Agustus — 22 Agustus 2026",
    kuota: 35,
    terisi: 12,
    status: "Dibuka",
    level: "Lanjutan",
  },
  {
    id: 5,
    title: "UI/UX Design Fundamental",
    description:
      "Dasar-dasar desain antarmuka dan pengalaman pengguna, prototyping dengan Figma, dan user testing.",
    jadwal: "1 September — 3 September 2026",
    kuota: 45,
    terisi: 5,
    status: "Dibuka",
    level: "Dasar",
  },
  {
    id: 6,
    title: "Internet of Things (IoT) & Smart City",
    description:
      "Implementasi IoT untuk smart city, pengenalan sensor, microcontroller, dan integrasi platform IoT.",
    jadwal: "15 September — 19 September 2026",
    kuota: 30,
    terisi: 0,
    status: "Segera Dibuka",
    level: "Menengah",
  },
];

export default function PelatihanPage() {
  return (
    <>
      <PageHeader
        title="Pelatihan"
        subtitle="Program pelatihan kompetensi digital yang tersedia di BBLSDM Komdigi Medan"
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Layanan", href: "#" },
          { label: "Pelatihan" },
        ]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { value: pelatihanList.length, label: "Program Pelatihan" },
            { value: "260", label: "Total Kuota" },
            { value: "117", label: "Peserta Terdaftar" },
            { value: "5", label: "Pendaftaran Dibuka" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl p-5 text-center border border-gray-100 shadow-sm"
            >
              <p className="text-2xl font-bold text-navy">{stat.value}</p>
              <p className="text-xs text-text-muted mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pelatihanList.map((p) => (
            <Card
              key={p.id}
              title={p.title}
              description={p.description}
              badge={p.status}
              badgeColor={
                p.status === "Penuh"
                  ? "marun"
                  : p.status === "Segera Dibuka"
                    ? "gold"
                    : "sky"
              }
              icon={<IconAcademic />}
            >
              {/* Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <IconCalendar />
                  <span>{p.jadwal}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <IconUsers />
                  <span>
                    {p.terisi}/{p.kuota} peserta
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-offwhite text-text-muted border border-gray-200">
                    Level: {p.level}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-4">
                <div className="h-1.5 w-full bg-offwhite rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      p.terisi >= p.kuota ? "bg-marun" : "bg-sky-primary"
                    }`}
                    style={{
                      width: `${Math.min((p.terisi / p.kuota) * 100, 100)}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-text-light mt-1">
                  {Math.round((p.terisi / p.kuota) * 100)}% terisi
                </p>
              </div>

              {/* CTA */}
              <button
                disabled={p.status === "Penuh" || p.status === "Segera Dibuka"}
                className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  p.status === "Penuh"
                    ? "bg-gray-100 text-text-light cursor-not-allowed"
                    : p.status === "Segera Dibuka"
                      ? "bg-gold/15 text-amber-700 cursor-not-allowed"
                      : "bg-sky-primary hover:bg-sky-dark text-white"
                }`}
              >
                {p.status === "Penuh"
                  ? "Kuota Penuh"
                  : p.status === "Segera Dibuka"
                    ? "Segera Dibuka"
                    : "Daftar Sekarang"}
              </button>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
