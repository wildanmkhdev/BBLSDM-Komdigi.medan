"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const newsSchema = z.object({
  title: z.string().min(5, "Judul minimal 5 karakter").max(255),
  excerpt: z.string().optional(),
  content: z.string().min(10, "Konten minimal 10 karakter"),
  kategoriId: z.string().uuid("Pilih kategori berita"),
  thumbnailId: z.string().uuid("Pilih gambar cover").optional().nullable(),
  status: z.enum(["DRAFT", "REVIEW", "PUBLISHED"]).default("DRAFT"),
  isFeatured: z.boolean().default(false),
});

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "") + "-" + Date.now();
}

import { Prisma, KategoriBerita } from "@prisma/client";

export type SafeNewsArticle = Omit<Prisma.BeritaGetPayload<{ include: { kategori: true; thumbnail: true } }>, "viewCount"> & { viewCount: number };

export async function getNewsArticles(): Promise<SafeNewsArticle[]> {
  try {
    const list = await prisma.berita.findMany({
      orderBy: { createdAt: "desc" },
      include: { kategori: true, thumbnail: true },
    });
    // Convert viewCount BigInt to Number safely
    return list.map(item => ({
      ...item,
      viewCount: Number(item.viewCount)
    }));
  } catch (error) {
    console.error("Fetch news error:", error);
    return [];
  }
}

export async function getNewsCategories(): Promise<KategoriBerita[]> {
  try {
    let list = await prisma.kategoriBerita.findMany();
    
    // Seed default categories if none exist
    if (list.length === 0) {
      await prisma.kategoriBerita.createMany({
        data: [
          { name: "Kunjungan Kerja", slug: "kunjungan-kerja" },
          { name: "Kegiatan UPT", slug: "kegiatan-upt" },
          { name: "Rapat Koordinasi", slug: "rapat-koordinasi" },
          { name: "Pengumuman", slug: "pengumuman" },
        ],
      });
      list = await prisma.kategoriBerita.findMany();
    }
    return list;
  } catch (error) {
    console.error("Fetch categories error:", error);
    return [];
  }
}

export async function createNewsArticle(data: z.infer<typeof newsSchema>) {
  try {
    const validated = newsSchema.parse(data);
    const slug = generateSlug(validated.title);

    const article = await prisma.berita.create({
      data: {
        title: validated.title,
        slug,
        excerpt: validated.excerpt,
        content: validated.content,
        kategoriId: validated.kategoriId,
        thumbnailId: validated.thumbnailId,
        status: validated.status,
        isFeatured: validated.isFeatured,
        publishedAt: validated.status === "PUBLISHED" ? new Date() : null,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/berita");
    return { success: true, article };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.flatten().fieldErrors };
    }
    console.error("Create news error:", error);
    return { success: false, error: "Gagal menyimpan artikel berita" };
  }
}

export async function deleteNewsArticle(id: string) {
  try {
    await prisma.berita.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/admin/berita");
    return { success: true };
  } catch (error) {
    console.error("Error deleting news article:", error);
    return { success: false, error: "Gagal menghapus berita" };
  }
}
