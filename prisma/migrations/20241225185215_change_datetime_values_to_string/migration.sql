/*
  Warnings:

  - Made the column `center_certificate` on table `Committee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `committee_certificate` on table `Committee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `delegate_certificate` on table `Committee` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Capacitation" ALTER COLUMN "date" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Committee" ALTER COLUMN "center_certificate" SET NOT NULL,
ALTER COLUMN "center_certificate" SET DEFAULT 'No Posee',
ALTER COLUMN "committee_certificate" SET NOT NULL,
ALTER COLUMN "committee_certificate" SET DEFAULT 'No Posee',
ALTER COLUMN "delegate_certificate" SET NOT NULL,
ALTER COLUMN "delegate_certificate" SET DEFAULT 'No Posee';

-- AlterTable
ALTER TABLE "EmployeeRecord" ALTER COLUMN "birthdate" SET DATA TYPE TEXT,
ALTER COLUMN "hire_date" SET DATA TYPE TEXT,
ALTER COLUMN "termination_date" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Evaluations" ADD COLUMN     "center_certificate" JSONB,
ADD COLUMN     "committee_certificate" JSONB,
ADD COLUMN     "delegate_certificate" JSONB,
ADD COLUMN     "inpsasel_report" JSONB,
ADD COLUMN     "transcription" JSONB;

-- AlterTable
ALTER TABLE "Inspection" ALTER COLUMN "inspection_date" SET DATA TYPE TEXT;
