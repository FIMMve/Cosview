/*
  Warnings:

  - You are about to drop the `Billboard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Prl` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Billboard" DROP CONSTRAINT "Billboard_company_id_fkey";

-- DropForeignKey
ALTER TABLE "Prl" DROP CONSTRAINT "Prl_company_id_fkey";

-- AlterTable
ALTER TABLE "Sysl" ADD COLUMN     "active_pause" JSONB,
ADD COLUMN     "brain_gymnastics" JSONB,
ADD COLUMN     "committee_registration" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "cultural_component" JSONB,
ADD COLUMN     "familiar_component" JSONB,
ADD COLUMN     "first_shift" TEXT,
ADD COLUMN     "formation_component" JSONB,
ADD COLUMN     "informative_topics" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "integration_dynamics" JSONB,
ADD COLUMN     "occupational_medical" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "prl" TEXT,
ADD COLUMN     "recreational_component" JSONB,
ADD COLUMN     "second_shift" TEXT,
ADD COLUMN     "service_registration" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "sports_component" JSONB,
ADD COLUMN     "statistics" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "sysl_policies" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "Billboard";

-- DropTable
DROP TABLE "Prl";
