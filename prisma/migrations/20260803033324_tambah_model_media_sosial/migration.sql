-- CreateEnum
CREATE TYPE "SocialPlatform" AS ENUM ('INSTAGRAM', 'TIKTOK', 'YOUTUBE');

-- CreateTable
CREATE TABLE "social_media_posts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "platform" "SocialPlatform" NOT NULL,
    "url" TEXT NOT NULL,
    "title" VARCHAR(255),
    "caption" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "social_media_posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "social_media_posts_platform_is_active_idx" ON "social_media_posts"("platform", "is_active");
