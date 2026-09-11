-- CreateEnum
CREATE TYPE "CourseSource" AS ENUM ('LIA', 'EXTERNAL');

-- CreateEnum
CREATE TYPE "CourseEnrollmentStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED');

-- AlterTable
ALTER TABLE "Application" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT,
    "skills" TEXT[],
    "provider" TEXT,
    "externalUrl" TEXT,
    "source" "CourseSource" NOT NULL DEFAULT 'LIA',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lesson" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "orderIndex" INTEGER NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseEnrollment" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "workerId" TEXT NOT NULL,
    "completedLessonIds" TEXT[],
    "status" "CourseEnrollmentStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CourseEnrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certificate" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "workerId" TEXT NOT NULL,
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Course_source_createdAt_idx" ON "Course"("source", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_courseId_orderIndex_key" ON "Lesson"("courseId", "orderIndex");

-- CreateIndex
CREATE INDEX "CourseEnrollment_workerId_idx" ON "CourseEnrollment"("workerId");

-- CreateIndex
CREATE UNIQUE INDEX "CourseEnrollment_courseId_workerId_key" ON "CourseEnrollment"("courseId", "workerId");

-- CreateIndex
CREATE UNIQUE INDEX "Certificate_code_key" ON "Certificate"("code");

-- CreateIndex
CREATE INDEX "Certificate_workerId_idx" ON "Certificate"("workerId");

-- CreateIndex
CREATE UNIQUE INDEX "Certificate_courseId_workerId_key" ON "Certificate"("courseId", "workerId");

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseEnrollment" ADD CONSTRAINT "CourseEnrollment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseEnrollment" ADD CONSTRAINT "CourseEnrollment_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
