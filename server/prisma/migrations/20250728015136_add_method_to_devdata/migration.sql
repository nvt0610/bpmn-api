-- AlterTable
ALTER TABLE "DevTestCaseData" ADD COLUMN     "body" JSONB,
ADD COLUMN     "method" TEXT,
ADD COLUMN     "response" JSONB;
