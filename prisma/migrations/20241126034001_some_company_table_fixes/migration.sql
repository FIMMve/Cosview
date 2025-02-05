/*
  Warnings:

  - You are about to drop the column `legal_representative_id` on the `Company` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_legal_representative_id_fkey";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "legal_representative_id";
