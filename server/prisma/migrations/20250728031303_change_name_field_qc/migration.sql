/*
  Warnings:

  - You are about to drop the column `apis` on the `QCTestCaseData` table. All the data in the column will be lost.
  - Added the required column `scenarios` to the `QCTestCaseData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QCTestCaseData" DROP COLUMN "apis",
ADD COLUMN     "scenarios" JSONB NOT NULL;
