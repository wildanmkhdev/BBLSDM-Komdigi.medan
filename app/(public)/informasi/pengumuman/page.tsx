import React from "react";
import prisma from "@/lib/prisma";
import PengumumanList, { type PengumumanItem } from "./PengumumanList";

import { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function PengumumanPage() {
  let dbPengumuman: Prisma.PengumumanGetPayload<{ include: { attachment: true } }>[] = [];
  try {
    dbPengumuman = await prisma.pengumuman.findMany({
      where: { isPublished: true },
      orderBy: [
        { priority: "asc" }, // HIGH first
        { createdAt: "desc" },
      ],
      include: { attachment: true },
    });
  } catch (error) {
    console.error("Error fetching announcements:", error);
  }

  const pengumumanData: PengumumanItem[] = dbPengumuman.map((item) => {
    const sizeKB = item.attachment
      ? (Number(item.attachment.fileSize) / 1024).toFixed(0)
      : null;

    return {
      id: item.id,
      title: item.title,
      category: item.category,
      date: new Date(item.createdAt).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      fileSize: sizeKB ? `${sizeKB} KB` : "1.0 MB",
      fileFormat: "PDF",
      downloadUrl: item.attachment?.publicUrl || undefined,
      priority: item.priority === "HIGH" ? "high" : "normal",
      content: item.content,
    };
  });

  return <PengumumanList initialPengumuman={pengumumanData} />;
}
