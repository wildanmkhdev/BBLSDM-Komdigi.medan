"use client";

import React, { useState } from "react";
import { createPelatihan, updatePelatihan } from "@/actions/pelatihan";
import { CATEGORY_SLUGS, CATEGORY_LABELS, STATUS_LABELS, LEVEL_LABELS, type CategorySlug } from "@/validations/pelatihan";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface PelatihanFormProps {
  editData?: {
    id: string;
    title: string;
    categorySlug: string;
    categoryLabel: string;
    description: string;
    jadwal: string;
    durasi: string;
    kuota: number;
    terisi: number;
    status: "SEGERA_DIBUKA" | "OPEN" | "FULL";
    level: "DASAR" | "MENENGAH" | "LANJUTAN";
    metode: string;
    lokasi: string;
    silabus: string[];
    persyaratan: string[];
  };
}

export default function PelatihanForm({ editData }: PelatihanFormProps) {
  const router = useRouter();
  const isEdit = Boolean(editData);

  const [title, setTitle] = useState(editData?.title || "");
  const [categorySlug, setCategorySlug] = useState<CategorySlug>(
    (editData?.categorySlug as CategorySlug) || "komunikasi"
  );
  const [description, setDescription] = useState(editData?.description || "");
  // Jadwal dalam format teks bebas "28 Jul — 30 Jul 2026"
  const [jadwal, setJadwal] = useState(editData?.jadwal || "");
  // Durasi dalam format teks "3 Hari (24 JP)"
  const [durasi, setDurasi] = useState(editData?.durasi || "");
  const [kuota, setKuota] = useState(editData?.kuota || 30);
  const [terisi, setTerisi] = useState(editData?.terisi || 0);
  const [status, setStatus] = useState<"SEGERA_DIBUKA" | "OPEN" | "FULL">(
    editData?.status || "SEGERA_DIBUKA"
  );
  const [level, setLevel] = useState<"DASAR" | "MENENGAH" | "LANJUTAN">(
    editData?.level || "DASAR"
  );
  const [metode, setMetode] = useState(editData?.metode || "Tatap Muka");
  const [lokasi, setLokasi] = useState(editData?.lokasi || "BBLSDM Komdigi Medan");

  // Silabus & Persyaratan sebagai array string (sesuai JSON field di DB)
  const [silabus, setSilabus] = useState<string[]>(editData?.silabus || [""]);
  const [persyaratan, setPersyaratan] = useState<string[]>(editData?.persyaratan || [""]);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ─── Silabus helpers ──────────────────────────────────────────────────────
  const addSilabus = () => setSilabus([...silabus, ""]);
  const removeSilabus = (i: number) => setSilabus(silabus.filter((_, idx) => idx !== i));
  const updateSilabus = (i: number, val: string) =>
    setSilabus(silabus.map((s, idx) => (idx === i ? val : s)));

  // ─── Persyaratan helpers ──────────────────────────────────────────────────
  const addPersyaratan = () => setPersyaratan([...persyaratan, ""]);
  const removePersyaratan = (i: number) => setPersyaratan(persyaratan.filter((_, idx) => idx !== i));
  const updatePersyaratan = (i: number, val: string) =>
    setPersyaratan(persyaratan.map((p, idx) => (idx === i ? val : p)));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const payload = {
      title,
      categorySlug,
      categoryLabel: CATEGORY_LABELS[categorySlug],
      description,
      jadwal,
      durasi,
      kuota,
      terisi,
      status,
      level,
      metode,
      lokasi,
      silabus: silabus.filter((s) => s.trim() !== ""),
      persyaratan: persyaratan.filter((p) => p.trim() !== ""),
    };

    const res = isEdit && editData
      ? await updatePelatihan(editData.id, payload)
      : await createPelatihan(payload);

    if (res.success) {
      router.push("/admin/pelatihan");
      router.refresh();
    } else {
      if (typeof res.error === "string") {
        setError(res.error);
      } else if (res.error && typeof res.error === "object") {
        // Handle validation errors from Zod
        const validationMsgs = Object.entries(res.error)
          .map(([field, msgs]) => {
            const fieldName = field === "title" ? "Nama Pelatihan" 
                            : field === "categorySlug" ? "Kategori" 
                            : field === "description" ? "Deskripsi Program" 
                            : field === "jadwal" ? "Jadwal" 
                            : field === "durasi" ? "Durasi" 
                            : field === "kuota" ? "Kuota" 
                            : field === "terisi" ? "Terisi" 
                            : field === "metode" ? "Metode" 
                            : field === "lokasi" ? "Lokasi" 
                            : field === "silabus" ? "Silabus" 
                            : field === "persyaratan" ? "Persyaratan" 
                            : field;
            return `${fieldName}: ${(msgs as string[]).join(", ")}`;
          })
          .join(" | ");
        setError(`Gagal menyimpan pelatihan. Validasi gagal: ${validationMsgs}`);
      } else {
        setError("Gagal menyimpan pelatihan. Periksa kelengkapan isian.");
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

      {/* Nama Pelatihan */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Nama Pelatihan <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Mis: Keamanan Siber & Respons Insiden Siber"
          className="w-full px-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-slate-900 text-slate-900"
        />
      </div>

      {/* Grid: Kategori, Status, Level */}
      <div className="grid grid-cols-3 gap-4">
        {/* Kategori — sesuai filter tabs di halaman publik */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Kategori <span className="text-red-500">*</span>
          </label>
          <select
            value={categorySlug}
            onChange={(e) => setCategorySlug(e.target.value as CategorySlug)}
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white text-slate-900"
          >
            {CATEGORY_SLUGS.map((slug) => (
              <option key={slug} value={slug}>
                {CATEGORY_LABELS[slug]}
              </option>
            ))}
          </select>
          <p className="text-[10px] text-slate-400 mt-1">
            Label: <strong>{CATEGORY_LABELS[categorySlug]}</strong>
          </p>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as "SEGERA_DIBUKA" | "OPEN" | "FULL")}
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white text-slate-900"
          >
            {Object.entries(STATUS_LABELS).map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>
        </div>

        {/* Level */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Level</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value as "DASAR" | "MENENGAH" | "LANJUTAN")}
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white text-slate-900"
          >
            {Object.entries(LEVEL_LABELS).map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Deskripsi */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Deskripsi Program <span className="text-red-500">*</span>
          <span className="text-slate-400 font-normal ml-1">— ditampilkan di card dan modal</span>
        </label>
        <textarea
          required
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Deskripsi singkat program pelatihan..."
          className="w-full px-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-slate-900 resize-none font-sans text-slate-900"
        />
      </div>

      {/* Grid: Jadwal & Durasi */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Jadwal <span className="text-red-500">*</span>
            <span className="text-slate-400 font-normal ml-1">— teks bebas</span>
          </label>
          <input
            type="text"
            required
            value={jadwal}
            onChange={(e) => setJadwal(e.target.value)}
            placeholder="Mis: 28 Jul — 30 Jul 2026"
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-slate-900 text-slate-900"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Durasi <span className="text-red-500">*</span>
            <span className="text-slate-400 font-normal ml-1">— teks bebas</span>
          </label>
          <input
            type="text"
            required
            value={durasi}
            onChange={(e) => setDurasi(e.target.value)}
            placeholder="Mis: 3 Hari (24 JP)"
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-slate-900 text-slate-900"
          />
        </div>
      </div>

      {/* Grid: Metode & Lokasi */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Metode <span className="text-red-500">*</span>
          </label>
          <select
            value={metode}
            onChange={(e) => setMetode(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white text-slate-900"
          >
            <option>Tatap Muka</option>
            <option>Online</option>
            <option>Hybrid</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Lokasi <span className="text-red-500">*</span>
            <span className="text-slate-400 font-normal ml-1">— tampil di card</span>
          </label>
          <input
            type="text"
            required
            value={lokasi}
            onChange={(e) => setLokasi(e.target.value)}
            placeholder="Mis: Lab Komputer A, BBLSDM Komdigi Medan"
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-slate-900 text-slate-900"
          />
        </div>
      </div>

      {/* Grid: Kuota & Terisi */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Kuota Peserta <span className="text-red-500">*</span>
            <span className="text-slate-400 font-normal ml-1">— untuk progress bar</span>
          </label>
          <input
            type="number"
            required
            min={1}
            max={9999}
            value={kuota}
            onChange={(e) => setKuota(Number(e.target.value))}
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm text-slate-900"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Peserta Terisi
            <span className="text-slate-400 font-normal ml-1">— saat ini sudah daftar</span>
          </label>
          <input
            type="number"
            min={0}
            max={kuota}
            value={terisi}
            onChange={(e) => setTerisi(Number(e.target.value))}
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm text-slate-900"
          />
        </div>
      </div>

      {/* Silabus — JSON array, ditampilkan di modal detail */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-semibold text-slate-700">
            Silabus Pembelajaran <span className="text-red-500">*</span>
            <span className="text-slate-400 font-normal ml-1">— daftar materi di modal</span>
          </label>
          <button
            type="button"
            onClick={addSilabus}
            className="text-xs font-semibold text-blue-600 hover:underline"
          >
            + Tambah Materi
          </button>
        </div>
        <div className="space-y-2">
          {silabus.map((item, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => updateSilabus(i, e.target.value)}
                placeholder={`Materi ${i + 1}...`}
                className="flex-1 px-3 py-2 border border-slate-200 rounded-md text-sm text-slate-900"
              />
              {silabus.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSilabus(i)}
                  className="px-2 py-1 text-xs text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Persyaratan — JSON array, ditampilkan di modal detail */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-semibold text-slate-700">
            Persyaratan Peserta <span className="text-red-500">*</span>
            <span className="text-slate-400 font-normal ml-1">— daftar syarat di modal</span>
          </label>
          <button
            type="button"
            onClick={addPersyaratan}
            className="text-xs font-semibold text-blue-600 hover:underline"
          >
            + Tambah Syarat
          </button>
        </div>
        <div className="space-y-2">
          {persyaratan.map((item, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => updatePersyaratan(i, e.target.value)}
                placeholder={`Persyaratan ${i + 1}...`}
                className="flex-1 px-3 py-2 border border-slate-200 rounded-md text-sm text-slate-900"
              />
              {persyaratan.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePersyaratan(i)}
                  className="px-2 py-1 text-xs text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
        <Link
          href="/admin/pelatihan"
          className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-md transition"
        >
          Batal
        </Link>
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-white text-sm font-semibold rounded-md shadow-sm transition disabled:opacity-50 cursor-pointer"
        >
          {submitting ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Buat Pelatihan"}
        </button>
      </div>
    </form>
  );
}
