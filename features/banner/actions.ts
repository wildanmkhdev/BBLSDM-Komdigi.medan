"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const bannerSchema = z.object({
  accentBadge: z.string().min(2, "Lencana wajib diisi (min 2 karakter)").max(100),
  title: z.string().min(5, "Judul wajib diisi (min 5 karakter)").max(255),
  subtitle: z.string().min(5, "Subjudul wajib diisi (min 5 karakter)"),
  imageId: z.string().uuid("Pilih gambar dari perpustakaan media"),
  ctaText: z.string().max(100).default("Baca Selengkapnya"),
  ctaLink: z.string().default("/informasi/berita"),
});

export async function getBanners() {
  try {
    return await prisma.banner.findMany({
      orderBy: { orderIndex: "asc" },
      include: { image: true },
    });
  } catch (error) {
    console.error("Failed to fetch banners:", error);
    return [];
  }
}

export async function createBanner(formData: z.infer<typeof bannerSchema>) {
  try {
    const validated = bannerSchema.parse(formData);
    
    // Find current max order index
    const maxOrder = await prisma.banner.aggregate({
      _max: { orderIndex: true }
    });
    
    const nextOrder = (maxOrder._max.orderIndex ?? -1) + 1;

    const banner = await prisma.banner.create({
      data: {
        ...validated,
        orderIndex: nextOrder,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/banner");
    
    return { success: true, banner };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.flatten().fieldErrors };
    }
    return { success: false, error: "Terjadi kesalahan server" };
  }
}

export async function toggleBannerStatus(id: string, isActive: boolean) {
  try {
    await prisma.banner.update({
      where: { id },
      data: { isActive },
    });
    revalidatePath("/");
    revalidatePath("/admin/banner");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Gagal memperbarui status banner" };
  }
}

export async function deleteBanner(id: string) {
  try {
    await prisma.banner.delete({
      where: { id },
    });
    revalidatePath("/");
    revalidatePath("/admin/banner");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Gagal menghapus banner" };
  }
}
