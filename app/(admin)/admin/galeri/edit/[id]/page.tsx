import { notFound } from "next/navigation";
import { getGaleriAlbumById } from "@/features/galeri/actions";
import { getMediaList } from "@/features/media/actions";
import GaleriAlbumForm from "../../GaleriAlbumForm";

export const dynamic = "force-dynamic";

export default async function EditAlbumPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [album, allMedia] = await Promise.all([
    getGaleriAlbumById(id),
    getMediaList(),
  ]);

  if (!album) notFound();

  const images = allMedia.filter((m) => m.mimeType.startsWith("image/"));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit Album Galeri</h1>
        <p className="text-sm text-slate-500">Perbarui informasi album galeri.</p>
      </div>
      <GaleriAlbumForm
        initialImages={images}
        editData={{
          id: album.id,
          title: album.title,
          category: album.category,
          description: album.description,
          eventDate: album.eventDate,
          coverPhotoId: album.coverPhotoId,
          isPublished: album.isPublished,
        }}
      />
    </div>
  );
}
