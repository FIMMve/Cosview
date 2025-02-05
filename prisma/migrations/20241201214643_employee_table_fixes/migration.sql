/*
  Warnings:

  - You are about to drop the column `accidentRate` on the `Sysl` table. All the data in the column will be lost.
  - You are about to drop the column `communityContract` on the `Sysl` table. All the data in the column will be lost.
  - You are about to drop the column `inspectorsCertificate` on the `Sysl` table. All the data in the column will be lost.
  - You are about to drop the column `interventionProtocol` on the `Sysl` table. All the data in the column will be lost.
  - You are about to drop the column `jobAnalysis` on the `Sysl` table. All the data in the column will be lost.
  - You are about to drop the column `morbidityRate` on the `Sysl` table. All the data in the column will be lost.
  - You are about to drop the column `serviceCertificate` on the `Sysl` table. All the data in the column will be lost.
  - You are about to drop the column `serviceOrganigram` on the `Sysl` table. All the data in the column will be lost.
  - You are about to drop the column `syslPolicies` on the `Sysl` table. All the data in the column will be lost.
  - Added the required column `prevention_principles` to the `EmployeeRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `route_format` to the `EmployeeRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rutagrama` to the `EmployeeRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accident_rate` to the `Sysl` table without a default value. This is not possible if the table is not empty.
  - Added the required column `community_contract` to the `Sysl` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inspectors_certificate` to the `Sysl` table without a default value. This is not possible if the table is not empty.
  - Added the required column `intervention_protocol` to the `Sysl` table without a default value. This is not possible if the table is not empty.
  - Added the required column `job_analysis` to the `Sysl` table without a default value. This is not possible if the table is not empty.
  - Added the required column `morbidity_rate` to the `Sysl` table without a default value. This is not possible if the table is not empty.
  - Added the required column `service_certificate` to the `Sysl` table without a default value. This is not possible if the table is not empty.
  - Added the required column `service_organigram` to the `Sysl` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sysl_policies` to the `Sysl` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmployeeRecord" ADD COLUMN     "prevention_principles" BOOLEAN NOT NULL,
ADD COLUMN     "route_format" BOOLEAN NOT NULL,
ADD COLUMN     "rutagrama" BOOLEAN NOT NULL,
ALTER COLUMN "phone_number" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Sysl" DROP COLUMN "accidentRate",
DROP COLUMN "communityContract",
DROP COLUMN "inspectorsCertificate",
DROP COLUMN "interventionProtocol",
DROP COLUMN "jobAnalysis",
DROP COLUMN "morbidityRate",
DROP COLUMN "serviceCertificate",
DROP COLUMN "serviceOrganigram",
DROP COLUMN "syslPolicies",
ADD COLUMN     "accident_rate" TEXT NOT NULL,
ADD COLUMN     "community_contract" BOOLEAN NOT NULL,
ADD COLUMN     "inspectors_certificate" BOOLEAN NOT NULL,
ADD COLUMN     "intervention_protocol" BOOLEAN NOT NULL,
ADD COLUMN     "job_analysis" BOOLEAN NOT NULL,
ADD COLUMN     "morbidity_rate" TEXT NOT NULL,
ADD COLUMN     "service_certificate" BOOLEAN NOT NULL,
ADD COLUMN     "service_organigram" BOOLEAN NOT NULL,
ADD COLUMN     "sysl_policies" BOOLEAN NOT NULL;
