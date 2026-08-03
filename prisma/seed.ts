import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@bblsdm.go.id";
  const password = "admin123456";
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  console.log("Seeding database...");

  // Create initial Super Admin
  const admin = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      name: "Super Admin BBLSDM",
      email,
      passwordHash,
      role: "SUPER_ADMIN",
      status: "ACTIVE",
    },
  });

  console.log("-----------------------------------------");
  console.log("Initial Super Admin user created!");
  console.log(`Email: ${admin.email}`);
  console.log(`Password: ${password}`);
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
