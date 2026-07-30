# 🏛️ Website BBLSDM Komdigi Medan

Portal Resmi **Balai Besar Pengembangan Sumber Daya Manusia dan Penelitian Komunikasi dan Informatika (BBLSDM) Medan** — Kementerian Komunikasi dan Digital Republik Indonesia.

---

## 📌 Tentang Proyek

Website ini dikembangkan untuk menyediakan akses informasi yang cepat, mudah, dan terpercaya bagi masyarakat umum mengenai profil, tugas dan fungsi, kegiatan, layanan publik, serta publikasi instansi BBLSDM Komdigi Medan secara terpusat dan intuitif.

### 🌟 Fitur Utama
- **Profil Instansi**: Sejarah visual, Visi & Misi, Struktur Organisasi, Tugas & Fungsi, serta Direktori Wilayah Kerja interaktif per provinsi.
- **Pusat Informasi**: Berita terkini, Pengumuman resmi, dan Galeri dokumentasi kegiatan.
- **Layanan Publik**: Layanan Pelatihan, Portal Pengajuan Magang, Pusat Bantuan (FAQ), dan Kanal Feedback/Komentar.
- **Publikasi Resmi**: Akses laporan LAKIP, LAPTAH, ICT Indikator, Hasil Penelitian, dan Buku Putih.
- **Statistik & Infografis**: Visualisasi data kinerja instansi dan statistik peserta pelatihan.
- **Staf & Kontak**: Informasi hierarki pegawai serta formulir kontak instansi.

---

## 🛠️ Teknologi & Stack

Proyek ini dibangun menggunakan teknologi modern web development:

| Kategori | Teknologi | Deskripsi |
| :--- | :--- | :--- |
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/) | React Framework untuk Server-Side Rendering & App Routing |
| **Library Utama** | [React 19](https://react.dev/) | Library UI Deklaratif |
| **Styling & UI** | [Tailwind CSS v4](https://tailwindcss.com/) & PostCSS | Utility-first CSS Framework dengan Design Tokens terpusat |
| **Animasi & Visual** | [Framer Motion](https://www.framer.com/motion/), [Cobe](https://github.com/shading-art/cobe) | Micro-animation & Visualisasi Globe 3D |
| **Geospatial / Peta** | [Leaflet](https://leafletjs.com/) & [React-Leaflet](https://react-leaflet.js.org/) | Peta Interaktif Direktori Wilayah Kerja |
| **Iconography** | [Lucide React](https://lucide.dev/) | Icon Set Modern |
| **Database & ORM** | [Prisma v6](https://www.prisma.io/) & PostgreSQL | ORM untuk pengelolaan basis data PostgreSQL |
| **Bahasa & Tooling** | [TypeScript](https://www.typescriptlang.org/), [pnpm](https://pnpm.io/) | Type safety & Package Manager cepat |

---

## 🗺️ Struktur Navigasi & Sitemap

| Menu Utama | Halaman / Route | Deskripsi |
| :--- | :--- | :--- |
| **Beranda** | `/` | Banner utama, highlight berita, dan visualisasi kinerja |
| **Profil** | `/profil/sejarah` | Timeline & Dokumentasi visual sejarah instansi |
| | `/profil/visi-misi` | Statement Visi dan Misi instansi |
| | `/profil/struktur-organisasi` | Bagan struktur organisasi instansi |
| | `/profil/tugas-fungsi` | Rincian tugas dan fungsi jabatan |
| | `/profil/wilayah-kerja` | Direktori kantor & wilayah kerja provinsi |
| **Informasi** | `/informasi/berita` | Berita & artikel publikasi |
| | `/informasi/pengumuman` | Informasi pengumuman penting |
| | `/informasi/galeri` | Dokumentasi galeri foto & kegiatan |
| **Layanan** | `/layanan/pelatihan` | Informasi jadwal & program pelatihan |
| | `/layanan/magang` | Informasi & alur pendaftaran magang |
| | `/layanan/faq` | Pertanyaan umum yang sering diajukan |
| | `/layanan/feedback` | Form kritik, saran & masukan publik |
| **Publikasi** | `/publikasi/lakip` | Laporan Akuntabilitas Kinerja Instansi Pemerintah |
| | `/publikasi/laptah` | Laporan Tahunan |
| | `/publikasi/ict-indikator` | Indikator perkembangan ICT |
| | `/publikasi/penelitian` | Publikasi hasil riset & penelitian |
| | `/publikasi/buku-putih` | Dokumen Buku Putih |
| **Statistik** | `/statistik/kinerja` | Dashboard statistik capaian kinerja |
| | `/statistik/peserta` | Statistik data peserta pelatihan |
| | `/statistik/infografis` | Infografis data publik |
| **Lainnya** | `/staf` | Direktori staf & hierarki |
| | `/kontak` | Alamat, lokasi peta, dan kanal kontak |

---

## 📂 Struktur Direktori Proyek

```
project-magang/
├── app/                      # Next.js App Router Pages & Layouts
│   ├── components/           # Shared UI components (Navbar, Footer, Hero, dll)
│   ├── fitur/                # Fitur spesifik aplikasi
│   ├── informasi/            # Route grup Informasi (Berita, Pengumuman, Galeri)
│   ├── kontak/               # Route Kontak
│   ├── layanan/              # Route grup Layanan (Pelatihan, Magang, FAQ, Feedback)
│   ├── profil/               # Route grup Profil (Sejarah, Visi-Misi, Struktur, dll)
│   ├── publikasi/            # Route grup Publikasi (LAKIP, LAPTAH, dll)
│   ├── staf/                 # Route Direktori Staf
│   ├── statistik/            # Route grup Statistik (Kinerja, Peserta, Infografis)
│   ├── globals.css           # Global Styles & Design Tokens (Variabel Warna & Tipografi)
│   ├── layout.tsx            # Root Layout (Top Navbar & Footer Wrapper)
│   └── page.tsx              # Landing Page (Beranda)
├── components/               # Komponen UI Reusable tambahan
├── prisma/                   # Schema database Prisma & Migrasi
│   └── schema.prisma         # Schema Prisma (PostgreSQL datasource)
├── public/                   # Asset Statis (Gambar, Icon, Logo)
├── PRD.md                    # Product Requirement Document
├── Plan.md                   # Sitemap & Mapping Pengembangan Tim
├── STYLES.md                 # Panduan Design System & Styling
├── package.json              # Manifes Dependensi Proyek
└── tsconfig.json             # Konfigurasi TypeScript
```

---

## 🚀 Panduan Memulai (Getting Started)

### 1. Prasyarat
Pastikan sistem Anda telah terpasang:
- **Node.js**: versi 20.x atau lebih baru
- **pnpm**: `npm install -g pnpm`
- **PostgreSQL Database**

### 2. Instalasi Dependensi
Clone repository dan jalankan pnpm install:
```bash
git clone <repository-url>
cd project-magang
pnpm install
```

### 3. Konfigurasi Environment Variable
Buat file `.env` di direktori utama dan sesuaikan variabel koneksi database:
```env
DATABASE_URL="postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME?schema=public"
DIRECT_URL="postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME?schema=public"
```

### 4. Setup Prisma Database
Generate Prisma Client dan sync skema database:
```bash
pnpm prisma generate
# pnpm prisma db push (jika ingin sync skema ke database)
```

### 5. Jalankan Server Pengembang
```bash
pnpm dev
```
Buka browser dan akses [http://localhost:3000](http://localhost:3000).

---

## 📜 Skrip yang Tersedia

- `pnpm dev`: Menjalankan server pengembang Next.js di local.
- `pnpm build`: Membangun (build) aplikasi untuk produksi.
- `pnpm start`: Menjalankan server aplikasi versi produksi hasil build.
- `pnpm lint`: Menjalankan verifikasi linting kode dengan ESLint.

---

## 👥 Tim & Pembagian Tugas

Proyek ini dikembangkan secara kolaboratif dengan pembagian area sebagai berikut (referensi: `Plan.md`):

- **Wildan**: Global Design Tokens, Navbar & Footer Shared Components, Hero Banner, Beranda (`/`), Profil (`/profil/sejarah`, `/profil/visi-misi`, `/profil/struktur-organisasi`).
- **Ridho**: Profil (`/profil/tugas-fungsi`, `/profil/wilayah-kerja`), Informasi (`/informasi/*`), Layanan (`/layanan/*`).
- **Ferdi**: Publikasi (`/publikasi/*`), Statistik (`/statistik/*`), Direktori Staf (`/staf`), Kontak (`/kontak`).

---

## 📄 Lisensi & Hak Cipta

© 2026 Balai Besar Pengembangan Sumber Daya Manusia dan Penelitian Komunikasi dan Informatika (BBLSDM) Medan - Kementerian Komunikasi dan Digital RI. All rights reserved.
