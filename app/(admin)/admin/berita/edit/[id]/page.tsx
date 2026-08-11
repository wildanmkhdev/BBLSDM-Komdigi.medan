import React from "react";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import WriteNewsForm from "../../tulis/WriteNewsForm";
import { getNewsCategories } from "@/actions/berita";
import { getMediaList } from "@/actions/media";

export const dynamic = "force-dynamic";

export default async function AdminEditBeritaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  const [article, categories, mediaList] = await Promise.all([
    prisma.berita.findUnique({
      where: { id },
    }),
    getNewsCategories(),
    getMediaList(),
  ]);

  if (!article) notFound();

  const images = mediaList.filter((item) => item.mimeType.startsWith("image/"));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit Artikel Berita</h1>
        <p className="text-sm text-slate-500">Perbarui konten rilis berita resmi BBLSDM.</p>
      </div>

      <WriteNewsForm
        categories={categories}
        initialImages={images}
        editData={{
          id: article.id,
          title: article.title,
          excerpt: article.excerpt,
          content: article.content,
          authorName: article.authorName,
          kategoriId: article.kategoriId,
          thumbnailId: article.thumbnailId,
          status: article.status as "DRAFT" | "REVIEW" | "PUBLISHED",
          isFeatured: article.isFeatured,
        }}
      />
    </div>
  );
}
