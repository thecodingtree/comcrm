/*
  Warnings:

  - You are about to drop the column `metaId` on the `CoreEntity` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[CoreEntityId]` on the table `MetaData` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "CoreEntity" DROP CONSTRAINT "CoreEntity_metaId_fkey";

-- DropForeignKey
ALTER TABLE "MetaData" DROP CONSTRAINT "MetaData_addressId_fkey";

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "metaId" TEXT;

-- AlterTable
ALTER TABLE "CoreEntity" DROP COLUMN "metaId";

-- AlterTable
ALTER TABLE "MetaData" ADD COLUMN     "CoreEntityId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "MetaData_CoreEntityId_key" ON "MetaData"("CoreEntityId");

-- AddForeignKey
ALTER TABLE "MetaData" ADD CONSTRAINT "MetaData_CoreEntityId_fkey" FOREIGN KEY ("CoreEntityId") REFERENCES "CoreEntity"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_metaId_fkey" FOREIGN KEY ("metaId") REFERENCES "MetaData"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
