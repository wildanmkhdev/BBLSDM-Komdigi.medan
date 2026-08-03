import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import PageHeader from "@/app/components/PageHeader";
import { getAplikasiBySlug } from "@/features/aplikasi/actions";

export const dynamic = "force-dynamic";

export default async function AplikasiDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = await getAplikasiBySlug(slug);

  if (!app) notFound();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      <PageHeader
        title={app.name}
        subtitle="Informasi detail, deskripsi sistem, dan akses masuk layanan aplikasi."
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Katalog Aplikasi", href: "/fitur" },
          { label: app.name },
        ]}
      />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow w-full">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
          
          {/* Logo & Header Info */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
            <div className="relative w-24 h-24 bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 flex items-center justify-center shadow-inner shrink-0">
              {app.logo ? (
                <Image
                  src={app.logo.publicUrl}
                  alt={app.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="text-xs font-bold text-slate-400">APLIKASI</span>
              )}
            </div>

            <div className="space-y-2 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0b1b3d] leading-tight">
                {app.name}
              </h1>
              <p className="text-xs text-slate-400 font-semibold">
                Didaftarkan pada: {new Date(app.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Description Content */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
              Deskripsi &amp; Fungsi Sistem
            </h3>
            <div className="text-slate-700 leading-relaxed text-sm whitespace-pre-wrap">
              {app.description}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3 justify-end items-center">
            <Link
              href="/fitur"
              className="w-full sm:w-auto text-center px-5 py-2.5 text-xs font-semibold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
            >
              Kembali ke Katalog
            </Link>

            {app.url && (
              <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#0b1b3d] hover:bg-[#0284c7] text-white text-xs font-bold transition-colors shadow-sm"
              >
                <span>Buka Aplikasi Utama</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
