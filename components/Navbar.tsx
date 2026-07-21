"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

interface MenuItem {
  name: string;
  href?: string;
  submenu?: { name: string; href: string }[];
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const menuItems: MenuItem[] = [
    { name: "Beranda", href: "/" },
    {
      name: "Profil",
      submenu: [
        { name: "Sejarah", href: "/profil/sejarah" },
        { name: "Visi & Misi", href: "/profil/visi-misi" },
        { name: "Struktur Organisasi", href: "/profil/struktur-organisasi" },
        { name: "Tugas & Fungsi", href: "/profil/tugas-fungsi" },
        { name: "Wilayah Kerja", href: "/profil/wilayah-kerja" },
      ],
    },
    {
      name: "Informasi",
      submenu: [
        { name: "Berita", href: "/informasi/berita" },
        { name: "Pengumuman", href: "/informasi/pengumuman" },
        { name: "Galeri", href: "/informasi/galeri" },
      ],
    },
    {
      name: "Layanan",
      submenu: [
        { name: "Pelatihan", href: "/layanan/pelatihan" },
        { name: "Pengajuan Magang", href: "/layanan/magang" },
        { name: "FAQ", href: "/layanan/faq" },
        { name: "Feedback Comment", href: "/layanan/feedback" },
      ],
    },
    {
      name: "Publikasi",
      submenu: [
        { name: "LAKIP", href: "/publikasi/lakip" },
        { name: "LAPTAH", href: "/publikasi/laptah" },
        { name: "ICT Indikator", href: "/publikasi/ict-indikator" },
        { name: "Penelitian", href: "/publikasi/penelitian" },
        { name: "Buku Putih", href: "/publikasi/buku-putih" },
      ],
    },
    {
      name: "Statistik",
      submenu: [
        { name: "Kinerja", href: "/statistik/kinerja" },
        { name: "Peserta Pelatihan", href: "/statistik/peserta" },
        { name: "Infografis", href: "/statistik/infografis" },
      ],
    },
    { name: "Kontak", href: "/kontak" },
  ];

  // Close menus on path change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const handleDropdownToggle = (menuName: string) => {
    if (activeDropdown === menuName) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(menuName);
    }
  };

  const isLinkActive = (item: MenuItem) => {
    if (item.href) {
      return pathname === item.href;
    }
    if (item.submenu) {
      return item.submenu.some((sub) => pathname === sub.href);
    }
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-sm bg-white">
      {/* Top Banner (Government Brand Identity) */}
      <div className="hidden sm:flex bg-[#0b1b3d] text-white text-[11px] py-1.5 px-6 items-center justify-between border-b border-yellow-500/20 font-medium">
        <div className="flex items-center gap-2">
          {/* Indonesia Flag representation */}
          <span className="inline-block w-4 h-2.5 bg-red-600 border border-white"></span>
          <span className="text-yellow-400">Portal Resmi</span>
          <span className="text-slate-300">|</span>
          <span>Kementerian Komunikasi dan Digital RI</span>
        </div>
        <div className="flex items-center gap-4 text-slate-300">
          <span>Medan, Sumatera Utara</span>
          <span>•</span>
          <span>BBLSDM Komdigi</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="flex items-center justify-between px-4 py-3.5 mx-auto max-w-7xl sm:px-6 lg:px-8 border-b border-navbar-border">
        {/* Logo and Brand Title */}
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src="/logo%20komdigi.png"
            alt="Logo Komdigi"
            className="w-10 h-10 object-contain shrink-0"
          />
          <div>
            <div className="text-xs font-bold leading-tight tracking-wider text-[#0b1b3d] uppercase">
              BBLSDM Komdigi
            </div>
            <div className="text-[10px] font-medium leading-none tracking-wide text-slate-500">
              Kota Medan
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex lg:items-center lg:gap-1.5 font-sans">
          {menuItems.map((item) => {
            const hasSub = !!item.submenu;
            const active = isLinkActive(item);

            if (!hasSub) {
              return (
                <Link
                  key={item.name}
                  href={item.href!}
                  className={`px-3 py-2 text-xs font-bold tracking-wider uppercase transition-colors rounded-md ${
                    active
                      ? "text-[#0284c7] bg-sky-50"
                      : "text-slate-700 hover:text-[#0284c7] hover:bg-slate-50"
                  }`}
                >
                  {item.name}
                </Link>
              );
            }

            return (
              <div
                key={item.name}
                className="relative group/dropdown"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className={`flex items-center gap-1 px-3 py-2 text-xs font-bold tracking-wider uppercase transition-colors rounded-md ${
                    active
                      ? "text-[#0284c7] bg-sky-50"
                      : "text-slate-700 hover:text-[#0284c7] hover:bg-slate-50"
                  }`}
                >
                  <span>{item.name}</span>
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === item.name ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {/* Dropdown Menu Container */}
                <div
                  className={`absolute left-0 mt-1 w-56 bg-white border border-slate-200 rounded-lg shadow-xl py-2 z-50 transition-all duration-200 origin-top-left ${
                    activeDropdown === item.name
                      ? "opacity-100 scale-100 translate-y-0 visible"
                      : "opacity-0 scale-95 -translate-y-1 invisible pointer-events-none"
                  }`}
                >
                  {/* Left accent border */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#38bdf8] rounded-l-lg"></div>
                  
                  {item.submenu!.map((sub) => {
                    const subActive = pathname === sub.href;
                    return (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className={`block px-4 py-2 text-xs font-medium transition-colors ${
                          subActive
                            ? "text-[#0284c7] bg-sky-50/50 font-semibold"
                            : "text-slate-700 hover:text-[#0284c7] hover:bg-slate-50"
                        }`}
                      >
                        {sub.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-[#0b1b3d] hover:bg-slate-100 transition-colors"
          >
            <span className="sr-only">Buka Menu</span>
            {mobileMenuOpen ? (
              <svg
                className="block w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="block w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out border-b border-slate-200 overflow-hidden ${
          mobileMenuOpen ? "max-h-[85vh] opacity-100 visible" : "max-h-0 opacity-0 invisible"
        }`}
      >
        <div className="px-4 py-3 space-y-1 bg-slate-50 max-h-[80vh] overflow-y-auto font-sans">
          {menuItems.map((item) => {
            const hasSub = !!item.submenu;
            const active = isLinkActive(item);
            const isOpen = activeDropdown === item.name;

            if (!hasSub) {
              return (
                <Link
                  key={item.name}
                  href={item.href!}
                  className={`block px-3 py-2 rounded-md text-sm font-bold tracking-wide uppercase transition-colors ${
                    active
                      ? "text-[#0284c7] bg-sky-50"
                      : "text-slate-700 hover:text-[#0284c7] hover:bg-slate-100"
                  }`}
                >
                  {item.name}
                </Link>
              );
            }

            return (
              <div key={item.name} className="space-y-1">
                <button
                  onClick={() => handleDropdownToggle(item.name)}
                  className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-bold tracking-wide uppercase text-left transition-colors ${
                    active
                      ? "text-[#0284c7] bg-sky-50"
                      : "text-slate-700 hover:text-[#0284c7] hover:bg-slate-100"
                  }`}
                >
                  <span>{item.name}</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {/* Submenu links */}
                <div
                  className={`pl-4 border-l border-slate-200 space-y-1 transition-all duration-200 ${
                    isOpen ? "block" : "hidden"
                  }`}
                >
                  {item.submenu!.map((sub) => {
                    const subActive = pathname === sub.href;
                    return (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className={`block px-3 py-2 rounded-md text-xs font-semibold ${
                          subActive
                            ? "text-[#0284c7] bg-sky-50"
                            : "text-slate-600 hover:text-[#0284c7] hover:bg-slate-100"
                        }`}
                      >
                        {sub.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </header>
  );
}
