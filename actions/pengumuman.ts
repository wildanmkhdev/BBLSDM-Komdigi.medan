"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { pengumumanSchema, type PengumumanFormData } from "@/validations/pengumuman";
import { Prisma } from "@prisma/client";
import { z } from "zod";

// ─── Type helper ───────────────────────────────────────────────────────────────
export type SafePengumuman = Prisma.PengumumanGetPayload<{
  include: { attachment: true };
}>;

// ─── READ ───────────────────────────────────────────────────────────────────────

/// Untuk admin — tampilkan semua pengumuman
export async function getPengumumanList(): Promise<SafePengumuman[]> {
  try {
    return await prisma.pengumuman.findMany({
      orderBy: { createdAt: "desc" },
      include: { attachment: true },
    });
  } catch (error) {
    console.error("Fetch pengumuman error:", error);
    return [];
  }
}

/// Untuk halaman publik — hanya yang dipublish
export async function getPublishedPengumuman(): Promise<SafePengumuman[]> {
  try {
    return await prisma.pengumuman.findMany({
      where: { isPublished: true },
      orderBy: [
        { priority: "asc" }, // HIGH dulu (alphabetically H < N)
        { createdAt: "desc" },
      ],
      include: { attachment: true },
    });
  } catch (error) {
    console.error("Fetch published pengumuman error:", error);
    return [];
  }
}

export async function getPengumumanById(id: string): Promise<SafePengumuman | null> {
  try {
    return await prisma.pengumuman.findUnique({
      where: { id },
      include: { attachment: true },
    });
  } catch (error) {
    console.error("Fetch pengumuman by id error:", error);
    return null;
  }
}

// ─── CREATE ─────────────────────────────────────────────────────────────────────

export async function createPengumuman(data: PengumumanFormData) {
  try {
    const validated = pengumumanSchema.parse(data);

    const pengumuman = await prisma.pengumuman.create({
      data: {
        title: validated.title,
        category: validated.category,
        content: validated.content,
        priority: validated.priority,
        attachmentId: validated.attachmentId ?? null,
        isPublished: validated.isPublished,
      },
    });

    revalidatePath("/informasi/pengumuman");
    revalidatePath("/admin/pengumuman");
    return { success: true, pengumuman };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.flatten().fieldErrors };
    }
    console.error("Create pengumuman error:", error);
    return { success: false, error: "Gagal menyimpan pengumuman" };
  }
}

// ─── UPDATE ─────────────────────────────────────────────────────────────────────

export async function updatePengumuman(id: string, data: PengumumanFormData) {
  try {
    const validated = pengumumanSchema.parse(data);

    const updated = await prisma.pengumuman.update({
      where: { id },
      data: {
        title: validated.title,
        category: validated.category,
        content: validated.content,
        priority: validated.priority,
        attachmentId: validated.attachmentId ?? null,
        isPublished: validated.isPublished,
      },
    });

    revalidatePath("/informasi/pengumuman");
    revalidatePath("/admin/pengumuman");
    return { success: true, pengumuman: updated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.flatten().fieldErrors };
    }
    console.error("Update pengumuman error:", error);
    return { success: false, error: "Gagal memperbarui pengumuman" };
  }
}

// ─── TOGGLE PUBLISH ─────────────────────────────────────────────────────────────

export async function togglePengumumanPublish(id: string, isPublished: boolean) {
  try {
    await prisma.pengumuman.update({
      where: { id },
      data: { isPublished },
    });
    revalidatePath("/informasi/pengumuman");
    revalidatePath("/admin/pengumuman");
    return { success: true };
  } catch (error) {
    console.error("Toggle pengumuman publish error:", error);
    return { success: false, error: "Gagal mengubah status pengumuman" };
  }
}

// ─── DELETE ─────────────────────────────────────────────────────────────────────

export async function deletePengumuman(id: string) {
  try {
    await prisma.pengumuman.delete({ where: { id } });
    revalidatePath("/informasi/pengumuman");
    revalidatePath("/admin/pengumuman");
    return { success: true };
  } catch (error) {
    console.error("Delete pengumuman error:", error);
    return { success: false, error: "Gagal menghapus pengumuman" };
  }
}
