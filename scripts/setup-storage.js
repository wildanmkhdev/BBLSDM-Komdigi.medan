/**
 * Script untuk membuat bucket Supabase Storage:
 * - "images"    → untuk semua gambar (jpg, png, webp, gif, svg, dll) — PUBLIC
 * - "documents" → untuk semua dokumen (pdf, docx, xlsx, dll) — PUBLIC
 */

// Load env vars dari .env
const fs = require("fs");
fs.readFileSync(".env", "utf8")
  .split("\n")
  .forEach((line) => {
    const eqIdx = line.indexOf("=");
    if (eqIdx === -1) return;
    const key = line.slice(0, eqIdx).trim();
    const val = line.slice(eqIdx + 1).trim().replace(/^"|"$/g, "");
    if (key && val) process.env[key] = val;
  });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("❌ NEXT_PUBLIC_SUPABASE_URL atau NEXT_PUBLIC_SUPABASE_ANON_KEY tidak ditemukan di .env");
  process.exit(1);
}

async function createBucket(name, isPublic = true) {
  console.log(`\n📦 Membuat bucket "${name}" (public: ${isPublic})...`);

  const response = await fetch(`${SUPABASE_URL}/storage/v1/bucket`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
      "apikey": SUPABASE_ANON_KEY,
    },
    body: JSON.stringify({
      id: name,
      name: name,
      public: isPublic,
      allowed_mime_types: name === "images"
        ? ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml", "image/avif"]
        : ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
      file_size_limit: name === "images" ? 10485760 : 52428800, // 10MB gambar, 50MB dokumen
    }),
  });

  const result = await response.json();

  if (response.ok) {
    console.log(`✅ Bucket "${name}" berhasil dibuat!`);
    console.log(`   Public URL prefix: ${SUPABASE_URL}/storage/v1/object/public/${name}/`);
    return true;
  } else if (result.error === "Bucket already exists") {
    console.log(`ℹ️  Bucket "${name}" sudah ada, skip.`);
    return true;
  } else {
    console.error(`❌ Gagal membuat bucket "${name}":`, result);
    return false;
  }
}

async function listBuckets() {
  const response = await fetch(`${SUPABASE_URL}/storage/v1/bucket`, {
    headers: {
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
      "apikey": SUPABASE_ANON_KEY,
    },
  });
  const buckets = await response.json();
  return buckets;
}

async function main() {
  console.log("🚀 Setup Supabase Storage Buckets");
  console.log(`   Project: ${SUPABASE_URL}`);
  console.log("─".repeat(50));

  // Cek bucket yang sudah ada
  console.log("\n🔍 Mengecek bucket yang sudah ada...");
  const existing = await listBuckets();
  if (Array.isArray(existing) && existing.length > 0) {
    console.log("   Bucket ada:", existing.map(b => b.name).join(", "));
  } else {
    console.log("   Belum ada bucket.");
  }

  // Buat bucket
  const imgOk = await createBucket("images", true);
  const docOk = await createBucket("documents", true);

  console.log("\n" + "─".repeat(50));
  if (imgOk && docOk) {
    console.log("✅ Semua bucket berhasil dibuat!");
    console.log("\n📋 Summary:");
    console.log(`   images    → ${SUPABASE_URL}/storage/v1/object/public/images/`);
    console.log(`   documents → ${SUPABASE_URL}/storage/v1/object/public/documents/`);
  } else {
    console.log("⚠️  Ada bucket yang gagal dibuat. Cek error di atas.");
    process.exit(1);
  }
}

main().catch(console.error);
