import { getMediaList } from "@/actions/media";
import PengumumanForm from "../PengumumanForm";

export const dynamic = "force-dynamic";

export default async function TambahPengumumanPage() {
  const allMedia = await getMediaList();
  // Filter hanya dokumen PDF untuk lampiran
  const docs = allMedia.filter(
    (m) => m.mimeType === "application/pdf" || m.type === "DOCUMENT"
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tambah Pengumuman</h1>
        <p className="text-sm text-slate-500">
          Buat pengumuman baru dengan lampiran PDF yang bisa diunduh publik.
        </p>
      </div>
      <PengumumanForm initialDocs={docs} />
    </div>
  );
}
