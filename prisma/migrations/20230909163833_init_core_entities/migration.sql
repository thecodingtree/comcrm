-- CreateEnum
CREATE TYPE "CoreEntityType" AS ENUM ('PROPERTY', 'CONTACT', 'COMPANY');

-- CreateTable
CREATE TABLE "CoreEntity" (
    "_id" TEXT NOT NULL,
    "type" "CoreEntityType" NOT NULL,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoreEntity_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Company" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "relationId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "_id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "relationId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_relationId_key" ON "Company"("relationId");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_relationId_key" ON "Contact"("relationId");

-- AddForeignKey
ALTER TABLE "CoreEntity" ADD CONSTRAINT "CoreEntity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_relationId_fkey" FOREIGN KEY ("relationId") REFERENCES "CoreEntity"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_relationId_fkey" FOREIGN KEY ("relationId") REFERENCES "CoreEntity"("_id") ON DELETE SET NULL ON UPDATE CASCADE;
