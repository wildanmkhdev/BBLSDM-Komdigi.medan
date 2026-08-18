import React from "react";
import prisma from "@/lib/prisma";
import GaleriList, { type GaleriItem } from "./GaleriList";

import { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function GaleriPage() {
  type GaleriAlbumWithRelations = Prisma.GaleriAlbumGetPayload<{
    include: {
      coverPhoto: true;
      photos: { include: { media: true } };
    };
  }>;
  let dbAlbums: GaleriAlbumWithRelations[] = [];
  try {
    dbAlbums = await prisma.galeriAlbum.findMany({
      where: { isPublished: true },
      orderBy: { eventDate: "desc" },
      include: {
        coverPhoto: true,
        photos: {
          include: { media: true },
          orderBy: { orderIndex: "asc" },
        },
      },
    });
  } catch (error) {
    console.error("Error fetching gallery albums:", error);
  }

  const galeriData: GaleriItem[] = dbAlbums.map((item) => {
    // Array of image URLs for slideshow
    const slideImages = item.photos.map((p: { media: { publicUrl: string } }) => p.media.publicUrl);
    // Ensure at least one image exists (cover or the first photo)
    const mainCover = item.coverPhoto?.publicUrl || slideImages[0] || "/logo%20komdigi.png";

    return {
      id: item.id,
      title: item.title,
      category: item.category,
      date: item.eventDate
        ? new Date(item.eventDate).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        : "Baru saja",
      image: mainCover,
      images: slideImages.length > 0 ? slideImages : [mainCover],
      desc: item.description || "",
    };
  });

  return <GaleriList initialGaleri={galeriData} />;
}
