-- DropForeignKey
ALTER TABLE "CoreEntity" DROP CONSTRAINT "CoreEntity_teamId_fkey";

-- AlterTable
ALTER TABLE "TeamInvite" ALTER COLUMN "expires" SET DEFAULT NOW() + interval '1 week';

-- AddForeignKey
ALTER TABLE "CoreEntity" ADD CONSTRAINT "CoreEntity_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;
