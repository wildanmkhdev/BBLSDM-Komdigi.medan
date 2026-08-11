import { getMediaList } from "@/actions/media";
import AplikasiForm from "../AplikasiForm";

export const dynamic = "force-dynamic";

export default async function TambahAplikasiPage() {
  const allMedia = await getMediaList();
  const images = allMedia.filter((m) => m.mimeType.startsWith("image/"));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tambah Aplikasi Baru</h1>
        <p className="text-sm text-slate-500">
          Daftarkan sistem atau aplikasi baru untuk dimasukkan ke katalog.
        </p>
      </div>
      <AplikasiForm initialImages={images} />
    </div>
  );
}
