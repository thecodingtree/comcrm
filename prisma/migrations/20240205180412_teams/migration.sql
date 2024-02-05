/*
  Warnings:

  - The primary key for the `Address` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `_id` column on the `Address` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `metaId` column on the `Address` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `userId` on the `CoreEntity` table. All the data in the column will be lost.
  - The primary key for the `MetaData` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `CoreEntityId` on the `MetaData` table. All the data in the column will be lost.
  - The `_id` column on the `MetaData` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `_CoreEntityToCoreEntity` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[entityId]` on the table `MetaData` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "TeamRole" AS ENUM ('OWNER', 'ADMIN', 'MEMBER');

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_metaId_fkey";

-- DropForeignKey
ALTER TABLE "CoreEntity" DROP CONSTRAINT "CoreEntity_userId_fkey";

-- DropForeignKey
ALTER TABLE "MetaData" DROP CONSTRAINT "MetaData_CoreEntityId_fkey";

-- DropForeignKey
ALTER TABLE "_CoreEntityToCoreEntity" DROP CONSTRAINT "_CoreEntityToCoreEntity_A_fkey";

-- DropForeignKey
ALTER TABLE "_CoreEntityToCoreEntity" DROP CONSTRAINT "_CoreEntityToCoreEntity_B_fkey";

-- DropIndex
DROP INDEX "MetaData_CoreEntityId_key";

-- AlterTable
ALTER TABLE "Address" DROP CONSTRAINT "Address_pkey",
DROP COLUMN "_id",
ADD COLUMN     "_id" SERIAL NOT NULL,
DROP COLUMN "metaId",
ADD COLUMN     "metaId" INTEGER,
ADD CONSTRAINT "Address_pkey" PRIMARY KEY ("_id");

-- AlterTable
ALTER TABLE "CoreEntity" DROP COLUMN "userId",
ADD COLUMN     "ownerId" TEXT,
ADD COLUMN     "teamId" TEXT;

-- AlterTable
ALTER TABLE "MetaData" DROP CONSTRAINT "MetaData_pkey",
DROP COLUMN "CoreEntityId",
ADD COLUMN     "entityId" TEXT,
DROP COLUMN "_id",
ADD COLUMN     "_id" SERIAL NOT NULL,
ADD CONSTRAINT "MetaData_pkey" PRIMARY KEY ("_id");

-- DropTable
DROP TABLE "_CoreEntityToCoreEntity";

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamUser" (
    "id" SERIAL NOT NULL,
    "teamId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "TeamRole" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeamUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Team_slug_key" ON "Team"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "TeamUser_teamId_userId_key" ON "TeamUser"("teamId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_metaId_key" ON "Address"("metaId");

-- CreateIndex
CREATE UNIQUE INDEX "MetaData_entityId_key" ON "MetaData"("entityId");

-- AddForeignKey
ALTER TABLE "TeamUser" ADD CONSTRAINT "TeamUser_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamUser" ADD CONSTRAINT "TeamUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoreEntity" ADD CONSTRAINT "CoreEntity_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoreEntity" ADD CONSTRAINT "CoreEntity_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MetaData" ADD CONSTRAINT "MetaData_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "CoreEntity"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_metaId_fkey" FOREIGN KEY ("metaId") REFERENCES "MetaData"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
