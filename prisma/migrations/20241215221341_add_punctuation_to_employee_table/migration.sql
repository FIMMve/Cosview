/*
  Warnings:

  - You are about to drop the column `evaluations` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `inspection_id` on the `ElectricalPrevention` table. All the data in the column will be lost.
  - You are about to drop the column `committee_position` on the `EmployeeRecord` table. All the data in the column will be lost.
  - You are about to drop the column `inspection_id` on the `FireExtinguisher` table. All the data in the column will be lost.
  - You are about to drop the column `inspection_id` on the `FirstAid` table. All the data in the column will be lost.
  - You are about to drop the column `inspection_id` on the `Signaling` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ElectricalPrevention" DROP CONSTRAINT "ElectricalPrevention_inspection_id_fkey";

-- DropForeignKey
ALTER TABLE "FireExtinguisher" DROP CONSTRAINT "FireExtinguisher_inspection_id_fkey";

-- DropForeignKey
ALTER TABLE "FirstAid" DROP CONSTRAINT "FirstAid_inspection_id_fkey";

-- DropForeignKey
ALTER TABLE "Signaling" DROP CONSTRAINT "Signaling_inspection_id_fkey";

-- DropIndex
DROP INDEX "ElectricalPrevention_inspection_id_key";

-- DropIndex
DROP INDEX "FireExtinguisher_inspection_id_key";

-- DropIndex
DROP INDEX "FirstAid_inspection_id_key";

-- DropIndex
DROP INDEX "Signaling_inspection_id_key";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "evaluations";

-- AlterTable
ALTER TABLE "ElectricalPrevention" DROP COLUMN "inspection_id";

-- AlterTable
ALTER TABLE "EmployeeRecord" DROP COLUMN "committee_position",
ADD COLUMN     "committee_delegate" BOOLEAN,
ADD COLUMN     "committee_elections" BOOLEAN,
ADD COLUMN     "committee_second_postulate" BOOLEAN;

-- AlterTable
ALTER TABLE "FireExtinguisher" DROP COLUMN "inspection_id";

-- AlterTable
ALTER TABLE "FirstAid" DROP COLUMN "inspection_id";

-- AlterTable
ALTER TABLE "Signaling" DROP COLUMN "inspection_id";

-- CreateTable
CREATE TABLE "Evaluations" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "employee_record_punctuation" INTEGER,

    CONSTRAINT "Evaluations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Evaluations_company_id_key" ON "Evaluations"("company_id");

-- AddForeignKey
ALTER TABLE "Evaluations" ADD CONSTRAINT "Evaluations_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
