
# Planning — Website BBLSDM Komdigi Medan

> File ini isinya sitemap & peta kepemilikan (siapa pegang apa). Untuk to-do list actionable, lihat `task-wildan.md` / `task-ridho.md` / `task-ferdi.md` masing-masing — jangan kerjakan dari file ini.

## 1. Sitemap Lengkap

```
/                            → Beranda
/profil/sejarah              → Galeri Sejarah
/profil/visi-misi            → Visi & Misi
/profil/struktur-organisasi  → Struktur Organisasi
/profil/tugas-fungsi         → Tugas dan Fungsi
/profil/wilayah-kerja        → Direktori Wilayah Kerja
/informasi/berita            → Berita
/informasi/pengumuman        → Pengumuman
/informasi/galeri            → Galeri Dokumentasi
/layanan/pelatihan           → Pelatihan
/layanan/magang              → Pengajuan Magang
/layanan/faq                 → FAQ
/layanan/feedback            → Feedback Comment
/publikasi/lakip             → LAKIP
/publikasi/laptah            → LAPTAH
/publikasi/ict-indikator     → ICT Indikator
/publikasi/penelitian        → Penelitian
/publikasi/buku-putih        → Buku Putih
/statistik/kinerja           → Statistik Kinerja
/statistik/peserta           → Statistik Peserta Pelatihan
/statistik/infografis        → Infografis
/kontak                      → Kontak
```

## 2. Peta Kepemilikan (Branch Ownership)


| Area / Komponen                                 | Pemilik Branch   | Catatan                                                                     |
| ----------------------------------------------- | ---------------- | --------------------------------------------------------------------------- |
| Design tokens (warna, tipografi) — file global | **wildan** | Branch lain HANYA PAKAI, tidak boleh ubah nilai token                       |
| Komponen Navbar (+ dropdown)                    | **wildan** | Shared component, dipakai semua halaman                                     |
| Komponen Footer                                 | **wildan** | Shared component                                                            |
| Komponen Hero Banner                            | **wildan** | Dipakai di Beranda                                                          |
| Halaman Beranda (assembly)                      | **wildan** |                                                                             |
| /profil/sejarah                                 | **wildan** |                                                                             |
| /profil/visi-misi                               | **wildan** |                                                                             |
| /profil/struktur-organisasi                     | **wildan** |                                                                             |
| /profil/tugas-fungsi                            | **ridho**  |                                                                             |
| /profil/wilayah-kerja                           | **ridho**  |                                                                             |
| /informasi/berita                               | **ridho**  |                                                                             |
| /informasi/pengumuman                           | **ridho**  |                                                                             |
| /informasi/galeri                               | **ridho**  |                                                                             |
| /layanan/pelatihan                              | **ridho**  |                                                                             |
| /layanan/magang                                 | **ridho**  |                                                                             |
| /layanan/faq                                    | **ridho**  |                                                                             |
| /layanan/feedback                               | **ridho**  |                                                                             |
| /publikasi/* (5 halaman)                        | **ferdi**  | Boleh dibuat 1 komponen list reusable + 5 data entry                        |
| Daftar staf / struktur hierarki lengkap         | **ferdi**  | *(beda dengan bagan organisasi milik wildan — ini list detail per staf)* |
| /statistik/kinerja                              | **ferdi**  |                                                                             |
| /statistik/peserta                              | **ferdi**  |                                                                             |
| /statistik/infografis                           | **ferdi**  |                                                                             |
| /kontak                                         | **ferdi**  |                                                                             |

## 3. Komponen Bersama (Shared) — Aturan Pakai

Navbar, Footer, Hero Banner, dan file token warna/tipografi **dimiliki branch `wildan`**. Branch `ridho` dan `ferdi`:


| Area / Komponen                                 | Pemilik Branch   | Catatan                                                                     |
| ----------------------------------------------- | ---------------- | --------------------------------------------------------------------------- |
| Design tokens (warna, tipografi) — file global | **wildan** | Branch lain HANYA PAKAI, tidak boleh ubah nilai token                       |
| Komponen Navbar (+ dropdown)                    | **wildan** | Shared component, dipakai semua halaman                                     |
| Komponen Footer                                 | **wildan** | Shared component                                                            |
| Komponen Hero Banner                            | **wildan** | Dipakai di Beranda                                                          |
| Halaman Beranda (assembly)                      | **wildan** |                                                                             |
| /profil/sejarah                                 | **wildan** |                                                                             |
| /profil/visi-misi                               | **wildan** |                                                                             |
| /profil/struktur-organisasi                     | **wildan** |                                                                             |
| /profil/tugas-fungsi                            | **ridho**  |                                                                             |
| /profil/wilayah-kerja                           | **ridho**  |                                                                             |
| /informasi/berita                               | **ridho**  |                                                                             |
| /informasi/pengumuman                           | **ridho**  |                                                                             |
| /informasi/galeri                               | **ridho**  |                                                                             |
| /layanan/pelatihan                              | **ridho**  |                                                                             |
| /layanan/magang                                 | **ridho**  |                                                                             |
| /layanan/faq                                    | **ridho**  |                                                                             |
| /layanan/feedback                               | **ridho**  |                                                                             |
| /publikasi/* (5 halaman)                        | **ferdi**  | Boleh dibuat 1 komponen list reusable + 5 data entry                        |
| Daftar staf / struktur hierarki lengkap         | **ferdi**  | *(beda dengan bagan organisasi milik wildan — ini list detail per staf)* |
| /statistik/kinerja                              | **ferdi**  |                                                                             |
| /statistik/peserta                              | **ferdi**  |                                                                             |
| /statistik/infografis                           | **ferdi**  |                                                                             |
| /kontak                                         | **ferdi**  |                                                                             |

## 3. Komponen Bersama (Shared) — Aturan Pakai

Navbar, Footer, Hero Banner, dan file token warna/tipografi **dimiliki branch `wildan`**. Branch `ridho` dan `ferdi`:

- Boleh **import/pakai** komponen ini di halaman mereka.
- **Tidak boleh mengedit isi/source** komponen tersebut. Kalau ada bug/kebutuhan perubahan di shared component, catat di PR description untuk dikoordinasikan, jangan langsung diubah dari branch lain.

## 4. Urutan Merge yang Disarankan


`wildan` merge duluan ke `develop` (karena isinya fondasi + shared component yang dipakai semua orang).

1. `ridho` dan `ferdi` boleh mulai kerja dari awal secara paralel (tidak perlu nunggu wildan selesai 100%, karena `styles.md` sudah kasih spesifikasi token/komponen final — mereka bisa develop halaman sendiri lalu rebase saat wildan merge).
3. `ridho` dan `ferdi` merge menyusul setelah `wildan`, urutan antara keduanya bebas (halaman mereka tidak saling bersinggungan).
4. QA akhir lintas-halaman dilakukan di `develop` setelah ketiga branch merge — bukan tugas salah satu branch, tapi tahap integrasi terpisah.
