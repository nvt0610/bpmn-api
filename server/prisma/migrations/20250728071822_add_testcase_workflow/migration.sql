-- CreateTable
CREATE TABLE "TestCaseWorkflow" (
    "id" SERIAL NOT NULL,
    "testCaseId" INTEGER NOT NULL,
    "workflowId" VARCHAR(100) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TestCaseWorkflow_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TestCaseWorkflow" ADD CONSTRAINT "TestCaseWorkflow_testCaseId_fkey" FOREIGN KEY ("testCaseId") REFERENCES "TestCase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
