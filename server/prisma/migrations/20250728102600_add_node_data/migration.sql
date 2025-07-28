/*
  Warnings:

  - You are about to drop the column `apis` on the `DevTestCaseData` table. All the data in the column will be lost.
  - You are about to drop the column `nodeId` on the `DevTestCaseData` table. All the data in the column will be lost.
  - You are about to drop the column `nodeId` on the `POTestCaseData` table. All the data in the column will be lost.
  - You are about to drop the column `nodeId` on the `QCTestCaseData` table. All the data in the column will be lost.
  - You are about to drop the column `scenarios` on the `QCTestCaseData` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DevTestCaseData" DROP COLUMN "apis",
DROP COLUMN "nodeId",
ADD COLUMN     "nodeData" JSONB;

-- AlterTable
ALTER TABLE "POTestCaseData" DROP COLUMN "nodeId",
ADD COLUMN     "nodeData" JSONB;

-- AlterTable
ALTER TABLE "QCTestCaseData" DROP COLUMN "nodeId",
DROP COLUMN "scenarios",
ADD COLUMN     "nodeData" JSONB;
