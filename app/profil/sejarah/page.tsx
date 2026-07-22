"use client";



export default function Sejarah() {
  const timelineMilestones = [
    {
      year: "2002",
      title: "Cikal Bakal Pendirian Balai",
      desc: "Berdasarkan penataan kelembagaan Departemen Perhubungan, dibentuk balai pelatihan pos dan telekomunikasi regional di beberapa kota besar, termasuk Medan, untuk membina kecakapan teknis awal aparatur negara.",
    },
    {
      year: "2011",
      title: "Transformasi Menjadi BPPKI",
      desc: "Seiring terbentuknya Kementerian Komunikasi dan Informatika, unit ini berganti nama menjadi Balai Pengkajian dan Pengembangan Komunikasi dan Informatika (BPPKI) Medan dengan fokus riset kebijakan komunikasi publik.",
    },
    {
      year: "2018",
      title: "Pembentukan BBLSDM Kominfo",
      desc: "Peningkatan status kelembagaan menjadi Balai Besar Pengembangan Sumber Daya Manusia dan Penelitian (BBPSDMP) Kominfo Medan. Mulai meluncurkan program pelatihan sertifikasi berskala besar bagi masyarakat umum.",
    },
    {
      year: "2024",
      title: "Rebranding Menjadi BBLSDM Komdigi",
      desc: "Menyesuaikan dengan nomenklatur baru kementerian menjadi Kementerian Komunikasi dan Digital RI, BBLSDM Komdigi Medan berfokus penuh pada pemerataan literasi digital nasional, kecerdasan buatan (AI), keamanan siber, dan riset TIK.",
    },
  ];

  const historicalPhotos = [
    {
      title: "Gedung Kantor Awal Era 2000-an",
      year: "Tahun 2002",
      color: "from-blue-900 to-indigo-950",
      description: "Dokumentasi peresmian gedung administrasi awal di Jl. Tombak, Medan, yang melayani diklat aparatur pos dan telekomunikasi regional.",
    },
    {
      title: "Riset Lapangan Komunikasi Publik",
      year: "Tahun 2012",
      color: "from-sky-900 to-blue-950",
      description: "Tim peneliti BPPKI Medan saat mengumpulkan data penetrasi siaran radio komunitas di wilayah perbatasan Sumatera Utara.",
    },
    {
      title: "Pelatihan Digital Talent Gelombang Pertama",
      year: "Tahun 2019",
      color: "from-cyan-900 to-slate-900",
      description: "Peluncuran program DTS (Digital Talent Scholarship) pertama di Medan, menargetkan 500 lulusan muda siap kerja di bidang IT.",
    },
    {
      title: "Transformasi Lab Riset Komunikasi & TIK",
      year: "Tahun 2025",
      color: "from-blue-950 to-emerald-950",
      description: "Pembukaan fasilitas laboratorium multimedia terpadu yang memfasilitasi sertifikasi profesi keahlian digital masa kini.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">


      <main className="flex-grow bg-white">
        {/* Banner Header */}
        <section className="bg-slate-50 border-b border-slate-100 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold tracking-widest bg-sky-500/10 text-[#0284c7] uppercase">
              Profil Instansi
            </div>
            <h1 className="text-3xl font-extrabold text-[#0b1b3d] sm:text-4xl">
              Sejarah BBLSDM Komdigi Medan
            </h1>
            <p className="text-sm text-slate-500 max-w-2xl mx-auto">
              Perjalanan dedikasi dalam melatih keahlian digital bangsa dan menyediakan data riset TIK berkualitas tinggi di Pulau Sumatera.
            </p>
            <div className="w-12 h-1 bg-[#0284c7] mx-auto rounded-full mt-4"></div>
          </div>
        </section>

        {/* Narrative & Timeline Section */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            {/* Optimized Typography for comfortable reading */}
            <article className="prose prose-slate max-w-none text-slate-700 leading-relaxed font-sans text-sm sm:text-base space-y-6">
              <p className="font-medium text-lg text-[#0b1b3d] leading-relaxed">
                Berdiri di jantung kota Medan, Balai Besar Pengembangan Sumber Daya Manusia dan Penelitian Komunikasi dan Informatika (BBLSDM Komdigi) Medan telah melewati berbagai fase transformasi struktural penting untuk merespons laju teknologi informasi global.
              </p>
              <p>
                Sebagai Unit Pelaksana Teknis (UPT) di bawah Badan Pengembangan Sumber Daya Manusia Kementerian Komunikasi dan Digital Republik Indonesia, BBLSDM Komdigi Medan memiliki peranan strategis dalam memandu ekosistem digital nasional khususnya di wilayah Sumatera Utara, Aceh, Sumatera Barat, Riau, dan Kepulauan Riau.
              </p>
              <p>
                Melalui penggabungan fungsi pelatihan keahlian (diklat) serta penelitian (riset) komunikasi informatika, instansi secara berkelanjutan menyalurkan kontribusi nyata baik berupa penyiapan talenta digital kompeten (melalui sertifikasi nasional) maupun penyusunan rekomendasi kebijakan publik berbasis data riset ilmiah.
              </p>
            </article>

            {/* Chronological Timeline */}
            <div className="mt-20 space-y-12 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:w-0.5 before:bg-slate-200">
              {timelineMilestones.map((milestone, idx) => (
                <div key={idx} className="relative flex flex-col sm:flex-row items-start sm:justify-between group">
                  
                  {/* Timeline dot */}
                  <div className="absolute left-4 sm:left-1/2 w-4 h-4 bg-[#0284c7] rounded-full border-4 border-white shadow -translate-x-1.5 mt-1 z-10 group-hover:scale-125 transition-transform"></div>

                  {/* Year box */}
                  <div className={`pl-10 sm:pl-0 w-full sm:w-[45%] ${idx % 2 === 0 ? "sm:text-right" : "sm:order-2 sm:text-left"}`}>
                    <span className="inline-block px-3 py-1 rounded-md text-xs font-extrabold bg-[#0b1b3d] text-white tracking-wider mb-2">
                      {milestone.year}
                    </span>
                    <h3 className="text-base font-bold text-[#0b1b3d]">{milestone.title}</h3>
                  </div>

                  {/* Spacing card */}
                  <div className="hidden sm:block w-[8%]"></div>

                  {/* Desc box */}
                  <div className={`pl-10 sm:pl-0 w-full sm:w-[45%] ${idx % 2 === 0 ? "sm:order-2" : "sm:text-right"}`}>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2 sm:mt-0">
                      {milestone.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Historical Photo Gallery Grid (Fix from problem statement: tata letak kartu gambar belum rapi) */}
        <section className="py-20 bg-slate-50 border-t border-slate-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
              <h2 className="text-xs font-bold tracking-widest text-[#0284c7] uppercase">Dokumentasi Visual</h2>
              <p className="text-2xl font-extrabold text-[#0b1b3d] sm:text-3xl">Galeri Sejarah Instansi</p>
              <div className="w-12 h-0.5 bg-[#0284c7] mx-auto rounded-full mt-3"></div>
            </div>

            {/* Grid Presisi & Rapi */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {historicalPhotos.map((photo, i) => (
                <div
                  key={i}
                  className="group bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  {/* Decorative visual placeholder representing historical image */}
                  <div className={`h-40 bg-gradient-to-br ${photo.color} relative flex items-center justify-center p-6 text-center text-white/95 overflow-hidden`}>
                    {/* Grid abstract design overlay */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,#fff_1px,transparent_1px)] bg-[size:12px_12px]" />
                    <div className="absolute top-3 right-3 text-[10px] font-bold bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10 uppercase tracking-wider">
                      {photo.year}
                    </div>
                    {/* Standard Icon */}
                    <svg className="absolute bottom-3 left-3 w-5 h-5 text-sky-400 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-xs font-bold uppercase tracking-wider leading-relaxed px-4">
                      {photo.title}
                    </span>
                  </div>
                  
                  {/* Description Box */}
                  <div className="p-5 flex-grow flex flex-col justify-between space-y-3">
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {photo.description}
                    </p>
                    <div className="border-t border-slate-100 pt-3 text-[10px] font-bold text-[#0284c7] uppercase tracking-wide">
                      BBLSDM Arsip Negara
                    </div>
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
