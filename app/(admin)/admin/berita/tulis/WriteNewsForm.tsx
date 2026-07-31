"use client";

import React, { useState } from "react";
import { createNewsArticle } from "@/features/berita/actions";
import { uploadFile, getMediaList } from "@/features/media/actions";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
}

interface MediaItem {
  id: string;
  originalName: string;
  publicUrl: string;
}

export default function WriteNewsForm({
  categories,
  initialImages,
}: {
  categories: Category[];
  initialImages: MediaItem[];
}) {
  const router = useRouter();
  
  const [mediaList, setMediaList] = useState<MediaItem[]>(initialImages);
  const [selectedMediaId, setSelectedMediaId] = useState(initialImages[0]?.id || "");

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [kategoriId, setKategoriId] = useState(categories[0]?.id || "");
  const [status, setStatus] = useState<"DRAFT" | "REVIEW" | "PUBLISHED">("DRAFT");
  const [isFeatured, setIsFeatured] = useState(false);

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
      const images = list.filter(item => item.mimeType.startsWith("image/"));
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

    const res = await createNewsArticle({
      title,
      excerpt,
      content,
      kategoriId,
      thumbnailId: selectedMediaId || null,
      status,
      isFeatured,
    });

    if (res.success) {
      router.push("/admin/berita");
      router.refresh();
    } else {
      setError("Gagal menyimpan artikel. Periksa kelayakan isian form.");
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
        <label className="block text-sm font-semibold text-slate-700 mb-2">Judul Artikel *</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ketik judul artikel berita di sini..."
          className="w-full px-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-slate-900 text-slate-900"
        />
      </div>

      {/* Excerpt */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Kutipan Singkat / Ringkasan</label>
        <input
          type="text"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Ringkasan satu kalimat untuk card list berita..."
          className="w-full px-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-slate-900 text-slate-900"
        />
      </div>

      {/* Grid: Kategori & Status */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Kategori Berita *</label>
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
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Status Publikasi</label>
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

      {/* Cover Image Upload / Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-700">Gambar Cover Berita</label>
        
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
            <label className="block text-xs font-semibold text-slate-500 mb-1">Pilih dari Pustaka Media:</label>
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={mediaList.find(img => img.id === selectedMediaId)?.publicUrl || ""}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Content Textarea */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Konten / Isi Berita *</label>
        <textarea
          required
          rows={12}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Tulis artikel berita secara detail di sini..."
          className="w-full px-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-slate-900 resize-none font-sans text-slate-900"
        />
      </div>

      {/* Sorotan Checkbox */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isFeatured"
          checked={isFeatured}
          onChange={(e) => setIsFeatured(e.target.checked)}
          className="w-4 h-4 rounded text-slate-900 focus:ring-slate-900 cursor-pointer"
        />
        <label htmlFor="isFeatured" className="text-sm font-medium text-slate-700 cursor-pointer">
          Jadikan Berita Sorotan Utama (Tampil di Banner Tengah Halaman Beranda)
        </label>
      </div>

      {/* Buttons */}
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
          {submitting ? "Menyimpan..." : "Rilis Berita"}
        </button>
      </div>
    </form>
  );
}
