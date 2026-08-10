import React from "react";
import prisma from "@/lib/prisma";
import { switchUserRole } from "@/features/pengguna/actions";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

export default async function AdminRolePage() {
  const session = await auth();
  const currentUserId = session?.user?.id;

  // Fetch all users with their roles
  const users = await prisma.user.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  const rolesConfig = [
    {
      key: "SUPER_ADMIN",
      name: "Super Admin",
      description: "Akses penuh tanpa batasan. Mengelola pengguna, konfigurasi sistem, audit log, dan seluruh modul editorial.",
      color: "border-indigo-200 bg-indigo-50/50 text-indigo-700",
    },
    {
      key: "ADMIN",
      name: "Admin Balai",
      description: "Mengelola pendaftaran magang, persetujuan modul pelatihan, media library, dan seluruh konten informasi / editorial.",
      color: "border-blue-200 bg-blue-50/50 text-blue-700",
    },
    {
      key: "EDITOR",
      name: "Editor",
      description: "Mengelola penulisan berita, pengumuman publik, album galeri foto, media library, dan info pelatihan.",
      color: "border-emerald-200 bg-emerald-50/50 text-emerald-700",
    },
    {
      key: "AUTHOR",
      name: "Author",
      description: "Hanya berwenang menulis draft berita dan mengunggah media ke berita miliknya sendiri.",
      color: "border-amber-200 bg-amber-50/50 text-amber-700",
    },
    {
      key: "PEGAWAI",
      name: "Pegawai",
      description: "Hanya berwenang melihat data Katalog Aplikasi di CMS (Read-Only).",
      color: "border-teal-200 bg-teal-50/50 text-teal-700",
    },
    {
      key: "USER",
      name: "User (Magang)",
      description: "Hak akses dasar untuk mendaftar magang dan melacak status progres pendaftaran magang mereka.",
      color: "border-slate-300 bg-slate-50 text-slate-700",
    },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Manajemen Hak Akses &amp; Role</h1>
        <p className="text-sm text-slate-500">
          Lihat deskripsi wewenang masing-masing role dan kelola penetapan role untuk seluruh akun operator.
        </p>
      </div>

      {/* Roles Directory & Members */}
      <div className="space-y-8">
        {rolesConfig.map((role) => {
          const members = users.filter((u) => u.role === role.key);

          return (
            <div
              key={role.key}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs"
            >
              {/* Role Header Info */}
              <div className={`p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-50/40`}>
                <div className="space-y-1">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${role.color}`}>
                    {role.name}
                  </span>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed max-w-2xl">
                    {role.description}
                  </p>
                </div>
                <div className="text-xs font-bold text-slate-500 shrink-0">
                  Total Pengguna: <span className="text-slate-900 bg-white border px-2 py-0.5 rounded">{members.length}</span>
                </div>
              </div>

              {/* Members List inside Role */}
              {members.length === 0 ? (
                <div className="p-5 text-center text-xs text-slate-400 italic">
                  Belum ada pengguna yang memiliki role ini.
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {members.map((member) => (
                    <div key={member.id} className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition">
                      <div>
                        <div className="text-xs font-semibold text-slate-900">
                          {member.name}
                          {member.id === currentUserId && (
                            <span className="ml-2 text-[8px] font-bold text-slate-400 border border-slate-200 px-1 py-0.5 rounded">
                              Anda
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-500">{member.email}</div>
                      </div>

                      {/* Switch Role selector */}
                      <form
                        action={async (formData: FormData) => {
                          "use server";
                           const targetRole = formData.get("newRole") as "SUPER_ADMIN" | "ADMIN" | "EDITOR" | "AUTHOR" | "USER" | "PEGAWAI";
                          await switchUserRole(member.id, targetRole);
                        }}
                        className="flex items-center gap-2"
                      >
                        <select
                          name="newRole"
                          defaultValue={member.role}
                          disabled={member.id === currentUserId}
                          className="text-xs bg-white border border-slate-200 rounded-md px-2.5 py-1.5 font-medium text-slate-700 outline-none disabled:bg-slate-50 disabled:text-slate-400"
                        >
                          <option value="SUPER_ADMIN">Super Admin</option>
                          <option value="ADMIN">Admin Balai</option>
                          <option value="EDITOR">Editor</option>
                          <option value="AUTHOR">Author</option>
                          <option value="PEGAWAI">Pegawai (Read-Only Apk)</option>
                          <option value="USER">User (Magang)</option>
                        </select>
                        {member.id !== currentUserId && (
                          <button
                            type="submit"
                            className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-xs font-bold transition cursor-pointer"
                          >
                            Ubah
                          </button>
                        )}
                      </form>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
