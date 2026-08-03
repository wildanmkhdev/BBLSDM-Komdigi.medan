"use server";

import prisma from "@/lib/prisma";
import { supabaseAdmin, getBucketForMimeType } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

/**
 * Upload file ke Supabase Storage bucket yang sesuai:
 * - Gambar  → bucket "images"
 * - Dokumen → bucket "documents"
 *
 * URL publik dikembalikan langsung dari Supabase CDN, tidak disimpan
 * secara lokal di folder project.
 */
export async function uploadFile(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    const altText = (formData.get("altText") as string) || "";
    const caption = (formData.get("caption") as string) || "";

    if (!file || file.size === 0) {
      return { success: false, error: "Pilih file yang valid" };
    }

    const mimeType = file.type;
    const fileSize = BigInt(file.size);
    const bucket = getBucketForMimeType(mimeType);

    // Buat nama file unik agar tidak bentrok
    const uniqueName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

    // Konversi File ke ArrayBuffer lalu ke Uint8Array untuk Supabase upload
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = new Uint8Array(arrayBuffer);

    // Upload ke Supabase Storage (pakai service role agar bypass RLS)
    const { error: uploadError } = await supabaseAdmin.storage
      .from(bucket)
      .upload(uniqueName, fileBuffer, {
        contentType: mimeType,
        upsert: false,
      });

    if (uploadError) {
      console.error("Supabase upload error:", uploadError);
      return { success: false, error: `Gagal mengunggah file: ${uploadError.message}` };
    }

    // Ambil public URL dari Supabase CDN
    const { data: urlData } = supabaseAdmin.storage.from(bucket).getPublicUrl(uniqueName);
    const publicUrl = urlData.publicUrl;
    const storageKey = `${bucket}/${uniqueName}`;

    // Simpan record di database
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
        originalName: media.originalName,
      },
    };
  } catch (error) {
    console.error("Upload error:", error);
    return { success: false, error: "Gagal mengunggah file ke Supabase Storage" };
  }
}

import { Media } from "@prisma/client";

export type SafeMedia = Omit<Media, "fileSize"> & { fileSize: number };

export async function getMediaList(): Promise<SafeMedia[]> {
  try {
    const items = await prisma.media.findMany({
      orderBy: { createdAt: "desc" },
    });
    // Safely map BigInt to number for JSON serialization
    return items.map((item) => ({
      ...item,
      fileSize: Number(item.fileSize),
    }));
  } catch (error) {
    console.error("Error getting media list:", error);
    return [];
  }
}

/**
 * Hapus media dari database DAN dari Supabase Storage bucket.
 * storageKey format: "images/filename.jpg" atau "documents/filename.pdf"
 */
export async function deleteMedia(id: string) {
  try {
    // Ambil data media dulu untuk tahu storageKey-nya
    const media = await prisma.media.findUnique({ where: { id } });

    if (media) {
      // Parse bucket name dan file path dari storageKey
      // storageKey format: "images/filename.jpg" atau "documents/filename.pdf"
      // Format lama (local): "local-uploads/filename.jpg" — skip storage delete
      const parts = media.storageKey.split("/");
      const bucket = parts[0];
      const filePath = parts.slice(1).join("/");

      if (bucket !== "local-uploads" && filePath) {
        const { error: storageError } = await supabaseAdmin.storage
          .from(bucket)
          .remove([filePath]);

        if (storageError) {
          // Log tapi tetap lanjut hapus dari DB
          console.warn("Supabase storage delete warning:", storageError.message);
        }
      }
    }

    await prisma.media.delete({ where: { id } });
    revalidatePath("/admin/media");
    return { success: true };
  } catch (error) {
    console.error("Error deleting media:", error);
    return { success: false, error: "Gagal menghapus media" };
  }
}
