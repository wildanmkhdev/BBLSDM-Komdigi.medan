"use client";



export default function VisiMisi() {
  const misiItems = [
    {
      num: "01",
      title: "Peningkatan Kualitas SDM Digital",
      desc: "Menyelenggarakan program pelatihan, sertifikasi profesi nasional, dan pembekalan literasi digital yang inklusif untuk menghasilkan talenta digital yang kompeten dan siap kerja.",
      icon: (
        <svg className="w-5 h-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      num: "02",
      title: "Riset Kebijakan TIK Berkualitas",
      desc: "Melaksanakan penelitian, kajian ilmiah, serta survei komprehensif di bidang komunikasi dan teknologi informasi guna memberikan rekomendasi kebijakan publik berbasis bukti (evidence-based policy).",
      icon: (
        <svg className="w-5 h-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      num: "03",
      title: "Kemitraan Strategis Pentahelix",
      desc: "Membangun jejaring kolaborasi harmonis dengan instansi pemerintah daerah, pelaku industri teknologi, universitas/akademisi, komunitas digital, dan media massa di wilayah regional.",
      icon: (
        <svg className="w-5 h-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      num: "04",
      title: "Tata Kelola Pemerintahan yang Bersih",
      desc: "Menerapkan prinsip tata pamong perkantoran modern yang transparan, akuntabel, efisien, dan berbasis Sistem Pemerintahan Berbasis Elektronik (SPBE) guna pelayanan publik prima.",
      icon: (
        <svg className="w-5 h-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">


      <main className="flex-grow bg-white">
        {/* Page Header Banner */}
        <section className="bg-slate-50 border-b border-slate-100 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold tracking-widest bg-[#0284c7]/10 text-[#0284c7] uppercase">
              Visi & Misi Resmi
            </div>
            <h1 className="text-3xl font-extrabold text-[#0b1b3d] sm:text-4xl">
              Komitmen Layanan Publik
            </h1>
            <p className="text-sm text-slate-500 max-w-2xl mx-auto">
              Landasan filosofis dan pedoman aksi strategis BBLSDM Komdigi Medan dalam mempercepat agenda transformasi masyarakat digital.
            </p>
            <div className="w-12 h-1 bg-[#0284c7] mx-auto rounded-full mt-4"></div>
          </div>
        </section>

        {/* Vision Statement (Highlight container) */}
        <section className="py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden bg-gradient-to-r from-[#0b1b3d] to-[#122e66] text-white rounded-2xl shadow-xl p-8 sm:p-12 md:p-16 border-l-8 border-[#38bdf8]">
              
              {/* Abs grid pattern */}
              <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:16px_16px]" />
              
              <div className="relative z-10 max-w-3xl space-y-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 uppercase">
                  Visi Instansi
                </span>
                
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight text-white tracking-tight">
                  “Mewujudkan Sumber Daya Manusia Bidang Komunikasi dan Informatika yang Unggul, Inovatif, dan Berkarakter di Wilayah Kerja Sumatera Utara dan Sekitarnya.”
                </h2>
                
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                  Dirumuskan sejalan dengan peta jalan transformasi digital kementerian untuk mengintegrasikan potensi regional ke dalam arus pertumbuhan ekonomi digital nasional yang merdeka dan berkepribadian.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Statements (Clean Grid Layout) */}
        <section className="py-20 bg-slate-50 border-t border-slate-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
              <h2 className="text-xs font-bold tracking-widest text-[#0284c7] uppercase">Aksi Strategis</h2>
              <p className="text-2xl font-extrabold text-[#0b1b3d] sm:text-3xl">Misi BBLSDM Komdigi Medan</p>
              <div className="w-12 h-0.5 bg-[#0284c7] mx-auto rounded-full mt-3"></div>
            </div>

            {/* Grid layout presisi & rapi */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {misiItems.map((misi, i) => (
                <div
                  key={i}
                  className="relative group bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden"
                >
                  {/* Left accent border */}
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#38bdf8]"></div>
                  
                  <div className="p-8 space-y-6">
                    <div className="flex items-center justify-between">
                      {/* Circle Number and Icon */}
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-extrabold text-[#0284c7] bg-sky-50 px-2.5 py-1 rounded">
                          {misi.num}
                        </span>
                        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-sky-50/50">
                          {misi.icon}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-base font-bold text-[#0b1b3d] group-hover:text-[#0284c7] transition-colors">
                        {misi.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {misi.desc}
                      </p>
                    </div>
                  </div>

                  {/* Foot badge */}
                  <div className="px-8 pb-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Pilar Strategis Ke-{misi.num}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>


    </div>
  );
}
