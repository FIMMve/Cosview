/*
  Warnings:

  - The `call_date` column on the `Committee` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `application_date` column on the `Committee` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `election_date` column on the `Committee` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `mutual_agreement` column on the `Committee` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `designation_date` column on the `Committee` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `aceptance_date` column on the `Committee` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `formal_agreement` column on the `Committee` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Committee" ALTER COLUMN "center_certificate" DROP NOT NULL,
ALTER COLUMN "committee_certificate" DROP NOT NULL,
ALTER COLUMN "delegate_certificate" DROP NOT NULL,
ALTER COLUMN "inpsasel_email" DROP NOT NULL,
ALTER COLUMN "inpsasel_password" DROP NOT NULL,
ALTER COLUMN "constitution" DROP NOT NULL,
ALTER COLUMN "registratrion_date" DROP NOT NULL,
ALTER COLUMN "inpsasel_report_date" DROP NOT NULL,
ALTER COLUMN "transcription_date" DROP NOT NULL,
ALTER COLUMN "ministry_labor_letter" DROP NOT NULL,
DROP COLUMN "call_date",
ADD COLUMN     "call_date" JSONB,
DROP COLUMN "application_date",
ADD COLUMN     "application_date" JSONB,
DROP COLUMN "election_date",
ADD COLUMN     "election_date" JSONB,
DROP COLUMN "mutual_agreement",
ADD COLUMN     "mutual_agreement" JSONB,
DROP COLUMN "designation_date",
ADD COLUMN     "designation_date" JSONB,
DROP COLUMN "aceptance_date",
ADD COLUMN     "aceptance_date" JSONB,
DROP COLUMN "formal_agreement",
ADD COLUMN     "formal_agreement" JSONB,
ALTER COLUMN "delegate_code" DROP NOT NULL;

-- AlterTable
ALTER TABLE "EmployeeRecord" ADD COLUMN     "committee_position" TEXT;
