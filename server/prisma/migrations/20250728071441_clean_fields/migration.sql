/*
  Warnings:

  - You are about to drop the column `jsonContent` on the `TestCase` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BpmnDiagram" ADD COLUMN     "jsonContent" JSONB;

-- AlterTable
ALTER TABLE "TestCase" DROP COLUMN "jsonContent";
