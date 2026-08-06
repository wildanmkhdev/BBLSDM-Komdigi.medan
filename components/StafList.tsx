import React from "react";
import Image from "next/image";

interface StafItem {
  id: string;
  name: string;
  position: string;
  category: "Struktural" | "Fungsional" | "Peneliti" | "Pelaksana";
  nip?: string;
  pangkat?: string;
  email?: string;
  photoUrl?: string;
  tugasUtama?: string[];
}

interface StafListProps {
  stafData?: StafItem[];
  skeleton?: boolean;
}

export default function StafList({ stafData = [], skeleton = false }: StafListProps) {
  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case "Struktural":
        return "bg-blue-100 text-blue-900 border-blue-200";
      case "Fungsional":
        return "bg-teal-100 text-teal-900 border-teal-200";
      case "Peneliti":
        return "bg-purple-100 text-purple-900 border-purple-200";
      default:
        return "bg-gray-100 text-gray-900 border-gray-200";
    }
  };

  if (skeleton) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((idx) => (
          <div
            key={idx}
            className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            {/* Accent Line Left */}
            <div className="absolute top-0 left-0 h-full w-1 bg-slate-200" />

            <div className="flex flex-col sm:flex-row items-start gap-4">
              {/* Avatar / Photo Placeholder */}
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-slate-200 animate-pulse border border-slate-200" />

              {/* Info Placeholder */}
              <div className="flex-1 space-y-3">
                <div className="h-4.5 w-16 bg-slate-200 rounded-full animate-pulse" />
                <div className="h-4 bg-slate-200 rounded-md animate-pulse w-3/4" />
                <div className="h-3.5 bg-slate-100 rounded-md animate-pulse w-1/2" />
                <div className="h-3 bg-slate-100 rounded-md animate-pulse w-1/3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {stafData.map((staf) => (
        <div
          key={staf.id}
          className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md"
        >
          {/* Accent Line Left */}
          <div className="absolute top-0 left-0 h-full w-1 bg-[#0284c7] transition-all duration-300 group-hover:w-1.5" />

          <div className="flex flex-col sm:flex-row items-start gap-4">
            {/* Avatar / Photo */}
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-slate-100 border border-slate-200">
              {staf.photoUrl ? (
                <div className="relative w-full h-full bg-slate-200 animate-pulse">
                  <Image
                    src={staf.photoUrl}
                    alt={staf.name}
                    fill
                    sizes="80px"
                    className="object-cover animate-none"
                  />
                </div>
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[#0b1b3d] text-white font-bold text-xl">
                  {staf.name.charAt(0)}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${getCategoryBadgeColor(
                    staf.category
                  )}`}
                >
                  {staf.category}
                </span>
              </div>

              <h3 className="text-base font-bold text-[#0b1b3d]">
                {staf.name}
              </h3>
              <p className="text-xs font-semibold text-[#0284c7]">
                {staf.position}
              </p>
              {staf.nip && (
                <p className="text-xs text-slate-500">
                  NIP: {staf.nip}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
