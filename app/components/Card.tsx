import Link from "next/link";
import type { ReactNode } from "react";
import Image from "next/image";

/**
 * Reusable Card component — sesuai STYLES.md §3.3
 * - Background putih, soft shadow, garis aksen vertikal biru muda di kiri
 * - Header/judul biru tua, ikon biru muda
 * - Dipakai untuk semua halaman: berita, pengumuman, galeri, pelatihan, dll.
 * - SATU komponen Card — tidak bikin varian baru (Definition of Done)
 */

interface CardProps {
  title?: string;
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
  skeleton?: boolean;
}

export default function Card({
  title = "",
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
  skeleton = false,
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

  // Render Skeleton Loader if skeleton prop is active
  if (skeleton) {
    return (
      <div
        className={`relative bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${className}`}
      >
        {/* Accent line left */}
        <div className="absolute left-0 top-0 w-1 h-full bg-slate-200 rounded-l-xl animate-pulse" />

        {/* Image Placeholder */}
        <div className={`${aspectRatios[imageAspect]} bg-slate-200 animate-pulse relative`} />

        {/* Content Placeholder */}
        <div className="p-5 space-y-4">
          {/* Badge + Date Placeholder */}
          <div className="flex items-center gap-3">
            <div className="h-4.5 w-16 bg-slate-200 rounded-full animate-pulse" />
            <div className="h-3 w-20 bg-slate-100 rounded animate-pulse" />
          </div>

          {/* Title and description placeholder */}
          <div className="flex items-start gap-3">
            {icon && (
              <div className="shrink-0 w-10 h-10 rounded-lg bg-slate-100 animate-pulse" />
            )}
            <div className="flex-1 space-y-3">
              <div className="h-4 bg-slate-200 rounded-md animate-pulse w-3/4" />
              <div className="h-4 bg-slate-200 rounded-md animate-pulse w-1/2" />
              <div className="space-y-2 pt-2">
                <div className="h-3 bg-slate-100 rounded animate-pulse w-full" />
                <div className="h-3 bg-slate-100 rounded animate-pulse w-5/6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const cardContent = (
    <div
      className={`group relative bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-0.5 ${className}`}
    >
      {/* Accent line left */}
      <div className="absolute left-0 top-0 w-1 h-full bg-sky-accent rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Image with background skeleton loading indicator */}
      {image && (
        <div className={`relative ${aspectRatios[imageAspect]} overflow-hidden bg-slate-200 animate-pulse`}>
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
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
