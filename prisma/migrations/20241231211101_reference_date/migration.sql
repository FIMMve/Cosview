/*
  Warnings:

  - You are about to drop the column `active_pause` on the `Prl` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Evaluations" ADD COLUMN     "reference_date" TEXT;

-- AlterTable
ALTER TABLE "Prl" DROP COLUMN "active_pause",
ADD COLUMN     "first_active_pause" JSONB,
ADD COLUMN     "second_active_pause" JSONB;

-- AlterTable
ALTER TABLE "Sysl" ALTER COLUMN "sysl_program" SET DATA TYPE TEXT;
