/*
  Warnings:

  - Changed the type of `type` on the `BpmnDiagram` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `type` to the `TestCase` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "VisibilityType" AS ENUM ('GENERAL', 'ROLE_BASED');

-- AlterTable
ALTER TABLE "BpmnDiagram" DROP COLUMN "type",
ADD COLUMN     "type" "VisibilityType" NOT NULL;

-- AlterTable
ALTER TABLE "TestCase" ADD COLUMN     "type" "VisibilityType" NOT NULL;

-- DropEnum
DROP TYPE "DiagramType";
