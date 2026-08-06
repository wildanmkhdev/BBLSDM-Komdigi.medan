import { z } from "zod";

export const socialMediaPostSchema = z.object({
  platform: z.enum(["INSTAGRAM", "TIKTOK", "YOUTUBE"]),
  url: z
    .string()
    .min(5, "URL postingan minimal 5 karakter")
    .url("Format URL tidak valid"),
  title: z
    .string()
    .max(255, "Judul video maksimal 255 karakter")
    .optional()
    .nullable()
    .or(z.literal("")),
  caption: z
    .string()
    .optional()
    .nullable()
    .or(z.literal("")),
  isActive: z.boolean().default(true),
});

export type SocialMediaPostFormData = z.infer<typeof socialMediaPostSchema>;



