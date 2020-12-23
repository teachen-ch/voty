/*
  Warnings:

  - You are about to drop the column `cardId` on the `activities` table. All the data in the column will be lost.
  - You are about to drop the column `schoolId` on the `attachments` table. All the data in the column will be lost.
  - You are about to drop the column `ballotId` on the `attachments` table. All the data in the column will be lost.
  - You are about to drop the column `schoolId` on the `threads` table. All the data in the column will be lost.
  - Added the required column `stars` to the `reactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `feedback` to the `reactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "attachments" DROP CONSTRAINT "attachments_ballotId_fkey";

-- DropForeignKey
ALTER TABLE "attachments" DROP CONSTRAINT "attachments_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "reactions" DROP CONSTRAINT "reactions_thread_id_fkey";

-- DropForeignKey
ALTER TABLE "threads" DROP CONSTRAINT "threads_schoolId_fkey";

-- AlterTable
ALTER TABLE "activities" DROP COLUMN "cardId",
ADD COLUMN     "card_id" TEXT,
ADD COLUMN     "work_id" TEXT;

-- AlterTable
ALTER TABLE "attachments" DROP COLUMN "schoolId",
DROP COLUMN "ballotId",
ADD COLUMN     "school_id" TEXT,
ADD COLUMN     "ballot_id" TEXT,
ADD COLUMN     "work_id" TEXT;

-- AlterTable
ALTER TABLE "reactions" ADD COLUMN     "stars" INTEGER NOT NULL,
ADD COLUMN     "feedback" TEXT NOT NULL,
ALTER COLUMN "emoij" SET DEFAULT E'';

-- AlterTable
ALTER TABLE "threads" DROP COLUMN "schoolId",
ADD COLUMN     "school_id" TEXT;

-- CreateTable
CREATE TABLE "works" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT E'',
    "text" TEXT NOT NULL DEFAULT E'',
    "data" JSONB NOT NULL,
    "card" TEXT NOT NULL,
    "visibility" "Visibility" NOT NULL DEFAULT E'Team',
    "team_id" TEXT NOT NULL,
    "school_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserToWork" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserToWork_AB_unique" ON "_UserToWork"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToWork_B_index" ON "_UserToWork"("B");

-- AddForeignKey
ALTER TABLE "works" ADD FOREIGN KEY("team_id")REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "works" ADD FOREIGN KEY("school_id")REFERENCES "schools"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToWork" ADD FOREIGN KEY("A")REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToWork" ADD FOREIGN KEY("B")REFERENCES "works"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD FOREIGN KEY("work_id")REFERENCES "works"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attachments" ADD FOREIGN KEY("school_id")REFERENCES "schools"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attachments" ADD FOREIGN KEY("ballot_id")REFERENCES "ballots"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attachments" ADD FOREIGN KEY("work_id")REFERENCES "works"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reactions" ADD FOREIGN KEY("thread_id")REFERENCES "threads"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reactions" ADD FOREIGN KEY("thread_id")REFERENCES "works"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "threads" ADD FOREIGN KEY("school_id")REFERENCES "schools"("id") ON DELETE SET NULL ON UPDATE CASCADE;
