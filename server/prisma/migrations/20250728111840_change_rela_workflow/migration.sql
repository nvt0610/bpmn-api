/*
  Warnings:

  - A unique constraint covering the columns `[testCaseId]` on the table `TestCaseWorkflow` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TestCaseWorkflow_testCaseId_key" ON "TestCaseWorkflow"("testCaseId");
