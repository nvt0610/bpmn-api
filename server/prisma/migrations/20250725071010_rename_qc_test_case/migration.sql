/*
  Warnings:

  - You are about to drop the `QATestCaseData` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "QATestCaseData" DROP CONSTRAINT "QATestCaseData_testCaseId_fkey";

-- DropTable
DROP TABLE "QATestCaseData";

-- CreateTable
CREATE TABLE "QCTestCaseData" (
    "id" INTEGER NOT NULL,
    "testCaseId" INTEGER NOT NULL,
    "scenarios" TEXT[],
    "paramInputs" TEXT[],
    "expected" TEXT[],
    "apis" JSONB NOT NULL,

    CONSTRAINT "QCTestCaseData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QCTestCaseData_testCaseId_key" ON "QCTestCaseData"("testCaseId");

-- AddForeignKey
ALTER TABLE "QCTestCaseData" ADD CONSTRAINT "QCTestCaseData_testCaseId_fkey" FOREIGN KEY ("testCaseId") REFERENCES "TestCase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
