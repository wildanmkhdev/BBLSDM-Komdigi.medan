"use client";

import React, { useState } from "react";
import { createGaleriAlbum, updateGaleriAlbum } from "@/features/galeri/actions";
import { uploadFile, getMediaList, SafeMedia } from "@/features/media/actions";
import { KATEGORI_GALERI } from "@/validations/galeri";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface GaleriAlbumFormProps {
  initialImages: SafeMedia[];
  editData?: {
    id: string;
    title: string;
    category: string;
    description: string | null;
    eventDate: Date | null;
    coverPhotoId: string | null;
    isPublished: boolean;
  };
}

export default function GaleriAlbumForm({ initialImages, editData }: GaleriAlbumFormProps) {
  const router = useRouter();
  const isEdit = Boolean(editData);

  const [mediaList, setMediaList] = useState<SafeMedia[]>(initialImages);
  const [selectedCoverId, setSelectedCoverId] = useState(editData?.coverPhotoId || "");

  const [title, setTitle] = useState(editData?.title || "");
  const [category, setCategory] = useState(editData?.category || KATEGORI_GALERI[0]);
  const [description, setDescription] = useState(editData?.description || "");
  const [eventDate, setEventDate] = useState(
    editData?.eventDate
      ? new Date(editData.eventDate).toISOString().split("T")[0]
      : ""
  );
  const [isPublished, setIsPublished] = useState(editData?.isPublished || false);

  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      const images = list.filter((m) => m.mimeType.startsWith("image/"));
      setMediaList(images);
      setSelectedCoverId(res.media.id);
    } else {
      setError(res.error || "Gagal mengunggah gambar");
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const payload = {
      title,
      category,
      description: description || undefined,
      eventDate: eventDate || undefined,
      coverPhotoId: selectedCoverId || null,
      isPublished,
    };

    const res = isEdit && editData
      ? await updateGaleriAlbum(editData.id, payload)
      : await createGaleriAlbum(payload);

    if (res.success) {
      router.push("/admin/galeri");
      router.refresh();
    } else {
      setError("Gagal menyimpan album. Periksa kelengkapan isian.");
    }
    setSubmitting(false);
  };

  const coverPreview = mediaList.find((m) => m.id === selectedCoverId);

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
          Judul Album <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Mis: Kunjungan Kerja Wamenkomdigi ke BBLSDM Medan"
          className="w-full px-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-slate-900 text-slate-900"
        />
      </div>

      {/* Grid: Kategori & Tanggal Kegiatan */}
      <div className="grid grid-cols-2 gap-4">
        {/* Kategori — sesuai filter tabs di halaman publik Galeri */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Kategori <span className="text-red-500">*</span>
            <span className="text-slate-400 font-normal ml-1">— badge di card galeri</span>
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white text-slate-900"
          >
            {KATEGORI_GALERI.map((k) => (
              <option key={k} value={k}>{k}</option>
            ))}
          </select>
        </div>

        {/* Tanggal Kegiatan — ditampilkan di card dan info modal */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Tanggal Kegiatan
            <span className="text-slate-400 font-normal ml-1">— tampil di card</span>
          </label>
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm text-slate-900"
          />
        </div>
      </div>

      {/* Deskripsi Kegiatan — ditampilkan di modal "Deskripsi Kegiatan" */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Deskripsi Kegiatan
          <span className="text-slate-400 font-normal ml-1">— teks di modal galeri</span>
        </label>
        <textarea
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Deskripsi singkat kegiatan yang terdokumentasi..."
          className="w-full px-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-slate-900 resize-none font-sans text-slate-900"
        />
      </div>

      {/* Cover Foto Upload */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-700">
          Foto Cover Album
          <span className="text-slate-400 font-normal ml-1">— thumbnail di card grid</span>
        </label>

        <div className="flex items-center space-x-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
          />
          {uploading && <span className="text-xs text-slate-500 animate-pulse">Mengunggah...</span>}
        </div>

        {mediaList.length > 0 && (
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">
              Pilih dari Pustaka:
            </label>
            <select
              value={selectedCoverId}
              onChange={(e) => setSelectedCoverId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white text-slate-900"
            >
              <option value="">Tanpa Cover</option>
              {mediaList.map((img) => (
                <option key={img.id} value={img.id}>{img.originalName}</option>
              ))}
            </select>
          </div>
        )}

        {coverPreview && (
          <div className="relative w-40 h-24 bg-slate-50 rounded border border-slate-200 overflow-hidden">
            <Image src={coverPreview.publicUrl} alt="Preview cover" fill className="object-cover" />
          </div>
        )}
      </div>

      {/* Status Publish */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isPublished"
          checked={isPublished}
          onChange={(e) => setIsPublished(e.target.checked)}
          className="w-4 h-4 rounded text-slate-900 focus:ring-slate-900 cursor-pointer"
        />
        <label htmlFor="isPublished" className="text-sm font-medium text-slate-700 cursor-pointer">
          Tayangkan album ke halaman Galeri publik
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
        <Link
          href="/admin/galeri"
          className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-md transition"
        >
          Batal
        </Link>
        <button
          type="submit"
          disabled={submitting || uploading}
          className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-white text-sm font-semibold rounded-md shadow-sm transition disabled:opacity-50 cursor-pointer"
        >
          {submitting ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Buat Album"}
        </button>
      </div>
    </form>
  );
}
