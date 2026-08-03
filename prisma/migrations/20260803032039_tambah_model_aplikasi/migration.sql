-- CreateTable
CREATE TABLE "aplikasi" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "logo_id" UUID,
    "description" TEXT NOT NULL,
    "url" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "aplikasi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "aplikasi_slug_key" ON "aplikasi"("slug");

-- CreateIndex
CREATE INDEX "aplikasi_is_active_idx" ON "aplikasi"("is_active");

-- AddForeignKey
ALTER TABLE "aplikasi" ADD CONSTRAINT "aplikasi_logo_id_fkey" FOREIGN KEY ("logo_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
