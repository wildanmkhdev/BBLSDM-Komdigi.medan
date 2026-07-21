# Style Guide — Website BBLSDM Komdigi Medan

> Sumber: skema warna & aturan penerapan mengikuti brief resmi (PRD section H). Pola komponen (navbar dropdown, card, dsb) mengacu ke situs induk komdigi.go.id agar konsisten satu ekosistem Komdigi.
>
> **Kepemilikan file:** implementasi token/tipografi & komponen Navbar/Footer/Hero adalah tanggung jawab branch `wildan` (lihat `planning.md §2-3`). Branch `ridho` dan `ferdi` WAJIB pakai token & komponen ini apa adanya, tidak boleh membuat ulang atau mengubah nilainya.

---

## 1. Palet Warna & Token

| Token | Warna | Kegunaan |
|---|---|---|
| `--color-navbar-bg` | Putih (atau alternatif Biru Tua untuk kesan resmi) | Background header/navbar |
| `--color-navbar-border` | Biru Tua / Biru Muda tipis | Border bawah navbar |
| `--color-nav-text-default` | Abu-abu Gelap | Teks menu, kondisi default |
| `--color-nav-text-hover` | Biru Muda (Light Blue) | Teks/underline menu saat hover |
| `--color-bg-body` | Putih | Background utama halaman |
| `--color-bg-section-alt` | Abu-abu Sangat Muda (Off-White) | Section background berselang-seling |
| `--color-card-bg` | Putih | Background card, dengan soft shadow |
| `--color-card-header` | Biru Tua | Judul di dalam card |
| `--color-card-icon` | Biru Muda | Ikon fitur di dalam card |
| `--color-card-accent` | Biru Muda | Garis aksen vertikal tipis di sisi kiri card |
| `--color-cta-primary` | Biru Muda (Cyan/Light Blue) | Tombol utama: "Daftar", "Kirim", "Mulai" (teks putih/biru tua) |
| `--color-cta-secondary` | Merah Tua / Marun | Tombol penting: "Lapor", "Darurat", "Penting" |
| `--color-badge-highlight` | Kuning / Emas | Badge kecil: "Baru", "Pengumuman", "Hot" (teks abu-abu gelap) |
| `--color-status-warning` | Kuning / Emas | Notifikasi: "Dalam Proses", "Maintenance" |
| `--color-status-error` | Merah Tua | Notifikasi: "Gagal", "Batas Waktu Habis", "Laporan Pelanggaran" |
| `--color-status-info` | Biru Muda | Notifikasi: "Tips", "Panduan", info umum |
| `--color-status-success` | Biru Tua | Notifikasi: "Terverifikasi", "Selesai" |
| `--color-footer-bg` | Biru Tua (atau Abu-abu Gelap) | Background footer |
| `--color-footer-text` | Putih | Teks footer (link jadi Biru Muda saat hover) |
| `--color-footer-accent` | Kuning / Merah Tua | Aksen garis pemisah kecil di footer |

**Aturan wajib:**
- Satu warna = satu makna. `Merah Tua` khusus urgent/error, `Kuning` khusus warning/badge, jangan dipakai dekoratif di tempat lain.
- Kontras teks-background dijaga: teks putih hanya di atas background gelap (navy/footer), teks gelap di atas background terang.
- Semua card/section wajib ambil warna dari token di atas — jangan hardcode hex baru.

---

## 2. Tipografi
- Font sans-serif geometris (konsisten dengan situs induk, mis. Inter/Poppins/Plus Jakarta Sans).
- Heading section: bold, ~24–28px.
- Judul card/berita: semibold, ~14–16px, max 2 baris (truncate).
- Nav item: uppercase/medium weight, ~13px.
- Body/caption: regular, ~12–13px, warna abu-abu gelap (di atas putih) / putih (di atas navy).

---

## 3. Komponen

### 3.1 Navbar
- Background putih dengan border bawah biru tua/muda tipis (atau full navy untuk versi resmi).
- Menu dengan submenu **wajib pakai dropdown** — berlaku untuk: `Profil ▾`, `Informasi ▾`, `Layanan ▾`, `Publikasi ▾`, `Statistik ▾`. `Beranda` dan `Kontak` tanpa dropdown.
- Hover state: teks/underline berubah jadi Biru Muda.

### 3.2 Hero Banner
- Fix dari problem statement: dimensi diperbesar agar menonjol (full-width, tinggi memadai, jangan cropped kecil).
- Overlay gelap tipis + judul besar, konsisten dengan pola hero situs induk.

### 3.3 Card (satu sistem, dipakai di semua section)
- Background putih, soft shadow, garis aksen vertikal biru muda di kiri.
- Header/judul biru tua, ikon biru muda.
- Dipakai untuk: layanan (Pelatihan, Pengajuan Magang), berita, publikasi, galeri — **layout grid harus presisi & rapi** (fix dari problem statement tata letak kartu).

### 3.4 CTA & Badge
- Primary CTA (Biru Muda) untuk aksi utama.
- Secondary/Urgent CTA (Merah Tua) untuk aksi penting/darurat.
- Badge highlight (Kuning) untuk label "Baru"/"Pengumuman".

### 3.5 Halaman Sejarah
- Wajib menyertakan galeri gambar (card image grid), tipografi body dioptimalkan (ukuran & line-height nyaman baca) — fix dari problem statement.

### 3.6 Direktori Wilayah Kerja
- Card per provinsi: foto kantor + info + tombol tautan ke website resmi wilayah (pakai `--color-cta-primary`).

### 3.7 Struktur Organisasi
- Bagan/tree hierarki jabatan, tiap node bisa expand untuk deskripsi tugas & fungsi.

### 3.8 Visualisasi Data Kinerja (Statistik)
- Infografis/chart interaktif (Kinerja, Peserta Pelatihan) — bukan tabel statis.

### 3.9 Kontak
- Redesain: form kontak dalam card putih + accent line, info alamat/telepon/email dengan ikon biru muda, peta lokasi jika ada.

### 3.10 Footer
- Background biru tua penuh, teks & link putih (hover jadi biru muda), aksen garis kuning/merah tua tipis sebagai sentuhan estetik.

---

## 4. Prinsip Konsistensi
1. Satu sistem warna, satu sistem card — jangan bikin varian baru tanpa alasan kuat.
2. Navbar dropdown konsisten untuk semua menu berjenjang.
3. Kontras dan makna warna (status/CTA) dijaga ketat sesuai tabel section 1.
4. Section bergantian background terang/off-white untuk ritme visual, footer & navbar sebagai "penjepit" biru tua di atas-bawah.
