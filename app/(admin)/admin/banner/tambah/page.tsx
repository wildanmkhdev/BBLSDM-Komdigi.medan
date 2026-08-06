"use client";

import React, { useState, useEffect } from "react";
import { createBanner } from "@/features/banner/actions";
import Image from "next/image";
import { getMediaList, uploadFile, SafeMedia } from "@/features/media/actions";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddBannerPage() {
  const router = useRouter();
  
  const [mediaList, setMediaList] = useState<SafeMedia[]>([]);
  const [selectedMediaId, setSelectedMediaId] = useState("");
  
  const [accentBadge, setAccentBadge] = useState("PROGRAM UTAMA");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [ctaText, setCtaText] = useState("Baca Selengkapnya");
  const [ctaLink, setCtaLink] = useState("/informasi/berita");

  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    getMediaList().then((list) => {
      if (!active) return;
      const images = list.filter(item => item.mimeType.startsWith("image/"));
      setMediaList(images);
      if (images.length > 0) {
        setSelectedMediaId(images[0].id);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("altText", `Banner ${title}`);

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

    if (!selectedMediaId) {
      setError("Pilih atau unggah gambar banner terlebih dahulu.");
      setSubmitting(false);
      return;
    }

    const res = await createBanner({
      accentBadge,
      title,
      subtitle,
      imageId: selectedMediaId,
      ctaText,
      ctaLink,
    });

    if (res.success) {
      router.push("/admin/banner");
      router.refresh();
    } else {
      setError("Gagal membuat banner. Periksa kembali isian form Anda.");
    }
    setSubmitting(false);
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tambah Banner Baru</h1>
        <p className="text-sm text-slate-500">Unggah gambar banner dan lengkapi detail promosi yang akan ditampilkan.</p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        
        {/* Upload/Select Image */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-700">Gambar Banner *</label>
          
          {/* Quick upload input */}
          <div className="flex items-center space-x-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
            />
            {uploading && <span className="text-xs text-slate-500 animate-pulse">Mengunggah...</span>}
          </div>

          {/* Select from existing */}
          {mediaList.length > 0 ? (
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Pilih dari Pustaka Media:</label>
              <select
                value={selectedMediaId}
                onChange={(e) => setSelectedMediaId(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white"
              >
                {mediaList.map((img) => (
                  <option key={img.id} value={img.id}>
                    {img.originalName}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <p className="text-xs text-slate-400">Belum ada gambar di pustaka media. Silakan pilih file gambar di atas untuk mengunggah.</p>
          )}

          {/* Selected preview */}
          {selectedMediaId && (
            <div className="mt-2 relative w-48 h-28 bg-slate-50 rounded border border-slate-200 overflow-hidden">
              <Image
                src={mediaList.find(img => img.id === selectedMediaId)?.publicUrl || ""}
                alt="Preview"
                fill
                sizes="192px"
                className="object-cover"
              />
            </div>
          )}
        </div>

        {/* Lencana */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Lencana Kategori (Accent Badge) *</label>
          <select
            value={accentBadge}
            onChange={(e) => setAccentBadge(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white"
          >
            <option value="SIARAN PERS">SIARAN PERS</option>
            <option value="KUNJUNGAN KERJA">KUNJUNGAN KERJA</option>
            <option value="PROGRAM UTAMA">PROGRAM UTAMA</option>
            <option value="PENGUMUMAN">PENGUMUMAN</option>
          </select>
        </div>

        {/* Judul */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Judul Banner *</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Masukkan judul banner utama..."
            className="w-full px-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-slate-900"
          />
        </div>

        {/* Subjudul */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Subjudul / Deskripsi Singkat *</label>
          <textarea
            required
            rows={3}
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Masukkan deskripsi singkat tentang banner..."
            className="w-full px-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-slate-900 resize-none"
          />
        </div>

        {/* CTA Text & Link */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Teks Tombol (CTA Text)</label>
            <input
              type="text"
              value={ctaText}
              onChange={(e) => setCtaText(e.target.value)}
              className="w-full px-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Tautan Tombol (CTA Link)</label>
            <input
              type="text"
              value={ctaLink}
              onChange={(e) => setCtaLink(e.target.value)}
              className="w-full px-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
          <Link
            href="/admin/banner"
            className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-md transition"
          >
            Batal
          </Link>
          <button
            type="submit"
            disabled={submitting || uploading}
            className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-white text-sm font-semibold rounded-md shadow-sm transition disabled:opacity-50 cursor-pointer"
          >
            {submitting ? "Menyimpan..." : "Simpan Banner"}
          </button>
        </div>

      </form>
    </div>
  );
}
