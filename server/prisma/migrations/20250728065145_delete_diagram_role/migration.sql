/*
  Warnings:

  - You are about to drop the column `createdAt` on the `BpmnDiagram` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `BpmnDiagram` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `BpmnDiagram` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `TestCase` table. All the data in the column will be lost.
  - You are about to drop the `DiagramRoleView` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BpmnDiagram" DROP CONSTRAINT "BpmnDiagram_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "DiagramRoleView" DROP CONSTRAINT "DiagramRoleView_diagramId_fkey";

-- DropForeignKey
ALTER TABLE "DiagramRoleView" DROP CONSTRAINT "DiagramRoleView_userId_fkey";

-- DropForeignKey
ALTER TABLE "TestCase" DROP CONSTRAINT "TestCase_createdBy_fkey";

-- AlterTable
ALTER TABLE "BpmnDiagram" DROP COLUMN "createdAt",
DROP COLUMN "createdBy",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "TestCase" DROP COLUMN "createdBy",
ADD COLUMN     "jsonContent" JSONB;

-- DropTable
DROP TABLE "DiagramRoleView";
