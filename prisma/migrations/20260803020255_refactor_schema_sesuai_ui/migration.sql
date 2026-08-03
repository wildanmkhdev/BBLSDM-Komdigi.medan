-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'EDITOR', 'AUTHOR', 'USER');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "ContentStatus" AS ENUM ('DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "PelatihanStatus" AS ENUM ('SEGERA_DIBUKA', 'OPEN', 'FULL');

-- CreateEnum
CREATE TYPE "LevelPelatihan" AS ENUM ('DASAR', 'MENENGAH', 'LANJUTAN');

-- CreateEnum
CREATE TYPE "PriorityLevel" AS ENUM ('HIGH', 'NORMAL');

-- CreateEnum
CREATE TYPE "MagangStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "FeedbackStatus" AS ENUM ('NEW', 'READ', 'PROCESSED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "KontakStatus" AS ENUM ('NEW', 'READ', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "JenisPublikasi" AS ENUM ('LAKIP', 'LAPTAH', 'ICT_INDIKATOR', 'PENELITIAN', 'BUKU_PUTIH');

-- CreateEnum
CREATE TYPE "PeriodeStatistik" AS ENUM ('TRIWULAN_1', 'TRIWULAN_2', 'TRIWULAN_3', 'TRIWULAN_4', 'TAHUNAN', 'SEMESTERAN');

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('IMAGE', 'DOCUMENT', 'VIDEO', 'OTHER');

-- CreateEnum
CREATE TYPE "AuditAction" AS ENUM ('CREATE', 'UPDATE', 'DELETE', 'PUBLISH', 'UNPUBLISH', 'ARCHIVE', 'LOGIN', 'LOGOUT', 'UPLOAD', 'DOWNLOAD', 'ROLE_CHANGE', 'PASSWORD_RESET');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'EDITOR',
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "avatar_url" TEXT,
    "failed_login_count" SMALLINT NOT NULL DEFAULT 0,
    "locked_until" TIMESTAMPTZ,
    "last_login_at" TIMESTAMPTZ,
    "last_login_ip" VARCHAR(45),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_sessions" (
    "id" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "expires" TIMESTAMPTZ NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" BIGSERIAL NOT NULL,
    "user_id" UUID,
    "user_name" VARCHAR(255) NOT NULL,
    "user_email" VARCHAR(255) NOT NULL,
    "action" "AuditAction" NOT NULL,
    "module" VARCHAR(100) NOT NULL,
    "entity_type" VARCHAR(100),
    "entity_id" TEXT,
    "entity_title" TEXT,
    "changes" JSONB,
    "ip_address" VARCHAR(45),
    "user_agent" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "original_name" VARCHAR(500) NOT NULL,
    "storage_key" TEXT NOT NULL,
    "public_url" TEXT NOT NULL,
    "mime_type" VARCHAR(100) NOT NULL,
    "file_size" BIGINT NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "alt_text" TEXT,
    "caption" TEXT,
    "type" "MediaType" NOT NULL,
    "uploaded_by" UUID,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "settings" (
    "id" SMALLINT NOT NULL DEFAULT 1,
    "site_name" VARCHAR(255) NOT NULL,
    "site_description" TEXT,
    "site_logo_id" UUID,
    "site_favicon_id" UUID,
    "contact_address" TEXT,
    "contact_phone" VARCHAR(50),
    "contact_email" VARCHAR(255),
    "contact_hours" VARCHAR(255),
    "contact_maps_url" TEXT,
    "social_instagram" VARCHAR(255),
    "social_facebook" VARCHAR(255),
    "social_youtube" VARCHAR(255),
    "social_twitter" VARCHAR(255),
    "seo_og_image_id" UUID,
    "seo_meta_description" TEXT,
    "announcement_enabled" BOOLEAN NOT NULL DEFAULT false,
    "announcement_text" TEXT,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "updated_by" UUID,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sejarah" (
    "id" SMALLINT NOT NULL DEFAULT 1,
    "content" TEXT NOT NULL,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "updated_at" TIMESTAMPTZ NOT NULL,
    "updated_by" UUID,

    CONSTRAINT "sejarah_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sejarah_photos" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "media_id" UUID NOT NULL,
    "caption" TEXT,
    "order_index" SMALLINT NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sejarah_photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visi_misi" (
    "id" SMALLINT NOT NULL DEFAULT 1,
    "visi" TEXT NOT NULL,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "updated_by" UUID,

    CONSTRAINT "visi_misi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "misi_items" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "content" TEXT NOT NULL,
    "order_index" SMALLINT NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "misi_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unit_kerja" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "code" VARCHAR(50),
    "description" TEXT,
    "order_index" SMALLINT NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "unit_kerja_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jabatan_nodes" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "parent_id" UUID,
    "title" VARCHAR(255) NOT NULL,
    "holder_name" VARCHAR(255),
    "photo_id" UUID,
    "unit_kerja_id" UUID,
    "description" TEXT,
    "level" SMALLINT NOT NULL DEFAULT 0,
    "order_index" SMALLINT NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "jabatan_nodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wilayah_kerja" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "province_name" VARCHAR(255) NOT NULL,
    "office_name" VARCHAR(255) NOT NULL,
    "address" TEXT,
    "phone" VARCHAR(50),
    "email" VARCHAR(255),
    "website_url" TEXT,
    "photo_id" UUID,
    "latitude" DECIMAL(10,7),
    "longitude" DECIMAL(10,7),
    "order_index" SMALLINT NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "wilayah_kerja_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kategori_berita" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(100) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "kategori_berita_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "berita" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(500) NOT NULL,
    "slug" VARCHAR(500) NOT NULL,
    "excerpt" TEXT,
    "content" TEXT NOT NULL,
    "thumbnail_id" UUID,
    "kategori_id" UUID,
    "author_id" UUID,
    "author_name" VARCHAR(255),
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "view_count" BIGINT NOT NULL DEFAULT 0,
    "published_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "berita_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pengumuman" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(500) NOT NULL,
    "category" VARCHAR(100) NOT NULL,
    "content" TEXT NOT NULL,
    "attachment_id" UUID,
    "priority" "PriorityLevel" NOT NULL DEFAULT 'NORMAL',
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "created_by" UUID,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "pengumuman_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "galeri_albums" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(255) NOT NULL,
    "category" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "cover_photo_id" UUID,
    "event_date" DATE,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "created_by" UUID,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "galeri_albums_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "galeri_photos" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "album_id" UUID NOT NULL,
    "media_id" UUID NOT NULL,
    "caption" TEXT,
    "alt_text" TEXT,
    "order_index" SMALLINT NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "galeri_photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pelatihan" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(500) NOT NULL,
    "category_slug" VARCHAR(50) NOT NULL,
    "category_label" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "jadwal" VARCHAR(255) NOT NULL,
    "durasi" VARCHAR(100) NOT NULL,
    "kuota" SMALLINT NOT NULL,
    "terisi" SMALLINT NOT NULL DEFAULT 0,
    "status" "PelatihanStatus" NOT NULL DEFAULT 'SEGERA_DIBUKA',
    "level" "LevelPelatihan" NOT NULL DEFAULT 'DASAR',
    "metode" VARCHAR(100) NOT NULL,
    "lokasi" VARCHAR(255) NOT NULL,
    "silabus" JSONB NOT NULL DEFAULT '[]',
    "persyaratan" JSONB NOT NULL DEFAULT '[]',
    "created_by" UUID,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "pelatihan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "magang_info" (
    "id" SMALLINT NOT NULL DEFAULT 1,
    "description" TEXT NOT NULL,
    "requirements" TEXT,
    "procedure" TEXT,
    "contact_info" TEXT,
    "is_open" BOOLEAN NOT NULL DEFAULT false,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "updated_by" UUID,

    CONSTRAINT "magang_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pendaftaran_magang" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "full_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(50) NOT NULL,
    "institution" VARCHAR(255) NOT NULL,
    "faculty" VARCHAR(255),
    "major" VARCHAR(255),
    "student_id" VARCHAR(100),
    "period_start" DATE NOT NULL,
    "period_end" DATE NOT NULL,
    "motivation" TEXT,
    "cv_id" UUID,
    "proposal_id" UUID,
    "status" "MagangStatus" NOT NULL DEFAULT 'PENDING',
    "current_step" SMALLINT NOT NULL DEFAULT 1,
    "rejection_reason" TEXT,
    "surat_balasan_id" UUID,
    "reviewed_by" UUID,
    "reviewed_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "pendaftaran_magang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kategori_faq" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(100) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "order_index" SMALLINT NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "kategori_faq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faq" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "kategori_id" UUID,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "order_index" SMALLINT NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "faq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255),
    "phone" VARCHAR(50),
    "subject" VARCHAR(500),
    "message" TEXT NOT NULL,
    "rating" SMALLINT,
    "status" "FeedbackStatus" NOT NULL DEFAULT 'NEW',
    "ip_address" VARCHAR(45),
    "processed_by" UUID,
    "processed_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "publikasi" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(500) NOT NULL,
    "slug" VARCHAR(500) NOT NULL,
    "jenis" "JenisPublikasi" NOT NULL,
    "year" SMALLINT NOT NULL,
    "description" TEXT,
    "thumbnail_id" UUID,
    "file_id" UUID NOT NULL,
    "download_count" BIGINT NOT NULL DEFAULT 0,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "order_index" SMALLINT NOT NULL DEFAULT 0,
    "created_by" UUID,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "publikasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "indikator_kinerja" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "unit" VARCHAR(50) NOT NULL,
    "description" TEXT,
    "order_index" SMALLINT NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "indikator_kinerja_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "data_kinerja" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "indikator_id" UUID NOT NULL,
    "year" SMALLINT NOT NULL,
    "period" "PeriodeStatistik" NOT NULL,
    "target" DECIMAL(15,2),
    "realisasi" DECIMAL(15,2),
    "notes" TEXT,
    "created_by" UUID,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "data_kinerja_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stat_peserta" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "program_name" VARCHAR(255) NOT NULL,
    "pelatihan_id" UUID,
    "year" SMALLINT NOT NULL,
    "total_peserta" INTEGER NOT NULL,
    "male_count" INTEGER,
    "female_count" INTEGER,
    "notes" TEXT,
    "created_by" UUID,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "stat_peserta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "infografis" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "category" VARCHAR(100),
    "image_id" UUID NOT NULL,
    "order_index" SMALLINT NOT NULL DEFAULT 0,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "created_by" UUID,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "infografis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staf" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "full_name" VARCHAR(255) NOT NULL,
    "nip" VARCHAR(50),
    "position" VARCHAR(255) NOT NULL,
    "unit_kerja_id" UUID,
    "jabatan_node_id" UUID,
    "photo_id" UUID,
    "email" VARCHAR(255),
    "phone_internal" VARCHAR(50),
    "phone_mobile" VARCHAR(50),
    "order_index" SMALLINT NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "joined_date" DATE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "staf_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pesan_kontak" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(50),
    "subject" VARCHAR(500) NOT NULL,
    "message" TEXT NOT NULL,
    "status" "KontakStatus" NOT NULL DEFAULT 'NEW',
    "ip_address" VARCHAR(45),
    "read_by" UUID,
    "read_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pesan_kontak_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "banners" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "accent_badge" VARCHAR(100) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "subtitle" TEXT NOT NULL,
    "image_id" UUID NOT NULL,
    "cta_text" VARCHAR(100) NOT NULL DEFAULT 'Baca Selengkapnya',
    "cta_link" TEXT NOT NULL DEFAULT '/informasi/berita',
    "order_index" SMALLINT NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "banners_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_role_status_idx" ON "users"("role", "status");

-- CreateIndex
CREATE INDEX "user_sessions_user_id_idx" ON "user_sessions"("user_id");

-- CreateIndex
CREATE INDEX "user_sessions_expires_idx" ON "user_sessions"("expires");

-- CreateIndex
CREATE INDEX "audit_logs_user_id_idx" ON "audit_logs"("user_id");

-- CreateIndex
CREATE INDEX "audit_logs_module_idx" ON "audit_logs"("module");

-- CreateIndex
CREATE INDEX "audit_logs_action_idx" ON "audit_logs"("action");

-- CreateIndex
CREATE INDEX "audit_logs_created_at_idx" ON "audit_logs"("created_at" DESC);

-- CreateIndex
CREATE INDEX "audit_logs_entity_type_entity_id_idx" ON "audit_logs"("entity_type", "entity_id");

-- CreateIndex
CREATE UNIQUE INDEX "media_storage_key_key" ON "media"("storage_key");

-- CreateIndex
CREATE INDEX "media_type_idx" ON "media"("type");

-- CreateIndex
CREATE INDEX "media_uploaded_by_idx" ON "media"("uploaded_by");

-- CreateIndex
CREATE INDEX "media_created_at_idx" ON "media"("created_at" DESC);

-- CreateIndex
CREATE INDEX "sejarah_photos_order_index_idx" ON "sejarah_photos"("order_index");

-- CreateIndex
CREATE INDEX "misi_items_order_index_idx" ON "misi_items"("order_index");

-- CreateIndex
CREATE UNIQUE INDEX "unit_kerja_name_key" ON "unit_kerja"("name");

-- CreateIndex
CREATE UNIQUE INDEX "unit_kerja_code_key" ON "unit_kerja"("code");

-- CreateIndex
CREATE INDEX "unit_kerja_is_active_order_index_idx" ON "unit_kerja"("is_active", "order_index");

-- CreateIndex
CREATE INDEX "jabatan_nodes_parent_id_idx" ON "jabatan_nodes"("parent_id");

-- CreateIndex
CREATE INDEX "jabatan_nodes_level_order_index_idx" ON "jabatan_nodes"("level", "order_index");

-- CreateIndex
CREATE INDEX "jabatan_nodes_unit_kerja_id_idx" ON "jabatan_nodes"("unit_kerja_id");

-- CreateIndex
CREATE UNIQUE INDEX "wilayah_kerja_province_name_key" ON "wilayah_kerja"("province_name");

-- CreateIndex
CREATE INDEX "wilayah_kerja_is_active_order_index_idx" ON "wilayah_kerja"("is_active", "order_index");

-- CreateIndex
CREATE UNIQUE INDEX "kategori_berita_name_key" ON "kategori_berita"("name");

-- CreateIndex
CREATE UNIQUE INDEX "kategori_berita_slug_key" ON "kategori_berita"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "berita_slug_key" ON "berita"("slug");

-- CreateIndex
CREATE INDEX "berita_status_idx" ON "berita"("status");

-- CreateIndex
CREATE INDEX "berita_published_at_idx" ON "berita"("published_at" DESC);

-- CreateIndex
CREATE INDEX "berita_is_featured_published_at_idx" ON "berita"("is_featured", "published_at" DESC);

-- CreateIndex
CREATE INDEX "berita_kategori_id_status_idx" ON "berita"("kategori_id", "status");

-- CreateIndex
CREATE INDEX "berita_author_id_idx" ON "berita"("author_id");

-- CreateIndex
CREATE INDEX "pengumuman_is_published_created_at_idx" ON "pengumuman"("is_published", "created_at" DESC);

-- CreateIndex
CREATE INDEX "pengumuman_priority_idx" ON "pengumuman"("priority");

-- CreateIndex
CREATE INDEX "galeri_albums_is_published_created_at_idx" ON "galeri_albums"("is_published", "created_at" DESC);

-- CreateIndex
CREATE INDEX "galeri_photos_album_id_order_index_idx" ON "galeri_photos"("album_id", "order_index");

-- CreateIndex
CREATE INDEX "pelatihan_status_idx" ON "pelatihan"("status");

-- CreateIndex
CREATE INDEX "pelatihan_category_slug_status_idx" ON "pelatihan"("category_slug", "status");

-- CreateIndex
CREATE INDEX "pendaftaran_magang_status_created_at_idx" ON "pendaftaran_magang"("status", "created_at" DESC);

-- CreateIndex
CREATE INDEX "pendaftaran_magang_email_idx" ON "pendaftaran_magang"("email");

-- CreateIndex
CREATE INDEX "pendaftaran_magang_period_start_period_end_idx" ON "pendaftaran_magang"("period_start", "period_end");

-- CreateIndex
CREATE UNIQUE INDEX "kategori_faq_name_key" ON "kategori_faq"("name");

-- CreateIndex
CREATE UNIQUE INDEX "kategori_faq_slug_key" ON "kategori_faq"("slug");

-- CreateIndex
CREATE INDEX "faq_kategori_id_order_index_idx" ON "faq"("kategori_id", "order_index");

-- CreateIndex
CREATE INDEX "feedback_status_created_at_idx" ON "feedback"("status", "created_at" DESC);

-- CreateIndex
CREATE INDEX "feedback_rating_idx" ON "feedback"("rating");

-- CreateIndex
CREATE UNIQUE INDEX "publikasi_slug_key" ON "publikasi"("slug");

-- CreateIndex
CREATE INDEX "publikasi_jenis_year_idx" ON "publikasi"("jenis", "year" DESC);

-- CreateIndex
CREATE INDEX "publikasi_status_idx" ON "publikasi"("status");

-- CreateIndex
CREATE UNIQUE INDEX "indikator_kinerja_name_key" ON "indikator_kinerja"("name");

-- CreateIndex
CREATE INDEX "data_kinerja_indikator_id_year_idx" ON "data_kinerja"("indikator_id", "year" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "uq_data_kinerja" ON "data_kinerja"("indikator_id", "year", "period");

-- CreateIndex
CREATE INDEX "stat_peserta_year_idx" ON "stat_peserta"("year" DESC);

-- CreateIndex
CREATE INDEX "infografis_status_order_index_idx" ON "infografis"("status", "order_index");

-- CreateIndex
CREATE UNIQUE INDEX "idx_staf_nip" ON "staf"("nip");

-- CreateIndex
CREATE INDEX "staf_unit_kerja_id_order_index_idx" ON "staf"("unit_kerja_id", "order_index");

-- CreateIndex
CREATE INDEX "staf_jabatan_node_id_idx" ON "staf"("jabatan_node_id");

-- CreateIndex
CREATE INDEX "staf_is_active_idx" ON "staf"("is_active");

-- CreateIndex
CREATE INDEX "pesan_kontak_status_created_at_idx" ON "pesan_kontak"("status", "created_at" DESC);

-- CreateIndex
CREATE INDEX "banners_is_active_order_index_idx" ON "banners"("is_active", "order_index");

-- AddForeignKey
ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_uploaded_by_fkey" FOREIGN KEY ("uploaded_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "settings" ADD CONSTRAINT "settings_site_logo_id_fkey" FOREIGN KEY ("site_logo_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "settings" ADD CONSTRAINT "settings_site_favicon_id_fkey" FOREIGN KEY ("site_favicon_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "settings" ADD CONSTRAINT "settings_seo_og_image_id_fkey" FOREIGN KEY ("seo_og_image_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "settings" ADD CONSTRAINT "settings_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sejarah" ADD CONSTRAINT "sejarah_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sejarah_photos" ADD CONSTRAINT "sejarah_photos_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visi_misi" ADD CONSTRAINT "visi_misi_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jabatan_nodes" ADD CONSTRAINT "jabatan_nodes_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "jabatan_nodes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jabatan_nodes" ADD CONSTRAINT "jabatan_nodes_photo_id_fkey" FOREIGN KEY ("photo_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jabatan_nodes" ADD CONSTRAINT "jabatan_nodes_unit_kerja_id_fkey" FOREIGN KEY ("unit_kerja_id") REFERENCES "unit_kerja"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wilayah_kerja" ADD CONSTRAINT "wilayah_kerja_photo_id_fkey" FOREIGN KEY ("photo_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "berita" ADD CONSTRAINT "berita_thumbnail_id_fkey" FOREIGN KEY ("thumbnail_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "berita" ADD CONSTRAINT "berita_kategori_id_fkey" FOREIGN KEY ("kategori_id") REFERENCES "kategori_berita"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "berita" ADD CONSTRAINT "berita_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pengumuman" ADD CONSTRAINT "pengumuman_attachment_id_fkey" FOREIGN KEY ("attachment_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pengumuman" ADD CONSTRAINT "pengumuman_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "galeri_albums" ADD CONSTRAINT "galeri_albums_cover_photo_id_fkey" FOREIGN KEY ("cover_photo_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "galeri_albums" ADD CONSTRAINT "galeri_albums_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "galeri_photos" ADD CONSTRAINT "galeri_photos_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "galeri_albums"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "galeri_photos" ADD CONSTRAINT "galeri_photos_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pelatihan" ADD CONSTRAINT "pelatihan_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "magang_info" ADD CONSTRAINT "magang_info_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pendaftaran_magang" ADD CONSTRAINT "pendaftaran_magang_cv_id_fkey" FOREIGN KEY ("cv_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pendaftaran_magang" ADD CONSTRAINT "pendaftaran_magang_proposal_id_fkey" FOREIGN KEY ("proposal_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pendaftaran_magang" ADD CONSTRAINT "pendaftaran_magang_surat_balasan_id_fkey" FOREIGN KEY ("surat_balasan_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pendaftaran_magang" ADD CONSTRAINT "pendaftaran_magang_reviewed_by_fkey" FOREIGN KEY ("reviewed_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faq" ADD CONSTRAINT "faq_kategori_id_fkey" FOREIGN KEY ("kategori_id") REFERENCES "kategori_faq"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_processed_by_fkey" FOREIGN KEY ("processed_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publikasi" ADD CONSTRAINT "publikasi_thumbnail_id_fkey" FOREIGN KEY ("thumbnail_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publikasi" ADD CONSTRAINT "publikasi_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publikasi" ADD CONSTRAINT "publikasi_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "data_kinerja" ADD CONSTRAINT "data_kinerja_indikator_id_fkey" FOREIGN KEY ("indikator_id") REFERENCES "indikator_kinerja"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "data_kinerja" ADD CONSTRAINT "data_kinerja_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stat_peserta" ADD CONSTRAINT "stat_peserta_pelatihan_id_fkey" FOREIGN KEY ("pelatihan_id") REFERENCES "pelatihan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stat_peserta" ADD CONSTRAINT "stat_peserta_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "infografis" ADD CONSTRAINT "infografis_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "infografis" ADD CONSTRAINT "infografis_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staf" ADD CONSTRAINT "staf_unit_kerja_id_fkey" FOREIGN KEY ("unit_kerja_id") REFERENCES "unit_kerja"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staf" ADD CONSTRAINT "staf_jabatan_node_id_fkey" FOREIGN KEY ("jabatan_node_id") REFERENCES "jabatan_nodes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staf" ADD CONSTRAINT "staf_photo_id_fkey" FOREIGN KEY ("photo_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pesan_kontak" ADD CONSTRAINT "pesan_kontak_read_by_fkey" FOREIGN KEY ("read_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "banners" ADD CONSTRAINT "banners_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
