"use client";

import React, { useState } from "react";
import { createPengumuman, updatePengumuman } from "@/actions/pengumuman";
import { uploadFile, getMediaList, SafeMedia } from "@/actions/media";
import { KATEGORI_PENGUMUMAN } from "@/validations/pengumuman";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface PengumumanFormProps {
  initialDocs: SafeMedia[]; // dokumen PDF yang sudah terupload
  editData?: {
    id: string;
    title: string;
    category: string;
    content: string;
    priority: "HIGH" | "NORMAL";
    attachmentId: string | null;
    isPublished: boolean;
  };
}

export default function PengumumanForm({ initialDocs, editData }: PengumumanFormProps) {
  const router = useRouter();
  const isEdit = Boolean(editData);

  const [docList, setDocList] = useState<SafeMedia[]>(initialDocs);
  const [selectedDocId, setSelectedDocId] = useState(editData?.attachmentId || "");

  const [title, setTitle] = useState(editData?.title || "");
  const [category, setCategory] = useState(editData?.category || KATEGORI_PENGUMUMAN[0]);
  const [content, setContent] = useState(editData?.content || "");
  const [priority, setPriority] = useState<"HIGH" | "NORMAL">(editData?.priority || "NORMAL");
  const [isPublished, setIsPublished] = useState(editData?.isPublished || false);

  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDocUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("altText", `Lampiran ${title}`);

    const res = await uploadFile(formData);
    if (res.success && res.media) {
      const list = await getMediaList();
      // Filter hanya dokumen
      const docs = list.filter(
        (item) => item.mimeType === "application/pdf" || item.type === "DOCUMENT"
      );
      setDocList(docs);
      setSelectedDocId(res.media.id);
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
      category,
      content,
      priority,
      attachmentId: selectedDocId || null,
      isPublished,
    };

    const res = isEdit && editData
      ? await updatePengumuman(editData.id, payload)
      : await createPengumuman(payload);

    if (res.success) {
      router.push("/admin/pengumuman");
      router.refresh();
    } else {
      setError("Gagal menyimpan pengumuman. Periksa kelengkapan isian.");
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
          Judul Pengumuman <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Judul pengumuman resmi..."
          className="w-full px-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-slate-900 text-slate-900"
        />
      </div>

      {/* Grid: Kategori & Prioritas */}
      <div className="grid grid-cols-2 gap-4">
        {/* Kategori — sesuai filter UI halaman Pengumuman */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Kategori <span className="text-red-500">*</span>
            <span className="text-slate-400 font-normal ml-1">— badge di halaman publik</span>
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white text-slate-900"
          >
            {KATEGORI_PENGUMUMAN.map((k) => (
              <option key={k} value={k}>{k}</option>
            ))}
          </select>
        </div>

        {/* Prioritas */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Prioritas
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as "HIGH" | "NORMAL")}
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white text-slate-900"
          >
            <option value="NORMAL">Normal</option>
            <option value="HIGH">Prioritas Tinggi (label merah)</option>
          </select>
        </div>
      </div>

      {/* Isi Pengumuman */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Isi Pengumuman <span className="text-red-500">*</span>
          <span className="text-slate-400 font-normal ml-1">— ditampilkan di card dan modal detail</span>
        </label>
        <textarea
          required
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Tulis isi pengumuman secara lengkap di sini..."
          className="w-full px-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-slate-900 resize-none font-sans text-slate-900"
        />
      </div>

      {/* Upload Lampiran PDF */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-700">
          Lampiran PDF
          <span className="text-slate-400 font-normal ml-1">— tombol "Unduh PDF" di halaman publik</span>
        </label>

        <div className="flex items-center space-x-4">
          <input
            type="file"
            accept="application/pdf,.pdf"
            onChange={handleDocUpload}
            className="text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
          />
          {uploading && <span className="text-xs text-slate-500 animate-pulse">Mengunggah PDF...</span>}
        </div>

        {docList.length > 0 && (
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">
              Pilih dari Pustaka Dokumen:
            </label>
            <select
              value={selectedDocId}
              onChange={(e) => setSelectedDocId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white text-slate-900"
            >
              <option value="">Tanpa Lampiran</option>
              {docList.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.originalName} ({(Number(doc.fileSize) / 1024).toFixed(0)} KB)
                </option>
              ))}
            </select>
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
          Tayangkan ke halaman publik sekarang
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100 font-sans">
        <Link
          href="/admin/pengumuman"
          className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-md transition"
        >
          Batal
        </Link>
        <button
          type="submit"
          disabled={submitting || uploading}
          className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-white text-sm font-semibold rounded-md shadow-sm transition disabled:opacity-50 cursor-pointer"
        >
          {submitting ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Buat Pengumuman"}
        </button>
      </div>
    </form>
  );
}
