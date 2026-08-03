import { z } from "zod";

/// Validasi form Berita — field sesuai halaman /informasi/berita
/// UI menampilkan: title, category(via kategori), date, image(thumbnail), snippet(excerpt), content, author(authorName)
export const beritaSchema = z.object({
  title: z
    .string()
    .min(5, "Judul minimal 5 karakter")
    .max(500, "Judul maksimal 500 karakter"),
  excerpt: z
    .string()
    .max(500, "Ringkasan maksimal 500 karakter")
    .optional()
    .or(z.literal("")),
  content: z
    .string()
    .min(10, "Konten minimal 10 karakter"),
  /// Nama penulis yang ditampilkan langsung di card (field "Oleh: ...")
  authorName: z
    .string()
    .min(2, "Nama penulis minimal 2 karakter")
    .max(255)
    .optional()
    .or(z.literal("")),
  kategoriId: z
    .string()
    .uuid("Kategori tidak valid"),
  thumbnailId: z
    .string()
    .uuid("Cover gambar tidak valid")
    .optional()
    .nullable(),
  status: z
    .enum(["DRAFT", "REVIEW", "PUBLISHED"])
    .default("DRAFT"),
  isFeatured: z.boolean().default(false),
});

export type BeritaFormData = z.infer<typeof beritaSchema>;
