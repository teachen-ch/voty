/*
  Warnings:

  - Made the column `school_id` on table `works` required. The migration will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "reactions" DROP CONSTRAINT "reactions_thread_id_fkey1";

-- DropForeignKey
ALTER TABLE "reactions" DROP CONSTRAINT "reactions_thread_id_fkey";

-- AlterTable
ALTER TABLE "works" ALTER COLUMN "school_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "reactions" ADD FOREIGN KEY("thread_id")REFERENCES "threads"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reactions" ADD FOREIGN KEY("thread_id")REFERENCES "works"("id") ON DELETE SET NULL ON UPDATE CASCADE;
