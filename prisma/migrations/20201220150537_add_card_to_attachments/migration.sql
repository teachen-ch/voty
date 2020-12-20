/*
  Warnings:

  - You are about to drop the column `ballot_id` on the `attachments` table. All the data in the column will be lost.
  - Added the required column `team_id` to the `attachments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "attachments" DROP CONSTRAINT "attachments_ballot_id_fkey";

-- AlterTable
ALTER TABLE "attachments" DROP COLUMN "ballot_id",
ADD COLUMN     "card" TEXT,
ADD COLUMN     "team_id" TEXT NOT NULL,
ADD COLUMN     "schoolId" TEXT,
ADD COLUMN     "ballotId" TEXT;

-- AddForeignKey
ALTER TABLE "attachments" ADD FOREIGN KEY("team_id")REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attachments" ADD FOREIGN KEY("schoolId")REFERENCES "schools"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attachments" ADD FOREIGN KEY("ballotId")REFERENCES "ballots"("id") ON DELETE SET NULL ON UPDATE CASCADE;
