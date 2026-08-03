import { z } from "zod";

export const aplikasiSchema = z.object({
  name: z
    .string()
    .min(3, "Nama aplikasi minimal 3 karakter")
    .max(255, "Nama aplikasi maksimal 255 karakter"),
  description: z
    .string()
    .min(10, "Deskripsi minimal 10 karakter"),
  logoId: z
    .string()
    .uuid("Logo tidak valid")
    .optional()
    .nullable(),
  url: z
    .string()
    .optional()
    .or(z.literal("")),
  isActive: z.boolean().default(true),
});

export type AplikasiFormData = z.infer<typeof aplikasiSchema>;
