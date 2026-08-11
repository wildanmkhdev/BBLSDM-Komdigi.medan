"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { socialMediaPostSchema, type SocialMediaPostFormData } from "@/validations/sosialMedia";
import { Prisma } from "@prisma/client";
import { z } from "zod";

export type SafeSocialMediaPost = Prisma.SocialMediaPostGetPayload<Record<string, never>>;

// ─── READ ───────────────────────────────────────────────────────────────────────

export async function getSocialMediaPosts(): Promise<SafeSocialMediaPost[]> {
  try {
    return await prisma.socialMediaPost.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Fetch social media posts error:", error);
    return [];
  }
}

export async function getPublishedSocialMediaPosts(): Promise<SafeSocialMediaPost[]> {
  try {
    return await prisma.socialMediaPost.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Fetch published social media posts error:", error);
    return [];
  }
}

export async function getSocialMediaPostById(id: string): Promise<SafeSocialMediaPost | null> {
  try {
    return await prisma.socialMediaPost.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error("Fetch social media post by id error:", error);
    return null;
  }
}

// ─── CREATE ─────────────────────────────────────────────────────────────────────

export async function createSocialMediaPost(data: SocialMediaPostFormData) {
  try {
    const validated = socialMediaPostSchema.parse(data);

    const post = await prisma.socialMediaPost.create({
      data: {
        platform: validated.platform,
        url: validated.url,
        title: validated.title || null,
        caption: validated.caption || null,
        isActive: validated.isActive,
      },
    });

    revalidatePath("/informasi/media-sosial");
    revalidatePath("/admin/media-sosial");
    return { success: true, post };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.flatten().fieldErrors };
    }
    console.error("Create social media post error:", error);
    return { success: false, error: "Gagal menyimpan postingan" };
  }
}

// ─── UPDATE ─────────────────────────────────────────────────────────────────────

export async function updateSocialMediaPost(id: string, data: SocialMediaPostFormData) {
  try {
    const validated = socialMediaPostSchema.parse(data);

    const updated = await prisma.socialMediaPost.update({
      where: { id },
      data: {
        platform: validated.platform,
        url: validated.url,
        title: validated.title || null,
        caption: validated.caption || null,
        isActive: validated.isActive,
      },
    });

    revalidatePath("/informasi/media-sosial");
    revalidatePath("/admin/media-sosial");
    return { success: true, post: updated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.flatten().fieldErrors };
    }
    console.error("Update social media post error:", error);
    return { success: false, error: "Gagal memperbarui postingan" };
  }
}

// ─── TOGGLE STATUS ──────────────────────────────────────────────────────────────

export async function toggleSocialMediaPostStatus(id: string, isActive: boolean) {
  try {
    await prisma.socialMediaPost.update({
      where: { id },
      data: { isActive },
    });
    revalidatePath("/informasi/media-sosial");
    revalidatePath("/admin/media-sosial");
    return { success: true };
  } catch (error) {
    console.error("Toggle status error:", error);
    return { success: false, error: "Gagal mengubah status postingan" };
  }
}

// ─── DELETE ─────────────────────────────────────────────────────────────────────

export async function deleteSocialMediaPost(id: string) {
  try {
    await prisma.socialMediaPost.delete({
      where: { id },
    });
    revalidatePath("/informasi/media-sosial");
    revalidatePath("/admin/media-sosial");
    return { success: true };
  } catch (error) {
    console.error("Delete social media post error:", error);
    return { success: false, error: "Gagal menghapus postingan" };
  }
}
