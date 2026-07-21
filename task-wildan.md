# Task — Branch `wildan`

## 🔒 INSTRUKSI UNTUK AI
Kamu sedang kerja di branch **`wildan`**. Kerjakan **HANYA** task di file ini.
- Jangan buat/edit halaman atau komponen yang bukan milik branch ini (lihat `planning.md §2` untuk daftar lengkap kepemilikan — itu buat referensi, bukan buat dikerjakan).
- Jangan sentuh route `/informasi/*`, `/layanan/*`, `/publikasi/*`, `/statistik/*`, `/kontak` — itu punya branch `ridho` dan `ferdi`.
- Acuan desain wajib ikut `styles.md` (token warna, tipografi, spek komponen) dan `prd.md` (requirement).
- Kalau nemu kebutuhan di luar scope ini, catat di PR description, jangan langsung dikerjakan.

## File/Route yang BOLEH disentuh
- File token warna & tipografi global (design system)
- Komponen `Navbar` (termasuk dropdown)
- Komponen `Footer`
- Komponen `HeroBanner`
- `/` (Beranda — assembly layout)
- `/profil/sejarah`
- `/profil/visi-misi`
- `/profil/struktur-organisasi`

## Checklist

### Fondasi (kerjakan lebih dulu — ini dipakai semua branch lain)
- [ ] Setup token warna & tipografi jadi CSS variables/theme config sesuai `styles.md §1-2`
- [ ] Perbaiki inkonsistensi warna wrapper vs navbar
- [ ] Bangun komponen Navbar dengan dropdown untuk menu berjenjang (Profil, Informasi, Layanan, Publikasi, Statistik)
- [ ] Hover state menu navbar → warna sesuai `--color-nav-text-hover`
- [ ] Bangun komponen Footer sesuai `styles.md §3.10`
- [ ] Bangun komponen Hero Banner, perbesar dimensi agar proporsional & menonjol
- [ ] Assemble halaman Beranda (pasang Navbar, Hero, Footer, layout dasar)

### Halaman Profil (bagian kamu)
- [ ] Halaman Sejarah: galeri gambar historis + tipografi body yang nyaman dibaca
- [ ] Halaman Visi & Misi (halaman baru)
- [ ] Halaman Struktur Organisasi: bagan kepengurusan + deskripsi tugas & fungsi tiap jabatan

## Definition of Done
- Semua nilai warna diambil dari token, tidak ada hardcode hex baru
- Navbar & Footer bisa langsung di-reuse/di-import branch lain tanpa perlu diubah
- PR sudah direview minimal 1 orang sebelum merge ke `develop`
