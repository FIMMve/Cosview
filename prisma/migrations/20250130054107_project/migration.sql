-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "start" TEXT NOT NULL DEFAULT '2025-01-01',
    "end" TEXT NOT NULL DEFAULT '2025-01-01',

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);
