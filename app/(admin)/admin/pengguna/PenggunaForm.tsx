"use client";

import React, { useState } from "react";
import { createUser, updateUser } from "@/actions/pengguna";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface PenggunaFormProps {
  editData?: {
    id: string;
    name: string;
    email: string;
    role: "SUPER_ADMIN" | "ADMIN" | "EDITOR" | "AUTHOR" | "USER" | "PEGAWAI";
    status: "ACTIVE" | "INACTIVE";
  };
}

export default function PenggunaForm({ editData }: PenggunaFormProps) {
  const router = useRouter();
  const isEdit = Boolean(editData);

  const [name, setName] = useState(editData?.name || "");
  const [email, setEmail] = useState(editData?.email || "");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"SUPER_ADMIN" | "ADMIN" | "EDITOR" | "AUTHOR" | "USER" | "PEGAWAI">(
    editData?.role || "EDITOR"
  );
  const [status, setStatus] = useState<"ACTIVE" | "INACTIVE">(editData?.status || "ACTIVE");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const payload = {
      name,
      email,
      password: password || undefined,
      role,
      status,
    };

    const res = isEdit && editData
      ? await updateUser(editData.id, payload)
      : await createUser(payload as never); // create expects password

    if (res.success) {
      router.push("/admin/pengguna");
      router.refresh();
    } else {
      const fieldErrors = res.error as Record<string, string[]>;
      const firstError = fieldErrors
        ? Object.values(fieldErrors)[0]?.[0]
        : "Gagal menyimpan data pengguna.";
      setError(firstError || "Terjadi kesalahan.");
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

      {/* Nama Lengkap */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Nama Lengkap <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Mis: Wildan Mukhdev"
          className="w-full px-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-slate-900 text-slate-900"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Alamat Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Mis: admin@bblsdm.go.id"
          className="w-full px-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-slate-900 text-slate-900"
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Kata Sandi (Password) {!isEdit && <span className="text-red-500">*</span>}
          {isEdit && <span className="text-slate-400 font-normal ml-1">— kosongkan jika tidak ingin diubah</span>}
        </label>
        <input
          type="password"
          required={!isEdit}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={isEdit ? "Masukkan password baru" : "Minimal 6 karakter"}
          className="w-full px-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-slate-900 text-slate-900"
        />
      </div>

      {/* Role & Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Role */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Role (Hak Akses) <span className="text-red-500">*</span>
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as never)}
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white text-slate-900"
          >
            <option value="SUPER_ADMIN">Super Admin (Akses Penuh)</option>
            <option value="ADMIN">Admin (Kelola Editorial & Layanan)</option>
            <option value="EDITOR">Editor (Kelola Konten & Media)</option>
            <option value="AUTHOR">Author (Tulis Berita)</option>
            <option value="PEGAWAI">Pegawai (Lihat Katalog Aplikasi)</option>
            <option value="USER">User (Anak Magang)</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Status Akun <span className="text-red-500">*</span>
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as "ACTIVE" | "INACTIVE")}
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white text-slate-900"
          >
            <option value="ACTIVE">Aktif (Dapat Login)</option>
            <option value="INACTIVE">Nonaktif / Ditangguhkan</option>
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
        <Link
          href="/admin/pengguna"
          className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-md transition"
        >
          Batal
        </Link>
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-white text-sm font-semibold rounded-md shadow-sm transition disabled:opacity-50 cursor-pointer"
        >
          {submitting ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Tambah Pengguna"}
        </button>
      </div>
    </form>
  );
}
