-- CreateTable
CREATE TABLE "Note" (
    "_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "entityId" TEXT NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("_id")
);

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "CoreEntity"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
