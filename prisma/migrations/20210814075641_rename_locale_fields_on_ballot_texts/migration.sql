/*
  Warnings:

  - You are about to drop the column `title_de` on the `ballots` table. All the data in the column will be lost.
  - You are about to drop the column `title_fr` on the `ballots` table. All the data in the column will be lost.
  - You are about to drop the column `title_it` on the `ballots` table. All the data in the column will be lost.
  - You are about to drop the column `description_de` on the `ballots` table. All the data in the column will be lost.
  - You are about to drop the column `description_fr` on the `ballots` table. All the data in the column will be lost.
  - You are about to drop the column `description_it` on the `ballots` table. All the data in the column will be lost.
  - You are about to drop the column `body_de` on the `ballots` table. All the data in the column will be lost.
  - You are about to drop the column `body_fr` on the `ballots` table. All the data in the column will be lost.
  - You are about to drop the column `body_it` on the `ballots` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ballots" DROP COLUMN "title_de",
DROP COLUMN "title_fr",
DROP COLUMN "title_it",
DROP COLUMN "description_de",
DROP COLUMN "description_fr",
DROP COLUMN "description_it",
DROP COLUMN "body_de",
DROP COLUMN "body_fr",
DROP COLUMN "body_it",
ADD COLUMN     "titlede" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "titlefr" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "titleit" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "descriptionde" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "descriptionfr" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "descriptionit" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "bodyde" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "bodyfr" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "bodyit" TEXT NOT NULL DEFAULT E'';
