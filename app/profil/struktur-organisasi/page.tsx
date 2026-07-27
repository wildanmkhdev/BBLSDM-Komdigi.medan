"use client";

import Image from "next/image";
import PageHeader from "@/app/components/PageHeader";

interface Member {
  name: string;
  role: string;
  avatar: string;
}

type NodeSize = "xl" | "lg" | "md" | "sm";

// ─────────────────────────────────────────────
// Reusable Org Node (circle photo + name + role)
// ─────────────────────────────────────────────
function OrgNode({ member, size = "md" }: { member: Member; size?: NodeSize }) {
  const cfg: Record<NodeSize, { circle: string; name: string; role: string; wrap: string }> = {
    xl:  { circle: "w-24 h-24 border-[3px]", name: "text-sm font-extrabold",   role: "text-[10px]", wrap: "w-36"  },
    lg:  { circle: "w-20 h-20 border-2",     name: "text-xs font-bold",        role: "text-[10px]", wrap: "w-32"  },
    md:  { circle: "w-16 h-16 border-2",     name: "text-[11px] font-bold",    role: "text-[9.5px]", wrap: "w-28" },
    sm:  { circle: "w-12 h-12 border",       name: "text-[9.5px] font-bold",   role: "text-[8px]",  wrap: "w-24" },
  };
  const c = cfg[size];
  return (
    <div className={`flex flex-col items-center text-center ${c.wrap}`}>
      <div className={`relative ${c.circle} rounded-full overflow-hidden border-[#0284c7]/40 shadow-md bg-slate-100 flex-shrink-0`}>
        <Image
          src={member.avatar}
          alt={member.name}
          fill
          sizes="96px"
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="mt-2 px-1 space-y-0.5">
        <p className={`${c.name} text-[#0b1b3d] leading-snug`}>{member.name}</p>
        <p className={`${c.role} text-[#0284c7] leading-tight font-semibold`}>{member.role}</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// A horizontal row of nodes connected by branch lines to a single parent above.
// Uses the "half-border" trick: each item draws left-half + right-half lines
// at top-0, which combine with adjacent items to form a continuous H-line.
// ─────────────────────────────────────────────────────────────────────────────
function BranchRow({
  members,
  size = "md",
  px = "px-5",
}: {
  members: Member[];
  size?: NodeSize;
  px?: string;
}) {
  return (
    <div className="flex justify-center items-start">
      {members.map((member, i) => (
        <div key={i} className={`relative flex flex-col items-center ${px}`}>
          {/* Left half of horizontal connector (skip for first item) */}
          {i > 0 && (
            <div className="absolute top-0 left-0 w-1/2 h-px bg-slate-300" />
          )}
          {/* Right half of horizontal connector (skip for last item) */}
          {i < members.length - 1 && (
            <div className="absolute top-0 right-0 w-1/2 h-px bg-slate-300" />
          )}
          {/* Vertical drop line */}
          <div className="w-px h-8 bg-slate-300" />
          <OrgNode member={member} size={size} />
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// Vertical connector between levels
// ─────────────────────────────────────────────
function VLine({ h = 10 }: { h?: number }) {
  return <div className={`w-px bg-slate-300 mx-auto`} style={{ height: `${h * 4}px` }} />;
}

export default function StrukturOrganisasi() {
  const kepala: Member = {
    name: "Dr. Christiany Juditha S.Sos., M.A.",
    role: "Kepala BBLSDM Komdigi Medan",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop",
  };

  const kabag: Member = {
    name: "Yusrizal, S.Kom., M.Eng",
    role: "Kepala Bagian Umum",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop",
  };

  const staffRow1: Member[] = [
    {
      name: "Ahirinna, S.I.Kom.",
      role: "Fasilitator Kemitraan",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Ghio Vani Debrian Soares, S.Pd.",
      role: "Petugas Standarisasi dan Sertifikasi",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Jarudo Damanik, S.Kom.",
      role: "Analis Perencanaan, Evaluasi dan Pelaporan",
      avatar: "https://images.unsplash.com/photo-1500048993953-d23a436266cf?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Frans Hendra Suryanta Sembiring, ST., M.SM.",
      role: "Pranata Humas Ahli Muda",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Darliandra, S.Stat.",
      role: "Penyusun Bahan Informasi dan Publikasi",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Widia Apri Putri, S.Tr.Kom",
      role: "Petugas Standarisasi dan Sertifikasi",
      avatar: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=200&auto=format&fit=crop",
    },
  ];

  const staffRow2: Member[] = [
    {
      name: "Jesty Meliana Sibarani, S.Akun.",
      role: "Penata Laporan Keuangan",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "M. Fikri Ihsan, SE.",
      role: "Administrasi Keuangan",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Michael Hariara Simanjuntak, S.Akun.",
      role: "Penata Laporan Keuangan",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Safrayuda Andrean, SE.",
      role: "Analis Penjamin Mutu",
      avatar: "https://images.unsplash.com/photo-1489980508314-941910ded1f4?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Ahmad Rozy, S.Kom., M.Kom.",
      role: "Analis Perencanaan dan Evaluasi Pelaporan",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Gusmila Zulidar, SE.",
      role: "Petugas Standarisasi dan Sertifikasi",
      avatar: "https://images.unsplash.com/photo-1594744803329-e58b31de215f?q=80&w=200&auto=format&fit=crop",
    },
  ];

  const staffRow3: Member[] = [
    {
      name: "Prini Zunita, S.Sos., M.S.P.",
      role: "Analis SDM Aparatur",
      avatar: "https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Achmad Ofanny S. Torong, S.E.",
      role: "Penyusun Rencana Kebutuhan RT & Perlengkapan",
      avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Erwin Antonius Manurung, S.T.",
      role: "Analis Data Ilmiah",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Budiman, S.Sos.",
      role: "Analis Data Ilmiah Ahli Madya",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Meilinia Diakonia Ginting, S.Kom.",
      role: "Analis Data Ilmiah",
      avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Ade Gita Ellena Br. Tarigan, S.I.Kom.",
      role: "Penyusun Bahan Informasi & Publikasi",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Ronald Rato Mangapu Limbong, SE.",
      role: "Analis Penjamin Mutu",
      avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Delvi Windrayani, S.I.Kom.",
      role: "Penyusun Bahan Informasi & Publikasi",
      avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=200&auto=format&fit=crop",
    },
  ];

  const staffRow4: Member[] = [
    {
      name: "Fachri Auliansyah, S.Kom.",
      role: "Standarisasi Informatika",
      avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Eki Yoan Meydora, S.I.Kom.",
      role: "Penyusun Bahan Informasi & Publikasi",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Idawati Pandia, S.Sos.",
      role: "Fasilitator Kemitraan",
      avatar: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Arif Rahman, S.Kom.",
      role: "Fasilitator Kemitraan",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "M. Prakoso Prabhaswara, S.Tr.Kom.",
      role: "Ahli Pertama - Instruktur",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Alex Siregar, S.Kom",
      role: "Ahli Pertama - Pranata Komputer",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop",
    },
  ];

  // Gabungkan semua staf untuk tampilan mobile grid
  const allStaff: Member[] = [...staffRow1, ...staffRow2, ...staffRow3, ...staffRow4];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-grow">
        <PageHeader
          title="Struktur Organisasi"
          subtitle="Bagan hierarki resmi Balai Besar Layanan Sumber Daya Manusia Komdigi Medan"
          breadcrumbs={[
            { label: "Beranda", href: "/" },
            { label: "Profil", href: "#" },
            { label: "Struktur Organisasi" },
          ]}
          className="pt-28 pb-[76px] sm:pt-32 sm:pb-[92px]"
        />

        {/* ══════════════════════════════════════════════════════
            MOBILE / TABLET LAYOUT  (< xl / < 1280px)
            Foto lingkaran dalam grid rapi, tanpa garis branch.
            ══════════════════════════════════════════════════════ */}
        <section className="xl:hidden py-12 bg-white">
          <div className="mx-auto max-w-2xl px-4 flex flex-col items-center space-y-10">

            {/* Pimpinan: vertical stack */}
            <div className="flex flex-col items-center space-y-2">
              <OrgNode member={kepala} size="lg" />
              <div className="w-px h-8 bg-slate-300" />
              <OrgNode member={kabag} size="md" />
            </div>

            {/* Banner */}
            <div className="border-2 border-[#0b1b3d] text-[#0b1b3d] px-6 sm:px-10 py-2.5 font-black tracking-[0.2em] text-[11px] sm:text-xs uppercase text-center">
              KELOMPOK JABATAN FUNGSIONAL
            </div>

            {/* All staff in responsive grid */}
            <div className="w-full grid grid-cols-3 gap-x-3 gap-y-8 justify-items-center">
              {allStaff.map((staf, i) => (
                <OrgNode key={i} member={staf} size="sm" />
              ))}
            </div>

            {/* Bottom note */}
            <p className="text-[10px] text-slate-400 text-center pt-4 border-t border-slate-100 w-full">
              Data bersumber dari Struktur Pengurus BBLSDM Komdigi Medan · Foto menggunakan dummy sementara
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            DESKTOP TREE LAYOUT  (≥ xl / ≥ 1280px)
            Bagan pohon hierarki penuh dengan garis branch.
            ══════════════════════════════════════════════════════ */}
        <section className="hidden xl:block py-16 bg-white overflow-x-auto">
          <div className="min-w-[1100px] px-8 flex flex-col items-center">

            {/* LEVEL 1: Kepala */}
            <OrgNode member={kepala} size="xl" />
            <VLine h={10} />

            {/* LEVEL 2: Kabag */}
            <OrgNode member={kabag} size="lg" />
            <VLine h={10} />

            {/* Banner */}
            <div className="border-2 border-[#0b1b3d] text-[#0b1b3d] px-20 py-3 font-black tracking-[0.3em] text-sm uppercase">
              KELOMPOK JABATAN FUNGSIONAL
            </div>
            <VLine h={10} />

            {/* Staff Row 1 – 6 orang */}
            <BranchRow members={staffRow1} size="sm" px="px-5" />
            <div className="my-10" />

            {/* Staff Row 2 – 6 orang */}
            <BranchRow members={staffRow2} size="sm" px="px-5" />
            <div className="my-10" />

            {/* Staff Row 3 – 8 orang */}
            <BranchRow members={staffRow3} size="sm" px="px-3" />
            <div className="my-10" />

            {/* Staff Row 4 – 6 orang */}
            <BranchRow members={staffRow4} size="sm" px="px-5" />

            {/* Bottom note */}
            <div className="mt-16 pt-6 border-t border-slate-100 text-center">
              <p className="text-[10px] text-slate-400">
                Data bersumber dari Struktur Pengurus BBLSDM Komdigi Medan · Foto menggunakan dummy sementara
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
