/*
  Warnings:

  - You are about to drop the column `thread_id` on the `activities` table. All the data in the column will be lost.
  - You are about to drop the column `thread_id` on the `attachments` table. All the data in the column will be lost.
  - You are about to drop the column `thread_id` on the `reactions` table. All the data in the column will be lost.
  - You are about to drop the `threads` table. If the table is not empty, all the data it contains will be lost.

*/

-- DropForeignKey
ALTER TABLE "threads" DROP CONSTRAINT "threads_user_id_fkey";

-- DropForeignKey
ALTER TABLE "activities" DROP CONSTRAINT "activities_thread_id_fkey";

-- DropForeignKey
ALTER TABLE "attachments" DROP CONSTRAINT "attachments_thread_id_fkey";

-- DropForeignKey
ALTER TABLE "reactions" DROP CONSTRAINT "reactions_thread_id_fkey";

-- AlterTable
ALTER TABLE "activities" DROP COLUMN "thread_id",
ADD COLUMN     "discussion_id" TEXT;

-- AlterTable
ALTER TABLE "attachments" DROP COLUMN "thread_id",
ADD COLUMN     "discussion_id" TEXT;

-- AlterTable
ALTER TABLE "reactions" DROP COLUMN "thread_id",
ADD COLUMN     "discussion_id" TEXT;

-- CreateTable
CREATE TABLE "discussions" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT E'',
    "text" TEXT NOT NULL DEFAULT E'',
    "ref" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "school_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- DropTable
DROP TABLE "threads";

-- AddForeignKey
ALTER TABLE "discussions" ADD FOREIGN KEY("user_id")REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discussions" ADD FOREIGN KEY("team_id")REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discussions" ADD FOREIGN KEY("school_id")REFERENCES "schools"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD FOREIGN KEY("discussion_id")REFERENCES "discussions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attachments" ADD FOREIGN KEY("discussion_id")REFERENCES "discussions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reactions" ADD FOREIGN KEY("discussion_id")REFERENCES "discussions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
