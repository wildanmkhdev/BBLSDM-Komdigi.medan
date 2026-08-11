import React from "react";
import Link from "next/link";
import { getBanners, toggleBannerStatus, deleteBanner } from "@/actions/banner";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function AdminBannerPage() {
  const banners = await getBanners();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manajemen Banner Slider</h1>
          <p className="text-sm text-slate-500">Unggah dan kelola slide banner yang tampil di halaman beranda utama.</p>
        </div>
        <Link
          href="/admin/banner/tambah"
          className="inline-flex items-center px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-lg shadow-sm transition"
        >
          Tambah Banner
        </Link>
      </div>

      {banners.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <svg className="w-12 h-12 text-slate-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 00.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          <h3 className="font-semibold text-slate-900">Belum Ada Banner</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">Klik tombol di atas untuk mengunggah banner promosi / siaran pers pertama Anda.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                <th className="px-6 py-4">Gambar</th>
                <th className="px-6 py-4">Judul &amp; Lencana</th>
                <th className="px-6 py-4">Teks CTA / Link</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {banners.map((banner) => (
                <tr key={banner.id} className="hover:bg-slate-50/50 transition">
                  <td className="px-6 py-4">
                    <div className="relative w-24 h-14 bg-slate-100 rounded overflow-hidden border border-slate-200">
                      <Image src={banner.image.publicUrl} alt={banner.title} fill sizes="96px" className="object-cover" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900 leading-tight">{banner.title}</div>
                    <span className="inline-block mt-1.5 px-2 py-0.5 bg-orange-100 text-orange-800 text-[10px] font-bold rounded uppercase tracking-wider">
                      {banner.accentBadge}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    <div>{banner.ctaText}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{banner.ctaLink}</div>
                  </td>
                  <td className="px-6 py-4">
                    {banner.isActive ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Aktif
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                        Non-aktif
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <form action={async () => {
                      "use server";
                      await toggleBannerStatus(banner.id, !banner.isActive);
                    }} className="inline">
                      <button type="submit" className="text-xs font-semibold text-[#0284c7] hover:underline cursor-pointer">
                        Toggle
                      </button>
                    </form>
                    <form action={async () => {
                      "use server";
                      await deleteBanner(banner.id);
                    }} className="inline">
                      <button type="submit" className="text-xs font-semibold text-red-600 hover:underline cursor-pointer">
                        Hapus
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
