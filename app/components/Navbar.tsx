"use client";

import Link from "next/link";
import { useState } from "react";

/*
 * ⚠️ PLACEHOLDER NAVBAR — milik branch `wildan`
 * Komponen ini akan di-replace saat branch wildan merge.
 * Branch ridho TIDAK BOLEH mengedit source navbar final.
 */

interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  { label: "Beranda", href: "/" },
  {
    label: "Profil",
    children: [
      { label: "Sejarah", href: "/profil/sejarah" },
      { label: "Visi & Misi", href: "/profil/visi-misi" },
      { label: "Struktur Organisasi", href: "/profil/struktur-organisasi" },
      { label: "Tugas dan Fungsi", href: "/profil/tugas-fungsi" },
      { label: "Wilayah Kerja", href: "/profil/wilayah-kerja" },
    ],
  },
  {
    label: "Informasi",
    children: [
      { label: "Berita", href: "/informasi/berita" },
      { label: "Pengumuman", href: "/informasi/pengumuman" },
      { label: "Galeri", href: "/informasi/galeri" },
    ],
  },
  {
    label: "Layanan",
    children: [
      { label: "Pelatihan", href: "/layanan/pelatihan" },
      { label: "Pengajuan Magang", href: "/layanan/magang" },
      { label: "FAQ", href: "/layanan/faq" },
      { label: "Feedback", href: "/layanan/feedback" },
    ],
  },
  {
    label: "Publikasi",
    children: [
      { label: "LAKIP", href: "/publikasi/lakip" },
      { label: "LAPTAH", href: "/publikasi/laptah" },
      { label: "ICT Indikator", href: "/publikasi/ict-indikator" },
      { label: "Penelitian", href: "/publikasi/penelitian" },
      { label: "Buku Putih", href: "/publikasi/buku-putih" },
    ],
  },
  {
    label: "Statistik",
    children: [
      { label: "Kinerja", href: "/statistik/kinerja" },
      { label: "Peserta Pelatihan", href: "/statistik/peserta" },
      { label: "Infografis", href: "/statistik/infografis" },
    ],
  },
  { label: "Kontak", href: "/kontak" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-navy/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-navy to-sky-accent flex items-center justify-center">
              <span className="text-white font-bold text-sm">BB</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-navy font-bold text-sm leading-tight block">
                BBLSDM
              </span>
              <span className="text-text-muted text-xs leading-tight block">
                Komdigi Medan
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className="px-3 py-2 text-[13px] uppercase font-medium text-text-muted hover:text-sky-accent transition-colors duration-200 flex items-center gap-1">
                    {item.label}
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === item.label ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Dropdown */}
                  <div
                    className={`absolute top-full left-0 mt-0 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 transition-all duration-200 ${
                      openDropdown === item.label
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-text-muted hover:text-sky-accent hover:bg-sky-accent/5 transition-colors duration-150"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  className="px-3 py-2 text-[13px] uppercase font-medium text-text-muted hover:text-sky-accent transition-colors duration-200"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-navy"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <button
                    className="w-full text-left px-3 py-2.5 text-sm font-medium text-navy flex items-center justify-between"
                    onClick={() =>
                      setOpenDropdown(openDropdown === item.label ? null : item.label)
                    }
                  >
                    {item.label}
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${openDropdown === item.label ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openDropdown === item.label && (
                    <div className="pl-6 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-3 py-2 text-sm text-text-muted hover:text-sky-accent transition-colors"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  className="block px-3 py-2.5 text-sm font-medium text-navy hover:text-sky-accent transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
}
