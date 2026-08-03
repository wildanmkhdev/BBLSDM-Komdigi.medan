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
      <div className={`relative ${c.circle} rounded-full overflow-hidden border-[#0284c7]/40 shadow-md bg-slate-100 shrink-0`}>
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
    name: "Yusrizal, S.Kom., M.Kom",
    role: "Kepala Bagian Umum",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop",
  };

  const staff: Member[] = [
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
  ];

  // Gabungkan staf untuk tampilan mobile grid
  const allStaff: Member[] = staff;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="grow">

        {/* ─── Page Title Banner ─── */}
        <PageHeader
          title="Struktur Organisasi"
          subtitle="Bagan hierarki resmi pimpinan dan kelompok jabatan fungsional BBLSDM Komdigi Medan"
          breadcrumbs={[
            { label: "Beranda", href: "/" },
            { label: "Profil", href: "#" },
            { label: "Struktur Organisasi" },
          ]}
          className="pt-28 pb-19 sm:pt-32 sm:pb-23"
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

            <div className="w-px h-8 bg-slate-300" />

            {/* All staff in responsive grid */}
            <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-8 justify-items-center">
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
          <div className="min-w-275 px-8 flex flex-col items-center">

            {/* LEVEL 1: Kepala */}
            <OrgNode member={kepala} size="xl" />
            <VLine h={10} />

            {/* LEVEL 2: Kabag */}
            <OrgNode member={kabag} size="lg" />
            <VLine h={10} />

            {/* Staff Row – 4 orang */}
            <BranchRow members={staff} size="md" px="px-8" />

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
