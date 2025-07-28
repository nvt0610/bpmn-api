/*
  Warnings:

  - The `nodeId` column on the `DevTestCaseData` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `nodeId` column on the `POTestCaseData` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `nodeId` column on the `QCTestCaseData` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropIndex
DROP INDEX "DevTestCaseData_testCaseId_nodeId_key";

-- DropIndex
DROP INDEX "POTestCaseData_testCaseId_nodeId_key";

-- DropIndex
DROP INDEX "QCTestCaseData_testCaseId_nodeId_key";

-- AlterTable
ALTER TABLE "DevTestCaseData" DROP COLUMN "nodeId",
ADD COLUMN     "nodeId" TEXT[];

-- AlterTable
ALTER TABLE "POTestCaseData" DROP COLUMN "nodeId",
ADD COLUMN     "nodeId" TEXT[];

-- AlterTable
ALTER TABLE "QCTestCaseData" DROP COLUMN "nodeId",
ADD COLUMN     "nodeId" TEXT[];
