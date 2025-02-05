/*
  Warnings:

  - You are about to drop the column `items` on the `FirstAid` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Evaluations" ADD COLUMN     "capacitations" JSONB,
ADD COLUMN     "inspection" JSONB;

-- AlterTable
ALTER TABLE "FirstAid" DROP COLUMN "items",
ADD COLUMN     "adhesive" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "alcohol" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "anti_inflammatory" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "bandaids" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "cotton" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "cotton_applicator" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "disposable_gloves" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "elastic_bandage_12" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "elastic_bandage_6" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "elastic_bandage_8" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "eye_cures" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "eye_wash" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "gauze_roll" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "hydrogen_peroxide" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "oral_thermometer" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "scissors" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "soap" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "sterile_dressing" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "sterile_gauze" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "tongue_depressor" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "triangular_bandages" INTEGER NOT NULL DEFAULT 0;
