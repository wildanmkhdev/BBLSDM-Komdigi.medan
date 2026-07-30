"use server";

import prisma from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { revalidatePath } from "next/cache";

export async function uploadFile(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    const altText = (formData.get("altText") as string) || "";
    const caption = (formData.get("caption") as string) || "";

    if (!file || file.size === 0) {
      return { success: false, error: "Pilih file yang valid" };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save locally under public/uploads
    const uploadDir = join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const uniqueName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const filePath = join(uploadDir, uniqueName);
    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${uniqueName}`;
    const storageKey = `local-uploads/${uniqueName}`;
    const mimeType = file.type;
    const fileSize = BigInt(file.size);

    // Create Media record
    const media = await prisma.media.create({
      data: {
        originalName: file.name,
        storageKey,
        publicUrl,
        mimeType,
        fileSize,
        type: mimeType.startsWith("image/") ? "IMAGE" : "DOCUMENT",
        altText,
        caption,
      },
    });

    revalidatePath("/admin/media");

    return { 
      success: true, 
      media: {
        id: media.id,
        publicUrl: media.publicUrl,
        originalName: media.originalName
      }
    };
  } catch (error) {
    console.error("Upload error:", error);
    return { success: false, error: "Gagal mengunggah file ke server" };
  }
}

export async function getMediaList() {
  try {
    const items = await prisma.media.findMany({
      orderBy: { createdAt: "desc" },
    });
    // Safely map BigInt to number for JSON serialization
    return items.map(item => ({
      ...item,
      fileSize: Number(item.fileSize)
    }));
  } catch (error) {
    return [];
  }
}

export async function deleteMedia(id: string) {
  try {
    await prisma.media.delete({ where: { id } });
    revalidatePath("/admin/media");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Gagal menghapus media" };
  }
}
