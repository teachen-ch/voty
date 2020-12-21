/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[file]` on the table `attachments`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "attachments.file_unique" ON "attachments"("file");
