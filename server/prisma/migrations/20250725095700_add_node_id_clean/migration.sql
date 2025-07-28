/*
  Warnings:

  - A unique constraint covering the columns `[testCaseId,nodeId]` on the table `DevTestCaseData` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[testCaseId,nodeId]` on the table `POTestCaseData` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[testCaseId,nodeId]` on the table `QCTestCaseData` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nodeId` to the `DevTestCaseData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nodeId` to the `POTestCaseData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nodeId` to the `QCTestCaseData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DevTestCaseData" ADD COLUMN     "nodeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "POTestCaseData" ADD COLUMN     "nodeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "QCTestCaseData" ADD COLUMN     "nodeId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "DevTestCaseData_testCaseId_nodeId_key" ON "DevTestCaseData"("testCaseId", "nodeId");

-- CreateIndex
CREATE UNIQUE INDEX "POTestCaseData_testCaseId_nodeId_key" ON "POTestCaseData"("testCaseId", "nodeId");

-- CreateIndex
CREATE UNIQUE INDEX "QCTestCaseData_testCaseId_nodeId_key" ON "QCTestCaseData"("testCaseId", "nodeId");
