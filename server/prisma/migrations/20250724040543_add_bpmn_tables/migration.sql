-- AlterTable
ALTER TABLE "TestCase" ADD COLUMN     "diagramId" INTEGER;

-- CreateTable
CREATE TABLE "BpmnDiagram" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "xmlContent" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BpmnDiagram_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScreenMapping" (
    "id" SERIAL NOT NULL,
    "nodeId" TEXT NOT NULL,
    "screenName" TEXT NOT NULL,
    "diagramId" INTEGER NOT NULL,

    CONSTRAINT "ScreenMapping_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TestCase" ADD CONSTRAINT "TestCase_diagramId_fkey" FOREIGN KEY ("diagramId") REFERENCES "BpmnDiagram"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScreenMapping" ADD CONSTRAINT "ScreenMapping_diagramId_fkey" FOREIGN KEY ("diagramId") REFERENCES "BpmnDiagram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
