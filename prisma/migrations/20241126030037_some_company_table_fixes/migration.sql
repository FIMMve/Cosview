-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_legal_representative_id_fkey";

-- DropIndex
DROP INDEX "Company_legal_representative_id_key";

-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "legal_representative_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_legal_representative_id_fkey" FOREIGN KEY ("legal_representative_id") REFERENCES "LegalRepresentative"("id") ON DELETE SET NULL ON UPDATE CASCADE;
