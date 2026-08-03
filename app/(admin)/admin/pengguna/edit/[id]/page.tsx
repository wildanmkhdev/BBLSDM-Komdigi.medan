import { notFound } from "next/navigation";
import { getUserById } from "@/features/pengguna/actions";
import PenggunaForm from "../../PenggunaForm";

export const dynamic = "force-dynamic";

export default async function EditPenggunaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getUserById(id);

  if (!user) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit Pengguna</h1>
        <p className="text-sm text-slate-500">Perbarui data profil, hak akses, atau status akun.</p>
      </div>
      <PenggunaForm
        editData={{
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role as "SUPER_ADMIN" | "ADMIN" | "EDITOR" | "AUTHOR" | "USER",
          status: user.status as "ACTIVE" | "INACTIVE",
        }}
      />
    </div>
  );
}
