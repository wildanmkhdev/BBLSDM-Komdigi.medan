import SosialMediaForm from "../SosialMediaForm";

export const dynamic = "force-dynamic";

export default async function TambahSosialMediaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tambah Postingan Media Sosial</h1>
        <p className="text-sm text-slate-500">
          Masukkan link postingan baru dari Instagram, TikTok, atau YouTube.
        </p>
      </div>
      <SosialMediaForm />
    </div>
  );
}
