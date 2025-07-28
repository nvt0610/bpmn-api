-- CreateEnum
CREATE TYPE "TestCaseStatus" AS ENUM ('DRAFT', 'IN_PROGRESS', 'DONE', 'REJECTED');

-- AlterTable
CREATE SEQUENCE bpmndiagram_id_seq;
ALTER TABLE "BpmnDiagram" ALTER COLUMN "id" SET DEFAULT nextval('bpmndiagram_id_seq');
ALTER SEQUENCE bpmndiagram_id_seq OWNED BY "BpmnDiagram"."id";

-- AlterTable
CREATE SEQUENCE devtestcasedata_id_seq;
ALTER TABLE "DevTestCaseData" ALTER COLUMN "id" SET DEFAULT nextval('devtestcasedata_id_seq');
ALTER SEQUENCE devtestcasedata_id_seq OWNED BY "DevTestCaseData"."id";

-- AlterTable
CREATE SEQUENCE diagramroleview_id_seq;
ALTER TABLE "DiagramRoleView" ALTER COLUMN "id" SET DEFAULT nextval('diagramroleview_id_seq');
ALTER SEQUENCE diagramroleview_id_seq OWNED BY "DiagramRoleView"."id";

-- AlterTable
CREATE SEQUENCE potestcasedata_id_seq;
ALTER TABLE "POTestCaseData" ALTER COLUMN "id" SET DEFAULT nextval('potestcasedata_id_seq');
ALTER SEQUENCE potestcasedata_id_seq OWNED BY "POTestCaseData"."id";

-- AlterTable
CREATE SEQUENCE qctestcasedata_id_seq;
ALTER TABLE "QCTestCaseData" ALTER COLUMN "id" SET DEFAULT nextval('qctestcasedata_id_seq');
ALTER SEQUENCE qctestcasedata_id_seq OWNED BY "QCTestCaseData"."id";

-- AlterTable
CREATE SEQUENCE role_id_seq;
ALTER TABLE "Role" ALTER COLUMN "id" SET DEFAULT nextval('role_id_seq');
ALTER SEQUENCE role_id_seq OWNED BY "Role"."id";

-- AlterTable
CREATE SEQUENCE testcase_id_seq;
ALTER TABLE "TestCase" ADD COLUMN     "status" "TestCaseStatus" NOT NULL DEFAULT 'DRAFT',
ALTER COLUMN "id" SET DEFAULT nextval('testcase_id_seq');
ALTER SEQUENCE testcase_id_seq OWNED BY "TestCase"."id";

-- AlterTable
CREATE SEQUENCE user_id_seq;
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT nextval('user_id_seq');
ALTER SEQUENCE user_id_seq OWNED BY "User"."id";
