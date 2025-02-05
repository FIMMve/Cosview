/*
  Warnings:

  - You are about to drop the column `employee_record_punctuation` on the `Evaluations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Evaluations" DROP COLUMN "employee_record_punctuation",
ADD COLUMN     "prevention_principles" INTEGER DEFAULT 0,
ADD COLUMN     "route_format" INTEGER DEFAULT 0,
ADD COLUMN     "rutagrama" INTEGER DEFAULT 0;
