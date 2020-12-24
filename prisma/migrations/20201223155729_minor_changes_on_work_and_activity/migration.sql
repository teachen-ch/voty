/*
  Warnings:

  - You are about to drop the column `card_id` on the `activities` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "reactions" DROP CONSTRAINT "reactions_thread_id_fkey1";

-- DropForeignKey
ALTER TABLE "reactions" DROP CONSTRAINT "reactions_thread_id_fkey";

-- AlterTable
ALTER TABLE "activities" DROP COLUMN "card_id",
ADD COLUMN     "card" TEXT;

-- AddForeignKey
ALTER TABLE "reactions" ADD FOREIGN KEY("thread_id")REFERENCES "threads"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reactions" ADD FOREIGN KEY("thread_id")REFERENCES "works"("id") ON DELETE SET NULL ON UPDATE CASCADE;
