import type { Metadata } from "next";
import PageHeader from "@/app/components/PageHeader";
import Card from "@/app/components/Card";

export const metadata: Metadata = {
  title: "Wilayah Kerja",
  description:
    "Direktori wilayah kerja BBLSDM Komdigi — informasi kantor per provinsi beserta tautan ke website resmi.",
};

/* ──────────────────────────────────────────
   Data wilayah kerja
   ────────────────────────────────────────── */
const wilayahList = [
  {
    provinsi: "Sumatera Utara",
    kota: "Medan",
    alamat: "Jl. Letjend. Djamin Ginting No. 1, Medan 20155",
    telepon: "(061) 821-0000",
    website: "https://sumut.kominfo.go.id",
    image: "/images/wilayah/sumut.jpg",
  },
  {
    provinsi: "Aceh",
    kota: "Banda Aceh",
    alamat: "Jl. T. Nyak Arief No. 45, Banda Aceh 23114",
    telepon: "(0651) 635-000",
    website: "https://diskominfo.acehprov.go.id",
    image: "/images/wilayah/aceh.jpg",
  },
  {
    provinsi: "Sumatera Barat",
    kota: "Padang",
    alamat: "Jl. Jend. Sudirman No. 51, Padang 25171",
    telepon: "(0751) 700-000",
    website: "https://kominfo.sumbarprov.go.id",
    image: "/images/wilayah/sumbar.jpg",
  },
  {
    provinsi: "Riau",
    kota: "Pekanbaru",
    alamat: "Jl. Gajah Mada No. 200, Pekanbaru 28116",
    telepon: "(0761) 336-000",
    website: "https://diskominfo.riau.go.id",
    image: "/images/wilayah/riau.jpg",
  },
  {
    provinsi: "Kepulauan Riau",
    kota: "Tanjung Pinang",
    alamat: "Jl. D.I. Panjaitan No. 12, Tanjung Pinang 29124",
    telepon: "(0771) 318-000",
    website: "https://diskominfo.kepriprov.go.id",
    image: "/images/wilayah/kepri.jpg",
  },
  {
    provinsi: "Jambi",
    kota: "Jambi",
    alamat: "Jl. A. Yani No. 1, Jambi 36122",
    telepon: "(0741) 668-000",
    website: "https://diskominfo.jambiprov.go.id",
    image: "/images/wilayah/jambi.jpg",
  },
  {
    provinsi: "Sumatera Selatan",
    kota: "Palembang",
    alamat: "Jl. Kapten A. Rivai No. 7, Palembang 30129",
    telepon: "(0711) 350-000",
    website: "https://diskominfo.sumselprov.go.id",
    image: "/images/wilayah/sumsel.jpg",
  },
  {
    provinsi: "Bengkulu",
    kota: "Bengkulu",
    alamat: "Jl. Pembangunan No. 16, Bengkulu 38225",
    telepon: "(0736) 346-000",
    website: "https://diskominfo.bengkuluprov.go.id",
    image: "/images/wilayah/bengkulu.jpg",
  },
  {
    provinsi: "Lampung",
    kota: "Bandar Lampung",
    alamat: "Jl. Wolter Monginsidi No. 69, Bandar Lampung 35215",
    telepon: "(0721) 481-000",
    website: "https://diskominfo.lampungprov.go.id",
    image: "/images/wilayah/lampung.jpg",
  },
  {
    provinsi: "Bangka Belitung",
    kota: "Pangkal Pinang",
    alamat: "Jl. Merdeka No. 5, Pangkal Pinang 33149",
    telepon: "(0717) 422-000",
    website: "https://diskominfo.babelprov.go.id",
    image: "/images/wilayah/babel.jpg",
  },
];

function IconMapPin() {
  return (
    <svg className="w-4 h-4 text-sky-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg className="w-4 h-4 text-sky-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}

function IconGlobe() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  );
}

export default function WilayahKerjaPage() {
  return (
    <>
      <PageHeader
        title="Wilayah Kerja"
        subtitle="Direktori kantor BBLSDM Komdigi di setiap provinsi wilayah kerja beserta informasi kontak dan tautan website resmi"
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Profil", href: "#" },
          { label: "Wilayah Kerja" },
        ]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
          <div className="bg-sky-accent/5 rounded-xl p-5 text-center border border-sky-accent/10">
            <p className="text-3xl font-bold text-navy">{wilayahList.length}</p>
            <p className="text-sm text-text-muted mt-1">Provinsi</p>
          </div>
          <div className="bg-sky-accent/5 rounded-xl p-5 text-center border border-sky-accent/10">
            <p className="text-3xl font-bold text-navy">10</p>
            <p className="text-sm text-text-muted mt-1">Kantor Wilayah</p>
          </div>
          <div className="hidden sm:block bg-sky-accent/5 rounded-xl p-5 text-center border border-sky-accent/10">
            <p className="text-3xl font-bold text-navy">Sumatera</p>
            <p className="text-sm text-text-muted mt-1">Cakupan Regional</p>
          </div>
        </div>

        {/* Grid cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {wilayahList.map((w) => (
            <Card key={w.provinsi} title={w.provinsi}>
              {/* Placeholder image (gradient) */}
              <div className="w-full aspect-video rounded-lg bg-gradient-to-br from-navy/10 to-sky-accent/10 flex items-center justify-center mb-4 overflow-hidden">
                <div className="text-center">
                  <IconMapPin />
                  <p className="text-xs text-text-muted mt-1">{w.kota}</p>
                </div>
              </div>

              {/* Info */}
              <div className="space-y-2.5">
                <div className="flex items-start gap-2 text-sm text-text-muted">
                  <IconMapPin />
                  <span>{w.alamat}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <IconPhone />
                  <span>{w.telepon}</span>
                </div>
              </div>

              {/* CTA */}
              <a
                href={w.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-sky-primary hover:bg-sky-dark text-white text-sm font-medium rounded-lg transition-colors duration-200"
              >
                <IconGlobe />
                Kunjungi Website
              </a>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
