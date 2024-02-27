/*
  Warnings:

  - You are about to drop the column `type` on the `Relationship` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fromEntityId,toEntityId,typeId]` on the table `Relationship` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `TeamUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `typeId` to the `Relationship` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RelationshipCategory" AS ENUM ('OWNERSHIP', 'EMPLOYMENT', 'AGENCY', 'PARTNERSHIP');

-- CreateEnum
CREATE TYPE "RelationshipDirection" AS ENUM ('ONE_WAY', 'TWO_WAY');

-- DropIndex
DROP INDEX "Relationship_fromEntityId_toEntityId_key";

-- AlterTable
ALTER TABLE "Relationship" DROP COLUMN "type",
ADD COLUMN     "typeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TeamInvite" ALTER COLUMN "expires" SET DEFAULT NOW() + interval '1 week';

-- DropEnum
DROP TYPE "RelationshipType";

-- CreateTable
CREATE TABLE "RelationshipType" (
    "_id" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "to" "CoreEntityType",
    "from" "CoreEntityType",
    "direction" "RelationshipDirection" NOT NULL DEFAULT 'TWO_WAY',
    "category" "RelationshipCategory" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RelationshipType_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Relationship_fromEntityId_toEntityId_typeId_key" ON "Relationship"("fromEntityId", "toEntityId", "typeId");

-- CreateIndex
CREATE UNIQUE INDEX "TeamUser_userId_key" ON "TeamUser"("userId");

-- AddForeignKey
ALTER TABLE "Relationship" ADD CONSTRAINT "Relationship_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "RelationshipType"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelationshipType" ADD CONSTRAINT "RelationshipType_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
