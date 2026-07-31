"use client";

import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {submitted && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-md font-sans">
          Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.
        </div>
      )}

      <div>
        <label
          className="block text-sm font-medium text-slate-700 mb-1"
          htmlFor="contact-name"
        >
          Nama
        </label>
        <input
          type="text"
          id="contact-name"
          name="name"
          required
          className="w-full rounded-md border border-slate-300 p-2 focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
        />
      </div>

      <div>
        <label
          className="block text-sm font-medium text-slate-700 mb-1"
          htmlFor="contact-email"
        >
          Email
        </label>
        <input
          type="email"
          id="contact-email"
          name="email"
          required
          className="w-full rounded-md border border-slate-300 p-2 focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
        />
      </div>

      <div>
        <label
          className="block text-sm font-medium text-slate-700 mb-1"
          htmlFor="contact-message"
        >
          Pesan / Pertanyaan
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          required
          className="w-full rounded-md border border-slate-300 p-2 focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
        />
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
