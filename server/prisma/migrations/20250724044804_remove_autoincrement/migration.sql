-- AlterTable
ALTER TABLE "BpmnDiagram" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "BpmnDiagram_id_seq";

-- AlterTable
ALTER TABLE "ScreenMapping" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "ScreenMapping_id_seq";

-- AlterTable
ALTER TABLE "TestCase" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "TestCase_id_seq";
