/*
  Warnings:

  - You are about to drop the column `first_shift` on the `Sysl` table. All the data in the column will be lost.
  - You are about to drop the column `second_shift` on the `Sysl` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Sysl" DROP COLUMN "first_shift",
DROP COLUMN "second_shift",
ADD COLUMN     "shifts" JSONB;
