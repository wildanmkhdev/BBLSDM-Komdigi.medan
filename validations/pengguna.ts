import { z } from "zod";

const userRoleEnum = z.enum(["SUPER_ADMIN", "ADMIN", "EDITOR", "AUTHOR", "USER", "PEGAWAI"]);
const userStatusEnum = z.enum(["ACTIVE", "INACTIVE"]);

export const userCreateSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter").max(255),
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  role: userRoleEnum,
  status: userStatusEnum,
});

export const userUpdateSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter").max(255),
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter").optional().or(z.literal("")),
  role: userRoleEnum,
  status: userStatusEnum,
});

export type UserCreateInput = z.infer<typeof userCreateSchema>;
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
