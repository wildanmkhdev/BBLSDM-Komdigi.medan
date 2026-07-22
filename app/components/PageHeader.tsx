import Link from "next/link";

/**
 * PageHeader — section header reusable
 * Background gradient biru tua + breadcrumb navigasi
 */

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs: Breadcrumb[];
}

export default function PageHeader({
  title,
  subtitle,
  breadcrumbs,
}: PageHeaderProps) {
  return (
    <section className="relative bg-gradient-to-br from-navy via-navy-light to-navy overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-accent/5 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-accent/5 rounded-full translate-y-1/2 -translate-x-1/4" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-4">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && (
                <svg
                  className="w-3.5 h-3.5 text-white/30"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="text-white/60 hover:text-sky-accent transition-colors duration-200"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-white/90 font-medium">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 text-lg text-white/70 max-w-2xl">{subtitle}</p>
        )}
      </div>

      {/* Bottom accent line */}
      <div className="h-1 bg-gradient-to-r from-sky-accent via-gold to-sky-accent" />
    </section>
  );
}
