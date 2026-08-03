import { z } from "zod";

/// Validasi form Album Galeri — field sesuai halaman /informasi/galeri
/// UI menampilkan: title, category(badge & filter), date(eventDate), image(cover),
/// images[](via GaleriPhoto), desc(description)
export const galeriAlbumSchema = z.object({
  title: z
    .string()
    .min(5, "Judul minimal 5 karakter")
    .max(255, "Judul maksimal 255 karakter"),
  /// Kategori yang digunakan di filter dan badge card galeri
  category: z
    .string()
    .min(2, "Kategori minimal 2 karakter")
    .max(100, "Kategori maksimal 100 karakter"),
  description: z
    .string()
    .max(2000, "Deskripsi terlalu panjang")
    .optional()
    .or(z.literal("")),
  /// Tanggal kegiatan — ditampilkan di card dan info modal
  eventDate: z
    .string()
    .optional()
    .or(z.literal("")),
  /// Cover foto utama album (thumbnail di card grid)
  coverPhotoId: z
    .string()
    .uuid("Cover foto tidak valid")
    .optional()
    .nullable(),
  isPublished: z.boolean().default(false),
});

/// Validasi untuk tambah foto ke album
export const galeriPhotoSchema = z.object({
  albumId: z
    .string()
    .uuid("Album tidak valid"),
  mediaId: z
    .string()
    .uuid("Media tidak valid"),
  caption: z.string().max(500).optional().or(z.literal("")),
  altText: z.string().max(255).optional().or(z.literal("")),
  orderIndex: z.number().int().min(0).default(0),
});

export type GaleriAlbumFormData = z.infer<typeof galeriAlbumSchema>;
export type GaleriPhotoFormData = z.infer<typeof galeriPhotoSchema>;

/// Kategori galeri yang tersedia di filter UI
export const KATEGORI_GALERI = [
  "Kunjungan Kerja",
  "Kegiatan Instansi",
  "Penyambutan & Sinergi",
  "Pelatihan",
] as const;
