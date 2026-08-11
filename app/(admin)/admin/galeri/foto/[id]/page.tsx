import { notFound } from "next/navigation";
import { getGaleriAlbumById } from "@/actions/galeri";
import { getMediaList } from "@/actions/media";
import ManagePhotosForm from "./ManagePhotosForm";

export const dynamic = "force-dynamic";

export default async function ManagePhotosPage({
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

  // Filter only images for gallery photos
  const images = allMedia.filter((m) => m.mimeType.startsWith("image/"));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Kelola Foto Album</h1>
        <p className="text-sm text-slate-500">
          Album: <strong className="text-slate-900">{album.title}</strong> ({album.category})
        </p>
      </div>
      <ManagePhotosForm album={album} initialImages={images} />
    </div>
  );
}
