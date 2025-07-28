-- AlterTable
ALTER TABLE "DevTestCaseData" ADD COLUMN     "roleId" INTEGER;

-- AlterTable
ALTER TABLE "POTestCaseData" ADD COLUMN     "roleId" INTEGER;

-- AlterTable
ALTER TABLE "QCTestCaseData" ADD COLUMN     "roleId" INTEGER;

-- AddForeignKey
ALTER TABLE "POTestCaseData" ADD CONSTRAINT "POTestCaseData_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DevTestCaseData" ADD CONSTRAINT "DevTestCaseData_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QCTestCaseData" ADD CONSTRAINT "QCTestCaseData_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;
