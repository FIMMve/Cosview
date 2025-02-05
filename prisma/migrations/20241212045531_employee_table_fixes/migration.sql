-- AlterTable
ALTER TABLE "EmployeeRecord" ADD COLUMN     "employeerRepresentative" BOOLEAN,
ADD COLUMN     "preventionRepresentative" BOOLEAN,
ALTER COLUMN "position" SET NOT NULL,
ALTER COLUMN "position" SET DATA TYPE TEXT;
