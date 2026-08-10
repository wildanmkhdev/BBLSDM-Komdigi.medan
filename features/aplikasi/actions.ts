"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { aplikasiSchema, type AplikasiFormData } from "@/validations/aplikasi";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { auth } from "@/auth";

async function requireWriteAccess() {
  const session = await auth();
  if (!session || session.user?.status !== "ACTIVE" || session.user?.role === "PEGAWAI") {
    throw new Error("Unauthorized: Anda tidak memiliki hak akses untuk mengubah data.");
  }
}

export type SafeAplikasi = Prisma.AplikasiGetPayload<{
  include: { logo: true };
}>;

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

export async function getAplikasiList(): Promise<SafeAplikasi[]> {
  try {
    return await prisma.aplikasi.findMany({
      orderBy: { createdAt: "desc" },
      include: { logo: true },
    });
  } catch (error) {
    console.error("Fetch aplikasi error:", error);
    return [];
  }
}

export async function getPublishedAplikasi(): Promise<SafeAplikasi[]> {
  try {
    return await prisma.aplikasi.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
      include: { logo: true },
    });
  } catch (error) {
    console.error("Fetch active aplikasi error:", error);
    return [];
  }
}

export async function getAplikasiById(id: string): Promise<SafeAplikasi | null> {
  try {
    return await prisma.aplikasi.findUnique({
      where: { id },
      include: { logo: true },
    });
  } catch (error) {
    console.error("Fetch aplikasi by id error:", error);
    return null;
  }
}

export async function getAplikasiBySlug(slug: string): Promise<SafeAplikasi | null> {
  try {
    return await prisma.aplikasi.findUnique({
      where: { slug },
      include: { logo: true },
    });
  } catch (error) {
    console.error("Fetch aplikasi by slug error:", error);
    return null;
  }
}

// ─── CREATE ─────────────────────────────────────────────────────────────────────

export async function createAplikasi(data: AplikasiFormData) {
  await requireWriteAccess();
  try {
    const validated = aplikasiSchema.parse(data);
    const slug = generateSlug(validated.name);

    const aplikasi = await prisma.aplikasi.create({
      data: {
        name: validated.name,
        slug,
        description: validated.description,
        logoId: validated.logoId ?? null,
        url: validated.url || null,
        isActive: validated.isActive,
      },
    });

    revalidatePath("/fitur");
    revalidatePath("/admin/aplikasi");
    return { success: true, aplikasi };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.flatten().fieldErrors };
    }
    console.error("Create aplikasi error:", error);
    return { success: false, error: "Gagal menyimpan data aplikasi" };
  }
}

// ─── UPDATE ─────────────────────────────────────────────────────────────────────

export async function updateAplikasi(id: string, data: AplikasiFormData) {
  await requireWriteAccess();
  try {
    const validated = aplikasiSchema.parse(data);

    const updated = await prisma.aplikasi.update({
      where: { id },
      data: {
        name: validated.name,
        description: validated.description,
        logoId: validated.logoId ?? null,
        url: validated.url || null,
        isActive: validated.isActive,
      },
    });

    revalidatePath("/fitur");
    revalidatePath(`/fitur/${updated.slug}`);
    revalidatePath("/admin/aplikasi");
    return { success: true, aplikasi: updated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.flatten().fieldErrors };
    }
    console.error("Update aplikasi error:", error);
    return { success: false, error: "Gagal memperbarui data aplikasi" };
  }
}

// ─── TOGGLE STATUS ──────────────────────────────────────────────────────────────

export async function toggleAplikasiStatus(id: string, isActive: boolean) {
  await requireWriteAccess();
  try {
    const updated = await prisma.aplikasi.update({
      where: { id },
      data: { isActive },
    });
    revalidatePath("/fitur");
    revalidatePath(`/fitur/${updated.slug}`);
    revalidatePath("/admin/aplikasi");
    return { success: true };
  } catch (error) {
    console.error("Toggle aplikasi status error:", error);
    return { success: false, error: "Gagal mengubah status aplikasi" };
  }
}

// ─── DELETE ─────────────────────────────────────────────────────────────────────

export async function deleteAplikasi(id: string) {
  await requireWriteAccess();
  try {
    await prisma.aplikasi.delete({ where: { id } });
    revalidatePath("/fitur");
    revalidatePath("/admin/aplikasi");
    return { success: true };
  } catch (error) {
    console.error("Delete aplikasi error:", error);
    return { success: false, error: "Gagal menghapus aplikasi" };
  }
}
