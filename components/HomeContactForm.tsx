"use client";

import { FormEvent } from "react";

export default function HomeContactForm() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Pesan terkirim!");
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="name">
          Nama
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full rounded-md border border-slate-300 p-2 focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full rounded-md border border-slate-300 p-2 focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="message">
          Pesan / Pertanyaan
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="w-full rounded-md border border-slate-300 p-2 focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
        ></textarea>
      </div>
      <button
        type="submit"
        className="px-6 py-2 bg-[#0284c7] text-white rounded-md hover:bg-[#0b1b3d] transition-colors cursor-pointer"
      >
        Kirim
      </button>
    </form>
  );
}
