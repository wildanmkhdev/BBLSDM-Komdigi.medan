"use client";

import React, { useState } from "react";
import { createAplikasi, updateAplikasi } from "@/features/aplikasi/actions";
import { uploadFile, getMediaList, SafeMedia } from "@/features/media/actions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface AplikasiFormProps {
  initialImages: SafeMedia[];
  editData?: {
    id: string;
    name: string;
    description: string;
    logoId: string | null;
    url: string | null;
    isActive: boolean;
  };
}

export default function AplikasiForm({ initialImages, editData }: AplikasiFormProps) {
  const router = useRouter();
  const isEdit = Boolean(editData);

  const [mediaList, setMediaList] = useState<SafeMedia[]>(initialImages);
  const [selectedLogoId, setSelectedLogoId] = useState(editData?.logoId || "");

  const [name, setName] = useState(editData?.name || "");
  const [description, setDescription] = useState(editData?.description || "");
  const [url, setUrl] = useState(editData?.url || "");
  const [isActive, setIsActive] = useState(editData?.isActive ?? true);

  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("altText", `Logo ${name}`);

    const res = await uploadFile(formData);
    if (res.success && res.media) {
      const list = await getMediaList();
      const images = list.filter((m) => m.mimeType.startsWith("image/"));
      setMediaList(images);
      setSelectedLogoId(res.media.id);
    } else {
      setError(res.error || "Gagal mengunggah gambar logo");
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const payload = {
      name,
      description,
      logoId: selectedLogoId || null,
      url: url || undefined,
      isActive,
    };

    const res = isEdit && editData
      ? await updateAplikasi(editData.id, payload)
      : await createAplikasi(payload);

    if (res.success) {
      router.push("/admin/aplikasi");
      router.refresh();
    } else {
      setError("Gagal menyimpan aplikasi. Periksa kelengkapan isian.");
    }
    setSubmitting(false);
  };

  const logoPreview = mediaList.find((m) => m.id === selectedLogoId);

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6 max-w-3xl">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
          {error}
        </div>
      )}

      {/* Nama Aplikasi */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Nama Aplikasi <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Mis: Aplikasi Sistem Manajemen Gudang"
          className="w-full px-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-slate-900 text-slate-900"
        />
      </div>

      {/* Link/URL Aplikasi */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Link / URL Aplikasi (Opsional)
        </label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Mis: https://gudang.bblsdm.go.id"
          className="w-full px-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-slate-900 text-slate-900"
        />
      </div>

      {/* Deskripsi Singkat */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Deskripsi Singkat Aplikasi <span className="text-red-500">*</span>
        </label>
        <textarea
          required
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Tulis deskripsi singkat aplikasi..."
          className="w-full px-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-slate-900 resize-none font-sans text-slate-900"
        />
      </div>

      {/* Upload Logo */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-700">
          Logo Aplikasi
          <span className="text-slate-400 font-normal ml-1">— icon yang tampil di card katalog</span>
        </label>

        <div className="flex items-center space-x-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
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
              value={selectedLogoId}
              onChange={(e) => setSelectedLogoId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white text-slate-900"
            >
              <option value="">Tanpa Logo</option>
              {mediaList.map((img) => (
                <option key={img.id} value={img.id}>{img.originalName}</option>
              ))}
            </select>
          </div>
        )}

        {logoPreview && (
          <div className="relative w-20 h-20 bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
            <Image src={logoPreview.publicUrl} alt="Preview logo" fill className="object-cover" />
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
        <Link
          href="/admin/aplikasi"
          className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-md transition"
        >
          Batal
        </Link>
        <button
          type="submit"
          disabled={submitting || uploading}
          className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-white text-sm font-semibold rounded-md shadow-sm transition disabled:opacity-50 cursor-pointer"
        >
          {submitting ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Tambah Aplikasi"}
        </button>
      </div>
    </form>
  );
}
