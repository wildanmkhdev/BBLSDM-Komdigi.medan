import { z } from "zod";

/// Validasi form Pengumuman — field sesuai halaman /informasi/pengumuman
/// UI menampilkan: title, category(badge), date(createdAt), content, priority(HIGH/NORMAL),
/// downloadUrl(attachment.publicUrl), fileSize(attachment.fileSize)
export const pengumumanSchema = z.object({
  title: z
    .string()
    .min(5, "Judul minimal 5 karakter")
    .max(500, "Judul maksimal 500 karakter"),
  /// Kategori yang digunakan di filter dan badge card
  category: z
    .string()
    .min(2, "Kategori minimal 2 karakter")
    .max(100, "Kategori maksimal 100 karakter"),
  content: z
    .string()
    .min(10, "Konten minimal 10 karakter"),
  /// Prioritas: HIGH = label merah (penting), NORMAL = label abu-abu
  priority: z.enum(["HIGH", "NORMAL"]).default("NORMAL"),
  /// ID media lampiran PDF yang bisa diunduh publik
  attachmentId: z
    .string()
    .uuid("Lampiran tidak valid")
    .optional()
    .nullable(),
  isPublished: z.boolean().default(false),
});

export type PengumumanFormData = z.infer<typeof pengumumanSchema>;

/// Kategori pengumuman yang tersedia di filter UI
export const KATEGORI_PENGUMUMAN = [
  "Sertifikasi",
  "Rekrutmen & Magang",
  "Layanan Publik",
  "Pelatihan",
  "Riset & Kebijakan",
] as const;
