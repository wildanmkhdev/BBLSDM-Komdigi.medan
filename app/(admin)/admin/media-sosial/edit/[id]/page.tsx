import { notFound } from "next/navigation";
import { getSocialMediaPostById } from "@/features/sosialMedia/actions";
import SosialMediaForm from "../../SosialMediaForm";

export const dynamic = "force-dynamic";

export default async function EditSosialMediaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getSocialMediaPostById(id);

  if (!post) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit Postingan</h1>
        <p className="text-sm text-slate-500">Perbarui data link atau deskripsi postingan.</p>
      </div>
      <SosialMediaForm
        editData={{
          id: post.id,
          platform: post.platform as "INSTAGRAM" | "TIKTOK" | "YOUTUBE",
          url: post.url,
          title: post.title,
          caption: post.caption,
          isActive: post.isActive,
        }}
      />
    </div>
  );
}
