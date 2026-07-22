import Link from "next/link";

/*
 * ⚠️ PLACEHOLDER FOOTER — milik branch `wildan`
 * Komponen ini akan di-replace saat branch wildan merge.
 * Branch ridho TIDAK BOLEH mengedit source footer final.
 */

const footerLinks = [
  {
    title: "Profil",
    links: [
      { label: "Sejarah", href: "/profil/sejarah" },
      { label: "Visi & Misi", href: "/profil/visi-misi" },
      { label: "Struktur Organisasi", href: "/profil/struktur-organisasi" },
      { label: "Tugas dan Fungsi", href: "/profil/tugas-fungsi" },
      { label: "Wilayah Kerja", href: "/profil/wilayah-kerja" },
    ],
  },
  {
    title: "Informasi",
    links: [
      { label: "Berita", href: "/informasi/berita" },
      { label: "Pengumuman", href: "/informasi/pengumuman" },
      { label: "Galeri", href: "/informasi/galeri" },
    ],
  },
  {
    title: "Layanan",
    links: [
      { label: "Pelatihan", href: "/layanan/pelatihan" },
      { label: "Pengajuan Magang", href: "/layanan/magang" },
      { label: "FAQ", href: "/layanan/faq" },
      { label: "Feedback", href: "/layanan/feedback" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      {/* Accent line */}
      <div className="h-1 bg-gradient-to-r from-gold via-sky-accent to-gold" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-accent to-sky-primary flex items-center justify-center">
                <span className="text-white font-bold text-sm">BB</span>
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">BBLSDM</h3>
                <p className="text-white/60 text-xs">Komdigi Medan</p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Balai Besar Litbang Sumber Daya Manusia — Kementerian Komunikasi
              dan Digital, Wilayah Medan.
            </p>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-white/90 mb-4">
                {group.title}
              </h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-sky-accent transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-xs">
            © {new Date().getFullYear()} BBLSDM Komdigi Medan. Hak cipta dilindungi.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-white/50 text-xs">
              Kementerian Komunikasi dan Digital
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
