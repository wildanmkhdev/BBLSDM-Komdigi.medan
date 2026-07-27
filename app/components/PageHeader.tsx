import Link from "next/link";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs: Breadcrumb[];
  className?: string;
}

export default function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  className = "py-14",
}: PageHeaderProps) {
  return (
    <section className={`bg-slate-50 border-b border-slate-100 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm mb-3">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && (
                <svg
                  className="w-3.5 h-3.5 text-slate-400"
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
                  className="text-slate-500 hover:text-[#0284c7] transition-colors duration-200"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-[#0b1b3d] font-semibold">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        {/* Header Content */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black text-[#0b1b3d] tracking-tight">
            {title}
          </h1>
          
          {subtitle && (
            <p className="text-sm sm:text-base text-slate-500 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
