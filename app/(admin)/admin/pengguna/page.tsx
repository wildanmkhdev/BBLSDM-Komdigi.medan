import React from "react";
import Link from "next/link";
import { getUsersList, deleteUser } from "@/actions/pengguna";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

export default async function AdminPenggunaPage() {
  const session = await auth();
  const currentUserId = session?.user?.id;
  const users = await getUsersList();

  const roleLabels = {
    SUPER_ADMIN: "Super Admin",
    ADMIN: "Admin",
    EDITOR: "Editor",
    AUTHOR: "Author",
    PEGAWAI: "Pegawai",
    USER: "User (Magang)",
  } as const;

  const roleColors = {
    SUPER_ADMIN: "bg-indigo-50 text-indigo-700 border-indigo-200",
    ADMIN: "bg-blue-50 text-blue-700 border-blue-200",
    EDITOR: "bg-emerald-50 text-emerald-700 border-emerald-200",
    AUTHOR: "bg-amber-50 text-amber-700 border-amber-200",
    PEGAWAI: "bg-teal-50 text-teal-700 border-teal-200",
    USER: "bg-slate-100 text-slate-700 border-slate-300",
  } as const;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Manajemen Pengguna</h1>
          <p className="text-sm text-slate-500">
            Kelola data akun operator CMS BBLSDM, atur status keaktifan, dan tetapkan hak akses role.
          </p>
        </div>
        <Link
          href="/admin/pengguna/tambah"
          className="inline-flex items-center px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-lg shadow-sm transition cursor-pointer"
        >
          + Tambah Pengguna
        </Link>
      </div>

      {users.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-400 text-sm">
          Belum ada pengguna terdaftar.
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                <th className="px-4 py-3">Nama Pengguna</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Hak Akses (Role)</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Login Terakhir</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition">
                  {/* Nama */}
                  <td className="px-4 py-3 font-semibold text-slate-900">
                    {user.name}
                    {user.id === currentUserId && (
                      <span className="ml-2 text-[9px] font-bold text-slate-400 border border-slate-200 px-1 py-0.5 rounded">
                        Anda
                      </span>
                    )}
                  </td>

                  {/* Email */}
                  <td className="px-4 py-3 text-slate-600">{user.email}</td>

                  {/* Role */}
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${
                        roleColors[user.role as keyof typeof roleColors] || ""
                      }`}
                    >
                      {roleLabels[user.role as keyof typeof roleLabels]}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    {user.status === "ACTIVE" ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Aktif
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        Ditangguhkan
                      </span>
                    )}
                  </td>

                  {/* Last Login */}
                  <td className="px-4 py-3 text-slate-500">
                    {user.lastLoginAt
                      ? new Date(user.lastLoginAt).toLocaleString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Belum pernah login"}
                  </td>

                  {/* Aksi */}
                  <td className="px-4 py-3 text-right space-x-2">
                    <Link
                      href={`/admin/pengguna/edit/${user.id}`}
                      className="text-[10px] font-bold text-slate-600 hover:underline"
                    >
                      Edit
                    </Link>

                    {user.id !== currentUserId && (
                      <form
                        action={async () => {
                          "use server";
                          await deleteUser(user.id);
                        }}
                        className="inline"
                      >
                        <button type="submit" className="text-[10px] font-bold text-red-600 hover:underline cursor-pointer">
                          Hapus
                        </button>
                      </form>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
