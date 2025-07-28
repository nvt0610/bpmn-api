-- AlterTable
ALTER TABLE "DevTestCaseData" ALTER COLUMN "nodeId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "POTestCaseData" ALTER COLUMN "nodeId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "QCTestCaseData" ALTER COLUMN "nodeId" DROP NOT NULL;
