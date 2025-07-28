/*
  Warnings:

  - You are about to drop the column `roleId` on the `DiagramRoleView` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "DiagramRoleView" DROP CONSTRAINT "DiagramRoleView_roleId_fkey";

-- AlterTable
ALTER TABLE "DiagramRoleView" DROP COLUMN "roleId",
ADD COLUMN     "roleIds" TEXT[],
ADD COLUMN     "visibility" "VisibilityType" NOT NULL DEFAULT 'ROLE_BASED';
