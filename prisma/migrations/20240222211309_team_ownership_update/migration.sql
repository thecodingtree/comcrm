/*
  Warnings:

  - You are about to drop the column `ownerId` on the `CoreEntity` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "OwnerType" AS ENUM ('USER', 'TEAM');

-- DropForeignKey
ALTER TABLE "CoreEntity" DROP CONSTRAINT "CoreEntity_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_entityId_fkey";

-- AlterTable
ALTER TABLE "CoreEntity" DROP COLUMN "ownerId",
ADD COLUMN     "creatorId" TEXT;

-- AlterTable
ALTER TABLE "TeamInvite" ALTER COLUMN "expires" SET DEFAULT NOW() + interval '1 week';

-- AddForeignKey
ALTER TABLE "CoreEntity" ADD CONSTRAINT "CoreEntity_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "CoreEntity"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
