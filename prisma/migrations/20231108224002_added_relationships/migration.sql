-- CreateEnum
CREATE TYPE "RelationshipType" AS ENUM ('OWNER_OF', 'EMPLOYED_BY', 'EMPLOYER_OF', 'AGENT_FOR', 'OWNED_BY', 'SOLD_TO', 'LEASED_TO', 'LEASED_BY', 'INTERESTED_IN');

-- CreateTable
CREATE TABLE "Relationship" (
    "_id" TEXT NOT NULL,
    "type" "RelationshipType" NOT NULL,
    "fromEntityId" TEXT NOT NULL,
    "toEntityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Relationship_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Relationship_fromEntityId_toEntityId_key" ON "Relationship"("fromEntityId", "toEntityId");

-- AddForeignKey
ALTER TABLE "Relationship" ADD CONSTRAINT "Relationship_fromEntityId_fkey" FOREIGN KEY ("fromEntityId") REFERENCES "CoreEntity"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Relationship" ADD CONSTRAINT "Relationship_toEntityId_fkey" FOREIGN KEY ("toEntityId") REFERENCES "CoreEntity"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
