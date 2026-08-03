import { notFound } from "next/navigation";
import { getPelatihanById } from "@/features/pelatihan/actions";
import PelatihanForm from "../../PelatihanForm";

export const dynamic = "force-dynamic";

export default async function EditPelatihanPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pelatihan = await getPelatihanById(id);

  if (!pelatihan) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit Pelatihan</h1>
        <p className="text-sm text-slate-500">Perbarui data program pelatihan yang sudah ada.</p>
      </div>
      <PelatihanForm
        editData={{
          id: pelatihan.id,
          title: pelatihan.title,
          categorySlug: pelatihan.categorySlug,
          categoryLabel: pelatihan.categoryLabel,
          description: pelatihan.description,
          jadwal: pelatihan.jadwal,
          durasi: pelatihan.durasi,
          kuota: pelatihan.kuota,
          terisi: pelatihan.terisi,
          status: pelatihan.status,
          level: pelatihan.level,
          metode: pelatihan.metode,
          lokasi: pelatihan.lokasi,
          silabus: Array.isArray(pelatihan.silabus) ? (pelatihan.silabus as string[]) : [],
          persyaratan: Array.isArray(pelatihan.persyaratan)
            ? (pelatihan.persyaratan as string[])
            : [],
        }}
      />
    </div>
  );
}
