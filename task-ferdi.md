# Task — Branch `ferdi`

## 🔒 INSTRUKSI UNTUK AI
Kamu sedang kerja di branch **`ferdi`**. Kerjakan **HANYA** task di file ini.
- Jangan buat/edit halaman atau komponen yang bukan milik branch ini (lihat `planning.md §2` untuk daftar lengkap kepemilikan — itu buat referensi, bukan buat dikerjakan).
- Jangan sentuh route `/`, `/profil/*`, `/informasi/*`, `/layanan/*` — itu punya branch `wildan` dan `ridho`.
- Komponen `Navbar`, `Footer`, `HeroBanner`, dan file token warna/tipografi adalah milik branch `wildan`. Kamu **boleh import/pakai**, tapi **tidak boleh mengedit source-nya**. Kalau ada bug di situ, catat di PR description untuk dikoordinasikan.
- Acuan desain wajib ikut `styles.md` dan `prd.md` (requirement).
- QA lintas-halaman (seluruh website) **bukan** tugas branch ini — itu dilakukan terpisah di `develop` setelah semua branch merge. Kamu cuma QA bagian kamu sendiri (lihat checklist di bawah).

## File/Route yang BOLEH disentuh
- `/publikasi/lakip`
- `/publikasi/laptah`
- `/publikasi/ict-indikator`
- `/publikasi/penelitian`
- `/publikasi/buku-putih`
- Komponen daftar staf / struktur hierarki (detail per staf — beda dari bagan Struktur Organisasi milik `wildan`)
- `/statistik/kinerja`
- `/statistik/peserta`
- `/statistik/infografis`
- `/kontak`

## Checklist

### Publikasi
- [ ] Bangun 1 komponen list/card dokumen reusable, lalu isi untuk 5 halaman: LAKIP, LAPTAH, ICT Indikator, Penelitian, Buku Putih (link download)

### Struktur & Statistik
- [ ] Halaman/komponen daftar staf: hierarki organisasi + rincian tugas fungsi masing-masing jabatan
- [ ] Halaman Statistik Kinerja: chart/infografis interaktif (bukan tabel statis)
- [ ] Halaman Statistik Peserta Pelatihan: chart interaktif
- [ ] Halaman Infografis

### Kontak
- [ ] Redesain halaman Kontak: form card + accent line + info kontak dengan ikon (sesuai `styles.md §3.9`)

### QA (khusus halaman kamu sendiri)
- [ ] Cek tidak ada warna hardcode di luar token, di semua halaman kamu
- [ ] Cek kontras teks-background (WCAG AA) di semua halaman kamu
- [ ] Cek responsivitas card/grid di halaman kamu (mobile)

## Definition of Done
- Semua warna diambil dari token `styles.md`, tidak hardcode
- Navbar/Footer dipakai apa adanya dari branch `wildan` (tidak dimodifikasi)
- Chart/infografis punya fallback yang wajar kalau data belum tersedia
- PR sudah direview minimal 1 orang sebelum merge ke `develop`
