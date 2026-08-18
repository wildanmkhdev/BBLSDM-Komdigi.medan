import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("=== MEDIA RECORDS ===");
  const media = await prisma.media.findMany({
    take: 10,
    orderBy: { createdAt: "desc" }
  });
  console.log(JSON.stringify(media, (key, value) => typeof value === 'bigint' ? value.toString() : value, 2));

  console.log("=== BANNERS ===");
  const banners = await prisma.banner.findMany({
    include: { image: true }
  });
  console.log(JSON.stringify(banners, null, 2));

  console.log("=== POPULAR BERITA ===");
  const berita = await prisma.berita.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { viewCount: "desc" },
    take: 4,
    include: { thumbnail: true }
  });
  console.log(JSON.stringify(berita, (key, value) => typeof value === 'bigint' ? value.toString() : value, 2));
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
