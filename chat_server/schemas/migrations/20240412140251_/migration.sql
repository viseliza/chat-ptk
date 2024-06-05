/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `Replacement` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Replacement_date_key" ON "Replacement"("date");
