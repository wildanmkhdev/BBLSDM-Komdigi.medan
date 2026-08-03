import React from "react";

export const dynamic = "force-dynamic";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-[#0b1b3d]">Dashboard Overview</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Selamat datang kembali di panel administrasi Portal Terintegrasi BBLSDM Komdigi Medan.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between h-36 hover:shadow-md hover:border-slate-300 transition duration-200 group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Berita Aktif</span>
            <div className="p-2 bg-indigo-50 text-indigo-700 rounded-lg group-hover:bg-[#0b1b3d] group-hover:text-white transition duration-200">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline space-x-2 mt-4">
            <span className="text-3xl font-extrabold text-[#0b1b3d] tracking-tight">24</span>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">+3 bulan ini</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between h-36 hover:shadow-md hover:border-slate-300 transition duration-200 group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Magang Pending</span>
            <div className="p-2 bg-amber-50 text-amber-700 rounded-lg group-hover:bg-[#0b1b3d] group-hover:text-white transition duration-200">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline space-x-2 mt-4">
            <span className="text-3xl font-extrabold text-[#0b1b3d] tracking-tight">12</span>
            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full animate-pulse">Butuh Review</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between h-36 hover:shadow-md hover:border-slate-300 transition duration-200 group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Feedback Masuk</span>
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg group-hover:bg-[#0b1b3d] group-hover:text-white transition duration-200">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline space-x-2 mt-4">
            <span className="text-3xl font-extrabold text-[#0b1b3d] tracking-tight">185</span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">★ 4.8 / 5</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between h-36 hover:shadow-md hover:border-slate-300 transition duration-200 group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pesan Kontak</span>
            <div className="p-2 bg-blue-50 text-blue-700 rounded-lg group-hover:bg-[#0b1b3d] group-hover:text-white transition duration-200">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline space-x-2 mt-4">
            <span className="text-3xl font-extrabold text-[#0b1b3d] tracking-tight">7</span>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">Belum dibaca</span>
          </div>
        </div>
      </div>

      {/* Main Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Charts Container - Premium Custom SVG/CSS Bar Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between h-[360px]">
          <div>
            <h3 className="font-extrabold text-base text-[#0b1b3d]">Statistik Peserta Pelatihan</h3>
            <p className="text-xs text-slate-400 mt-0.5">Grafik data jumlah partisipan per bidang pelatihan tahun 2026.</p>
          </div>
          
          {/* Custom HTML Bar Chart */}
          <div className="flex-1 flex items-end justify-between gap-6 px-4 py-8 h-full">
            {[
              { label: "Pemasaran", value: 75, color: "bg-[#0b1b3d]" },
              { label: "Keamanan Siber", value: 95, color: "bg-blue-600" },
              { label: "Data Science", value: 45, color: "bg-blue-400" },
              { label: "Cloud Computing", value: 60, color: "bg-[#0b1b3d]/70" },
              { label: "Komunikasi", value: 85, color: "bg-blue-500" },
            ].map((bar, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                {/* Bar Value Tooltip */}
                <span className="text-[10px] font-extrabold text-[#0b1b3d] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {bar.value} Org
                </span>
                {/* Visual Bar */}
                <div
                  style={{ height: `${bar.value}%` }}
                  className={`w-full rounded-t-lg transition-all duration-500 group-hover:brightness-95 ${bar.color}`}
                />
                {/* Label */}
                <span className="text-[10px] font-semibold text-slate-500 truncate w-full text-center">
                  {bar.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col h-[360px]">
          <h3 className="font-extrabold text-base text-[#0b1b3d] mb-4">Aktivitas Terkini</h3>
          <div className="flex-1 overflow-y-auto space-y-5 pr-2">
            <div className="flex space-x-3 text-xs">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 shrink-0 ring-4 ring-emerald-50" />
              <div>
                <p className="font-bold text-slate-800">Wildan mempublikasikan berita baru</p>
                <p className="text-slate-500 mt-0.5">&quot;Penerimaan Magang Gelombang 3&quot;</p>
                <p className="text-[9px] text-slate-400 mt-1 font-semibold">5 menit yang lalu</p>
              </div>
            </div>
            <div className="flex space-x-3 text-xs">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1 shrink-0 ring-4 ring-amber-50" />
              <div>
                <p className="font-bold text-slate-800">Pendaftaran Magang masuk (USU)</p>
                <p className="text-slate-500 mt-0.5">A.n. Budi Santoso - Teknik Informatika</p>
                <p className="text-[9px] text-slate-400 mt-1 font-semibold">20 menit yang lalu</p>
              </div>
            </div>
            <div className="flex space-x-3 text-xs">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500 mt-1 shrink-0 ring-4 ring-blue-50" />
              <div>
                <p className="font-bold text-slate-800">Settings diperbarui oleh Super Admin</p>
                <p className="text-slate-500 mt-0.5">Mengubah nomor telepon kontak instansi</p>
                <p className="text-[9px] text-slate-400 mt-1 font-semibold">1 jam yang lalu</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
