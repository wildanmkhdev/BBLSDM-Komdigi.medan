import React from "react";
import WriteNewsForm from "./WriteNewsForm";
import { getNewsCategories } from "@/actions/berita";
import { getMediaList } from "@/actions/media";

export const dynamic = "force-dynamic";

export default async function AdminTulisBeritaPage() {
  const categories = await getNewsCategories();
  const mediaList = await getMediaList();
  
  const images = mediaList.filter(item => item.mimeType.startsWith("image/"));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tulis Berita Baru</h1>
        <p className="text-sm text-slate-500">Publikasikan konten berita, artikel, siaran pers, atau pengumuman ke website utama BBLSDM.</p>
      </div>

      <WriteNewsForm categories={categories} initialImages={images} />
    </div>
  );
}
