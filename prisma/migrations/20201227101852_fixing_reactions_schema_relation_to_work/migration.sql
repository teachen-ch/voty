-- DropForeignKey
ALTER TABLE "reactions" DROP CONSTRAINT "reactions_thread_id_fkey1";

-- AlterTable
ALTER TABLE "reactions" ADD COLUMN     "work_id" TEXT;

-- AddForeignKey
ALTER TABLE "reactions" ADD FOREIGN KEY("work_id")REFERENCES "works"("id") ON DELETE SET NULL ON UPDATE CASCADE;
