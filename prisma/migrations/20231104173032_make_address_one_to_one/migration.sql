/*
  Warnings:

  - A unique constraint covering the columns `[metaId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Address_metaId_key" ON "Address"("metaId");
