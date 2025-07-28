/*
  Warnings:

  - You are about to drop the `ScreenMapping` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `createdBy` to the `BpmnDiagram` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `BpmnDiagram` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `TestCase` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DiagramType" AS ENUM ('GENERAL', 'ROLE_BASED');

-- DropForeignKey
ALTER TABLE "ScreenMapping" DROP CONSTRAINT "ScreenMapping_diagramId_fkey";

-- AlterTable
ALTER TABLE "BpmnDiagram" ADD COLUMN     "createdBy" INTEGER NOT NULL,
ADD COLUMN     "type" "DiagramType" NOT NULL;

-- AlterTable
ALTER TABLE "TestCase" ADD COLUMN     "createdBy" INTEGER NOT NULL;

-- DropTable
DROP TABLE "ScreenMapping";

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiagramRoleView" (
    "id" INTEGER NOT NULL,
    "diagramId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,
    "nodeId" TEXT NOT NULL,
    "screenName" TEXT NOT NULL,

    CONSTRAINT "DiagramRoleView_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DiagramRoleView_diagramId_userId_nodeId_key" ON "DiagramRoleView"("diagramId", "userId", "nodeId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BpmnDiagram" ADD CONSTRAINT "BpmnDiagram_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiagramRoleView" ADD CONSTRAINT "DiagramRoleView_diagramId_fkey" FOREIGN KEY ("diagramId") REFERENCES "BpmnDiagram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiagramRoleView" ADD CONSTRAINT "DiagramRoleView_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiagramRoleView" ADD CONSTRAINT "DiagramRoleView_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestCase" ADD CONSTRAINT "TestCase_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
