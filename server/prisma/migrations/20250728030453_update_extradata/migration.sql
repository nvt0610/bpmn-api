/*
  Warnings:

  - You are about to drop the column `body` on the `DevTestCaseData` table. All the data in the column will be lost.
  - You are about to drop the column `method` on the `DevTestCaseData` table. All the data in the column will be lost.
  - You are about to drop the column `response` on the `DevTestCaseData` table. All the data in the column will be lost.
  - You are about to drop the column `params` on the `POTestCaseData` table. All the data in the column will be lost.
  - You are about to drop the column `expected` on the `QCTestCaseData` table. All the data in the column will be lost.
  - You are about to drop the column `paramInputs` on the `QCTestCaseData` table. All the data in the column will be lost.
  - You are about to drop the column `scenarios` on the `QCTestCaseData` table. All the data in the column will be lost.
  - Changed the type of `apis` on the `DevTestCaseData` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "DevTestCaseData" DROP COLUMN "body",
DROP COLUMN "method",
DROP COLUMN "response",
DROP COLUMN "apis",
ADD COLUMN     "apis" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "POTestCaseData" DROP COLUMN "params";

-- AlterTable
ALTER TABLE "QCTestCaseData" DROP COLUMN "expected",
DROP COLUMN "paramInputs",
DROP COLUMN "scenarios";
