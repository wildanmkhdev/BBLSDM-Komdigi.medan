"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {
  pelatihanSchema,
  type PelatihanFormData,
  CATEGORY_LABELS,
} from "@/validations/pelatihan";
import { Prisma } from "@prisma/client";
import { z } from "zod";

// ─── Type helper ───────────────────────────────────────────────────────────────
export type SafePelatihan = Prisma.PelatihanGetPayload<Record<string, never>>;

// ─── READ ───────────────────────────────────────────────────────────────────────

/// Untuk admin — semua pelatihan
export async function getPelatihanList(): Promise<SafePelatihan[]> {
  try {
    return await prisma.pelatihan.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Fetch pelatihan error:", error);
    return [];
  }
}

/// Untuk halaman publik /layanan/pelatihan — format sesuai PelatihanItem interface di UI
export async function getPublishedPelatihan() {
  try {
    const list = await prisma.pelatihan.findMany({
      orderBy: [{ status: "asc" }, { createdAt: "desc" }],
    });

    // Map ke format yang digunakan UI di halaman pelatihan
    return list.map((p) => ({
      id: p.id,
      title: p.title,
      category: p.categorySlug,
      categoryLabel: p.categoryLabel,
      description: p.description,
      jadwal: p.jadwal,
      durasi: p.durasi,
      kuota: p.kuota,
      terisi: p.terisi,
      // Map enum DB ke label UI
      status:
        p.status === "OPEN"
          ? "Dibuka"
          : p.status === "FULL"
          ? "Penuh"
          : "Segera Dibuka",
      // Map enum DB ke label UI
      level:
        p.level === "DASAR"
          ? "Dasar"
          : p.level === "MENENGAH"
          ? "Menengah"
          : "Lanjutan",
      metode: p.metode,
      lokasi: p.lokasi,
      // JSON field — parse dengan safe fallback
      silabus: Array.isArray(p.silabus) ? (p.silabus as string[]) : [],
      persyaratan: Array.isArray(p.persyaratan)
        ? (p.persyaratan as string[])
        : [],
    }));
  } catch (error) {
    console.error("Fetch published pelatihan error:", error);
    return [];
  }
}

export async function getPelatihanById(id: string): Promise<SafePelatihan | null> {
  try {
    return await prisma.pelatihan.findUnique({ where: { id } });
  } catch (error) {
    console.error("Fetch pelatihan by id error:", error);
    return null;
  }
}

// ─── CREATE ─────────────────────────────────────────────────────────────────────

export async function createPelatihan(data: PelatihanFormData) {
  try {
    const validated = pelatihanSchema.parse(data);

    // Auto-isi categoryLabel dari slug jika tidak disediakan
    const categoryLabel =
      validated.categoryLabel ||
      CATEGORY_LABELS[validated.categorySlug] ||
      validated.categorySlug;

    const pelatihan = await prisma.pelatihan.create({
      data: {
        title: validated.title,
        categorySlug: validated.categorySlug,
        categoryLabel,
        description: validated.description,
        jadwal: validated.jadwal,
        durasi: validated.durasi,
        kuota: validated.kuota,
        terisi: validated.terisi,
        status: validated.status,
        level: validated.level,
        metode: validated.metode,
        lokasi: validated.lokasi,
        silabus: validated.silabus,
        persyaratan: validated.persyaratan,
      },
    });

    revalidatePath("/layanan/pelatihan");
    revalidatePath("/admin/pelatihan");
    return { success: true, pelatihan };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.flatten().fieldErrors };
    }
    console.error("Create pelatihan error:", error);
    return { success: false, error: "Gagal menyimpan data pelatihan" };
  }
}

// ─── UPDATE ─────────────────────────────────────────────────────────────────────

export async function updatePelatihan(id: string, data: PelatihanFormData) {
  try {
    const validated = pelatihanSchema.parse(data);

    const categoryLabel =
      validated.categoryLabel ||
      CATEGORY_LABELS[validated.categorySlug] ||
      validated.categorySlug;

    const updated = await prisma.pelatihan.update({
      where: { id },
      data: {
        title: validated.title,
        categorySlug: validated.categorySlug,
        categoryLabel,
        description: validated.description,
        jadwal: validated.jadwal,
        durasi: validated.durasi,
        kuota: validated.kuota,
        terisi: validated.terisi,
        status: validated.status,
        level: validated.level,
        metode: validated.metode,
        lokasi: validated.lokasi,
        silabus: validated.silabus,
        persyaratan: validated.persyaratan,
      },
    });

    revalidatePath("/layanan/pelatihan");
    revalidatePath("/admin/pelatihan");
    return { success: true, pelatihan: updated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.flatten().fieldErrors };
    }
    console.error("Update pelatihan error:", error);
    return { success: false, error: "Gagal memperbarui data pelatihan" };
  }
}

// ─── UPDATE TERISI (peserta daftar) ────────────────────────────────────────────

export async function updateTerisiPelatihan(id: string, terisi: number) {
  try {
    const pelatihan = await prisma.pelatihan.findUnique({ where: { id } });
    if (!pelatihan) return { success: false, error: "Pelatihan tidak ditemukan" };

    const newStatus =
      terisi >= pelatihan.kuota ? "FULL" : pelatihan.status === "FULL" ? "OPEN" : pelatihan.status;

    await prisma.pelatihan.update({
      where: { id },
      data: { terisi, status: newStatus },
    });

    revalidatePath("/layanan/pelatihan");
    revalidatePath("/admin/pelatihan");
    return { success: true };
  } catch (error) {
    console.error("Update terisi pelatihan error:", error);
    return { success: false, error: "Gagal memperbarui jumlah peserta" };
  }
}

// ─── DELETE ─────────────────────────────────────────────────────────────────────

export async function deletePelatihan(id: string) {
  try {
    await prisma.pelatihan.delete({ where: { id } });
    revalidatePath("/layanan/pelatihan");
    revalidatePath("/admin/pelatihan");
    return { success: true };
  } catch (error) {
    console.error("Delete pelatihan error:", error);
    return { success: false, error: "Gagal menghapus pelatihan" };
  }
}
