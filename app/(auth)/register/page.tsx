"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { registerApplicant } from "@/actions/auth";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/layanan/magang";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<Record<string, string[]> | string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError({ confirmPassword: ["Konfirmasi sandi tidak cocok"] });
      setLoading(false);
      return;
    }

    try {
      const res = await registerApplicant({
        name,
        email,
        password,
        confirmPassword,
      });

      if (res.success) {
        router.push(`/login?registered=true&callbackUrl=${encodeURIComponent(callbackUrl)}`);
      } else {
        setError(res.error || "Gagal melakukan pendaftaran.");
      }
    } catch {
      setError("Terjadi kesalahan sistem saat mencoba mendaftar.");
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = () => {
    if (!error) return null;
    if (typeof error === "string") return error;
    
    const values = Object.values(error).flat();
    return values[0] || "Validasi gagal.";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-800">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-950">BBLSDM Komdigi</h2>
            <p className="text-sm text-slate-500 mt-1">Daftar akun pendaftar magang baru</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg font-sans">
              {getErrorMessage()}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nama Lengkap</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-950 text-slate-950 text-sm rounded-lg"
                placeholder="Masukkan nama lengkap Anda"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-950 text-slate-950 text-sm rounded-lg"
                placeholder="nama@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-950 text-slate-950 text-sm rounded-lg"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Konfirmasi Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-950 text-slate-950 text-sm rounded-lg"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-slate-950 hover:bg-slate-800 text-white font-semibold rounded-lg text-sm transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-950 disabled:opacity-50 cursor-pointer mt-2"
            >
              {loading ? "Memproses..." : "Daftar Akun"}
            </button>
          </form>

          <div className="text-center mt-6 text-xs text-slate-500 font-sans">
            Sudah punya akun?{" "}
            <a href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`} className="text-[#0284c7] font-bold hover:underline">
              Masuk di sini
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">Loading...</div>}>
      <RegisterForm />
    </Suspense>
  );
}
