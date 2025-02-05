/*
  Warnings:

  - You are about to drop the column `community_contract` on the `Sysl` table. All the data in the column will be lost.
  - You are about to drop the column `inspectors_certificate` on the `Sysl` table. All the data in the column will be lost.
  - You are about to drop the column `intervention_protocol` on the `Sysl` table. All the data in the column will be lost.
  - You are about to drop the column `job_analysis` on the `Sysl` table. All the data in the column will be lost.
  - You are about to drop the column `service_certificate` on the `Sysl` table. All the data in the column will be lost.
  - You are about to drop the column `service_organigram` on the `Sysl` table. All the data in the column will be lost.
  - You are about to drop the column `standards` on the `Sysl` table. All the data in the column will be lost.
  - You are about to drop the column `sysl_policies` on the `Sysl` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Sysl" DROP COLUMN "community_contract",
DROP COLUMN "inspectors_certificate",
DROP COLUMN "intervention_protocol",
DROP COLUMN "job_analysis",
DROP COLUMN "service_certificate",
DROP COLUMN "service_organigram",
DROP COLUMN "standards",
DROP COLUMN "sysl_policies",
ADD COLUMN     "folder" JSONB,
ALTER COLUMN "sysl_program" DROP NOT NULL,
ALTER COLUMN "participation_approval_minutes" DROP NOT NULL,
ALTER COLUMN "signed_program" DROP NOT NULL,
ALTER COLUMN "occupational_doctor" DROP NOT NULL,
ALTER COLUMN "accident_rate" DROP NOT NULL,
ALTER COLUMN "morbidity_rate" DROP NOT NULL;
