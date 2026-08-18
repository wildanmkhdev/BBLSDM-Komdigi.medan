import type { NextConfig } from "next";

// Ambil hostname Supabase secara dinamis dari environment variable
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
let supabaseHost = "nnmsmlyjsdjbfwskimsa.supabase.co"; // fallback default

if (supabaseUrl) {
  try {
    const parsedUrl = new URL(supabaseUrl);
    supabaseHost = parsedUrl.hostname;
  } catch (error) {
    console.warn("Gagal parse NEXT_PUBLIC_SUPABASE_URL di next.config.ts:", error);
  }
}

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        // Supabase Storage CDN untuk gambar yang diupload ke bucket "images" dan "documents"
        protocol: "https",
        hostname: supabaseHost,
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
      {
        // Icons8 untuk logo eksternal aplikasi
        protocol: "https",
        hostname: "img.icons8.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

