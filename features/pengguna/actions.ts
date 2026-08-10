"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { auth } from "@/auth";

import {
  userCreateSchema,
  userUpdateSchema,
  type UserCreateInput,
  type UserUpdateInput,
} from "@/validations/pengguna";

// Helper to check for SUPER_ADMIN role of current user
async function requireSuperAdmin() {
  const session = await auth();
  if (!session || session.user?.role !== "SUPER_ADMIN") {
    throw new Error("Unauthorized: Hanya Super Admin yang diperbolehkan.");
  }
  return session.user;
}

// ─── READ ───────────────────────────────────────────────────────────────────────

export async function getUsersList() {
  await requireSuperAdmin();
  try {
    return await prisma.user.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
        lastLoginAt: true,
      },
    });
  } catch (error) {
    console.error("Fetch users error:", error);
    return [];
  }
}

export async function getUserById(id: string) {
  await requireSuperAdmin();
  try {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
      },
    });
  } catch (error) {
    console.error("Fetch user by id error:", error);
    return null;
  }
}

// ─── CREATE ─────────────────────────────────────────────────────────────────────

export async function createUser(data: UserCreateInput) {
  await requireSuperAdmin();
  try {
    const validated = userCreateSchema.parse(data);

    // Check if email already exists
    const existing = await prisma.user.findUnique({
      where: { email: validated.email },
    });
    if (existing) {
      return { success: false, error: { email: ["Email sudah terdaftar"] } };
    }

    const passwordHash = await bcrypt.hash(validated.password, 10);

    const user = await prisma.user.create({
      data: {
        name: validated.name,
        email: validated.email,
        passwordHash,
        role: validated.role,
        status: validated.status,
      },
    });

    revalidatePath("/admin/pengguna");
    revalidatePath("/admin/role");
    return { success: true, user };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.flatten().fieldErrors };
    }
    console.error("Create user error:", error);
    return { success: false, error: "Gagal membuat pengguna" };
  }
}

// ─── UPDATE ─────────────────────────────────────────────────────────────────────

export async function updateUser(id: string, data: UserUpdateInput) {
  await requireSuperAdmin();
  try {
    const validated = userUpdateSchema.parse(data);

    // Check if email belongs to someone else
    const existing = await prisma.user.findUnique({
      where: { email: validated.email },
    });
    if (existing && existing.id !== id) {
      return { success: false, error: { email: ["Email sudah terdaftar oleh pengguna lain"] } };
    }

    const updateData: Record<string, unknown> = {
      name: validated.name,
      email: validated.email,
      role: validated.role,
      status: validated.status,
    };

    if (validated.password) {
      updateData.passwordHash = await bcrypt.hash(validated.password, 10);
    }

    const user = await prisma.user.update({
      where: { id },
      data: updateData as never,
    });

    revalidatePath("/admin/pengguna");
    revalidatePath("/admin/role");
    return { success: true, user };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.flatten().fieldErrors };
    }
    console.error("Update user error:", error);
    return { success: false, error: "Gagal memperbarui pengguna" };
  }
}

// ─── DELETE ─────────────────────────────────────────────────────────────────────

export async function deleteUser(id: string) {
  const currentUser = await requireSuperAdmin();

  if (currentUser.id === id) {
    return { success: false, error: "Anda tidak bisa menghapus akun Anda sendiri." };
  }

  try {
    await prisma.user.delete({ where: { id } });
    revalidatePath("/admin/pengguna");
    revalidatePath("/admin/role");
    return { success: true };
  } catch (error) {
    console.error("Delete user error:", error);
    return { success: false, error: "Gagal menghapus pengguna" };
  }
}

// ─── SWITCH ROLE ────────────────────────────────────────────────────────────────

export async function switchUserRole(id: string, role: "SUPER_ADMIN" | "ADMIN" | "EDITOR" | "AUTHOR" | "USER" | "PEGAWAI") {
  await requireSuperAdmin();
  try {
    await prisma.user.update({
      where: { id },
      data: { role },
    });
    revalidatePath("/admin/pengguna");
    revalidatePath("/admin/role");
    return { success: true };
  } catch (error) {
    console.error("Switch role error:", error);
    return { success: false, error: "Gagal mengubah role pengguna" };
  }
}
