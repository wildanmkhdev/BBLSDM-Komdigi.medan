"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";
import bcrypt from "bcryptjs";

const registerSchema = z.object({
  name: z.string().min(3, "Nama lengkap minimal 3 karakter"),
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(6, "Sandi minimal 6 karakter"),
  confirmPassword: z.string().min(6, "Konfirmasi sandi minimal 6 karakter"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Konfirmasi sandi tidak cocok",
  path: ["confirmPassword"],
});

export async function registerApplicant(data: z.infer<typeof registerSchema>) {
  try {
    const validated = registerSchema.parse(data);

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validated.email },
    });

    if (existingUser) {
      return { success: false, error: { email: ["Email sudah terdaftar di sistem"] } };
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(validated.password, salt);

    // Create user with USER role
    await prisma.user.create({
      data: {
        name: validated.name,
        email: validated.email,
        passwordHash,
        role: "USER",
        status: "ACTIVE",
      },
    });

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.flatten().fieldErrors };
    }
    console.error("Register user error:", error);
    return { success: false, error: "Terjadi kesalahan server saat pendaftaran" };
  }
}
