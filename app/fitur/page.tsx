
import PageHeader from "@/app/components/PageHeader";

export default function fitur() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PageHeader
        title="Fitur & Layanan Tambahan"
        subtitle="Daftar fitur pendukung sistem informasi balai besar pelatihan SDM digital."
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Fitur" },
        ]}
      />
      <div className="flex-1 flex items-center justify-center p-12">
        <h2 className="text-xl font-bold text-slate-400">Halaman dalam tahap pengembangan</h2>
      </div>
    </div>
  );
}
