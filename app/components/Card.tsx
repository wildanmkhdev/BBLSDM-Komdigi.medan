import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Reusable Card component — sesuai STYLES.md §3.3
 * - Background putih, soft shadow, garis aksen vertikal biru muda di kiri
 * - Header/judul biru tua, ikon biru muda
 * - Dipakai untuk semua halaman: berita, pengumuman, galeri, pelatihan, dll.
 * - SATU komponen Card — tidak bikin varian baru (Definition of Done)
 */

interface CardProps {
  title: string;
  description?: string;
  image?: string;
  date?: string;
  badge?: string;
  badgeColor?: "gold" | "sky" | "marun";
  href?: string;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
  imageAspect?: "video" | "square" | "wide";
}

export default function Card({
  title,
  description,
  image,
  date,
  badge,
  badgeColor = "gold",
  href,
  icon,
  children,
  className = "",
  imageAspect = "video",
}: CardProps) {
  const badgeColors = {
    gold: "bg-gold/15 text-amber-700",
    sky: "bg-sky-accent/15 text-sky-700",
    marun: "bg-marun/15 text-red-800",
  };

  const aspectRatios = {
    video: "aspect-video",
    square: "aspect-square",
    wide: "aspect-[21/9]",
  };

  const cardContent = (
    <div
      className={`group relative bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-0.5 ${className}`}
    >
      {/* Accent line left */}
      <div className="absolute left-0 top-0 w-1 h-full bg-sky-accent rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Image */}
      {image && (
        <div className={`${aspectRatios[imageAspect]} overflow-hidden bg-offwhite`}>
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        {/* Badge + Date row */}
        {(badge || date) && (
          <div className="flex items-center gap-2 mb-3">
            {badge && (
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${badgeColors[badgeColor]}`}
              >
                {badge}
              </span>
            )}
            {date && (
              <span className="text-xs text-text-muted">{date}</span>
            )}
          </div>
        )}

        {/* Icon + Title */}
        <div className="flex items-start gap-3">
          {icon && (
            <div className="shrink-0 w-10 h-10 rounded-lg bg-sky-accent/10 flex items-center justify-center text-sky-accent">
              {icon}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-navy text-[15px] leading-snug line-clamp-2 group-hover:text-sky-primary transition-colors duration-200">
              {title}
            </h3>
            {description && (
              <p className="mt-2 text-sm text-text-muted leading-relaxed line-clamp-3">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Custom children content */}
        {children && <div className="mt-4">{children}</div>}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
