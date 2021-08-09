-- AlterTable
ALTER TABLE "users" ADD COLUMN     "campaign" TEXT,
ADD COLUMN     "locale" TEXT NOT NULL DEFAULT E'de';
