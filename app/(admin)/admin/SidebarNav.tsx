"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarNavProps {
  userRole?: string;
}

export default function SidebarNav({ userRole }: SidebarNavProps) {
  const pathname = usePathname();

  const menuItems = [
    {
      category: "Core",
      items: [
        { name: "Dashboard", href: "/admin", exact: true },
        { name: "Media Library", href: "/admin/media" },
        { name: "Banner Slider", href: "/admin/banner" },
      ],
    },
    {
      category: "Editorial",
      items: [
        { name: "Berita", href: "/admin/berita" },
        { name: "Pengumuman", href: "/admin/pengumuman" },
        { name: "Galeri Album", href: "/admin/galeri" },
        { name: "Pelatihan", href: "/admin/pelatihan" },
        { name: "Katalog Aplikasi", href: "/admin/aplikasi" },
        { name: "Media Sosial", href: "/admin/media-sosial" },
        { name: "Direktori Staf", href: "/admin/staf" },
        { name: "Inbox Magang", href: "/admin/magang" },
      ],
    },
  ];

  const filteredMenuItems = menuItems.map((cat) => {
    if (userRole === "PEGAWAI") {
      return {
        ...cat,
        items: cat.items.filter(
          (item) => item.name === "Dashboard" || item.name === "Katalog Aplikasi"
        ),
      };
    }
    return cat;
  }).filter((cat) => cat.items.length > 0);

  const systemItems = [
    { name: "Manajemen Pengguna", href: "/admin/pengguna" },
    { name: "Manajemen Role", href: "/admin/role" },
  ];

  const isActive = (href: string, exact = false) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <nav className="flex-1 px-4 py-6 space-y-6">
      {filteredMenuItems.map((cat, idx) => (
        <div key={idx} className="space-y-1.5">
          <div className="px-3 text-[10px] font-bold text-slate-400/80 uppercase tracking-widest">
            {cat.category}
          </div>
          <div className="space-y-1">
            {cat.items.map((item) => {
              const active = isActive(item.href, item.exact);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-3 py-2 text-[13px] font-medium rounded-lg transition-all duration-200 ${
                    active
                      ? "bg-white text-[#0b1b3d] shadow-sm font-semibold"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      ))}

      {userRole === "SUPER_ADMIN" && (
        <div className="space-y-1.5 pt-4 border-t border-white/10">
          <div className="px-3 text-[10px] font-bold text-slate-400/80 uppercase tracking-widest">
            Sistem
          </div>
          <div className="space-y-1">
            {systemItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-3 py-2 text-[13px] font-medium rounded-lg transition-all duration-200 ${
                    active
                      ? "bg-white text-[#0b1b3d] shadow-sm font-semibold"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
