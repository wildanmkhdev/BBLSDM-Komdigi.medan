# Task — Branch `ridho`

## 🔒 INSTRUKSI UNTUK AI
Kamu sedang kerja di branch **`ridho`**. Kerjakan **HANYA** task di file ini.
- Jangan buat/edit halaman atau komponen yang bukan milik branch ini (lihat `planning.md §2` untuk daftar lengkap kepemilikan — itu buat referensi, bukan buat dikerjakan).
- Jangan sentuh route `/`, `/profil/sejarah`, `/profil/visi-misi`, `/profil/struktur-organisasi`, `/publikasi/*`, `/statistik/*`, `/kontak` — itu punya branch `wildan` dan `ferdi`.
- Komponen `Navbar`, `Footer`, `HeroBanner`, dan file token warna/tipografi adalah milik branch `wildan`. Kamu **boleh import/pakai**, tapi **tidak boleh mengedit source-nya**. Kalau ada bug di situ, catat di PR description untuk dikoordinasikan.
- Acuan desain wajib ikut `styles.md` (khususnya §3.3 pola Card) dan `prd.md` (requirement).

## File/Route yang BOLEH disentuh
- `/profil/tugas-fungsi`
- `/profil/wilayah-kerja`
- `/informasi/berita`
- `/informasi/pengumuman`
- `/informasi/galeri`
- `/layanan/pelatihan`
- `/layanan/magang`
- `/layanan/faq`
- `/layanan/feedback`

## Checklist

### Profil (sisa bagian kamu)
- [ ] Halaman Tugas dan Fungsi: lengkapi deskripsi jabatan secara komprehensif
- [ ] Halaman Wilayah Kerja: tambahkan dokumentasi foto kantor per provinsi
- [ ] Halaman Wilayah Kerja: integrasikan tautan ke website resmi tiap wilayah

### Informasi
- [ ] Halaman Berita: grid card rapi & presisi sesuai pola News Card (`styles.md §3.3`)
- [ ] Halaman Pengumuman: grid card sama pola dengan Berita
- [ ] Halaman Galeri Dokumentasi: grid card/gambar

### Layanan
- [ ] Halaman Pelatihan
- [ ] Halaman Pengajuan Magang (form + alur pendaftaran)
- [ ] Halaman FAQ
- [ ] Fitur Feedback Comment

## Definition of Done
- Semua card pakai komponen Card yang sama (reuse, jangan bikin varian card baru)
- Semua warna diambil dari token `styles.md`, tidak hardcode
- Navbar/Footer dipakai apa adanya dari branch `wildan` (tidak dimodifikasi)
- PR sudah direview minimal 1 orang sebelum merge ke `develop`
