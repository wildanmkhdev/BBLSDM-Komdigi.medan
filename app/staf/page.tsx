"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

interface StaffMember {
  id: string;
  name: string;
  nip: string;
  position: string;
  department: string;
  hierarchyLevel: "Pimpinan" | "Pejabat Administrasi" | "Ketua Tim" | "Staf Fungsional";
  email: string;
  phone: string;
  education: string;
  responsibilities: string[];
  avatarColor: string;
}

export default function DaftarStafPage() {
  const staffList: StaffMember[] = [
    {
      id: "staf-1",
      name: "Dr. Ir. H. Syarifuddin Harahap, M.Si",
      nip: "19680512 199303 1 002",
      position: "Kepala Balai Besar",
      department: "Unsur Kepemimpinan Balai",
      hierarchyLevel: "Pimpinan",
      email: "syarifuddin.harahap@komdigi.go.id",
      phone: "+62 61 7362800",
      education: "S3 Ilmu Komunikasi & Manajemen Publik",
      responsibilities: [
        "Penanggung jawab utama seluruh kegiatan operasional balai besar.",
        "Pengambil keputusan strategis kerja sama lintas instansi dan Pemda.",
        "Supervisi pencapaian indikator kinerja utama balai.",
      ],
      avatarColor: "from-blue-900 to-slate-900",
    },
    {
      id: "staf-2",
      name: "Dra. Herlina Lubis, M.AP",
      nip: "19720814 199803 2 001",
      position: "Kepala Subbagian Umum",
      department: "Subbagian Umum",
      hierarchyLevel: "Pejabat Administrasi",
      email: "herlina.lubis@komdigi.go.id",
      phone: "+62 61 7362801",
      education: "S2 Administrasi Publik",
      responsibilities: [
        "Mengelola tata usaha persuratan, kepegawaian, dan rumah tangga kantor.",
        "Penyusunan anggaran DIPA dan pelaporan keuangan berkala.",
        "Pengelolaan inventaris Barang Milik Negara (BMN).",
      ],
      avatarColor: "from-sky-800 to-indigo-950",
    },
    {
      id: "staf-3",
      name: "Faisal Fahmi, S.Sos, M.I.Kom",
      nip: "19810319 200501 1 003",
      position: "Ketua Tim Kerja Pelatihan & Sertifikasi",
      department: "Tim Kerja Pelatihan",
      hierarchyLevel: "Ketua Tim",
      email: "faisal.fahmi@komdigi.go.id",
      phone: "+62 61 7362802",
      education: "S2 Ilmu Komunikasi",
      responsibilities: [
        "Perencanaan dan pelaksanaan program Digital Talent Scholarship (DTS).",
        "Pengawasan sertifikasi kompetensi standar BNSP.",
        "Koordinasi pengajar, penguji, dan calon peserta diklat.",
      ],
      avatarColor: "from-cyan-800 to-blue-950",
    },
    {
      id: "staf-4",
      name: "Dr. Rizky Ananda Siregar, M.Si",
      nip: "19841105 200812 1 001",
      position: "Ketua Tim Kerja Penelitian & Pengembangan",
      department: "Tim Kerja Riset & Litbang",
      hierarchyLevel: "Ketua Tim",
      email: "rizky.siregar@komdigi.go.id",
      phone: "+62 61 7362803",
      education: "S3 Kajian Media & Komunikasi",
      responsibilities: [
        "Penyusunan metodologi survei indikator TIK regional.",
        "Publikasi jurnal penelitian ilmiah terakreditasi.",
        "Penyusunan naskah kebijakan (white paper) daerah.",
      ],
      avatarColor: "from-blue-950 to-emerald-950",
    },
    {
      id: "staf-5",
      name: "Rahmat Hidayat, S.Kom, M.T",
      nip: "19870922 201012 1 004",
      position: "Pranata Komputer Madya",
      department: "Kelompok Jabatan Fungsional",
      hierarchyLevel: "Staf Fungsional",
      email: "rahmat.hidayat@komdigi.go.id",
      phone: "+62 61 7362804",
      education: "S2 Teknik Informatika",
      responsibilities: [
        "Pengembangan dan pemeliharaan infrastruktur TI balai.",
        "Manajemen jaringan internet dan keamanan server laboratorium.",
        "Integrasi sistem layanan publik dan basis data peserta.",
      ],
      avatarColor: "from-[#0b1b3d] to-[#0284c7]",
    },
    {
      id: "staf-6",
      name: "Nurul Aini, S.Stat, M.Stat",
      nip: "19910411 201403 2 002",
      position: "Statistisi Ahli Muda",
      department: "Kelompok Jabatan Fungsional",
      hierarchyLevel: "Staf Fungsional",
      email: "nurul.aini@komdigi.go.id",
      phone: "+62 61 7362805",
      education: "S2 Statistika Terapan",
      responsibilities: [
        "Pengolahan dan analisis data statistik kinerja diklat.",
        "Penyusunan infografis capaian bulanan dan tahunan.",
        "Validasi instrumen riset komunikasi publik.",
      ],
      avatarColor: "from-indigo-900 to-sky-900",
    },
  ];

  const [selectedDepartment, setSelectedDepartment] = useState<string>("Semua");
  const [selectedStaff, setSelectedStaff] = useState<StaffMember>(staffList[0]);

  const departments = [
    "Semua",
    "Unsur Kepemimpinan Balai",
    "Subbagian Umum",
    "Tim Kerja Pelatihan",
    "Tim Kerja Riset & Litbang",
    "Kelompok Jabatan Fungsional",
  ];

  const filteredStaff = selectedDepartment === "Semua"
    ? staffList
    : staffList.filter((s) => s.department === selectedDepartment);

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Navbar />

      <main className="flex-grow bg-white">
        {/* Header Banner */}
        <section className="bg-slate-50 border-b border-slate-100 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold tracking-widest bg-[#0284c7]/10 text-[#0284c7] uppercase">
              Sumber Daya Manusia
            </div>
            <h1 className="text-3xl font-extrabold text-[#0b1b3d] sm:text-4xl">
              Daftar Staf & Hierarki Jabatan
            </h1>
            <p className="text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Direktori pejabat dan personil BBLSDM Komdigi Medan beserta rincian tugas pokok, kewenangan, serta informasi kontak profesional.
            </p>
            <div className="w-12 h-1 bg-[#0284c7] mx-auto rounded-full mt-4"></div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-6 bg-white border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <span className="text-xs font-bold text-slate-500 mr-2 uppercase tracking-wider shrink-0">
                Unit / Tim Kerja:
              </span>
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedDepartment === dept
                      ? "bg-[#0b1b3d] text-white shadow-sm"
                      : "bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Staff Grid & Detail Panel */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Staff Cards Grid (7 cols) */}
              <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredStaff.map((staff) => {
                  const isSelected = selectedStaff.id === staff.id;
                  return (
                    <div
                      key={staff.id}
                      onClick={() => setSelectedStaff(staff)}
                      className={`cursor-pointer rounded-xl border p-5 transition-all relative overflow-hidden flex flex-col justify-between ${
                        isSelected
                          ? "bg-white border-[#0284c7] shadow-md ring-2 ring-[#0284c7]/20"
                          : "bg-white border-slate-200 hover:border-slate-300 shadow-sm"
                      }`}
                    >
                      {/* Left Accent Bar */}
                      <div
                        className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                          isSelected ? "bg-[#0284c7]" : "bg-[#38bdf8]"
                        }`}
                      ></div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full bg-gradient-to-br ${staff.avatarColor} text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-sm`}
                          >
                            {staff.name
                              .split(" ")
                              .filter((n) => !n.includes(".") && n.length > 1)
                              .slice(0, 2)
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <span className="inline-block text-[9px] font-extrabold uppercase tracking-wider text-[#0284c7] bg-sky-50 px-1.5 py-0.5 rounded">
                              {staff.hierarchyLevel}
                            </span>
                            <h3 className="text-xs font-bold text-[#0b1b3d] leading-snug">
                              {staff.name}
                            </h3>
                          </div>
                        </div>

                        <div>
                          <p className="text-xs font-semibold text-slate-700">
                            {staff.position}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            NIP. {staff.nip}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                        <span className="text-slate-500 font-medium">
                          {staff.department}
                        </span>
                        <span className="text-[#0284c7] font-bold">
                          {isSelected ? "Dipilih ✓" : "Lihat Detail →"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Column: Selected Staff Detail Card (5 cols) */}
              <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-6 sticky top-24 overflow-hidden relative">
                {/* Accent Line */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#0284c7]"></div>

                {/* Header */}
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${selectedStaff.avatarColor} text-white font-black text-base flex items-center justify-center shadow-md`}
                    >
                      {selectedStaff.name
                        .split(" ")
                        .filter((n) => !n.includes(".") && n.length > 1)
                        .slice(0, 2)
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <span className="inline-block text-[10px] font-extrabold uppercase tracking-widest text-[#0284c7] bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                        {selectedStaff.department}
                      </span>
                      <h2 className="text-base font-extrabold text-[#0b1b3d] leading-tight mt-1">
                        {selectedStaff.name}
                      </h2>
                      <p className="text-xs text-slate-500 font-semibold mt-0.5">
                        {selectedStaff.position}
                      </p>
                    </div>
                  </div>
                </div>

                <hr className="border-slate-100" />

                {/* Info Metadata */}
                <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      NIP
                    </span>
                    <span className="font-semibold text-slate-700">
                      {selectedStaff.nip}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Pendidikan
                    </span>
                    <span className="font-semibold text-slate-700">
                      {selectedStaff.education}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Email Kontak
                    </span>
                    <span className="font-semibold text-[#0284c7]">
                      {selectedStaff.email}
                    </span>
                  </div>
                </div>

                {/* Responsibilities / Tugas & Fungsi */}
                <div className="space-y-3">
                  <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#0b1b3d] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#fbbf24] inline-block"></span>
                    Rincian Tugas & Fungsi Jabatan
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-600 pl-3 list-disc list-outside leading-relaxed">
                    {selectedStaff.responsibilities.map((resp, idx) => (
                      <li key={idx}>{resp}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-400 italic text-center">
                  Data Pegawai Resmi BBLSDM Komdigi Medan
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
