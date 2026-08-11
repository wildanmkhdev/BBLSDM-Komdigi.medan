import { NextResponse } from "next/server";
import { getMagangInfo, submitPendaftaranMagang } from "@/actions/magang";

/**
 * GET /api/magang
 * Mengambil informasi publik magang (deskripsi, syarat, alur pendaftaran, status pendaftaran buka/tutup).
 */
export async function GET() {
  try {
    const info = await getMagangInfo();

    if (!info) {
      return NextResponse.json(
        { success: false, error: "Informasi magang tidak ditemukan" },
        { status: 444 }
      );
    }

    let procedureSteps = [];
    if (info.procedure) {
      try {
        procedureSteps = JSON.parse(info.procedure);
      } catch (e) {
        console.error("Error parsing procedure steps:", e);
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        isOpen: info.isOpen,
        description: info.description,
        requirements: info.requirements,
        procedure: procedureSteps,
        updatedAt: info.updatedAt,
      },
    });
  } catch (error) {
    console.error("GET /api/magang error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengambil data info magang" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/magang
 * Mengirim formulir pendaftaran magang baru.
 * Payload JSON:
 * {
 *   "fullName": "Nama Mahasiswa",
 *   "email": "email@example.com",
 *   "phone": "08123456789",
 *   "institution": "Universitas Sumatra Utara",
 *   "major": "Teknik Informatika",
 *   "semester": "5",
 *   "periode": "agustus-oktober-2026",
 *   "motivation": "Motivasi magang...",
 *   "proposalId": "uuid-media-surat-pengantar" (optional)
 * }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await submitPendaftaranMagang(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Pendaftaran magang berhasil dikirim",
        application: result.application,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/magang error:", error);
    return NextResponse.json(
      { success: false, error: "Format request tidak valid atau gagal memproses pendaftaran" },
      { status: 400 }
    );
  }
}
