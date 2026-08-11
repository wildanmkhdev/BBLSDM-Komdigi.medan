import { getMediaList } from "@/actions/media";
import GaleriAlbumForm from "../GaleriAlbumForm";

export const dynamic = "force-dynamic";

export default async function TambahAlbumPage() {
  const allMedia = await getMediaList();
  const images = allMedia.filter((m) => m.mimeType.startsWith("image/"));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tambah Album Galeri</h1>
        <p className="text-sm text-slate-500">
          Buat album baru. Setelah disimpan, tambahkan foto via menu Kelola Foto.
        </p>
      </div>
      <GaleriAlbumForm initialImages={images} />
    </div>
  );
}
