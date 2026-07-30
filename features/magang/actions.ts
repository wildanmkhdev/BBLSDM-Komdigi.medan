"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const magangSubmitSchema = z.object({
  fullName: z.string().min(3, "Nama lengkap minimal 3 karakter"),
  email: z.string().email("Format email tidak valid"),
  phone: z.string().min(8, "Nomor telepon minimal 8 karakter"),
  institution: z.string().min(2, "Nama institusi/sekolah minimal 2 karakter"),
  major: z.string().min(2, "Jurusan/prodi wajib diisi"),
  semester: z.string().min(1, "Semester wajib dipilih"),
  periode: z.string().min(1, "Periode magang wajib dipilih"),
  motivation: z.string().min(10, "Motivasi magang minimal 10 karakter"),
  proposalId: z.string().uuid("Wajib mengunggah Surat Pengantar (PDF)").optional().nullable(),
});

export async function getMagangInfo() {
  try {
    let info = await prisma.magangInfo.findFirst({
      where: { id: 1 },
    });

    if (!info) {
      // Seed default record if not exists
      info = await prisma.magangInfo.create({
        data: {
          id: 1,
          description: "Program magang di BBLSDM Komdigi Medan memberikan kesempatan belajar langsung di bidang komunikasi, informatika, dan digital.",
          requirements: "1. Mahasiswa aktif minimal semester 5\n2. Surat pengantar dari Kampus/Sekolah\n3. Transkrip Nilai terakhir",
          procedure: JSON.stringify([
            { step: 1, title: "Isi Formulir", description: "Lengkapi formulir pendaftaran magang online di bawah ini." },
            { step: 2, title: "Verifikasi Berkas", description: "Tim kami akan memverifikasi kelengkapan dan keabsahan berkas Anda." },
            { step: 3, title: "Seleksi", description: "Proses seleksi administrasi dan/atau wawancara jika diperlukan." },
            { step: 4, title: "Pengumuman", description: "Hasil seleksi diumumkan melalui email dan website resmi." },
            { step: 5, title: "Mulai Magang", description: "Lapor diri ke kantor BBLSDM sesuai jadwal yang ditentukan." },
          ]),
          isOpen: true,
        },
      });
    }

    return info;
  } catch (error) {
    console.error("Failed to fetch magang info:", error);
    return null;
  }
}

export async function updateMagangInfo(formData: {
  description: string;
  requirements: string;
  procedureJson: string;
  isOpen: boolean;
}) {
  try {
    await prisma.magangInfo.upsert({
      where: { id: 1 },
      update: {
        description: formData.description,
        requirements: formData.requirements,
        procedure: formData.procedureJson,
        isOpen: formData.isOpen,
      },
      create: {
        id: 1,
        description: formData.description,
        requirements: formData.requirements,
        procedure: formData.procedureJson,
        isOpen: formData.isOpen,
      },
    });
    revalidatePath("/layanan/magang");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Gagal memperbarui info magang" };
  }
}

export async function submitPendaftaranMagang(data: z.infer<typeof magangSubmitSchema>) {
  try {
    const validated = magangSubmitSchema.parse(data);

    // Map selected period string to start/end dates
    let periodStart = new Date("2026-08-01");
    let periodEnd = new Date("2026-10-31");

    if (validated.periode === "november-januari-2027") {
      periodStart = new Date("2026-11-01");
      periodEnd = new Date("2027-01-31");
    } else if (validated.periode === "februari-april-2027") {
      periodStart = new Date("2027-02-01");
      periodEnd = new Date("2027-04-30");
    }

    const application = await prisma.pendaftaranMagang.create({
      data: {
        fullName: validated.fullName,
        email: validated.email,
        phone: validated.phone,
        institution: validated.institution,
        major: validated.major,
        faculty: `Semester ${validated.semester}`,
        periodStart,
        periodEnd,
        motivation: validated.motivation,
        proposalId: validated.proposalId || null,
        status: "PENDING",
        currentStep: 2,
      },
    });

    revalidatePath("/admin/magang");
    return { success: true, application };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.flatten().fieldErrors };
    }
    console.error("Magang submit error:", error);
    return { success: false, error: "Gagal menyimpan pendaftaran magang" };
  }
}

export async function getMagangApplications() {
  try {
    return await prisma.pendaftaranMagang.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        proposal: true,
        suratBalasan: true,
      }
    });
  } catch (error) {
    return [];
  }
}

export async function updateApplicationStatus(id: string, status: "ACCEPTED" | "REJECTED" | "PENDING", rejectionReason?: string) {
  try {
    await prisma.pendaftaranMagang.update({
      where: { id },
      data: { 
        status,
        rejectionReason: status === "REJECTED" ? rejectionReason : null,
        reviewedAt: new Date(),
      },
    });
    revalidatePath("/admin/magang");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Gagal merubah status pendaftaran" };
  }
}
