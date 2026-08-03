"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { uploadFile, SafeMedia, getMediaList } from "@/features/media/actions";
import { addPhotoToAlbum, removePhotoFromAlbum, type SafeGaleriAlbum } from "@/features/galeri/actions";

interface ManagePhotosFormProps {
  album: SafeGaleriAlbum;
  initialImages: SafeMedia[];
}

export default function ManagePhotosForm({ album, initialImages }: ManagePhotosFormProps) {
  const router = useRouter();
  const [mediaList, setMediaList] = useState<SafeMedia[]>(initialImages);
  const [selectedMediaId, setSelectedMediaId] = useState("");
  const [caption, setCaption] = useState("");
  const [altText, setAltText] = useState("");

  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUploadAndAdd = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("altText", altText || `Foto Album ${album.title}`);
    formData.append("caption", caption);

    const uploadRes = await uploadFile(formData);
    if (uploadRes.success && uploadRes.media) {
      // Refresh media library
      const list = await getMediaList();
      const images = list.filter((m) => m.mimeType.startsWith("image/"));
      setMediaList(images);

      // Add to album directly
      const addRes = await addPhotoToAlbum({
        albumId: album.id,
        mediaId: uploadRes.media.id,
        caption,
        altText,
        orderIndex: 0,
      });

      if (addRes.success) {
        setCaption("");
        setAltText("");
        router.refresh();
      } else {
        setError("Gagal menambahkan foto ke album");
      }
    } else {
      setError(uploadRes.error || "Gagal mengunggah gambar");
    }
    setUploading(false);
  };

  const handleAddExisting = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMediaId) return;

    setSubmitting(true);
    setError(null);

    const res = await addPhotoToAlbum({
      albumId: album.id,
      mediaId: selectedMediaId,
      caption,
      altText,
      orderIndex: 0,
    });

    if (res.success) {
      setCaption("");
      setAltText("");
      setSelectedMediaId("");
      router.refresh();
    } else {
      setError("Gagal menambahkan foto ke album");
    }
    setSubmitting(false);
  };

  const handleRemovePhoto = async (photoId: string) => {
    setDeletingId(photoId);
    setError(null);

    const res = await removePhotoFromAlbum(photoId);
    if (res.success) {
      router.refresh();
    } else {
      setError("Gagal menghapus foto dari album");
    }
    setDeletingId(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Kiri: Form Tambah Foto */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6 self-start">
        <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
          Tambah Foto Baru
        </h2>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
            {error}
          </div>
        )}

        {/* Input Opsional Caption & Alt Text */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Caption Foto (Opsional)
            </label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Deskripsi singkat foto ini..."
              className="w-full px-3 py-1.5 border border-slate-200 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-slate-900 text-slate-900"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Alt Text (Opsional)
            </label>
            <input
              type="text"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              placeholder="Deskripsi gambar untuk aksesibilitas..."
              className="w-full px-3 py-1.5 border border-slate-200 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-slate-900 text-slate-900"
            />
          </div>
        </div>

        {/* Opsi 1: Upload File Baru */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <label className="block text-xs font-bold text-slate-800">
            Cara 1: Unggah File Foto Baru
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="file"
              accept="image/*"
              disabled={uploading || submitting}
              onChange={handleUploadAndAdd}
              className="text-xs text-slate-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer disabled:opacity-50"
            />
          </div>
          {uploading && (
            <p className="text-[10px] text-slate-500 animate-pulse">Mengunggah &amp; menambahkan...</p>
          )}
        </div>

        {/* Opsi 2: Pilih dari Pustaka */}
        <form onSubmit={handleAddExisting} className="space-y-3 pt-4 border-t border-slate-100">
          <label className="block text-xs font-bold text-slate-800">
            Cara 2: Pilih dari Pustaka Media
          </label>
          <select
            value={selectedMediaId}
            onChange={(e) => setSelectedMediaId(e.target.value)}
            disabled={uploading || submitting}
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-xs bg-white text-slate-900 disabled:opacity-50"
          >
            <option value="">-- Pilih Media Gambar --</option>
            {mediaList.map((img) => (
              <option key={img.id} value={img.id}>
                {img.originalName}
              </option>
            ))}
          </select>

          <button
            type="submit"
            disabled={!selectedMediaId || uploading || submitting}
            className="w-full px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-md shadow-sm transition disabled:opacity-50 cursor-pointer"
          >
            {submitting ? "Menambahkan..." : "Tambahkan Foto Pustaka"}
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100">
          <Link
            href="/admin/galeri"
            className="block text-center w-full px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-md transition"
          >
            Kembali ke Daftar Album
          </Link>
        </div>
      </div>

      {/* Kanan: Grid List Foto yang Sudah Ada */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900">
            Daftar Foto di Album
          </h2>
          <span className="text-xs text-slate-500 font-semibold bg-slate-100 px-2 py-0.5 rounded-full">
            {album.photos.length} Foto
          </span>
        </div>

        {album.photos.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-sm">
            Belum ada foto dalam album ini. Silakan unggah atau pilih foto baru di panel kiri.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {album.photos.map((item) => (
              <div
                key={item.id}
                className="group relative bg-slate-50 rounded-lg overflow-hidden border border-slate-200 flex flex-col"
              >
                {/* Photo preview */}
                <div className="relative aspect-video w-full bg-slate-100">
                  <Image
                    src={item.media.publicUrl}
                    alt={item.altText || "Foto album"}
                    fill
                    className="object-cover transition group-hover:scale-105 duration-200"
                  />
                </div>

                {/* Caption / Alt */}
                <div className="p-2 flex-1 flex flex-col justify-between space-y-2">
                  <div className="text-[10px] text-slate-600 line-clamp-2" title={item.caption || ""}>
                    {item.caption || <span className="text-slate-300 italic">Tanpa caption</span>}
                  </div>
                  
                  {/* Action */}
                  <button
                    type="button"
                    disabled={deletingId === item.id}
                    onClick={() => handleRemovePhoto(item.id)}
                    className="text-[10px] font-bold text-red-600 hover:text-red-800 disabled:opacity-50 text-left cursor-pointer"
                  >
                    {deletingId === item.id ? "Menghapus..." : "Hapus Foto"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
