import { z } from "zod";

/// Kategori pelatihan sesuai tab filter di halaman /layanan/pelatihan
export const CATEGORY_SLUGS = ["komunikasi", "pemasaran", "cyber", "data", "cloud"] as const;
export type CategorySlug = typeof CATEGORY_SLUGS[number];

/// Mapping slug → label tampilan di UI
export const CATEGORY_LABELS: Record<CategorySlug, string> = {
  komunikasi: "Komunikasi Digital",
  pemasaran: "Pemasaran Digital",
  cyber: "Cyber Security",
  data: "Data & AI",
  cloud: "Cloud & DevOps",
};

/// Validasi form Pelatihan — field sesuai halaman /layanan/pelatihan
/// UI menampilkan: title, categoryLabel(badge), description, jadwal, durasi, kuota,
/// terisi(progress bar), status(badge+filter), level(badge), metode, lokasi,
/// silabus[](modal), persyaratan[](modal)
export const pelatihanSchema = z.object({
  title: z
    .string()
    .min(5, "Nama pelatihan minimal 5 karakter")
    .max(500, "Nama pelatihan maksimal 500 karakter"),
  /// Slug kategori untuk filter tabs
  categorySlug: z.enum(CATEGORY_SLUGS),
  /// Label yang otomatis terisi dari categorySlug
  categoryLabel: z
    .string()
    .min(2)
    .max(100)
    .optional(),
  description: z
    .string()
    .min(10, "Deskripsi minimal 10 karakter"),
  /// Format bebas: "28 Jul — 30 Jul 2026"
  jadwal: z
    .string()
    .min(2, "Jadwal minimal 2 karakter")
    .max(255),
  /// Format bebas: "3 Hari (24 JP)"
  durasi: z
    .string()
    .min(2, "Durasi minimal 2 karakter")
    .max(100),
  /// Kapasitas maksimum peserta
  kuota: z
    .number()
    .int("Kuota harus bilangan bulat")
    .positive("Kuota harus lebih dari 0")
    .max(9999),
  /// Jumlah peserta terdaftar (untuk progress bar)
  terisi: z
    .number()
    .int()
    .min(0, "Terisi tidak boleh negatif")
    .default(0),
  status: z
    .enum(["SEGERA_DIBUKA", "OPEN", "FULL"])
    .default("SEGERA_DIBUKA"),
  level: z
    .enum(["DASAR", "MENENGAH", "LANJUTAN"])
    .default("DASAR"),
  /// Metode pelaksanaan: "Tatap Muka" / "Online" / "Hybrid"
  metode: z
    .string()
    .min(2)
    .max(100),
  /// Lokasi yang ditampilkan di card pelatihan
  lokasi: z
    .string()
    .min(2)
    .max(255),
  /// Array materi silabus — ditampilkan di modal detail
  silabus: z
    .array(z.string().min(3, "Materi minimal 3 karakter"))
    .min(1, "Silabus minimal 1 materi")
    .max(20, "Silabus maksimal 20 materi"),
  /// Array persyaratan peserta — ditampilkan di modal detail
  persyaratan: z
    .array(z.string().min(3, "Persyaratan minimal 3 karakter"))
    .min(1, "Persyaratan minimal 1 item")
    .max(15, "Persyaratan maksimal 15 item"),
})
.refine(
  (data) => data.terisi <= data.kuota,
  { message: "Jumlah terisi tidak boleh melebihi kuota", path: ["terisi"] }
);

export type PelatihanFormData = z.infer<typeof pelatihanSchema>;

/// Status label mapping untuk UI
export const STATUS_LABELS: Record<string, string> = {
  SEGERA_DIBUKA: "Segera Dibuka",
  OPEN: "Dibuka",
  FULL: "Penuh",
};

/// Level label mapping untuk UI
export const LEVEL_LABELS: Record<string, string> = {
  DASAR: "Dasar",
  MENENGAH: "Menengah",
  LANJUTAN: "Lanjutan",
};
