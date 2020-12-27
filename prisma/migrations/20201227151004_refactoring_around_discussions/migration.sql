/*
  Warnings:

  - You are about to drop the column `ref` on the `discussions` table. All the data in the column will be lost.
  - Added the required column `card` to the `discussions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "ActivityType" ADD VALUE 'Work';
ALTER TYPE "ActivityType" ADD VALUE 'UserAccept';
ALTER TYPE "ActivityType" ADD VALUE 'UserInvite';

-- AlterTable
ALTER TABLE "activities" ADD COLUMN     "ballot_id" TEXT;

-- AlterTable
ALTER TABLE "discussions" DROP COLUMN "ref",
ADD COLUMN     "card" TEXT NOT NULL,
ADD COLUMN     "ballot_id" TEXT;

-- AddForeignKey
ALTER TABLE "activities" ADD FOREIGN KEY("ballot_id")REFERENCES "ballots"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discussions" ADD FOREIGN KEY("ballot_id")REFERENCES "ballots"("id") ON DELETE SET NULL ON UPDATE CASCADE;
