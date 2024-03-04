-- AlterTable
ALTER TABLE "Attributes" ADD COLUMN     "custom" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "TeamInvite" ALTER COLUMN "expires" SET DEFAULT NOW() + interval '1 week';
