# PRD — Website BBLSDM Komdigi Medan

## A. Latar Belakang
Masyarakat umum membutuhkan akses informasi yang cepat, mudah, dan terpercaya mengenai profil, tugas, fungsi, kegiatan, serta publikasi instansi. Penyampaian informasi yang belum terorganisasi dengan baik menyulitkan masyarakat memperoleh informasi yang dibutuhkan.

Website dirancang dengan menu utama **Beranda, Profil, Informasi, Publikasi, Kontak**, dilengkapi menu tambahan seperti **Sejarah** (dokumentasi visual historis) dan **Wilayah Kerja** (informasi & tautan kantor per provinsi), agar masyarakat memperoleh informasi secara terpusat dan intuitif.

## B. Tujuan
1. **Meningkatkan Aksesibilitas Informasi** — wadah terpusat agar masyarakat dapat menemukan profil, tugas, fungsi, kegiatan, dan publikasi instansi tanpa hambatan navigasi.
2. **Meningkatkan Organisasi & Struktur Konten** — menyusun menu utama dan pendukung secara intuitif agar pengguna menemukan data dalam hitungan detik.
3. **Memperluas Jangkauan Layanan Wilayah** — menghubungkan publik dengan kantor wilayah provinsi lewat informasi wilayah kerja + tautan langsung ke website daerah.
4. **Membangun Citra & Kepercayaan Publik** — menyajikan kilas balik instansi (Sejarah) dan publikasi resmi berkala untuk meningkatkan kredibilitas.

## C. Problem Statement (Kondisi Saat Ini)
- Dimensi banner utama terlalu kecil, kurang menonjol secara visual.
- Tata letak komponen kartu gambar belum tertata rapi dan presisi.
- Ketidakkonsistenan skema warna antara elemen wrapper dan menu navigasi.
- Fitur **Sejarah** belum ada konten visual (gambar) dan tipografi kurang optimal.
- Fitur **Wilayah Kerja** belum menampilkan dokumentasi kantor per wilayah dan belum terintegrasi tautan situs resmi daerah.
- Informasi deskripsi jabatan & struktur kepengurusan pada **Tugas dan Fungsi** belum komprehensif.
- Belum ada halaman khusus **Visi dan Misi**.
- Belum ada daftar staf dengan hierarki organisasi & rincian fungsi tugas jabatan.
- Kurang representasi data kinerja dalam bentuk visualisasi interaktif/infografis.
- Desain halaman **Kontak** perlu pembaruan estetika agar lebih profesional dan fungsional.

## D. Struktur Menu (Final)
```
Profil
├─ Sejarah
├─ Visi & Misi
├─ Struktur Organisasi
├─ Tugas dan Fungsi
└─ Wilayah Kerja

Informasi
├─ Berita
├─ Pengumuman
└─ Galeri

Layanan
├─ Pelatihan
├─ Pengajuan Magang
├─ FAQ
└─ Feedback Comment

Publikasi
├─ LAKIP
├─ LAPTAH
├─ ICT Indikator
├─ Penelitian
└─ Buku Putih

Statistik
├─ Kinerja
├─ Peserta Pelatihan
└─ Infografis

Kontak
```
> Struktur ini menggantikan draft menu awal (Menu Utama/Menu Tambahan) — lihat bagian E untuk deskripsi fungsional tiap fitur.

## E. Deskripsi Fitur per Halaman
| Fitur | Deskripsi |
|---|---|
| Galeri Sejarah | Dokumentasi visual historis instansi |
| Direktori Wilayah Kerja | Visualisasi kantor per provinsi + tautan ke situs resmi wilayah |
| Struktur Organisasi | Bagan kepengurusan lengkap + deskripsi tugas & fungsi tiap jabatan |
| Visualisasi Data Kinerja | Indikator kinerja instansi dalam format infografis/interaktif |
| Galeri Dokumentasi | Dokumentasi aktivitas operasional kantor |
| Visi dan Misi | Halaman khusus pernyataan visi & misi instansi |
| Pengajuan Magang | Informasi dan alur pendaftaran program magang |
| Pelatihan | Info pelatihan yang tersedia |
| Feedback Comment | Kanal masukan pengguna |

## F. Dokumen Terkait
- `styles.md` — token warna, tipografi, spesifikasi komponen (acuan visual, wajib dipakai semua branch)
- `planning.md` — sitemap lengkap + siapa pemilik tiap halaman/komponen
- `task-wildan.md`, `task-ridho.md`, `task-ferdi.md` — to-do list masing-masing branch (isolated, tidak overlap)
