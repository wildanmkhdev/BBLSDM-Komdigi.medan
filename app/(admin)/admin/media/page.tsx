"use client";

import React, { useState, useEffect } from "react";
import { uploadFile, getMediaList, deleteMedia } from "@/features/media/actions";

interface MediaItem {
  id: string;
  originalName: string;
  publicUrl: string;
  mimeType: string;
  createdAt: Date;
}

export default function MediaPage() {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMedia = async () => {
    const list = await getMediaList();
    setMediaList(list as MediaItem[]);
  };

  useEffect(() => {
    let isMounted = true;
    getMediaList().then((list) => {
      if (isMounted) {
        setMediaList(list as MediaItem[]);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const res = await uploadFile(formData);

    if (res.success) {
      fetchMedia();
      (e.target as HTMLFormElement).reset();
    } else {
      setError(res.error || "Gagal mengunggah file");
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus media ini?")) {
      const res = await deleteMedia(id);
      if (res.success) {
        fetchMedia();
      } else {
        alert(res.error);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Pustaka Media</h1>
        <p className="text-sm text-slate-500">Unggah dan kelola semua dokumen PDF publikasi, gambar berita, dan galeri foto BBLSDM.</p>
      </div>

      {/* Upload Box */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm max-w-xl">
        <h3 className="font-semibold text-sm text-slate-900 mb-4">Unggah File Baru</h3>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <input
              type="file"
              name="file"
              required
              className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Alt Text (Gambar)</label>
              <input
                type="text"
                name="altText"
                placeholder="Deskripsi gambar..."
                className="w-full px-3 py-1.5 border border-slate-200 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-slate-900 text-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Keterangan / Caption</label>
              <input
                type="text"
                name="caption"
                placeholder="Keterangan singkat..."
                className="w-full px-3 py-1.5 border border-slate-200 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-slate-900 text-slate-900"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold rounded-md shadow-sm transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Mengunggah..." : "Mulai Unggah"}
          </button>
        </form>
      </div>

      {/* Media Grid */}
      <div>
        <h3 className="font-semibold text-sm text-slate-900 mb-4">Semua File ({mediaList.length})</h3>
        
        {mediaList.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-400 text-sm">
            Belum ada file media yang diunggah.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {mediaList.map((item) => {
              const isImage = item.mimeType.startsWith("image/");
              return (
                <div key={item.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between group relative">
                  
                  {/* Thumbnail */}
                  <div className="relative aspect-[4/3] bg-slate-50 border-b border-slate-100 flex items-center justify-center overflow-hidden">
                    {isImage ? (
                      <img src={item.publicUrl} alt={item.originalName} className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center space-y-1 text-slate-400">
                        <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                        <span className="text-[10px] uppercase font-bold">PDF / DOC</span>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="p-3 space-y-1">
                    <p className="text-xs font-semibold text-slate-800 truncate" title={item.originalName}>
                      {item.originalName}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {new Date(item.createdAt).toLocaleDateString("id-ID")}
                    </p>
                  </div>

                  {/* Hover Overlay Delete */}
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
