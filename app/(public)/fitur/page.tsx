import React from "react";
import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/app/components/PageHeader";
import { getPublishedAplikasi } from "@/features/aplikasi/actions";

export const dynamic = "force-dynamic";

export default async function FiturPage() {
  const apps = await getPublishedAplikasi();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      <PageHeader
        title="Katalog Aplikasi"
        subtitle="Daftar sistem informasi, portal layanan publik, dan aplikasi internal yang dikelola oleh BBLSDM Komdigi Medan."
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Katalog Aplikasi" },
        ]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow w-full">
        {apps.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm max-w-lg mx-auto">
            <svg
              className="mx-auto h-12 w-12 text-slate-300 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
              />
            </svg>
            <h3 className="text-sm font-bold text-slate-800">Belum Ada Aplikasi</h3>
            <p className="text-xs text-slate-500 mt-1">
              Saat ini katalog aplikasi sedang diperbarui oleh administrator.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {apps.map((app) => (
              <div
                key={app.id}
                className="flex flex-col bg-white rounded-2xl border border-slate-200/80 hover:border-slate-300 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group justify-between"
              >
                <div className="p-6 space-y-5">
                  {/* Logo Container */}
                  <div className="relative w-14 h-14 bg-slate-50 rounded-xl overflow-hidden border border-slate-200/80 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                    {app.logo ? (
                      <Image
                        src={app.logo.publicUrl}
                        alt={app.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-[10px] font-bold text-slate-400">LOG</span>
                    )}
                  </div>

                  <div className="space-y-2">
                    {/* App Name */}
                    <h3 className="text-base sm:text-lg font-bold text-[#0b1b3d] leading-snug group-hover:text-[#0284c7] transition-colors line-clamp-2">
                      {app.name}
                    </h3>
                    {/* App Description Snippet */}
                    <p className="text-xs sm:text-sm text-slate-500 line-clamp-3 leading-relaxed">
                      {app.description}
                    </p>
                  </div>
                </div>

                {/* Footer Action Card */}
                <div className="px-6 pb-6 pt-3 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-[#0284c7] group-hover:text-[#0b1b3d] transition-colors">
                  <Link href={`/fitur/${app.slug}`} className="hover:underline flex items-center gap-1.5 w-full">
                    <span>Lihat Detail Aplikasi</span>
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
