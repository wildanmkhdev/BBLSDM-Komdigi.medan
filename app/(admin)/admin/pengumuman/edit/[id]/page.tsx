import { notFound } from "next/navigation";
import { getPengumumanById } from "@/features/pengumuman/actions";
import { getMediaList } from "@/features/media/actions";
import PengumumanForm from "../../PengumumanForm";

export const dynamic = "force-dynamic";

export default async function EditPengumumanPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [pengumuman, allMedia] = await Promise.all([
    getPengumumanById(id),
    getMediaList(),
  ]);

  if (!pengumuman) notFound();

  const docs = allMedia.filter(
    (m) => m.mimeType === "application/pdf" || m.type === "DOCUMENT"
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit Pengumuman</h1>
        <p className="text-sm text-slate-500">Perbarui data pengumuman yang sudah ada.</p>
      </div>
      <PengumumanForm
        initialDocs={docs}
        editData={{
          id: pengumuman.id,
          title: pengumuman.title,
          category: pengumuman.category,
          content: pengumuman.content,
          priority: pengumuman.priority,
          attachmentId: pengumuman.attachmentId,
          isPublished: pengumuman.isPublished,
        }}
      />
    </div>
  );
}
