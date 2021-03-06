-- DropForeignKey
ALTER TABLE "reactions" DROP CONSTRAINT "reactions_thread_id_fkey1";

-- DropForeignKey
ALTER TABLE "reactions" DROP CONSTRAINT "reactions_thread_id_fkey";

-- AlterTable
ALTER TABLE "works" ALTER COLUMN "data" DROP NOT NULL,
ALTER COLUMN "card" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "reactions" ADD FOREIGN KEY("thread_id")REFERENCES "threads"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reactions" ADD FOREIGN KEY("thread_id")REFERENCES "works"("id") ON DELETE SET NULL ON UPDATE CASCADE;
