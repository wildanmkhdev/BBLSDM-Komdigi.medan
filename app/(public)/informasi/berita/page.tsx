import React from "react";
import prisma from "@/lib/prisma";
import BeritaList, { type BeritaItem } from "./BeritaList";

import { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function BeritaPage() {
  let dbBerita: Prisma.BeritaGetPayload<{ include: { kategori: true; thumbnail: true } }>[] = [];
  try {
    dbBerita = await prisma.berita.findMany({
      where: { status: "PUBLISHED" },
      include: { kategori: true, thumbnail: true },
      orderBy: { publishedAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching news:", error);
  }

  const beritaData: BeritaItem[] = dbBerita.map((item) => ({
    id: item.id,
    title: item.title,
    category: item.kategori?.name || "Berita",
    date: item.publishedAt
      ? new Date(item.publishedAt).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "Baru saja",
    image: item.thumbnail?.publicUrl || "/logo komdigi.png",
    snippet: item.excerpt || "",
    content: item.content,
    author: item.authorName || "Humas BBLSDM",
  }));

  return <BeritaList initialBerita={beritaData} />;
}
