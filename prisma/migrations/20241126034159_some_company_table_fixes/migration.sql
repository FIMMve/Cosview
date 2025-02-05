-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "legal_representative_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_legal_representative_id_fkey" FOREIGN KEY ("legal_representative_id") REFERENCES "LegalRepresentative"("id") ON DELETE SET NULL ON UPDATE CASCADE;
