import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl) {
  throw new Error("Missing env: NEXT_PUBLIC_SUPABASE_URL harus diisi di .env");
}

/**
 * Client untuk frontend / komponen React (read-only, public access).
 * Gunakan ini hanya untuk membaca data publik.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Client dengan Service Role Key — bypass RLS sepenuhnya.
 * HANYA digunakan di server actions / API routes (tidak pernah di client).
 * Dipakai untuk upload, delete file di Storage.
 */
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

/**
 * Nama bucket Supabase Storage.
 * - "images"    → untuk semua file gambar (jpg, png, webp, gif, svg, dll)
 * - "documents" → untuk semua file dokumen (pdf, docx, xlsx, dll)
 */
export const STORAGE_BUCKETS = {
  IMAGES: "images",
  DOCUMENTS: "documents",
} as const;

export type StorageBucket = (typeof STORAGE_BUCKETS)[keyof typeof STORAGE_BUCKETS];

/**
 * Tentukan bucket yang tepat berdasarkan MIME type file.
 */
export function getBucketForMimeType(mimeType: string): StorageBucket {
  if (mimeType.startsWith("image/")) {
    return STORAGE_BUCKETS.IMAGES;
  }
  return STORAGE_BUCKETS.DOCUMENTS;
}
