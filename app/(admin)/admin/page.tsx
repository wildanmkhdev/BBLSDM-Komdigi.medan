import React from "react";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-sm text-slate-500">Selamat datang kembali di panel administrasi BBLSDM Komdigi Medan.</p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-32">
          <span className="text-sm font-medium text-slate-500">Berita Aktif</span>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold tracking-tight">24</span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+3 bulan ini</span>
          </div>
        </div>
        {/* Card 2 */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-32">
          <span className="text-sm font-medium text-slate-500">Magang Pending</span>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold tracking-tight">12</span>
            <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full animate-pulse">Butuh Review</span>
          </div>
        </div>
        {/* Card 3 */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-32">
          <span className="text-sm font-medium text-slate-500">Feedback Masuk</span>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold tracking-tight">185</span>
            <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">★ 4.8 / 5</span>
          </div>
        </div>
        {/* Card 4 */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-32">
          <span className="text-sm font-medium text-slate-500">Pesan Kontak Baru</span>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold tracking-tight">7</span>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">Belum dibaca</span>
          </div>
        </div>
      </div>

      {/* Main Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Charts Container */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-80 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-base">Grafik Kinerja Peserta Pelatihan</h3>
            <p className="text-xs text-slate-500">Data agregat jumlah peserta program pelatihan tahun 2026.</p>
          </div>
          {/* Chart Placeholder */}
          <div className="flex-1 bg-slate-50 border border-dashed border-slate-200 rounded-lg my-4 flex items-center justify-center text-sm text-slate-400">
            [ Visualisasi Diagram Chart Terintegrasi ]
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-80 flex flex-col">
          <h3 className="font-semibold text-base mb-4">Aktivitas Terkini</h3>
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            <div className="flex space-x-3 text-xs">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <div>
                <p className="font-medium">Wildan mempublikasikan berita baru</p>
                <p className="text-slate-500">&quot;Penerimaan Magang Gelombang 3&quot;</p>
                <p className="text-[10px] text-slate-400 mt-0.5">5 menit yang lalu</p>
              </div>
            </div>
            <div className="flex space-x-3 text-xs">
              <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
              <div>
                <p className="font-medium">Pendaftaran Magang masuk (USU)</p>
                <p className="text-slate-500">A.n. Budi Santoso - Teknik Informatika</p>
                <p className="text-[10px] text-slate-400 mt-0.5">20 menit yang lalu</p>
              </div>
            </div>
            <div className="flex space-x-3 text-xs">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
              <div>
                <p className="font-medium">Settings diperbarui oleh Super Admin</p>
                <p className="text-slate-500">Mengubah nomor telepon kontak instansi</p>
                <p className="text-[10px] text-slate-400 mt-0.5">1 jam yang lalu</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
