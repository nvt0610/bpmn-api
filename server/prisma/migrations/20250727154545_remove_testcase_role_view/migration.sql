/*
  Warnings:

  - You are about to drop the `TestCaseRoleView` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TestCaseRoleView" DROP CONSTRAINT "TestCaseRoleView_roleId_fkey";

-- DropForeignKey
ALTER TABLE "TestCaseRoleView" DROP CONSTRAINT "TestCaseRoleView_testCaseId_fkey";

-- DropForeignKey
ALTER TABLE "TestCaseRoleView" DROP CONSTRAINT "TestCaseRoleView_userId_fkey";

-- DropTable
DROP TABLE "TestCaseRoleView";
