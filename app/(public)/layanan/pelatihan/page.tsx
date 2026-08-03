import React from "react";
import prisma from "@/lib/prisma";
import PelatihanList, { type PelatihanItem } from "./PelatihanList";

import { Pelatihan } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function PelatihanPage() {
  let dbPelatihan: Pelatihan[] = [];
  try {
    dbPelatihan = await prisma.pelatihan.findMany({
      orderBy: [{ status: "asc" }, { createdAt: "desc" }],
    });
  } catch (error) {
    console.error("Error fetching pelatihan:", error);
  }

  const list: PelatihanItem[] = dbPelatihan.map((p) => {
    // Map status enum DB ke label UI
    const statusMap = {
      OPEN: "Dibuka",
      FULL: "Penuh",
      SEGERA_DIBUKA: "Segera Dibuka",
    } as const;

    // Map level enum DB ke label UI
    const levelMap = {
      DASAR: "Dasar",
      MENENGAH: "Menengah",
      LANJUTAN: "Lanjutan",
    } as const;

    return {
      id: p.id,
      title: p.title,
      category: p.categorySlug as "komunikasi" | "pemasaran" | "cyber" | "data" | "cloud",
      categoryLabel: p.categoryLabel,
      description: p.description,
      jadwal: p.jadwal,
      durasi: p.durasi,
      kuota: p.kuota,
      terisi: p.terisi,
      status: statusMap[p.status as keyof typeof statusMap] || "Segera Dibuka",
      level: levelMap[p.level as keyof typeof levelMap] || "Dasar",
      metode: p.metode,
      lokasi: p.lokasi,
      silabus: Array.isArray(p.silabus) ? (p.silabus as string[]) : [],
      persyaratan: Array.isArray(p.persyaratan) ? (p.persyaratan as string[]) : [],
    };
  });

  return <PelatihanList initialPelatihan={list} />;
}
}
