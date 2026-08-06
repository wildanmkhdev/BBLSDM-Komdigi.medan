-- AlterTable
ALTER TABLE "berita" ADD COLUMN     "og_image_id" UUID;

-- AlterTable
ALTER TABLE "pelatihan" ADD COLUMN     "brochure_id" UUID,
ADD COLUMN     "thumbnail_id" UUID;

-- CreateTable
CREATE TABLE "tags" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(100) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "berita_tags" (
    "berita_id" UUID NOT NULL,
    "tag_id" UUID NOT NULL,

    CONSTRAINT "berita_tags_pkey" PRIMARY KEY ("berita_id","tag_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tags_slug_key" ON "tags"("slug");

-- CreateIndex
CREATE INDEX "berita_tags_tag_id_idx" ON "berita_tags"("tag_id");

-- AddForeignKey
ALTER TABLE "berita" ADD CONSTRAINT "berita_og_image_id_fkey" FOREIGN KEY ("og_image_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "berita_tags" ADD CONSTRAINT "berita_tags_berita_id_fkey" FOREIGN KEY ("berita_id") REFERENCES "berita"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "berita_tags" ADD CONSTRAINT "berita_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pelatihan" ADD CONSTRAINT "pelatihan_thumbnail_id_fkey" FOREIGN KEY ("thumbnail_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pelatihan" ADD CONSTRAINT "pelatihan_brochure_id_fkey" FOREIGN KEY ("brochure_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
