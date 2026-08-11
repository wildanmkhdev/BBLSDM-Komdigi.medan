"use client";

import React, { useState } from "react";
import { createSocialMediaPost, updateSocialMediaPost } from "@/actions/sosialMedia";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface SosialMediaFormProps {
  editData?: {
    id: string;
    platform: "INSTAGRAM" | "TIKTOK" | "YOUTUBE";
    url: string;
    title: string | null;
    caption: string | null;
    isActive: boolean;
  };
}

export default function SosialMediaForm({ editData }: SosialMediaFormProps) {
  const router = useRouter();
  const isEdit = Boolean(editData);

  const [platform, setPlatform] = useState<"INSTAGRAM" | "TIKTOK" | "YOUTUBE">(
    editData?.platform || "INSTAGRAM"
  );
  const [url, setUrl] = useState(editData?.url || "");
  const [title, setTitle] = useState(editData?.title || "");
  const [caption, setCaption] = useState(editData?.caption || "");
  const [isActive, setIsActive] = useState(editData?.isActive ?? true);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const payload = {
      platform,
      url,
      title: platform === "YOUTUBE" ? title : undefined,
      caption: caption || undefined,
      isActive,
    };

    const res = isEdit && editData
      ? await updateSocialMediaPost(editData.id, payload)
      : await createSocialMediaPost(payload);

    if (res.success) {
      router.push("/admin/media-sosial");
      router.refresh();
    } else {
      setError("Gagal menyimpan postingan. Pastikan format URL valid.");
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

      {/* Platform */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Platform Media Sosial <span className="text-red-500">*</span>
        </label>
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value as "INSTAGRAM" | "TIKTOK" | "YOUTUBE")}
          className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white text-slate-900"
        >
          <option value="INSTAGRAM">Instagram (Reel / Post)</option>
          <option value="TIKTOK">TikTok (Video)</option>
          <option value="YOUTUBE">YouTube (Video)</option>
        </select>
      </div>

      {/* URL Link */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Link / URL Postingan <span className="text-red-500">*</span>
        </label>
        <input
          type="url"
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={
            platform === "INSTAGRAM"
              ? "https://www.instagram.com/reel/..."
              : platform === "TIKTOK"
              ? "https://www.tiktok.com/@.../video/..."
              : "https://youtu.be/... atau https://www.youtube.com/watch?v=..."
          }
          className="w-full px-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-slate-900 text-slate-900"
        />
        <p className="text-[10px] text-slate-400 mt-1">
          Masukkan URL lengkap langsung dari bilah alamat browser Anda.
        </p>
      </div>

      {/* Title - YouTube Only */}
      {platform === "YOUTUBE" && (
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Judul Video YouTube <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Judul video yang akan ditampilkan"
            className="w-full px-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-slate-900 text-slate-900"
          />
        </div>
      )}

      {/* Caption / Deskripsi */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          {platform === "YOUTUBE" ? "Deskripsi Video (YouTube)" : "Caption Postingan (Instagram/TikTok)"}
        </label>
        <textarea
          rows={5}
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder={
            platform === "YOUTUBE"
              ? "Tulis penjelasan singkat mengenai isi video YouTube..."
              : "Salin caption postingan asli dari media sosial..."
          }
          className="w-full px-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-slate-900 resize-none font-sans text-slate-900"
        />
      </div>

      {/* Toggle Tampilkan */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isActive"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
          className="w-4 h-4 rounded text-slate-900 focus:ring-slate-900 cursor-pointer"
        />
        <label htmlFor="isActive" className="text-sm font-medium text-slate-700 cursor-pointer">
          Tampilkan di halaman media sosial publik
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
        <Link
          href="/admin/media-sosial"
          className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-md transition"
        >
          Batal
        </Link>
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-white text-sm font-semibold rounded-md shadow-sm transition disabled:opacity-50 cursor-pointer"
        >
          {submitting ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Tambah Postingan"}
        </button>
      </div>
    </form>
  );
}
