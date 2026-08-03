import PelatihanForm from "../PelatihanForm";

export const dynamic = "force-dynamic";

export default async function TambahPelatihanPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tambah Program Pelatihan</h1>
        <p className="text-sm text-slate-500">
          Buat program pelatihan baru dengan silabus, persyaratan, jadwal, dan kuota peserta.
        </p>
      </div>
      <PelatihanForm />
    </div>
  );
}
