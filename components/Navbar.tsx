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

  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";

  // Listen to scroll events on Home page to transition the navbar background softly
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    if (isHome) {
      window.addEventListener("scroll", handleScroll);
      handleScroll(); // initial call
    } else {
      setScrolled(true);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

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

  // Determine dynamic classes and positioning for a soft blend
  const headerClass = isHome
    ? (scrolled 
        ? "fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] text-slate-600"
        : "fixed top-0 left-0 right-0 z-50 bg-transparent border-transparent shadow-none text-slate-200")
    : "sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] text-slate-600";

  const brandTitleClass = scrolled ? "text-[#0b1b3d]" : "text-white";
  const brandSubClass = scrolled ? "text-slate-400" : "text-slate-400";
  const navLinkClass = (active: boolean) => {
    if (active) return "text-[#0284c7]";
    return scrolled 
      ? "text-slate-600 hover:text-[#0284c7]" 
      : "text-slate-200 hover:text-white";
  };

  return (
    <header className={`w-full transition-all duration-300 ${headerClass}`}>
      {/* Main Navbar */}
      <div className="flex items-center justify-between px-4 py-3.5 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Logo and Brand Title */}
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src="/logo%20komdigi.png"
            alt="Logo Komdigi"
            className="w-10 h-10 object-contain shrink-0"
          />
          <div>
            <div className={`text-xs font-extrabold leading-tight tracking-wider uppercase transition-colors duration-300 ${brandTitleClass}`}>
              BBLSDM Komdigi
            </div>
            <div className={`text-[10px] font-semibold leading-none tracking-wide transition-colors duration-300 ${brandSubClass}`}>
              Kota Medan
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex lg:items-center lg:gap-1 font-sans">
          {menuItems.map((item) => {
            const hasSub = !!item.submenu;
            const active = isLinkActive(item);

            if (!hasSub) {
              return (
                <Link
                  key={item.name}
                  href={item.href!}
                  className={`relative px-3.5 py-2 text-xs font-bold tracking-wider uppercase transition-colors duration-200 ${navLinkClass(active)}`}
                >
                  {item.name}
                  {active && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-[#0284c7] rounded-full" />
                  )}
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
                  className={`relative flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold tracking-wider uppercase transition-colors duration-200 ${navLinkClass(active)}`}
                >
                  <span>{item.name}</span>
                  <svg
                    className={`w-3 h-3 transition-transform duration-200 ${
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
                  {active && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-[#0284c7] rounded-full" />
                  )}
                </button>

                {/* Dropdown Menu Container */}
                <div
                  className={`absolute left-0 mt-1 w-52 bg-white border border-slate-100 rounded-lg shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)] py-1.5 z-50 transition-all duration-200 origin-top-left ${
                    activeDropdown === item.name
                      ? "opacity-100 scale-100 translate-y-0 visible"
                      : "opacity-0 scale-95 -translate-y-1 invisible pointer-events-none"
                  }`}
                >
                  {item.submenu!.map((sub) => {
                    const subActive = pathname === sub.href;
                    return (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className={`block px-4 py-2 text-xs font-semibold transition-colors duration-150 ${
                          subActive
                            ? "text-[#0284c7] bg-sky-50/50"
                            : "text-slate-600 hover:text-[#0284c7] hover:bg-slate-50"
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
