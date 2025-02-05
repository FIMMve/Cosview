/*
  Warnings:

  - You are about to drop the column `center_certificate` on the `Evaluations` table. All the data in the column will be lost.
  - You are about to drop the column `committee_certificate` on the `Evaluations` table. All the data in the column will be lost.
  - You are about to drop the column `delegate_certificate` on the `Evaluations` table. All the data in the column will be lost.
  - You are about to drop the column `inpsasel_report` on the `Evaluations` table. All the data in the column will be lost.
  - You are about to drop the column `prevention_principles` on the `Evaluations` table. All the data in the column will be lost.
  - You are about to drop the column `route_format` on the `Evaluations` table. All the data in the column will be lost.
  - You are about to drop the column `rutagrama` on the `Evaluations` table. All the data in the column will be lost.
  - You are about to drop the column `transcription` on the `Evaluations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Evaluations" DROP COLUMN "center_certificate",
DROP COLUMN "committee_certificate",
DROP COLUMN "delegate_certificate",
DROP COLUMN "inpsasel_report",
DROP COLUMN "prevention_principles",
DROP COLUMN "route_format",
DROP COLUMN "rutagrama",
DROP COLUMN "transcription",
ADD COLUMN     "committee" JSONB,
ADD COLUMN     "employee_record" JSONB,
ADD COLUMN     "sysl" JSONB;
