/*
  Warnings:

  - You are about to drop the column `apiUrl` on the `TestCase` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TestCase" DROP COLUMN "apiUrl";

-- CreateTable
CREATE TABLE "TestCaseRoleView" (
    "id" INTEGER NOT NULL,
    "testCaseId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "TestCaseRoleView_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "POTestCaseData" (
    "id" INTEGER NOT NULL,
    "testCaseId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "params" TEXT[],
    "attachments" TEXT[],

    CONSTRAINT "POTestCaseData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DevTestCaseData" (
    "id" INTEGER NOT NULL,
    "testCaseId" INTEGER NOT NULL,
    "apis" TEXT[],

    CONSTRAINT "DevTestCaseData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QATestCaseData" (
    "id" INTEGER NOT NULL,
    "testCaseId" INTEGER NOT NULL,
    "scenarios" TEXT[],
    "paramInputs" TEXT[],
    "expected" TEXT[],
    "apis" JSONB NOT NULL,

    CONSTRAINT "QATestCaseData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TestCaseRoleView_testCaseId_userId_key" ON "TestCaseRoleView"("testCaseId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "POTestCaseData_testCaseId_key" ON "POTestCaseData"("testCaseId");

-- CreateIndex
CREATE UNIQUE INDEX "DevTestCaseData_testCaseId_key" ON "DevTestCaseData"("testCaseId");

-- CreateIndex
CREATE UNIQUE INDEX "QATestCaseData_testCaseId_key" ON "QATestCaseData"("testCaseId");

-- AddForeignKey
ALTER TABLE "TestCaseRoleView" ADD CONSTRAINT "TestCaseRoleView_testCaseId_fkey" FOREIGN KEY ("testCaseId") REFERENCES "TestCase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestCaseRoleView" ADD CONSTRAINT "TestCaseRoleView_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestCaseRoleView" ADD CONSTRAINT "TestCaseRoleView_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "POTestCaseData" ADD CONSTRAINT "POTestCaseData_testCaseId_fkey" FOREIGN KEY ("testCaseId") REFERENCES "TestCase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DevTestCaseData" ADD CONSTRAINT "DevTestCaseData_testCaseId_fkey" FOREIGN KEY ("testCaseId") REFERENCES "TestCase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QATestCaseData" ADD CONSTRAINT "QATestCaseData_testCaseId_fkey" FOREIGN KEY ("testCaseId") REFERENCES "TestCase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
