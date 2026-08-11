import { notFound } from "next/navigation";
import { getAplikasiById } from "@/actions/aplikasi";
import { getMediaList } from "@/actions/media";
import AplikasiForm from "../../AplikasiForm";

export const dynamic = "force-dynamic";

export default async function EditAplikasiPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [app, allMedia] = await Promise.all([
    getAplikasiById(id),
    getMediaList(),
  ]);

  if (!app) notFound();

  const images = allMedia.filter((m) => m.mimeType.startsWith("image/"));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit Aplikasi</h1>
        <p className="text-sm text-slate-500">Perbarui data aplikasi katalog.</p>
      </div>
      <AplikasiForm
        initialImages={images}
        editData={{
          id: app.id,
          name: app.name,
          description: app.description,
          logoId: app.logoId,
          url: app.url,
          isActive: app.isActive,
        }}
      />
    </div>
  );
}
