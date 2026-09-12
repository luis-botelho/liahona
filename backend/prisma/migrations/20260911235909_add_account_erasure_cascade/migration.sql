-- DropForeignKey
ALTER TABLE "Opportunity" DROP CONSTRAINT "Opportunity_authorId_fkey";

-- AddForeignKey
ALTER TABLE "Opportunity" ADD CONSTRAINT "Opportunity_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
