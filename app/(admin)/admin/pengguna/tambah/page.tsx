import PenggunaForm from "../PenggunaForm";

export const dynamic = "force-dynamic";

export default async function TambahPenggunaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tambah Pengguna Baru</h1>
        <p className="text-sm text-slate-500">
          Buat akun baru untuk administrator atau penulis konten CMS.
        </p>
      </div>
      <PenggunaForm />
    </div>
  );
}
