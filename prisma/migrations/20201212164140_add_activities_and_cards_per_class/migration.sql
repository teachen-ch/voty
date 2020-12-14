-- CreateEnum
CREATE TYPE "public"."Visibility" AS ENUM ('Private', 'Team', 'School', 'Public');

-- CreateEnum
CREATE TYPE "public"."ActivityType" AS ENUM ('Discussion', 'Attachment', 'Vote', 'Test');

-- AlterTable
ALTER TABLE "teams" ADD COLUMN     "cards" TEXT NOT NULL DEFAULT E'';

-- CreateTable
CREATE TABLE "activities" (
"id" SERIAL,
    "type" "ActivityType" NOT NULL,
    "visibility" "Visibility" NOT NULL,
    "user_id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "school_id" TEXT NOT NULL,
    "thread_id" TEXT,
    "cardId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "activities" ADD FOREIGN KEY("user_id")REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD FOREIGN KEY("team_id")REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD FOREIGN KEY("school_id")REFERENCES "schools"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD FOREIGN KEY("thread_id")REFERENCES "threads"("id") ON DELETE SET NULL ON UPDATE CASCADE;
