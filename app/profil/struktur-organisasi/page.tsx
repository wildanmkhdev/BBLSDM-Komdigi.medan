"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

interface RoleNode {
  id: string;
  title: string;
  name: string;
  category: string;
  tugas: string[];
  fungsi: string[];
  subordinates?: string[];
}

export default function StrukturOrganisasi() {
  // Hardcoded details for each position node
  const roles: Record<string, RoleNode> = {
    kepala: {
      id: "kepala",
      title: "Kepala BBLSDM Komdigi Medan",
      name: "Dr. Ir. H. Syarifuddin Harahap, M.Si",
      category: "Pimpinan Tinggi",
      tugas: [
        "Memimpin, membina, dan mengendalikan pelaksanaan tugas pokok BBLSDM Komdigi Medan.",
        "Menetapkan rencana strategis operasional, arah kebijakan diklat dan penelitian komunikasi digital regional.",
        "Membangun hubungan sinergi koordinasi tingkat tinggi dengan kementerian pusat, pemerintah provinsi/daerah, dan industri.",
      ],
      fungsi: [
        "Perumusan rencana strategis kerja balai besar.",
        "Pelaksanaan koordinasi kemitraan lintas sektor (pemerintah, bisnis, akademisi).",
        "Pengawasan kepatuhan hukum, efisiensi anggaran, dan pencapaian IKU (Indikator Kinerja Utama) instansi.",
      ],
      subordinates: ["umum", "fungsional", "pelatihan", "penelitian"],
    },
    umum: {
      id: "umum",
      title: "Kepala Subbagian Umum",
      name: "Dra. Herlina Lubis, M.AP",
      category: "Administrasi",
      tugas: [
        "Mengelola urusan administrasi persuratan, kearsipan, rumah tangga kantor, dan kepegawaian internal BBLSDM.",
        "Menyusun pelaporan keuangan berkala, koordinasi realisasi anggaran DIPA kantor.",
        "Menyelenggarakan urusan logistik sarana prasarana serta fasilitas gedung balai pelatihan.",
      ],
      fungsi: [
        "Pelayanan administrasi perkantoran terpadu.",
        "Pengelolaan keuangan, perbendaharaan, pembukuan keuangan negara.",
        "Fasilitasi pemeliharaan sarana prasarana dan inventarisasi aset negara (BMN).",
      ],
    },
    fungsional: {
      id: "fungsional",
      title: "Ketua Kelompok Jabatan Fungsional",
      name: "Rahmat Hidayat, S.Kom, M.T (Pranata Komputer Madya)",
      category: "Keahlian Spesifik",
      tugas: [
        "Mengoordinasikan pelaksanaan tugas teknis keahlian tertentu seperti Statistisi, peneliti, pranata komputer, widyaiswara, dan perancang kebijakan.",
        "Memberikan telaahan kajian mandiri teknis kepada kepala balai terkait isu krusial telekomunikasi regional.",
        "Mengembangkan inovasi program diklat berdasarkan riset kebutuhan keterampilan digital riil.",
      ],
      fungsi: [
        "Pemberian dukungan keahlian keprofesian terpadu.",
        "Pengembangan kompetensi teknis mandiri fungsional.",
        "Penyusunan laporan kajian kepakaran periodik.",
      ],
    },
    pelatihan: {
      id: "pelatihan",
      title: "Ketua Tim Kerja Pelatihan & Sertifikasi",
      name: "Faisal Fahmi, S.Sos, M.I.Kom",
      category: "Layanan Teknis",
      tugas: [
        "Menyusun kurikulum, modul, silabus, dan jadwal pelaksanaan pelatihan digital bagi aparatur negara maupun masyarakat umum.",
        "Melakukan seleksi peserta dan instruktur berkualitas tinggi guna program sertifikasi standar BNSP.",
        "Melaksanakan sertifikasi kompetensi keahlian kerja digital secara terpadu.",
      ],
      fungsi: [
        "Penyelenggaraan pelatihan kompetensi TIK terpadu.",
        "Pelaksanaan uji kompetensi sertifikasi profesi.",
        "Evaluasi efektivitas pasca-pelatihan alumni digital.",
      ],
    },
    penelitian: {
      id: "penelitian",
      title: "Ketua Tim Kerja Penelitian & Pengembangan",
      name: "Dr. Rizky Ananda Siregar, M.Si",
      category: "Layanan Riset",
      tugas: [
        "Merencanakan, mengorganisasikan, dan mengawasi jalannya riset komunikasi, survei penetrasi internet, serta kajian kebijakan komunikasi digital.",
        "Membuat laporan hasil riset akademis berkala yang diterbitkan di jurnal terakreditasi.",
        "Menyediakan data statistik indikator kinerja TIK tingkat regional.",
      ],
      fungsi: [
        "Penyusunan metodologi dan instrumen riset daerah.",
        "Pengumpulan, pengolahan, dan analisis data primer/sekunder.",
        "Fasilitasi publikasi diseminasi hasil kajian kepada stakeholder.",
      ],
    },
  };

  // State to hold selected node for Tugas & Fungsi description
  const [selectedRoleId, setSelectedRoleId] = useState<string>("kepala");
  const selectedRole = roles[selectedRoleId];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow bg-white">
        {/* Header Section */}
        <section className="bg-slate-50 border-b border-slate-100 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold tracking-widest bg-[#0284c7]/10 text-[#0284c7] uppercase">
              Struktur Kepemimpinan
            </div>
            <h1 className="text-3xl font-extrabold text-[#0b1b3d] sm:text-4xl">
              Struktur Organisasi BBLSDM Komdigi Medan
            </h1>
            <p className="text-sm text-slate-500 max-w-2xl mx-auto">
              Klik pada kotak jabatan di bagan hierarki interaktif di bawah untuk melihat rincian nama pejabat, tugas pokok, serta fungsi utama secara komprehensif.
            </p>
            <div className="w-12 h-1 bg-[#0284c7] mx-auto rounded-full mt-4"></div>
          </div>
        </section>

        {/* Interactive Tree and Details Section */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

              {/* Bagan Tree Hierarki (Left - 7 cols) */}
              <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col items-center space-y-8 relative">

                {/* Level 1: Kepala Balai */}
                <div className="w-full flex justify-center">
                  <button
                    onClick={() => setSelectedRoleId("kepala")}
                    className={`w-64 p-4 rounded-xl border-2 text-center transition-all duration-300 shadow-sm hover:shadow-md ${selectedRoleId === "kepala"
                        ? "bg-[#0b1b3d] text-white border-[#0284c7] scale-105"
                        : "bg-white text-slate-800 border-slate-200 hover:border-slate-300"
                      }`}
                  >
                    <span className="block text-[10px] font-bold tracking-widest uppercase opacity-75 mb-1">
                      Kepala Balai Besar
                    </span>
                    <span className="block text-xs font-extrabold leading-snug">
                      Dr. Ir. H. Syarifuddin Harahap, M.Si
                    </span>
                  </button>
                </div>

                {/* Vertical Connector Line 1 */}
                <div className="w-0.5 h-6 bg-slate-300"></div>

                {/* Level 2: Subbagian Umum & Kelompok Fungsional (Grid) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-xl relative">

                  {/* Left: Subbagian Umum */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => setSelectedRoleId("umum")}
                      className={`w-full p-4 rounded-xl border-2 text-center transition-all duration-300 shadow-sm hover:shadow-md ${selectedRoleId === "umum"
                          ? "bg-[#0b1b3d] text-white border-[#0284c7] scale-105"
                          : "bg-white text-slate-800 border-slate-200 hover:border-slate-300"
                        }`}
                    >
                      <span className="block text-[10px] font-bold tracking-widest uppercase opacity-75 mb-1">
                        Subbagian Umum
                      </span>
                      <span className="block text-xs font-extrabold leading-snug">
                        Dra. Herlina Lubis, M.AP
                      </span>
                    </button>
                  </div>

                  {/* Right: Kelompok Jabatan Fungsional */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => setSelectedRoleId("fungsional")}
                      className={`w-full p-4 rounded-xl border-2 text-center transition-all duration-300 shadow-sm hover:shadow-md ${selectedRoleId === "fungsional"
                          ? "bg-[#0b1b3d] text-white border-[#0284c7] scale-105"
                          : "bg-white text-slate-800 border-slate-200 hover:border-slate-300"
                        }`}
                    >
                      <span className="block text-[10px] font-bold tracking-widest uppercase opacity-75 mb-1">
                        Kelompok Fungsional
                      </span>
                      <span className="block text-xs font-extrabold leading-snug">
                        Kelompok Ahli Riset/TIK
                      </span>
                    </button>
                  </div>
                </div>

                {/* Vertical Connector Line 2 */}
                <div className="w-0.5 h-6 bg-slate-300"></div>

                {/* Level 3: Tim Kerja (Grid) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-xl relative">

                  {/* Left: Tim Kerja Pelatihan & Sertifikasi */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => setSelectedRoleId("pelatihan")}
                      className={`w-full p-4 rounded-xl border-2 text-center transition-all duration-300 shadow-sm hover:shadow-md ${selectedRoleId === "pelatihan"
                          ? "bg-[#0b1b3d] text-white border-[#0284c7] scale-105"
                          : "bg-white text-slate-800 border-slate-200 hover:border-slate-300"
                        }`}
                    >
                      <span className="block text-[10px] font-bold tracking-widest uppercase opacity-75 mb-1">
                        Tim Kerja Pelatihan
                      </span>
                      <span className="block text-xs font-extrabold leading-snug">
                        Faisal Fahmi, S.Sos, M.I.Kom
                      </span>
                    </button>
                  </div>

                  {/* Right: Tim Kerja Penelitian & Pengembangan */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => setSelectedRoleId("penelitian")}
                      className={`w-full p-4 rounded-xl border-2 text-center transition-all duration-300 shadow-sm hover:shadow-md ${selectedRoleId === "penelitian"
                          ? "bg-[#0b1b3d] text-white border-[#0284c7] scale-105"
                          : "bg-white text-slate-800 border-slate-200 hover:border-slate-300"
                        }`}
                    >
                      <span className="block text-[10px] font-bold tracking-widest uppercase opacity-75 mb-1">
                        Tim Kerja Riset & Litbang
                      </span>
                      <span className="block text-xs font-extrabold leading-snug">
                        Dr. Rizky Ananda Siregar, M.Si
                      </span>
                    </button>
                  </div>
                </div>

                {/* Decorative Help Note */}
                <div className="w-full pt-4 border-t border-slate-200 text-center">
                  <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">
                    * Bagan ini dapat berinteraksi saat diklik
                  </span>
                </div>

              </div>

              {/* Detail Panel Tugas & Fungsi (Right - 5 cols) */}
              <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-6 relative overflow-hidden">
                {/* Decorative border accent left */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#0284c7]"></div>

                {/* Header detail */}
                <div className="space-y-2">
                  <span className="inline-flex px-2 py-0.5 rounded text-[9px] font-extrabold bg-sky-50 text-[#0284c7] uppercase border border-sky-100 tracking-wider">
                    {selectedRole.category}
                  </span>
                  <h2 className="text-lg font-bold text-[#0b1b3d]">
                    {selectedRole.title}
                  </h2>
                  <p className="text-xs text-slate-400 font-medium">
                    Pejabat: <span className="text-slate-700 font-semibold">{selectedRole.name}</span>
                  </p>
                </div>

                <hr className="border-slate-100" />

                {/* Tugas Pokok */}
                <div className="space-y-3">
                  <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#0b1b3d] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-yellow-500 inline-block"></span>
                    Tugas Pokok Jabatan
                  </h3>
                  <ul className="space-y-2 pl-3 list-disc list-outside text-xs text-slate-600 leading-relaxed">
                    {selectedRole.tugas.map((t, idx) => (
                      <li key={idx}>{t}</li>
                    ))}
                  </ul>
                </div>

                {/* Fungsi Utama */}
                <div className="space-y-3">
                  <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#0b1b3d] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#0284c7] inline-block"></span>
                    Fungsi Utama Jabatan
                  </h3>
                  <ul className="space-y-2 pl-3 list-decimal list-outside text-xs text-slate-600 leading-relaxed">
                    {selectedRole.fungsi.map((f, idx) => (
                      <li key={idx}>{f}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 text-[10px] text-slate-400 italic">
                  Data bersumber dari Lampiran SK Organisasi BBLSDM Komdigi Medan.
                </div>

              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
