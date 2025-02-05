/*
  Warnings:

  - Added the required column `end_hour` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_minutes` to the `Events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Events" ADD COLUMN     "end_hour" INTEGER NOT NULL,
ADD COLUMN     "end_minutes" INTEGER NOT NULL;
