-- CreateEnum
CREATE TYPE "TaskPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "TaskType" AS ENUM ('TODO', 'CALL', 'EMAIL', 'EVENT', 'FOLLOW_UP', 'OTHER');

-- AlterTable
ALTER TABLE "TeamInvite" ALTER COLUMN "expires" SET DEFAULT NOW() + interval '1 week';

-- CreateTable
CREATE TABLE "Task" (
    "_id" TEXT NOT NULL,
    "type" "TaskType" NOT NULL DEFAULT 'TODO',
    "creatorId" TEXT NOT NULL,
    "assigneeId" TEXT,
    "entityId" TEXT,
    "description" TEXT NOT NULL,
    "content" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "priority" "TaskPriority" NOT NULL DEFAULT 'LOW',
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "private" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("_id")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "User"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "CoreEntity"("_id") ON DELETE SET NULL ON UPDATE CASCADE;
