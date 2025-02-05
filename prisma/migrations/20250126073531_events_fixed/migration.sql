/*
  Warnings:

  - You are about to drop the column `date` on the `Events` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Events` table. All the data in the column will be lost.
  - Added the required column `backgroundColor` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hour` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minutes` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Made the column `notes` on table `Events` required. This step will fail if there are existing NULL values in that column.
  - Made the column `color` on table `Events` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Events" DROP COLUMN "date",
DROP COLUMN "name",
ADD COLUMN     "allDay" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "backgroundColor" TEXT NOT NULL,
ADD COLUMN     "end" TEXT NOT NULL,
ADD COLUMN     "hour" INTEGER NOT NULL,
ADD COLUMN     "minutes" INTEGER NOT NULL,
ADD COLUMN     "start" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "notes" SET NOT NULL,
ALTER COLUMN "color" SET NOT NULL;
