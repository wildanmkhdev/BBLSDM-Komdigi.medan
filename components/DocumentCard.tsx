import React from "react";

interface DocumentCardProps {
  title: string;
  category: string;
  publishDate: string;
  fileSize: string;
  fileFormat: string;
  downloadUrl: string;
  description?: string;
}

export default function DocumentCard({
  title,
  category,
  publishDate,
  fileSize,
  fileFormat,
  downloadUrl,
  description,
}: DocumentCardProps) {
  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      {/* Left accent vertical line */}
      <div className="absolute top-0 left-0 h-full w-[4px] bg-[#00d4ff] transition-all duration-300 group-hover:w-[6px]" />

      <div>
        <div className="flex items-center justify-between gap-4 mb-3">
          <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-[#0a2540] dark:bg-zinc-800 dark:text-zinc-200">
            {category}
          </span>
          <span className="text-xs text-gray-500 dark:text-zinc-400">
            {publishDate}
          </span>
        </div>

        <h3 className="text-base font-bold text-[#0a2540] line-clamp-2 group-hover:text-sky-600 transition-colors duration-300 dark:text-white mb-2">
          {title}
        </h3>

        {description && (
          <p className="text-xs text-gray-600 line-clamp-3 mb-4 leading-relaxed dark:text-zinc-300">
            {description}
          </p>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center rounded bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700 uppercase dark:bg-red-950 dark:text-red-300">
            {fileFormat}
          </span>
          <span className="text-xs text-gray-500 dark:text-zinc-400">
            {fileSize}
          </span>
        </div>

        <a
          href={downloadUrl}
          download
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#00d4ff] px-3.5 py-2 text-xs font-bold text-[#0a2540] shadow-sm transition-all duration-300 hover:bg-[#00b8e6] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:ring-offset-2 active:scale-95"
        >
          {/* Download SVG Icon */}
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Unduh
        </a>
      </div>
    </div>
  );
}
