"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {
  galeriAlbumSchema,
  galeriPhotoSchema,
  type GaleriAlbumFormData,
  type GaleriPhotoFormData,
} from "@/validations/galeri";
import { Prisma } from "@prisma/client";
import { z } from "zod";

// ─── Type helpers ──────────────────────────────────────────────────────────────
export type SafeGaleriAlbum = Prisma.GaleriAlbumGetPayload<{
  include: {
    coverPhoto: true;
    photos: { include: { media: true }; orderBy: { orderIndex: "asc" } };
  };
}>;

// ─── READ ───────────────────────────────────────────────────────────────────────

/// Untuk admin — tampilkan semua album
export async function getGaleriAlbums(): Promise<SafeGaleriAlbum[]> {
  try {
    return await prisma.galeriAlbum.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        coverPhoto: true,
        photos: { include: { media: true }, orderBy: { orderIndex: "asc" } },
      },
    });
  } catch (error) {
    console.error("Fetch galeri albums error:", error);
    return [];
  }
}

/// Untuk halaman publik — hanya album yang dipublish
/// Mengembalikan data sesuai struktur GaleriItem di UI:
/// { id, title, category, date, image(cover), images[](array url), desc }
export async function getPublishedGaleriAlbums(): Promise<SafeGaleriAlbum[]> {
  try {
    return await prisma.galeriAlbum.findMany({
      where: { isPublished: true },
      orderBy: { eventDate: "desc" },
      include: {
        coverPhoto: true,
        photos: { include: { media: true }, orderBy: { orderIndex: "asc" } },
      },
    });
  } catch (error) {
    console.error("Fetch published galeri error:", error);
    return [];
  }
}

export async function getGaleriAlbumById(id: string): Promise<SafeGaleriAlbum | null> {
  try {
    return await prisma.galeriAlbum.findUnique({
      where: { id },
      include: {
        coverPhoto: true,
        photos: { include: { media: true }, orderBy: { orderIndex: "asc" } },
      },
    });
  } catch (error) {
    console.error("Fetch galeri album by id error:", error);
    return null;
  }
}

// ─── CREATE ALBUM ───────────────────────────────────────────────────────────────

export async function createGaleriAlbum(data: GaleriAlbumFormData) {
  try {
    const validated = galeriAlbumSchema.parse(data);

    const album = await prisma.galeriAlbum.create({
      data: {
        title: validated.title,
        category: validated.category,
        description: validated.description || null,
        eventDate: validated.eventDate ? new Date(validated.eventDate) : null,
        coverPhotoId: validated.coverPhotoId ?? null,
        isPublished: validated.isPublished,
      },
    });

    revalidatePath("/informasi/galeri");
    revalidatePath("/admin/galeri");
    return { success: true, album };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.flatten().fieldErrors };
    }
    console.error("Create galeri album error:", error);
    return { success: false, error: "Gagal menyimpan album galeri" };
  }
}

// ─── UPDATE ALBUM ───────────────────────────────────────────────────────────────

export async function updateGaleriAlbum(id: string, data: GaleriAlbumFormData) {
  try {
    const validated = galeriAlbumSchema.parse(data);

    const updated = await prisma.galeriAlbum.update({
      where: { id },
      data: {
        title: validated.title,
        category: validated.category,
        description: validated.description || null,
        eventDate: validated.eventDate ? new Date(validated.eventDate) : null,
        coverPhotoId: validated.coverPhotoId ?? null,
        isPublished: validated.isPublished,
      },
    });

    revalidatePath("/informasi/galeri");
    revalidatePath("/admin/galeri");
    return { success: true, album: updated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.flatten().fieldErrors };
    }
    console.error("Update galeri album error:", error);
    return { success: false, error: "Gagal memperbarui album" };
  }
}

// ─── ADD PHOTO TO ALBUM ─────────────────────────────────────────────────────────

export async function addPhotoToAlbum(data: GaleriPhotoFormData) {
  try {
    const validated = galeriPhotoSchema.parse(data);

    // Ambil orderIndex terakhir di album ini
    const lastPhoto = await prisma.galeriPhoto.findFirst({
      where: { albumId: validated.albumId },
      orderBy: { orderIndex: "desc" },
    });
    const nextIndex = (lastPhoto?.orderIndex ?? -1) + 1;

    const photo = await prisma.galeriPhoto.create({
      data: {
        albumId: validated.albumId,
        mediaId: validated.mediaId,
        caption: validated.caption || null,
        altText: validated.altText || null,
        orderIndex: nextIndex,
      },
    });

    revalidatePath("/informasi/galeri");
    revalidatePath("/admin/galeri");
    return { success: true, photo };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.flatten().fieldErrors };
    }
    console.error("Add photo to album error:", error);
    return { success: false, error: "Gagal menambahkan foto" };
  }
}

// ─── REMOVE PHOTO FROM ALBUM ────────────────────────────────────────────────────

export async function removePhotoFromAlbum(photoId: string) {
  try {
    await prisma.galeriPhoto.delete({ where: { id: photoId } });
    revalidatePath("/informasi/galeri");
    revalidatePath("/admin/galeri");
    return { success: true };
  } catch (error) {
    console.error("Remove photo from album error:", error);
    return { success: false, error: "Gagal menghapus foto" };
  }
}

// ─── TOGGLE PUBLISH ─────────────────────────────────────────────────────────────

export async function toggleGaleriPublish(id: string, isPublished: boolean) {
  try {
    await prisma.galeriAlbum.update({
      where: { id },
      data: { isPublished },
    });
    revalidatePath("/informasi/galeri");
    revalidatePath("/admin/galeri");
    return { success: true };
  } catch (error) {
    console.error("Toggle galeri publish error:", error);
    return { success: false, error: "Gagal mengubah status album" };
  }
}

// ─── DELETE ALBUM ───────────────────────────────────────────────────────────────

export async function deleteGaleriAlbum(id: string) {
  try {
    // GaleriPhoto dihapus cascade dari DB
    await prisma.galeriAlbum.delete({ where: { id } });
    revalidatePath("/informasi/galeri");
    revalidatePath("/admin/galeri");
    return { success: true };
  } catch (error) {
    console.error("Delete galeri album error:", error);
    return { success: false, error: "Gagal menghapus album" };
  }
}
