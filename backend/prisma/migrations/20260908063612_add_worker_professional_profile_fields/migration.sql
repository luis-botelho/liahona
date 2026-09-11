-- AlterTable
ALTER TABLE "WorkerProfile" ADD COLUMN     "availability" TEXT,
ADD COLUMN     "desiredRoles" TEXT[],
ADD COLUMN     "discoverableByRecruiters" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "professionalTitle" TEXT,
ADD COLUMN     "workPreferences" TEXT[];
