"use client";

import { FormEvent } from "react";

export default function HomeContactForm() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Pesan terkirim!");
  };

  return (
    <form className="space-y-6 w-full" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-bold text-[#0b1b3d] mb-2" htmlFor="name">
          Nama Lengkap
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Masukkan nama lengkap Anda"
          required
          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:border-transparent transition-all duration-150 placeholder:text-slate-400"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-[#0b1b3d] mb-2" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="nama@email.com"
          required
          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:border-transparent transition-all duration-150 placeholder:text-slate-400"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-[#0b1b3d] mb-2" htmlFor="message">
          Pesan / Pertanyaan
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tuliskan pesan atau pertanyaan Anda di sini..."
          required
          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:border-transparent transition-all duration-150 placeholder:text-slate-400 resize-y min-h-[140px]"
        ></textarea>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3.5 bg-[#0284c7] text-white font-bold text-sm rounded-xl hover:bg-[#0b1b3d] shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
        >
          <span>Kirim Pesan</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </form>
  );
}

