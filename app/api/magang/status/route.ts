import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * GET /api/magang/status?email=mahasiswa@example.com
 * Mengecek status pendaftaran magang berdasarkan email pendaftar.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Parameter email wajib diisi (contoh: ?email=nama@domain.com)" },
        { status: 400 }
      );
    }

    const application = await prisma.pendaftaranMagang.findFirst({
      where: { email: email.trim() },
      orderBy: { createdAt: "desc" },
      include: {
        proposal: {
          select: {
            id: true,
            originalName: true,
            publicUrl: true,
          },
        },
        suratBalasan: {
          select: {
            id: true,
            originalName: true,
            publicUrl: true,
          },
        },
      },
    });

    if (!application) {
      return NextResponse.json(
        { success: false, error: `Pendaftaran dengan email '${email}' tidak ditemukan` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: application.id,
        fullName: application.fullName,
        email: application.email,
        institution: application.institution,
        major: application.major,
        currentStep: application.currentStep,
        status: application.status,
        rejectionReason: application.rejectionReason,
        periodStart: application.periodStart,
        periodEnd: application.periodEnd,
        proposal: application.proposal,
        suratBalasan: application.suratBalasan,
        createdAt: application.createdAt,
        updatedAt: application.updatedAt,
      },
    });
  } catch (error) {
    console.error("GET /api/magang/status error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengambil status pendaftaran" },
      { status: 500 }
    );
  }
}
