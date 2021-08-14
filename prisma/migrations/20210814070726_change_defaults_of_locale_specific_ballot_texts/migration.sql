/*
  Warnings:

  - Made the column `title_de` on table `ballots` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title_fr` on table `ballots` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title_it` on table `ballots` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description_de` on table `ballots` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description_fr` on table `ballots` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description_it` on table `ballots` required. This step will fail if there are existing NULL values in that column.
  - Made the column `body_de` on table `ballots` required. This step will fail if there are existing NULL values in that column.
  - Made the column `body_fr` on table `ballots` required. This step will fail if there are existing NULL values in that column.
  - Made the column `body_it` on table `ballots` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ballots" ALTER COLUMN "title" SET DEFAULT E'',
ALTER COLUMN "title_de" SET NOT NULL,
ALTER COLUMN "title_de" SET DEFAULT E'',
ALTER COLUMN "title_fr" SET NOT NULL,
ALTER COLUMN "title_fr" SET DEFAULT E'',
ALTER COLUMN "title_it" SET NOT NULL,
ALTER COLUMN "title_it" SET DEFAULT E'',
ALTER COLUMN "description_de" SET NOT NULL,
ALTER COLUMN "description_de" SET DEFAULT E'',
ALTER COLUMN "description_fr" SET NOT NULL,
ALTER COLUMN "description_fr" SET DEFAULT E'',
ALTER COLUMN "description_it" SET NOT NULL,
ALTER COLUMN "description_it" SET DEFAULT E'',
ALTER COLUMN "body_de" SET NOT NULL,
ALTER COLUMN "body_de" SET DEFAULT E'',
ALTER COLUMN "body_fr" SET NOT NULL,
ALTER COLUMN "body_fr" SET DEFAULT E'',
ALTER COLUMN "body_it" SET NOT NULL,
ALTER COLUMN "body_it" SET DEFAULT E'';
