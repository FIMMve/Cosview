/*
  Warnings:

  - You are about to drop the column `amount` on the `FireExtinguisher` table. All the data in the column will be lost.
  - You are about to drop the column `items` on the `FireExtinguisher` table. All the data in the column will be lost.
  - Added the required column `activation_lever` to the `FireExtinguisher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `capacity` to the `FireExtinguisher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `carrying_handle` to the `FireExtinguisher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cylinder` to the `FireExtinguisher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiration_date` to the `FireExtinguisher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `free_of_obstacles` to the `FireExtinguisher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hose` to the `FireExtinguisher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hose_holder` to the `FireExtinguisher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `labels` to the `FireExtinguisher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `FireExtinguisher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maintenance` to the `FireExtinguisher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nozzle` to the `FireExtinguisher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pressure_gauge` to the `FireExtinguisher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `safety_seal` to the `FireExtinguisher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type_of_charge_and_fire` to the `FireExtinguisher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FireExtinguisher" DROP COLUMN "amount",
DROP COLUMN "items",
ADD COLUMN     "activation_lever" BOOLEAN NOT NULL,
ADD COLUMN     "capacity" TEXT NOT NULL,
ADD COLUMN     "carrying_handle" BOOLEAN NOT NULL,
ADD COLUMN     "cylinder" BOOLEAN NOT NULL,
ADD COLUMN     "expiration_date" TEXT NOT NULL,
ADD COLUMN     "free_of_obstacles" BOOLEAN NOT NULL,
ADD COLUMN     "hose" BOOLEAN NOT NULL,
ADD COLUMN     "hose_holder" BOOLEAN NOT NULL,
ADD COLUMN     "labels" BOOLEAN NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "maintenance" BOOLEAN NOT NULL,
ADD COLUMN     "nozzle" BOOLEAN NOT NULL,
ADD COLUMN     "pressure_gauge" BOOLEAN NOT NULL,
ADD COLUMN     "safety_seal" BOOLEAN NOT NULL,
ADD COLUMN     "type_of_charge_and_fire" TEXT NOT NULL;
