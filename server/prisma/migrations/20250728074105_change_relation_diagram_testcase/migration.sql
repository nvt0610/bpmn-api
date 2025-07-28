/*
  Warnings:

  - A unique constraint covering the columns `[diagramId]` on the table `TestCase` will be added. If there are existing duplicate values, this will fail.
  - Made the column `diagramId` on table `TestCase` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "TestCase" DROP CONSTRAINT "TestCase_diagramId_fkey";

-- AlterTable
ALTER TABLE "TestCase" ALTER COLUMN "diagramId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TestCase_diagramId_key" ON "TestCase"("diagramId");

-- AddForeignKey
ALTER TABLE "TestCase" ADD CONSTRAINT "TestCase_diagramId_fkey" FOREIGN KEY ("diagramId") REFERENCES "BpmnDiagram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
