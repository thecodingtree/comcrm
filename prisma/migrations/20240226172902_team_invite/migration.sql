-- AlterTable
ALTER TABLE "TeamInvite" ALTER COLUMN "expires" SET DEFAULT NOW() + interval '1 week';
