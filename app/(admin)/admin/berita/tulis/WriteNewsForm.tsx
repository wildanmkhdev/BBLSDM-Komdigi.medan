"use client";

import React, { useState } from "react";
import { createNewsArticle, updateNewsArticle } from "@/actions/berita";
import Image from "next/image";
import { uploadFile, getMediaList, SafeMedia } from "@/actions/media";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { KategoriBerita } from "@prisma/client";

interface WriteNewsFormProps {
  categories: KategoriBerita[];
  initialImages: SafeMedia[];
  /** Jika ada, form berjalan dalam mode edit */
  editData?: {
    id: string;
    title: string;
    excerpt: string | null;
    content: string;
    authorName: string | null;
    kategoriId: string | null;
    thumbnailId: string | null;
    status: "DRAFT" | "REVIEW" | "PUBLISHED";
    isFeatured: boolean;
  };
}

export default function WriteNewsForm({ categories, initialImages, editData }: WriteNewsFormProps) {
  const router = useRouter();
  const isEdit = Boolean(editData);

  const [mediaList, setMediaList] = useState<SafeMedia[]>(initialImages);
  const [selectedMediaId, setSelectedMediaId] = useState(
    editData?.thumbnailId || initialImages[0]?.id || ""
  );

  const [title, setTitle] = useState(editData?.title || "");
  const [excerpt, setExcerpt] = useState(editData?.excerpt || "");
  const [content, setContent] = useState(editData?.content || "");
  // Field authorName — ditampilkan langsung di card berita ("Oleh: ...")
  const [authorName, setAuthorName] = useState(editData?.authorName || "");
  const [kategoriId, setKategoriId] = useState(
    editData?.kategoriId || categories[0]?.id || ""
  );
  const [status, setStatus] = useState<"DRAFT" | "REVIEW" | "PUBLISHED">(
    editData?.status || "DRAFT"
  );
  const [isFeatured, setIsFeatured] = useState(editData?.isFeatured || false);

  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("altText", `Cover ${title}`);

    const res = await uploadFile(formData);
    if (res.success && res.media) {
      const list = await getMediaList();
      const images = list.filter((item) => item.mimeType.startsWith("image/"));
      setMediaList(images);
      setSelectedMediaId(res.media.id);
    } else {
      setError(res.error || "Gagal mengunggah file");
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const payload = {
      title,
      excerpt: excerpt || undefined,
      content,
      authorName: authorName || undefined,
      kategoriId,
      thumbnailId: selectedMediaId || null,
      status,
      isFeatured,
    };

    const res = isEdit && editData
      ? await updateNewsArticle(editData.id, payload)
      : await createNewsArticle(payload);

    if (res.success) {
      router.push("/admin/berita");
      router.refresh();
    } else {
      if (typeof res.error === "string") {
        setError(res.error);
      } else if (res.error && typeof res.error === "object") {
        // Handle validation errors from Zod (flatten().fieldErrors structure)
        const validationMsgs = Object.entries(res.error)
          .map(([field, msgs]) => {
            const fieldName = field === "title" ? "Judul" 
                            : field === "excerpt" ? "Kutipan" 
                            : field === "content" ? "Isi Berita" 
                            : field === "authorName" ? "Penulis" 
                            : field === "kategoriId" ? "Kategori" 
                            : field === "thumbnailId" ? "Cover Gambar" 
                            : field;
            return `${fieldName}: ${(msgs as string[]).join(", ")}`;
          })
          .join(" | ");
        setError(`Gagal menyimpan artikel. Validasi gagal: ${validationMsgs}`);
      } else {
        setError("Gagal menyimpan artikel. Periksa kelengkapan isian form.");
      }
    }
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6 max-w-3xl">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
          {error}
        </div>
      )}

      {/* Judul */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Judul Artikel <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ketik judul artikel berita di sini..."
          className="w-full px-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-slate-900 text-slate-900"
        />
      </div>

      {/* Kutipan Singkat (snippet/excerpt) */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">
          Kutipan Singkat
          <span className="text-slate-400 font-normal ml-1">— ditampilkan di card berita</span>
        </label>
        <input
          type="text"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Ringkasan satu kalimat untuk preview card berita..."
          className="w-full px-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-slate-900 text-slate-900"
        />
      </div>

      {/* Grid: Penulis, Kategori, Status */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Nama Penulis — ditampilkan "Oleh: [nama]" di card */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Nama Penulis
            <span className="text-slate-400 font-normal ml-1">— "Oleh: ..."</span>
          </label>
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Mis: Tim Humas BBLSDM"
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-slate-900 text-slate-900"
          />
        </div>

        {/* Kategori */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Kategori Berita <span className="text-red-500">*</span>
          </label>
          <select
            value={kategoriId}
            onChange={(e) => setKategoriId(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white text-slate-900"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Status Publikasi
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as "DRAFT" | "REVIEW" | "PUBLISHED")}
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white text-slate-900"
          >
            <option value="DRAFT">Draft (Arsip Internal)</option>
            <option value="REVIEW">Review (Siap Diperiksa)</option>
            <option value="PUBLISHED">Tayang (Rilis Publik)</option>
          </select>
        </div>
      </div>

      {/* Cover Image Upload */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-700">
          Gambar Cover Berita
          <span className="text-slate-400 font-normal ml-1">— tampil di card dan modal</span>
        </label>

        <div className="flex items-center space-x-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
          />
          {uploading && <span className="text-xs text-slate-500 animate-pulse">Mengunggah...</span>}
        </div>

        {mediaList.length > 0 && (
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">
              Pilih dari Pustaka Media:
            </label>
            <select
              value={selectedMediaId}
              onChange={(e) => setSelectedMediaId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white text-slate-900"
            >
              <option value="">Tanpa Cover Gambar</option>
              {mediaList.map((img) => (
                <option key={img.id} value={img.id}>
                  {img.originalName}
                </option>
              ))}
            </select>
          </div>
        )}

        {selectedMediaId && (
          <div className="mt-2 relative w-36 h-20 bg-slate-50 rounded border border-slate-200 overflow-hidden">
            <Image
              src={mediaList.find((img) => img.id === selectedMediaId)?.publicUrl || ""}
              alt="Preview"
              fill
              sizes="144px"
              className="object-cover"
            />
          </div>
        )}
      </div>

      {/* Konten Artikel */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Konten / Isi Berita <span className="text-red-500">*</span>
          <span className="text-slate-400 font-normal ml-1">— ditampilkan di modal detail</span>
        </label>
        <textarea
          required
          rows={14}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Tulis artikel berita secara detail di sini..."
          className="w-full px-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-slate-900 resize-none font-sans text-slate-900"
        />
      </div>

      {/* Sorotan Berita */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isFeatured"
          checked={isFeatured}
          onChange={(e) => setIsFeatured(e.target.checked)}
          className="w-4 h-4 rounded text-slate-900 focus:ring-slate-900 cursor-pointer"
        />
        <label htmlFor="isFeatured" className="text-sm font-medium text-slate-700 cursor-pointer">
          Jadikan Berita Sorotan Utama
          <span className="text-slate-400 font-normal ml-1">(tampil di hero banner beranda)</span>
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100 font-sans">
        <Link
          href="/admin/berita"
          className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-md transition"
        >
          Batal
        </Link>
        <button
          type="submit"
          disabled={submitting || uploading}
          className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-white text-sm font-semibold rounded-md shadow-sm transition disabled:opacity-50 cursor-pointer"
        >
          {submitting ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Rilis Berita"}
        </button>
      </div>
    </form>
  );
}
