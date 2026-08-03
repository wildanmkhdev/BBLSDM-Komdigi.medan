"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { beritaSchema, type BeritaFormData } from "@/validations/berita";
import { Prisma, KategoriBerita } from "@prisma/client";
import { z } from "zod";

// ─── Type helper ───────────────────────────────────────────────────────────────
export type SafeBerita = Omit<
  Prisma.BeritaGetPayload<{ include: { kategori: true; thumbnail: true } }>,
  "viewCount"
> & { viewCount: number };

// ─── Slug generator ────────────────────────────────────────────────────────────
function generateSlug(text: string) {
  return (
    text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "") +
    "-" +
    Date.now()
  );
}

// ─── READ ───────────────────────────────────────────────────────────────────────

export async function getNewsArticles(): Promise<SafeBerita[]> {
  try {
    const list = await prisma.berita.findMany({
      orderBy: { createdAt: "desc" },
      include: { kategori: true, thumbnail: true },
    });
    return list.map((item) => ({ ...item, viewCount: Number(item.viewCount) }));
  } catch (error) {
    console.error("Fetch news error:", error);
    return [];
  }
}

export async function getNewsCategories(): Promise<KategoriBerita[]> {
  try {
    let list = await prisma.kategoriBerita.findMany({
      orderBy: { name: "asc" },
    });

    // Seed kategori default jika belum ada (sesuai filter UI halaman Berita)
    if (list.length === 0) {
      await prisma.kategoriBerita.createMany({
        data: [
          { name: "Kunjungan Kerja", slug: "kunjungan-kerja" },
          { name: "Kegiatan UPT", slug: "kegiatan-upt" },
          { name: "Rapat Koordinasi", slug: "rapat-koordinasi" },
          { name: "Pelatihan & UMKM", slug: "pelatihan-umkm" },
        ],
      });
      list = await prisma.kategoriBerita.findMany({ orderBy: { name: "asc" } });
    }
    return list;
  } catch (error) {
    console.error("Fetch categories error:", error);
    return [];
  }
}

// ─── CREATE ─────────────────────────────────────────────────────────────────────

export async function createNewsArticle(data: BeritaFormData) {
  try {
    const validated = beritaSchema.parse(data);
    const slug = generateSlug(validated.title);

    const article = await prisma.berita.create({
      data: {
        title: validated.title,
        slug,
        excerpt: validated.excerpt || null,
        content: validated.content,
        authorName: validated.authorName || null,
        kategoriId: validated.kategoriId,
        thumbnailId: validated.thumbnailId ?? null,
        status: validated.status,
        isFeatured: validated.isFeatured,
        publishedAt: validated.status === "PUBLISHED" ? new Date() : null,
      },
    });

    revalidatePath("/");
    revalidatePath("/informasi/berita");
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

// ─── UPDATE ─────────────────────────────────────────────────────────────────────

export async function updateNewsArticle(id: string, data: BeritaFormData) {
  try {
    const validated = beritaSchema.parse(data);

    const existing = await prisma.berita.findUnique({ where: { id } });
    if (!existing) return { success: false, error: "Artikel tidak ditemukan" };

    const updated = await prisma.berita.update({
      where: { id },
      data: {
        title: validated.title,
        excerpt: validated.excerpt || null,
        content: validated.content,
        authorName: validated.authorName || null,
        kategoriId: validated.kategoriId,
        thumbnailId: validated.thumbnailId ?? null,
        status: validated.status,
        isFeatured: validated.isFeatured,
        // Hanya set publishedAt saat pertama kali PUBLISHED
        publishedAt:
          validated.status === "PUBLISHED" && !existing.publishedAt
            ? new Date()
            : existing.publishedAt,
      },
    });

    revalidatePath("/");
    revalidatePath("/informasi/berita");
    revalidatePath("/admin/berita");
    return { success: true, article: updated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.flatten().fieldErrors };
    }
    console.error("Update news error:", error);
    return { success: false, error: "Gagal memperbarui artikel" };
  }
}

// ─── DELETE ─────────────────────────────────────────────────────────────────────

export async function deleteNewsArticle(id: string) {
  try {
    await prisma.berita.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/informasi/berita");
    revalidatePath("/admin/berita");
    return { success: true };
  } catch (error) {
    console.error("Error deleting news article:", error);
    return { success: false, error: "Gagal menghapus berita" };
  }
}
