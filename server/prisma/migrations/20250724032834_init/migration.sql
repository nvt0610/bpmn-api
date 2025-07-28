-- CreateTable
CREATE TABLE "TestCase" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "apiUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TestCase_pkey" PRIMARY KEY ("id")
);
