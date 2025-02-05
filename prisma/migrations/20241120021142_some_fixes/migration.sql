/*
  Warnings:

  - A unique constraint covering the columns `[company_id]` on the table `EmployeeRecord` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "EmployeeRecord_company_id_key" ON "EmployeeRecord"("company_id");
