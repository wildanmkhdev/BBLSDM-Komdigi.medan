import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import prisma from "@/lib/prisma";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  const results: any[] = [];
  try {
    const kunkerDir = path.join(process.cwd(), "public", "kunker-nezar");
    if (!fs.existsSync(kunkerDir)) {
      return NextResponse.json({ error: "Folder public/kunker-nezar tidak ditemukan" }, { status: 404 });
    }

    const files = fs.readdirSync(kunkerDir);
    const imageFiles = files.filter(f => f.toLowerCase().endsWith(".jpeg") || f.toLowerCase().endsWith(".jpg"));

    for (const filename of imageFiles) {
      const filePath = path.join(kunkerDir, filename);
      const fileBuffer = fs.readFileSync(filePath);
      
      const bucket = "images";
      const pathInBucket = `kunker-nezar/${filename}`;
      const newStorageKey = `images/kunker-nezar/${filename}`;

      // Upload ke Supabase Storage (upsert: true agar menimpa jika sudah ada)
      const { error: uploadError } = await supabaseAdmin.storage
        .from(bucket)
        .upload(pathInBucket, fileBuffer, {
          contentType: "image/jpeg",
          upsert: true,
        });

      if (uploadError) {
        results.push({ filename, success: false, error: uploadError.message });
        continue;
      }

      // Ambil public URL dari Supabase
      const { data: urlData } = supabaseAdmin.storage.from(bucket).getPublicUrl(pathInBucket);
      const publicUrl = urlData.publicUrl;

      // Cari media record lama berdasarkan storageKey atau originalName
      const originalStorageKey = `images/${filename}`;
      const mediaRecord = await prisma.media.findFirst({
        where: {
          OR: [
            { storageKey: originalStorageKey },
            { storageKey: newStorageKey },
            { originalName: filename }
          ]
        }
      });

      if (mediaRecord) {
        await prisma.media.update({
          where: { id: mediaRecord.id },
          data: {
            publicUrl: publicUrl,
            storageKey: newStorageKey // Update storage key agar tidak bentrok lagi
          }
        });
        results.push({ filename, success: true, action: "updated_db", mediaId: mediaRecord.id, publicUrl });
      } else {
        const newMedia = await prisma.media.create({
          data: {
            originalName: filename,
            storageKey: newStorageKey,
            publicUrl: publicUrl,
            mimeType: "image/jpeg",
            fileSize: BigInt(fileBuffer.length),
            type: "IMAGE"
          }
        });
        results.push({ filename, success: true, action: "created_db", mediaId: newMedia.id, publicUrl });
      }
    }

    return NextResponse.json({ success: true, results });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
