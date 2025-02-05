/*
  Warnings:

  - The `prevention_principles` column on the `Evaluations` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `route_format` column on the `Evaluations` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `rutagrama` column on the `Evaluations` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Evaluations" DROP COLUMN "prevention_principles",
ADD COLUMN     "prevention_principles" JSONB,
DROP COLUMN "route_format",
ADD COLUMN     "route_format" JSONB,
DROP COLUMN "rutagrama",
ADD COLUMN     "rutagrama" JSONB;
