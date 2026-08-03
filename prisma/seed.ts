import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const salt = await bcrypt.genSalt(10);

  console.log("Seeding database...");

  // 1. Create initial Users
  const superAdminEmail = "superadmin@bblsdm.go.id";
  const superAdminPasswordHash = await bcrypt.hash("superadmin123", salt);
  const superAdmin = await prisma.user.upsert({
    where: { email: superAdminEmail },
    update: {},
    create: {
      name: "Super Admin BBLSDM",
      email: superAdminEmail,
      passwordHash: superAdminPasswordHash,
      role: "SUPER_ADMIN",
      status: "ACTIVE",
    },
  });

  const adminEmail = "admin@bblsdm.go.id";
  const adminPasswordHash = await bcrypt.hash("admin123", salt);
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: "Admin BBLSDM",
      email: adminEmail,
      passwordHash: adminPasswordHash,
      role: "ADMIN",
      status: "ACTIVE",
    },
  });

  const editorEmail = "editor@bblsdm.go.id";
  const editorPasswordHash = await bcrypt.hash("editor123", salt);
  const editor = await prisma.user.upsert({
    where: { email: editorEmail },
    update: {},
    create: {
      name: "Editor BBLSDM",
      email: editorEmail,
      passwordHash: editorPasswordHash,
      role: "EDITOR",
      status: "ACTIVE",
    },
  });

  // 2. Create Mock Media Records for Slider & Cover Images
  const mediaUrls = [
    {
      originalName: "kunker-nezar-1.jpeg",
      publicUrl: "/kunker-nezar/kunker-nezar-1.jpeg",
      storageKey: "images/kunker-nezar-1.jpeg",
    },
    {
      originalName: "kunker-nezar-2.jpeg",
      publicUrl: "/kunker-nezar/kunker-nezar-2.jpeg",
      storageKey: "images/kunker-nezar-2.jpeg",
    },
    {
      originalName: "kunker-nezar-3.jpeg",
      publicUrl: "/kunker-nezar/kunker-nezar-3.jpeg",
      storageKey: "images/kunker-nezar-3.jpeg",
    },
  ];

  const dbMedia = [];
  for (const m of mediaUrls) {
    const record = await prisma.media.upsert({
      where: { storageKey: m.storageKey },
      update: {},
      create: {
        originalName: m.originalName,
        storageKey: m.storageKey,
        publicUrl: m.publicUrl,
        mimeType: "image/jpeg",
        fileSize: BigInt(102400),
        type: "IMAGE",
      },
    });
    dbMedia.push(record);
  }

  // 3. Seed Banners for Hero Slider
  const banners = [
    {
      accentBadge: "SIARAN PERS",
      title: "Kemkomdigi Hormati Putusan MK, Siap Kaji Aturan Sisa Kuota Internet",
      subtitle: "Kementerian Komunikasi dan Digital menyambut baik putusan Mahkamah Konstitusi serta berkomitmen mengkaji regulasi sisa kuota data internet.",
      ctaText: "Baca Selengkapnya",
      ctaLink: "/informasi/berita",
      orderIndex: 0,
      imageId: dbMedia[0].id,
    },
    {
      accentBadge: "KUNJUNGAN KERJA",
      title: "Kunjungan Kerja Wamenkomdigi Nezar Patria ke BBLSDM Medan",
      subtitle: "Wakil Menteri Komunikasi dan Digital dorong percepatan talenta digital nasional di BBLSDM Komdigi Medan, Sumatera Utara.",
      ctaText: "Baca Selengkapnya",
      ctaLink: "/informasi/berita",
      orderIndex: 1,
      imageId: dbMedia[1].id,
    },
    {
      accentBadge: "PROGRAM UTAMA",
      title: "Perluasan Program Pelatihan Digital Talent Scholarship (DTS) 2026",
      subtitle: "BBLSDM Komdigi Medan menyiapkan kuota pelatihan dan sertifikasi gratis bagi masyarakat di 8 provinsi wilayah kerja.",
      ctaText: "Baca Selengkapnya",
      ctaLink: "/layanan/pelatihan",
      orderIndex: 2,
      imageId: dbMedia[2].id,
    },
  ];

  for (const b of banners) {
    await prisma.banner.create({
      data: {
        accentBadge: b.accentBadge,
        title: b.title,
        subtitle: b.subtitle,
        ctaText: b.ctaText,
        ctaLink: b.ctaLink,
        orderIndex: b.orderIndex,
        imageId: b.imageId,
        isActive: true,
      },
    });
  }

  // 4. Seed Kategori Berita
  const catKunker = await prisma.kategoriBerita.upsert({
    where: { slug: "kunjungan-kerja" },
    update: {},
    create: { name: "Kunjungan Kerja", slug: "kunjungan-kerja" },
  });

  const catKegiatan = await prisma.kategoriBerita.upsert({
    where: { slug: "kegiatan-upt" },
    update: {},
    create: { name: "Kegiatan UPT", slug: "kegiatan-upt" },
  });

  const catRakor = await prisma.kategoriBerita.upsert({
    where: { slug: "rapat-koordinasi" },
    update: {},
    create: { name: "Rapat Koordinasi", slug: "rapat-koordinasi" },
  });

  // 5. Seed Berita
  const beritaList = [
    {
      title: "Wamenkomdigi Nezar Patria Dorong BBLSDM Komdigi Medan Cetak Developer & Talenta Digital Unggul",
      slug: "wamenkomdigi-nezar-patria-dorong-bblsdm-medan",
      excerpt: "Wakil Menteri Komunikasi dan Digital RI Nezar Patria melakukan kunjungan kerja ke BBLSDM Komdigi Medan. Beliau menegaskan pengembangan talenta digital merupakan pilar utama Renstra.",
      content: "Wakil Menteri Komunikasi dan Digital RI Nezar Patria melakukan kunjungan kerja ke BBLSDM Komdigi Medan. Beliau menegaskan pengembangan talenta digital merupakan pilar utama Renstra Kementerian Komdigi 2025-2029 'Terhubung, Tumbuh, dan Terjaga' agar Indonesia tidak hanya menjadi pasar melainkan pencipta teknologi.",
      authorName: "Humas BBLSDM Medan",
      kategoriId: catKunker.id,
      thumbnailId: dbMedia[0].id,
      isFeatured: true,
    },
    {
      title: "Penandatanganan Komitmen Strategis Penguatan SDM Digital Wilayah Sumatera",
      slug: "penandatanganan-komitmen-strategis-penguatan-sdm-digital",
      excerpt: "Wamenkomdigi Nezar Patria didampingi Plt. Kepala BBLSDM Komdigi Medan merumuskan langkah taktis penguatan kapasitas digital di Sumatera.",
      content: "Wamenkomdigi Nezar Patria didampingi Plt. Kepala BBLSDM Komdigi Medan Dr. Christiany Juditha merumuskan langkah taktis penguatan kapasitas digital di 8 provinsi wilayah kerja BBLSDM Medan.",
      authorName: "Humas BBLSDM Medan",
      kategoriId: catKegiatan.id,
      thumbnailId: dbMedia[1].id,
      isFeatured: false,
    },
    {
      title: "Rapat Koordinasi Strategis BBLSDM Komdigi Medan bersama Wamenkomdigi RI",
      slug: "rapat-koordinasi-strategis-bblsdm-komdigi-medan",
      excerpt: "Pembahasan capaian program Digital Talent Scholarship (DTS) dan perluasan kerja sama dengan pemerintah daerah serta perguruan tinggi.",
      content: "Pembahasan capaian program Digital Talent Scholarship (DTS) dan perluasan kerja sama dengan pemerintah daerah serta perguruan tinggi di Sumatera.",
      authorName: "Humas BBLSDM Medan",
      kategoriId: catRakor.id,
      thumbnailId: dbMedia[2].id,
      isFeatured: false,
    },
  ];

  for (const b of beritaList) {
    await prisma.berita.create({
      data: {
        title: b.title,
        slug: b.slug + "-" + Date.now(),
        excerpt: b.excerpt,
        content: b.content,
        authorName: b.authorName,
        kategoriId: b.kategoriId,
        thumbnailId: b.thumbnailId,
        status: "PUBLISHED",
        isFeatured: b.isFeatured,
        publishedAt: new Date(),
      },
    });
  }

  // 6. Seed Pengumuman
  const pengumumanList = [
    {
      title: "Pendaftaran Digital Talent Scholarship (DTS) 2026 Resmi Dibuka",
      category: "Pelatihan",
      content: "BBLSDM Komdigi Medan membuka pendaftaran program Digital Talent Scholarship (DTS) 2026. Tersedia berbagai akademi seperti VSGA, FGA, dan DEA untuk meningkatkan kecakapan digital masyarakat umum dan profesional.",
      priority: "HIGH" as const,
    },
    {
      title: "Pengumuman Hasil Seleksi Program Magang Mahasiswa Periode Semester Ganjil 2026",
      category: "Rekrutmen & Magang",
      content: "Berikut adalah daftar mahasiswa yang dinyatakan lolos seleksi berkas dan administrasi untuk mengikuti program magang di BBLSDM Komdigi Medan.",
      priority: "NORMAL" as const,
    },
  ];

  for (const p of pengumumanList) {
    await prisma.pengumuman.create({
      data: {
        title: p.title,
        category: p.category,
        content: p.content,
        priority: p.priority,
        isPublished: true,
      },
    });
  }

  // 7. Seed Pelatihan
  const pelatihanList = [
    {
      title: "Pelatihan Pemasaran Digital Dasar (Digital Marketing Basic)",
      categorySlug: "pemasaran",
      categoryLabel: "Pemasaran Digital",
      description: "Pelatihan praktis bagi pelaku UMKM dan pemula untuk menguasai pemasaran digital menggunakan media sosial, e-commerce, dan optimasi konten digital.",
      jadwal: "28 Jul — 30 Jul 2026",
      durasi: "3 Hari (24 JP)",
      kuota: 40,
      terisi: 12,
      status: "OPEN" as const,
      level: "DASAR" as const,
      metode: "Tatap Muka",
      lokasi: "Lab Komputer BBLSDM Komdigi Medan",
      silabus: ["Pengenalan Digital Marketing", "Sosial Media Optimization", "Copywriting Praktis", "E-commerce untuk UMKM"],
      persyaratan: ["Memiliki laptop pribadi", "Memiliki usaha mikro atau sedang merintis", "Usia minimal 18 tahun"],
    },
    {
      title: "Cyber Security Associate & Pengamanan Data Informasi",
      categorySlug: "cyber",
      categoryLabel: "Cyber Security",
      description: "Mempelajari dasar-dasar keamanan jaringan komputer, identifikasi celah keamanan, respons insiden siber, serta proteksi data pribadi di instansi pemerintah.",
      jadwal: "10 Agt — 14 Agt 2026",
      durasi: "5 Hari (40 JP)",
      kuota: 30,
      terisi: 30,
      status: "FULL" as const,
      level: "MENENGAH" as const,
      metode: "Tatap Muka",
      lokasi: "Lab Keamanan Siber, BBLSDM Medan",
      silabus: ["Keamanan Jaringan Dasar", "Identifikasi Celah Keamanan (Vulnerability)", "Kriptografi & Pengamanan Data", "Simulasi Penanganan Insiden Siber"],
      persyaratan: ["Latar belakang IT atau jaringan komputer", "Paham dasar CLI Linux / Bash", "Membawa laptop dengan RAM minimal 8GB"],
    },
  ];

  for (const p of pelatihanList) {
    await prisma.pelatihan.create({
      data: {
        title: p.title,
        categorySlug: p.categorySlug,
        categoryLabel: p.categoryLabel,
        description: p.description,
        jadwal: p.jadwal,
        durasi: p.durasi,
        kuota: p.kuota,
        terisi: p.terisi,
        status: p.status,
        level: p.level,
        metode: p.metode,
        lokasi: p.lokasi,
        silabus: p.silabus,
        persyaratan: p.persyaratan,
      },
    });
  }

  console.log("-----------------------------------------");
  console.log("Super Admin User Created:");
  console.log(`Email: ${superAdmin.email}`);
  console.log("Password: superadmin123");
  console.log("-----------------------------------------");
  console.log("Admin User Created:");
  console.log(`Email: ${admin.email}`);
  console.log("Password: admin123");
  console.log("-----------------------------------------");
  console.log("Editor User Created:");
  console.log(`Email: ${editor.email}`);
  console.log("Password: editor123");
  console.log("-----------------------------------------");
  console.log("Banners, News, Announcements, and Trainings successfully seeded!");
  console.log("-----------------------------------------");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
