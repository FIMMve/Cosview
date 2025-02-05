/*
  Warnings:

  - The `termination_date` column on the `EmployeeRecord` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `birthdate` on the `EmployeeRecord` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `hire_date` on the `EmployeeRecord` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "EmployeeRecord" DROP COLUMN "birthdate",
ADD COLUMN     "birthdate" JSONB NOT NULL,
DROP COLUMN "hire_date",
ADD COLUMN     "hire_date" JSONB NOT NULL,
DROP COLUMN "termination_date",
ADD COLUMN     "termination_date" JSONB;
